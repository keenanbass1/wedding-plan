# 🎯 Product Strategy - Wedding Planning AI

**Date**: 2026-02-15
**Status**: Strategic Planning

---

## 🎨 User Experience Flows

### **Flow 1: Free Tier User** (Discovery & Browsing)

```
1. Land on homepage
   ↓
2. Click "Begin Your Journey" (no signup required)
   ↓
3. Complete 5-question questionnaire
   ↓
4. See 15+ vendor matches with:
   - Photos/portfolio samples
   - Pricing ranges
   - Ratings & reviews
   - Location & capacity
   - Style tags
   ↓
5. Browse vendor details (click to expand)
   ↓
6. Hit paywall:
   "💎 Upgrade to contact vendors and save favorites"
   ↓
7. Can continue chatting with AI for planning advice (free)
   ↓
8. Call-to-action: "Create Account to Save & Contact Vendors"
```

**What Free Users Get**:
- ✅ AI questionnaire & consultation
- ✅ View all vendor matches
- ✅ See pricing, ratings, photos
- ✅ Chat with AI for wedding planning advice
- ✅ General recommendations
- ❌ Can't contact vendors
- ❌ Can't save favorites
- ❌ Can't track outreach
- ❌ No dashboard

**Value Proposition**:
"Discover your perfect vendors in 30 seconds - no signup required!"

---

### **Flow 2: Pro User** (Full Service)

```
1. Sign up (email + password or Google OAuth)
   ↓
2. Complete questionnaire (data saved to account)
   ↓
3. See vendor matches
   ↓
4. Select favorites (checkbox or star)
   ↓
5. Click "Contact Selected Vendors"
   ↓
6. AI generates personalized emails for each vendor
   ↓
7. Review & edit emails (optional)
   ↓
8. Click "Send Emails" → Automated outreach
   ↓
9. Dashboard shows:
   - 8 vendors contacted
   - 5 responses received
   - 2 quotes ready
   - 3 pending
   ↓
10. View vendor responses in organized inbox
    ↓
11. Compare quotes side-by-side
    ↓
12. Book vendors directly (future: payment integration)
```

**What Pro Users Get**:
- ✅ Everything in Free
- ✅ Unlimited vendor contacts
- ✅ AI-generated personalized emails
- ✅ Automated outreach (send to 50+ vendors)
- ✅ Response tracking dashboard
- ✅ Quote comparison tool
- ✅ Save unlimited favorites
- ✅ Wedding planning timeline
- ✅ Budget tracker
- ✅ Email support

**Pricing**: $29/month or $199/year (save 42%)

---

### **Flow 3: Premium User** (White Glove Service)

```
Everything in Pro, PLUS:

1. Dedicated wedding planner consultation (30 min video call)
   ↓
2. Custom vendor sourcing for hard-to-find needs
   ↓
3. Negotiation assistance (we help get better rates)
   ↓
4. Priority vendor responses (vendors know you're premium)
   ↓
5. Contract review service
   ↓
6. Day-of coordination checklist
   ↓
7. Exclusive vendor deals (10-15% off select vendors)
```

**What Premium Users Get**:
- ✅ Everything in Pro
- ✅ 1-on-1 planner consultation
- ✅ Custom vendor sourcing
- ✅ Negotiation support
- ✅ Contract review
- ✅ Exclusive vendor discounts
- ✅ Priority email & phone support
- ✅ Day-of coordination guide

**Pricing**: $149/month or $999/year

---

## 💰 Pricing Strategy

### **Tier Comparison**

| Feature | Free | Pro ($29/mo) | Premium ($149/mo) |
|---------|------|--------------|-------------------|
| AI Questionnaire | ✅ | ✅ | ✅ |
| View Vendors | ✅ | ✅ | ✅ |
| See Pricing/Photos | ✅ | ✅ | ✅ |
| AI Chat Advice | ✅ | ✅ | ✅ |
| Contact Vendors | ❌ | ✅ Unlimited | ✅ Unlimited |
| Automated Emails | ❌ | ✅ | ✅ |
| Response Tracking | ❌ | ✅ | ✅ |
| Save Favorites | ❌ | ✅ | ✅ |
| Quote Comparison | ❌ | ✅ | ✅ |
| Budget Tracker | ❌ | ✅ | ✅ |
| Vendor Contacts/mo | 0 | Unlimited | Unlimited |
| Human Support | ❌ | Email | Email + Phone |
| Planner Consultation | ❌ | ❌ | ✅ 30min video |
| Custom Sourcing | ❌ | ❌ | ✅ |
| Negotiation Help | ❌ | ❌ | ✅ |
| Exclusive Discounts | ❌ | ❌ | ✅ 10-15% off |
| Contract Review | ❌ | ❌ | ✅ |

