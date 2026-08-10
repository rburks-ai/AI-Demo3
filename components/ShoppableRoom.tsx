'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Hotspot, Property } from '@/lib/types';
import { getProduct } from '@/lib/data/furniture';

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

export default function ShoppableRoom({
  image,
  hotspots,
  alt,
}: {
  image: string;
  hotspots: Hotspot[];
  alt: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="relative w-full h-full select-none">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 60vw"
        className="object-cover"
      />

      {hotspots.map((spot, i) => {
        const product = getProduct(spot.productSlug);
        if (!product) return null;
        const isActive = activeId === spot.id;

        return (
          <div
            key={spot.id}
            className="absolute z-10"
            style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
          >
            <button
              type="button"
              aria-label={`Show details for ${product.name}`}
              aria-expanded={isActive}
              onClick={() => setActiveId(isActive ? null : spot.id)}
              onMouseEnter={() => setActiveId(spot.id)}
              className="hotspot-dot relative flex items-center justify-center w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brass hover:bg-brassLight transition-colors"
            >
              <span className="sr-only">{i + 1}</span>
            </button>

            {isActive && (
              <div
                onMouseLeave={() => setActiveId(null)}
                className="absolute z-20 w-56 -translate-x-1/2 mt-3 bg-paper text-ink rounded-md shadow-2xl overflow-hidden border hairline animate-in"
                style={{
                  left: spot.x > 65 ? 'auto' : '0',
                  right: spot.x > 65 ? '0' : 'auto',
                }}
              >
                <div className="relative w-full aspect-[4/3]">
                  <Image src={product.image} alt={product.name} fill sizes="224px" className="object-cover" />
                </div>
                <div className="p-3.5">
                  <p className="tag-label text-brass mb-1">Tag no. {String(i + 1).padStart(2, '0')}</p>
                  <p className="font-display text-base leading-snug">{product.name}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-mono text-sm text-ink/70">{money(product.price)}</span>
                    <Link
                      href={`/shop/${product.slug}`}
                      className="tag-label text-ink underline underline-offset-4 decoration-ink/30 hover:decoration-ink"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}

      <div className="absolute bottom-4 left-4 tag-label bg-charcoal/70 text-paper px-3 py-1.5 rounded-full backdrop-blur-sm">
        Tap the tags to shop this room
      </div>
    </div>
  );
}
