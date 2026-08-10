import { Product } from '@/lib/types';

const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1400&auto=format&fit=crop`;

export const furniture: Product[] = [
  {
    slug: 'ansel-lounge-chair',
    name: 'Ansel Lounge Chair',
    maker: 'Setting Studio',
    category: 'Seating',
    room: 'Living Room',
    price: 1240,
    dimensions: '31"W x 33"D x 30"H',
    material: 'Oiled walnut, wool boucle',
    description:
      'A low, wide-armed lounge chair built for reading corners and long conversations. The frame is solid walnut, joined by hand, with a boucle seat that softens with use.',
    image: img('photo-1567538096630-e0c55bd6374c'),
    gallery: [img('photo-1567538096630-e0c55bd6374c'), img('photo-1567016432779-094069958ea5')],
  },
  {
    slug: 'kiln-table-lamp',
    name: 'Kiln Ceramic Table Lamp',
    maker: 'Foundry Objects',
    category: 'Lighting',
    room: 'Living Room',
    price: 180,
    dimensions: '9"W x 9"D x 17"H',
    material: 'Stoneware, linen shade',
    description:
      'Hand-thrown stoneware base in a matte glaze, paired with a natural linen shade that warms the light it casts.',
    image: img('photo-1592078615290-033ee584e267'),
    gallery: [img('photo-1592078615290-033ee584e267')],
  },
  {
    slug: 'corvo-dining-table',
    name: 'Corvo Oak Dining Table',
    maker: 'Setting Studio',
    category: 'Tables',
    room: 'Dining',
    price: 2400,
    dimensions: '84"W x 38"D x 30"H',
    material: 'Solid white oak',
    description:
      'Seats eight comfortably. Cut from a single run of white oak, with a breadboard edge and a hand-rubbed oil finish that ages well with the table.',
    image: img('photo-1493663284031-b7e3aefcae8e'),
    gallery: [img('photo-1493663284031-b7e3aefcae8e')],
  },
  {
    slug: 'hearth-boucle-sofa',
    name: 'Hearth Boucle Sofa',
    maker: 'Setting Studio',
    category: 'Seating',
    room: 'Living Room',
    price: 3100,
    dimensions: '88"W x 36"D x 31"H',
    material: 'Boucle, kiln-dried hardwood frame',
    description:
      'A deep, low-slung three-seater with rolled arms and a boucle upholstery that reads soft from across the room and holds its shape underneath you.',
    image: img('photo-1594026112284-02bb6f3352fe'),
    gallery: [img('photo-1594026112284-02bb6f3352fe'), img('photo-1616486338812-3dadae4b4ace')],
  },
  {
    slug: 'marl-walnut-sideboard',
    name: 'Marl Walnut Sideboard',
    maker: 'Foundry Objects',
    category: 'Storage',
    room: 'Dining',
    price: 1850,
    dimensions: '68"W x 18"D x 32"H',
    material: 'Walnut veneer, brass pulls',
    description:
      'Three doors, adjustable shelving, and a cable pass-through in the back panel for the credenza that ends up holding everything.',
    image: img('photo-1595428774223-ef52624120d2'),
    gallery: [img('photo-1595428774223-ef52624120d2')],
  },
  {
    slug: 'fen-linen-throw',
    name: 'Fen Linen Throw',
    maker: 'Setting Studio',
    category: 'Textiles',
    room: 'Bedroom',
    price: 95,
    dimensions: '50" x 70"',
    material: 'Stonewashed linen',
    description:
      'Heavyweight linen, stonewashed for immediate softness. Comes in four muted tones that pair with most upholstery.',
    image: img('photo-1522708323590-d24dbb6b0267'),
    gallery: [img('photo-1522708323590-d24dbb6b0267')],
  },
  {
    slug: 'stipple-task-chair',
    name: 'Stipple Task Chair',
    maker: 'Foundry Objects',
    category: 'Seating',
    room: 'Studio',
    price: 560,
    dimensions: '24"W x 24"D x 33"H',
    material: 'Ash, wool felt',
    description:
      'A desk chair that doesn\u2019t look like one. Ash frame, felt seat pad, and a recline that\u2019s tuned for four hours of focus, not eight of slouching.',
    image: img('photo-1571508601891-ca5e7a713859'),
    gallery: [img('photo-1571508601891-ca5e7a713859')],
  },
  {
    slug: 'ridge-floor-lamp',
    name: 'Ridge Brass Floor Lamp',
    maker: 'Foundry Objects',
    category: 'Lighting',
    room: 'Studio',
    price: 410,
    dimensions: '14"W x 14"D x 62"H',
    material: 'Brushed brass, opal glass',
    description:
      'An articulating brass arm on a weighted marble base, with an opal globe that gives even, shadow-free light for close work.',
    image: img('photo-1513506003901-1e6a229e2d15'),
    gallery: [img('photo-1513506003901-1e6a229e2d15')],
  },
  {
    slug: 'loft-bed-frame',
    name: 'Loft Bed Frame, Ash',
    maker: 'Setting Studio',
    category: 'Storage',
    room: 'Bedroom',
    price: 1320,
    dimensions: 'Queen, 64"W x 86"D x 14"H',
    material: 'Solid ash',
    description:
      'A platform frame low enough to skip the box spring, with a headboard slatted for reading against without discomfort.',
    image: img('photo-1533090161767-e6ffed986c88'),
    gallery: [img('photo-1533090161767-e6ffed986c88')],
  },
  {
    slug: 'bower-entry-bench',
    name: 'Bower Entry Bench',
    maker: 'Foundry Objects',
    category: 'Seating',
    room: 'Entry',
    price: 480,
    dimensions: '42"W x 15"D x 18"H',
    material: 'White oak, cane webbing',
    description:
      'A narrow bench for the entry \u2014 wide enough to sit and tie your shoes, caned so it stays light in a small hallway.',
    image: img('photo-1519643381401-22c77e60520e'),
    gallery: [img('photo-1519643381401-22c77e60520e')],
  },
];

export const getProduct = (slug: string) => furniture.find((p) => p.slug === slug);
