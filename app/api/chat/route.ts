import { NextRequest, NextResponse } from 'next/server';
import { properties } from '@/lib/data/properties';
import { furniture } from '@/lib/data/furniture';

export const runtime = 'nodejs';

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

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

Your job: help visitors find a home or a piece of furniture that fits what they describe, and make specific suggestions from the catalog below — never invent listings or products that aren't in it.

CURRENT LISTINGS:
${listingLines}

CURRENT FURNITURE:
${furnitureLines}

Guidelines:
- Recommend specific items by name, with their price, when relevant.
- If someone describes a budget, room, or style, narrow it down to 1-3 real matches instead of listing everything.
- Keep replies short — a few sentences, not a report.
- If nothing in the catalog fits, say so plainly rather than stretching a bad match.
- You cannot book viewings, place orders, or check real-time availability — point people to the listing or product page to take action.`;
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server is missing ANTHROPIC_API_KEY. Add it to .env.local and restart the dev server.' },
      { status: 500 }
    );
  }

  let body: { messages?: { role: 'user' | 'assistant'; content: string }[] };
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
        max_tokens: 500,
        system: buildSystemPrompt(),
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
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
    const reply = data.content
      ?.filter((block: { type: string }) => block.type === 'text')
      .map((block: { text: string }) => block.text)
      .join('\n')
      .trim();

    return NextResponse.json({ reply: reply || "I couldn't come up with a reply — try rephrasing that." });
  } catch (err) {
    console.error('Chat route error:', err);
    return NextResponse.json({ error: 'Something went wrong reaching the assistant.' }, { status: 500 });
  }
}
