# WeddingPlan AI 💍

AI-powered wedding planning assistant that automates vendor discovery and outreach for couples planning weddings in New South Wales, Australia.

## 🎯 What We're Building

An intelligent wedding planning platform that:

- **Multi-Step Form Intake**: Professional questionnaire to gather wedding requirements
- **Smart Vendor Matching**: Automatically finds venues, photographers, caterers based on your preferences
- **Automated Outreach**: Sends personalized emails to vendors on your behalf
- **Response Dashboard**: Aggregates vendor responses for easy comparison
- **Edit Anytime**: Update your wedding details whenever needed

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth (@supabase/ssr)
- **AI**: Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)
- **Email**: Resend API (batch sending, webhooks)
- **Hosting**: Vercel
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint + Prettier + auto-formatting

## 📋 Project Status

**Current Phase**: Production Ready ✅

**Completed Features:**
- ✅ **Authentication** (Supabase Auth with Google OAuth)
- ✅ **User Interface** (Header, user menu, login/logout)
- ✅ **Multi-step form questionnaire** (TypeForm-style UI)
- ✅ **Edit wedding details** (update anytime from dashboard)
- ✅ **AI-powered vendor matching** (45+ vendors across 2 regions)
- ✅ **Email outreach system** (generate & send personalized emails)
- ✅ **Dashboard** (empty state, wedding summary, response tracking)
- ✅ **Vendor database** (Newcastle + Hunter Valley)
- ✅ **Testing suite** (Vitest with 24 passing tests)
- ✅ **Production deployment** (Vercel + Supabase)

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 20+
- PostgreSQL (local or cloud)
- Claude API key (Anthropic)

### Installation

1. **Clone and install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add:
   - `DATABASE_URL`: Your PostgreSQL connection string (Supabase)
   - `ANTHROPIC_API_KEY`: Your Claude API key
   - `CLAUDE_MODEL`: claude-sonnet-4-5-20250929
   - `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon key
   - `RESEND_API_KEY`: Your Resend API key (for email)
   - `EMAIL_FROM`: Your verified sender email

3. **Set up database**

   ```bash
   npm run db:push
   ```

4. **Seed vendor data**

   ```bash
   npm run db:seed:newcastle
   npm run db:seed:hunter-valley
   ```

5. **Run development server**

   ```bash
   npm run dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
