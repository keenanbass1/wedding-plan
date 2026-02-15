import { PrismaClient, VendorCategory, VendorCapacity } from '@prisma/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') })

const prisma = new PrismaClient()

const newcastleVendors = [
  // VENUES
  {
    name: 'Caves Coastal',
    email: 'bookings@cavescoastal.com.au',
    phone: '02 4332 1222',
    website: 'https://www.cavescoastal.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Newcastle',
    region: 'Lake Macquarie',
    address: '5-7 Caves Beach Rd, Caves Beach NSW 2281',
    description:
      'Waterfront wedding venue 45 minutes south of Newcastle, offering seaside ceremony deck, two reception rooms, and accommodation in beach house, villas and bungalows. Stunning coastal views and all-in-one wedding experience.',
    priceMin: 8000,
    priceMax: 20000,
    priceDescription: 'Packages from $8k-20k depending on guest count and season',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 180,
    styles: ['Coastal', 'Rustic', 'Outdoor', 'Beachside'],
    servicesOffered: [
      'Ceremony venue',
      'Reception venue',
      'Accommodation',
      'Catering',
      'Bridal suite',
    ],
    rating: 4.8,
  },
  {
    name: "Noah's on the Beach",
    email: 'weddings@noahsonthebeach.com.au',
    phone: '02 4929 5181',
    website: 'https://www.noahsonthebeach.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Newcastle',
    region: 'Newcastle',
    address: '2 Shortland Esplanade, Newcastle NSW 2300',
    description:
      'Oceanfront wedding venue overlooking Newcastle Beach with breathtaking sea views. Four elegant function rooms with comfortable accommodation and affordable packages. Ideal for beach weddings with indoor backup options.',
    priceMin: 7000,
    priceMax: 18000,
    priceDescription: 'All-inclusive packages from $7k-18k',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 200,
    styles: ['Coastal', 'Modern', 'Beachside', 'Elegant'],
    servicesOffered: [
      'Ceremony venue',
      'Reception venue',
      'Accommodation',
      'Catering',
      'Ocean views',
    ],
    rating: 4.7,
  },
  {
    name: 'Customs House Newcastle',
    email: 'events@customhousenewcastle.com.au',
    phone: '02 4925 1939',
    website: 'https://www.customhousenewcastle.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Newcastle',
    region: 'Newcastle',
    address: '18 Bond St, Newcastle NSW 2300',
    description:
      'Historic venue in the heart of Newcastle on Harbour Foreshore. Three unique reception venues with all-inclusive packages for 20-180 guests. Stunning harbourside location with heritage charm and modern amenities.',
    priceMin: 6000,
    priceMax: 15000,
    priceDescription: 'All-inclusive from $6k for 20 guests to $15k for 180',
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 180,
    styles: ['Historic', 'Elegant', 'Waterfront', 'Classic'],
    servicesOffered: [
      'Ceremony venue',
      'Reception venue',
      'Catering',
      'Bar service',
      'Harbour views',
    ],
    rating: 4.6,
  },
  {
    name: 'Ravella Newcastle',
    email: 'info@ravellanewcastle.com.au',
    phone: '02 4037 2929',
    website: 'https://www.ravellanewcastle.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Newcastle',
    region: 'Newcastle',
    address: 'Honeysuckle Dr, Newcastle NSW 2300',
    description:
      'Iconic Newcastle venue with three stunning spaces for weddings and engagement parties. Modern waterfront venue with flexible booking options - book individual spaces or the entire venue for exclusive use.',
    priceMin: 8000,
    priceMax: 25000,
    priceDescription: 'Venue hire from $8k, full venue exclusive use up to $25k',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 250,
    styles: ['Modern', 'Waterfront', 'Luxury', 'Contemporary'],
    servicesOffered: [
      'Multiple event spaces',
      'Waterfront location',
      'Catering options',
      'Bar service',
    ],
    rating: 4.9,
  },
  {
    name: 'Newcastle City Hall',
    email: 'cityhall@ncc.nsw.gov.au',
    phone: '02 4974 2000',
    website: 'https://newcastle.nsw.gov.au/city-hall',
    category: 'VENUE' as VendorCategory,
    location: 'Newcastle',
    region: 'Newcastle',
    address: '290 King St, Newcastle NSW 2300',
    description:
      'Stunning heritage architecture with arched windows, polished floors, and marble staircases. Multiple elegant rooms offering style and sophistication for grand weddings. Perfect for couples wanting a classic, timeless venue.',
    priceMin: 5000,
    priceMax: 12000,
    priceDescription: 'Venue hire from $5k, packages available',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 300,
    styles: ['Historic', 'Classic', 'Elegant', 'Grand'],
    servicesOffered: [
      'Ceremony venue',
      'Reception venue',
      'Heritage architecture',
      'Multiple rooms',
    ],
    rating: 4.5,
  },
  {
    name: 'Stanley Park',
    email: 'hello@stanleypark.com.au',
    phone: '0422 888 777',
    website: 'https://www.stanleypark.com.au',
    category: 'VENUE' as VendorCategory,
    location: 'Newcastle',
    region: 'Fullerton Cove',
    address: 'Fullerton Cove NSW 2318',
    description:
      'All-in-one wedding destination 20 minutes north of Newcastle. Have your preparation, ceremony, location photos and reception all in one beautiful location. Perfect for couples wanting convenience and style.',
    priceMin: 7000,
    priceMax: 16000,
    priceDescription: 'Complete packages from $7k-16k',
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 150,
    styles: ['Rustic', 'Outdoor', 'Garden', 'Romantic'],
    servicesOffered: [
      'Ceremony venue',
      'Reception venue',
      'Bridal suite',
      'Photo locations',
      'All-in-one',
    ],
    rating: 4.7,
  },

  // PHOTOGRAPHERS
  {
    name: 'Cavanagh Photography',
    email: 'info@cavanaghphotography.com.au',
    phone: '0407 101 070',
    website: 'https://cavanaghphotography.com.au',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Newcastle',
    region: 'Hunter Valley',
    description:
      'Award-winning photographer with 800+ weddings photographed in Hunter Valley and Newcastle. Specializing in natural, candid photography that captures genuine moments. Experienced with all Newcastle and Hunter Valley venues.',
    priceMin: 2500,
    priceMax: 4500,
    priceDescription: '$2,500-4,500 for 6-10 hour packages with all high-res images',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Natural', 'Candid', 'Photojournalistic', 'Artistic'],
    servicesOffered: [
      'Full day coverage',
      'Engagement shoots',
      'All images included',
      'Online gallery',
    ],
    rating: 4.9,
  },
  {
    name: 'Thierry Boudan Photography',
    email: 'contact@thierryboudan.com',
    phone: '0411 234 567',
    website: 'https://www.thierryboudan.com',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Newcastle',
    region: 'Newcastle',
    description:
      'Local Newcastle wedding photographer with 1,400+ weddings photographed throughout Newcastle & Hunter Valley. Known for romantic, timeless imagery and professional service. Highly experienced with local venues.',
    priceMin: 3000,
    priceMax: 3500,
    priceDescription: '$3,000-3,500 for 6-8 hours coverage',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Romantic', 'Timeless', 'Classic', 'Editorial'],
    servicesOffered: [
      '6-8 hour coverage',
      'Online gallery',
      'Print options',
      'Second shooter available',
    ],
    rating: 4.8,
  },
  {
    name: 'Rope and Pulley Photography',
    email: 'hello@ropeandpulley.com.au',
    phone: '0421 123 456',
    website: 'https://www.ropeandpulley.com.au',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Newcastle',
    region: 'Hunter Valley',
    description:
      'Creative wedding photographers serving Newcastle and Hunter Valley. Known for unique perspectives, artistic compositions, and capturing the emotion of your day. Fun, relaxed approach to wedding photography.',
    priceMin: 2800,
    priceMax: 4200,
    priceDescription: '$2,800-4,200 depending on package and coverage',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Creative', 'Artistic', 'Modern', 'Fun'],
    servicesOffered: [
      'Full day coverage',
      'Engagement sessions',
      'Digital gallery',
      'Print packages',
    ],
    rating: 4.7,
  },
  {
    name: 'Sera Luna Co.',
    email: 'info@seralunaco.com',
    phone: '0433 789 012',
    website: 'https://www.seralunaco.com',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Newcastle',
    region: 'Newcastle & Sydney',
    description:
      'Wedding photographer and videographer covering Newcastle, Hunter Valley, and Sydney. Specializing in both photo and video packages for comprehensive wedding coverage. Romantic, cinematic style.',
    priceMin: 3200,
    priceMax: 6000,
    priceDescription: 'Photography $3,200-4,500 | Photo+Video combos $5,000-6,000',
    capacity: 'MEDIUM' as VendorCapacity,
    styles: ['Cinematic', 'Romantic', 'Editorial', 'Modern'],
    servicesOffered: [
      'Photography',
      'Videography',
      'Combo packages',
      'Drone footage',
      'Highlight films',
    ],
    rating: 4.9,
  },
  {
    name: 'Wild Wattle Photography',
    email: 'hello@wildwattlephotography.com.au',
    phone: '0445 678 901',
    website: 'https://www.wildwattlephotography.com.au',
    category: 'PHOTOGRAPHER' as VendorCategory,
    location: 'Newcastle',
    region: 'Newcastle',
    description:
      'Candid wedding and engagement photographer based in Newcastle. Specializing in natural, unposed moments that tell your love story authentically. Relaxed, fun approach to capturing your day.',
    priceMin: 2400,
    priceMax: 3800,
    priceDescription: '$2,400-3,800 for various packages',
    capacity: 'SMALL' as VendorCapacity,
    styles: ['Candid', 'Natural', 'Relaxed', 'Authentic'],
    servicesOffered: ['Engagement shoots', 'Full day coverage', 'Online gallery', 'Print rights'],
    rating: 4.8,
  },

  // CATERERS
  {
    name: 'The Wilderness Chef',
    email: 'cooper@thewildernesschef.com.au',
    phone: '0412 345 678',
    website: 'https://www.thewildernesschef.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Newcastle',
    region: 'Newcastle & Hunter',
    description:
      "Newcastle's most popular wedding caterer with 250+ five-star reviews. Traveling chef specializing in intimate elopements through to large weddings. Menu options include canapés, banquet share plates, plated meals, and buffets.",
    priceMin: 65,
    priceMax: 150,
    priceDescription: '$65-150 per person depending on menu style',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 200,
    styles: ['Gourmet', 'Rustic', 'Modern', 'Farm-to-table'],
    servicesOffered: [
      'Canapés',
      'Banquet service',
      'Plated meals',
      'Buffets',
      'Dietary accommodations',
    ],
    rating: 4.9,
  },
  {
    name: 'Flamingo Flare Catering',
    email: 'info@flamingoflare.com.au',
    phone: '0423 456 789',
    website: 'https://www.flamingoflare.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Newcastle',
    region: 'Newcastle, Port Stephens, Hunter Valley',
    description:
      'End-to-end food, beverage and styling service for weddings. Local company specializing in comprehensive wedding catering with full event styling. Known for creative menus and beautiful presentation.',
    priceMin: 70,
    priceMax: 180,
    priceDescription: '$70-180 per person with styling and beverage packages',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 250,
    styles: ['Modern', 'Elegant', 'Creative', 'Styled'],
    servicesOffered: [
      'Full catering',
      'Beverage packages',
      'Event styling',
      'Wait staff',
      'Equipment hire',
    ],
    rating: 4.8,
  },
  {
    name: 'Eden Catering',
    email: 'bookings@edencatering.com.au',
    phone: '0434 567 890',
    website: 'https://www.edencatering.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Newcastle',
    region: 'Newcastle',
    description:
      'Flexible wedding catering with 2-4 course meals, canapés, banquets & buffets. All packages include wait staff. Mobile equipment available for venues without onsite kitchens. Optional additions include plates, cutlery, linen & bar staff.',
    priceMin: 60,
    priceMax: 140,
    priceDescription: '$60-140 per person, packages include wait staff',
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 180,
    styles: ['Traditional', 'Modern', 'Versatile'],
    servicesOffered: [
      'Multi-course meals',
      'Canapés',
      'Banquets',
      'Buffets',
      'Mobile equipment',
      'Wait staff',
    ],
    rating: 4.7,
  },
  {
    name: 'Hot Rock Catering',
    email: 'events@hotrock.com.au',
    phone: '02 4965 5544',
    website: 'https://hotrock.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Newcastle',
    region: 'Newcastle, Hunter Valley, Central Coast',
    description:
      "Newcastle's most enduring and respected caterer since 2005. Extensive experience with weddings across Newcastle, Hunter Valley, and Central Coast. Known for reliability, quality food, and professional service.",
    priceMin: 55,
    priceMax: 130,
    priceDescription: '$55-130 per person depending on menu selection',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 300,
    styles: ['Traditional', 'Reliable', 'Professional'],
    servicesOffered: ['Wedding catering', 'Corporate events', 'Full service', 'Beverage options'],
    rating: 4.6,
  },
  {
    name: 'Sprout Catering & Kitchen',
    email: 'hello@sproutcatering.com.au',
    phone: '02 4037 0909',
    website: 'https://sproutcatering.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Newcastle',
    region: 'Newcastle, Hunter Valley, Central Coast',
    description:
      'Expert wedding catering with custom menus and flexible service styles. Serving Newcastle, Hunter Valley, Central Coast, and MidCoast areas. Known for personalized approach and accommodating dietary requirements.',
    priceMin: 58,
    priceMax: 135,
    priceDescription: '$58-135 per person with custom menu options',
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 250,
    styles: ['Custom', 'Fresh', 'Modern'],
    servicesOffered: [
      'Custom menus',
      'Dietary accommodations',
      'Various service styles',
      'Event coordination',
    ],
    rating: 4.8,
  },
  {
    name: 'Little Castro Catering & Events',
    email: 'info@littlecastrocatering.com.au',
    phone: '0456 789 012',
    website: 'https://littlecastrocatering.com.au',
    category: 'CATERING' as VendorCategory,
    location: 'Newcastle',
    region: 'Newcastle',
    description:
      'Personally crafted wedding catering from intimate gatherings to large events. Menu options include delicious canapés, shared banquets, and full three-course meals. Known for attention to detail and beautiful presentation.',
    priceMin: 62,
    priceMax: 145,
    priceDescription: '$62-145 per person depending on service style',
    capacity: 'MEDIUM' as VendorCapacity,
    maxGuests: 200,
    styles: ['Artisan', 'Contemporary', 'Personal'],
    servicesOffered: [
      'Canapés',
      'Banquets',
      'Three-course meals',
      'Beverage packages',
      'Styled events',
    ],
    rating: 4.7,
  },
]

async function seedNewcastleVendors() {
  console.log('🌱 Seeding Newcastle wedding vendors...\n')

  for (const vendor of newcastleVendors) {
    const created = await prisma.vendor.create({
      data: vendor,
    })
    console.log(`✅ Added ${created.category}: ${created.name}`)
  }

  console.log(`\n✨ Successfully added ${newcastleVendors.length} Newcastle vendors!`)

  // Show summary
  const venueCount = newcastleVendors.filter(v => v.category === 'VENUE').length
  const photographerCount = newcastleVendors.filter(v => v.category === 'PHOTOGRAPHER').length
  const catererCount = newcastleVendors.filter(v => v.category === 'CATERING').length

  console.log(`\n📊 Summary:`)
  console.log(`   • Venues: ${venueCount}`)
  console.log(`   • Photographers: ${photographerCount}`)
  console.log(`   • Caterers: ${catererCount}`)
}

seedNewcastleVendors()
  .catch(e => {
    console.error('Error seeding vendors:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
