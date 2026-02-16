# 🗺️ Product Roadmap: Wedding Plan AI

**Last Updated:** February 16, 2026

This document tracks future features and enhancements planned for post-MVP release.

---

## 🎯 MVP Status (Current)

**Core Features Completed:**
- ✅ AI-powered wedding questionnaire
- ✅ Vendor matching algorithm (42 vendors: Newcastle + Hunter Valley)
- ✅ Authentication (email/password + Google OAuth)
- ✅ Chat interface for wedding planning
- ✅ Vendor browsing and selection
- ✅ Email outreach system (Resend API integration)
- ✅ Dashboard for tracking outreach
- ✅ Response tracking and management

**Pending for MVP:**
- ⏳ Google OAuth debugging (redirects to home page)
- ⏳ Resend webhook configuration (email delivery tracking)
- ⏳ End-to-end testing
- ⏳ Logout button on dashboard

---

## 📅 Post-MVP Feature Backlog

### **Phase 1: Enhanced User Experience (Month 1-2)**

#### 1.1 Interactive Vendor Map 🗺️
**Priority:** Medium | **Effort:** 2-3 days

**Description:**
Display all matched vendors on an interactive map so users can visualize vendor locations geographically.

**User Story:**
*"As a user planning a wedding, I want to see where all my matched vendors are located on a map, so I can understand travel distances and choose vendors that are convenient to my venue."*

**Technical Approach:**
- **Map Library:** Mapbox GL JS or Google Maps JavaScript API
- **Data:** Use existing `latitude`/`longitude` fields in Vendor model (currently nullable)
- **Features:**
  - Pin each vendor on map with category icon (📍 venue, 📸 photographer, etc.)
  - Cluster markers when zoomed out
  - Click pin → Show vendor card popup
  - Filter by category (show only venues, only photographers, etc.)
  - "Draw circle" tool to filter vendors within X km of venue

**Implementation Steps:**
1. Add geocoding for vendors without lat/long (Google Geocoding API)
2. Create `/vendors/map` page with map component
3. Add map view toggle to vendor browsing page
4. Implement marker clustering for dense areas
5. Add distance calculations (vendor to venue)

**Dependencies:**
- Google Maps API key or Mapbox API key
- Geocoding all existing vendors (one-time task)
- Prisma schema already has latitude/longitude fields ✅

**Future Enhancements:**
- Show "venue + photographer together" suggestions (vendors within 10km of selected venue)
- "Route planner" - optimal order to visit vendors for meetings
- Traffic/drive time estimates (Google Maps Directions API)

---

#### 1.2 AI Assistant as Agentic Tool 🤖
**Priority:** High | **Effort:** 3-4 days

**Description:**
Upgrade AI chat from question-asking to intelligent agent that can update data, explain recommendations, and provide wedding planning guidance.

**Current Status (Simple Version):**
✅ Removed redundant questionnaire from chat
✅ Focuses on help, explanations, and guidance
✅ Quick action buttons for common questions

**Features to Add (Agentic Version):**

**1. Conversational Database Updates**
```
User: "Change my budget to $50k"
AI: "I've updated your budget to $50,000. Let me refresh your vendor matches..."
→ Actually updates Wedding record in database
→ Re-runs matching algorithm
→ Shows new matches
```

**2. Explain Vendor Recommendations**
```
User: "Why did you recommend Caves Coastal?"
AI: "Caves Coastal is a great match because:
     • Located in Newcastle (your preference)
     • Can accommodate 75 guests (your count)
     • $12k package fits your $40k budget
     • Rustic coastal style matches your vision
     • Rated 4.8/5 with excellent reviews"
```

**3. Search for Specific Vendors**
```
User: "Show me photographers under $3k"
AI: [Uses search_vendors tool with filters]
    "I found 3 photographers in your budget..."
```

**4. Draft Custom Emails**
```
User: "Write an email asking about outdoor ceremony options"
AI: [Generates personalized email with specific question]
    "Here's a draft email... [editable content]"
```

**5. Extract Quotes from Responses**
```
User: "A vendor replied with their pricing"
AI: [Reads email, extracts key info]
    "I see they're offering:
     • Full package: $12,000
     • Includes: ceremony, reception, 8hr access
     • Available on your date: June 14, 2027"
```

**6. Wedding Planning Knowledge**
```
User: "When should I book my photographer?"
AI: "For your June 2027 wedding, I'd recommend:
     • Book NOW (12-18 months ahead)
     • Top photographers book up fast
     • Prices may increase closer to date..."
```

