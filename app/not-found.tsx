import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-content mx-auto px-6 md:px-10 py-40 text-center">
      <p className="tag-label text-brass mb-4">404</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-5">Nothing set here.</h1>
      <p className="text-ink/60 mb-10">
        This page hasn&rsquo;t been furnished yet. Try one of these instead.
      </p>
      <div className="flex justify-center gap-4">
        <Link href="/listings" className="tag-label bg-ink text-paper rounded-full px-6 py-3 hover:bg-charcoal2 transition-colors">
          Browse homes
        </Link>
        <Link href="/shop" className="tag-label border border-ink/25 rounded-full px-6 py-3 hover:border-ink transition-colors">
          Shop furniture
        </Link>
      </div>
    </div>
  );
}
