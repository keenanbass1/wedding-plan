# StreamWedding - Implementation Plan

**Target:** MVP in 8-10 weeks
**Start Date:** 2026-02-14
**Target Launch:** Mid-April 2026

---

## Week 1-2: Foundation & Setup

### Week 1: Project Setup

**Goal:** Get development environment running with core infrastructure

**Tasks:**

- [x] Create PRD, Architecture docs
- [ ] Initialize Next.js 14 project (TypeScript, App Router)
- [ ] Set up Tailwind CSS + shadcn/ui
- [ ] Configure ESLint + Prettier
- [ ] Set up Prisma with PostgreSQL
- [ ] Create database schema (initial version)
- [ ] Set up NextAuth.js (email/password)
- [ ] Deploy to Vercel (empty app, test deployment)
- [ ] Set up GitHub repository + CI/CD

**Deliverable:** Empty Next.js app deployed to Vercel with auth + database connected

---

### Week 2: AI Chat Foundation

**Goal:** Working conversational AI interface

**Tasks:**

- [ ] Integrate Claude API (using your account for testing)
- [ ] Build chat UI component (message list, input field)
- [ ] Implement conversation state management
- [ ] Create system prompts for wedding planning flow
- [ ] Add conversation persistence (save to DB)
- [ ] Test multi-turn conversations
- [ ] Handle streaming responses
- [ ] Error handling (API failures, rate limits)

**Deliverable:** Working chat interface that can ask questions and save responses

---

## Week 3-4: Core Features

### Week 3: Wedding Data Model & Intake

**Goal:** Complete the information gathering flow

**Tasks:**