**Technical Implementation:**

**Step 1: Add Tool Definitions** (1 day)
```typescript
// /lib/ai/tools.ts
export const AI_TOOLS = [
  {
    name: "update_wedding_preferences",
    description: "Update user's wedding preferences (budget, date, location, style, etc.)",
    input_schema: {
      type: "object",
      properties: {
        field: {
          type: "string",
          enum: ["budget", "date", "location", "guestCount", "style"]
        },
        value: { type: "string" }
      },
      required: ["field", "value"]
    }
  },
  {
    name: "search_vendors",
    description: "Search for vendors matching specific criteria",
    input_schema: {
      type: "object",
      properties: {
        category: { type: "string" },
        maxPrice: { type: "number" },
        minRating: { type: "number" },
        styles: { type: "array", items: { type: "string" } }
      }
    }
  },
  {
    name: "explain_recommendation",
    description: "Explain why a specific vendor was recommended",
    input_schema: {
      type: "object",
      properties: {
        vendorId: { type: "string" }
      },
      required: ["vendorId"]
    }
  },
  {
    name: "get_wedding_planning_timeline",
    description: "Get recommended timeline for booking vendors",
    input_schema: {
      type: "object",
      properties: {
        weddingDate: { type: "string" }
      }
    }
  }
]
```

**Step 2: Update Chat API** (1 day)
```typescript
// /app/api/chat/route.ts
import Anthropic from '@anthropic-ai/sdk'
import { AI_TOOLS } from '@/lib/ai/tools'

export async function POST(req: NextRequest) {
  const { messages } = await req.json()

  const response = await anthropic.messages.create({
    model: process.env.CLAUDE_MODEL!,
    max_tokens: 2000,
    tools: AI_TOOLS,  // Enable tool use
    messages
  })

  // Check if AI wants to use a tool
  if (response.stop_reason === 'tool_use') {
    const toolUse = response.content.find(c => c.type === 'tool_use')

    // Execute the tool
    const toolResult = await executeTool(toolUse.name, toolUse.input)

    // Send result back to AI
    const finalResponse = await anthropic.messages.create({
      model: process.env.CLAUDE_MODEL!,
      max_tokens: 2000,
      tools: AI_TOOLS,
      messages: [
        ...messages,
        { role: 'assistant', content: response.content },
        {
          role: 'user',
          content: [{
            type: 'tool_result',
            tool_use_id: toolUse.id,
            content: JSON.stringify(toolResult)
          }]
        }
      ]
    })

    return finalResponse
  }

  return response
}
```

**Step 3: Tool Execution Functions** (1 day)
```typescript
// /lib/ai/execute-tool.ts
export async function executeTool(toolName: string, input: any) {
  switch (toolName) {
    case 'update_wedding_preferences':
      return await updatePreferences(input)

    case 'search_vendors':
      return await searchVendors(input)

    case 'explain_recommendation':
      return await explainVendor(input.vendorId)

    case 'get_wedding_planning_timeline':
      return await getTimeline(input.weddingDate)
  }
}

async function updatePreferences({ field, value }: any) {
  // Get current user's wedding
  const wedding = await prisma.wedding.findFirst({
    where: { userId: currentUser.id }
  })

  // Update the field
  const updated = await prisma.wedding.update({
    where: { id: wedding.id },
    data: { [field]: value }
  })

  // Re-run matching
  const matches = await findMatchingVendors({
    location: updated.location,
    guestCount: updated.guestCount,
    budgetTotal: updated.budgetTotal,
    style: updated.style
  })

  return {
    success: true,
    newMatches: matches.totalMatches,
    message: `Updated ${field} to ${value}. Found ${matches.totalMatches} new matches.`
  }
}
```

**Step 4: Frontend Updates** (0.5 days)
- ChatInterface already handles streaming
- Add loading states for tool execution
- Show "Updating database..." spinner
- Display tool results in chat

**Dependencies:**
- ✅ Claude API already integrated
- ✅ Streaming chat already working
- ⏳ Need to add tool definitions
- ⏳ Need to add tool execution logic
- ⏳ Need to handle multi-step tool use

**Testing Scenarios:**
1. "Change my budget to $45,000" → Updates DB, shows new matches
2. "Why is this venue recommended?" → Explains match score breakdown
3. "Show me photographers under $3k" → Filters and displays results
4. "When should I book my florist?" → Provides timeline guidance
5. "Write an email asking about vegan menu options" → Generates custom email

