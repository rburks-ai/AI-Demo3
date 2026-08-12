'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';
import { Product } from '@/lib/types';

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleClick() {
    addItem({ slug: product.slug, name: product.name, price: product.price, image: product.image });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="tag-label bg-ink text-paper rounded-full px-8 py-4 hover:bg-charcoal2 transition-colors w-full md:w-auto"
    >
      {justAdded ? 'Added to cart' : `Add to cart — ${money(product.price)}`}
    </button>
  );
}
