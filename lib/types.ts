export type Hotspot = {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  productSlug: string;
};

export type Property = {
  slug: string;
  address: string;
  neighborhood: string;
  city: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  year: number;
  status: 'For Sale' | 'Pending' | 'New';
  description: string;
  heroImage: string;
  gallery: string[];
  hotspots: Hotspot[];
  furnitureSlugs: string[];
};

export type Product = {
  slug: string;
  name: string;
  maker: string;
  category: 'Seating' | 'Tables' | 'Lighting' | 'Storage' | 'Textiles';
  room: 'Living Room' | 'Bedroom' | 'Dining' | 'Studio' | 'Entry';
  price: number;
  dimensions: string;
  material: string;
  description: string;
  image: string;
  gallery: string[];
};
