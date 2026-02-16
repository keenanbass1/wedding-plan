# 🎯 Product Strategy: AI Assistant & Vendor Data

**Date:** February 16, 2026
**Status:** Planning Phase - Review Before Implementation

---

## 🤔 Problem Statement

### **Issue 1: AI Assistant Has No Clear Purpose**
- Currently asks same questions as questionnaire (redundant)
- Doesn't save chat responses to database
- Not leveraging AI capabilities effectively
- Confusing user experience - why have both chat and form?

### **Issue 2: Only 1 Vendor Showing (Should Be 45)**
- Database has vendors, but matching algorithm may be too strict
- Need real, verified vendor data with:
  - URLs, pricing, contact info
  - Reviews (Google/verified sources)
  - Standardized structure
- No clear expansion strategy
- Risk of technical debt if rushed

---

## 💡 **SOLUTION 1: Reimagine AI Assistant as Agent**

### **New Purpose: Intelligent Wedding Planning Assistant**

Instead of asking questionnaire questions, the AI becomes an **intelligent agent** that can:

#### **Core Capabilities:**

1. **Conversational Preference Updates** 🔄
   ```
   User: "Actually, I want to change my budget to $50k"
   AI: "I've updated your budget to $50,000. Let me find vendors that match..."
   → Actually updates database via API
   ```

2. **Explain Recommendations** 💬
   ```
   User: "Why did you recommend this venue?"
   AI: "Hunter Valley Estate matches because:
        - Located in Hunter Valley (your preference)
        - Can accommodate 100 guests (your count)
        - $8k-$12k range (within your $60k total budget)
        - Rustic style (your choice)
        - Rated 4.8/5 with great reviews"
   ```

3. **Wedding Planning Guidance** 📚
   ```
   User: "When should I book my photographer?"
   AI: "For your June 2027 wedding, I'd recommend:
        - Book photographer NOW (12-18 months ahead)
        - Book venue first (if not done)
        - Photographer rates may increase closer to date..."
   ```

4. **Platform Navigation Help** 🧭
   ```
   User: "How do I contact vendors?"
   AI: "You can contact vendors in two ways:
        1. Visit /vendors, select vendors, and I'll send personalized emails
        2. Click 'Contact' on any vendor card for their direct info..."
   ```

5. **Intelligent Q&A** 🎓
   ```
   User: "What's included in a typical photography package?"
   AI: "Based on Hunter Valley photographers, typical packages include:
        - 6-8 hours coverage
        - 300-500 edited photos
        - Online gallery
        - Prices range $2,500-$6,000
        Would you like me to show you our top-rated photographers?"
   ```

### **Technical Architecture:**

```typescript
// AI Agent with Tool Use (Claude Function Calling)
const tools = [
  {
    name: "update_wedding_preferences",
    description: "Update user's wedding preferences (budget, date, location, style, etc.)",
    input_schema: {
      type: "object",
      properties: {
        field: { type: "string", enum: ["budget", "date", "location", "guestCount", "style"] },
        value: { type: "string" }
      }
    }
  },
  {
    name: "search_vendors",
    description: "Search for vendors matching specific criteria",
    input_schema: {
      type: "object",
      properties: {
        category: { type: "string" },
        filters: { type: "object" }
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
      }
    }
  }
]
```

### **Implementation Plan:**

**Phase 1: Remove Redundancy** (1 day)
- Remove questionnaire questions from chat
- Chat now starts: "Hi! I'm your wedding planning assistant. I can help you update preferences, explain recommendations, or answer wedding planning questions. What would you like to know?"

**Phase 2: Add Update Capability** (2 days)
- Implement tool calling for database updates
- User can conversationally change budget, date, style, etc.
- AI confirms changes and refreshes vendor matches

**Phase 3: Add Intelligence** (3 days)
- Wedding planning knowledge base
- Vendor explanation capabilities
- Platform guidance

---

## 💡 **SOLUTION 2: Vendor Data Strategy**

### **Why Only 1 Vendor Shows:**

