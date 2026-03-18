import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prisma = new PrismaClient()

async function main() {
  console.log('🎭 Seeding demo data for dashboard...\n')

  // Find the test user
  const testUser = await prisma.user.findUnique({
    where: { email: 'test@wedding.com' },
    include: { weddings: true },
  })

  if (!testUser) {
    console.error('❌ Test user not found. Run first: npm run db:create-test-user')
    process.exit(1)
  }

  let wedding = testUser.weddings[0]

  if (!wedding) {
    console.error('❌ No wedding found for test user. Run first: npm run db:create-test-user')
    process.exit(1)
  }

  // Update wedding to REVIEWING status with richer details
  wedding = await prisma.wedding.update({
    where: { id: wedding.id },
    data: {
      status: 'REVIEWING',
      chatCompleted: true,
      weddingDate: new Date('2027-06-14'),
      dateFlexible: false,
      location: 'Hunter Valley',
      guestCount: 100,
      budgetTotal: 6000000, // $60,000
      budgetVenue: 2000000, // $20,000
      budgetCatering: 1500000, // $15,000
      budgetPhotography: 500000, // $5,000
      style: 'Rustic',
      mustHaves: ['Outdoor ceremony', 'Vineyard views', 'Indoor backup option'],
      dealBreakers: ['No highway noise', 'No artificial lighting only'],
      dietaryNeeds: ['Vegetarian options', 'Gluten-free available', '2 vegan guests'],
    },
  })

  console.log(`✅ Updated wedding: ${wedding.location} | ${wedding.status}`)

  // Clean up existing demo data for this wedding
  await prisma.vendorOutreach.deleteMany({ where: { weddingId: wedding.id } })
  await prisma.savedVendor.deleteMany({ where: { weddingId: wedding.id } })
  await prisma.conversation.deleteMany({ where: { weddingId: wedding.id } })
  console.log('🧹 Cleaned up existing demo data')

  // Get vendors from database to link outreach to real vendors
  const vendors = await prisma.vendor.findMany({
    where: {
      OR: [
        { region: { contains: 'Hunter' } },
        { location: 'Newcastle' },
      ],
    },
    orderBy: { rating: 'desc' },
  })

  if (vendors.length === 0) {
    console.error('❌ No vendors found. Run first: npm run db:seed:newcastle')
    process.exit(1)
  }

  console.log(`📋 Found ${vendors.length} vendors to use\n`)

  // Categorise vendors
  const venues = vendors.filter(v => v.category === 'VENUE')
  const photographers = vendors.filter(v => v.category === 'PHOTOGRAPHER')
  const caterers = vendors.filter(v => v.category === 'CATERING')

  const now = new Date()
  const daysAgo = (days: number) => new Date(now.getTime() - days * 24 * 60 * 60 * 1000)
  const hoursAgo = (hours: number) => new Date(now.getTime() - hours * 60 * 60 * 1000)

  // --- VENDOR OUTREACH RECORDS ---
  // Mix of statuses: replied, opened, delivered, sent, bounced

  const outreachData = [
    // === VENUES ===
    // 1. Replied with quote - AVAILABLE
    venues[0] && {
      weddingId: wedding.id,
      vendorId: venues[0].id,
      emailSubject: `Wedding Inquiry - June 14, 2027 | ${venues[0].name}`,
      emailBody: `Dear ${venues[0].name} Team,\n\nMy partner and I are planning our wedding for June 14, 2027 and we absolutely love the look of your venue.\n\nWe're expecting approximately 100 guests and are looking for a venue that offers both an outdoor ceremony space and indoor reception. Our style is rustic with vineyard views, and we have a venue budget of around $20,000.\n\nCould you let us know about availability, packages, and pricing for our date?\n\nWe'd also love to arrange a site visit if possible.\n\nThank you so much!\nTest User`,
      emailId: 'demo_email_001',
      sentAt: daysAgo(12),
      delivered: true,
      deliveredAt: daysAgo(12),
      opened: true,
      openedAt: daysAgo(11),
      replied: true,
      repliedAt: daysAgo(9),
      responseEmail: `Hi Test,\n\nThank you so much for your inquiry! We'd be thrilled to host your wedding here at ${venues[0].name}.\n\nGreat news - June 14, 2027 is currently available! For 100 guests, we'd recommend our Vineyard Terrace package which includes:\n\n- Outdoor ceremony on the coastal deck\n- 5-hour reception in the main hall\n- Bridal suite access from 10am\n- Tables, chairs, and white linen\n- Dedicated wedding coordinator\n- Complimentary accommodation for the couple\n\nThe package price is $14,500 + catering (from $120pp).\n\nWe'd love to have you visit for a tour! We have availability this Saturday at 11am or next Wednesday at 2pm.\n\nLooking forward to hearing from you.\n\nWarm regards,\nSarah\nWedding Coordinator`,
      availability: 'AVAILABLE' as const,
      quote: 1450000, // $14,500
      notes: 'Great response! Includes coordinator. Need to schedule tour.',
    },

    // 2. Replied - TENTATIVE
    venues[1] && {
      weddingId: wedding.id,
      vendorId: venues[1].id,
      emailSubject: `Wedding Venue Inquiry - June 2027 | ${venues[1].name}`,
      emailBody: `Dear ${venues[1].name} Team,\n\nWe're getting married in June 2027 and are looking for a beautiful venue for approximately 100 guests. We love the ocean views at your venue and would like to learn more about your wedding packages.\n\nOur budget for the venue is around $20,000 and we're looking for a rustic/natural style.\n\nCould you please send through your availability and pricing?\n\nThank you,\nTest User`,
      emailId: 'demo_email_002',
      sentAt: daysAgo(12),
      delivered: true,
      deliveredAt: daysAgo(12),
      opened: true,
      openedAt: daysAgo(10),
      replied: true,
      repliedAt: daysAgo(7),
      responseEmail: `Hi there,\n\nThanks for reaching out! ${venues[1].name} would be a stunning backdrop for your wedding.\n\nJune 14 is tentatively held for another couple who haven't confirmed yet. We should know within the next 2 weeks whether it will free up. I'd suggest June 21 as a backup date if you're flexible.\n\nOur all-inclusive packages for 100 guests start at $12,000 and go up to $18,000 depending on menu selections and bar package.\n\nI'll be in touch as soon as we hear back about the June 14 booking.\n\nCheers,\nMark\nEvents Manager`,
      availability: 'TENTATIVE' as const,
      quote: 1200000, // $12,000
      notes: 'Date tentative - waiting on another couple. Backup: June 21.',
    },

    // 3. Opened but no reply yet
    venues[2] && {
      weddingId: wedding.id,
      vendorId: venues[2].id,
      emailSubject: `Wedding Inquiry - Heritage Venue | ${venues[2].name}`,
      emailBody: `Dear ${venues[2].name} Team,\n\nWe're planning a June 2027 wedding for 100 guests and are drawn to the heritage charm of your venue. Could you please share your availability, packages, and pricing?\n\nWe're looking for a venue with character and elegance in the $15-20k range.\n\nThank you!\nTest User`,
      emailId: 'demo_email_003',
      sentAt: daysAgo(10),
      delivered: true,
      deliveredAt: daysAgo(10),
      opened: true,
      openedAt: daysAgo(8),
      replied: false,
    },

    // === PHOTOGRAPHERS ===
    // 4. Replied with quote - AVAILABLE
    photographers[0] && {
      weddingId: wedding.id,
      vendorId: photographers[0].id,
      emailSubject: `Wedding Photography Inquiry - June 2027`,
      emailBody: `Hi ${photographers[0].name},\n\nWe're getting married on June 14, 2027 in the Hunter Valley area and are looking for a wedding photographer. We love your natural, candid style!\n\nWe're looking for full-day coverage including getting ready shots through to reception. Our photography budget is around $5,000.\n\nAre you available for our date? We'd love to see a full gallery from a recent wedding if possible.\n\nThanks,\nTest User`,
      emailId: 'demo_email_004',
      sentAt: daysAgo(11),
      delivered: true,
      deliveredAt: daysAgo(11),
      opened: true,
      openedAt: daysAgo(10),
      replied: true,
      repliedAt: daysAgo(6),
      responseEmail: `Hey Test!\n\nSo excited to hear about your wedding - the Hunter Valley in June is absolutely gorgeous for photos.\n\nYes, I'm available on June 14! Here are my packages:\n\n• Essential (6hrs): $2,800 - Getting ready through to first dance\n• Classic (8hrs): $3,500 - Full day coverage with engagement shoot\n• Premium (10hrs): $4,500 - Everything above + second shooter + album\n\nAll packages include:\n- High-resolution edited images (400-600 photos)\n- Private online gallery\n- Print rights\n\nI've attached a link to a recent Hunter Valley wedding: [gallery link]\n\nWould love to chat over coffee sometime! I'm based in Newcastle so very local.\n\nCheers,\nMatt`,
      availability: 'AVAILABLE' as const,
      quote: 350000, // $3,500
      notes: 'Recommended Classic package. Very experienced locally. Let\'s book a coffee chat.',
    },

    // 5. Delivered but not opened
    photographers[1] && {
      weddingId: wedding.id,
      vendorId: photographers[1].id,
      emailSubject: `Wedding Photography - June 14, 2027`,
      emailBody: `Hello,\n\nWe're looking for a photographer for our Hunter Valley wedding on June 14, 2027 (100 guests). We're drawn to romantic, timeless photography and have a budget of $3,000-5,000.\n\nPlease let us know about your availability and packages.\n\nBest,\nTest User`,
      emailId: 'demo_email_005',
      sentAt: daysAgo(8),
      delivered: true,
      deliveredAt: daysAgo(8),
      opened: false,
      replied: false,
    },

    // 6. Replied - UNAVAILABLE
    photographers[2] && {
      weddingId: wedding.id,
      vendorId: photographers[2].id,
      emailSubject: `Wedding Photography Inquiry | ${photographers[2].name}`,
      emailBody: `Hi there,\n\nWe love your creative style and would like to inquire about availability for our wedding on June 14, 2027 in the Hunter Valley.\n\nOur budget is around $3,000-4,000 for photography.\n\nAre you available?\n\nThanks,\nTest User`,
      emailId: 'demo_email_006',
      sentAt: daysAgo(11),
      delivered: true,
      deliveredAt: daysAgo(11),
      opened: true,
      openedAt: daysAgo(9),
      replied: true,
      repliedAt: daysAgo(5),
      responseEmail: `Hi Test,\n\nThanks so much for thinking of us! Unfortunately we're already booked for June 14, 2027 - it's a really popular date.\n\nIf your date is flexible at all, we have availability on June 7 and June 28. Otherwise, I'd highly recommend checking out Cavanagh Photography or Wild Wattle - they're both fantastic and do beautiful work in the Hunter Valley.\n\nBest of luck with the planning!\n\nRope & Pulley team`,
      availability: 'UNAVAILABLE' as const,
      notes: 'Unavailable for our date. Recommended Cavanagh and Wild Wattle.',
    },

    // === CATERERS ===
    // 7. Replied with detailed quote - AVAILABLE
    caterers[0] && {
      weddingId: wedding.id,
      vendorId: caterers[0].id,
      emailSubject: `Wedding Catering Inquiry - 100 Guests | ${caterers[0].name}`,
      emailBody: `Hi ${caterers[0].name} team,\n\nWe're planning a rustic Hunter Valley wedding for June 14, 2027 with approximately 100 guests.\n\nWe're looking for share-style banquet catering that feels relaxed but elevated. We'll need vegetarian options, gluten-free available, and have 2 vegan guests.\n\nOur catering budget is around $15,000 ($150pp).\n\nCould you share your wedding menu options and pricing?\n\nThank you,\nTest User`,
      emailId: 'demo_email_007',
      sentAt: daysAgo(10),
      delivered: true,
      deliveredAt: daysAgo(10),
      opened: true,
      openedAt: daysAgo(9),
      replied: true,
      repliedAt: daysAgo(4),
      responseEmail: `Hey Test!\n\nLove a Hunter Valley rustic wedding - that's our bread and butter (pun intended!).\n\nFor 100 guests with share-style banquet, here's what I'd recommend:\n\n🍽️ The Harvest Table Package - $125pp\n- Pre-dinner canapés (4 varieties, passed around)\n- 3-course shared banquet\n- Seasonal menu using local Hunter Valley produce\n- All dietary requirements handled (vegetarian, GF, vegan - no worries)\n- Wait staff and all equipment included\n\n🥂 Add-ons:\n- Beverage package: from $55pp (4hr)\n- Grazing table: $15pp\n- Late-night snacks: $12pp\n\nTotal estimate for 100 guests: $12,500 + beverage package\n\nI'd love to do a tasting for you both! We do complimentary tastings once you've confirmed a booking.\n\nCooper\nThe Wilderness Chef`,
      availability: 'AVAILABLE' as const,
      quote: 1250000, // $12,500
      notes: 'Amazing response. $125pp banquet + $55pp beverages = ~$18k total. Tasting offered!',
    },

    // 8. Just sent, not delivered yet
    caterers[1] && {
      weddingId: wedding.id,
      vendorId: caterers[1].id,
      emailSubject: `Wedding Catering - June 2027 | ${caterers[1].name}`,
      emailBody: `Dear ${caterers[1].name} team,\n\nWe're inquiring about wedding catering for June 14, 2027 in the Hunter Valley. Approximately 100 guests with a focus on beautiful presentation and locally sourced food.\n\nWe have dietary requirements including vegetarian, gluten-free, and vegan options needed.\n\nBudget is around $12,000-15,000 for food and beverage.\n\nLook forward to hearing from you.\n\nTest User`,
      emailId: 'demo_email_008',
      sentAt: hoursAgo(6),
      delivered: false,
      opened: false,
      replied: false,
    },

    // 9. Bounced email
    caterers[2] && {
      weddingId: wedding.id,
      vendorId: caterers[2].id,
      emailSubject: `Wedding Catering Inquiry - Hunter Valley`,
      emailBody: `Hello,\n\nWe're looking for wedding catering for ~100 guests in the Hunter Valley, June 2027. Please share your availability and pricing.\n\nThank you,\nTest User`,
      emailId: 'demo_email_009',
      sentAt: daysAgo(10),
      delivered: false,
      bounced: true,
    },

    // 10. Opened, no reply (photographer)
    photographers[3] && {
      weddingId: wedding.id,
      vendorId: photographers[3].id,
      emailSubject: `Photo + Video Package Inquiry | ${photographers[3].name}`,
      emailBody: `Hi ${photographers[3].name},\n\nWe're interested in a combined photography and videography package for our June 2027 wedding in the Hunter Valley (100 guests).\n\nWe'd love cinematic coverage that tells the story of our day. Budget is flexible for the right package.\n\nCould you share your combo packages?\n\nThanks,\nTest User`,
      emailId: 'demo_email_010',
      sentAt: daysAgo(7),
      delivered: true,
      deliveredAt: daysAgo(7),
      opened: true,
      openedAt: daysAgo(3),
      replied: false,
    },
  ].filter(Boolean)

  // Create outreach records
  for (const data of outreachData) {
    if (!data) continue
    const created = await prisma.vendorOutreach.create({ data })
    const vendor = vendors.find(v => v.id === data.vendorId)
    const status = data.replied
      ? '✉️ Replied'
      : data.bounced
        ? '❌ Bounced'
        : data.opened
          ? '👁️ Opened'
          : data.delivered
            ? '📬 Delivered'
            : '📤 Sent'
    console.log(`  ${status} → ${vendor?.name} (${vendor?.category})`)
  }

  console.log(`\n✅ Created ${outreachData.length} outreach records`)

  // --- SAVED VENDORS ---
  const savedVendorData = [
    venues[0] && {
      weddingId: wedding.id,
      vendorId: venues[0].id,
      isFavorite: true,
      notes: 'Top pick! Available and within budget. Need to book tour.',
    },
    photographers[0] && {
      weddingId: wedding.id,
      vendorId: photographers[0].id,
      isFavorite: true,
      notes: 'Love the natural style. Classic package fits budget perfectly.',
    },
    caterers[0] && {
      weddingId: wedding.id,
      vendorId: caterers[0].id,
      isFavorite: true,
      notes: 'Best response so far. Tasting offered. Local Hunter Valley produce.',
    },
    venues[1] && {
      weddingId: wedding.id,
      vendorId: venues[1].id,
      isFavorite: false,
      notes: 'Backup venue option - date tentative.',
    },
  ].filter(Boolean)

  for (const data of savedVendorData) {
    if (!data) continue
    await prisma.savedVendor.create({ data })
  }
  console.log(`✅ Created ${savedVendorData.length} saved vendors (${savedVendorData.filter(d => d?.isFavorite).length} favorites)`)

  // --- CONVERSATION HISTORY ---
  const conversation = await prisma.conversation.create({
    data: {
      weddingId: wedding.id,
      messages: [
        {
          role: 'assistant',
          content: "Welcome! I'm here to help you plan your wedding. Let's start with the basics - when are you thinking of having your wedding?",
          timestamp: daysAgo(30).toISOString(),
        },
        {
          role: 'user',
          content: "We're looking at June 14, 2027. It's a Saturday and it has sentimental meaning for us.",
          timestamp: daysAgo(30).toISOString(),
        },
        {
          role: 'assistant',
          content: "That's a lovely date! June in the Hunter Valley has beautiful autumn colours. Where are you thinking of having the wedding?",
          timestamp: daysAgo(30).toISOString(),
        },
        {
          role: 'user',
          content: 'Hunter Valley! We love the vineyards and the rustic feel of the area.',
          timestamp: daysAgo(30).toISOString(),
        },
        {
          role: 'assistant',
          content: "The Hunter Valley is gorgeous for weddings - great choice! How many guests are you expecting?",
          timestamp: daysAgo(30).toISOString(),
        },
        {
          role: 'user',
          content: "Around 100. It's mostly family and close friends.",
          timestamp: daysAgo(30).toISOString(),
        },
        {
          role: 'assistant',
          content: "100 guests is a great size - big enough to celebrate but intimate enough to enjoy. What's your overall budget looking like?",
          timestamp: daysAgo(30).toISOString(),
        },
        {
          role: 'user',
          content: "We've saved about $60,000 all up. We want to spend the most on the venue and food - those are the most important to us.",
          timestamp: daysAgo(30).toISOString(),
        },
        {
          role: 'assistant',
          content: "$60,000 gives you a lot of great options in the Hunter Valley. With 100 guests, that works out to about $600 per person which is comfortable. I'd suggest allocating roughly:\n\n- Venue: $15-20k\n- Catering & drinks: $12-18k\n- Photography: $3-5k\n- Flowers & styling: $3-5k\n- Everything else: $12-17k\n\nWhat style are you going for?",
          timestamp: daysAgo(30).toISOString(),
        },
        {
          role: 'user',
          content: "Definitely rustic! We want it to feel relaxed and natural. Outdoor ceremony with vineyard views, but an indoor backup in case of rain. Share-style banquet food. Nothing too formal.",
          timestamp: daysAgo(30).toISOString(),
        },
        {
          role: 'assistant',
          content: "Love it! A rustic Hunter Valley wedding with vineyard views, outdoor ceremony, and share-style dining sounds absolutely beautiful. I've got all the details I need to find you some great vendor matches. Let me search for venues, photographers, and caterers that fit your style and budget. I'll have some recommendations for you shortly!",
          timestamp: daysAgo(30).toISOString(),
        },
      ],
    },
  })
  console.log(`✅ Created conversation with ${(conversation.messages as unknown[]).length} messages`)

  // --- SUMMARY ---
  console.log('\n' + '='.repeat(50))
  console.log('🎉 Demo data seeding complete!\n')

  const outreachStats = {
    total: outreachData.length,
    replied: outreachData.filter(d => d?.replied).length,
    opened: outreachData.filter(d => d?.opened && !d?.replied).length,
    delivered: outreachData.filter(d => d?.delivered && !d?.opened).length,
    sent: outreachData.filter(d => !d?.delivered && !d?.bounced).length,
    bounced: outreachData.filter(d => d?.bounced).length,
  }

  console.log('📊 Dashboard will now show:')
  console.log(`   • Vendors Contacted: ${outreachStats.total}`)
  console.log(`   • Responses Received: ${outreachStats.replied}`)
  console.log(`   • Emails Opened: ${outreachStats.replied + outreachStats.opened}`)
  console.log(`   • Pending Responses: ${outreachStats.total - outreachStats.replied - outreachStats.bounced}`)
  console.log(`   • Bounced: ${outreachStats.bounced}`)
  console.log(`   • Saved Vendors: ${savedVendorData.length}`)
  console.log(`   • Chat Messages: ${(conversation.messages as unknown[]).length}`)
  console.log('')
  console.log('🔗 View at: http://localhost:3000/dashboard')
  console.log('   (requires login as test@wedding.com user)\n')
}

main()
  .catch(e => {
    console.error('Error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