**Future Enhancements:**
- Multi-step reasoning (book venue first, then find nearby photographers)
- Calendar integration (check availability automatically)
- Budget tracking ("How much have I spent so far?")
- Quote comparison ("Which venue is cheapest?")

**See:** PRODUCT_STRATEGY.md for original analysis and decision rationale

---

#### 1.3 Vendor Portfolio Gallery 🖼️
**Priority:** Medium | **Effort:** 2 days

**Description:**
Rich media gallery for each vendor with photos, videos, virtual tours.

**Features:**
- Image carousel for vendor portfolios
- Video showreels (YouTube/Vimeo embeds)
- 360° virtual venue tours (for venues)
- Instagram feed integration
- Before/after photos (for florists, caterers)

**Data Requirements:**
- Add `portfolioImages: String[]` to Vendor schema (planned in PRODUCT_STRATEGY.md)
- Add `videoUrl: String?` field
- Add `instagramHandle: String?` field
- Add `virtualTourUrl: String?` field

---

#### 1.4 Advanced Filtering & Search 🔍
**Priority:** Medium | **Effort:** 2 days

**Description:**
Sophisticated filtering for vendor discovery.

**Features:**
- Price range slider
- Guest capacity slider
- Distance from venue slider
- Style multi-select (Rustic, Modern, Coastal, etc.)
- Amenities/features filter (Outdoor ceremony, Bridal suite, etc.)
- "Favorites only" filter
- Sort by: match score, price, rating, distance

---

### **Phase 2: Wedding Planning Tools (Month 3-4)**

#### 2.1 Budget Tracker 💰
**Priority:** High | **Effort:** 3-4 days

**Description:**
Visual budget management across all vendor categories.

**Features:**
- Total budget vs. allocated budget pie chart
- Category breakdown (venue 40%, catering 25%, etc.)
- Track quotes received vs. budget
- Overspend warnings
- Budget suggestions based on region

---

#### 2.2 Wedding Timeline Planner 📅
**Priority:** Medium | **Effort:** 3-4 days

**Description:**
Task checklist and timeline for wedding preparation.

**Features:**
- 12-month countdown timeline
- Category-based tasks (book venue 10-12 months out, book photographer 8-10 months, etc.)
- Auto-populate based on wedding date
- Email reminders for upcoming tasks
- Integration with vendor booking status

---

#### 2.3 Guest List Manager 👥
**Priority:** Low | **Effort:** 4-5 days

**Description:**
Manage guest list, RSVPs, dietary restrictions.

**Features:**
- Guest database with contact info
- RSVP tracking (attending, declined, pending)
- Dietary restrictions tracking
- Seating chart tool (future)
- Send save-the-dates (Resend integration)

---

#### 2.4 Quote Comparison Tool 📊
**Priority:** Medium | **Effort:** 2-3 days

**Description:**
Side-by-side comparison of vendor quotes.

