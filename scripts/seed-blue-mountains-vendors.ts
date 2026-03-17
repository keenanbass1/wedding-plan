import { PrismaClient, VendorCategory, VendorCapacity, PriceRange } from '@prisma/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'
import { validateVendorList, getVendorSummary } from './validate-vendor-data'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const prisma = new PrismaClient()

const blueMountainsVendors = [
  // VENUES
  {
    name: 'Hydro Majestic Hotel',
    email: 'weddings@hydromajestic.com.au',
    phone: '02 4782 6885',
    website: 'https://www.hydromajestic.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Blue Mountains',
    region: 'Medlow Bath',
    address: '52-88 Great Western Hwy, Medlow Bath NSW 2780',
    description:
      'Iconic Art Deco heritage hotel perched on the escarpment with sweeping Megalong Valley views. Grand ballroom, intimate salon, and outdoor terrace. Luxurious accommodation and award-winning dining. A Blue Mountains landmark since 1904.',
    priceMin: 12000,
    priceMax: 30000,
    priceDescription: 'All-inclusive packages from $12k-30k',
    priceRange: 'LUXURY' as PriceRange,
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 200,
    styles: ['Heritage', 'Art Deco', 'Luxury', 'Grand'],
    servicesOffered: ['Ballroom reception', 'Terrace ceremony', 'Accommodation', 'Fine dining', 'Valley views'],
    rating: 4.8,
  },
  {
    name: 'Lilianfels Resort & Spa',
    email: 'functions@lilianfels.com.au',
    phone: '02 4780 1200',
    website: 'https://www.lilianfels.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Blue Mountains',
    region: 'Katoomba',
    address: '5-19 Lilianfels Ave, Katoomba NSW 2780',
    description:
      'Five-star resort overlooking the Jamison Valley near Echo Point. Elegant function rooms, manicured gardens, and luxury spa. All-inclusive wedding packages with premium accommodation and fine dining. Perfect for destination weddings.',
    priceMin: 14000,
    priceMax: 32000,
    priceDescription: 'Premium packages from $14k-32k including accommodation',
    priceRange: 'LUXURY' as PriceRange,
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 120,
    styles: ['Luxury', 'Resort', 'Garden', 'Elegant'],
    servicesOffered: ['Garden ceremony', 'Indoor reception', 'Accommodation', 'Day spa', 'Fine dining'],
    rating: 4.9,
  },
  {
    name: 'The Carrington Hotel',
    email: 'events@thecarrington.com.au',
    phone: '02 4782 1111',
    website: 'https://www.thecarrington.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Blue Mountains',
    region: 'Katoomba',
    address: '15-47 Katoomba St, Katoomba NSW 2780',
    description:
      'Grand Victorian hotel in the heart of Katoomba with original 1880s architecture. Stunning ballroom with ornate ceilings, heritage bar, and charming courtyard. Boutique accommodation and old-world charm for romantic celebrations.',
    priceMin: 8000,
    priceMax: 18000,
    priceDescription: 'Heritage venue packages from $8k-18k',
    priceRange: 'MODERATE' as PriceRange,
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 120,
    styles: ['Victorian', 'Heritage', 'Romantic', 'Boutique'],
    servicesOffered: ['Ballroom reception', 'Courtyard ceremony', 'Accommodation', 'Heritage bar', 'Catering'],
    rating: 4.7,
  },
  {
    name: 'Parklands Country Gardens & Lodges',
    email: 'weddings@parklandscg.com.au',
    phone: '02 4787 1888',
    website: 'https://www.parklandscg.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Blue Mountains',
    region: 'Blackheath',
    address: '132 Govetts Leap Rd, Blackheath NSW 2785',
    description:
      'Enchanting garden estate on 5 acres with rose gardens, lake, and forest backdrop. Rustic pavilion reception, outdoor ceremony sites, and self-contained lodges. Exclusive-use venue surrounded by Blue Mountains bushland.',
    priceMin: 7000,
    priceMax: 16000,
    priceDescription: 'Exclusive venue hire from $7k-16k',
    priceRange: 'MODERATE' as PriceRange,
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 100,
    styles: ['Garden', 'Rustic', 'Nature', 'Romantic'],
    servicesOffered: ['Garden ceremony', 'Pavilion reception', 'Lodges', 'Exclusive use', 'Lake setting'],
    rating: 4.8,
  },
  {
    name: 'The Lookout Echo Point',
    email: 'functions@thelookout.com.au',
    phone: '02 4782 4878',
    website: 'https://www.thelookout.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Blue Mountains',
    region: 'Katoomba',
    address: 'Echo Point Rd, Katoomba NSW 2780',
    description:
      'Dramatic cliff-edge venue overlooking the Three Sisters and Jamison Valley. Modern glass-walled restaurant with uninterrupted valley views. Outdoor terrace for ceremonies with one of Australia\'s most spectacular natural backdrops.',
    priceMin: 9000,
    priceMax: 20000,
    priceDescription: 'View packages from $9k-20k',
    priceRange: 'PREMIUM' as PriceRange,
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 100,
    styles: ['Modern', 'Scenic', 'Contemporary', 'Nature'],
    servicesOffered: ['Terrace ceremony', 'Restaurant reception', 'Valley views', 'Catering', 'Bar service'],
    rating: 4.7,
  },

  // PHOTOGRAPHERS
  {
    name: 'Blue Mountains Wedding Photography',
    email: 'hello@bmweddingphoto.com.au',
    phone: '0412 789 012',
    website: 'https://www.bmweddingphoto.com.au',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Blue Mountains',
    region: 'Katoomba',
    description:
      'Local Blue Mountains wedding photographer with intimate knowledge of every lookout, garden, and hidden trail. Capturing the magic of mountain weddings with natural light and dramatic landscapes. Relaxed, adventure-loving approach.',
    priceMin: 2800,
    priceMax: 4500,
    priceDescription: '$2,800-4,500 for full day coverage',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Natural', 'Landscape', 'Adventure', 'Romantic'],
    servicesOffered: ['Full day coverage', 'Engagement shoots', 'All images', 'Online gallery', 'Mountain locations'],
    rating: 4.9,
  },
  {
    name: 'Megan Aldridge Photography',
    email: 'megan@meganaldridge.com.au',
    phone: '0423 890 123',
    website: 'https://www.meganaldridge.com.au',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Blue Mountains',
    region: 'Leura',
    description:
      'Blue Mountains based wedding photographer creating romantic, dreamy imagery in mountain and garden settings. Known for capturing golden hour magic at mountain lookouts. Warm, personal approach making couples feel at ease.',
    priceMin: 2500,
    priceMax: 4000,
    priceDescription: '$2,500-4,000 for 6-10 hour packages',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Dreamy', 'Romantic', 'Golden Hour', 'Garden'],
    servicesOffered: ['Wedding coverage', 'Engagement sessions', 'Digital gallery', 'Print packages', 'Elopements'],
    rating: 4.8,
  },
  {
    name: 'Mitch Pohl Photography',
    email: 'info@mitchpohl.com.au',
    phone: '0434 901 234',
    website: 'https://www.mitchpohl.com.au',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Blue Mountains',
    region: 'Blue Mountains',
    description:
      'Documentary wedding photographer serving Blue Mountains and greater Sydney. Known for candid, unposed moments and moody, cinematic style. Experienced with bush ceremonies, heritage venues, and adventure elopements.',
    priceMin: 3000,
    priceMax: 5000,
    priceDescription: '$3,000-5,000 depending on coverage and inclusions',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Documentary', 'Cinematic', 'Moody', 'Candid'],
    servicesOffered: ['Full day coverage', 'Elopements', 'Second shooter', 'Online gallery', 'Albums'],
    rating: 4.8,
  },

  // CATERERS
  {
    name: 'Mountain Culture Catering',
    email: 'events@mountainculture.com.au',
    phone: '02 4782 8066',
    website: 'https://www.mountainculture.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Blue Mountains',
    region: 'Katoomba',
    description:
      'Local Blue Mountains caterer offering rustic, seasonal menus inspired by mountain produce. From share-style feasts to elegant plated dinners. Known for locally-brewed craft beers and wines from local vineyards.',
    priceMin: 80,
    priceMax: 160,
    priceDescription: '$80-160 per person with beverage options',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 200,
    styles: ['Rustic', 'Seasonal', 'Local', 'Craft'],
    servicesOffered: ['Share-style feasts', 'Plated meals', 'Craft beverages', 'Wait staff', 'Mobile kitchen'],
    rating: 4.8,
  },
  {
    name: 'Leura Gourmet Catering',
    email: 'weddings@leuragourmet.com.au',
    phone: '02 4784 3344',
    website: 'https://www.leuragourmet.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Blue Mountains',
    region: 'Leura',
    description:
      'Established Blue Mountains caterer with 20+ years serving mountain weddings. French-inspired cuisine using local and seasonal ingredients. Full-service catering for garden and heritage venue weddings. Warm, personal service.',
    priceMin: 75,
    priceMax: 155,
    priceDescription: '$75-155 per person including service staff',
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 140,
    styles: ['French-inspired', 'Gourmet', 'Seasonal', 'Classic'],
    servicesOffered: ['Multi-course meals', 'Canapés', 'Beverage packages', 'Wait staff', 'Dessert tables'],
    rating: 4.7,
  },

  // FLORISTS
  {
    name: 'Wild Mountain Flowers',
    email: 'hello@wildmountainflowers.com.au',
    phone: '0445 012 345',
    website: 'https://www.wildmountainflowers.com.au',
    category: 'FLORIST' as VendorCategory,
    location: 'Blue Mountains',
    region: 'Blackheath',
    description:
      'Blue Mountains florist creating wild, organic arrangements with native and seasonal blooms. Specializing in garden-style and bohemian wedding florals. Locally-grown flowers from mountain gardens. Sustainable, eco-conscious approach.',
    priceMin: 1500,
    priceMax: 4500,
    priceDescription: 'Wedding packages from $1,500-4,500',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Wild', 'Native', 'Bohemian', 'Organic'],
    servicesOffered: ['Bridal bouquets', 'Ceremony installations', 'Reception styling', 'Buttonholes', 'Locally-grown'],
    rating: 4.9,
  },
  {
    name: 'Leura Flower Studio',
    email: 'studio@leuraflowers.com.au',
    phone: '02 4784 2266',
    website: 'https://www.leuraflowers.com.au',
    category: 'FLORIST' as VendorCategory,
    location: 'Blue Mountains',
    region: 'Leura',
    description:
      'Elegant floral design studio in the heart of Leura village. Creating romantic, lush arrangements for Blue Mountains weddings. Classic and garden-style designs using premium seasonal blooms. Experienced with all major mountain venues.',
    priceMin: 1800,
    priceMax: 5500,
    priceDescription: 'Full wedding packages $1,800-5,500',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Romantic', 'Garden', 'Classic', 'Lush'],
    servicesOffered: ['Full wedding packages', 'Premium blooms', 'Ceremony styling', 'Reception florals', 'Consultations'],
    rating: 4.8,
  },
]