**Diagnosis Needed:** Check in Prisma Studio (http://localhost:5555):
1. How many vendors exist in Vendor table?
2. What are their `location` values?
3. What location did you select in questionnaire?

**Likely Issues:**
- Location mismatch (e.g., "Hunter Valley" vs "Hunter Valley, NSW")
- Match score threshold too high
- Category filter too strict

### **Current Vendor Schema (Already Good!):**

```prisma
model Vendor {
  // ✅ Already have:
  name, businessName, category
  email, phone, website
  location, region, suburb, state, address
  priceMin, priceMax, priceDescription, priceRange
  maxGuests, servicesOffered
  styles, description
  rating, verified, responseRate

  // ❌ Missing:
  googlePlaceId        String?
  googleRating         Float?
  googleReviewCount    Int?
  googleReviews        Json? // Top 3-5 reviews
  portfolioImages      String[] // URLs to images
  instagramHandle      String?
  facebookUrl          String?
  videoUrl             String? // Showreel/tour
  yearsInBusiness      Int?
  awardsWon            String[]
  availability         Json? // Calendar data
}
```

### **Data Sources Strategy:**

#### **Option A: Manual Curation (Recommended for MVP)**
**Pros:**
- Highest quality data
- Verified and trustworthy
- Full control

**Cons:**
- Time-consuming
- Doesn't scale well

**Process:**
1. Research top vendors in each region (Google, WeddingWire, EasyWeddings)
2. Manually collect:
   - Contact info from their website
   - Pricing from inquiry/public info
   - Reviews from Google
   - Portfolio images from website
3. Standardize in spreadsheet
4. Import via script

**Effort:** ~30 vendors/day with 1 person

#### **Option B: Google Places API**
**Pros:**
- Automated
- Reviews included
- Up-to-date

**Cons:**
- Requires API key ($200 free credit/month)
- Not all vendors on Google
- Limited wedding-specific data

**Process:**
1. Search Google Places for "wedding venue hunter valley"
2. Extract: name, address, phone, website, rating, reviews
3. Manual enrichment for pricing/services
4. Store in database

#### **Option C: Hybrid Approach** ⭐ **RECOMMENDED**
1. **Start with manual** (20-30 curated vendors per region)
2. **Enrich with Google API** (reviews, ratings, updated contact)
3. **Ongoing curation** (add 5-10 vetted vendors/month)

### **Vendor Expansion Roadmap:**

| Region | Priority | Vendor Target | Timeline |
|--------|----------|---------------|----------|
| Hunter Valley | ✅ Current | 45 vendors | Done |
| Newcastle | 🔄 Verify | 20 vendors | Current |
| Blue Mountains | High | 30 vendors | March 2026 |
| South Coast | Medium | 25 vendors | April 2026 |
| Sydney Metro | High | 50 vendors | May 2026 |

### **Data Structure Standardization:**

```typescript
// Vendor Data Entry Template
interface VendorEntry {
  // Required
  name: string
  category: 'VENUE' | 'PHOTOGRAPHER' | 'CATERING' | 'FLORIST' | 'ENTERTAINMENT'
  location: string // City/Area: "Hunter Valley"
  region: string   // Broader region: "Hunter Valley"
  suburb?: string  // Specific suburb: "Pokolbin"

  // Contact (at least 2 required)
  email: string
  phone?: string
  website: string

  // Pricing (required)
  priceMin: number // In cents
  priceMax: number
  priceDescription?: string // "Packages from $X - $Y"

  // Services (required)
  description: string // 100-300 words
  servicesOffered: string[] // ["Full day coverage", "Drone shots", etc.]
  styles: string[] // ["Rustic", "Modern", etc.]

  // Optional but valuable
  maxGuests?: number // For venues
  rating?: number // 0-5
  verified: boolean // Manual verification

  // Nice to have
  googlePlaceId?: string
  portfolioImages?: string[]
  instagramHandle?: string
}
```

### **Data Quality Checklist:**

Before adding a vendor, verify:
- [ ] Website is live and active
- [ ] Contact email/phone works (test message)
- [ ] Pricing is current (within 6 months)
- [ ] Reviews are real (cross-check Google)
- [ ] Location is accurate
- [ ] Services described match their offerings
- [ ] No duplicates in database

### **Implementation Plan:**

**Phase 1: Debug Current Issue** (1 day)
1. Check Prisma Studio - verify vendors exist
2. Test matching algorithm with different locations
3. Fix any matching logic bugs
4. Verify all 45 vendors show correctly

**Phase 2: Enhance Schema** (1 day)
1. Add missing fields (Google data, portfolio, social)
2. Run migration
3. Update TypeScript types

**Phase 3: Data Collection Process** (Ongoing)
1. Create vendor research spreadsheet template
2. Research top 30 vendors per region
3. Collect all required data
4. Verify and standardize
5. Import via script

**Phase 4: Google Integration** (2 days)
1. Set up Google Places API
2. Create enrichment script
3. Pull reviews/ratings for existing vendors
4. Schedule monthly refresh

---

## 🎯 **Recommended Next Steps**

### **Immediate (This Week):**
1. ✅ **Debug vendor display issue**
   - Check Prisma Studio
   - Fix matching algorithm if needed
   - Verify 45 vendors show

2. ✅ **Simplify AI chat**
   - Remove redundant questionnaire
   - Add basic conversational capabilities

### **Short Term (Next 2 Weeks):**
3. **Upgrade AI to agent**
   - Add database update capabilities
   - Implement tool calling
   - Test conversational updates

4. **Standardize vendor data**
   - Enhance schema with missing fields
   - Create data entry process
   - Audit existing 45 vendors

### **Medium Term (Month 1):**
5. **Expand vendor database**
   - Blue Mountains: 30 vendors
   - Verify Newcastle: 20 vendors
   - Google API integration for reviews

6. **Polish AI assistant**
   - Wedding planning knowledge
   - Better vendor explanations
   - Platform guidance

### **Long Term (Month 2-3):**
7. **Scale vendor operations**
   - Sydney Metro: 50 vendors
   - South Coast: 25 vendors
   - Automated monitoring for stale data

---

## 📊 **Success Metrics**

### **AI Assistant:**
- User asks assistant to update preferences (vs going to form)
- User asks "why" questions about recommendations
- User gets answers without leaving chat
- Reduction in support questions

### **Vendor Data:**
- Vendors showing: 45+ Hunter Valley, 20+ Newcastle
- Average vendor rating: 4.5+
- Data freshness: <6 months old
- User clicks through to vendor websites: >30%

---

## ⚠️ **Avoid These Pitfalls**

1. **Don't** scrape vendor data without permission
2. **Don't** add unverified vendors (damages trust)
3. **Don't** make AI too complex (keep it helpful)
4. **Don't** duplicate vendor records
5. **Don't** skip data validation

---

## 🤔 **Decision Points - Your Input Needed**

1. **AI Assistant Scope:**
   - Should it update preferences? (Recommended: YES)
   - Should it book vendors? (Recommended: NO, too complex)
   - Should it draft custom emails? (Recommended: YES)

2. **Vendor Data:**
   - Manual curation or Google API? (Recommended: HYBRID)
   - How many vendors per region? (Recommended: 20-50)
   - Premium vendors only or all tiers? (Recommended: ALL TIERS)

3. **Timeline:**
   - Focus on AI first, then vendors? (Recommended: YES)
   - Or fix vendors first? (Also valid)

---

**Let's discuss priorities and I'll implement based on your decisions!** 🚀
