'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';

export default function CartButton() {
  const { count } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`View cart, ${count} item${count === 1 ? '' : 's'}`}
      className="relative tag-label border border-ink/20 rounded-full px-5 py-2.5 hover:border-ink transition-colors"
    >
      Cart
      {count > 0 && (
        <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brass text-charcoal text-[10px] font-mono flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}
