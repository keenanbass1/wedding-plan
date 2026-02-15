# WeddingPlan AI 💍

AI-powered wedding planning assistant that automates vendor discovery and outreach for couples planning weddings in New South Wales, Australia.

## 🎯 What We're Building

An intelligent wedding planning platform that:

- **Conversational AI Intake**: Natural chat interface to gather wedding requirements
- **Smart Vendor Matching**: Automatically finds venues, photographers, caterers based on your preferences
- **Automated Outreach**: Sends personalized emails to vendors on your behalf
- **Response Dashboard**: Aggregates vendor responses for easy comparison

## 🚀 Tech Stack

- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth (@supabase/ssr)
- **AI**: Claude Sonnet 4.5 (claude-sonnet-4-5-20250929)
- **Email**: Resend API (batch sending, webhooks)
- **Hosting**: Vercel
- **Linting**: ESLint + Prettier + auto-formatting

## 📋 Project Status

**Current Phase**: Phase 4 Complete - Dashboard & Response Tracking ✅

**Completed Features:**
- ✅ Authentication (Supabase Auth)
- ✅ Multi-stage questionnaire UI
- ✅ AI-powered vendor matching (17 Newcastle vendors)
- ✅ Email outreach system (generate & send)
- ✅ Dashboard with response tracking
- ✅ Deployed to Vercel with Supabase database

See [docs/product/IMPLEMENTATION_PLAN.md](./docs/product/IMPLEMENTATION_PLAN.md) for full roadmap.

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

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
wedding-plan/
├── app/                       # Next.js 15 App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Auth sync endpoint
│   │   ├── chat/            # Claude AI chat
│   │   ├── outreach/        # Email generation & sending
│   │   └── vendors/         # Vendor matching
│   ├── auth/                # Login, signup, callback
│   ├── dashboard/           # User dashboard pages
│   ├── outreach/            # Email preview & editing
│   └── vendors/             # Vendor browsing
├── components/              # React components
│   ├── ChatInterface.tsx   # Multi-stage questionnaire
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

- [x] User authentication (Supabase Auth with email/password and Google OAuth)
- [x] Multi-stage questionnaire with button-based selections
- [x] AI chat consultant (Claude Sonnet 4.5)
- [x] Vendor matching algorithm (Newcastle region)
- [x] Vendor selection UI with checkboxes
- [x] AI-powered personalized email generation
- [x] Batch email sending via Resend API
- [x] Dashboard with outreach tracking
- [x] Manual response entry
- [x] Email tracking (delivery, open, response status)
- [x] Production deployment (Vercel + Supabase)

### 🚧 In Progress

- [ ] Resend webhook integration (waiting for Resend service restoration)
- [ ] Automated email notifications to users
- [ ] Expand vendor database (Hunter Valley, Blue Mountains, Sydney)

### 📅 Planned

- [ ] Payment integration (Stripe)
- [ ] SMS notifications (Twilio)
- [ ] Quote comparison tools
- [ ] Wedding timeline planner
- [ ] Budget tracker
- [ ] Guest list management

## 🧪 Using the App

1. **Sign up** at `/auth/signup` with email/password or Google

2. **Complete the questionnaire** - 5 questions about your wedding:
   - Wedding date
   - Location (currently supports Newcastle, NSW)
   - Guest count
   - Budget
   - Wedding style preferences

3. **View vendor matches** - See 15+ recommended vendors

4. **Select vendors** - Choose which vendors to contact (checkboxes)

5. **Generate emails** - AI creates personalized emails for each vendor

6. **Send outreach** - Batch send via Resend API

7. **Track responses** - Dashboard shows delivery, open, and response status

## 📖 Documentation

**Essential:**
- [QUICK_START.md](./QUICK_START.md) - Get started in 3 minutes
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deploy to production
- [TESTING_PLAN.md](./TESTING_PLAN.md) - Testing strategy (36 test cases)
- [BUGS.md](./BUGS.md) - Known issues and tracking

**Comprehensive Documentation:**
- [docs/INDEX.md](./docs/INDEX.md) - Complete documentation index
- [docs/product/PRD.md](./docs/product/PRD.md) - Product requirements
- [docs/architecture/ARCHITECTURE.md](./docs/architecture/ARCHITECTURE.md) - Technical architecture
- [docs/product/IMPLEMENTATION_PLAN.md](./docs/product/IMPLEMENTATION_PLAN.md) - Development roadmap

## 🎯 Launch Status

**Status**: ✅ MVP Complete (February 2026)

**Live URL**: [wedding-plan-lime.vercel.app](https://wedding-plan-lime.vercel.app)

**Coverage**: Newcastle, NSW (17 vendors)

**Next Launch**: Hunter Valley & Blue Mountains (March 2026)

## 🤝 Contributing

This is currently a solo project. Contributions welcome after MVP launch.

## 📄 License

Private - Not yet open source

## 🚀 Next Steps

1. **Resend webhook integration** - Automate email tracking (waiting for Resend)
2. **Expand vendor database** - Add Hunter Valley, Blue Mountains, Sydney vendors
3. **Email notifications** - Alert users when vendors respond
4. **Testing suite** - Add Vitest for automated testing
5. **Payment integration** - Stripe for subscription model

---

**Built with ❤️ for couples planning their dream wedding in Australia**
