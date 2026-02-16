# 📊 Vendor Database Expansion Strategy

**Purpose**: Standardized approach to building a comprehensive, high-quality wedding vendor database for NSW, Australia.

**Last Updated**: February 2026

---

## 🎯 Goals

1. **Comprehensive Coverage**: Cover all major wedding regions in NSW
2. **Category Balance**: Diverse vendor categories for complete wedding planning
3. **Quality Data**: Accurate, verified, and up-to-date information
4. **Standardization**: Consistent data structure and quality across all vendors
5. **Scalability**: Repeatable process for expanding to new regions

---

## 📍 Geographic Coverage Strategy

### Priority Regions (Phase 1: 2026)

| Region | Status | Priority | Target Vendors | Notes |
|--------|--------|----------|----------------|-------|
| **Newcastle** | ✅ Complete | P0 | 17 vendors | Initial launch region |
| **Hunter Valley** | 🚧 Next | P1 | 25-30 vendors | Major wine region, high demand |
| **Blue Mountains** | 📋 Planned | P1 | 20-25 vendors | Mountain/bush weddings |
| **Sydney Metro** | 📋 Planned | P1 | 40-50 vendors | Largest market |
| **Southern Highlands** | 📋 Planned | P2 | 15-20 vendors | Boutique wedding destination |
| **Central Coast** | 📋 Planned | P2 | 15-20 vendors | Beach/coastal weddings |

### Geographic Hierarchy

```
NSW (State)
└── Region (e.g., "Hunter Valley")
    └── Location (e.g., "Pokolbin")
        └── Suburb (e.g., "Rothbury")
```

**Fields:**
- `state`: Always "NSW"
- `region`: Broader tourism/wedding region
- `location`: Main city/town
- `suburb`: Specific suburb (optional)
- `address`: Full street address

---

## 📦 Category Coverage Targets

### Per Region Vendor Mix

**Target Distribution** (adjustable based on region characteristics):

| Category | Min | Target | Max | % of Total |
|----------|-----|--------|-----|------------|
| **VENUE** | 5 | 8-10 | 15 | 35% |
| **PHOTOGRAPHER** | 4 | 6-8 | 12 | 25% |
| **CATERING** | 4 | 6-8 | 10 | 25% |
| **FLORIST** | 2 | 3-5 | 8 | 10% |
| **ENTERTAINMENT** | 1 | 2-3 | 5 | 5% |
| **MARQUEE** | 0 | 1-2 | 3 | 5% (if applicable) |

**Priority Order** (when building new region):
1. VENUE (most critical - 8-10 minimum)
2. PHOTOGRAPHER (essential - 6-8 minimum)
3. CATERING (essential - 6-8 minimum)
4. FLORIST (nice-to-have - 3-5)
5. ENTERTAINMENT (optional - 2-3)
6. MARQUEE (regional - only if common in area)

### Capacity Distribution

**Ensure variety in venue/caterer capacity:**

- SMALL (<50 guests): 20-30%
- MEDIUM (50-150 guests): 40-50%
- LARGE (150+ guests): 30-40%

### Price Range Distribution

**Target balance across budgets:**

- BUDGET ($): 15-20%
- MODERATE ($$): 40-50%
- PREMIUM ($$$): 25-30%
- LUXURY ($$$$): 10-15%

---

## ✅ Data Quality Standards

### Required Fields (MUST HAVE)

**All Vendors:**
- ✅ `name` - Display name
- ✅ `email` - Valid email address
- ✅ `category` - Must be valid enum
- ✅ `location` - Primary city/area
- ✅ `description` - Minimum 50 characters, maximum 500 characters
- ✅ `styles` - At least 2 style tags

**Venues/Caterers:**
- ✅ `capacity` - SMALL/MEDIUM/LARGE
- ✅ `maxGuests` - Specific number
- ✅ `priceMin` and `priceMax`

**All with Pricing:**
- ✅ `priceDescription` - Clear pricing explanation

### Recommended Fields (SHOULD HAVE)

- 📋 `phone` - Contact number
- 📋 `website` - Official website URL
- 📋 `region` - Broader area (e.g., "Hunter Valley")
- 📋 `address` - Full street address
- 📋 `servicesOffered` - At least 3 services
- 📋 `rating` - If available from reviews (4.0-5.0 scale)
- 📋 `priceRange` - BUDGET/MODERATE/PREMIUM/LUXURY enum

### Optional Fields (NICE TO HAVE)

