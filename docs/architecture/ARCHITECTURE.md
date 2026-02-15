# WeddingPlan AI - Technical Architecture

**Version:** 0.1
**Last Updated:** 2026-02-14

---

## System Overview

```
┌──────────────────────────────────────────────────────────────┐
│                     USER (Couple Planning Wedding)           │
└────────────────────────────┬─────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   Next.js App   │
                    │    (Vercel)     │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
   ┌────▼─────┐      ┌──────▼──────┐      ┌─────▼──────┐
   │  Claude  │      │  PostgreSQL │      │   Resend   │
   │   API    │      │  (Database) │      │  (Email)   │
   └──────────┘      └─────────────┘      └────────────┘
   (AI Chat)         (User/Vendor Data)   (Outreach)
```

---

## Tech Stack

### Frontend

- **Framework:** Next.js 14 (App Router with React Server Components)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Forms:** React Hook Form + Zod validation
- **State Management:** Zustand (global) + React hooks (local)

### Backend

- **Runtime:** Node.js (via Next.js API routes)
- **API:** REST (Next.js API routes)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js (email/password + magic links)
- **Email Service:** Resend (primary) or SendGrid (fallback)

### AI & ML

- **Primary:** Claude 3.5 Sonnet API (Anthropic)
- **Fallback:** Local LLM (Llama 3.1 via Ollama on RTX 4080)
- **Prompt Management:** Custom prompt templates with variable injection

### Hosting & Infrastructure

- **App Hosting:** Vercel (Next.js native, edge functions)
- **Database:** Vercel Postgres (or Supabase if more storage needed)
- **CDN:** Vercel Edge Network (automatic)
- **Domain:** TBD (.com.au for Australian market)

### Development Tools

- **Version Control:** Git + GitHub
- **Package Manager:** pnpm or bun (faster than npm)
- **Code Quality:** ESLint + Prettier
- **Testing:** Vitest (unit) + Playwright (e2e)
- **CI/CD:** GitHub Actions → Vercel

---

## Database Schema

### Core Tables

