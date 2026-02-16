# 🚀 Quick Start Guide

**Get StreamWedding running in 5 minutes!**

---

## Prerequisites

- Node.js 20+ installed
- Supabase account (free tier works)
- Claude API key from Anthropic
- Resend API key (free tier works)

---

## 🎯 Setup Steps

### **Step 1: Clone and Install**

```bash
git clone <your-repo-url>
cd wedding-plan
npm install
```

### **Step 2: Set Up Environment Variables**

Create `.env.local`:

```bash
# Database (Supabase)
DATABASE_URL="postgresql://user:pass@host:port/db"

# Authentication (Supabase)
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# AI (Anthropic)
ANTHROPIC_API_KEY="sk-ant-your-key-here"
CLAUDE_MODEL="claude-sonnet-4-5-20250929"

# Email (Resend)
RESEND_API_KEY="re_your-key-here"
EMAIL_FROM="noreply@yourdomain.com"
```

**Get your keys:**
- **Supabase**: https://supabase.com → Create project → Settings → API
- **Anthropic**: https://console.anthropic.com/settings/keys
- **Resend**: https://resend.com/api-keys

### **Step 3: Set Up Database**

```bash
# Push Prisma schema to Supabase
npm run db:push

# Seed vendor data (Newcastle + Hunter Valley)
npm run db:seed:newcastle
npm run db:seed:hunter-valley
```

### **Step 4: Configure Supabase Auth**

1. Go to Supabase Dashboard → Authentication → Providers
2. Enable **Google** OAuth (optional but recommended)
3. Go to **URL Configuration**:
   - Site URL: `http://localhost:3000` (dev) or your production URL
   - Redirect URLs: Add:
     ```
     http://localhost:3000/auth/callback
     http://localhost:3000/**
     ```

### **Step 5: Start Development Server**

```bash
npm run dev
```

Open http://localhost:3000 🎉

---

## 🎨 Using the App

### First Time User Flow:

1. **Visit http://localhost:3000**
   - See landing page with "Sign In" button in header

2. **Click "Sign In"**
   - Sign up with email/password or Google OAuth
   - Get redirected to dashboard

3. **Complete Wedding Details**
   - Dashboard shows empty state
   - Click "Complete Wedding Details"
   - Fill out 5-step form (Date, Location, Guests, Budget, Style)
   - Saves automatically

4. **View Dashboard**
   - See your wedding summary
   - Browse matched vendors
   - Track outreach (when you contact vendors)

5. **Edit Details**
   - Click "Edit Details" on dashboard
   - Form pre-fills with current data
   - Update any answers

---

## 🧪 Test the Features

### Test Authentication:
```bash
# Visit login page
open http://localhost:3000/auth/login

# Try Google OAuth or email/password
# Should redirect to dashboard after login
```

### Test Questionnaire:
```bash
# Visit questionnaire
open http://localhost:3000/questionnaire

# Complete all 5 steps
# Should save to database and redirect to dashboard
```

### Test Vendor Matching:
```bash
# After completing questionnaire, visit:
open http://localhost:3000/vendors

# Should see matched vendors based on your preferences
```

### View Database:
```bash
npm run db:studio

# Opens Prisma Studio at http://localhost:5555
# You'll see:
# - Your user account
# - Your wedding details
# - 45 vendors (Newcastle + Hunter Valley)
```

---

## 🛠️ Development Commands

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)
npm run build            # Build for production
npm run start            # Run production build
npm run lint             # Check code quality
npm run lint:fix         # Auto-fix linting issues
npm run format           # Format code with Prettier

# Testing
npm test                 # Run Vitest tests
npm run test:ui          # Run tests with UI
npm run test:coverage    # Generate coverage report

