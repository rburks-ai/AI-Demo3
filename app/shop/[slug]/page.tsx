import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import AddToCartButton from '@/components/AddToCartButton';
import { furniture, getProduct } from '@/lib/data/furniture';
import { properties } from '@/lib/data/properties';

const money = (n: number) => `$${n.toLocaleString('en-US')}`;

export function generateStaticParams() {
  return furniture.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  return { title: product ? `${product.name} \u2014 Setting` : 'Setting' };
}

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const featuredIn = properties.filter((p) => p.furnitureSlugs.includes(product.slug));
  const related = furniture
    .filter((f) => f.category === product.category && f.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="max-w-content mx-auto px-6 md:px-10 pt-12 pb-28">
      <div className="grid md:grid-cols-2 gap-12 md:gap-16">
        <div className="relative aspect-square rounded-md overflow-hidden bg-plaster">
          <Image src={product.image} alt={product.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" priority />
        </div>

        <div className="md:pt-4">
          <p className="tag-label text-brass mb-3">{product.category} · {product.room}</p>
          <h1 className="font-display text-4xl text-ink mb-4">{product.name}</h1>
          <p className="font-mono text-2xl text-ink mb-6">{money(product.price)}</p>
          <p className="text-ink/65 leading-relaxed mb-8">{product.description}</p>

          <dl className="border-t hairline pt-6 space-y-3 mb-8">
            <div className="flex justify-between tag-label text-ink/50">
              <dt>Maker</dt>
              <dd className="text-ink/80 normal-case tracking-normal font-body">{product.maker}</dd>
            </div>
            <div className="flex justify-between tag-label text-ink/50">
              <dt>Dimensions</dt>
              <dd className="text-ink/80 normal-case tracking-normal font-body">{product.dimensions}</dd>
            </div>
            <div className="flex justify-between tag-label text-ink/50">
              <dt>Material</dt>
              <dd className="text-ink/80 normal-case tracking-normal font-body">{product.material}</dd>
            </div>
          </dl>

          <AddToCartButton product={product} />

          {featuredIn.length > 0 && (
            <div className="mt-8 pt-6 border-t hairline">
              <p className="tag-label text-ink/50 mb-3">Featured in</p>
              <div className="flex flex-wrap gap-2">
                {featuredIn.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/listings/${p.slug}`}
                    className="tag-label border border-ink/20 rounded-full px-4 py-2 hover:border-ink transition-colors"
                  >
                    {p.address}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-32">
          <p className="tag-label text-brass mb-3">More {product.category.toLowerCase()}</p>
          <h2 className="font-display text-3xl text-ink mb-10">You might also set</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
