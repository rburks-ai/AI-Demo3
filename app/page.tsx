import Link from 'next/link';
import ShoppableRoom from '@/components/ShoppableRoom';
import PropertyCard from '@/components/PropertyCard';
import ProductCard from '@/components/ProductCard';
import { properties } from '@/lib/data/properties';
import { furniture } from '@/lib/data/furniture';

export default function Home() {
  const hero = properties[0];
  const featured = properties.slice(0, 4);
  const shopPicks = furniture.slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="max-w-content mx-auto px-6 md:px-10 pt-14 md:pt-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <p className="tag-label text-brass mb-5">Real estate & furniture, one listing</p>
            <h1 className="font-display text-[13vw] md:text-6xl lg:text-7xl leading-[0.98] text-ink">
              Every home,
              <br />
              fully set.
            </h1>
            <p className="text-ink/60 text-lg leading-relaxed mt-7 max-w-md">
              We sell furnished houses — and every piece inside them. Buy the
              home, buy the chair, or just take a look around.
            </p>
            <div className="flex flex-wrap gap-4 mt-9">
              <Link
                href="/listings"
                className="tag-label bg-ink text-paper rounded-full px-7 py-3.5 hover:bg-charcoal2 transition-colors"
              >
                Browse homes
              </Link>
              <Link
                href="/shop"
                className="tag-label border border-ink/25 rounded-full px-7 py-3.5 hover:border-ink transition-colors"
              >
                Shop furniture
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/5] md:aspect-[3/4] rounded-md overflow-hidden bg-charcoal2">
            <ShoppableRoom image={hero.heroImage} hotspots={hero.hotspots} alt={hero.address} />
          </div>
        </div>
      </section>

      {/* Featured listings */}
      <section className="max-w-content mx-auto px-6 md:px-10 mt-32">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="tag-label text-brass mb-3">Currently listed</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink">Featured homes</h2>
          </div>
          <Link href="/listings" className="tag-label text-ink/60 hover:text-ink hidden md:block">
            View all listings →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {featured.map((p) => (
            <PropertyCard key={p.slug} property={p} />
          ))}
        </div>
      </section>

      {/* Shop teaser */}
      <section className="max-w-content mx-auto px-6 md:px-10 mt-32">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="tag-label text-brass mb-3">No house required</p>
            <h2 className="font-display text-3xl md:text-4xl text-ink">Shop the collection</h2>
          </div>
          <Link href="/shop" className="tag-label text-ink/60 hover:text-ink hidden md:block">
            View all furniture →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
          {shopPicks.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-content mx-auto px-6 md:px-10 mt-32 mb-28">
        <p className="tag-label text-brass mb-3">How it works</p>
        <h2 className="font-display text-3xl md:text-4xl text-ink mb-14 max-w-lg">
          Three steps between browsing and moving in.
        </h2>
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {[
            {
              step: '01',
              title: 'Walk the listing',
              body: 'Every photo in a listing is shoppable. Hover any tag to see what a piece is, what it costs, and whether it\u2019s in stock.',
            },
            {
              step: '02',
              title: 'Choose your scope',
              body: 'Buy the house as staged, swap pieces room by room, or skip the house and buy the sofa on its own.',
            },
            {
              step: '03',
              title: 'Move in, set',
              body: 'Furniture ships and installs before closing. You get keys to a house that already looks like somewhere you\u2019d live.',
            },
          ].map((s) => (
            <div key={s.step} className="border-t hairline pt-6">
              <p className="font-mono text-sm text-brass mb-4">{s.step}</p>
              <h3 className="font-display text-xl text-ink mb-2.5">{s.title}</h3>
              <p className="text-ink/60 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
