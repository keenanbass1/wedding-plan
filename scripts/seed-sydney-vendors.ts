import { PrismaClient, VendorCategory, VendorCapacity, PriceRange } from '@prisma/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { validateVendorList, getVendorSummary } from './validate-vendor-data'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const prisma = new PrismaClient()

const sydneyVendors = [
  // VENUES
  {
    name: 'Doltone House Hyde Park',
    email: 'events@doltonehouse.com.au',
    phone: '02 9583 1199',
    website: 'https://www.doltonehouse.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Sydney',
    region: 'CBD',
    address: '181 Elizabeth St, Sydney NSW 2000',
    description:
      'Iconic Sydney wedding venue in the heritage-listed Hyde Park Barracks precinct. Grand ballrooms with soaring ceilings, crystal chandeliers, and views of Hyde Park. Full-service venue with in-house catering and event coordination.',
    priceMin: 15000,
    priceMax: 35000,
    priceDescription: 'All-inclusive packages from $15k-35k depending on guest count and season',
    priceRange: 'PREMIUM' as PriceRange,
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 300,
    styles: ['Elegant', 'Classic', 'Luxury', 'Grand'],
    servicesOffered: ['Ceremony venue', 'Reception venue', 'In-house catering', 'Event coordination', 'AV equipment'],
    rating: 4.8,
  },
  {
    name: 'Sergeants Mess',
    email: 'weddings@sergeantsmess.com.au',
    phone: '02 8962 5900',
    website: 'https://www.sergeantsmess.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Sydney',
    region: 'Mosman',
    address: 'Chowder Bay, Mosman NSW 2088',
    description:
      'Stunning harbourside venue at Chowder Bay with panoramic water views. Heritage sandstone building with modern interiors, waterfront terrace for ceremonies, and elegant reception hall. One of Sydney\'s most sought-after wedding locations.',
    priceMin: 12000,
    priceMax: 28000,
    priceDescription: 'Venue hire and packages from $12k-28k',
    priceRange: 'PREMIUM' as PriceRange,
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 200,
    styles: ['Waterfront', 'Elegant', 'Heritage', 'Modern'],
    servicesOffered: ['Ceremony venue', 'Reception venue', 'Harbour views', 'Catering', 'Bar service'],
    rating: 4.9,
  },
  {
    name: 'Gunners Barracks',
    email: 'events@gunnersbarracks.com.au',
    phone: '02 8962 5900',
    website: 'https://www.gunnersbarracks.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Sydney',
    region: 'Mosman',
    address: 'End of Suakin Dr, Mosman NSW 2088',
    description:
      'Heritage tearoom and garden venue perched above Sydney Harbour with breathtaking views. Intimate garden ceremonies with harbour backdrop, elegant indoor reception space. Perfect for couples wanting classic Sydney charm.',
    priceMin: 10000,
    priceMax: 22000,
    priceDescription: 'Packages from $10k-22k for up to 120 guests',
    priceRange: 'PREMIUM' as PriceRange,
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 120,
    styles: ['Heritage', 'Garden', 'Romantic', 'Harbour'],
    servicesOffered: ['Garden ceremony', 'Indoor reception', 'Harbour views', 'Fine dining', 'Event styling'],
    rating: 4.8,
  },
  {
    name: 'Taronga Centre',
    email: 'functions@taronga.org.au',
    phone: '02 9978 4782',
    website: 'https://taronga.org.au/functions',
    category: 'VENUE' as VendorCategory,
    location: 'Sydney',
    region: 'Mosman',
    address: 'Bradleys Head Rd, Mosman NSW 2088',
    description:
      'Unique wedding venue at Taronga Zoo with unrivalled views of Sydney Harbour, Opera House, and Harbour Bridge. Floor-to-ceiling windows, outdoor terrace, and the option for animal encounters. A truly unforgettable Sydney wedding.',
    priceMin: 13000,
    priceMax: 30000,
    priceDescription: 'Venue packages from $13k-30k with harbour views',
    priceRange: 'PREMIUM' as PriceRange,
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 250,
    styles: ['Modern', 'Unique', 'Harbour', 'Contemporary'],
    servicesOffered: ['Ceremony venue', 'Reception venue', 'Harbour views', 'Catering', 'Animal encounters'],
    rating: 4.7,
  },
  {
    name: 'Curzon Hall',
    email: 'weddings@curzonhall.com.au',
    phone: '02 9747 2522',
    website: 'https://www.curzonhall.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Sydney',
    region: 'Marsfield',
    address: '19 Agincourt Rd, Marsfield NSW 2122',
    description:
      'Grand European-inspired castle venue in Sydney\'s north with manicured gardens, chapel, and opulent ballrooms. Marble staircases, crystal chandeliers, and stunning photo opportunities. Perfect for large, elegant celebrations.',
    priceMin: 9000,
    priceMax: 20000,
    priceDescription: 'All-inclusive packages from $9k-20k',
    priceRange: 'MODERATE' as PriceRange,
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 350,
    styles: ['Grand', 'Classic', 'Elegant', 'European'],
    servicesOffered: ['Chapel ceremony', 'Ballroom reception', 'Gardens', 'Catering', 'Bridal suite'],
    rating: 4.7,
  },
  {
    name: 'Manly Wine',
    email: 'events@manlywine.com.au',
    phone: '02 9977 3855',
    website: 'https://www.manlywine.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Sydney',
    region: 'Manly',
    address: '3a East Esplanade, Manly NSW 2095',
    description:
      'Relaxed waterfront venue on Manly Wharf with stunning harbour views. Indoor-outdoor spaces perfect for cocktail-style and seated weddings. Casual elegance with excellent food and wine. Ideal for beach-loving couples.',
    priceMin: 7000,
    priceMax: 16000,
    priceDescription: 'Venue packages from $7k-16k',
    priceRange: 'MODERATE' as PriceRange,
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 140,
    styles: ['Coastal', 'Relaxed', 'Modern', 'Waterfront'],
    servicesOffered: ['Waterfront venue', 'Indoor-outdoor', 'Catering', 'Bar service', 'Harbour views'],
    rating: 4.6,
  },

  // PHOTOGRAPHERS
  {
    name: 'Muse Photography',
    email: 'hello@musephotography.com.au',
    phone: '0412 345 678',
    website: 'https://www.musephotography.com.au',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Sydney',
    region: 'Sydney',
    description:
      'Award-winning Sydney wedding photographer known for editorial, fashion-inspired imagery. Published in Vogue Bride, Harper\'s Bazaar, and Real Weddings. Relaxed approach capturing authentic moments with a high-fashion edge.',
    priceMin: 4000,
    priceMax: 7000,
    priceDescription: '$4,000-7,000 for full day coverage with all edited images',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Editorial', 'Fashion', 'Modern', 'Artistic'],
    servicesOffered: ['Full day coverage', 'Engagement shoots', 'All images included', 'Online gallery', 'Albums'],
    rating: 4.9,
  },
  {
    name: 'Lightheart Films & Photography',
    email: 'hello@lightheart.com.au',
    phone: '0423 456 789',
    website: 'https://www.lightheart.com.au',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Sydney',
    region: 'Inner West',
    description:
      'Husband-and-wife photography and videography team capturing Sydney weddings with warmth and authenticity. Relaxed, documentary style focused on real moments. Photo and video combo packages for comprehensive coverage.',
    priceMin: 3500,
    priceMax: 6500,
    priceDescription: 'Photography $3,500-4,800 | Photo+Video combo $5,500-6,500',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Documentary', 'Natural', 'Warm', 'Relaxed'],
    servicesOffered: ['Photography', 'Videography', 'Combo packages', 'Engagement shoots', 'Drone footage'],
    rating: 4.9,
  },
  {
    name: 'Zoe Morley Photography',
    email: 'hello@zoemorley.com',
    phone: '0434 567 890',
    website: 'https://www.zoemorley.com',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Sydney',
    region: 'Northern Beaches',
    description:
      'Sydney wedding photographer specializing in romantic, light-filled images. Known for beautiful use of natural light and relaxed posing. Experienced with venues across Sydney, from harbourside to garden settings.',
    priceMin: 3000,
    priceMax: 5000,
    priceDescription: '$3,000-5,000 for 6-10 hour packages',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Romantic', 'Light-filled', 'Natural', 'Elegant'],
    servicesOffered: ['Full day coverage', 'Engagement sessions', 'Digital gallery', 'Print options', 'Second shooter'],
    rating: 4.8,
  },
  {
    name: 'Kevin Lue Photography',
    email: 'info@kevinlue.com',
    phone: '0445 678 901',
    website: 'https://www.kevinlue.com',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Sydney',
    region: 'Sydney',
    description:
      'Creative wedding photographer bringing a fine art perspective to Sydney weddings. Cinematic, moody aesthetic with attention to composition and detail. Experienced across all major Sydney venues from the Opera House to the Blue Mountains.',
    priceMin: 3200,
    priceMax: 5500,
    priceDescription: '$3,200-5,500 depending on coverage hours and inclusions',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Fine Art', 'Cinematic', 'Moody', 'Creative'],
    servicesOffered: ['Full day coverage', 'Albums', 'Digital gallery', 'Engagement shoots', 'Elopements'],
    rating: 4.8,
  },

  // CATERERS
  {
    name: 'Gastro Park Catering',
    email: 'events@gastropark.com.au',
    phone: '02 8068 4422',
    website: 'https://www.gastropark.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Sydney',
    region: 'Sydney',
    description:
      'Premium Sydney wedding caterer with a modern Australian menu featuring seasonal, locally-sourced produce. Full-service catering from intimate dinners to grand celebrations. Known for creative presentation and exceptional service.',
    priceMin: 90,
    priceMax: 200,
    priceDescription: '$90-200 per person depending on menu and service style',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 350,
    styles: ['Modern Australian', 'Gourmet', 'Seasonal', 'Premium'],
    servicesOffered: ['Custom menus', 'Wait staff', 'Beverage packages', 'Equipment hire', 'Event styling'],
    rating: 4.9,
  },
  {
    name: 'Forte Catering',
    email: 'weddings@fortecatering.com.au',
    phone: '02 9310 4455',
    website: 'https://www.fortecatering.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Sydney',
    region: 'Surry Hills',
    description:
      'Award-winning Sydney caterer specializing in Mediterranean and Asian-inspired wedding menus. Known for spectacular grazing tables, share-style feasts, and cocktail-style receptions. Professional team with 15+ years experience.',
    priceMin: 80,
    priceMax: 170,
    priceDescription: '$80-170 per person including service staff',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 300,
    styles: ['Mediterranean', 'Asian-fusion', 'Share-style', 'Modern'],
    servicesOffered: ['Grazing tables', 'Share platters', 'Cocktail events', 'Beverage packages', 'Wait staff'],
    rating: 4.8,
  },
  {
    name: 'The Grounds Catering',
    email: 'events@thegrounds.com.au',
    phone: '02 9699 2225',
    website: 'https://thegrounds.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Sydney',
    region: 'Alexandria',
    description:
      'From the team behind The Grounds of Alexandria, offering garden-inspired wedding catering with seasonal menus. Farm-to-table philosophy with beautiful, rustic presentation. Perfect for couples wanting a relaxed, foodie-focused celebration.',
    priceMin: 85,
    priceMax: 180,
    priceDescription: '$85-180 per person for seasonal farm-to-table menus',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 250,
    styles: ['Farm-to-table', 'Rustic', 'Seasonal', 'Garden'],
    servicesOffered: ['Seasonal menus', 'Farm-to-table', 'Beverage packages', 'Wait staff', 'Styling'],
    rating: 4.8,
  },
  {
    name: 'Dish Catering',
    email: 'info@dishcatering.com.au',
    phone: '02 8065 7890',
    website: 'https://www.dishcatering.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Sydney',
    region: 'Sydney',
    description:
      'Versatile Sydney wedding caterer offering everything from elegant plated dinners to relaxed food truck weddings. Flexible menus that cater to all dietary requirements. Known for reliability and great value across all budget ranges.',
    priceMin: 65,
    priceMax: 140,
    priceDescription: '$65-140 per person with flexible service styles',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 300,
    styles: ['Versatile', 'Modern', 'Relaxed', 'Professional'],
    servicesOffered: ['Plated meals', 'Buffets', 'Food trucks', 'Dietary accommodations', 'Mobile equipment'],
    rating: 4.7,
  },

  // FLORISTS
  {
    name: 'Flowers Vasette',
    email: 'weddings@flowersvasette.com.au',
    phone: '02 9357 4011',
    website: 'https://www.flowersvasette.com.au',
    category: 'FLORIST' as VendorCategory,
    location: 'Sydney',
    region: 'Potts Point',
    description:
      'Premier Sydney wedding florist known for lush, romantic arrangements using seasonal blooms. Over 20 years creating stunning wedding florals for Sydney\'s most prestigious venues. Full-service from bridal bouquets to grand installations.',
    priceMin: 2000,
    priceMax: 8000,
    priceDescription: 'Wedding packages from $2,000-8,000',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Romantic', 'Lush', 'Elegant', 'Seasonal'],
    servicesOffered: ['Bridal bouquets', 'Ceremony flowers', 'Reception styling', 'Installations', 'Buttonholes'],
    rating: 4.9,
  },
  {
    name: 'Pollen & Co',
    email: 'hello@pollenandco.com.au',
    phone: '0456 789 123',
    website: 'https://www.pollenandco.com.au',
    category: 'FLORIST' as VendorCategory,
    location: 'Sydney',
    region: 'Marrickville',
    description:
      'Modern Sydney florist specializing in wild, organic wedding designs with native Australian flowers. Sustainable approach using locally-grown, seasonal blooms. Perfect for bohemian, rustic, and garden-style weddings.',
    priceMin: 1500,
    priceMax: 5000,
    priceDescription: 'Packages from $1,500-5,000',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Bohemian', 'Native', 'Organic', 'Wild'],
    servicesOffered: ['Organic designs', 'Native flowers', 'Sustainable florals', 'Ceremony styling', 'Reception florals'],
    rating: 4.8,
  },

  // ENTERTAINMENT
  {
    name: 'The White Tree Band',
    email: 'bookings@thewhitetree.com.au',
    phone: '0467 890 123',
    website: 'https://www.thewhitetree.com.au',
    category: 'ENTERTAINMENT' as VendorCategory,
    location: 'Sydney',
    region: 'Sydney',
    description:
      'Sydney\'s premier wedding band and entertainment agency. Live bands, acoustic duos, DJs, and string quartets for ceremony through to late-night dancing. Professional musicians with extensive repertoire and premium sound equipment.',
    priceMin: 1500,
    priceMax: 5000,
    priceDescription: 'Acoustic duo $1,500 | Full band $3,500-5,000',
    capacity: 'LARGE' as VendorCapacity,
    styles: ['Live Music', 'Versatile', 'Professional', 'Premium'],
    servicesOffered: ['Live bands', 'Acoustic duos', 'DJ services', 'String quartets', 'MC services'],
    rating: 4.9,
  },
]