---

## 🎯 Types of Usage & User Personas

### **Persona 1: "The Browser"** (Free Tier)
**Who**: Couple just starting to plan, overwhelmed by options
**Goal**: Get a sense of what's available and rough costs
**Behavior**:
- Goes through questionnaire
- Browses vendors
- Doesn't contact anyone yet
- Uses AI chat for planning questions
- Might return 2-3 times before converting

**Conversion Path**:
→ After seeing great matches, clicks "Contact Vendors"
→ Paywall appears: "Upgrade to contact these 8 vendors"
→ 30% convert to Pro

---

### **Persona 2: "The Planner"** (Pro Tier)
**Who**: Engaged couple ready to book vendors, DIY planning
**Goal**: Quickly contact multiple vendors and compare quotes
**Behavior**:
- Signs up immediately after seeing matches
- Contacts 15-30 vendors in first session
- Checks dashboard daily for responses
- Uses quote comparison tool
- Books 4-6 vendors in 2-3 weeks

**Upgrade Path**:
→ If they struggle with contracts or negotiations
→ Upgrade to Premium for expert help

---

### **Persona 3: "The Delegator"** (Premium Tier)
**Who**: Busy professionals, high budget, want expert help
**Goal**: Minimize time spent planning, maximize quality
**Behavior**:
- Signs up for Premium immediately
- Books consultation call first week
- Planner helps refine requirements
- Contacts 20+ vendors
- Gets exclusive deals
- Books entire wedding in 1 month

---

### **Persona 4: "The Region-Specific User"**
**Who**: Couple getting married in specific NSW region
**Usage Patterns**:

**Newcastle Couple**:
- Currently: ✅ 17 vendors available
- Sees full matches
- High conversion

**Hunter Valley Couple**:
- Currently: ⚠️ Limited vendors
- Sees some matches
- Lower conversion
- **Opportunity**: Add Hunter Valley vendors

**Blue Mountains Couple**:
- Currently: ⚠️ No vendors yet
- Sees "no matches" message
- **Critical**: Add ASAP

**Strategy**: Prioritize vendor sourcing by demand

---

## 🔄 Vendor Sourcing Workflow

### **Option A: Manual Research** (Current)

**Time**: ~5-10 min per vendor
**Cost**: $0 (your time)
**Quality**: High (vetted)

**Process**:
1. Google search: "wedding [category] [region] NSW"
2. Visit vendor website
3. Extract:
   - Name, email, phone, website
   - Pricing (from packages page)
   - Capacity, styles, services
   - Photos/portfolio links
4. Add to seed script
5. Run seed script

**Pros**:
- ✅ High quality data
- ✅ Vetted vendors
- ✅ Accurate pricing

**Cons**:
- ❌ Time-consuming
- ❌ Hard to scale
- ❌ Manual updates needed

---

### **Option B: AI-Assisted Research** (Recommended)

**Time**: ~2-3 min per vendor
**Cost**: ~$0.01 per vendor (Claude API)
**Quality**: High (with human review)

**Process**:
```bash
# Run AI vendor research script
npm run research-vendors "wedding photographers Hunter Valley NSW"

# AI does:
1. Web search for vendors
2. Visits top 10 vendor websites
3. Extracts all data using Claude
4. Generates seed script data
5. Outputs JSON for review

# You do:
1. Review AI-extracted data (30 sec per vendor)
2. Fix any errors
3. Approve or reject
4. Run seed script
```

**Pros**:
- ✅ Much faster (3x)
- ✅ Scalable
- ✅ Still human-reviewed

**Cons**:
- ⚠️ Needs review
- ⚠️ Occasional errors