```prisma
// schema.prisma

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String?
  name          String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  weddings      Wedding[]
  sessions      Session[]
}

model Wedding {
  id                String    @id @default(cuid())
  userId            String
  user              User      @relation(fields: [userId], references: [id], onDelete: Cascade)

  // Wedding Details
  weddingDate       DateTime?
  dateFlexible      Boolean   @default(false)
  location          String?   // "Sydney, NSW" or specific suburb
  guestCount        Int?
  budgetTotal       Int?      // In cents (AUD)
  budgetVenue       Int?
  budgetCatering    Int?
  budgetPhotography Int?

  // Preferences
  style             String?   // "modern", "rustic", "formal", "casual"
  mustHaves         String[]  // Array of requirements
  dealBreakers      String[]
  dietaryNeeds      String[]
  accessibilityReqs String?

  // Status
  status            WeddingStatus @default(INTAKE)
  chatCompleted     Boolean   @default(false)

  createdAt         DateTime  @default(now())
  updatedAt         DateTime  @updatedAt

  conversations     Conversation[]
  vendorOutreach    VendorOutreach[]
  savedVendors      SavedVendor[]
}

enum WeddingStatus {
  INTAKE          // Gathering information via AI chat
  MATCHING        // Finding vendors
  OUTREACH        // Emails sent
  REVIEWING       // User reviewing responses
  COMPLETED       // User made decisions
}

model Conversation {
  id          String   @id @default(cuid())
  weddingId   String
  wedding     Wedding  @relation(fields: [weddingId], references: [id], onDelete: Cascade)

  messages    Json     // Array of {role: 'user'|'assistant', content: string, timestamp: DateTime}

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Vendor {
  id              String   @id @default(cuid())

  // Basic Info
  businessName    String
  category        VendorCategory
  email           String   // Primary contact
  phone           String?
  website         String?

  // Location
  suburb          String
  state           String   @default("NSW")
  address         String?
  latitude        Float?
  longitude       Float?

  // Services
  priceRange      PriceRange?
  capacity        Int?     // Max guests (for venues)
  servicesOffered String[] // ["full-service catering", "bar service", etc.]

  // Metadata
  verified        Boolean  @default(false)
  responseRate    Float?   // 0.0 - 1.0 (calculated from outreach history)
  lastContacted   DateTime?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  outreach        VendorOutreach[]
  savedBy         SavedVendor[]

  @@index([category, suburb])
}

enum VendorCategory {
  VENUE
  PHOTOGRAPHER
  CATERING
  FLORIST
  ENTERTAINMENT
  MARQUEE
  OTHER
}

enum PriceRange {
  BUDGET        // $
  MODERATE      // $$
  PREMIUM       // $$$
  LUXURY        // $$$$
}

model VendorOutreach {
  id              String   @id @default(cuid())
  weddingId       String
  wedding         Wedding  @relation(fields: [weddingId], references: [id], onDelete: Cascade)
  vendorId        String
  vendor          Vendor   @relation(fields: [vendorId], references: [id])

  // Email Details
  emailSubject    String
  emailBody       String
  sentAt          DateTime?

  // Tracking
  delivered       Boolean  @default(false)
  opened          Boolean  @default(false)
  replied         Boolean  @default(false)
  bounced         Boolean  @default(false)

  // Response
  responseEmail   String?  // Raw email response (if replied)
  availability    VendorAvailability?
  quote           Int?     // In cents
  notes           String?

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  @@unique([weddingId, vendorId])
}

enum VendorAvailability {
  AVAILABLE
  UNAVAILABLE
  TENTATIVE
  UNKNOWN
}

model SavedVendor {
  id          String   @id @default(cuid())
  weddingId   String
  wedding     Wedding  @relation(fields: [weddingId], references: [id], onDelete: Cascade)
  vendorId    String
  vendor      Vendor   @relation(fields: [vendorId], references: [id])

  notes       String?
  isFavorite  Boolean  @default(false)

  createdAt   DateTime @default(now())

  @@unique([weddingId, vendorId])
}

model Session {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  sessionToken String   @unique
  expires      DateTime

  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

---

## API Routes

### Authentication

```
POST   /api/auth/signup          - Create new user account
POST   /api/auth/login           - Email/password login
POST   /api/auth/logout          - End session
GET    /api/auth/session         - Get current user session
```

### Wedding Planning

```
POST   /api/wedding/create       - Start new wedding planning
GET    /api/wedding/:id          - Get wedding details
PATCH  /api/wedding/:id          - Update wedding details
DELETE /api/wedding/:id          - Delete wedding
```

### AI Chat

```
POST   /api/chat                 - Send message to AI (streaming response)
GET    /api/chat/:weddingId      - Get conversation history
```

### Vendor Discovery

```
POST   /api/vendors/search       - Find vendors based on criteria
GET    /api/vendors/:id          - Get vendor details
POST   /api/vendors/create       - Add new vendor (admin)
```

### Outreach

```
POST   /api/outreach/send        - Trigger vendor outreach
GET    /api/outreach/:weddingId  - Get outreach status & responses
POST   /api/outreach/webhook     - Email webhook (delivery, opens, replies)
```

### Dashboard

```
GET    /api/dashboard/:weddingId - Get aggregated vendor responses
POST   /api/vendors/save         - Save/favorite a vendor
```

---

## AI Conversation Flow

### Conversation Structure

```typescript
// Conversation state machine
type ConversationStage =
  | 'welcome'
  | 'date'
  | 'location'
  | 'guest_count'
  | 'budget'
  | 'style'
  | 'requirements'
  | 'review'
  | 'complete'

// Prompt template
const systemPrompt = `
You are a friendly wedding planning assistant helping couples plan their dream wedding in New South Wales, Australia.

Your goal is to gather the following information through natural conversation:
1. Wedding date (or preferred month/season if flexible)
2. Location (suburb/region in NSW)
3. Expected guest count
4. Total budget and per-category budgets
5. Wedding style and preferences
6. Must-have requirements
7. Dietary restrictions and accessibility needs

Guidelines:
- Be warm, empathetic, and excited for their wedding
- Ask one question at a time (don't overwhelm)
- If they provide vague answers, gently probe for specifics
- Celebrate their answers ("That sounds beautiful!")
- After gathering all info, summarize and confirm before proceeding

Current stage: {stage}
Information collected so far: {collectedData}
`
```

### Sample Conversation

```
AI: Congratulations on your engagement! 🎉 I'm so excited to help you plan your wedding.
    Let's start with the basics - do you have a date in mind, or are you still flexible?