# Database
npm run db:studio        # Open Prisma Studio (database browser)
npm run db:push          # Push schema changes to database
npm run db:generate      # Generate Prisma Client
npm run db:seed:newcastle      # Seed Newcastle vendors
npm run db:seed:hunter-valley  # Seed Hunter Valley vendors
npm run db:test          # Test database connection
```

---

## 📁 Key Files to Know

### Pages:
```
app/
├── page.tsx                    # Landing page
├── auth/
│   ├── login/page.tsx         # Login page
│   └── signup/page.tsx        # Signup page
├── questionnaire/page.tsx      # 5-step form ⭐
├── dashboard/page.tsx          # User dashboard
└── vendors/page.tsx            # Vendor browsing
```

### Components:
```
components/
├── Header.tsx                  # Global header with user menu
├── UserMenu.tsx               # Dropdown with logout
├── VendorCard.tsx             # Vendor display card
└── VendorGrid.tsx             # Vendor selection UI
```

### API Routes:
```
app/api/
├── auth/
│   ├── sync-user/route.ts     # Sync Supabase user to DB
│   └── logout/route.ts        # Sign out
├── wedding/route.ts           # Create/update wedding
├── vendors/match/route.ts     # Vendor matching algorithm
└── outreach/
    ├── generate-emails/route.ts
    └── send-batch/route.ts
```

### Core Utilities:
```
lib/
├── supabase/
│   ├── client.ts              # Client-side Supabase
│   ├── server.ts              # Server-side Supabase
│   └── middleware.ts          # Auth middleware
├── email/
│   └── resend-client.ts       # Email service
├── claude.ts                  # Claude AI integration
├── vendor-matching.ts         # Matching algorithm
└── prisma.ts                  # Database client
```

---

## 🐛 Troubleshooting

### Auth Redirect Issues?

**Problem:** After Google sign-in, redirects to localhost:3000

**Solution:**
1. Go to Supabase Dashboard → Authentication → URL Configuration
2. Add your production URL to "Redirect URLs"
3. Update "Site URL" to match your domain

### Database Connection Failed?

```bash
# Check your DATABASE_URL in .env.local
# Make sure it matches your Supabase connection string

# Test connection:
npm run db:test
```

### Build Errors?

```bash
# Regenerate Prisma Client:
npm run db:generate

# Check TypeScript:
npm run build

# Check linting:
npm run lint
```

### Prisma Client Issues?

```bash
# If you get "Prisma Client not found" errors:
npm run db:generate
npm run postinstall
```

### Port 3000 Already in Use?

```bash
# Run on different port:
PORT=3001 npm run dev
```

---

## ✨ What's Working Now

✅ **Authentication:**
- Email/password signup & login
- Google OAuth
- Session management
- User menu with logout

✅ **Wedding Planning:**
- 5-step form questionnaire
- Edit wedding details anytime
- Dashboard with wedding summary
- Empty state guidance for new users

✅ **Vendor Database:**
- 17 Newcastle vendors
- 28 Hunter Valley vendors
- 45 total across 2 regions
- AI-powered matching

✅ **Email Outreach:**
- Vendor selection UI
- Personalized email generation
- Batch sending via Resend
- Response tracking dashboard

✅ **Quality:**
- 24 passing tests (Vitest)
- ESLint + Prettier
- TypeScript strict mode
- Production deployment ready

---

## 🚀 Deploy to Production

See [DEPLOYMENT.md](./DEPLOYMENT.md) for full instructions.

**Quick deploy to Vercel:**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
# Push to main branch to trigger auto-deploy
```

---

## 📚 Next Steps

1. **Complete the questionnaire** - Fill out your wedding details
2. **Browse vendors** - See AI-matched recommendations
3. **Read the docs** - Check out [README.md](./README.md) for full overview
4. **Explore the code** - See [docs/architecture/ARCHITECTURE.md](./docs/architecture/ARCHITECTURE.md)

---

## 🎯 Current Status

**Phase**: Production Ready ✅

**Completed**:
- Authentication system
- Wedding questionnaire (form-based)
- Vendor matching (45 vendors)
- Dashboard with tracking
- Email outreach system
- Testing & linting

**In Progress**:
- Resend webhook integration
- Blue Mountains vendor expansion

---

**Status**: 🎉 **Ready to Use!**

**Just add your API keys to `.env.local` and run `npm run dev`**
