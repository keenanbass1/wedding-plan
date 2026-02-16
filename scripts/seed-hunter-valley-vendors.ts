import { PrismaClient, VendorCategory, VendorCapacity, PriceRange } from '@prisma/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { validateVendorList, getVendorSummary } from './validate-vendor-data'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const prisma = new PrismaClient()

const hunterValleyVendors = [
  // VENUES - Wine Country Wedding Venues
  {
    name: 'Bimbadgen Estate',
    email: 'functions@bimbadgen.com.au',
    phone: '02 4998 4600',
    website: 'https://www.bimbadgen.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Pokolbin',
    address: '790 McDonalds Rd, Pokolbin NSW 2320',
    description:
      'Premium Hunter Valley winery venue with amphitheatre, pavilion, and restaurant spaces. Award-winning wine estate offering vineyard ceremonies, versatile reception venues, and accommodation. Perfect for couples wanting wine country elegance with stunning views.',
    priceMin: 10000,
    priceMax: 25000,
    priceDescription: 'Venue packages from $10k-25k depending on guest count and inclusions',
    priceRange: 'PREMIUM' as PriceRange,
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 250,
    styles: ['Wine Country', 'Elegant', 'Vineyard', 'Luxury'],
    servicesOffered: [
      'Ceremony venue',
      'Reception venue',
      'Accommodation',
      'Catering',
      'Vineyard views',
    ],
    rating: 4.8,
  },
  {
    name: 'Pepper Tree Wines',
    email: 'events@peppertreewines.com.au',
    phone: '02 4909 7100',
    website: 'https://www.peppertreewines.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Pokolbin',
    address: '86 Halls Rd, Pokolbin NSW 2320',
    description:
      'Iconic Hunter Valley winery with Roberts Restaurant and Barrel Room venues. Garden ceremonies surrounded by vines, elegant indoor receptions, and exclusive venue hire. Award-winning wines and seasonal menu by renowned chef Robert Molines.',
    priceMin: 12000,
    priceMax: 28000,
    priceDescription: 'All-inclusive packages from $12k-28k',
    priceRange: 'PREMIUM' as PriceRange,
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 200,
    styles: ['Wine Country', 'Luxury', 'Elegant', 'Gourmet'],
    servicesOffered: [
      'Ceremony venue',
      'Reception venue',
      'Award-winning catering',
      'Wines included',
      'Vineyard setting',
    ],
    rating: 4.9,
  },
  {
    name: 'The Convent Hunter Valley',
    email: 'functions@theconvent.com.au',
    phone: '02 4998 7764',
    website: 'https://www.theconvent.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Rothbury',
    address: '88 Halls Rd, Pokolbin NSW 2320',
    description:
      'Unique heritage venue, formerly Dalwood House convent. Historic charm with manicured gardens, chapel ceremony space, and elegant reception areas. Boutique accommodation and intimate setting perfect for smaller, sophisticated weddings.',
    priceMin: 8000,
    priceMax: 18000,
    priceDescription: 'Packages from $8k-18k for up to 120 guests',
    priceRange: 'MODERATE' as PriceRange,
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 120,
    styles: ['Historic', 'Romantic', 'Boutique', 'Garden'],
    servicesOffered: [
      'Chapel ceremony',
      'Reception venue',
      'Accommodation',
      'Garden setting',
      'Heritage architecture',
    ],
    rating: 4.7,
  },
  {
    name: 'Chateau Elan at The Vintage',
    email: 'weddings@chateauelan.com.au',
    phone: '02 4993 8999',
    website: 'https://www.chateauelan.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Rothbury',
    address: 'Vintage Dr, Rothbury NSW 2320',
    description:
      'Luxurious French provincial estate with elegant ballroom, lakeside ceremonies, and premium accommodation. All-in-one wedding resort with day spa, golf course, and fine dining. Perfect for grand weddings with overnight guests.',
    priceMin: 15000,
    priceMax: 35000,
    priceDescription: 'Premium packages from $15k-35k including accommodation credits',
    priceRange: 'LUXURY' as PriceRange,
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 250,
    styles: ['Luxury', 'Elegant', 'French Provincial', 'Resort'],
    servicesOffered: [
      'Grand ballroom',
      'Lakeside ceremony',
      'Accommodation',
      'Fine dining',
      'Day spa',
      'Golf course',
    ],
    rating: 4.9,
  },
  {
    name: 'Tallavera Grove',
    email: 'info@tallaveragrove.com.au',
    phone: '02 4998 6579',
    website: 'https://www.tallaveragrove.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Rothbury',
    address: '749 Mount View Rd, Mount View NSW 2325',
    description:
      'Picturesque vineyard wedding venue with rustic barn, manicured gardens, and lake views. Exclusive use venue with on-site accommodation. Perfect for couples wanting rustic elegance in wine country setting.',
    priceMin: 9000,
    priceMax: 22000,
    priceDescription: 'Exclusive venue hire from $9k-22k',
    priceRange: 'MODERATE' as PriceRange,
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 180,
    styles: ['Rustic', 'Vineyard', 'Garden', 'Barn'],
    servicesOffered: [
      'Barn reception',
      'Garden ceremony',
      'Accommodation',
      'Exclusive use',
      'Lake views',
    ],
    rating: 4.8,
  },
  {
    name: 'Spicers Vineyards Estate',
    email: 'hvreservations@spicersretreats.com',
    phone: '02 4998 7996',
    website: 'https://www.spicersretreats.com/spicers-vineyards-estate',
    category: 'VENUE' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Pokolbin',
    address: '555 Hermitage Rd, Pokolbin NSW 2320',
    description:
      'Intimate luxury estate perfect for micro weddings and elopements. Boutique vineyard setting with gourmet restaurant, luxury villas, and personalized service. Maximum 40 guests for exclusive, high-end celebrations.',
    priceMin: 8000,
    priceMax: 15000,
    priceDescription: 'Intimate packages from $8k-15k for up to 40 guests',
    priceRange: 'LUXURY' as PriceRange,
    capacity: 'SMALL' as VendorCapacity,
    maxGuests: 40,
    styles: ['Luxury', 'Intimate', 'Boutique', 'Vineyard'],
    servicesOffered: [
      'Intimate venue',
      'Gourmet dining',
      'Luxury accommodation',
      'Vineyard setting',
      'Exclusive service',
    ],
    rating: 4.9,
  },
  {
    name: 'Stonehurst Cedar Creek',
    email: 'weddings@stonehurst.com.au',
    phone: '02 4998 7476',
    website: 'https://www.stonehurst.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Pokolbin',
    address: '749 Hermitage Rd, Pokolbin NSW 2320',
    description:
      'Elegant country estate with multiple ceremony locations, pavilion reception, and luxury accommodation. Beautiful gardens, forest chapel, and lake settings. All-inclusive packages with food, beverage, and coordination.',
    priceMin: 11000,
    priceMax: 24000,
    priceDescription: 'All-inclusive from $11k-24k',
    priceRange: 'PREMIUM' as PriceRange,
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 200,
    styles: ['Elegant', 'Garden', 'Country', 'Romantic'],
    servicesOffered: [
      'Multiple ceremony sites',
      'Pavilion reception',
      'Accommodation',
      'All-inclusive packages',
      'Forest chapel',
    ],
    rating: 4.8,
  },
  {
    name: 'Wandin Valley Estate',
    email: 'info@wandinvalley.com.au',
    phone: '02 6579 1404',
    website: 'https://www.wandinvalley.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Lovedale',
    address: '380 Wilderness Rd, Lovedale NSW 2325',
    description:
      'Rustic wedding venue with barn reception hall, outdoor ceremony areas, and cottage accommodation. Nestled in natural bushland with farm animals and relaxed atmosphere. Perfect for couples wanting rustic charm and nature.',
    priceMin: 7000,
    priceMax: 16000,
    priceDescription: 'Venue hire and basics from $7k-16k',
    priceRange: 'MODERATE' as PriceRange,
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 150,
    styles: ['Rustic', 'Barn', 'Nature', 'Farm'],
    servicesOffered: [
      'Barn reception',
      'Outdoor ceremony',
      'Accommodation',
      'Farm setting',
      'Relaxed atmosphere',
    ],
    rating: 4.7,
  },

  // PHOTOGRAPHERS
  {
    name: 'James White Hunter Valley Weddings',
    email: 'james@jameswhiteweddings.com',
    phone: '0407 101 070',
    website: 'https://jameswhiteweddings.com',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Pokolbin',
    description:
      'Award-winning Hunter Valley wedding photographer with 15+ years experience. Specializing in natural, romantic imagery at vineyard and estate weddings. Intimate knowledge of all Hunter Valley venues. Artistic, unobtrusive style.',
    priceMin: 3200,
    priceMax: 5500,
    priceDescription: '$3,200-5,500 for full day coverage with all edited images',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Romantic', 'Natural', 'Artistic', 'Vineyard'],
    servicesOffered: [
      'Full day coverage',
      'All edited images',
      'Engagement sessions',
      'Online gallery',
      'Print options',
    ],
    rating: 4.9,
  },
  {
    name: 'Beck Rocchi Photography',
    email: 'hello@beckrocchi.com',
    phone: '0421 456 789',
    website: 'https://www.beckrocchi.com',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Cessnock',
    description:
      'Hunter Valley wedding and portrait photographer known for dreamy, romantic imagery. Specializing in vineyard weddings with golden hour magic. Relaxed approach capturing genuine emotion and beautiful landscapes.',
    priceMin: 2800,
    priceMax: 4500,
    priceDescription: '$2,800-4,500 depending on hours and inclusions',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Dreamy', 'Romantic', 'Golden Hour', 'Vineyard'],
    servicesOffered: [
      '6-10 hour packages',
      'Engagement shoots',
      'Digital gallery',
      'Second shooter available',
    ],
    rating: 4.8,
  },
  {
    name: 'Hilary Cam Photography',
    email: 'info@hilarycam.com.au',
    phone: '0433 789 012',
    website: 'https://www.hilarycam.com.au',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Hunter Valley',
    description:
      'Experienced Hunter Valley wedding photographer capturing natural, candid moments. Over 500 Hunter Valley weddings photographed. Relaxed, fun approach with beautiful editorial results. Highly recommended by local venues.',
    priceMin: 3000,
    priceMax: 4800,
    priceDescription: '$3,000-4,800 for 8-12 hour coverage',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Natural', 'Candid', 'Editorial', 'Relaxed'],
    servicesOffered: [
      'Full day coverage',
      'Pre-wedding shoots',
      'All high-res images',
      'Online gallery',
      'USB delivery',
    ],
    rating: 4.9,
  },
  {
    name: 'Natasja Kremers Photography',
    email: 'hello@natasjaphoto.com.au',
    phone: '0445 678 901',
    website: 'https://www.natasjaphoto.com.au',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Maitland',
    description:
      'Creative wedding photographer serving Hunter Valley and Newcastle. Known for unique perspectives, beautiful light, and emotional storytelling. Modern, romantic style with attention to detail.',
    priceMin: 2900,
    priceMax: 4200,
    priceDescription: '$2,900-4,200 for various packages',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Creative', 'Modern', 'Romantic', 'Storytelling'],
    servicesOffered: [
      'Wedding coverage',
      'Engagement sessions',
      'Elopements',
      'Digital gallery',
      'Print packages',
    ],
    rating: 4.8,
  },
  {
    name: 'Shannon Stent Photography',
    email: 'info@shannonstentphotography.com',
    phone: '0456 789 123',
    website: 'https://www.shannonstentphotography.com',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Hunter Valley',
    description:
      'Hunter Valley wedding photographer specializing in relaxed, natural photography. Capturing genuine moments and emotions with a documentary approach. Known for making couples feel comfortable and at ease.',
    priceMin: 2700,
    priceMax: 4000,
    priceDescription: '$2,700-4,000 for 6-10 hours',
    capacity: 'SMALL' as VendorCapacity,
    styles: ['Natural', 'Documentary', 'Relaxed', 'Authentic'],
    servicesOffered: [
      'Documentary style',
      'Full day coverage',
      'Online gallery',
      'All images included',
    ],
    rating: 4.7,
  },
  {
    name: 'Chris Ling Photography',
    email: 'chris@chrisling.com.au',
    phone: '0467 890 234',
    website: 'https://www.chrisling.com.au',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Hunter Valley',
    description:
      'Professional wedding and portrait photographer covering Hunter Valley and beyond. Artistic, cinematic style with focus on storytelling. Experienced with vineyard and estate weddings, offering both photo and video services.',
    priceMin: 3500,
    priceMax: 6500,
    priceDescription: 'Photography $3,500-4,800 | Photo+Video combo $5,500-6,500',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Cinematic', 'Artistic', 'Storytelling', 'Modern'],
    servicesOffered: [
      'Photography',
      'Videography',
      'Combo packages',
      'Drone footage',
      'Highlight films',
    ],
    rating: 4.9,
  },

  // CATERERS
  {
    name: 'The Chef & Co',
    email: 'info@thechefandco.com.au',
    phone: '02 4990 1888',
    website: 'https://www.thechefandco.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Cessnock',
    description:
      'Premium Hunter Valley wedding caterer with farm-to-table philosophy. Custom menus showcasing local wines and produce. Full-service catering from intimate dinners to large weddings. Known for exceptional food and professional service.',
    priceMin: 85,
    priceMax: 180,
    priceDescription: '$85-180 per person depending on menu style',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 300,
    styles: ['Gourmet', 'Farm-to-table', 'Wine Country', 'Modern'],
    servicesOffered: [
      'Custom menus',
      'Beverage packages',
      'Wait staff',
      'Equipment hire',
      'Event styling',
    ],
    rating: 4.9,
  },
  {
    name: 'Buon Gusto Catering',
    email: 'events@buongusto.com.au',
    phone: '02 4998 7499',
    website: 'https://www.buongusto.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Pokolbin',
    description:
      'Established Hunter Valley caterer specializing in Italian-inspired cuisine with local produce. Versatile menu options from rustic to elegant. Full-service catering with styling and beverage management.',
    priceMin: 75,
    priceMax: 165,
    priceDescription: '$75-165 per person including service staff',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 250,
    styles: ['Italian', 'Gourmet', 'Traditional', 'Versatile'],
    servicesOffered: [
      'Italian cuisine',
      'Custom menus',
      'Wine pairings',
      'Wait staff',
      'Equipment',
    ],
    rating: 4.8,
  },
  {
    name: 'Silver Spoon Catering',
    email: 'bookings@silverspooncatering.com.au',
    phone: '02 4990 9955',
    website: 'https://www.silverspooncatering.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Hunter Valley',
    description:
      'Full-service wedding caterer covering Hunter Valley and Newcastle. Flexible menu options from canapés to banquets. Known for accommodating dietary requirements and professional execution. Mobile kitchen available.',
    priceMin: 70,
    priceMax: 150,
    priceDescription: '$70-150 per person with staff included',
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 200,
    styles: ['Modern', 'Versatile', 'Professional'],
    servicesOffered: [
      'Multiple service styles',
      'Dietary accommodations',
      'Mobile equipment',
      'Wait staff',
      'Bar service',
    ],
    rating: 4.7,
  },
  {
    name: 'Circa Catering',
    email: 'info@circacatering.com.au',
    phone: '0478 901 234',
    website: 'https://www.circacatering.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Maitland',
    description:
      'Contemporary catering company serving Hunter Valley weddings. Creative menus with focus on presentation and flavor. Specialize in grazing tables, canapés, and modern Australian cuisine. Personalized service.',
    priceMin: 65,
    priceMax: 140,
    priceDescription: '$65-140 per person depending on selections',
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 180,
    styles: ['Contemporary', 'Creative', 'Modern Australian'],
    servicesOffered: [
      'Grazing tables',
      'Canapés',
      'Plated meals',
      'Custom menus',
      'Styling',
    ],
    rating: 4.8,
  },
  {
    name: 'Tasting Tribe',
    email: 'hello@tastingtribe.com.au',
    phone: '0489 012 345',
    website: 'https://www.tastingtribe.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Pokolbin',
    description:
      'Boutique catering for intimate Hunter Valley weddings. Specializing in share-style feasts and wine-paired menus. Focus on seasonal, local ingredients. Perfect for smaller, foodie-focused celebrations.',
    priceMin: 95,
    priceMax: 175,
    priceDescription: '$95-175 per person for premium seasonal menus',
    capacity: 'SMALL' as VendorCapacity,
    maxGuests: 80,
    styles: ['Boutique', 'Seasonal', 'Wine-paired', 'Share-style'],
    servicesOffered: [
      'Share-style feasts',
      'Wine pairings',
      'Seasonal menus',
      'Intimate events',
      'Personal service',
    ],
    rating: 4.9,
  },

  // FLORISTS
  {
    name: 'Hunter Valley Florist',
    email: 'weddings@huntervalleyflorist.com.au',
    phone: '02 4998 7600',
    website: 'https://www.huntervalleyflorist.com.au',
    category: 'FLORIST' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Pokolbin',
    description:
      'Established Hunter Valley wedding florist creating romantic, garden-style arrangements. Specialize in vineyard weddings with locally-sourced blooms. Full-service floral design including bouquets, ceremony, and reception styling.',
    priceMin: 1500,
    priceMax: 5000,
    priceDescription: 'Wedding packages from $1,500-5,000',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Romantic', 'Garden', 'Vineyard', 'Natural'],
    servicesOffered: [
      'Bridal bouquets',
      'Ceremony flowers',
      'Reception styling',
      'Buttonholes',
      'Installations',
    ],
    rating: 4.8,
  },
  {
    name: 'The Wild Bloom',
    email: 'hello@thewildbloom.com.au',
    phone: '0456 123 789',
    website: 'https://www.thewildbloom.com.au',
    category: 'FLORIST' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Cessnock',
    description:
      'Boutique florist specializing in wild, organic floral designs. Perfect for bohemian and rustic Hunter Valley weddings. Using seasonal blooms and native Australian flowers. Sustainable, eco-friendly approach.',
    priceMin: 1800,
    priceMax: 4500,
    priceDescription: 'Packages from $1,800-4,500',
    capacity: 'SMALL' as VendorCapacity,
    styles: ['Bohemian', 'Wild', 'Native', 'Organic'],
    servicesOffered: [
      'Organic designs',
      'Native flowers',
      'Sustainable florals',
      'Styled shoots',
      'Installations',
    ],
    rating: 4.9,
  },
  {
    name: 'Petals & Peonies',
    email: 'weddings@petalsandpeonies.com.au',
    phone: '02 4991 5544',
    website: 'https://www.petalsandpeonies.com.au',
    category: 'FLORIST' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Maitland',
    description:
      'Elegant floral design studio serving Hunter Valley and Newcastle. Specializing in classic, romantic arrangements with luxury blooms. Comprehensive wedding packages from ceremony to reception styling. Attention to detail.',
    priceMin: 2000,
    priceMax: 6000,
    priceDescription: 'Full wedding packages $2,000-6,000',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Elegant', 'Romantic', 'Luxury', 'Classic'],
    servicesOffered: [
      'Full wedding packages',
      'Luxury blooms',
      'Ceremony styling',
      'Reception florals',
      'Consultations',
    ],
    rating: 4.8,
  },

  // ENTERTAINMENT
  {
    name: 'Hunter Valley Wedding DJ',
    email: 'bookings@huntervalleydj.com.au',
    phone: '0423 456 890',
    website: 'https://www.huntervalleydj.com.au',
    category: 'ENTERTAINMENT' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Hunter Valley',
    description:
      'Professional wedding DJ service specializing in Hunter Valley venues. Extensive music library covering all genres and eras. Professional equipment, wireless microphones, and dance floor lighting. Experienced MC services.',
    priceMin: 1200,
    priceMax: 2500,
    priceDescription: '$1,200-2,500 depending on hours and equipment',
    capacity: 'LARGE' as VendorCapacity,
    styles: ['Professional', 'Versatile', 'Modern'],
    servicesOffered: [
      'DJ services',
      'MC services',
      'Sound system',
      'Lighting',
      'Wireless mics',
    ],
    rating: 4.8,
  },
  {
    name: 'Hunter Valley Acoustic Duo',
    email: 'bookings@hvacoustic.com.au',
    phone: '0434 567 901',
    website: 'https://www.hvacoustic.com.au',
    category: 'ENTERTAINMENT' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Pokolbin',
    description:
      'Professional acoustic duo perfect for ceremony and cocktail hour. Extensive repertoire of popular songs with beautiful vocal harmonies. Experienced with outdoor vineyard settings. Professional PA system included.',
    priceMin: 800,
    priceMax: 1800,
    priceDescription: '$800-1,800 for 2-4 hours',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Acoustic', 'Contemporary', 'Romantic'],
    servicesOffered: [
      'Ceremony music',
      'Cocktail hour',
      'Acoustic sets',
      'PA system',
      'Song requests',
    ],
    rating: 4.9,
  },

  // MARQUEE
  {
    name: 'Hunter Valley Marquees',
    email: 'info@huntervalleymarquees.com.au',
    phone: '02 4998 1234',
    website: 'https://www.huntervalleymarquees.com.au',
    category: 'MARQUEE' as VendorCategory,
    location: 'Hunter Valley',
    region: 'Hunter Valley',
    description:
      'Premium marquee hire for Hunter Valley weddings. Clear span marquees, elegant linings, and complete furniture packages. Experienced with vineyard and estate installations. Full-service including setup and pack down.',
    priceMin: 5000,
    priceMax: 15000,
    priceDescription: 'Marquee packages from $5k-15k depending on size and inclusions',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 300,
    styles: ['Elegant', 'Clear Span', 'Premium'],
    servicesOffered: [
      'Marquee hire',
      'Furniture packages',
      'Lighting',
      'Flooring',
      'Setup and pack down',
    ],
    rating: 4.8,
  },
]

