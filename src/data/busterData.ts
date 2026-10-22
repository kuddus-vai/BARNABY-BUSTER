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
    "name": "Eco Strong Pet Stain and Odor Remover - Cat Urine Enzyme Cleaner Destroyer",
    "tagline": "Urine Destroyer for Dogs, Pet Urine Enzyme Cleaner - 128 Oz",
    "affiliateUrl": "https://a.co/d/05BoiwUp",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Gear",
    "description": "Enzymatic Cleaner for Dog Urine: Our natural Bio-Enzymatic formula breaks down and digests the odor and stain causing proteins in pet and people urine. We eliminate the problem and not simply mast the odor with perfumes. This multi-purpose enzyme cleaning solution for a wide variety of surfaces and environments – use on carpets, furniture, hardwood, tile, drains, liter boxes, garbage cans, RVs and more\nCat Litter Deodorizer: In between scooping you can quickly and easily eliminate get rid of lingering litter box smells. Simply spray liberally, over the litter and you’ll notice the odor will immediately disappear. Repeat anytime your cat leaves a particularly smelly deposit and you don’t have the time to scoop. Also control odors by using to clean the litter box before filling with new litter.\nUltimate Enzyme Cleaner for Dog Urine and Poop in Carpet: When your puppy, kitten, cat or dog accidentally urinates on the carpet our Bio-Enzyme cleaner will break down and destroy the odor and stain causing proteins in; cat or dog pee, poop vomit, general pet smells, stains, grease from your carpet. This will also work on area rugs and can be used in carpet cleaner, check direction for best results.\nMy Pet Peed on My Bed: So often pet parents need a solution to the problem caused by pets, dogs or cats, young or old having accidents. Accidents can happen on bedding, sheets, towels, clean or dirty clothes. If an accident happens on something that washable, or you are washing your pet’s bed, add Eco Strong to the prewash cycle and the odors will be gone. Follow directions for best results.\nMulti-Purpose Professional Strength, made in the USA, this multi-purpose product is Non-toxic, Non- corrosive, non-flammable, non-acidic, and non-caustic. Works on organic stains left by pets or people – Eco Strong is tough on stains and gentle on surfaces.",
    "badge": "NEW",
    "badgeColor": "#FFCC00",
    "accentColor": "#00FFFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61jNeNsfGvL._AC_SL1200_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792690247205-yc6t"
  },
  {
    "name": "Nutrish Soup Bones Beef Dog Chews, 6.3 oz. Bag (24 Treats) (Rachael Ray)",
    "tagline": "Nutrish Soup Bones Beef Dog Chews, 6.3 oz. Bag (24 Treats) (Rachael Ray)",
    "affiliateUrl": "https://a.co/d/0eUDrsni",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Treats",
    "description": "Contains eight (8) 6.3-ounce pouches (24 dog chews total) of premium dog chews with real beef and barley\nDog treats made with real beef\nRawhide-free mini dog chews formulated with no by-product meals or added corn or soy ingredients\nPremium dog chews with a unique texture that's easy on the teeth & gums and perfect for small, medium or large dogs of all ages\nEvery purchase helps support animals in need through The Rachael Ray Foundation",
    "badge": "VIP",
    "badgeColor": "#FFCC00",
    "accentColor": "#FFCC00",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81l7rsjmK3L._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792690063202-7ue2"
  },
  {
    "name": "Rachel Ray Nutrish 5oz Comfort Treats Variety Pack (4 Pack)",
    "tagline": "Contains one (1) Rachael Ray Nutrish Meatball Morsels Beef, Chicken & Bacon Recipe Dog Treats, 5 oz. Bag, one (1) Rachael Ray Nutrish Turkey Bites Turkey Recipe With Hickory Smoke Bacon Flavor Dog Treats, 5 oz. Bag, one (1) Rachael Ray Nutrish Savory Roasters Chicken Recipe Dog Treats, 5 oz. Bag, and one (1) Rachael Ray Nutrish Burger Bites Beef Recipe With Bison Dog Treats, 5 oz. Bag Real beef, turkey, and chicken are the number one ingredients Safely USA cooked with the world’s finest ingredients No artificial flavors or meat by-products",
    "affiliateUrl": "https://a.co/d/0b77VuaS",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Treats",
    "description": "Contains one (1) Rachael Ray Nutrish Meatball Morsels Beef, Chicken & Bacon Recipe Dog Treats, 5 oz. Bag, one (1) Rachael Ray Nutrish Turkey Bites Turkey Recipe With Hickory Smoke Bacon Flavor Dog Treats, 5 oz. Bag, one (1) Rachael Ray Nutrish Savory Roasters Chicken Recipe Dog Treats, 5 oz. Bag, and one (1) Rachael Ray Nutrish Burger Bites Beef Recipe With Bison Dog Treats, 5 oz. Bag\nReal beef, turkey, and chicken are the number one ingredients\nSafely USA cooked with the world’s finest ingredients\nNo artificial flavors or meat by-products\n",
    "badge": "VIP",
    "badgeColor": "#FFCC00",
    "accentColor": "#FF3366",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/61P++MiVfIL._SL1001_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792689996854-wrr9"
  },
  {
    "name": "Nutrish Savory Roasters Dog Treats with Chicken, 30 oz. Pouch (Rachael Ray)",
    "tagline": "Grain Free Recipe with No Added Corn or Soy Ingredients, Veterinarian Reviewed Formula, Resealable Bag",
    "affiliateUrl": "https://a.co/d/07FiDzc8",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Treats",
    "description": "SOFT DOG TREATS: Contains one (1) 30-ounce bag of dog treats that are are easy to chew and perfect for rewarding dogs of all sizes\nREAL CHICKEN DOG TREATS: Made with real chicken as the number one ingredient for a delicious taste dogs love\nGREAT FOR TRAINING: Easily break treats into smaller pieces for dog training, positive reinforcement, portion-controlled rewards, or smaller dog\nNO ARTIFICIAL FLAVORS: Crafted with no artificial flavors or meat by-product meals and safely cooked in the USA\nGRAIN FREE RECIPE: Made with no added grain ingredients for pet parents seeking grain free dog treats",
    "badge": "NEW",
    "badgeColor": "#FFCC00",
    "accentColor": "#00FFFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81mvF0uZj8L._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792689901866-yc9g"
  },
  {
    "name": "Nutrish Rachael Ray Soup Bones Long Lasting Dog Chews Variety Pack, 22 Count (Pack of 2)",
    "tagline": "The information below is per-pack only",
    "affiliateUrl": "https://a.co/d/037iLWNF",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Treats",
    "description": "Contains two (2) 23.1-ounce pouches (11 Chicken & Veggies flavor and 11 Beef & Barley flavor dog chews)\nTasty, long lasting dog chews\nMade with real chicken or real beef\nSafely USA cooked with the world’s finest ingredients\nNo added corn or soy ingredients, and no artificial flavors or animal by-product meals",
    "badge": "NEW",
    "badgeColor": "#FFCC00",
    "accentColor": "#FF3366",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792689831775-nkv3"
  },
  {
    "name": "Ultra Chewy Peanut Butter Double Treat Bones, 24 Count",
    "tagline": "Long-Lasting Dog Treats, Made in USA, For Large and Small Breeds, Highly Digestible, Ideal for Aggressive Chewers",
    "affiliateUrl": "https://a.co/d/0aCMiVY6",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Treats",
    "description": "Long-lasting 2-in-1 Chew: Designed to last, providing your dog with a long-lasting outer layer and a chewy flavorful center for hours of chewing fun\nHighly Digestible and Rawhide Free: Highly digestible formula that will make any dog crave more. Long lasting as the best rawhide bones, but with none of the harmful chemicals or upset stomach\nVersatile and Convenient: Easy to carry around, making them a great option for on-the-go treats. These dog treats are a convenient and versatile treat that dogs love\nPromotes Good Dental Health: Chewing is a natural instinct for dogs, and Ultra Chewy Double Treat Bones are the way to satisfy that instinct while promoting good dental health. As your dog chews, the treat helps to clean their teeth, reducing plaque and tartar build-up. This can lead to fresher breath and a healthier mouth\nProudly Made in USA: Manufactured in the United States with high-quality ingredients to ensure safety and quality standards for your beloved pet\nSuitable for All Breed Sizes: Formulated for dogs of all sizes, from small to large breeds, and designed to satisfy aggressive chewers with a durable and long-lasting chewing experience\nDelicious Peanut Butter Flavor: Features an irresistible peanut butter flavor that dogs love, making these treats a rewarding and enjoyable chewing experience for your furry companion\n",
    "badge": "NEW",
    "badgeColor": "#FFCC00",
    "accentColor": "#00FFFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71dzkqg9SvL._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792689763560-hv0q"
  },
  {
    "name": "Milk-Bone Original Medium Dog Biscuits, 10 lb Box",
    "tagline": "280+ treats, classic meaty taste, crunchy dog treats for dogs 20-50lbs, 15% protein, 12 vitamins & minerals, made in the USA",
    "affiliateUrl": "https://a.co/d/0ddcAfi2",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Treats",
    "description": "Milk-Bone Original Biscuits: Contains one (1) 10 lb box with 280+ crunchy dog treats featuring the classic Milk-Bone meaty taste dogs love\nDog treats for medium dogs: Crunchy dog biscuits for dogs 20–50 lbs. with the classic meaty taste dogs love\nCrunchy texture for dental support: Crunchy dog treats help freshen breath and reduce tartar buildup while dogs chew\nFortified with vitamins and minerals: Made with 15% protein plus 12 vitamins, including calcium and phosphorous for healthy teeth and bones\nMade in the USA: Proudly produced and baked with love in USA facilities using quality ingredients dogs love",
    "badge": "VIP",
    "badgeColor": "#FFCC00",
    "accentColor": "#FF3366",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81IfJLJtCDL._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792689673162-eroi"
  },
  {
    "name": "Indestructible Dog Toys for Aggressive Chewers, Extreme Tough Toys for Large Dogs, Real Beef Flavored, Dog Bone for Medium/Large Dogs Breed, Gifts for Dogs",
    "tagline": "Don't worry about the dog toys being easily broken and replaced",
    "affiliateUrl": "https://a.co/d/0c4jgGPw",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Toys",
    "description": "【For Aggressive Chewers & Long Lasting】This dog chew toy is big and heavy, especially suitable for medium and large dogs, at the same time it is hard and bite-resistant enough to keep dogs chewing for at least several months. Don't worry about the dog toys being easily broken and replaced frequently.\n【Real Beef Flavor】The beef flavor is more attractive to the dog's desire to chew and your dog will love it. Your dog will be more willing to chew it because of the beef flavor.\n【Keep Health & Stay Active】Chewing and playing can help them relieve anxiety and release extra energy. Use appropriate toys to cultivate a good chewing habit for dogs, which can greatly reduce problems of oral hygiene and keep their body stay healthy.\n【Made of Food Grade Nylon】 This dog chew toy is made of food-grade nylon. Nylon is especially suitable for aggressive chewers. Nylon dog toys are the best replacement for bones and satisfy your dog's natural urge to chew.\n【Dog Gifts】 The dog toy is perfect for aggressive chewers to enjoy long lasting entertainment, best tough chew toys for dogs as festival gift for your fur friends and dog owners.\n【Caution】No toys indestructibie, Dog toys should always be inspected regularly as any rips or tears can injure your pet. Any damaged toy should be taken away from your pet immediately, Ensure that the toy you select is appropriately size for your dog.",
    "badge": "VIP",
    "badgeColor": "#FFCC00",
    "accentColor": "#FF3366",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81rVhpJXrHL._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792689585089-rfm3"
  },
  {
    "name": "DinoBone 2-Pack Tough Dog Chew Toys for Aggressive Chewers, Rock-Hard Nylon",
    "tagline": "Bacon Flavor Bones for Large Dogs 20–90 Lb, Designed for Power Chewers and Helps Redirect Destructive Chewing, Amber Color",
    "affiliateUrl": "https://a.co/d/0hjaK8qy",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Toys",
    "description": "BUILT FOR POWER CHEWERS WHO DESTROY ORDINARY TOYS: Designed for dogs that quickly tear through plush, rubber, and softer chew toys. Made from durable nylon to provide a longer-lasting chewing outlet for strong jaws and determined chewers\nHELPS REDIRECT DESTRUCTIVE CHEWING: Dogs chew for many reasons, including boredom, stress, and excess energy. DinoBone helps redirect chewing away from shoes, furniture, and other household items by providing a more appropriate chewing target\nGIVES YOU MORE TIME TO FOCUS: Whether you're working, taking calls, cooking dinner, or simply relaxing, DinoBone helps keep dogs occupied and engaged without requiring constant attention\n2 TOYS FOR ROTATION & LONGER INTEREST: Rotating chew toys helps maintain novelty and keeps dogs interested longer. Great for multi-dog households or dogs that get bored with the same toy too quickly\nPEANUT BUTTER SLOT FOR EXTRA ENGAGEMENT: Fill the built-in groove with peanut butter or dog-safe treats to create a more rewarding chewing experience and help extend playtime",
    "badge": "VIP",
    "badgeColor": "#FFCC00",
    "accentColor": "#00FFFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71dLL62giLL._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792689521761-9t5d"
  },
  {
    "name": "Tough Dog Toys for Aggressive Chewers: Beef Flavored Long Lasting Dog Bones for Large Dogs, Indestructible Dog Chew Toys to Keep Them Busy, Large Dog Toys for Medium & Large Breed, Red",
    "tagline": "A thoughtful pick among durable dog gifts, it saves you from the hassle of constant toy replacements.",
    "affiliateUrl": "https://a.co/d/039ZzdFx",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Toys",
    "description": "Stop Wasting Money on 2-Minute Toys: Engineered for the crushing jaw pressure of 20-80 lb breeds like Labs and German Shepherds, this dual-material bone features a rock-solid nylon core reinforced with a dense rubber sleeve to outlast standard plush toys. A thoughtful pick among durable dog gifts, it saves you from the hassle of constant toy replacements.\nThe Ultimate Furniture Defense Strategy: Stop coming home to chewed-up baseboards or destroyed sneakers by redirecting your dog's destructive energy to this beef-infused decoy that is far more satisfying and longer-lasting than your expensive home decor\nYour New Work-From-Home Savior: Finally enjoy a peaceful Zoom call or cook dinner without interruption by smearing peanut butter into the rubber grooves, instantly transforming this bone into an engaging pacifier that keeps high-energy dogs silently focused for 30+ minutes\nDaily Dental Care Without the Fight: Forget the wrestling match of manual brushing, as the raised rubber nubs and grooves act as a passive toothbrush to mechanically scrape away plaque and tartar, freshening breath while your dog simply thinks they are playing\nFrustration-Free Grip for Paws: Unlike smooth plastic sticks that annoyingly slide across hardwood floors, our bulbous end design allows dogs to easily pin the toy upright, giving them the perfect vertical leverage for a satisfying chew session that doesn't slip away\nUltimate Satisfaction for Power Chewers: We balance extreme durability with dental safety by using material that yields slightly under immense pressure, meaning the visible \"battle scars\" and rough edges are intentional design features to protect tooth enamel from cracking unlike rock-hard antlers\nBeats Boredom with Dual Textures: Smart dogs quickly lose interest in uniform plastic, so we combined rock-solid nylon ends with a chewy rubber core to offer a complex mouthfeel that keeps their brains engaged and prevents separation anxiety during crate time",
    "badge": "NEW",
    "badgeColor": "#FFCC00",
    "accentColor": "#FF3366",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71aHrbyif6L._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792689462434-rsts"
  },
  {
    "name": "Beiker 20 Pack Puppy Chew Toys, Dog Teething Toys for Puppies Small Dogs",
    "tagline": "Blue Puppy Teething Rings and Ropes, Rubber Toy Bundle for Puppy Busy, Cute Interactive Pet Balls Bulk for Small Breed",
    "affiliateUrl": "https://a.co/d/08et278p",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Toys",
    "description": "20 GENUINE AND FUN TOYS: Our dog value pack will provide endless joy for your puppies and small dogs. Unlike other packs, OURS CONTAINS 20 GENUINELY FUN TOYS, WITH NO POOP BAGS OR NON-TOY ITEMS TO INFLATE THE COUNT. Each toy has been carefully selected to satisfy your pet's curiosity and energy, ensuring your pup always has new toys to enjoy at home\nDIVERSE TOY SELECTION: Our value pack includes 6 soft rubber dental toys, which are softer and more elastic than traditional TPR toys. They provide excellent protection for the gums of teething puppies and offer an additional level of comfort during chewing. Additionally, the set includes 5 rope toys, 3 tug-of-war toys, 3 teething rings, 1 soothing pacifier, 1 rubber bone, and a treat dispenser. This diversity ensures your puppy finds its preferences in different forms of entertainment to stay active\nHEALTHY PUPPY TEETHING TOYS: We prioritize your dog's health and safety. All toys are made from natural rubber and cotton. They exclude squeaky toys and toys with small parts, ensuring they are safe and long-lasting for puppies. CAUTION: OUR TOYS ARE NOT SUITABLE FOR SUPER HEAVY CHEWERS. Do not leave toys with unsupervised dogs. Remove and replace if the toy is damaged.\nPROTECT FURNITURE AND CLEAN TEETH: Dogs have a strong urge to chew on everything during teething. Therefore, our rubber toys with soft spikes massage gums and relieve stress, helping alleviate your dog's teething discomfort. These toys not only clean teeth but also eliminate plaque in hard-to-reach areas, prevent cavities, and promote healthy chewing habits\nENGAGING PLAYTIME: Our wide range of rope toys is suitable for tug-of-war, fetch, and chewing-they'll keep your furry friend active, in great shape, and happily occupied for hours. Our ball toys and tug toys also double as handy training tools, helping you keep your dog focused and involved during sessions. Best of all, these toys let you build a stronger bond with your four-legged family member, filling their days with endless joy and precious quality time together\nTHOUGHTFUL GIFT PACKAGING: Bring daily surprises to your best friend. This unique dog toy gift is designed specifically for your furry friend. Packaged in a gift box, it makes a wonderful gift for pet owners or your most loyal friends. It's truly worth every penny",
    "badge": "VIP",
    "badgeColor": "#FFCC00",
    "accentColor": "#FF3366",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71iIWFedhLL._AC_SL1436_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792689369981-yh9c"
  },
  {
    "name": "Dog Squeaky Toy No Stuffing 6 Pack, Dog Toys Crinkle for Puppy",
    "tagline": "for Small Puppy, Durable Chew Plush Cute Animals Natural for Teething Pet",
    "affiliateUrl": "https://a.co/d/0bpMAIj8",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Toys",
    "description": "SUPER VALUE PACK TOY PACK: 6 pack furry dog toy, including pig, sheep, lion, cow, squirrel, leopard, all in animal-shaped, flat and unstuffed. Every set comes with a storage box Your pup will love their new squeaky friends\nPLUSH DOG TOYS WITH SQUEAKERS: Floppy light weight bodies, easy for small dogs to carry, toss, and roll around with. Each toy has two squeakers inside, not too loud but still get the dog’s attention\nCRINKLE DOG TOY NO STUFFING: Crinkle paper all over the body, keeping your dog entertained for hours. 100% unstuffed means that no dangerous stuffing hidden in our toys, no swallowing or choking risks and you won’t find yourself cleaning bits of stuffing from all over the house ever again\nSAFE SMALL DOG CHEW TOYS: Our dog toys are made of natural and non-toxic material that ensures the safety of dogs. Thicker fabric and better stitching make these toys more durable for dogs. It’s suitable for teeth cleaning and chewing\nWARM TIPS FOR DOG TOY SET: These toys are machine washable. Please kindly note these toys are not for aggressive chewers, and we recommend supervised play, timely replacement of the broken ones",
    "badge": "NEW",
    "badgeColor": "#FFCC00",
    "accentColor": "#00FFFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71q3gGFpUmL._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792689290321-xr94"
  },
  {
    "name": "Dog Squeaky Chew Toys No Stuffing Soft Plush for Small Medium Large Breed",
    "tagline": "Best Birthday Gifts to Keep Them Busy Chewer Teething Chewing Fetch Interactive Squeakers Pet Supplies Bundle Tough Durable",
    "affiliateUrl": "https://a.co/d/04cBI8h1",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Toys",
    "description": "🐶 Plush Dog Squeaky Toys: This assortment value bundle plush pet toy contains 5 pack big woodland animals: Raccoon Squirrel Tiger Fox and Lion. The funny and enrichment toys help dogs to exercise more and improve their health. A good dog products for boredom and stimulating. They can do chewing and teething, tug of war games. Quality interactive playing time together will also increase their bond with owner. It's the best gift supplies for dogs Birthday Christmas Halloween or any holiday\n🎁 No Stuffing Plush Toys: 100% stuffingless squeaky toys and no any hidden dangerous stuffing, it's very safe for your puppies to play, no worry about swallow or choke on. Five different sized bulk toys make it suitable for small, medium and large breeds chewers. It will be more durable because most dogs are less tempted to kill an unstuffed toy. No more cleaning up bits of fluff from all over the house\n🐶 With Two Squeaky: These stuffless squeak doggie toys set have squeakers in both head and tail which will attract dog's attention. When you’re away from home, squeaky toys will help release your pet's anxiety and pressure, keep them busy, cleaning their teeth, and reduce their destructive behavior. No need to worry about your dog’s alone at home, or pillows, sofas, shoes, etc getting destroyed. With toys dogs won’t feel bored or chew furniture up, their excess energy will be released\n🎁 Good Quality: Made of non-toxic premium quality plush fabric, incredibly safe, soft and durable. Floppy lightweight bodies, length of fox and lion is 17.72inch, squirrel and raccoon is 21.26inch, tiger is 19.69inch, easy for small, medium and large dogs to carry, toss, and roll around with. Intensive fabric and better stitching make these squeeky toys more durable for dogs\n🐶 WARM TIPS FOR DOG TOY SET: Please kindly note these toys are not for extra aggressive chewers, such as hound. We offer 30 Days Replacement and Refund Guarantee for these stuffless dog toys. There is anything wrong with it, just click \"Contact Us\" and we will be happy to assist you with replacement or refund. We suggest watching closely when you give these toys to your Indestructible Tough Chewer to watch dogs pull the squeakers out due to aggressive chewing",
    "badge": "NEW",
    "badgeColor": "#FFCC00",
    "accentColor": "#FF3366",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/813uC3hs3oL._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792689225997-evcc"
  },
  {
    "name": "32 Inch Dog Crate Furniture for Small Medium Dogs, White",
    "tagline": "Heavy Duty Wooden Metal Dog Cage with 360° Adjustable Bowls, Decorative Pet House End Table, Dog Kennel Furniture indoor",
    "affiliateUrl": "https://a.co/d/021QSU7i",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Gear",
    "description": "ANTI-CHEW & ANTI-ESCAPE: The dog crate furniture are made with durable wood and iron, 15mm thick particle board and 0.3\" steel pipes, this heavy-duty dog crate furniture provides strong chew resistance and easy cleaning for daily use\nCOMFORTABLE SPACE FOR DOGS: Measuring 31.5\"L x 21.65\"W x 25.2\"H, this large indoor dog kennel offers plenty of space for small to medium heavy dogs to stand freely and turn around easily in the crate. And Dogs can have a comfortable and spacious living space, avoiding anxiety and unease due to limited space. Always check the interior dimensions against your dog's adult size before purchasing\nMULTI-FUNCTIONAL FURNITURE STYLE: Brief and retro dog furniture crate is suitable for various decoration styles. The top boasts an incredible 150 lb capacity, more than just a dog crate, it doubles as a stylish side table, TV cabinet, end table, or nightstand, blending seamlessly with your modern home décor while saving space\nEASY ASSEMBLY: Comes with clear instructions and all tools included, step-by-step graphical manual that makes assembling this large kennel simple and intuitive for anyone, even first-time builders. Assemble your dog kennel furniture easily without additional tools—perfect for busy pet parents\nDECORATIVE DOG CRATE WITH BOWLS: This dog crate furniture is equipped with 2 360° rotatable stainless steel bowls for food and water, providing a comfortable resting space for your pet. The dog kennel can also be used as a TV stand and side table to save space\nEASY-TO-CLEAN DESIGN: Simply wipe with a damp rag to remove stains on the dog cage. And you can place a cushion in the dog cage, which will make the dog feel more comfortable",
    "badge": "VIP",
    "badgeColor": "#FFCC00",
    "accentColor": "#FFCC00",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71MtYLrahoL._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792689126156-3si2"
  },
  {
    "name": "Dog Crate with Shelf, Pink Dog Kennel Cage for Small Dogs",
    "tagline": "Indoor Decorative Dog Crates with Heavy-duty Anti-chewing Metal Bar, Dog Cage Furniture Side Table w/ Storage for Living Room",
    "affiliateUrl": "https://a.co/d/01ZZyODg",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Gear",
    "description": "Furniture‑Style Dog Crate: This dog kennel replaces fragile regular dog cage, bringing elegant finish to your living space. It works as a cozy dog kennel for small/medium dogs while matching your room furniture, no more ugly metal pet crates ruining your home aesthetic.\nDog Crate With Multi‑Functional Upper Storage: Our dog crate with shelf comes with hanging rod and divided open cubbies. You can hang pet outfits and store dog treats and daily supplies. Combine dog housing and pet storage station in one piece to save extra home storage space for pet owners.\nSturdy Anti‑Chewing Metal Bar & Secure Latch Design: Heavy‑duty metal bars resist biting and scratching for long‑term use. Equipped with reliable safety latch to keep your small pet safe inside this dog kennel. The 180 ° fully open door design supports easy pet access and convenient daily interior cleaning.\nMulti‑Purpose Cabinet Top For Extra Household Use: Flat sturdy top surface of this dog kennel serves as side table to place decor items, photo frames or small household goods. Ideal for apartment and limited‑space home, this all‑in‑one furniture‑style crates maximizes your available indoor area.\nSpacious Private Rest Space For Small/Medium Dogs: This dog crate furniture offers roomy inner space for small breed dogs to relax and sleep. Solid surrounding panels create a quiet, private shelter, helping your puppy feel calm and secure staying inside the dog crate at home.",
    "badge": "VIP",
    "badgeColor": "#FFCC00",
    "accentColor": "#FF3366",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81jaUaQ96fL._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792689049623-6im8"
  },
  {
    "name": "Wire Mesh Dog Gate: 29.5\"-40\" Wide, Pressure Mounted with No Tools; Expandable, Durable Pet Gates for Doors and Hallways, 37\" Tall",
    "tagline": "eep your pet contained and your home safe with the MyPet Extra Tall and Wide Wire Mesh Petgate, made from durable American hardwood and strong, vinyl-coated wire mesh",
    "affiliateUrl": "https://a.co/d/0fDcZqdo",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Gear",
    "description": "SIMPLE PRESSURE MOUNT: Easy to take down or install with simple pressure mounting; use the gate where you need it. Fitts openings between 29.5 - 40 inches. 37 inches tall\nEASY ON WALLS: Durable rubber bumpers hold gate steady without scuffing or scratching your walls; plus, unlike other gates, this gate is designed to work with modern molding up to 4\" tall.\nAMAZING VALUE & SIMPLE TO INSTALL: Easy pressure-mount design - simply expand the gate to fit your space and press down on the sturdy locking bar to secure\nPROUDLY ASSEMBLED IN USA WITH AMERICAN HARDWOOD:This pet gate is proudly assembled in Wisconsin with American Hardwood! Our rigorously tested pet gates & playpens bring peace of mind to your home. We stand for the highest of safety & quality standards.",
    "badgeColor": "#FFCC00",
    "accentColor": "#00FFFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/91KgFFGNyqL._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792688964273-tozu"
  },
  {
    "name": "Walk-Thru Pet Gate; 29-40\" Wide, 30\" Tall, White",
    "tagline": "Extra Low 0.5\" Threshold, Pressure or Hardware Mount, Auto-Close Gravity Hinge, 90° Hold-Open Door, Two-Step Lock",
    "affiliateUrl": "https://a.co/d/01UghiGk",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Gear",
    "description": "GREAT FOR PETS & BUSY HOMES: Ideal as an indoor dog gate for doorways, hallways, stairs, and between rooms.\nADJUSTABLE FIT: 30\" tall pet gate fits openings from 29\" to 40\" wide.\nAUTO-CLOSE CONVENIENCE: Gravity-fed hinge helps the gate close behind you for everyday ease.\nONE-HAND OPERATION: Easy-open handle with a two-step locking system helps keep pets securely contained.",
    "badgeColor": "#FFCC00",
    "accentColor": "#10B981",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81Qol-xni5L._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792688889511-7w2a"
  },
  {
    "name": "No Pull Dog Harness, Collar & Leash Set with Travel Accessories",
    "tagline": "Includes Dog Seat Belt, Collapsible Bowls & Poop Bag Dispenser. Ideal for Training, Walking, Hiking. Fits Small to Large Dogs",
    "affiliateUrl": "https://a.co/d/08iDHu9f",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Gear",
    "description": "All-In-One Convenience: Our dog travel kit is your one-stop solution for all pet adventures. Equipped with a no-pull harness, leash, collar, car safety belt, portable bowl, and waste bag dispenser, it's everything your furry friend needs in one purchase\nErgonomic No-Pull Harness Design: Say goodbye to tugging and discomfort! Our harness, crafted with an ergonomic no-pull design, alleviates neck pressure and enhances comfort. The reflective stitching on the harness and collar ensures visibility and safety on those early morning or late-night outings\nJourney with Ease: Road trips or park visits, our kit has you covered. The seat belt attachment ensures your pet's car safety, while the portable bowl & waste bag dispenser are perfect for keeping your adventures mess-free and convenient\nBuilt to Last, Easy to Clean: Crafted with high-grade nylon and sturdy metal buckles, our kit withstands the rigors of everyday use. The harness and collar are easily washable, ensuring they stay fresh for your next adventure\nStyle Meets Functionality: Choose a kit that complements your pet's personality with our range of color options. Our design merges practicality with style, ensuring your dog looks good and feels great, wherever you go",
    "badge": "NEW",
    "badgeColor": "#FFCC00",
    "accentColor": "#FFCC00",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71X-nNZvDZL._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792688783767-7503"
  },
  {
    "name": "Tactical No Pull Dog Harness with Leash, Large, Brown",
    "tagline": "Heavy-Duty Adjustable Pet Harnesses with Handle, Reflective Military K9 Style Pet Vest.",
    "affiliateUrl": "https://a.co/d/0fnlLvYm",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Gear",
    "description": "Heavy-duty Dog Harness】 Specially designed for powerful robust dog. The heavy-duty harness is crafted from durable nylon, reinforced with sturdy stitching and equipped with two sturdy triangular rings\n【Four-point Adjustment, Easy To Wear】 There are 4 simple size adjusters for the neck and chest that can also be easily adjusted to fit your dog perfectly. The chest is fitted with two buckles that can be fully opened for easy wearing\n【Molle System】featured Molle strips on both sides, allowing your dog to carry essential gear. Ideal for service, law enforcement, hunting, or outdoor activities. Perfectly compatible with Molle pouches on the market, it is easy to upgrade your gear\n【Anti-lost ID Tag】Write down your dog’s information on ID tag. When someone finds your lost dog, they can contact you with the information above\n【Bonus Dog Leash】: A free 5ft dog leash is included. Featured with comfortable foam handle, strong climbing rope, and tangle-free hook",
    "badge": "VIP",
    "badgeColor": "#FFCC00",
    "accentColor": "#10B981",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/81eme8x97QL._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792688688497-yzq6"
  },
  {
    "name": "Tactical Dog Harness for Large Dogs,No Pull Heavy Duty Dog Harness",
    "tagline": "No Pull Heavy Duty Dog Harness | with Handle,Adjustable Reflective,Green Military K9 Style,Big Size Dog Vest,",
    "affiliateUrl": "https://a.co/d/0ewIqrSe",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Gear",
    "description": "Size Instruction: This large dog harness fits chest girth: 27-37 in, neck girth: 19-25 in. Perfect for German Shepherds, Labradors for hiking, walking, or daily outdoor adventures. Breed suggestions are for reference; please measure your dog's chest, neck, and weight for the best fit.\nMilitary-standard Materials: WINGOIN harness large size dog is made of military nylon and adopts an upper and lower two-layer structure. The outer camouflage pattern is 1000D nylon with sturdy stitching for extra durability, and the inner layer is a mesh material with excellent breathable, comfortable fit and no harm to the dog.\nFast Wearing: The no pull dog harness for large dogs with a unique 4 quick-release buckles design, allowing you to put it on from the side of the dog’s neck instead of the head. This way of dressing can reduce the dog's resistance effectively, helping you to put it on or take it off quickly\nSturdy Handle and 2 D-rings : 2 stainless steel D-rings, allow you to control the puller with little effort and training your dog to walk beside you. Dog harness with handle sewn tough, large enough to grab the harness. Three perfect combinations of use, not only slow down the impact of the dog's running but also make it easier for the owner to control the pet's running and walking\nReflective Strip Design: The dog walking harness has a unique reflective strip design, which can alert pedestrians and vehicles when walking your dog in the evening, keeping your dog safe",
    "badge": "VIP",
    "badgeColor": "#FFCC00",
    "accentColor": "#FFCC00",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71ahmBlOWsL._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792688614511-gcvo"
  },
  {
    "name": "Dog Harness, No Pull for Large Dogs with 2 Leash Clips",
    "tagline": "Pet Vest | No Choke with Handle, Adjustable Soft Padded, Reflective, Easy Control f",
    "affiliateUrl": "https://a.co/d/0jdfsnCj",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Gear",
    "description": "No Pull, 2 Clips - With 2 sturdy metal hook loops for leash attachment. Use the front clip to create gentle redirection force, to reduce tugging during walks and training. While back clip is great for casual walks, jogging for well-behaved dogs\nComfort, No Choke - Made from durable fabric with breathable mesh, this vest keeps them comfortable and cool during extended walks or active play. The pulling pressure is distributed evenly with soft padded —no rubbing, no irritation, just happy tails\nEasy to Wear & Adjust - Simply slip the harness over dog's head, snap the two quick-release buckles, and ready to go. 4 fully adjustable straps to create a perfect fit for your dog with room of growth. No worries about slipping out\nBuilt for Safety - Bright reflective strips ensure a safe walk both early morning walks or late night runs. The top handle helps to hold dog pulling immediatly, also can be used for car riding with safety\nLarge Dog Harness - Chest: 17-33.4in. Recommended to Large Dogs, such as Labrador, German Shepherd, Siberian Husky, Schnauzer Giant, etc. Please measure your dog's neck and check girth carefully before purchasing",
    "badge": "Bestseller",
    "badgeColor": "#FFCC00",
    "accentColor": "#00FFFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71k8WuKoB0L._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792688452244-1fgf"
  },
  {
    "name": "Funny Halloween Dog Wig with Sunglass",
    "tagline": "Cosplay Jackson Black Long Pet Wigs, Costume Accessories for Weenie Dachshund",
    "affiliateUrl": "https://a.co/d/02yO6VNC",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Apparel",
    "description": "Snap Post Shine: #DogCostume, #CatCostume, #TrickOrTreatWithPets, #PetCostume, #HalloweenPets, #PetHalloweenCostume, #TrickOrTreat, #HappyHalloween, #FurrySpooks, #SpookyVibes, #OctoberVibes, #MovieCostume, #TVShowCostume, #HorrorLook\nHilarious Halloween Fun for Your Pets: Turn your furry friend into the star of the party with the Swooflia Dog Wig! Perfect for breeds like French Bulldogs, Dachshunds, Corgis, Pugs, and even larger dogs like German Shepherds or Pit Bulls.\nFits Dogs of All Sizes: Whether your pup is small, medium, or large, this adjustable pet wig is designed to fit comfortably. From playful puppies to big gentle giants, it’s the perfect accessory for your pet’s Halloween adventure.\nPerfect for Cosplay and Beyond: This cute pet wig isn’t just for Halloween—it’s ideal for movie or TV show costumes, themed parties, or simply adding a fun twist to your pet’s everyday look. Your furry friend will love all the extra attention!\nDurable and Pet-Friendly Design: Crafted from high-quality, pet-safe materials, this lightweight and breathable wig is easy to wear and built for comfort. Whether you have an English Bulldog, Chihuahua, Golden Retriever, or any breed in between, your pet will stay comfy and stylish all day long.",
    "badge": "NEW",
    "badgeColor": "#FFCC00",
    "accentColor": "#00FFFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/716UpAH5HiL._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792688273055-8052"
  },
  {
    "name": "Swooflia Goth Halloween Dog Wig for Large Medium Breed Dogs",
    "tagline": "Cosplay Half Black White Curly Pet Wigs, Costume Accessories for Weenie Dachshund Corgi Pug Chihuahua Puppy German",
    "affiliateUrl": "https://a.co/d/04LGO4NE",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Apparel",
    "description": "Snap Post Shine: #DogCostume, #CatCostume, #TrickOrTreatWithPets, #PetCostume, #HalloweenPets, #PetHalloweenCostume, #TrickOrTreat, #HappyHalloween, #FurrySpooks, #SpookyVibes, #OctoberVibes, #MovieCostume, #TVShowCostume, #HorrorLook\nHilarious Halloween Fun for Your Pets: Turn your furry friend into the star of the party with the Swooflia Dog Wig! Perfect for breeds like French Bulldogs, Dachshunds, Corgis, Pugs, and even larger dogs like German Shepherds or Pit Bulls.\nFits Dogs of All Sizes: Whether your pup is small, medium, or large, this adjustable pet wig is designed to fit comfortably. From playful puppies to big gentle giants, it’s the perfect accessory for your pet’s Halloween adventure.\nPerfect for Cosplay and Beyond: This cute pet wig isn’t just for Halloween—it’s ideal for movie or TV show costumes, themed parties, or simply adding a fun twist to your pet’s everyday look. Your furry friend will love all the extra attention!\nDurable and Pet-Friendly Design: Crafted from high-quality, pet-safe materials, this lightweight and breathable wig is easy to wear and built for comfort. Whether you have an English Bulldog, Chihuahua, Golden Retriever, or any breed in between, your pet will stay comfy and stylish all day long.",
    "badge": "NEW",
    "badgeColor": "#FFCC00",
    "accentColor": "#00FFFF",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71mjcL5MmnL._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792688191671-rkz9"
  },
  {
    "name": "Lion Mane Wig for Dogs with Ears",
    "tagline": "Funny Pet Costumes for Halloween Christmas",
    "affiliateUrl": "https://yourshoplink.com/product1",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Apparel",
    "description": "He is a proud lion, as least he thinks so-- just dress your dog up with these most realistic & best-fitting dog halloween costumes and give him the heart of a lion. Now he is no more a dog but noble king of the jungle! Show time for him!\nLet him join the Halloween together with you-Whether it’s Halloween, Christmas, dog shows or any parties, don’t forget about your dog friend, let him join us with this funny dog costumes. Your pet dog will always be set to be the most eye catching one of the event!\nEasy to put on and fits most MEDIUM TO LARGE sized dogs – This lion mane from is designed to fit perfectly for medium to large sized dogs like German Shepherd, Rottweiler, Labrador, Hound, Boxer, or Golden Retriever. Compatible neck size for dogs ranges from 60 cm to 80 cm\nDecent quality and light weight- Our best friend deserves the best gift for him.The mane is made of top quality soft long plush which is eco-friendly and does not release colors. It is lovely to feel with non-irritable soft touch for your pet.\nEasy to wash-- No need to worry about clean issues. These apparel can either be washed by hand or washing machine as the material is quite durable and well made.",
    "badge": "NEW",
    "badgeColor": "#FFCC00",
    "accentColor": "#10B981",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/719yqQwO2WL._AC_SY695_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792688116709-a7gt"
  },
  {
    "name": "Pet Deadly Doll Dog Costume, Cosplay Halloween ",
    "tagline": "Cosplay Halloween Christmas Funny Clothes Party Costume for Small Medium and Large Dogs ",
    "affiliateUrl": "https://a.co/d/0j0Eb13k",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Apparel",
    "description": "Funny Design】The funny dog costume is a padded body with additional padding arms and trousers sleeves. The clothes has a knife-shaped attachment that enhances fear and tension but is also very cute, sticks firmly to the costume but is adjustable or removable. With a funny look, this dog costume is a good choice for your pets!\n【SUPERIOR MATERIAL】Made of breathable,soft and skin-friendly cotton and polyester fiber, they make the dog feel comfortable all the day.\n【Easy to Wear】Two slings are designed on the clothes, the neck and chest of costume is designed with user-friendly to make it convenient to adjust suitable size for cats or puppy, easy to wear and take off, ensure your pet is more comfortable to wear.\n【Used Widely】A good choice, whether for holiday or daily wear. Especially suitable for Halloween birthday parties, masquerade parties and any other parties, your dog will be the focus of the party.\n【SIZE】Size S : Chest girth: 16\"-20'', Neck girth: 12\"-14'', Back Length:10\", Suggest weight: 10-22 lb; Size M : Chest girth: 20\"-24'', Neck girth: 14''-16\", Back Length:11\", Suggest weight: 22-44 lb; Size L : Chest girth: 24\"-28'', Neck girth: 16''-20\", Back Length:12\", Suggest weight: 44-66 lb; Size XL : Chest girth: 28\"-32'', Neck girth: 20''-24\", Back Length:14\", Suggest weight: 66-80 lb. Please measure the measurements carefully and choose the most suitable product for your pet.",
    "badge": "Bestseller",
    "badgeColor": "#FFCC00",
    "accentColor": "#FF3366",
    "sizes": [
      "S",
      "M",
      "L.XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71KL8ASsS8L._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard"
    ],
    "inStock": true,
    "id": "prod-1792688038443-1nhx"
  },
  {
    "name": "Heavy Duty Dog Leash - 2 Handles",
    "tagline": "Extra Control, 6foot Long - Perfect for Medium to Large Dogs (6 ft, Black)",
    "affiliateUrl": "https://a.co/d/0hnc1SjW",
    "rating": 5,
    "reviewsCount": 1,
    "category": "Gear",
    "description": "Upgrade: The product has been modified to use nylon thread directly sewing, very strong.All handles was sewn onto the leash instead of the cord ties.Package includes: frosted zipper bag,two handles dog leash.\nMAXIMUM TOUGHNESS AND DURABILITY: Nearly 2X thicker and stronger than standard dog leashes. 3mm thick and 1” wide with tightly webbed nylon for enhanced rugged construction.\nDUAL HANDLES FOR TOTAL CONTROL: Soft Neoprene and padded handle, comfortable than ever ;Equipped with an extra traffic handle for amazing control. Use the standard handle for those casual dog walks or quickly grab the built in traffic handle to guide your pup through crowded areas with ease.\n360° Rotating Clasp: Swivel clasp prevents the leash from twisting and dog getting tangled. Heavy-duty metal clasp makes our training leashes last longer than most ones. Premium components for maximum strength\nBE SAFE AND VISIBLE AT NIGHT: Luminous reflective threading keeps you both safe and visible on your late-evening walks. Enjoy a large 2” heavy duty clip for added safety and thick D-ring to attach your favorite dog training clicker or dog poop bag holder.Packaging details:Frosted zipper bag,Dog leash with D ring",
    "badge": "Bestseller",
    "badgeColor": "#FFCC00",
    "accentColor": "#FF3366",
    "sizes": [
      "S",
      "M",
      "L",
      "XL"
    ],
    "imageUrl": "https://m.media-amazon.com/images/I/71++CEflu3L._AC_SL1500_.jpg",
    "details": [
      "100% Canine Approved",
      "NYC Streetwear Standard",
      "Water and mud resistant"
    ],
    "inStock": true,
    "id": "prod-1792687462071-yeqg"
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
