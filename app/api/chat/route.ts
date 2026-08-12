import { NextRequest, NextResponse } from 'next/server';
import { properties } from '@/lib/data/properties';
import { furniture } from '@/lib/data/furniture';
import { ChatMessage } from '@/lib/chat-types';

export const runtime = 'nodejs';

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

const TOOLS = [
  {
    name: 'navigate_to_listing',
    description: "Open a specific property listing's page in the user's browser.",
    input_schema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'The listing slug, e.g. "the-alder-house"' },
      },
      required: ['slug'],
    },
  },
  {
    name: 'navigate_to_product',
    description: "Open a specific furniture product's page in the user's browser.",
    input_schema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'The product slug, e.g. "ansel-lounge-chair"' },
      },
      required: ['slug'],
    },
  },
  {
    name: 'filter_listings',
    description:
      'Navigate the user to the listings page pre-filtered by city and/or a maximum price. Use when the user describes what they want in a home rather than asking for one specific listing.',
    input_schema: {
      type: 'object',
      properties: {
        city: { type: 'string', description: 'City to filter by, e.g. "Seattle" or "Portland, OR"' },
        max_price: { type: 'number', description: 'Maximum price in dollars, e.g. 700000' },
      },
    },
  },
  {
    name: 'add_to_cart',
    description: "Add a furniture product to the user's cart.",
    input_schema: {
      type: 'object',
      properties: {
        slug: { type: 'string', description: 'The product slug to add, e.g. "kiln-table-lamp"' },
        quantity: { type: 'number', description: 'How many to add. Defaults to 1.' },
      },
      required: ['slug'],
    },
  },
];

function buildSystemPrompt() {
  const listingLines = properties
    .map(
      (p) =>
        `- ${p.address}, ${p.neighborhood}, ${p.city} — ${money(p.price)}, ${p.beds}bd/${p.baths}ba, ${p.sqft}sqft, ${p.status}. Slug: ${p.slug}. Furnished with: ${p.furnitureSlugs.join(', ')}.`
    )
    .join('\n');

  const furnitureLines = furniture
    .map(
      (f) =>
        `- ${f.name} by ${f.maker} — ${money(f.price)}, ${f.category}, fits a ${f.room.toLowerCase()}. Slug: ${f.slug}.`
    )
    .join('\n');

  return `You are the in-house assistant for Setting, a company that sells fully furnished homes and the individual furniture pieces featured in them.

Help visitors find a home or furniture piece that fits what they describe, using ONLY the real catalog below — never invent listings or products.

CURRENT LISTINGS:
${listingLines}

CURRENT FURNITURE:
${furnitureLines}

You have tools that take real action in the app: opening a listing or product page, pre-filtering the listings page, and adding an item to the cart. Use a tool whenever the user's intent is clear and actionable — don't just describe what they could do, do it. Examples:
- "Add the Ansel chair to my cart" → call add_to_cart.
- "Show me homes in Seattle under 800k" → call filter_listings.
- "Take me to the Alder house" → call navigate_to_listing.
- If they're just browsing or asking a general question, reply with text and no tool call.

After a tool runs, give a brief, natural confirmation in text — don't repeat raw numbers back mechanically. Keep replies short. If nothing in the catalog fits, say so plainly.`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server is missing ANTHROPIC_API_KEY. Add it to .env.local and restart the dev server.' },
      { status: 500 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const messages = body.messages ?? [];
  if (messages.length === 0) {
    return NextResponse.json({ error: 'No messages provided.' }, { status: 400 });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-5',
        max_tokens: 600,
        system: buildSystemPrompt(),
        tools: TOOLS,
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      return NextResponse.json(
        { error: 'The assistant is unavailable right now. Try again in a moment.' },
        { status: 502 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ content: data.content, stop_reason: data.stop_reason });
  } catch (err) {
    console.error('Chat route error:', err);
    return NextResponse.json({ error: 'Something went wrong reaching the assistant.' }, { status: 500 });
  }
}
