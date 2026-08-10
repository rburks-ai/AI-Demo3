import Image from 'next/image';
import { notFound } from 'next/navigation';
import ShoppableRoom from '@/components/ShoppableRoom';
import ProductCard from '@/components/ProductCard';
import { properties, getProperty } from '@/lib/data/properties';
import { furniture } from '@/lib/data/furniture';

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

export function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const property = getProperty(params.slug);
  return { title: property ? `${property.address} \u2014 Setting` : 'Setting' };
}

export default function ListingDetail({ params }: { params: { slug: string } }) {
  const property = getProperty(params.slug);
  if (!property) notFound();

  const shoppable = furniture.filter((f) => property.furnitureSlugs.includes(f.slug));
  const furnitureTotal = shoppable.reduce((sum, f) => sum + f.price, 0);

  return (
    <div>
      <div className="max-w-content mx-auto px-6 md:px-10 pt-12">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div>
            <p className="tag-label text-brass mb-3">{property.status} · {property.neighborhood}, {property.city}</p>
            <h1 className="font-display text-4xl md:text-5xl text-ink">{property.address}</h1>
          </div>
          <p className="font-mono text-2xl text-ink pt-2">{money(property.price)}</p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2 tag-label text-ink/50 mt-6 border-y hairline py-4">
          <span>{property.beds} bed</span>
          <span>{property.baths} bath</span>
          <span>{property.sqft.toLocaleString('en-US')} sqft</span>
          <span>Built {property.year}</span>
        </div>
      </div>

      {/* Shoppable hero */}
      <div className="max-w-content mx-auto px-6 md:px-10 mt-10">
        <div className="relative aspect-[16/10] md:aspect-[16/8] rounded-md overflow-hidden bg-charcoal2">
          <ShoppableRoom image={property.heroImage} hotspots={property.hotspots} alt={property.address} />
        </div>
      </div>

      {/* Description + gallery */}
      <div className="max-w-content mx-auto px-6 md:px-10 mt-14 grid md:grid-cols-3 gap-12">
        <p className="md:col-span-2 text-ink/65 text-lg leading-relaxed">{property.description}</p>
        <div className="tag-label text-ink/50 space-y-3">
          <p>Furniture pictured is included in the shop below and ships separately from the sale of the home.</p>
        </div>
      </div>

      <div className="max-w-content mx-auto px-6 md:px-10 mt-10 grid grid-cols-3 gap-4">
        {property.gallery.slice(1).map((src, i) => (
          <div key={i} className="relative aspect-[4/3] rounded-md overflow-hidden bg-charcoal2">
            <Image src={src} alt={`${property.address} photo ${i + 2}`} fill sizes="33vw" className="object-cover" />
          </div>
        ))}
      </div>

      {/* Shop this home */}
      {shoppable.length > 0 && (
        <section className="max-w-content mx-auto px-6 md:px-10 mt-32 mb-28">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="tag-label text-brass mb-3">Shop this home</p>
              <h2 className="font-display text-3xl md:text-4xl text-ink">
                Every piece, {money(furnitureTotal)} as staged
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {shoppable.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