async function seedHunterValleyVendors() {
  console.log('🍷 Seeding Hunter Valley wedding vendors...\n')

  // Validate data first
  getVendorSummary(hunterValleyVendors as any)
  const isValid = validateVendorList(hunterValleyVendors as any)

  if (!isValid) {
    console.error('\n❌ Validation failed. Aborting seed.')
    process.exit(1)
  }

  console.log('\n🌱 Starting database seeding...\n')

  // Check for duplicates
  const existingVendors = await prisma.vendor.findMany({
    where: {
      OR: [{ location: 'Hunter Valley' }, { region: { in: ['Pokolbin', 'Rothbury', 'Cessnock', 'Lovedale', 'Maitland'] } }],
    },
    select: { name: true, email: true },
  })

  const newVendors = hunterValleyVendors.filter(
    v =>
      !existingVendors.some(ev => ev.email === v.email || ev.name === v.name)
  )

  console.log(
    `📊 Found ${newVendors.length} new vendors to add (${hunterValleyVendors.length - newVendors.length} already exist)\n`
  )

  if (newVendors.length === 0) {
    console.log('✨ All vendors already exist in database.')
    return
  }

  for (const vendor of newVendors) {
    const created = await prisma.vendor.create({
      data: vendor,
    })
    console.log(`✅ Added ${created.category}: ${created.name}`)
  }

  console.log(`\n✨ Successfully added ${newVendors.length} Hunter Valley vendors!`)

  // Show final summary
  const summary = await prisma.vendor.groupBy({
    by: ['category'],
    where: {
      OR: [
        { location: 'Hunter Valley' },
        { region: { in: ['Pokolbin', 'Rothbury', 'Cessnock', 'Lovedale', 'Maitland'] } },
      ],
    },
    _count: true,
  })

  console.log(`\n📊 Total vendors in Hunter Valley:`)
  summary.forEach(s => {
    console.log(`   • ${s.category}: ${s._count}`)
  })

  const totalCount = summary.reduce((acc, s) => acc + s._count, 0)
  console.log(`\n🎉 Total Hunter Valley vendors: ${totalCount}`)
}

seedHunterValleyVendors()
  .catch(e => {
    console.error('Error seeding vendors:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
