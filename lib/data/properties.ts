import { Property } from '@/lib/types';

const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=1600&auto=format&fit=crop`;

export const properties: Property[] = [
  {
    slug: 'the-alder-house',
    address: '214 Alder Street',
    neighborhood: 'Northside',
    city: 'Portland, OR',
    price: 840000,
    beds: 3,
    baths: 2,
    sqft: 1850,
    year: 1928,
    status: 'For Sale',
    description:
      'A 1928 craftsman on a corner lot, restored down to the fir floors and re-set with a furniture collection chosen room by room. Every piece you see is included in the shop, whether or not you buy the house.',
    heroImage: img('photo-1616486338812-3dadae4b4ace'),
    gallery: [
      img('photo-1616486338812-3dadae4b4ace'),
      img('photo-1600210492486-724fe5c67fb0'),
      img('photo-1493809842364-78817add7ffb'),
      img('photo-1568605114967-8130f3a36994'),
    ],
    hotspots: [
      { id: 'h1', x: 22, y: 62, productSlug: 'ansel-lounge-chair' },
      { id: 'h2', x: 68, y: 40, productSlug: 'kiln-table-lamp' },
      { id: 'h3', x: 48, y: 78, productSlug: 'hearth-boucle-sofa' },
    ],
    furnitureSlugs: ['ansel-lounge-chair', 'kiln-table-lamp', 'hearth-boucle-sofa', 'fen-linen-throw'],
  },
  {
    slug: 'millhouse-loft',
    address: '88 Canal Row',
    neighborhood: 'Riverwest',
    city: 'Chicago, IL',
    price: 625000,
    beds: 2,
    baths: 2,
    sqft: 1400,
    year: 1911,
    status: 'New',
    description:
      'A converted mill loft with 11-foot ceilings and the original steel columns left exposed. Set with a studio-scale furniture plan built for open-plan living.',
    heroImage: img('photo-1600210492486-724fe5c67fb0'),
    gallery: [
      img('photo-1600210492486-724fe5c67fb0'),
      img('photo-1584622650111-993a426fbf0a'),
      img('photo-1512917774080-9991f1c4c750'),
      img('photo-1560448204-e02f11c3d0e2'),
    ],
    hotspots: [
      { id: 'h1', x: 30, y: 58, productSlug: 'stipple-task-chair' },
      { id: 'h2', x: 74, y: 66, productSlug: 'ridge-floor-lamp' },
    ],
    furnitureSlugs: ['stipple-task-chair', 'ridge-floor-lamp', 'marl-walnut-sideboard'],
  },
  {
    slug: 'birchwood-bungalow',
    address: '12 Birchwood Lane',
    neighborhood: 'Maple Hill',
    city: 'Austin, TX',
    price: 712000,
    beds: 3,
    baths: 2,
    sqft: 1620,
    year: 1954,
    status: 'Pending',
    description:
      'A single-story bungalow reworked for indoor-outdoor living, with a dining set chosen to anchor the open kitchen and a bedroom wing kept deliberately quiet.',
    heroImage: img('photo-1493809842364-78817add7ffb'),
    gallery: [
      img('photo-1493809842364-78817add7ffb'),
      img('photo-1503602642458-232111445657'),
      img('photo-1570129477492-45c003edd2be'),
      img('photo-1522708323590-d24dbb6b0267'),
    ],
    hotspots: [
      { id: 'h1', x: 50, y: 55, productSlug: 'corvo-dining-table' },
      { id: 'h2', x: 20, y: 35, productSlug: 'marl-walnut-sideboard' },
    ],
    furnitureSlugs: ['corvo-dining-table', 'marl-walnut-sideboard', 'fen-linen-throw'],
  },
  {
    slug: 'the-kiln-house',
    address: '501 Foundry Street',
    neighborhood: 'Old Town',
    city: 'Denver, CO',
    price: 955000,
    beds: 4,
    baths: 3,
    sqft: 2400,
    year: 1902,
    status: 'For Sale',
    description:
      'A four-bedroom brick rowhouse near the old foundry district, set top to bottom with pieces from Foundry Objects\u2014a natural pairing, given the address.',
    heroImage: img('photo-1568605114967-8130f3a36994'),
    gallery: [
      img('photo-1568605114967-8130f3a36994'),
      img('photo-1594026112284-02bb6f3352fe'),
      img('photo-1584622650111-993a426fbf0a'),
      img('photo-1533090161767-e6ffed986c88'),
    ],
    hotspots: [
      { id: 'h1', x: 40, y: 60, productSlug: 'hearth-boucle-sofa' },
      { id: 'h2', x: 78, y: 44, productSlug: 'ridge-floor-lamp' },
    ],
    furnitureSlugs: ['hearth-boucle-sofa', 'ridge-floor-lamp', 'loft-bed-frame', 'bower-entry-bench'],
  },
  {
    slug: 'cedarbrook-cottage',
    address: '9 Cedarbrook Road',
    neighborhood: 'Willow Creek',
    city: 'Asheville, NC',
    price: 498000,
    beds: 2,
    baths: 1,
    sqft: 1100,
    year: 1961,
    status: 'For Sale',
    description:
      'A one-story cottage backing onto a creek lot, set simply: one good chair by the window, a bed frame low enough to disappear, nothing extra.',
    heroImage: img('photo-1560448204-e02f11c3d0e2'),
    gallery: [
      img('photo-1560448204-e02f11c3d0e2'),
      img('photo-1570129477492-45c003edd2be'),
      img('photo-1512917774080-9991f1c4c750'),
    ],
    hotspots: [
      { id: 'h1', x: 26, y: 50, productSlug: 'ansel-lounge-chair' },
      { id: 'h2', x: 65, y: 70, productSlug: 'loft-bed-frame' },
    ],
    furnitureSlugs: ['ansel-lounge-chair', 'loft-bed-frame', 'fen-linen-throw'],
  },
  {
    slug: 'the-marrow-flat',
    address: '77 Union Avenue',
    neighborhood: 'Fenwick',
    city: 'Seattle, WA',
    price: 780000,
    beds: 3,
    baths: 2,
    sqft: 1750,
    year: 1938,
    status: 'New',
    description:
      'A top-floor flat with water views from the living room, set with a furniture plan built around the light: pale oak, brass, and linen throughout.',
    heroImage: img('photo-1584622650111-993a426fbf0a'),
    gallery: [
      img('photo-1584622650111-993a426fbf0a'),
      img('photo-1616486338812-3dadae4b4ace'),
      img('photo-1522708323590-d24dbb6b0267'),
      img('photo-1519643381401-22c77e60520e'),
    ],
    hotspots: [
      { id: 'h1', x: 34, y: 45, productSlug: 'kiln-table-lamp' },
      { id: 'h2', x: 60, y: 68, productSlug: 'hearth-boucle-sofa' },
      { id: 'h3', x: 85, y: 30, productSlug: 'bower-entry-bench' },
    ],
    furnitureSlugs: ['kiln-table-lamp', 'hearth-boucle-sofa', 'bower-entry-bench'],
  },
];

export const getProperty = (slug: string) => properties.find((p) => p.slug === slug);
