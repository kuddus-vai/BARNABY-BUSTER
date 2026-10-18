import { Product } from '../types';

export interface VlogItem {
  id: string;
  title: string;
  platform: 'Instagram' | 'Facebook' | 'YouTube' | 'TikTok';
  views: string;
  duration: string;
  thumbnail: string;
  description: string;
  date: string;
  tags: string[];
  commentsCount: number;
}

export interface ParkRadar {
  id: string;
  name: string;
  neighborhood: string;
  vibeScore: number;
  vibeStatus: string;
  activeDogsCount: number;
  currentActivity: string;
  lastUpdated: string;
  tags: string[];
}

export interface FanBark {
  id: string;
  author: string;
  dogName: string;
  breed: string;
  message: string;
  timestamp: string;
  sticker: string;
  likes: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'distressed-tee',
    name: '"I\'m Fine" Distressed Tee',
    tagline: 'Mud-splattered aesthetic just like Barnaby\'s signature look.',
    affiliateUrl: 'https://yourshoplink.com/product1',
    rating: 4.9,
    reviewsCount: 142,
    category: 'Apparel',
    badge: 'BESTSELLER',
    badgeColor: '#FFCC00',
    accentColor: '#00FFFF',
    sizes: ['S', 'M', 'L', 'XL', 'Chonker XXL'],
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    details: [
      'Heavyweight 240 GSM 100% pre-shrunk vintage wash cotton',
      'Screen printed with eco-friendly distress discharge ink',
      'Machine wash cold, dog hair friendly weave'
    ],
    description: 'Designed in Brooklyn for humans who regularly sprint through rainstorms because their dog smelled a forgotten street bagel. Built tough, pre-distressed, and undeniably stylish.'
  },
  {
    id: 'squeaky-hedgehog',
    name: 'Top-Tier Squeaky Hedgehog',
    tagline: 'Guaranteed to annoy your local subway passengers instantly.',
    affiliateUrl: 'https://yourshoplink.com/product2',
    rating: 5.0,
    reviewsCount: 388,
    category: 'Toys',
    badge: 'OFFICIALLY UNHINGED',
    badgeColor: '#FF3366',
    accentColor: '#FF3366',
    imageUrl: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?auto=format&fit=crop&w=800&q=80',
    details: [
      'Triple-chamber puncture-resistant loud squeaker',
      'Textured silicone quills for dental gum stimulation',
      'Floats in water during Hudson River slip-and-slides'
    ],
    description: 'Barnaby\'s prized possession. Emits a piercing 2.4kHz harmonic squeak engineered to wake up entire apartment complexes within 3 seconds flat.'
  },
  {
    id: 'ambassador-lanyard',
    name: 'Pet-Human Ambassador Lanyard',
    tagline: 'Official VIP badge to bypass all lines at the dog park.',
    affiliateUrl: 'https://yourshoplink.com/product3',
    rating: 4.8,
    reviewsCount: 96,
    category: 'Gear',
    badge: 'VIP CREDENTIAL',
    badgeColor: '#00FFFF',
    accentColor: '#FFCC00',
    imageUrl: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80',
    details: [
      'Heavy-duty jacquard woven nylon with anti-snag finish',
      'Quick-release safety buckle and industrial swivel clip',
      'Includes waterproof PVC Buster Ambassador credential card'
    ],
    description: 'Never get questioned at the dog run gate again. Flash the official Bark-Waggen diplomatic credentials and let the zoomies commence.'
  },
  {
    id: 'zoomie-treats',
    name: 'Zoomie Fuel Peanut Butter Biscuits',
    tagline: 'Crunchy all-natural rocket fuel for high-velocity zoomies.',
    affiliateUrl: 'https://yourshoplink.com/product-treats',
    rating: 4.9,
    reviewsCount: 210,
    category: 'Treats',
    badge: '100% ORGANIC',
    badgeColor: '#10B981',
    accentColor: '#10B981',
    imageUrl: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?auto=format&fit=crop&w=800&q=80',
    details: [
      'Roasted peanut butter, pumpkin puree, and organic oat flour',
      'Zero artificial preservatives, corn, or fillers',
      'Baked in small batches right here in New York'
    ],
    description: 'The secret behind Buster\'s endless cardio engine. Pocket-sized, extra-crunchy, and aroma-packed so your dog will execute a 360-spin on command.'
  },
  {
    id: 'chaos-bandana',
    name: 'Neon Chaos Reflective Bandana',
    tagline: 'High-visibility street style for late-night sidewalk sprints.',
    affiliateUrl: 'https://yourshoplink.com/product-bandana',
    rating: 4.7,
    reviewsCount: 84,
    category: 'Apparel',
    badge: 'NIGHT RUNNER',
    badgeColor: '#F59E0B',
    accentColor: '#FF3366',
    sizes: ['Small Pup (12-16")', 'Medium Beast (16-22")', 'Big Boy (22-28")'],
    imageUrl: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=800&q=80',
    details: [
      '3M Scotchlite reflective border striping for 500ft night visibility',
      'Breathable ripstop fabric that resists brush and teeth',
      'Signature graffiti paw print tag'
    ],
    description: 'Stay visible while terrorizing pigeons at 11:30 PM. Soft against the fur, waterproof against puddle splashes, and iconic on camera.'
  },
  {
    id: 'sticker-bomb-pack',
    name: 'Buster Sticker Bomb 10-Pack',
    tagline: 'Slap high-grade vinyl chaos onto your laptop, flask, or leash.',
    affiliateUrl: 'https://yourshoplink.com/product-stickers',
    rating: 5.0,
    reviewsCount: 512,
    category: 'Gear',
    badge: 'STICKER BOMB',
    badgeColor: '#EC4899',
    accentColor: '#00FFFF',
    imageUrl: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    details: [
      '10 die-cut UV laminated weatherproof vinyl stickers',
      'Includes "OMG SO HYPE!", "SNACK ATTACK!", and "ZOOMIES"',
      'Resistant to rain, snow, drool, and sunlight'
    ],
    description: 'Transform any boring surface into an officially certified Bark-Waggen fan zone. Peel, slap, repeat.'
  }
];