---

### **Option C: Vendor Self-Service** (Scalable)

**Time**: 0 (vendors do it)
**Cost**: $0
**Quality**: Variable (needs moderation)

**Process**:
1. Create vendor portal: `/vendors/signup`
2. Vendors create profiles:
   - Upload photos
   - Set pricing
   - Describe services
   - Add availability
3. Admin reviews and approves
4. Vendor appears in search

**Monetization**:
- Free basic listing
- $49/mo for premium listing (top placement)
- OR take 5% commission on bookings

**Pros**:
- ✅ Fully scalable
- ✅ Always up-to-date
- ✅ Vendors maintain own data
- ✅ Revenue stream

**Cons**:
- ⚠️ Needs moderation
- ⚠️ Quality varies
- ⚠️ Time to build

---

## 🚀 Recommended Immediate Actions

### **Week 1: Expand Coverage**

**Vendor Research Priority**:
1. **Hunter Valley** (high demand):
   - 10 venues
   - 15 photographers
   - 10 caterers
   = 35 vendors

2. **Blue Mountains** (high demand):
   - 10 venues
   - 15 photographers
   - 10 caterers
   = 35 vendors

3. **Sydney & Surrounds** (huge market):
   - 20 venues
   - 30 photographers
   - 20 caterers
   = 70 vendors

**Target**: 150 total vendors across 4 regions

**Time Investment**:
- Manual: ~12 hours (150 vendors × 5 min)
- AI-assisted: ~5 hours (150 vendors × 2 min)

---

### **Week 2: Implement Pricing**

1. **Add authentication** (NextAuth)
2. **Create paywall** at "Contact Vendors" button
3. **Integrate Stripe** for payments
4. **Build subscription management**
5. **Email verification**

---

### **Week 3: Build Core Pro Features**

1. **Vendor selection** (favorites)
2. **Email generation** (AI-powered)
3. **Send emails** (Resend integration)
4. **Dashboard** (response tracking)
5. **Quote comparison** view

---

### **Week 4: Launch MVP**

1. **Public launch** announcement
2. **Marketing** (wedding forums, Instagram)
3. **Collect feedback**
4. **Iterate quickly**

---

## 📊 Success Metrics

### **Month 1 Goals**:
- 100 free users
- 10 Pro conversions (10% conversion rate)
- $290 MRR (Monthly Recurring Revenue)
- 150+ vendors in database
- 4 regions covered

### **Month 3 Goals**:
- 500 free users
- 75 Pro users (15% conversion)
- $2,175 MRR
- 300+ vendors
- 8 regions covered

### **Month 6 Goals**:
- 2,000 free users
- 400 Pro users (20% conversion)
- $11,600 MRR
- 500+ vendors
- All NSW covered + VIC expansion

---

## 🎯 Free vs Pro Strategy

### **Free Tier Strategy** (Lead Generation)

**Purpose**: Get couples in the door, show value immediately

**What Makes Them Upgrade**:
1. See perfect vendor matches
2. Want to contact them
3. Hit paywall: "💎 Unlock contacts for $29/mo"
4. See time savings: "Save 20+ hours of research"
5. Social proof: "487 couples booked vendors this month"

**Conversion Triggers**:
- "Contact 8 selected vendors" button → Paywall
- "Save to favorites" button → Paywall
- "Compare quotes" feature → Paywall
- After 3 free chat sessions → "Upgrade for unlimited AI advice"

---

### **Pro Tier Strategy** (Core Product)

**Purpose**: Solve the pain point completely

**Why It's Worth $29/mo**:
- Saves 20+ hours of vendor research
- Automated email outreach (no copy-pasting)
- Organized responses (vs messy email inbox)
- Quote comparison (make better decisions)
- Budget tracking (stay on budget)

**Competitive Pricing**:
- Traditional planner: $2,000-5,000
- Our Pro tier: $29/mo × 6 months planning = $174
- **Savings**: $1,826-4,826 (94-97% cheaper)

**Value Proposition**:
"For less than a wedding cake topper, get a full AI wedding planner"

---

### **Premium Tier Strategy** (High-Touch)

**Purpose**: Serve high-budget, low-time customers

