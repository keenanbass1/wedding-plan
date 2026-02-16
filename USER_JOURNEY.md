# 🗺️ User Journey Map: Wedding Plan AI

**Last Updated:** February 16, 2026
**Philosophy:** Unix-like approach - small jobs done well, chained together with full transparency

---

## 🎯 Core Principle

**NOT a black box** → User sees every step of the process
**Time-saving automation** → Clear value at every stage
**Transparent chain** → Individual components work perfectly, combine seamlessly

---

## 👤 User Journey: Complete Flow

### **Stage 1: Discovery & Signup**

#### 1.1 Landing Page (`/`)
**Goal:** Communicate value proposition clearly

**User sees:**
- "Automate your wedding vendor search and outreach"
- How it works: 3 simple steps
- Sample vendor matches
- Clear pricing (if applicable)

**User actions:**
- Click "Get Started" → Redirects to signup

**Transparency:**
- Show exactly what the platform does
- No hidden features or surprise costs

---

#### 1.2 Signup (`/auth/signup`)
**Goal:** Create account with minimal friction

**User actions:**
- Enter email + password OR
- Sign in with Google

**What happens (visible to user):**
1. Account created ✅
2. Verification email sent (if email/password)
3. Redirect to questionnaire

**Transparency:**
- Clear message: "Check your email to verify"
- If Google OAuth: instant access

**Current Status:**
- ✅ Email/password signup works
- ⚠️ Google OAuth redirects to home page (needs debugging)

---

### **Stage 2: Data Collection**

#### 2.1 Questionnaire (`/questionnaire`)
**Goal:** Gather wedding requirements in elegant, engaging way

**User sees:**
- Progress indicator (Step 1 of 7)
- Beautiful wedding-themed UI with animations
- Button-based options (no typing required)

**Questions asked:**
1. Wedding date (specific or flexible)
2. Location (region selection)
3. Guest count
4. Total budget
5. Style preference
6. Dietary requirements (optional)
7. Accessibility needs (optional)

**What happens behind the scenes:**
- Data saved to Wedding table in database
- No AI API calls yet (just form data collection)

**Transparency:**
- User sees progress: "Step 3 of 7"
- Can go back and change answers
- Clear "Save & Continue" button

**Current Status:**
- ✅ Questionnaire working with date picker
- ✅ Data saves to database
- ✅ Input visibility fixed

**Time saved:** 0 minutes (user still providing input)
**Value:** Structured data collection for better matches

---

#### 2.2 Questionnaire Complete
**User sees:**
- "Thanks! Finding your perfect vendors..."
- Loading animation
- Redirect to dashboard or results

**What happens:**
1. Wedding record marked as "MATCHING" status
2. Redirect to `/vendors` or `/dashboard`

---

### **Stage 3: Vendor Discovery**

#### 3.1 Vendor Matching Algorithm
**Goal:** Find 15-30 relevant vendors automatically

**What happens (behind the scenes):**
- `findMatchingVendors()` runs with user's criteria
- Algorithm scores each vendor (0-100)
- Groups by category (venues, photographers, caterers, etc.)
- Returns top 5 per category

**Transparency - User should see:**
- Match score explanation: "95/100 - Great match!"
- Reasons why vendor matched:
  - "Located in Newcastle (your preference)"
  - "Can accommodate 75 guests"
  - "Rustic style matches your vision"
  - "Within your $40k budget"

**Current Status:**
- ✅ Algorithm working perfectly
- ✅ Scores 100/100 for perfect matches
- ⚠️ Only shows top 5 per category (could show all matches)

**Time saved:** ~2 hours (vs manually researching vendors)

---

#### 3.2 Vendor Browsing (`/vendors`)
**Goal:** Let user explore matches and select vendors to contact

**User sees:**
- Grid of vendor cards grouped by category
- Each card shows:
  - Vendor name + photo
  - Location + distance from venue (future)
  - Price range
  - Rating (4.8/5.0)
  - Match score + reasons
  - Website link, phone number
  - Checkbox to select

**User actions:**
- Check/uncheck vendors to select
- "Select All Venues" button
- Click vendor card → Expand details
- View portfolio images (future)
- Filter by category, price, distance (future)

**Transparency:**
- Selection counter: "8 vendors selected"
- Sticky button: "Contact Selected Vendors (8)"
- User sees exactly who they're contacting

**Current Status:**
- ✅ Vendor cards display correctly
- ✅ Grouping by category
- ⚠️ Selection UI exists but needs polish
- ❌ No photos/portfolios yet

**Time saved:** ~1 hour (vs visiting 20+ vendor websites)

---

### **Stage 4: Automated Outreach**

#### 4.1 Email Preview (`/outreach/preview`)
**Goal:** User reviews and approves emails before sending

