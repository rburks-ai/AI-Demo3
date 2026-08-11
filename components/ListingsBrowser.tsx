'use client';

import { useMemo, useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/lib/types';

const PRICE_BANDS = [
  { label: 'All prices', min: 0, max: Infinity },
  { label: 'Under $600k', min: 0, max: 600000 },
  { label: '$600k – $800k', min: 600000, max: 800000 },
  { label: '$800k+', min: 800000, max: Infinity },
] as const;

export default function ListingsBrowser({ properties }: { properties: Property[] }) {
  const locations = useMemo(
    () => ['All locations', ...Array.from(new Set(properties.map((p) => p.city)))],
    [properties]
  );

  const [location, setLocation] = useState('All locations');
  const [priceBand, setPriceBand] = useState<(typeof PRICE_BANDS)[number]>(PRICE_BANDS[0]);

  const filtered = properties.filter((p) => {
    const matchesLocation = location === 'All locations' || p.city === location;
    const matchesPrice = p.price >= priceBand.min && p.price < priceBand.max;
    return matchesLocation && matchesPrice;
  });

  return (
    <div>
      <div className="border-b hairline pb-10 mb-14 space-y-5">
        <div>
          <p className="tag-label text-ink/40 mb-2.5">Location</p>
          <div className="flex flex-wrap gap-2.5">
            {locations.map((loc) => (
              <button
                key={loc}
                type="button"
                onClick={() => setLocation(loc)}
                aria-pressed={location === loc}
                className={`tag-label rounded-full px-4 py-2 border transition-colors ${
                  location === loc
                    ? 'bg-ink text-paper border-ink'
                    : 'border-ink/20 text-ink/60 hover:border-ink hover:text-ink'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="tag-label text-ink/40 mb-2.5">Price</p>
          <div className="flex flex-wrap gap-2.5">
            {PRICE_BANDS.map((band) => (
              <button
                key={band.label}
                type="button"
                onClick={() => setPriceBand(band)}
                aria-pressed={priceBand.label === band.label}
                className={`tag-label rounded-full px-4 py-2 border transition-colors ${
                  priceBand.label === band.label
                    ? 'bg-ink text-paper border-ink'
                    : 'border-ink/20 text-ink/60 hover:border-ink hover:text-ink'
                }`}
              >
                {band.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-12">
          {filtered.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center">
          <p className="font-display text-2xl text-ink mb-2">No homes match yet.</p>
          <p className="text-ink/55">Try a different location or price range.</p>
        </div>
      )}
    </div>
  );
}