User: We're thinking sometime in spring, maybe October?

AI: October is a beautiful time for a wedding in NSW - the weather is usually perfect!
    Do you have a specific date in October, or are you open to any weekend?

User: Flexible, just sometime in October 2027

AI: Perfect! That gives us great flexibility to find the best venues.
    Now, where are you thinking of having the wedding? Do you have a suburb or region in mind?

[... continues through all required fields ...]

AI: Amazing! Let me summarize what we've discussed:
    📅 Date: October 2027 (flexible)
    📍 Location: Blue Mountains, NSW
    👥 Guests: ~100 people
    💰 Budget: $45,000 total
    🎨 Style: Rustic outdoor with mountain views
    ✅ Must-haves: Outdoor ceremony space, indoor backup for rain

    Does this all look correct? If you'd like to change anything, just let me know!

User: Looks good!

AI: Wonderful! I'll now search for venues, photographers, and caterers in the Blue Mountains
    area that match your style and budget. Once I find great options, I'll send personalized
    emails to them on your behalf to check availability for October 2027.

    You'll be able to review all their responses in your dashboard. Sound good?
```

---

## Email Outreach System

### Email Template (Venue Example)

```typescript
// Email generation
function generateVendorEmail(wedding: Wedding, vendor: Vendor): Email {
  const subject = `Wedding Inquiry - ${format(wedding.weddingDate, 'MMMM yyyy')}`

  const body = `
Hi ${vendor.businessName} team,

I'm planning my wedding for ${format(wedding.weddingDate, 'MMMM yyyy')} and came across your beautiful ${vendor.category.toLowerCase()} while searching for the perfect venue in ${vendor.suburb}.

Here are the details of what we're looking for:

📅 Date: ${formatDateRange(wedding.weddingDate, wedding.dateFlexible)}
👥 Guest Count: Approximately ${wedding.guestCount} guests
🎨 Style: ${wedding.style}
💰 Budget: ${formatBudget(wedding.budgetVenue)}

${
  wedding.mustHaves.length > 0
    ? `
Must-haves:
${wedding.mustHaves.map(item => `• ${item}`).join('\n')}
`
    : ''
}

Would you have availability for our wedding? If so, I'd love to learn more about your packages and pricing.

Looking forward to hearing from you!

Best regards,
${wedding.user.name}

---
This inquiry was sent via WeddingPlan AI
If you'd prefer not to receive inquiries through our platform, please click here: ${unsubscribeLink}
  `.trim()

  return { subject, body, to: vendor.email }
}
```

### Sending Logic

```typescript
// Batch send with rate limiting
async function sendVendorOutreach(weddingId: string) {
  const wedding = await getWeddingWithVendors(weddingId)
  const vendors = await matchVendors(wedding)

  // Send in batches to avoid spam filters
  const BATCH_SIZE = 5
  const BATCH_DELAY = 10000 // 10 seconds between batches

  for (let i = 0; i < vendors.length; i += BATCH_SIZE) {
    const batch = vendors.slice(i, i + BATCH_SIZE)

    await Promise.all(batch.map(vendor => sendEmail(wedding, vendor)))

    if (i + BATCH_SIZE < vendors.length) {
      await sleep(BATCH_DELAY)
    }
  }
}
```

---

## Vendor Matching Algorithm

```typescript
type MatchCriteria = {
  location: string // Suburb/region
  category: VendorCategory
  budget?: number // Max budget in cents
  capacity?: number // Min capacity needed
  dateAvailable?: Date // Check past outreach for this date
}