**THIS IS CRITICAL FOR TRANSPARENCY**

**User sees:**
- List of all selected vendors
- For each vendor:
  - Generated email subject
  - Full email body (AI-generated, personalized)
  - Edit button (can modify before sending)
  - Remove button (exclude vendor)

**Email content visible:**
```
Subject: Wedding Inquiry - June 14, 2027

Hi [Vendor Name],

My name is Sarah and I'm planning my wedding for June 14, 2027
in Newcastle. I came across your [venue/services] and was really
impressed by your rustic style and beautiful portfolio.

Details:
- Date: June 14, 2027
- Location: Newcastle
- Guest Count: 75
- Budget: $40,000 total
- Style: Rustic & Outdoor

I'd love to know:
1. Are you available on this date?
2. What packages do you offer?
3. Pricing information

Looking forward to hearing from you!

Best regards,
Sarah
```

**User actions:**
- Click "Edit" → Modify email content
- Click "Remove" → Don't contact this vendor
- Click "Send All (8 emails)" → Confirmation dialog

**Transparency:**
- User sees EXACTLY what will be sent
- Can edit every word
- No black box email generation

**Current Status:**
- ✅ Email generation API endpoint exists
- ✅ Preview page exists
- ⚠️ Needs testing with real data

**Time saved:** ~3 hours (vs writing 20+ personalized emails)

---

#### 4.2 Batch Send
**Goal:** Send all approved emails at once

**User action:**
- Click "Send All" → Confirmation dialog
- "Are you sure you want to send 8 emails?"
- Click "Yes, Send Now"

**What happens (visible to user):**
1. Loading spinner: "Sending emails..."
2. Progress: "Sent 3 of 8..."
3. Success message: "✅ 8 emails sent successfully!"
4. Redirect to dashboard

**What happens (behind the scenes):**
1. POST to `/api/outreach/send-batch`
2. Resend batch API sends all emails
3. VendorOutreach records created in database
4. Each record gets Resend email ID for tracking

**Transparency:**
- User sees confirmation before sending
- User sees progress during send
- User gets clear success confirmation

**Current Status:**
- ✅ Batch send API endpoint exists
- ✅ Resend API configured
- ⚠️ Needs end-to-end testing

**Time saved:** ~30 minutes (vs sending emails one by one)

**Total time saved so far: ~6.5 hours**

---

### **Stage 5: Response Tracking**

#### 5.1 Dashboard (`/dashboard`)
**Goal:** Central hub for tracking all vendor communications

**User sees:**

**Summary Cards:**
- Total vendors contacted: 8
- Responses received: 3
- Quotes received: 2
- Pending: 5

**Recent Activity Timeline:**
- ✅ 2 hours ago: Caves Coastal responded
- ✅ Yesterday: Noah's on the Beach responded
- 📧 2 days ago: Sent 8 vendor emails
- 🎯 3 days ago: Completed questionnaire

**Quick Actions:**
- "Contact More Vendors"
- "View All Responses"
- "Compare Quotes"

**Transparency:**
- Clear status for each vendor
- Timeline shows what happened when
- No hidden actions

**Current Status:**
- ✅ Dashboard page exists
- ⚠️ Needs real data integration
- ❌ Timeline not implemented yet

---

#### 5.2 Outreach Tracking (`/dashboard/outreach`)
**Goal:** Detailed view of every vendor contacted

**User sees:**
- Table of all contacted vendors

| Vendor | Category | Status | Sent | Delivered | Opened | Response |
|--------|----------|--------|------|-----------|--------|----------|
| Caves Coastal | Venue | ✅ Responded | Feb 16 | Feb 16, 10:05am | Feb 16, 11:30am | ✅ Yes |
| Noah's Beach | Venue | 📧 Opened | Feb 16 | Feb 16, 10:05am | Feb 16, 2:15pm | ⏳ Pending |
| Cavanagh Photo | Photographer | 📤 Delivered | Feb 16 | Feb 16, 10:06am | - | ⏳ Pending |

**Filters:**
- All / Responded / Pending / No Response
- Sort by: Date, Category, Status

**Click any vendor → View details**

**Transparency:**
- User sees exact delivery/open times (via webhooks)
- Clear status for each vendor
- Can drill down for full details

**Current Status:**
- ✅ Tracking page exists
- ⚠️ Webhook integration pending
- ❌ Open tracking not working yet

---

#### 5.3 Individual Vendor Details (`/dashboard/outreach/[vendorId]`)
**Goal:** Complete conversation history with one vendor

**User sees:**

**Email Sent (Expandable):**
```
Subject: Wedding Inquiry - June 14, 2027
Sent: Feb 16, 2026, 10:05am

[Full email content displayed]
```