**Why It's Worth $149/mo**:
- Human expert consultation
- Negotiates better vendor rates (saves $2,000-5,000)
- Contract review (prevents costly mistakes)
- Exclusive 10-15% discounts
- Phone support (immediate help)

**Target Customer**:
- Household income: $150k+
- Wedding budget: $50k+
- Both work full-time
- Value time > money

**Break-even**:
If we negotiate just 5% off a $50k wedding = $2,500 savings
Premium cost for 6 months = $894
**Customer saves $1,606** even after paying us

---

## 🔮 Future Features (Post-Launch)

### **Phase 2** (Months 3-6)
- Vendor self-service portal
- Mobile app (iOS/Android)
- Instagram integration (save inspiration photos)
- Guest list management
- RSVP tracking
- Seating chart tool

### **Phase 3** (Months 6-12)
- Payment processing (book & pay through platform)
- Vendor reviews & ratings
- Real vendor availability calendar
- Video consultations (built-in)
- Contract e-signatures
- Day-of timeline tool

### **Phase 4** (Year 2)
- Expand to VIC, QLD, other states
- International expansion
- White-label for venues/planners
- B2B vendor CRM
- Wedding website builder
- Registry integration

---

## 🎨 User Experience Principles

### **For Free Users**:
1. **Instant Value** - Show matches in 30 seconds
2. **No Friction** - No signup to see results
3. **Build Trust** - Real vendors, real prices
4. **Clear Upgrade Path** - Show what they're missing
5. **Stay Helpful** - Free AI chat keeps them engaged

### **For Pro Users**:
1. **Save Time** - Automate everything possible
2. **Stay Organized** - Dashboard shows everything
3. **Make Decisions Easy** - Compare quotes visually
4. **Reduce Stress** - AI handles communication
5. **Feel Supported** - Quick email responses

### **For Premium Users**:
1. **VIP Treatment** - Immediate phone support
2. **Expert Guidance** - Human planners available
3. **Exclusive Access** - Special vendor deals
4. **Worry-Free** - We handle the details
5. **Guaranteed Success** - We ensure great outcome

---

## 📈 Growth Strategy

### **Month 1: Soft Launch**
- Friends & family testing
- Local wedding Facebook groups
- Wedding forums (Reddit, Whirlpool)
- Collect feedback, iterate

### **Month 2: Public Launch**
- Press release to wedding publications
- Instagram wedding influencers
- Google Ads (wedding planning keywords)
- SEO optimization

### **Month 3: Scale**
- Referral program (Give $10, Get $10)
- Vendor partnerships
- Wedding expo booth
- Content marketing (blog)

---

## 💡 Key Insights

**The Real Value Proposition**:
We're not just showing vendors - we're **automating the tedious outreach and organization** that wastes 20+ hours.

**The Pricing Sweet Spot**:
$29/mo feels like a **wedding planning tool** (affordable)
Not like a **wedding planner** (expensive)

**The Moat**:
Once a couple enters their data and contacts vendors through us, they're **locked in for their entire planning journey** (6-12 months).

**The Flywheel**:
More users → More data on vendor responses → Better AI → Better matches → More conversions

---

## ✅ Next Steps - Your Decision

**Option 1: Build AI Vendor Research Tool First**
- Faster vendor database growth
- Can add 100+ vendors in a weekend
- Focuses on coverage before monetization

**Option 2: Build Paywall & Pro Features First**
- Start generating revenue immediately
- Validate willingness to pay
- Can expand regions slower

**Option 3: Hybrid - Do Both**
- Build simple AI research tool (4 hours)
- Add 150 vendors to 4 regions (6 hours)
- Build basic paywall + Stripe (8 hours)
- **Launch paid product in 2 weeks**

---

## 🤔 Questions for You

1. **Pricing comfort**: Does $29/mo for Pro feel right? Too high? Too low?

2. **Free tier**: Should free users be able to contact 1-2 vendors? Or none?

3. **Premium tier**: Worth building now, or wait until Pro is proven?

4. **Vendor research**: Manual, AI-assisted, or build self-service first?

5. **Launch timeline**: Soft launch in 1 week, or wait 2-3 weeks for more features?

**What do you think? Which direction feels right?**
