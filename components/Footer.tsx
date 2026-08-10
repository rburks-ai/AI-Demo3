import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-paper mt-32">
      <div className="max-w-content mx-auto px-6 md:px-10 py-16 grid grid-cols-2 md:grid-cols-4 gap-10">
        <div className="col-span-2">
          <div className="font-display text-2xl mb-4">Setting</div>
          <p className="text-paper/60 max-w-xs leading-relaxed">
            Fully furnished homes for sale, and the pieces that fill them—
            sold as a room, or one at a time.
          </p>
        </div>
        <div>
          <div className="tag-label text-paper/50 mb-4">Browse</div>
          <ul className="space-y-2.5 text-paper/80">
            <li><Link href="/listings" className="hover:text-brassLight transition-colors">All listings</Link></li>
            <li><Link href="/shop" className="hover:text-brassLight transition-colors">All furniture</Link></li>
          </ul>
        </div>
        <div>
          <div className="tag-label text-paper/50 mb-4">Studio</div>
          <ul className="space-y-2.5 text-paper/80">
            <li><a href="#" className="hover:text-brassLight transition-colors">About</a></li>
            <li><a href="#" className="hover:text-brassLight transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t hairline-light">
        <div className="max-w-content mx-auto px-6 md:px-10 py-6 tag-label text-paper/40">
          Setting — mock listings, for demonstration only.
        </div>
      </div>
    </footer>
  );
}