async function seedBlueMountainsVendors() {
  console.log('🏔️ Seeding Blue Mountains wedding vendors...\n')

  getVendorSummary(blueMountainsVendors as any)
  const isValid = validateVendorList(blueMountainsVendors as any)

  if (!isValid) {
    console.error('\n❌ Validation failed. Aborting seed.')
    process.exit(1)
  }

  console.log('\n🌱 Starting database seeding...\n')

  const existingVendors = await prisma.vendor.findMany({
    where: { location: 'Blue Mountains' },
    select: { name: true, email: true },
  })

  const newVendors = blueMountainsVendors.filter(
    v => !existingVendors.some(ev => ev.email === v.email || ev.name === v.name)
  )

  console.log(`📊 Found ${newVendors.length} new vendors to add (${blueMountainsVendors.length - newVendors.length} already exist)\n`)

  if (newVendors.length === 0) {
    console.log('✨ All vendors already exist in database.')
    return
  }

  for (const vendor of newVendors) {
    const created = await prisma.vendor.create({ data: vendor })
    console.log(`✅ Added ${created.category}: ${created.name}`)
  }

  console.log(`\n✨ Successfully added ${newVendors.length} Blue Mountains vendors!`)

  const summary = await prisma.vendor.groupBy({
    by: ['category'],
    where: { location: 'Blue Mountains' },
    _count: true,
  })

  console.log('\n📊 Total vendors in Blue Mountains:')
  summary.forEach(s => console.log(`   • ${s.category}: ${s._count}`))
  console.log(`\n🎉 Total Blue Mountains vendors: ${summary.reduce((acc, s) => acc + s._count, 0)}`)
}

seedBlueMountainsVendors()
  .catch(e => {
    console.error('Error seeding vendors:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