export const VLOGS: VlogItem[] = [
  {
    id: 'vlog-1',
    title: 'The Great Tompkins Square Squirrel Stand-off (4K POV)',
    platform: 'Instagram',
    views: '482K',
    duration: '0:58',
    thumbnail: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    description: 'Barnaby spots the notorious Alpha Squirrel of East 9th Street. 14 minutes of intense eye contact followed by supersonic zoomies.',
    date: 'Yesterday',
    tags: ['NYC Dogs', 'Zoomies', 'East Village'],
    commentsCount: 1842
  },
  {
    id: 'vlog-2',
    title: 'Riding the Subway in an IKEA Bag: The Legal Loophole',
    platform: 'Facebook',
    views: '1.2M',
    duration: '2:14',
    thumbnail: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=600&q=80',
    description: 'MTA rules state "dogs in bags permitted". They never specified how big Buster\'s paws are. Commuters fall in love on the L Train.',
    date: '3 days ago',
    tags: ['Subway Dog', 'NYC Life', 'Ambassador'],
    commentsCount: 4290
  },
  {
    id: 'vlog-3',
    title: 'Testing The Hedgehog Squeaker in 10 Public Places',
    platform: 'TikTok',
    views: '890K',
    duration: '0:45',
    thumbnail: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=600&q=80',
    description: 'From Washington Square fountain to SoHo boutique lines: Buster testing human acoustic tolerance. Verdict: 10/10 squeaks.',
    date: '5 days ago',
    tags: ['Squeaky Toy', 'Pranks', 'Hype'],
    commentsCount: 3110
  },
  {
    id: 'vlog-4',
    title: 'Midnight Sheep Meadow Sprint: GPS Clocked 28.4 MPH!',
    platform: 'YouTube',
    views: '340K',
    duration: '4:32',
    thumbnail: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=600&q=80',
    description: 'Full GPS telemetry tracking Buster\'s midnight sprint session under the Manhattan skyline. Pure kinetic canine poetry.',
    date: '1 week ago',
    tags: ['Speedrun', 'Central Park', 'Telemetry'],
    commentsCount: 920
  }
];

export const DOG_PARKS: ParkRadar[] = [
  {
    id: 'park-wsq',
    name: 'Washington Square Park Dog Run',
    neighborhood: 'Greenwich Village',
    vibeScore: 98,
    vibeStatus: '🔥 MAXIMUM MAYHEM',
    activeDogsCount: 24,
    currentActivity: '3-way French Bulldog wrestling tournament',
    lastUpdated: '4 mins ago',
    tags: ['Turf surface', 'Water fountain active', 'Shady benches']
  },
  {
    id: 'park-cp',
    name: 'Central Park Sheep Meadow',
    neighborhood: 'Upper West Side',
    vibeScore: 92,
    vibeStatus: '⚡ ZOOMIE HAVEN',
    activeDogsCount: 42,
    currentActivity: 'Buster clocked sprinting clockwise laps',
    lastUpdated: '12 mins ago',
    tags: ['Open grass', 'Frisbee territory', 'Off-leash hours']
  },
  {
    id: 'park-tsp',
    name: 'Tompkins Square Dog Run',
    neighborhood: 'East Village',
    vibeScore: 89,
    vibeStatus: '🥨 SNACK CONVENTION',
    activeDogsCount: 18,
    currentActivity: 'Heavy sniffing circle near north fence',
    lastUpdated: '18 mins ago',
    tags: ['Crushed stone', 'Halloween parade fame', 'Double gate']
  },
  {
    id: 'park-mad',
    name: 'Madison Square Park Run',
    neighborhood: 'Flatiron District',
    vibeScore: 84,
    vibeStatus: '🧐 SQUIRREL STAKEOUT',
    activeDogsCount: 15,
    currentActivity: 'Group staring contest at 1 lone squirrel',
    lastUpdated: '31 mins ago',
    tags: ['Gravel run', 'Shake Shack proximity', 'Buster regular']
  }
];

export const FAN_BARKS: FanBark[] = [
  {
    id: 'bark-1',
    author: 'Elena & Winston',
    dogName: 'Winston the Corgi',
    breed: 'Pembroke Welsh Corgi',
    message: 'Winston watched the subway vlog and immediately barked at my tote bag. He is demanding an IKEA carrier right now!',
    timestamp: '22 mins ago',
    sticker: 'OMG SO HYPE!',
    likes: 34
  },
  {
    id: 'bark-2',
    author: 'Marcus K.',
    dogName: 'Diesel',
    breed: 'Pitbull / Boxer Mix',
    message: 'The Squeaky Hedgehog is indestructible! Diesel has destroyed 40 toys this year, but this thing still squeaks proudly at 6 AM.',
    timestamp: '1 hour ago',
    sticker: 'SNACK ATTACK!',
    likes: 58
  },
  {
    id: 'bark-3',
    author: 'Chloe M.',
    dogName: 'Pip',
    breed: 'Jack Russell Terrier',
    message: 'Met Buster at Washington Square Park on Tuesday. Can confirm his energy level is indeed infinity / 10. Truly a living legend!',
    timestamp: '3 hours ago',
    sticker: 'NO SLEEP TIL BROOKLYN',
    likes: 89
  }
];