**Features:**
- Compare 2-3 vendors at once
- Highlight price differences
- Feature comparison (what's included/excluded)
- AI-powered quote analysis (extract details from emails)
- Export comparison as PDF

---

### **Phase 3: Advanced Features (Month 5-6)**

#### 3.1 Payment Integration 💳
**Priority:** Medium | **Effort:** 5-7 days

**Description:**
Stripe Connect integration for vendor deposits and payments.

**Features:**
- Pay deposits to vendors directly through platform
- Payment tracking and invoices
- Vendor gets paid, platform takes commission
- Escrow protection for deposits

**Monetization:**
- 3-5% platform fee on vendor payments
- Or subscription model (free for users, vendors pay)

---

#### 3.2 SMS Notifications 📱
**Priority:** Low | **Effort:** 2 days

**Description:**
Twilio integration for SMS updates.

**Features:**
- Vendor response notifications
- Reminder texts (1 week before meeting with photographer)
- Quote received alerts

**Cost:** Twilio pricing ~$0.01/SMS

---

#### 3.3 Vendor Self-Service Portal 🏢
**Priority:** Low | **Effort:** 7-10 days

**Description:**
Allow vendors to create/manage their own profiles.

**Features:**
- Vendor signup flow
- Edit services, pricing, availability
- Upload portfolio images
- Respond to inquiries directly
- Dashboard with lead tracking

**Monetization:**
- Free basic listing
- Premium listing with priority placement ($50-$100/month)

---

#### 3.4 Mobile App 📱
**Priority:** Low | **Effort:** 15-20 days

**Description:**
React Native mobile app (iOS + Android).

**Features:**
- All web features in mobile format
- Push notifications for vendor responses
- Photo uploads for inspiration boards
- Offline access to vendor list

---

### **Phase 4: Data & Intelligence (Ongoing)**

#### 4.1 Vendor Data Expansion 🌏
**Priority:** High | **Effort:** Ongoing

**Plan:**
| Region | Vendor Target | Timeline |
|--------|---------------|----------|
| ✅ Hunter Valley | 25 vendors | Done |
| ✅ Newcastle | 17 vendors | Done |
| 🔄 Blue Mountains | 30 vendors | Month 1 |
| 🔄 South Coast | 25 vendors | Month 2 |
| 🔄 Sydney Metro | 50 vendors | Month 3 |
| 🔄 Byron Bay | 20 vendors | Month 4 |
| 🔄 Brisbane | 40 vendors | Month 5 |
| 🔄 Melbourne | 60 vendors | Month 6 |

**See:** PRODUCT_STRATEGY.md for data collection strategy

---

#### 4.2 Google Reviews Integration ⭐
**Priority:** Medium | **Effort:** 2 days

**Description:**
Pull and display Google Reviews for each vendor.

**Features:**
- Google Places API integration
- Display rating (4.8/5.0) with review count
- Show top 3-5 reviews
- Link to "See all reviews on Google"
- Automated monthly refresh

**Cost:** Google Places API - $17 per 1,000 requests (free $200/month credit)

---

#### 4.3 AI Trend Analysis 📈
**Priority:** Low | **Effort:** 3-4 days

**Description:**
Analyze weddings in the database to provide trend insights.

**Features:**
- "Most popular styles this season"
- "Average budget in Sydney"
- "Top-rated vendors by category"
- Personalized suggestions based on similar weddings

---

## 🎨 Design & UX Improvements

#### Polish & Refinements
- [ ] Loading skeletons for vendor cards
- [ ] Empty states (no vendors found, no favorites yet)
- [ ] Error states (API failures, network errors)
- [ ] Accessibility audit (WCAG 2.1 AA compliance)
- [ ] Mobile responsiveness improvements
- [ ] Dark mode support
- [ ] Custom 404/500 error pages

---

## 🔧 Technical Debt & Infrastructure

#### Performance
- [ ] Image optimization (Next.js Image component)
- [ ] Vendor search results caching (Redis)
- [ ] Database indexing optimization
- [ ] Lazy loading for vendor galleries

#### Security
- [ ] Rate limiting on API routes
- [ ] Input sanitization audit
- [ ] SQL injection prevention review
- [ ] CSRF protection
- [ ] Security headers (CSP, HSTS)

#### DevOps
- [ ] Staging environment (separate Supabase project)
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Automated tests (unit + integration)
- [ ] Error tracking (Sentry)
- [ ] Analytics (PostHog or Plausible)

---

## 📊 Analytics & Metrics

**Future Tracking:**
- User signups per week
- Vendor matches generated
- Emails sent via outreach
- Response rates from vendors
- Conversion: signup → outreach → booking
- Most popular vendor categories
- Average budget by region
- Drop-off points in user journey

---

## 💡 Feature Requests & Ideas

**Parking Lot:**
- Wedding inspiration boards (Pinterest-style)
- Collaborative planning (share with partner/family)
- Vendor availability calendar
- Contract templates
- Wedding website builder
- Registry integration
- Guest book (digital signatures)
- Photo sharing after wedding
- Vendor referral program
- Wedding day timeline builder
- Seating chart generator

---

## 🗳️ Feature Voting

**Community-Driven Priorities:**

Once we have users, we can add a feature voting system:
- Users suggest features
- Community votes on priorities
- Top-voted features get built first

---

## 🛠️ How to Use This Roadmap

1. **Adding Features:**
   - Add new ideas to appropriate phase
   - Include: priority, effort estimate, description
   - Link to detailed specs if available

2. **Prioritization:**
   - High priority = user-facing, high impact
   - Medium priority = valuable but not urgent
   - Low priority = nice-to-have

3. **Effort Estimates:**
   - 1-2 days = quick win
   - 3-5 days = medium feature
   - 7+ days = major feature

4. **Moving Features:**
   - When starting work, create Task via TaskCreate
   - When completed, mark with ✅
   - If abandoned/deprioritized, add note why

---

**Next Step:** Get user feedback on which Phase 1 features to prioritize! 🚀