- [ ] Design conversation stages (welcome → date → location → ... → review)
- [ ] Implement stage-based prompting
- [ ] Build "Review Summary" page (show collected data)
- [ ] Add ability to edit answers
- [ ] Validate required fields before proceeding
- [ ] Create "Wedding Dashboard" (user's weddings list)
- [ ] Add wedding creation/deletion
- [ ] Test full intake flow with sample data

**Deliverable:** Users can complete full wedding intake via AI chat

---

### Week 4: Vendor Database Setup

**Goal:** 50+ vendors in database, searchable

**Tasks:**

- [ ] Finalize vendor schema (Prisma)
- [ ] Research NSW wedding venues (Google Maps, directories)
- [ ] Manually curate 50-100 Sydney/NSW venues
  - Business name, email, suburb, capacity, price range
- [ ] Add 30-50 photographers
- [ ] Add 20-30 caterers
- [ ] Create vendor admin panel (add/edit vendors)
- [ ] Build vendor matching algorithm (basic version)
- [ ] Test matching with sample wedding data

**Deliverable:** 100+ vendors in database, matching algorithm returns relevant results

---

## Week 5-6: Email Automation

### Week 5: Email Infrastructure

**Goal:** Send personalized emails to vendors

**Tasks:**

- [ ] Set up Resend account
- [ ] Configure email domain (SPF, DKIM, DMARC)
- [ ] Create email templates (venues, photographers, caterers)
- [ ] Build email generation logic (inject wedding data)
- [ ] Implement batch sending (rate limiting)
- [ ] Add unsubscribe handling
- [ ] Test email delivery (send to your own email)
- [ ] Set up webhook for delivery/open tracking

**Deliverable:** System can send personalized emails to vendors

---

### Week 6: Outreach Tracking

**Goal:** Track email status and vendor responses

**Tasks:**

- [ ] Create `VendorOutreach` records when sending
- [ ] Implement webhook handler (delivery, opens, bounces)
- [ ] Manual response entry (until auto-parsing built)
- [ ] Add "Mark as responded" UI for users
- [ ] Track availability (available/unavailable/tentative)
- [ ] Store quotes (if vendor provides pricing)
- [ ] Test full outreach flow end-to-end

**Deliverable:** Users can trigger outreach and see which vendors responded

---

## Week 7-8: Dashboard & UX

### Week 7: Response Dashboard

**Goal:** Beautiful UI to review vendor options

**Tasks:**

- [ ] Design dashboard layout (category tabs, vendor cards)
- [ ] Build vendor card component (name, price, availability, contact)
- [ ] Add filtering (available only, price range)
- [ ] Add sorting (price, response time, name)
- [ ] Implement "Save/Favorite" functionality
- [ ] Show vendor details modal (website, services, etc.)
- [ ] Add direct contact button (opens email client)
- [ ] Responsive design (mobile-friendly)

**Deliverable:** Polished dashboard where users can review and compare vendors

---

### Week 8: Polish & Testing

**Goal:** Bug-free, production-ready MVP

**Tasks:**

- [ ] End-to-end testing (complete user journey)
- [ ] Fix bugs from testing
- [ ] Add loading states (skeletons, spinners)
- [ ] Improve error messages (user-friendly)
- [ ] Add onboarding tour (first-time user guide)
- [ ] Performance optimization (image lazy loading, etc.)
- [ ] Accessibility audit (keyboard navigation, screen readers)
- [ ] Write documentation (user guide, FAQ)

**Deliverable:** Polished, tested MVP ready for beta users

---

## Week 9-10: Beta Launch

### Week 9: Beta Preparation

**Goal:** Prepare for real users

**Tasks:**

- [ ] Expand vendor database (200+ venues, 150+ photographers, 100+ caterers)
- [ ] Create landing page (value prop, screenshots, signup)
- [ ] Set up analytics (Vercel Analytics or Plausible)
- [ ] Set up error monitoring (Sentry)
- [ ] Write privacy policy & terms of service
- [ ] Create email templates (welcome, outreach sent, responses received)
- [ ] Set up customer support (email, or simple chat widget)
- [ ] Prepare beta feedback form

**Deliverable:** Landing page + expanded vendor database

---

### Week 10: Beta Testing & Iteration

**Goal:** 10 beta users, gather feedback

**Tasks:**

- [ ] Recruit 10 beta couples (friends, family, Reddit, wedding forums)
- [ ] Onboard beta users (walk through app)
- [ ] Monitor usage (analytics, error logs)
- [ ] Gather feedback (surveys, interviews)
- [ ] Fix critical bugs
- [ ] Iterate on UX based on feedback
- [ ] Optimize email templates based on vendor response rates
- [ ] Document learnings

**Deliverable:** 10+ successful beta users, prioritized improvement list

---

## Post-MVP: Growth Phase (Weeks 11+)

### Immediate Improvements (Week 11-12)

- [ ] Add florists category
- [ ] Add entertainment/bands category
- [ ] Improve AI prompts based on user feedback
- [ ] Implement freemium model (paywall for premium features)
- [ ] A/B test pricing ($49 vs $79 vs $99)

### Phase 2 Features (Month 3-4)

- [ ] Guest management (import contacts, track RSVPs)
- [ ] Budget tracking dashboard
- [ ] Timeline/checklist generator
- [ ] Vendor response auto-parsing (AI extracts availability, pricing)
- [ ] Email reminders to vendors (if no response after 1 week)
- [ ] Vendor partnerships (premium listings, verified badges)

### Phase 3 Features (Month 5-6)

- [ ] Mobile app (React Native)
- [ ] Real-time chat with vendors
- [ ] Contract management (e-signatures)
- [ ] Payment integration (deposits, installments)
- [ ] Expand to other Australian states (VIC, QLD)
- [ ] Vendor dashboard (manage profile, respond to inquiries)

---

## Development Setup Checklist

### Tools to Install

- [ ] Node.js 20+ (or use nvm)
- [ ] pnpm or bun (package manager)
- [ ] PostgreSQL (Docker or local)
- [ ] Git
- [ ] VS Code (or preferred editor)
- [ ] Prisma extension (VS Code)

### Accounts to Create

- [ ] Vercel account (deployment)
- [ ] GitHub account (code hosting)
- [ ] Anthropic account (Claude API) - ✅ You have this
- [ ] Resend account (email service)
- [ ] Sentry account (error monitoring) - optional

### Environment Variables (.env.local)

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/weddingplan"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-random-secret-here"

# Claude API
ANTHROPIC_API_KEY="sk-ant-your-key-here"

# Email (Resend)
RESEND_API_KEY="re_your-key-here"
EMAIL_FROM="noreply@streamwedding.com"

# Optional: Local LLM
OLLAMA_URL="http://localhost:11434"  # If using local Llama
```

---

## Success Criteria (MVP)

### Technical

- [ ] 99% uptime (Vercel reliability)
- [ ] < 2s page load time
- [ ] < 5s AI response time (first token)
- [ ] 90%+ email delivery rate
- [ ] Zero critical security vulnerabilities

### User Experience

- [ ] 80%+ chat completion rate (users finish intake)
- [ ] 4+ star average rating (beta feedback)
- [ ] 70%+ users trigger vendor outreach
- [ ] 20+ hours saved per user (vs manual outreach)

### Business

- [ ] 50+ signups (organic + beta invites)
- [ ] 10+ completed wedding plans
- [ ] 40%+ vendor response rate
- [ ] 5+ pieces of positive feedback
- [ ] 1-2 vendor partnerships

---

## Risk Mitigation

### Technical Risks

| Risk                        | Mitigation                                                          |
| --------------------------- | ------------------------------------------------------------------- |
| Claude API downtime         | Implement retry logic, fallback to local LLM                        |
| Email deliverability issues | Use reputable ESP (Resend), authenticate domain, monitor reputation |
| Database performance        | Add indexes, query optimization, consider caching                   |
| Vendor data quality         | Manual curation for MVP, user-submitted additions with review       |

### Product Risks

| Risk                                 | Mitigation                                                         |
| ------------------------------------ | ------------------------------------------------------------------ |
| Low vendor response rate             | A/B test email templates, follow-up reminders, incentivize vendors |
| Users abandon during chat            | Shorten intake flow, save progress, allow resuming later           |
| Insufficient vendor coverage         | Focus on Sydney initially, expand gradually                        |
| Competition launches similar product | Move fast, build vendor relationships, focus on UX quality         |

### Business Risks

| Risk                        | Mitigation                                                             |
| --------------------------- | ---------------------------------------------------------------------- |
| No users sign up            | Marketing (SEO, Reddit, wedding forums), free tier                     |
| Users don't convert to paid | Test pricing, highlight value (time saved), offer money-back guarantee |
| Spam complaints             | Clear opt-out, only business emails, track complaints                  |
| Legal issues (privacy)      | Privacy policy, GDPR-style data handling, consult lawyer if scaling    |

---

## Metrics Dashboard (Track Weekly)

### User Metrics

- New signups
- Active users (weekly)
- Chat completion rate
- Outreach trigger rate
- Dashboard engagement (time spent)

### Technical Metrics

- API response time (p50, p95, p99)
- Error rate
- Uptime
- Database query performance

### Business Metrics

- Emails sent (total, per user)
- Vendor response rate
- Conversion rate (free → paid)
- Customer satisfaction (NPS or CSAT)

### Vendor Metrics

- Total vendors in database
- Vendors contacted (this week)
- Average response time
- Opt-out rate

---

## Next Steps (Right Now)

1. **Initialize Next.js project** → Let's do this first
2. **Set up Prisma + PostgreSQL** → Define schema
3. **Integrate Claude API** → Test basic chat
4. **Build vendor database** → Start curating 50 venues

Ready to start building? Let's initialize the Next.js project!