async function matchVendors(wedding: Wedding): Promise<Vendor[]> {
  const criteria: MatchCriteria = {
    location: wedding.location,
    category: 'VENUE', // Start with venues
    budget: wedding.budgetVenue,
    capacity: wedding.guestCount,
  }

  // Find vendors matching criteria
  const vendors = await prisma.vendor.findMany({
    where: {
      category: criteria.category,
      suburb: { contains: criteria.location, mode: 'insensitive' },
      capacity: { gte: criteria.capacity },
      // Price range filtering (rough match)
      priceRange: getPriceRangeForBudget(criteria.budget),
      // Exclude vendors we've already contacted for this wedding
      NOT: {
        outreach: {
          some: { weddingId: wedding.id },
        },
      },
    },
    orderBy: [
      { responseRate: 'desc' }, // Prioritize responsive vendors
      { verified: 'desc' },
      { updatedAt: 'desc' },
    ],
    take: 10, // Top 10 matches
  })

  return vendors
}
```

---

## Deployment Strategy

### Environments

1. **Development** (local)
   - Local Next.js server
   - Local PostgreSQL (Docker)
   - Claude API (with your credentials)

2. **Staging** (Vercel preview)
   - Auto-deployed on PR
   - Vercel Postgres (staging DB)
   - Limited email sending (test mode)

3. **Production** (Vercel)
   - Main branch auto-deploy
   - Vercel Postgres (production DB)
   - Full email sending (monitored)

### Monitoring

- **Error Tracking:** Sentry (free tier)
- **Analytics:** Vercel Analytics or Plausible (privacy-friendly)
- **Email Metrics:** Resend dashboard (delivery, opens, bounces)
- **Database:** Prisma Studio + Vercel Postgres console

---

## Security Considerations

### Data Protection

- Hash passwords with bcrypt (cost factor 12)
- HTTPS only (enforced by Vercel)
- Environment variables for secrets (.env.local)
- Rate limiting on API routes (prevent abuse)

### Email Security

- SPF, DKIM, DMARC records configured
- Unsubscribe links in all emails
- Track spam complaints
- Bounce handling (mark invalid emails)

### Privacy

- Privacy policy (GDPR-style, even though Australia)
- User data export/deletion on request
- Minimal data collection
- No selling of data to third parties

---

## Performance Optimization

### Frontend

- Next.js App Router (React Server Components for reduced JS)
- Image optimization (next/image)
- Lazy loading for dashboard (vendor cards)
- Code splitting (route-based)

### Backend

- Database indexing (category, location, userId)
- Query optimization (select only needed fields)
- Caching (Redis for future if needed)

### AI

- Stream responses (don't wait for full completion)
- Cache common prompts (reduce API calls)
- Fallback to local LLM if API is slow/down

---

## Future Enhancements

### Phase 2

- **Vendor Response Parsing:** AI extracts availability, quotes from emails
- **Multi-language:** Support for non-English speaking couples
- **Mobile App:** React Native or Flutter
- **Vendor Dashboard:** Let vendors manage their profiles

### Phase 3

- **Real-time Chat:** Direct messaging with vendors (WebSockets)
- **Payment Integration:** Stripe for deposits/payments
- **Contract Management:** E-signatures (DocuSign integration)
- **Recommendations Engine:** ML-based vendor suggestions

---

## Development Workflow

```bash
# Local development
git clone <repo>
cd wedding-plan
pnpm install
cp .env.example .env.local  # Configure env vars
pnpm db:push                # Push Prisma schema to DB
pnpm dev                    # Start Next.js dev server

# Run tests
pnpm test                   # Unit tests
pnpm test:e2e               # E2E tests

# Deploy
git push origin main        # Auto-deploys to Vercel
```

---

## Questions & Decisions Needed

1. **Domain name:** weddingplanai.com.au or something else?
2. **Local LLM setup:** Do you want to test local inference on RTX 4080, or stick with Claude API?
3. **Initial vendor data:** Should we scrape Google Maps or manually curate 50 venues first?
4. **Email domain:** Use custom domain or Resend's shared domain for MVP?
5. **Authentication:** Email/password only, or also Google/Facebook OAuth?

---

## Next: Implementation Plan

See `IMPLEMENTATION_PLAN.md` for week-by-week development schedule.