**Delivery Status:**
- ✅ Delivered: Feb 16, 10:05am
- ✅ Opened: Feb 16, 11:30am (via webhook)
- ✅ Responded: Feb 16, 2:45pm

**Vendor Response (if any):**
```
Hi Sarah,

Thanks for reaching out! We'd love to host your wedding.

We're available on June 14, 2027. Our venue package includes:
- Ceremony space (outdoor or indoor)
- Reception for up to 120 guests
- Tables, chairs, linens
- 8-hour venue access
- Bridal suite

Pricing: $12,000 for the full package

Would you like to schedule a tour?

Best,
Caves Coastal Team
```

**Quote Extracted (AI-powered):**
- Amount: $12,000
- What's included: Ceremony space, reception, tables/chairs, 8hr access, bridal suite
- Availability: ✅ June 14, 2027

**User actions:**
- "Mark as Interested"
- "Archive"
- "Book Meeting" (future)
- "Add to Comparison" (future)

**Manual Response Entry (if email arrived elsewhere):**
- Textarea: "Paste vendor's response here"
- Extract quote button
- Save response

**Transparency:**
- User sees EXACTLY what was sent
- User sees EXACTLY what was received
- User sees when email was opened (not creepy, just helpful)
- All data editable if needed

**Current Status:**
- ✅ Detail page structure exists
- ⚠️ Response display needs implementation
- ❌ AI quote extraction not built yet

**Time saved:** ~2 hours (vs manually tracking in spreadsheet/email)

---

### **Stage 6: Vendor Comparison & Decision**

#### 6.1 Responses Inbox (`/dashboard/responses`)
**Goal:** See all vendor responses in one place

**User sees:**
- List of vendors who responded
- Preview of each response
- Quote amount (if provided)
- Availability status

**Sort/Filter:**
- By category (all venues, all photographers)
- By price (lowest to highest)
- By response date
- Unread first

**Transparency:**
- User sees all responses
- No hidden filtering
- Clear sorting options

**Current Status:**
- ⚠️ Not built yet (Phase 2)

---

#### 6.2 Quote Comparison (`/dashboard/compare`)
**Goal:** Side-by-side comparison of vendor quotes

**User sees:**
- Select 2-3 vendors to compare
- Table comparing:
  - Price
  - What's included
  - Availability
  - Rating
  - Distance from venue

**Example:**

| Feature | Caves Coastal | Noah's on the Beach | Customs House |
|---------|---------------|---------------------|---------------|
| **Price** | $12,000 | $15,000 | $10,000 |
| **Capacity** | 120 guests | 200 guests | 180 guests |
| **Included** | Ceremony + reception | Reception only | Ceremony + reception |
| **Availability** | ✅ June 14 | ❌ Booked | ✅ June 14 |
| **Rating** | 4.8/5 | 4.9/5 | 4.7/5 |

**User actions:**
- "Select Winner"
- "Contact for More Info"
- Export as PDF (future)

**Transparency:**
- Clear comparison of ALL factors
- No hidden scoring
- User makes final decision

**Current Status:**
- ❌ Not built yet (Phase 2)

**Time saved:** ~1 hour (vs manually comparing spreadsheets)

---

### **Stage 7: Booking & Next Steps**

#### 7.1 Vendor Selected
**Goal:** Track which vendors user chose

**User actions:**
- Mark vendor as "Selected"
- Add booking date
- Upload contract (future)
- Mark deposit paid (future)

**What happens:**
- VendorOutreach record updated
- Dashboard shows "Booked" status
- Other vendors for that category marked as "Not Selected"

**Transparency:**
- User explicitly marks vendors as selected
- Clear status changes

**Current Status:**
- ❌ Not built yet (Phase 2)

---

### **Stage 8: Wedding Planning (Future)**

#### 8.1 Timeline Planner
- Book venue: ✅ Done
- Book photographer: ⏳ In progress
- Book florist: ⏳ Pending
- Book caterer: ⏳ Pending

#### 8.2 Budget Tracker
- Total budget: $40,000
- Allocated: $27,000 (68%)
- Remaining: $13,000

---

## 🔄 Complete User Flow Summary

```
1. Sign up (2 min)
   ↓
2. Complete questionnaire (5 min)
   ↓
3. See vendor matches automatically (instant)
   ↓
4. Select vendors to contact (5 min)
   ↓
5. Review & approve email drafts (3 min)
   ↓
6. Click "Send All" (instant)
   ↓
7. Wait for responses (1-3 days)
   ↓
8. Check dashboard for responses (ongoing)
   ↓
9. Compare quotes (10 min)
   ↓
10. Book vendors (external)
```

