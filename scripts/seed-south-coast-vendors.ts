import { PrismaClient, VendorCategory, VendorCapacity, PriceRange } from '@prisma/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { validateVendorList, getVendorSummary } from './validate-vendor-data'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const prisma = new PrismaClient()

const southCoastVendors = [
  // VENUES
  {
    name: 'Figbird Cottage & Garden',
    email: 'weddings@figbirdcottage.com.au',
    phone: '02 4464 1977',
    website: 'https://www.figbirdcottage.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'South Coast',
    region: 'Berry',
    address: '40 Woodhill Mountain Rd, Berry NSW 2535',
    description:
      'Enchanting country garden venue nestled in the Berry hinterland with sweeping escarpment views. Lush cottage gardens, rustic barn, and open-air pavilion. Exclusive-use property with on-site accommodation for intimate, relaxed celebrations.',
    priceMin: 7000,
    priceMax: 16000,
    priceDescription: 'Exclusive venue hire from $7k-16k',
    priceRange: 'MODERATE' as PriceRange,
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 120,
    styles: ['Garden', 'Rustic', 'Country', 'Intimate'],
    servicesOffered: ['Garden ceremony', 'Barn reception', 'Accommodation', 'Exclusive use', 'Escarpment views'],
    rating: 4.9,
  },
  {
    name: 'Silos Estate',
    email: 'events@silosestate.com',
    phone: '02 4448 6082',
    website: 'https://www.silosestate.com',
    category: 'VENUE' as VendorCategory,
    location: 'South Coast',
    region: 'Berry',
    address: 'B660 Princes Hwy, Berry NSW 2535',
    description:
      'Award-winning winery and restaurant venue set among the rolling hills of Berry. Vineyard ceremonies, contemporary restaurant reception, and converted grain silo accommodation. Farm-to-table dining with estate wines.',
    priceMin: 10000,
    priceMax: 24000,
    priceDescription: 'All-inclusive packages from $10k-24k',
    priceRange: 'PREMIUM' as PriceRange,
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 120,
    styles: ['Vineyard', 'Modern', 'Farm-to-table', 'Wine Country'],
    servicesOffered: ['Vineyard ceremony', 'Restaurant reception', 'Estate wines', 'Accommodation', 'Farm-to-table dining'],
    rating: 4.8,
  },
  {
    name: 'Bush Chapel at Bundanon',
    email: 'events@bundanon.com.au',
    phone: '02 4422 2100',
    website: 'https://www.bundanon.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'South Coast',
    region: 'Nowra',
    address: '533 Riverview Rd, Illaroo NSW 2540',
    description:
      'Unique arts venue on the Shoalhaven River, gifted to Australia by Arthur Boyd. Bush chapel surrounded by native bushland, riverside ceremony options, and modern gallery spaces for receptions. A cultural landmark and natural sanctuary.',
    priceMin: 6000,
    priceMax: 14000,
    priceDescription: 'Venue hire from $6k-14k for up to 100 guests',
    priceRange: 'MODERATE' as PriceRange,
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 100,
    styles: ['Nature', 'Artistic', 'Bush', 'Unique'],
    servicesOffered: ['Bush chapel', 'Riverside ceremony', 'Gallery reception', 'Accommodation', 'Art collection'],
    rating: 4.8,
  },
  {
    name: 'Bannisters by the Sea',
    email: 'weddings@bannisters.com.au',
    phone: '02 4455 3044',
    website: 'https://www.bannisters.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'South Coast',
    region: 'Mollymook',
    address: '191 Mitchell Pde, Mollymook NSW 2539',
    description:
      'Luxury coastal resort with Rick Stein restaurant and rooftop pool overlooking Mollymook Beach. Elegant ocean-view function room, rooftop ceremonies, and boutique accommodation. Premium seaside destination for sophisticated celebrations.',
    priceMin: 12000,
    priceMax: 28000,
    priceDescription: 'Premium packages from $12k-28k',
    priceRange: 'LUXURY' as PriceRange,
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 100,
    styles: ['Coastal', 'Luxury', 'Modern', 'Sophisticated'],
    servicesOffered: ['Ocean-view reception', 'Rooftop ceremony', 'Rick Stein dining', 'Accommodation', 'Pool'],
    rating: 4.9,
  },
  {
    name: 'Coolangatta Estate',
    email: 'functions@coolangattaestate.com.au',
    phone: '02 4448 7131',
    website: 'https://www.coolangattaestate.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'South Coast',
    region: 'Shoalhaven Heads',
    address: '1335 Bolong Rd, Shoalhaven Heads NSW 2535',
    description:
      'Historic convict-built estate surrounded by vineyards and heritage gardens on the Shoalhaven River. Multiple ceremony locations including sandstone chapel and manicured gardens. All-inclusive with estate wines and accommodation.',
    priceMin: 8000,
    priceMax: 20000,
    priceDescription: 'All-inclusive from $8k-20k with estate wines',
    priceRange: 'MODERATE' as PriceRange,
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 200,
    styles: ['Heritage', 'Vineyard', 'Garden', 'Country'],
    servicesOffered: ['Sandstone chapel', 'Garden ceremony', 'Reception venue', 'Estate wines', 'Accommodation'],
    rating: 4.7,
  },

  // PHOTOGRAPHERS
  {
    name: 'South Coast Wedding Photography',
    email: 'hello@southcoastweddings.com.au',
    phone: '0412 345 678',
    website: 'https://www.southcoastweddings.com.au',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'South Coast',
    region: 'Berry',
    description:
      'Local South Coast photographer capturing coastal and hinterland weddings with natural, romantic style. Extensive knowledge of South Coast venues and hidden beach locations. Relaxed approach focused on genuine emotions and beautiful light.',
    priceMin: 2800,
    priceMax: 4500,
    priceDescription: '$2,800-4,500 for full day coverage',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Natural', 'Romantic', 'Coastal', 'Relaxed'],
    servicesOffered: ['Full day coverage', 'Engagement shoots', 'All images', 'Online gallery', 'Beach locations'],
    rating: 4.9,
  },
  {
    name: 'Jai Long Photography',
    email: 'jai@jailong.com.au',
    phone: '0423 456 789',
    website: 'https://www.jailong.com.au',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'South Coast',
    region: 'Wollongong',
    description:
      'Documentary wedding photographer based on the South Coast. Raw, emotional storytelling capturing authentic moments. Known for dramatic coastal landscapes and intimate candid shots. Adventure elopements and beach ceremonies a specialty.',
    priceMin: 3000,
    priceMax: 5000,
    priceDescription: '$3,000-5,000 depending on hours and inclusions',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Documentary', 'Raw', 'Dramatic', 'Candid'],
    servicesOffered: ['Documentary coverage', 'Elopements', 'Adventure shoots', 'Digital gallery', 'Albums'],
    rating: 4.8,
  },
  {
    name: 'Katie Brier Photography',
    email: 'hello@katiebrier.com.au',
    phone: '0434 567 890',
    website: 'https://www.katiebrier.com.au',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'South Coast',
    region: 'Kiama',
    description:
      'South Coast wedding photographer specializing in light-filled, joyful imagery. Capturing the laid-back coastal vibe with a fine art sensibility. Experienced with vineyard, garden, and beach weddings across the Shoalhaven and Illawarra.',
    priceMin: 2500,
    priceMax: 4200,
    priceDescription: '$2,500-4,200 for various packages',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Light-filled', 'Joyful', 'Fine Art', 'Coastal'],
    servicesOffered: ['Wedding coverage', 'Engagement sessions', 'Digital gallery', 'Print packages', 'Second shooter'],
    rating: 4.8,
  },

  // CATERERS
  {
    name: 'Berry Sourdough Catering',
    email: 'events@berrysourdough.com.au',
    phone: '02 4464 1617',
    website: 'https://www.berrysourdough.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'South Coast',
    region: 'Berry',
    description:
      'Berry-based caterer known for artisan, locally-sourced wedding menus. Rustic share-style feasts, wood-fired menus, and seasonal grazing tables. Using the best South Coast dairy, produce, and seafood. Warm, community-focused service.',
    priceMin: 75,
    priceMax: 155,
    priceDescription: '$75-155 per person for seasonal menus',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 200,
    styles: ['Artisan', 'Rustic', 'Local', 'Seasonal'],
    servicesOffered: ['Share-style feasts', 'Grazing tables', 'Wood-fired menus', 'Wait staff', 'Local produce'],
    rating: 4.9,
  },
  {
    name: 'Shoalhaven Catering Co',
    email: 'bookings@shoalhavencatering.com.au',
    phone: '02 4421 7788',
    website: 'https://www.shoalhavencatering.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'South Coast',
    region: 'Nowra',
    description:
      'Full-service South Coast caterer with 15+ years serving weddings across the Shoalhaven. Versatile menu options from cocktail-style to formal plated dinners. Professional team, mobile kitchen, and comprehensive equipment hire.',
    priceMin: 65,
    priceMax: 140,
    priceDescription: '$65-140 per person with flexible service styles',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 250,
    styles: ['Versatile', 'Professional', 'Modern', 'Coastal'],
    servicesOffered: ['Plated meals', 'Cocktail events', 'Buffets', 'Mobile kitchen', 'Equipment hire'],
    rating: 4.7,
  },
  {
    name: 'Millstone Kitchen Catering',
    email: 'hello@millstonekitchen.com.au',
    phone: '0445 678 901',
    website: 'https://www.millstonekitchen.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'South Coast',
    region: 'Kiama',
    description:
      'Contemporary South Coast caterer with a focus on fresh seafood and coastal-inspired menus. Known for beautiful presentation and accommodating all dietary needs. Perfect for beach and vineyard wedding settings.',
    priceMin: 80,
    priceMax: 165,
    priceDescription: '$80-165 per person for coastal-inspired menus',
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 140,
    styles: ['Coastal', 'Contemporary', 'Seafood', 'Fresh'],
    servicesOffered: ['Seafood menus', 'Custom menus', 'Dietary accommodations', 'Wait staff', 'Bar service'],
    rating: 4.8,
  },

  // FLORISTS
  {
    name: 'Bower Botanicals',
    email: 'hello@bowerbotanicals.com.au',
    phone: '0456 789 012',
    website: 'https://www.bowerbotanicals.com.au',
    category: 'FLORIST' as VendorCategory,
    location: 'South Coast',
    region: 'Berry',
    description:
      'South Coast florist creating wild, romantic arrangements with locally-grown and foraged flowers. Specializing in natural, unstructured designs perfect for coastal and garden weddings. Sustainable, minimal-waste approach.',
    priceMin: 1500,
    priceMax: 4500,
    priceDescription: 'Wedding packages from $1,500-4,500',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Wild', 'Romantic', 'Natural', 'Coastal'],
    servicesOffered: ['Bridal bouquets', 'Ceremony flowers', 'Reception styling', 'Locally-grown', 'Sustainable'],
    rating: 4.9,
  },
  {
    name: 'Kiama Florist',
    email: 'weddings@kiamaflorist.com.au',
    phone: '02 4232 1122',
    website: 'https://www.kiamaflorist.com.au',
    category: 'FLORIST' as VendorCategory,
    location: 'South Coast',
    region: 'Kiama',
    description:
      'Established South Coast florist with 15 years creating beautiful wedding arrangements. Classic and romantic style with premium seasonal blooms. Comprehensive wedding packages from intimate elopements to large celebrations.',
    priceMin: 1200,
    priceMax: 4000,
    priceDescription: 'Full wedding packages $1,200-4,000',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Classic', 'Romantic', 'Elegant', 'Seasonal'],
    servicesOffered: ['Full wedding packages', 'Premium blooms', 'Ceremony styling', 'Reception florals', 'Buttonholes'],
    rating: 4.7,
  },

  // ENTERTAINMENT
  {
    name: 'South Coast Sounds',
    email: 'bookings@southcoastsounds.com.au',
    phone: '0467 890 234',
    website: 'https://www.southcoastsounds.com.au',
    category: 'ENTERTAINMENT' as VendorCategory,
    location: 'South Coast',
    region: 'South Coast',
    description:
      'Local South Coast wedding entertainment covering ceremony to reception. Acoustic duos, live bands, and DJ services. Professional sound equipment suited for both indoor and outdoor coastal venues. Extensive music repertoire.',
    priceMin: 1200,
    priceMax: 3500,
    priceDescription: 'Acoustic duo $1,200 | DJ $1,500 | Full band $2,500-3,500',
    capacity: 'LARGE' as VendorCapacity,
    styles: ['Acoustic', 'Live Music', 'Versatile', 'Coastal'],
    servicesOffered: ['Acoustic duos', 'Live bands', 'DJ services', 'Sound equipment', 'MC services'],
    rating: 4.8,
  },
]

