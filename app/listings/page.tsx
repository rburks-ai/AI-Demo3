import ListingsBrowser from '@/components/ListingsBrowser';
import { properties } from '@/lib/data/properties';

export const metadata = { title: 'Listings — Setting' };

export default function ListingsPage() {
  return (
    <div className="max-w-content mx-auto px-6 md:px-10 pt-16 pb-28">
      <p className="tag-label text-brass mb-3">{properties.length} homes, fully set</p>
      <h1 className="font-display text-4xl md:text-5xl text-ink mb-3">Listings</h1>
      <p className="text-ink/60 max-w-lg mb-14">
        Every home below is staged and sold with its furniture included. Open a
        listing to see what&rsquo;s shoppable room by room.
      </p>

      <ListingsBrowser properties={properties} />
    </div>
  );
}
