'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

export default function CartPage() {
  const { items, setQty, removeItem, total } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-content mx-auto px-6 md:px-10 pt-16 pb-28 text-center">
        <p className="tag-label text-brass mb-3">Your cart</p>
        <h1 className="font-display text-4xl text-ink mb-4">Nothing in here yet.</h1>
        <p className="text-ink/60 mb-8">
          Add pieces from the shop, or ask the assistant to add something for you.
        </p>
        <Link
          href="/shop"
          className="tag-label bg-ink text-paper rounded-full px-7 py-3.5 hover:bg-charcoal2 transition-colors"
        >
          Browse furniture
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-content mx-auto px-6 md:px-10 pt-16 pb-28">
      <p className="tag-label text-brass mb-3">{items.length} item{items.length > 1 ? 's' : ''}</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-12">Your cart</h1>

      <div className="space-y-6 mb-12">
        {items.map((item) => (
          <div key={item.slug} className="flex items-center gap-5 border-b hairline pb-6">
            <div className="relative w-24 h-24 rounded-md overflow-hidden bg-plaster shrink-0">
              <Image src={item.image} alt={item.name} fill sizes="96px" className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <Link href={`/shop/${item.slug}`} className="font-display text-lg text-ink hover:text-brass transition-colors">
                {item.name}
              </Link>
              <p className="font-mono text-sm text-ink/60 mt-1">{money(item.price)} each</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setQty(item.slug, item.qty - 1)}
                aria-label={`Decrease quantity of ${item.name}`}
                className="w-8 h-8 rounded-full border border-ink/20 hover:border-ink transition-colors"
              >
                &minus;
              </button>
              <span className="font-mono w-6 text-center">{item.qty}</span>
              <button
                type="button"
                onClick={() => setQty(item.slug, item.qty + 1)}
                aria-label={`Increase quantity of ${item.name}`}
                className="w-8 h-8 rounded-full border border-ink/20 hover:border-ink transition-colors"
              >
                +
              </button>
            </div>
            <p className="font-mono text-sm text-ink w-20 text-right shrink-0">{money(item.price * item.qty)}</p>
            <button
              type="button"
              onClick={() => removeItem(item.slug)}
              aria-label={`Remove ${item.name} from cart`}
              className="text-ink/40 hover:text-rust transition-colors text-lg leading-none px-1"
            >
              &times;
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t hairline pt-6">
        <p className="font-display text-2xl text-ink">Total</p>
        <p className="font-mono text-2xl text-ink">{money(total)}</p>
      </div>
      <p className="tag-label text-ink/40 mt-3">This is a demo cart — checkout isn&rsquo;t wired up.</p>
    </div>
  );
}
