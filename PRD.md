# WeddingPlan AI - Product Requirements Document

**Version:** 0.1
**Last Updated:** 2026-02-14
**Target Market:** New South Wales, Australia (MVP)
**Status:** Planning Phase

---

## Executive Summary

WeddingPlan AI is an automated wedding planning assistant that uses conversational AI to gather requirements from couples and automatically discovers and contacts wedding vendors on their behalf. Unlike existing platforms that require manual vendor outreach, we automate the entire discovery-to-contact workflow.

**Key Differentiator:** Automated vendor outreach with response aggregation and intelligent matching.

---

## Problem Statement

Wedding planning is time-consuming and stressful:
- Average couple contacts 15-30 vendors manually
- 30-40 hours spent on initial vendor research and outreach
- Scattered responses across email, phone, and messaging
- Difficulty comparing quotes and availability
- Risk of missing quality vendors due to search limitations

**What We're Solving:** Automate the tedious vendor discovery and initial outreach process, aggregating responses into a unified decision-making dashboard.

---

## Target Users

### Primary: Engaged Couples (Australia, NSW)
- Age: 25-40
- Planning weddings 6-18 months out
- Budget: $15,000 - $80,000 AUD
- Tech-savvy, comfortable with AI tools
- Value time savings over traditional planning methods

### Secondary: Wedding Planners (Future)
- Professional planners managing multiple events
- Need vendor coordination automation
- Potential B2B market

---

## MVP Scope (Phase 1)

### Core Features

#### 1. AI Conversational Intake
**Purpose:** Gather wedding requirements through natural conversation

**Required Information:**
- Wedding date (or date range)
- Location (suburb/region in NSW)
- Guest count (approximate)
- Budget (total and per-category)
- Style preferences (formal, casual, rustic, modern, etc.)
- Must-haves and deal-breakers
- Dietary restrictions (for catering)
- Accessibility requirements

