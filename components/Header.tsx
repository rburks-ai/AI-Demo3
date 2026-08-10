import Link from 'next/link';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur border-b hairline">
      <div className="max-w-content mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl tracking-tight text-ink">
          Setting
        </Link>

        <nav className="hidden md:flex items-center gap-9 tag-label text-ink/70">
          <Link href="/listings" className="hover:text-ink transition-colors">
            Listings
          </Link>
          <Link href="/shop" className="hover:text-ink transition-colors">
            Shop
          </Link>
          <Link href="/#how-it-works" className="hover:text-ink transition-colors">
            How it works
          </Link>
        </nav>

        <Link
          href="/shop"
          className="tag-label border border-ink/20 rounded-full px-5 py-2.5 hover:bg-ink hover:text-paper hover:border-ink transition-colors"
        >
          Shop the room
        </Link>
      </div>
    </header>
  );
}
