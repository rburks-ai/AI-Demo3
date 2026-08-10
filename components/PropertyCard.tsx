import Image from 'next/image';
import Link from 'next/link';
import { Property } from '@/lib/types';

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link href={`/listings/${property.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-charcoal2">
        <Image
          src={property.heroImage}
          alt={property.address}
          fill
          sizes="(max-width: 768px) 90vw, 380px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <span className="absolute top-4 left-4 tag-label bg-paper/90 text-ink px-3 py-1.5 rounded-full">
          {property.status}
        </span>
      </div>
      <div className="pt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-xl text-ink leading-snug">{property.address}</h3>
          <p className="text-ink/55 text-sm mt-0.5">{property.neighborhood}, {property.city}</p>
        </div>
        <p className="font-mono text-sm text-brass shrink-0 pt-1">{money(property.price)}</p>
      </div>
      <div className="tag-label text-ink/45 mt-3 flex gap-4">
        <span>{property.beds} bed</span>
        <span>{property.baths} bath</span>
        <span>{property.sqft.toLocaleString('en-US')} sqft</span>
      </div>
    </Link>
  );
}
