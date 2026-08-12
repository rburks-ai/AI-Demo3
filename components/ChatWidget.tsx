'use client';

import { useEffect, useRef, useState } from 'react';

type ChatMessage = { role: 'user' | 'assistant'; content: string };

const STARTER_PROMPTS = [
  'A 2-bedroom under $700k',
  'Furniture for a small living room',
  'Something in Seattle',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content:
        "Hi — I can help you find a home or a piece of furniture from Setting's current catalog. What are you looking for?",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const next: ChatMessage[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(next);
    setInput('');
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? 'Something went wrong.');
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      }
    } catch {
      setError('Could not reach the assistant. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-4 w-[22rem] max-w-[calc(100vw-3rem)] h-[28rem] bg-paper border hairline rounded-lg shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-charcoal text-paper px-4 py-3.5 flex items-center justify-between shrink-0">
            <div>
              <p className="font-display text-lg leading-tight">Setting Assistant</p>
              <p className="tag-label text-paper/50">Ask about homes or furniture</p>
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
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-md px-3.5 py-2.5 text-sm leading-relaxed ${
                  m.role === 'user'
                    ? 'ml-auto bg-ink text-paper'
                    : 'mr-auto bg-plaster text-ink'
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-plaster text-ink/50 rounded-md px-3.5 py-2.5 text-sm">
                Thinking&hellip;
              </div>
            )}
            {error && (
              <div className="mr-auto bg-rust/10 text-rust rounded-md px-3.5 py-2.5 text-sm">
                {error}
              </div>
            )}
          </div>

          {messages.length === 1 && (
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
        {open ? (
          <span className="text-2xl leading-none">&times;</span>
        ) : (
          <span className="font-display text-xl">S</span>
        )}
      </button>
    </div>
  );
}