async function seedSouthCoastVendors() {
  console.log('🏖️ Seeding South Coast wedding vendors...\n')

  getVendorSummary(southCoastVendors as any)
  const isValid = validateVendorList(southCoastVendors as any)

  if (!isValid) {
    console.error('\n❌ Validation failed. Aborting seed.')
    process.exit(1)
  }

  console.log('\n🌱 Starting database seeding...\n')

  const existingVendors = await prisma.vendor.findMany({
    where: { location: 'South Coast' },
    select: { name: true, email: true },
  })

  const newVendors = southCoastVendors.filter(
    v => !existingVendors.some(ev => ev.email === v.email || ev.name === v.name)
  )

  console.log(`📊 Found ${newVendors.length} new vendors to add (${southCoastVendors.length - newVendors.length} already exist)\n`)

  if (newVendors.length === 0) {
    console.log('✨ All vendors already exist in database.')
    return
  }

  for (const vendor of newVendors) {
    const created = await prisma.vendor.create({ data: vendor })
    console.log(`✅ Added ${created.category}: ${created.name}`)
  }

  console.log(`\n✨ Successfully added ${newVendors.length} South Coast vendors!`)

  const summary = await prisma.vendor.groupBy({
    by: ['category'],
    where: { location: 'South Coast' },
    _count: true,
  })

  console.log('\n📊 Total vendors in South Coast:')
  summary.forEach(s => console.log(`   • ${s.category}: ${s._count}`))
  console.log(`\n🎉 Total South Coast vendors: ${summary.reduce((acc, s) => acc + s._count, 0)}`)
}

seedSouthCoastVendors()
  .catch(e => {
    console.error('Error seeding vendors:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