- ⭐ `businessName` - Legal business name
- ⭐ `suburb` - Specific suburb
- ⭐ `latitude`/`longitude` - GPS coordinates
- ⭐ `verified` - Set to true if directly verified
- ⭐ `responseRate` - Will be calculated over time

---

## 🔍 Data Collection Process

### Step 1: Research Sources

**Primary Sources** (in order of preference):
1. **Official Vendor Websites** - Most accurate
2. **Easy Weddings** (easyweddings.com.au) - Verified listings
3. **Wedding Directories** (bridestory.com, abia.com.au)
4. **Google My Business** - Reviews and contact info
5. **Instagram/Facebook** - Style examples and recent work

**Validation Sources:**
- Google Maps (address verification)
- ABN Lookup (business verification)
- Review sites (rating validation)

### Step 2: Data Template

For each vendor, collect:

```typescript
{
  // REQUIRED
  name: string          // Display name from website
  email: string         // Contact email (test if possible)
  category: VendorCategory  // VENUE, PHOTOGRAPHER, etc.
  location: string      // Main city
  description: string   // 50-500 chars, accurate summary
  styles: string[]      // Min 2, max 6 style tags

  // PRICING (required for venues/caterers)
  priceMin: number      // In dollars (not cents)
  priceMax: number      // In dollars
  priceDescription: string  // Clear pricing explanation

  // RECOMMENDED
  phone: string         // Format: "02 XXXX XXXX" or "04XX XXX XXX"
  website: string       // Full URL with https://
  region: string        // Broader area
  address: string       // Full street address
  servicesOffered: string[]  // 3-8 services
  rating: number        // 4.0-5.0 if available

  // CAPACITY (for venues/caterers)
  capacity: VendorCapacity  // SMALL/MEDIUM/LARGE
  maxGuests: number     // Specific max capacity

  // OPTIONAL
  suburb: string        // Specific suburb
  businessName: string  // Legal name if different
  priceRange: PriceRange  // BUDGET/MODERATE/PREMIUM/LUXURY
}
```

### Step 3: Validation Checklist

Before adding vendor to database:

- [ ] Email address is valid format
- [ ] Phone number is Australian format (if provided)
- [ ] Website URL is accessible (if provided)
- [ ] Description is 50-500 characters
- [ ] Styles array has 2-6 items
- [ ] Category is valid enum value
- [ ] Pricing makes sense (min < max)
- [ ] Capacity matches maxGuests (SMALL <50, MEDIUM 50-150, LARGE 150+)
- [ ] No duplicate vendors in database
- [ ] Address exists (Google Maps check)

### Step 4: Quality Review

**Before seeding script:**
1. Spell check all text fields
2. Verify all URLs are https:// (not http://)
3. Confirm price ranges are realistic for region
4. Check style tags are consistent across similar vendors
5. Ensure description is professional and objective

---

## 🔧 Technical Implementation

### Seeding Script Template

```typescript
import { PrismaClient, VendorCategory, VendorCapacity, PriceRange } from '@prisma/client'
import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(__dirname, '../.env.local') })

const prisma = new PrismaClient()

const REGION_NAME_vendors = [
  // VENUES
  {
    name: 'Vendor Name',
    email: 'contact@vendor.com',
    phone: '02 XXXX XXXX',
    website: 'https://vendor.com',
    category: 'VENUE' as VendorCategory,
    location: 'Main City',
    region: 'Broader Region',
    address: 'Street Address',
    description: 'Detailed description 50-500 chars...',
    priceMin: 8000,
    priceMax: 20000,
    priceDescription: 'Packages from $8k-20k',
    priceRange: 'MODERATE' as PriceRange,
    capacity: 'LARGE' as VendorCapacity,
    maxGuests: 200,
    styles: ['Style1', 'Style2', 'Style3'],
    servicesOffered: [
      'Service 1',
      'Service 2',
      'Service 3',
    ],
    rating: 4.8,
  },
  // Add more vendors...
]

async function seedREGIONNAMEVendors() {
  console.log('🌱 Seeding REGION_NAME wedding vendors...\n')

  // Check for duplicates before seeding
  const existingVendors = await prisma.vendor.findMany({
    where: {
      location: 'Main City'
    },
    select: { name: true, email: true }
  })

  const newVendors = REGION_NAME_vendors.filter(v =>
    !existingVendors.some(ev =>
      ev.email === v.email || ev.name === v.name
    )
  )

  console.log(`📊 Found ${newVendors.length} new vendors to add (${REGION_NAME_vendors.length - newVendors.length} already exist)\n`)

  for (const vendor of newVendors) {
    const created = await prisma.vendor.create({
      data: vendor,
    })
    console.log(`✅ Added ${created.category}: ${created.name}`)
  }

  console.log(`\n✨ Successfully added ${newVendors.length} vendors!`)

  // Show summary
  const summary = await prisma.vendor.groupBy({
    by: ['category'],
    where: { location: 'Main City' },
    _count: true
  })

  console.log(`\n📊 Total vendors in REGION_NAME:`)
  summary.forEach(s => {
    console.log(`   • ${s.category}: ${s._count}`)
  })
}

seedREGIONNAMEVendors()
  .catch(e => {
    console.error('Error seeding vendors:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### Validation Utilities

Create `scripts/validate-vendor-data.ts`:

```typescript
import { VendorCategory, VendorCapacity } from '@prisma/client'