**Total user time:** ~30 minutes active work
**Traditional approach:** ~10-15 hours of research, emailing, tracking

**Time saved:** ~9-14 hours ✨

---

## 🎨 Where Each Component Lives

### Current Pages:
- `/` - Landing page
- `/auth/login` - Login ✅
- `/auth/signup` - Signup ✅
- `/auth/callback` - OAuth callback ✅
- `/questionnaire` - Data collection ✅
- `/vendors` - Browse matches ✅
- `/outreach/preview` - Review emails ✅
- `/dashboard` - Main hub ✅
- `/dashboard/outreach` - Tracking table ✅
- `/dashboard/outreach/[id]` - Vendor detail ✅
- `/chat` - AI assistant ✅

### Future Pages:
- `/dashboard/responses` - Response inbox
- `/dashboard/compare` - Quote comparison
- `/dashboard/budget` - Budget tracker
- `/dashboard/timeline` - Planning timeline
- `/vendors/map` - Map view

---

## 🤖 AI Assistant Role (After Simple Cleanup)

**NOT a replacement for questionnaire** - that stays separate

**Purpose:**
- Answer wedding planning questions
  - "When should I book my photographer?"
  - "What's a typical catering cost per person?"
- Explain vendor recommendations
  - "Why did you recommend Caves Coastal?"
- Help navigate the platform
  - "How do I contact vendors?"
- Provide guidance
  - "What should I ask when meeting a venue?"

**What it does NOT do (in simple version):**
- Ask questionnaire questions (that's `/questionnaire`)
- Update database (that's for agentic version in roadmap)
- Book vendors (external process)

**What it WILL do (agentic version - Phase 2):**
- Update preferences conversationally
- Search for specific vendors
- Draft custom emails
- Extract quotes from responses

---

## ⚠️ Current Gaps & Issues

### Must Fix (MVP Blockers):
1. ❌ Google OAuth redirects to home page
2. ⏳ Webhook configuration for email tracking
3. ⏳ Email sending end-to-end test
4. ⏳ Logout button on dashboard
5. ⏳ Response display on vendor detail page

### Should Fix (Polish):
6. ⏳ Vendor selection persistence (checkboxes save to SavedVendor table)
7. ⏳ Email preview with real generated content
8. ⏳ Dashboard shows real stats (not hardcoded)
9. ⏳ Loading states everywhere
10. ⏳ Error handling (what if email fails to send?)

### Nice to Have (Post-MVP):
11. ⏳ Vendor photos/portfolios
12. ⏳ Map view
13. ⏳ Quote comparison tool
14. ⏳ Budget tracker
15. ⏳ Timeline planner

---

## 🧪 End-to-End Test Scenario

**User:** Sarah, planning Newcastle wedding

**Journey:**
1. ✅ Visit site → Click "Get Started"
2. ✅ Sign up with email/password
3. ✅ Complete questionnaire (Newcastle, 75 guests, $40k, Rustic)
4. ✅ See 17 vendor matches
5. ⏳ Select 8 vendors (3 venues, 3 photographers, 2 caterers)
6. ⏳ Review 8 generated emails
7. ⏳ Click "Send All"
8. ⏳ See confirmation: "8 emails sent"
9. ⏳ Go to dashboard → See "8 vendors contacted"
10. ⏳ Simulate webhook → Email delivered/opened
11. ⏳ Manually add vendor response
12. ⏳ See response in dashboard
13. ⏳ View vendor detail page with full conversation
14. ⏳ Mark vendor as interested

**Current test status:** Steps 1-4 working, 5-14 need testing

---

## 📊 Transparency Checklist

For every action, user should be able to answer:

- ✅ **What just happened?** Clear success messages
- ✅ **Why did this happen?** Match score explanations
- ✅ **What happens next?** Clear CTAs and guidance
- ✅ **Can I undo this?** Edit emails before sending
- ✅ **Where's my data?** See all emails sent/received
- ✅ **Is this working?** Delivery/open status visible
- ✅ **What should I do?** Dashboard shows next actions

**NO black boxes. NO hidden automation. FULL transparency.**

---

## 🎯 Value Proposition (Clear at Every Stage)

**Stage 2 (Questionnaire):** "We'll find vendors that match your vision"
**Stage 3 (Vendor Matches):** "We found 17 perfect matches - saved you 2 hours of research"
**Stage 4 (Email Preview):** "We drafted 8 personalized emails - saved you 3 hours"
**Stage 5 (Send):** "We sent 8 emails in one click - saved you 30 minutes"
**Stage 6 (Dashboard):** "Track all responses in one place - saves ongoing time"

**Total value: 6+ hours saved** → Worth the subscription cost

---

**Next:** Implement simple AI cleanup based on this journey map 🚀
