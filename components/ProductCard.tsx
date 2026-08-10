import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-plaster">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 90vw, 320px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div className="pt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-lg text-ink leading-snug">{product.name}</h3>
          <p className="text-ink/50 text-sm mt-0.5">{product.maker}</p>
        </div>
        <p className="font-mono text-sm text-brass shrink-0 pt-1">{money(product.price)}</p>
      </div>
    </Link>
  );
}