interface VendorData {
  name: string
  email: string
  category: VendorCategory
  location: string
  description: string
  styles: string[]
  priceMin?: number
  priceMax?: number
  capacity?: VendorCapacity
  maxGuests?: number
  phone?: string
  website?: string
}

export function validateVendor(vendor: VendorData): string[] {
  const errors: string[] = []

  // Required fields
  if (!vendor.name) errors.push('Missing name')
  if (!vendor.email) errors.push('Missing email')
  if (!vendor.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push(`Invalid email format: ${vendor.email}`)
  }
  if (!vendor.category) errors.push('Missing category')
  if (!vendor.location) errors.push('Missing location')
  if (!vendor.description) errors.push('Missing description')

  // Description length
  if (vendor.description && vendor.description.length < 50) {
    errors.push(`Description too short (${vendor.description.length} chars, need 50+)`)
  }
  if (vendor.description && vendor.description.length > 500) {
    errors.push(`Description too long (${vendor.description.length} chars, max 500)`)
  }

  // Styles
  if (!vendor.styles || vendor.styles.length < 2) {
    errors.push('Need at least 2 style tags')
  }
  if (vendor.styles && vendor.styles.length > 6) {
    errors.push('Too many style tags (max 6)')
  }

  // Pricing validation
  if (vendor.priceMin && vendor.priceMax) {
    if (vendor.priceMin >= vendor.priceMax) {
      errors.push(`priceMin (${vendor.priceMin}) must be less than priceMax (${vendor.priceMax})`)
    }
  }

  // Capacity validation
  if (vendor.capacity && vendor.maxGuests) {
    if (vendor.capacity === 'SMALL' && vendor.maxGuests >= 50) {
      errors.push('SMALL capacity should be < 50 guests')
    }
    if (vendor.capacity === 'MEDIUM' && (vendor.maxGuests < 50 || vendor.maxGuests >= 150)) {
      errors.push('MEDIUM capacity should be 50-150 guests')
    }
    if (vendor.capacity === 'LARGE' && vendor.maxGuests < 150) {
      errors.push('LARGE capacity should be 150+ guests')
    }
  }

  // Phone format (Australian)
  if (vendor.phone && !vendor.phone.match(/^(0[2-8]\s?\d{4}\s?\d{4}|04\d{2}\s?\d{3}\s?\d{3})$/)) {
    errors.push(`Phone format should be "02 XXXX XXXX" or "04XX XXX XXX": ${vendor.phone}`)
  }

  // Website URL
  if (vendor.website && !vendor.website.startsWith('https://')) {
    errors.push(`Website should start with https://: ${vendor.website}`)
  }

  return errors
}

export function validateVendorList(vendors: VendorData[]): void {
  console.log('🔍 Validating vendor data...\n')

  let hasErrors = false

  vendors.forEach((vendor, index) => {
    const errors = validateVendor(vendor)
    if (errors.length > 0) {
      hasErrors = true
      console.error(`❌ Vendor ${index + 1}: ${vendor.name}`)
      errors.forEach(err => console.error(`   - ${err}`))
      console.error('')
    }
  })

  if (!hasErrors) {
    console.log('✅ All vendors validated successfully!')
  } else {
    throw new Error('Validation failed')
  }
}
```

---

## 📝 Style Tags Library

### Standardized Style Tags

**Use these consistent tags across all vendors:**

**Venue/Event Styles:**
- Rustic, Modern, Classic, Elegant, Luxury, Bohemian
- Coastal, Beachside, Waterfront, Garden, Outdoor, Indoor
- Historic, Heritage, Contemporary, Industrial, Barn
- Romantic, Intimate, Grand, Formal, Casual

**Photography Styles:**
- Natural, Candid, Photojournalistic, Artistic, Creative
- Romantic, Timeless, Classic, Editorial, Cinematic
- Fun, Relaxed, Authentic, Modern, Traditional

**Catering Styles:**
- Gourmet, Rustic, Modern, Traditional, Contemporary
- Farm-to-table, Artisan, Creative, Elegant, Casual
- Custom, Versatile, Professional, Fresh

**Florist Styles:**
- Romantic, Wildflower, Garden, Modern, Minimalist
- Bohemian, Elegant, Lush, Seasonal, Native

---

## 📊 Progress Tracking

### Vendor Database Dashboard

Track progress with:

```sql
-- Total vendors by region
SELECT location, COUNT(*) as total
FROM "Vendor"
GROUP BY location
ORDER BY total DESC;