async function seedSydneyVendors() {
  console.log('🌉 Seeding Sydney wedding vendors...\n')

  getVendorSummary(sydneyVendors as any)
  const isValid = validateVendorList(sydneyVendors as any)

  if (!isValid) {
    console.error('\n❌ Validation failed. Aborting seed.')
    process.exit(1)
  }

  console.log('\n🌱 Starting database seeding...\n')

  const existingVendors = await prisma.vendor.findMany({
    where: { location: 'Sydney' },
    select: { name: true, email: true },
  })

  const newVendors = sydneyVendors.filter(
    v => !existingVendors.some(ev => ev.email === v.email || ev.name === v.name)
  )

  console.log(`📊 Found ${newVendors.length} new vendors to add (${sydneyVendors.length - newVendors.length} already exist)\n`)

  if (newVendors.length === 0) {
    console.log('✨ All vendors already exist in database.')
    return
  }

  for (const vendor of newVendors) {
    const created = await prisma.vendor.create({ data: vendor })
    console.log(`✅ Added ${created.category}: ${created.name}`)
  }

  console.log(`\n✨ Successfully added ${newVendors.length} Sydney vendors!`)

  const summary = await prisma.vendor.groupBy({
    by: ['category'],
    where: { location: 'Sydney' },
    _count: true,
  })

  console.log('\n📊 Total vendors in Sydney:')
  summary.forEach(s => console.log(`   • ${s.category}: ${s._count}`))
  console.log(`\n🎉 Total Sydney vendors: ${summary.reduce((acc, s) => acc + s._count, 0)}`)
}

seedSydneyVendors()
  .catch(e => {
    console.error('Error seeding vendors:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