**Technical Implementation:**
- Claude API or local LLM (RTX 4080)
- Conversation state management
- Progressive disclosure (don't overwhelm with all questions at once)
- Ability to go back and modify answers

#### 2. Vendor Discovery & Database
**Vendor Categories (MVP):**
1. **Venues** (Priority 1)
2. **Photographers** (Priority 2)
3. **Catering** (Priority 3 - if not included with venue)

**Data Sources:**
- Google Maps API (wedding venues NSW)
- Manual curation for quality control
- Web scraping (secondary)
- User submissions (future)

**Vendor Data Schema:**
```
- Business name
- Category
- Location (suburb, coordinates)
- Contact email (primary requirement)
- Phone (optional)
- Website
- Price range
- Capacity
- Services offered
- Business hours
- Response rate (tracked over time)
```

#### 3. Automated Vendor Outreach
**Email Generation:**
- Personalized based on couple's preferences
- Include all relevant details (date, guest count, budget range, style)
- Professional but warm tone
- Clear call-to-action (availability check)
- Unsubscribe/opt-out link (Australian spam compliance)

**Sending Logic:**
- Batch send to matched vendors (5-10 per category)
- Rate limiting to avoid spam filters
- Track delivery, opens, responses
- Retry logic for bounces

**Australian Spam Compliance:**
- Adhere to Spam Act 2003
- Include business identification
- Provide unsubscribe mechanism
- Only send commercial messages with consent or existing relationship

#### 4. Response Dashboard
**Features:**
- Aggregated view of all vendor responses
- Availability indicators (available/unavailable/tentative)
- Quote comparison (if provided)
- Vendor details and website links
- Direct messaging with vendors (future)
- Filter/sort options

**UI/UX:**
- Mobile-responsive
- Category tabs (venues, photographers, catering)
- Card-based layout for vendors
- Quick actions (save favorite, dismiss, contact)

#### 5. User Account & Session Management
- Email/password authentication (NextAuth.js)
- Save wedding details
- Resume conversations
- Multiple weddings per account (future)

---

## Out of Scope (MVP)

**Defer to Phase 2+:**
- Guest management & digital invitations
- Budget tracking beyond initial intake
- Timeline/checklist generation
- Contract management
- Payment processing
- Additional vendor types (florists, entertainment, etc.)
- Weather contingency planning
- Seating charts
- Mobile app (web-only for MVP)

---

## User Journey (MVP)

1. **Landing Page** → Sign up / Start planning
2. **AI Chat Interface** → Conversational intake (5-10 min)
3. **Review Summary** → Confirm details before outreach
4. **Vendor Matching** → System finds relevant vendors
5. **Automated Outreach** → Emails sent on user's behalf
6. **Await Responses** → Notification when vendors reply
7. **Response Dashboard** → Review options, compare, decide
8. **Direct Contact** → User takes over communication

---

## Success Metrics

### MVP Goals
- **User Acquisition:** 50 couples signed up (3 months)
- **Vendor Database:** 200+ venues, 150+ photographers, 100+ caterers (NSW)
- **Automation Success:** 70%+ email delivery rate
- **User Satisfaction:** Average 4+ stars, 30%+ conversion to paid tier
- **Response Rate:** 40%+ vendors responding within 1 week
- **Time Savings:** Users report 20+ hours saved vs manual outreach

### Key Metrics to Track
- Conversion rate (visitor → signup)
- Chat completion rate (started → finished intake)
- Outreach volume (emails sent per user)
- Vendor response rate
- User retention (return visits)
- Dashboard engagement (time spent reviewing options)

---

## Business Model

### Phase 1 (MVP): Freemium
- **Free Tier:**
  - AI chat intake
  - 1 vendor category automated outreach (venues only)
  - Basic response dashboard

- **Premium Tier:** $79 AUD one-time
  - All 3 vendor categories
  - Unlimited re-matching if initial results unsatisfactory
  - Priority support
  - Advanced filtering/comparison tools

### Phase 2: Hybrid Model
- **Couple-side:** Premium subscriptions + one-time fees
- **Vendor-side:** Lead fees ($5-15 AUD per qualified lead)
- **Partnerships:** Commission on bookings (10-15%)

---

## Technical Architecture

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Hosting:** Vercel (free tier → Pro as needed)
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui or Radix UI
- **State Management:** Zustand or React Context

### Backend
- **API Routes:** Next.js API routes
- **Database:** PostgreSQL (Vercel Postgres or Supabase free tier)
- **ORM:** Prisma or Drizzle
- **Email Service:** Resend or SendGrid (generous free tiers)

### AI Layer
**Options for MVP:**
1. **Local LLM** (RTX 4080 12GB):
   - Llama 3.1 70B (quantized) or Mistral 7B
   - Run via Ollama or vLLM
   - Cost: $0
   - Latency: Fast (local)
   - Scalability: Limited to your hardware

2. **Claude API** (use existing account for testing):
   - Claude 3.5 Sonnet or Haiku
   - Cost: Pay-per-token (testing budget)
   - Latency: API call (200-500ms)
   - Scalability: Unlimited

**Recommendation:** Start with Claude API for MVP (easier), migrate to local if costs scale.

### Vendor Data
- **Initial Load:** Manual curation + Google Maps API
- **Storage:** Postgres database
- **Updates:** Quarterly refresh + user-submitted additions

### Infrastructure
```
┌─────────────┐
│   Vercel    │  Next.js app (frontend + API routes)
└──────┬──────┘
       │
       ├──────► Claude API (conversation AI)
       │
       ├──────► PostgreSQL (user data, vendors, conversations)
       │
       └──────► Resend/SendGrid (email automation)
```

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Vendor data acquisition | High | Start with Google Maps API, manual curation |
| Email deliverability | High | Use reputable ESP, authenticate domain (SPF/DKIM), monitor reputation |
| Spam complaints | Medium | Clear opt-out, only contact business emails, track complaints |
| AI hallucinations | Medium | Structured prompts, validation layer, human-in-loop review |
| Low vendor response rate | High | A/B test email templates, incentivize vendors, follow-up reminders |
| Competitor entry | Medium | Move fast, build vendor relationships, focus on UX |
| Regulatory (privacy) | Low | GDPR-style privacy policy, secure data handling |

---

## Development Phases

### Phase 1: MVP (8-10 weeks)
**Weeks 1-2:** Setup & Architecture
- Next.js project setup
- Database schema design
- AI conversation flow design
- Vendor database (initial 50 venues)

**Weeks 3-4:** Core Features
- AI chat interface
- User authentication
- Vendor matching algorithm

**Weeks 5-6:** Automation
- Email template system
- Automated outreach engine
- Response tracking

**Weeks 7-8:** Dashboard & Polish
- Response dashboard UI
- User testing
- Bug fixes

**Weeks 9-10:** Launch Prep
- Vendor database expansion (200+ venues)
- Beta testing (10 couples)
- Marketing website

### Phase 2: Growth (Post-MVP)
- Add florists, entertainment, marquees
- Guest management features
- Mobile app
- Vendor partnerships

---

## Open Questions

1. **Email sending limits:** How many emails can we send per day before hitting spam filters? (Test with small batches)
2. **Vendor contact accuracy:** How do we verify email addresses are current? (Email validation API, bounce tracking)
3. **Response parsing:** Should we auto-parse vendor responses or rely on manual review? (MVP: manual, Phase 2: AI parsing)
4. **Pricing strategy:** Is $79 the right price point? (A/B test $49/$79/$99)
5. **Vendor opt-in:** Should vendors opt-in to receive inquiries, or is cold outreach acceptable? (Research Australian business email regulations)

---

## Next Steps

1. ✅ Complete PRD
2. ⏳ Set up Next.js project
3. ⏳ Design database schema
4. ⏳ Build vendor database (initial 50 venues in Sydney)
5. ⏳ Prototype AI conversation flow
6. ⏳ Create email templates
7. ⏳ Build MVP features (weeks 1-10)
8. ⏳ Beta launch

---

## Appendix

### Competitor Analysis Summary
- **The Knot/WeddingWire:** Directory-based, manual contact
- **Zola:** AI recommendations, still manual contact
- **Juneberry:** AI assistant, vendor connections (new, unclear if automated outreach)
- **Our Day:** Form-based matching, passive

**Our Advantage:** Only platform with fully automated vendor outreach + response aggregation.

### Technology References
- Next.js: https://nextjs.org
- Vercel Postgres: https://vercel.com/storage/postgres
- Prisma: https://www.prisma.io
- Claude API: https://www.anthropic.com/api
- Resend: https://resend.com (email API)