-- Vendors by category
SELECT category, COUNT(*) as total
FROM "Vendor"
GROUP BY category
ORDER BY total DESC;

-- Capacity distribution
SELECT capacity, COUNT(*) as total
FROM "Vendor"
WHERE capacity IS NOT NULL
GROUP BY capacity;

-- Average rating by category
SELECT category, ROUND(AVG(rating)::numeric, 2) as avg_rating
FROM "Vendor"
WHERE rating IS NOT NULL
GROUP BY category;
```

### Quality Metrics

**Target Metrics:**
- ✅ 100% of vendors have required fields
- ✅ 90%+ have phone numbers
- ✅ 90%+ have websites
- ✅ 80%+ have addresses
- ✅ Average rating ≥ 4.5/5.0
- ✅ Email bounce rate < 10%

---

## 🚀 Expansion Roadmap

### Q1 2026 (Current)
- [x] Newcastle - 17 vendors ✅
- [ ] Hunter Valley - 25-30 vendors 🚧
- [ ] Blue Mountains - 20-25 vendors 📋

### Q2 2026
- [ ] Sydney Metro - 40-50 vendors
- [ ] Southern Highlands - 15-20 vendors

### Q3 2026
- [ ] Central Coast - 15-20 vendors
- [ ] South Coast - 10-15 vendors

### Q4 2026
- [ ] Byron Bay/Northern Rivers - 15-20 vendors
- [ ] Canberra/ACT - 10-15 vendors

**Target by end of 2026**: 200+ vendors across 9 regions

---

## 🔄 Maintenance Strategy

### Monthly Tasks
- [ ] Verify email addresses (check bounces)
- [ ] Update pricing information
- [ ] Add new vendors (2-5 per region)
- [ ] Remove closed businesses

### Quarterly Tasks
- [ ] Audit all vendor data for accuracy
- [ ] Update ratings from recent reviews
- [ ] Refresh descriptions and styles
- [ ] Check website URLs (dead links)

### Annual Tasks
- [ ] Full vendor re-verification
- [ ] Pricing review across all vendors
- [ ] Geographic expansion planning
- [ ] Category expansion (add FLORIST, ENTERTAINMENT, etc.)

---

## 📞 Vendor Verification Process

### Initial Contact (Optional but Recommended)

When adding vendors, consider:

1. **Email Verification**: Send test email to confirm address works
2. **Phone Verification**: Call to confirm business is active
3. **Website Check**: Verify URL is accessible and current
4. **Social Media**: Check Instagram/Facebook for recent activity

### Verification Flags

```typescript
{
  verified: true,  // Set to true if directly contacted
  responseRate: null,  // Will be calculated from outreach history
  lastContacted: null,  // Will be updated when first email sent
}
```

---

## 📚 Resources

### External Data Sources

- **Easy Weddings**: https://www.easyweddings.com.au
- **ABIA** (Australian Bridal Industry Academy): https://abia.com.au
- **Bridestory**: https://www.bridestory.com/au
- **The Knot Australia**: https://www.theknot.com.au
- **Google My Business**: https://business.google.com

### NSW Wedding Regions

- Tourism NSW: https://www.visitnsw.com/things-to-do/events-and-festivals/weddings
- Regional wedding guides
- Local tourism boards

---

## ✅ Quick Reference Checklist

Before seeding new region:

- [ ] Research 25-30 vendors minimum
- [ ] Target distribution: 35% venues, 25% photographers, 25% caterers
- [ ] All vendors have required fields
- [ ] Validate with `validateVendorList()` function
- [ ] Check for duplicates
- [ ] Test seeding script on local database
- [ ] Review data quality (spelling, formatting)
- [ ] Run script on production
- [ ] Verify vendors appear in app
- [ ] Test vendor matching algorithm
- [ ] Update region coverage documentation

---

**Next Action**: Create Hunter Valley and Blue Mountains seeding scripts using this strategy.

**Maintained By**: Development Team
**Review Frequency**: Quarterly
