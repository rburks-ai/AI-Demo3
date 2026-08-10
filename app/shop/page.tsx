import ProductCard from '@/components/ProductCard';
import { furniture } from '@/lib/data/furniture';

export const metadata = { title: 'Shop \u2014 Setting' };

export default function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const categories = ['All', 'Seating', 'Tables', 'Lighting', 'Storage', 'Textiles'];
  const active = searchParams.category ?? 'All';
  const items =
    active === 'All' ? furniture : furniture.filter((f) => f.category === active);

  return (
    <div className="max-w-content mx-auto px-6 md:px-10 pt-16 pb-28">
      <p className="tag-label text-brass mb-3">{furniture.length} pieces, sold on their own</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-3">Shop</h1>
      <p className="text-ink/60 max-w-lg mb-10">
        The same furniture featured in our listings, available whether or not
        you&rsquo;re buying a house.
      </p>

      <div className="flex flex-wrap gap-2.5 mb-14 border-b hairline pb-10">
        {categories.map((c) => (
          <a
            key={c}
            href={c === 'All' ? '/shop' : `/shop?category=${c}`}
            className={`tag-label rounded-full px-4 py-2 border transition-colors ${
              active === c
                ? 'bg-ink text-paper border-ink'
                : 'border-ink/20 text-ink/60 hover:border-ink hover:text-ink'
            }`}
          >
            {c}
          </a>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
