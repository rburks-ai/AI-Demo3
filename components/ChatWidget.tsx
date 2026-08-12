'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/cart-context';
import { properties } from '@/lib/data/properties';
import { furniture } from '@/lib/data/furniture';
import { ChatMessage, ContentBlock, ToolResultBlock, ToolUseBlock } from '@/lib/chat-types';

type DisplayMessage =
  | { kind: 'text'; role: 'user' | 'assistant'; content: string }
  | { kind: 'action'; content: string };

const STARTER_PROMPTS = [
  'A 2-bedroom under $700k',
  'Add the Kiln lamp to my cart',
  'Show me homes in Seattle',
];

const MAX_TOOL_ITERATIONS = 4;
const money = (n: number) => `$${n.toLocaleString('en-US')}`;

export default function ChatWidget() {
  const router = useRouter();
  const { addItem } = useCart();

  const [open, setOpen] = useState(false);
  const [apiMessages, setApiMessages] = useState<ChatMessage[]>([]);
  const [displayMessages, setDisplayMessages] = useState<DisplayMessage[]>([
    {
      kind: 'text',
      role: 'assistant',
      content:
        "Hi — I can find a home or furniture piece for you, filter listings, or add something to your cart. What are you after?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [displayMessages, open, loading]);

  async function executeTool(
    name: string,
    input: Record<string, unknown>
  ): Promise<{ summary: string; resultForModel: string }> {
    switch (name) {
      case 'navigate_to_listing': {
        const slug = String(input.slug ?? '');
        const property = properties.find((p) => p.slug === slug);
        if (!property) {
          return { summary: `Couldn't find that listing.`, resultForModel: `No listing found with slug "${slug}".` };
        }
        router.push(`/listings/${slug}`);
        return {
          summary: `Opened the listing for ${property.address}.`,
          resultForModel: `Navigated to the listing page for ${property.address} (${money(property.price)}).`,
        };
      }

      case 'navigate_to_product': {
        const slug = String(input.slug ?? '');
        const product = furniture.find((f) => f.slug === slug);
        if (!product) {
          return { summary: `Couldn't find that product.`, resultForModel: `No product found with slug "${slug}".` };
        }
        router.push(`/shop/${slug}`);
        return {
          summary: `Opened the product page for ${product.name}.`,
          resultForModel: `Navigated to the product page for ${product.name} (${money(product.price)}).`,
        };
      }

      case 'filter_listings': {
        const city = input.city ? String(input.city) : undefined;
        const maxPrice = typeof input.max_price === 'number' ? input.max_price : undefined;
        const params = new URLSearchParams();
        if (city) params.set('city', city);
        if (maxPrice) params.set('maxPrice', String(maxPrice));
        router.push(`/listings${params.toString() ? `?${params.toString()}` : ''}`);

        const parts = [city ? `in ${city}` : null, maxPrice ? `under ${money(maxPrice)}` : null].filter(Boolean);
        const desc = parts.length ? ` (${parts.join(', ')})` : '';
        return {
          summary: `Filtered listings${desc}.`,
          resultForModel: `Navigated to the listings page, filtered${desc || ' with no constraints'}.`,
        };
      }

      case 'add_to_cart': {
        const slug = String(input.slug ?? '');
        const qty = typeof input.quantity === 'number' && input.quantity > 0 ? input.quantity : 1;
        const product = furniture.find((f) => f.slug === slug);
        if (!product) {
          return {
            summary: `Couldn't find that product to add.`,
            resultForModel: `No product found with slug "${slug}".`,
          };
        }
        addItem({ slug: product.slug, name: product.name, price: product.price, image: product.image }, qty);
        return {
          summary: `Added ${qty > 1 ? `${qty}× ` : ''}${product.name} to your cart.`,
          resultForModel: `Added ${qty} of "${product.name}" (${money(product.price)} each) to the cart.`,
        };
      }

      default:
        return { summary: `Tried an action that isn't supported.`, resultForModel: `Unknown tool "${name}".` };
    }
  }

  async function runConversation(startMessages: ChatMessage[]) {
    setLoading(true);
    setError(null);
    let current = startMessages;

    for (let i = 0; i < MAX_TOOL_ITERATIONS; i++) {
      let res: Response;
      try {
        res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: current }),
        });
      } catch {
        setError('Could not reach the assistant. Check your connection and try again.');
        break;
      }

      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong.');
        break;
      }

      const content: ContentBlock[] = data.content ?? [];
      const textParts = content
        .filter((b): b is { type: 'text'; text: string } => b.type === 'text')
        .map((b) => b.text)
        .join('\n')
        .trim();

      if (textParts) {
        setDisplayMessages((prev) => [...prev, { kind: 'text', role: 'assistant', content: textParts }]);
      }

      current = [...current, { role: 'assistant', content }];

      const toolUses = content.filter((b): b is ToolUseBlock => b.type === 'tool_use');
      if (toolUses.length === 0) break;

      const toolResults: ToolResultBlock[] = [];
      for (const call of toolUses) {
        const { summary, resultForModel } = await executeTool(call.name, call.input);
        setDisplayMessages((prev) => [...prev, { kind: 'action', content: summary }]);
        toolResults.push({ type: 'tool_result', tool_use_id: call.id, content: resultForModel });
      }

      current = [...current, { role: 'user', content: toolResults }];
    }

    setApiMessages(current);
    setLoading(false);
  }

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const nextApi: ChatMessage[] = [...apiMessages, { role: 'user', content: trimmed }];
    setDisplayMessages((prev) => [...prev, { kind: 'text', role: 'user', content: trimmed }]);
    setInput('');
    runConversation(nextApi);
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-[22rem] max-w-[calc(100vw-3rem)] h-[28rem] bg-paper border hairline rounded-lg shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-charcoal text-paper px-4 py-3.5 flex items-center justify-between shrink-0">
            <div>
              <p className="font-display text-lg leading-tight">Setting Assistant</p>
              <p className="tag-label text-paper/50">Can browse, filter & add to cart</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-paper/70 hover:text-paper text-xl leading-none px-1"
            >
              &times;
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {displayMessages.map((m, i) => {
              if (m.kind === 'action') {
                return (
                  <div key={i} className="flex justify-center">
                    <span className="tag-label text-brass bg-brass/10 border border-brass/25 rounded-full px-3 py-1.5">
                      → {m.content}
                    </span>
                  </div>
                );
              }
              return (
                <div
                  key={i}
                  className={`max-w-[85%] rounded-md px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user' ? 'ml-auto bg-ink text-paper' : 'mr-auto bg-plaster text-ink'
                  }`}
                >
                  {m.content}
                </div>
              );
            })}
            {loading && (
              <div className="mr-auto bg-plaster text-ink/50 rounded-md px-3.5 py-2.5 text-sm">
                Thinking&hellip;
              </div>
            )}
            {error && (
              <div className="mr-auto bg-rust/10 text-rust rounded-md px-3.5 py-2.5 text-sm">{error}</div>
            )}
          </div>

          {displayMessages.length === 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2 shrink-0">
              {STARTER_PROMPTS.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => sendMessage(p)}
                  className="tag-label border border-ink/20 rounded-full px-3 py-1.5 hover:border-ink transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="border-t hairline p-3 flex gap-2 shrink-0"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a suggestion…"
              className="flex-1 bg-plaster/60 rounded-full px-4 py-2.5 text-sm outline-none focus-visible:outline-2 focus-visible:outline-brass"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="tag-label bg-ink text-paper rounded-full px-4 disabled:opacity-40 hover:bg-charcoal2 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close assistant' : 'Open assistant'}
        className="w-14 h-14 rounded-full bg-brass hover:bg-brassLight text-charcoal shadow-xl flex items-center justify-center transition-colors"
      >
        {open ? <span className="text-2xl leading-none">&times;</span> : <span className="font-display text-xl">S</span>}
      </button>
    </div>
  );
}