wedding-plan/
├── app/                       # Next.js 15 App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Auth sync & logout
│   │   ├── chat/            # Claude AI (legacy)
│   │   ├── outreach/        # Email generation & sending
│   │   ├── vendors/         # Vendor matching
│   │   └── wedding/         # Wedding CRUD
│   ├── auth/                # Login, signup, callback
│   ├── dashboard/           # User dashboard pages
│   ├── questionnaire/       # 5-step form (NEW)
│   └── vendors/             # Vendor browsing
├── components/              # React components
│   ├── Header.tsx          # Global header with user menu (NEW)
│   ├── UserMenu.tsx        # Dropdown menu with logout (NEW)
│   ├── VendorCard.tsx      # Vendor display
│   └── VendorGrid.tsx      # Vendor selection UI
├── lib/                     # Core utilities
│   ├── supabase/           # Supabase Auth clients
│   ├── email/              # Resend integration
│   ├── claude.ts           # Claude API
│   ├── vendor-matching.ts  # Matching algorithm
│   └── prisma.ts           # Database client
├── prisma/
│   └── schema.prisma       # Database schema (7 tables)
├── scripts/                 # Database seeding
│   ├── seed-newcastle-vendors.ts
│   ├── seed-hunter-valley-vendors.ts
│   └── validate-vendor-data.ts
├── test/                    # Vitest test suite
├── docs/                    # Documentation
│   ├── INDEX.md            # Documentation index
│   ├── architecture/       # Technical docs
│   ├── product/            # Product & planning docs
│   ├── guides/             # Setup guides
│   └── archive/            # Historical docs
├── QUICK_START.md          # Getting started guide
├── DEPLOYMENT.md           # Production deployment
└── TESTING_PLAN.md         # Testing strategy
```

## 🎨 Features

### ✅ Implemented

**Authentication & User Management:**
- [x] Supabase Auth (email/password + Google OAuth)
- [x] User menu with avatar/initials
- [x] Login/logout UI with dropdown
- [x] Session management across pages

**Wedding Planning Flow:**
- [x] 5-step form questionnaire (Date, Location, Guests, Budget, Style)
- [x] Edit wedding details anytime
- [x] Dashboard empty state with clear CTAs
- [x] Wedding summary card on dashboard
- [x] AI-powered vendor matching

**Vendor Database:**
- [x] 17 Newcastle vendors (venues, photographers, caterers, florists)
- [x] 28 Hunter Valley vendors (full coverage all categories)
- [x] Validation utilities for data quality
- [x] Standardized seeding strategy

**Email Outreach:**
- [x] Vendor selection UI with checkboxes
- [x] AI-powered personalized email generation
- [x] Batch email sending via Resend API
- [x] Email preview & editing before sending

**Dashboard & Tracking:**
- [x] Outreach statistics (contacted, delivered, opened, responded)
- [x] Response tracking table
- [x] Manual response entry
- [x] Individual vendor detail pages

**Quality & Testing:**
- [x] Vitest testing framework (24 passing tests)
- [x] ESLint + Prettier with auto-formatting
- [x] TypeScript strict mode
- [x] Production deployment (Vercel + Supabase)

### 🚧 In Progress

- [ ] Resend webhook integration (for automatic email tracking)
- [ ] Email notifications to users when vendors respond
- [ ] Blue Mountains vendor expansion

### 📅 Planned

- [ ] Quote comparison tools
- [ ] Payment integration (Stripe subscription model)
- [ ] SMS notifications (Twilio)
- [ ] Wedding timeline planner
- [ ] Budget tracker
- [ ] Guest list management
- [ ] Vendor self-service portal

## 🧪 Using the App

### New User Flow:

1. **Visit the site** - See beautiful landing page
2. **Sign in** - Click "Sign In" in header, use Google or email/password
3. **Dashboard redirect** - See empty state: "We need details about your special day"
4. **Complete questionnaire** - Click "Complete Wedding Details"
   - 5 steps with visual progress bar
   - Large, easy-to-click buttons
   - Smooth animations between steps
   - Data saves automatically at the end
5. **View dashboard** - See wedding summary with your details
6. **Browse vendors** - View AI-matched vendors for your preferences
7. **Select vendors** - Choose who to contact (checkboxes)
8. **Generate emails** - AI creates personalized messages
9. **Send outreach** - Batch send via Resend API
10. **Track responses** - Dashboard shows delivery, open, response status

### Edit Wedding Details:

1. Go to Dashboard
2. Click "Edit Details" button (next to "Your Wedding")
3. Form pre-fills with current selections (highlighted)
4. Update any answers
5. Saves automatically on completion

## 📖 Documentation

**Essential:**
- [QUICK_START.md](./QUICK_START.md) - Get started in 3 minutes
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy to production
- [TESTING_PLAN.md](./TESTING_PLAN.md) - Testing strategy
- [BUGS.md](./BUGS.md) - Known issues and tracking

**Comprehensive Documentation:**
- [docs/INDEX.md](./docs/INDEX.md) - Complete documentation index
- [docs/product/PRD.md](./docs/product/PRD.md) - Product requirements
- [docs/architecture/ARCHITECTURE.md](./docs/architecture/ARCHITECTURE.md) - Technical architecture
- [docs/guides/VENDOR_DATABASE_STRATEGY.md](./docs/guides/VENDOR_DATABASE_STRATEGY.md) - Vendor data expansion
- [VENDOR_DATABASE_EXPANSION.md](./VENDOR_DATABASE_EXPANSION.md) - Hunter Valley expansion summary

## 🎯 Launch Status

**Status**: ✅ Production Ready (February 2026)

**Live URL**: [wedding-plan-lime.vercel.app](https://wedding-plan-lime.vercel.app)

**Coverage**:
- **Newcastle, NSW** - 17 vendors (venues, photographers, caterers, florists)
- **Hunter Valley, NSW** - 28 vendors (full category coverage)
- **Total**: 45 vendors across 2 regions

**Next Launch**: Blue Mountains (March 2026) - 20-25 vendors

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in UI mode
npm run test:ui

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

**Test Coverage:**
- ✅ Component tests (VendorCard, formatting utilities)
- ✅ 24 passing tests
- ✅ Vitest + React Testing Library

## 🚀 Development Workflow

```bash
# Start dev server
npm run dev

# Lint and fix
npm run lint:fix

# Format code
npm run format

# Run tests
npm test

# Build for production
npm run build

# Start production server
npm start
```

## 📊 Database Commands

```bash
# Generate Prisma Client
npm run db:generate

# Push schema to database
npm run db:push

# Open Prisma Studio
npm run db:studio

# Seed Newcastle vendors
npm run db:seed:newcastle

# Seed Hunter Valley vendors
npm run db:seed:hunter-valley

# Test database connection
npm run db:test
```

## 🤝 Contributing

This is currently a solo project. Contributions welcome after MVP launch.

## 📄 License

Private - Not yet open source

## 🏆 Recent Improvements (February 2026)

### UX Overhaul:
- **Replaced chatbot with professional form** - Users now have confidence their data is saved
- **Added edit functionality** - Can update wedding details anytime
- **Dashboard empty state** - Clear guidance for new users (no confusing auto-redirects)
- **Header with user menu** - Professional navigation with avatar, dropdown, logout
- **Visual feedback** - Progress bars, loading states, highlighted selections

### Technical:
- **Testing suite** - Vitest with 24 tests
- **Linting** - ESLint + Prettier with auto-fix
- **Documentation cleanup** - 25 → 6 root files
- **Vendor expansion** - Hunter Valley added (28 vendors)
- **Build optimizations** - Lazy Resend client, proper TypeScript checks

---

**Built with ❤️ for couples planning their dream wedding in Australia**
