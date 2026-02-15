# 🚀 Automated Vendor Outreach System

**Date**: 2026-02-15
**Core Value Proposition**: Blast emails to 50+ vendors, track responses automatically, get notified in real-time

---

## 🎯 The Real Selling Point

### **What Users Actually Want**:

> "I want to contact 30 photographers in one click, have you send personalized emails to all of them, track who responds, extract their quotes, and show me everything organized in one dashboard."

**The Pain Point We Solve**:

- ❌ Manually emailing 30 vendors individually (10+ hours)
- ❌ Tracking responses across scattered email threads
- ❌ Comparing quotes from different email formats
- ❌ Following up with vendors who didn't respond
- ❌ Missing vendor replies in cluttered inbox

**What We Do Instead**:

- ✅ **One click** → 30 personalized emails sent
- ✅ **Automatic tracking** → See who opened, who replied
- ✅ **Smart parsing** → Extract prices & availability automatically
- ✅ **Organized dashboard** → All responses in one place
- ✅ **Real-time notifications** → Alert when vendors respond
- ✅ **Manual control** → Edit emails, send your own, or take over anytime

---

## 🔄 Complete User Flow

### **Step 1: Questionnaire** (Current - ✅ Working)

```
User answers 5 questions
   ↓
AI finds 15-20 matching vendors
   ↓
Shows vendor cards with:
- Photos, pricing, reviews
- Website links
- Phone numbers
```

---

### **Step 2: Vendor Selection** (To Build)

```
User sees all matches grouped by category:

┌─────────────────────────────────────┐
│  🏰 Venues (6 matches)              │
├─────────────────────────────────────┤
│  ☐ Caves Coastal                    │
│     $8k-20k • Beach • 180 guests    │
│     [View Details]                  │
│                                     │
│  ☑ Noah's on the Beach              │
│     $7k-18k • Ocean views • 200     │
│     [View Details]                  │
│                                     │
│  ☐ Ravella Newcastle                │
│     $8k-25k • Modern • 250 guests   │
│     [View Details]                  │
├─────────────────────────────────────┤
│  [Select All] [Contact 2 Selected]  │
└─────────────────────────────────────┘

User checks boxes for vendors they like
   ↓
Clicks "Contact 15 Selected Vendors"
```

---

### **Step 3: Email Preview & Customization** (To Build)

```
┌─────────────────────────────────────────────┐
│  Review Emails Before Sending               │
├─────────────────────────────────────────────┤
│  We'll send personalized emails to:         │
│  • 6 Venues                                 │
│  • 5 Photographers                          │
│  • 4 Caterers                               │
│                                             │
│  Preview sample email:                      │
│  ┌───────────────────────────────────────┐ │
│  │ To: bookings@cavescoastal.com.au      │ │
│  │ Subject: Wedding Inquiry - Oct 2027    │ │
│  │                                        │ │
│  │ Hi Caves Coastal team,                │ │
│  │                                        │ │
│  │ We're planning our wedding for         │ │
│  │ October 2027 and fell in love with    │ │
│  │ your stunning beachside venue...      │ │
│  │                                        │ │
│  │ [Full AI-generated email preview]     │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  Options:                                   │
│  ○ Send as-is (AI wrote perfect emails)    │
│  ○ Let me edit each email individually     │
│  ○ Customize email template for all        │
│                                             │
│  Your contact info (vendors reply to):      │
│  📧 yourname@email.com                     │
│  📱 0412 345 678 (optional)                │
│                                             │
│  [ ← Back ]  [ Send 15 Emails → ]          │
└─────────────────────────────────────────────┘

User can:
- Send all emails as-is
- Edit individual emails
- Modify the template
- Change their contact info
   ↓
Clicks "Send 15 Emails"
```

---

### **Step 4: Sending & Tracking** (To Build)

```
┌─────────────────────────────────────────┐
│  Sending Emails...                      │
├─────────────────────────────────────────┤
│  ✅ Caves Coastal - Sent                │
│  ✅ Noah's on the Beach - Sent          │
│  ✅ Ravella - Sent                      │
│  ✅ Cavanagh Photography - Sent         │
│  ⏳ Thierry Boudan - Sending...         │
│  ⏳ The Wilderness Chef - Queued        │
│                                         │
│  Progress: 12/15 sent                   │
└─────────────────────────────────────────┘

After all sent:

✅ Success! Contacted 15 vendors

   📧 Emails sent to:
   • 6 Venues
   • 5 Photographers
   • 4 Caterers

   🔔 You'll get notified when they respond!

   [ View Dashboard → ]
```

**Behind the scenes**:

- Emails sent via Resend API
- Each email has unique tracking ID
- Reply-to set to user's email
- BCC to our system for tracking
- Rate limiting (2 emails/second to avoid spam filters)

---

### **Step 5: Response Tracking Dashboard** (To Build)

```
┌────────────────────────────────────────────────────┐
│  Your Wedding Dashboard                            │
├────────────────────────────────────────────────────┤
│  Overview                                          │
│  ┌──────────────────────────────────────────────┐ │
│  │  📤 15 vendors contacted                     │ │
│  │  ✅ 8 responses received (53%)               │ │
│  │  💰 6 quotes ready to review                 │ │
│  │  ⏳ 7 awaiting reply (2-3 days avg)          │ │
│  │  🔴 2 not available (already booked)         │ │
│  └──────────────────────────────────────────────┘ │
│                                                    │
│  🔔 New Response! (2 minutes ago)                  │
│  Caves Coastal replied with quote                 │
│  [View Response →]                                 │
├────────────────────────────────────────────────────┤
│  🏰 Venues (6 contacted)                           │
│                                                    │
│  ✅ Caves Coastal - RESPONDED (2m ago)            │
│     "We'd love to host! $12k package for..."      │
│     💰 Quote: $12,000                             │
│     📅 Available: Oct 2027                        │
│     [View Full Response] [Compare] [Book]         │
│                                                    │
│  ✅ Noah's on the Beach - RESPONDED (1 day ago)   │
│     "Thank you for reaching out! Our pricing..."  │
│     💰 Quote: $15,500                             │
│     📅 Available: Oct 2027                        │
│     [View Full Response] [Compare] [Book]         │
│                                                    │
│  ⏳ Ravella - Sent 2 days ago                     │
│     ✓ Opened (yesterday)                          │
│     ⏳ No reply yet                                │
│     [Send Follow-up] [Call Instead]               │
│                                                    │
│  🔴 Stanley Park - NOT AVAILABLE                  │
│     "Unfortunately we're fully booked..."         │
│     [View Response] [Remove]                      │
├────────────────────────────────────────────────────┤
│  📸 Photographers (5 contacted)                    │
│                                                    │
│  ✅ Cavanagh Photography - RESPONDED              │
│     💰 Quote: $3,200 (8 hours)                    │
│     [View] [Compare]                              │
│                                                    │
│  ✅ Thierry Boudan - RESPONDED                    │
│     💰 Quote: $3,500 (8 hours + album)            │
│     [View] [Compare]                              │
│                                                    │
│  ⏳ Rope and Pulley - Sent 1 day ago              │
│     ✗ Not opened yet                              │
│                                                    │
│  ... (show all)                                   │
├────────────────────────────────────────────────────┤
│  🍽️ Caterers (4 contacted)                        │
│  ... (similar format)                             │
└────────────────────────────────────────────────────┘

Actions available:
- View full vendor responses
- Compare quotes side-by-side
- Send follow-ups to non-responders
- Mark favorites
- Book vendors directly
- Export all quotes to PDF
```

---

### **Step 6: Real-Time Notifications** (To Build)

**When vendor responds**:

**Email Notification**:

```
Subject: 🎉 Noah's on the Beach responded to your inquiry!

Hi [Name],

Great news! Noah's on the Beach just replied to your wedding inquiry.

Quick Summary:
• Available: October 2027 ✓
• Quote: $15,500 (all-inclusive package)
• Next step: They'd love to schedule a venue tour

[View Full Response →]
[Compare All Quotes →]

You've now heard back from 8 out of 15 vendors!
```

**SMS Notification** (optional):

```
🎊 Wedding update! Noah's on the Beach replied with a $15.5k quote.
Available for your date! View: wedding-plan.app/r/xyz123
```

**In-App Notification**:

```
🔔 Bell icon shows "3 new"

Recent activity:
• Caves Coastal responded (2m ago)
• Thierry Boudan sent quote (1h ago)
• The Wilderness Chef available (3h ago)
```

---

## 🛠️ Technical Architecture

### **Email Sending System**

**Flow**:

```
User clicks "Send Emails"
   ↓
Frontend → API: /api/vendors/outreach (POST)
   ↓
For each selected vendor:
   ↓
1. Generate personalized email with Claude
2. Create VendorOutreach record in DB
3. Send email via Resend API
4. Generate unique tracking token
5. Set reply-to: user@email.com
6. Set BCC: track-{token}@weddingplan.app
   ↓
Return: { sent: 15, failed: 0 }
```

**Database Schema** (already have this!):

```prisma
model VendorOutreach {
  id        String   @id @default(cuid())
  weddingId String
  vendorId  String

  // Email tracking
  emailSent       Boolean   @default(false)
  emailContent    String    @db.Text
  sentAt          DateTime?
  emailOpenedAt   DateTime?
  trackingToken   String    @unique

  // Response tracking
  response         String?   @db.Text
  responseStatus   OutreachStatus @default(SENT)
  respondedAt      DateTime?

  // Extracted data
  quoteAmount      Int?
  quoteCurrency    String?   @default("AUD")
  availabilityNote String?

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum OutreachStatus {
  SENT
  OPENED
  RESPONDED
  NOT_AVAILABLE
  NO_RESPONSE
}
```

---

### **Response Collection System**

**Option A: Email Forwarding** (Recommended)

**How it works**:

1. User's vendor emails have BCC: `track-{token}@weddingplan.app`
2. When vendor replies, Resend forwards to our webhook
3. Webhook receives email, parses it, extracts:
   - Quote amount
   - Availability
   - Next steps
4. Updates VendorOutreach record
5. Sends notification to user

**Resend Webhook**:

```typescript
// app/api/webhooks/email-response/route.ts
export async function POST(req: Request) {
  const data = await req.json()

  // Extract tracking token from recipient
  const token = extractToken(data.to) // track-abc123@...

  // Find the outreach record
  const outreach = await prisma.vendorOutreach.findUnique({
    where: { trackingToken: token },
    include: { vendor: true, wedding: { include: { user: true } } },
  })

  // Parse email with Claude AI
  const parsed = await parseVendorResponse(data.text)

  // Update database
  await prisma.vendorOutreach.update({
    where: { id: outreach.id },
    data: {
      response: data.text,
      responseStatus: 'RESPONDED',
      respondedAt: new Date(),
      quoteAmount: parsed.quoteAmount,
      availabilityNote: parsed.availability,
    },
  })

  // Send notification to user
  await sendNotification({
    userId: outreach.wedding.userId,
    type: 'vendor_response',
    vendor: outreach.vendor.name,
    quote: parsed.quoteAmount,
  })

  return Response.json({ success: true })
}
```

**AI Email Parser**:

```typescript
async function parseVendorResponse(emailText: string) {
  const prompt = `
    Extract key information from this vendor response:

    ${emailText}

    Return JSON:
    {
      "quoteAmount": <number or null>,
      "availability": "<available/not_available/need_to_check>",
      "availabilityNote": "<their message about dates>",
      "nextSteps": "<what they want customer to do>",
      "sentiment": "<positive/neutral/negative>"
    }
  `

  const response = await claude.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    messages: [{ role: 'user', content: prompt }],
  })

  return JSON.parse(response.content)
}
```

---

**Option B: Email Monitoring** (Alternative)

Use IMAP to monitor user's inbox:

- User connects their Gmail/Outlook
- We monitor for vendor replies
- Extract and categorize automatically

**Pros**: Works with user's existing email
**Cons**: Requires email OAuth, privacy concerns

---

### **Notification System**

**Push Notifications**:

```typescript
// lib/notifications.ts

export async function sendNotification({
  userId,
  type,
  vendor,
  quote,
}: {
  userId: string
  type: 'vendor_response' | 'quote_received'
  vendor: string
  quote?: number
}) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { notificationSettings: true },
  })

  // Email notification
  if (user.notificationSettings.emailEnabled) {
    await resend.emails.send({
      from: 'Wedding Planning <updates@weddingplan.app>',
      to: user.email,
      subject: `🎉 ${vendor} responded to your inquiry!`,
      html: renderEmailTemplate({
        vendor,
        quote,
        dashboardLink: `https://weddingplan.app/dashboard`,
      }),
    })
  }

  // SMS notification (via Twilio)
  if (user.notificationSettings.smsEnabled && user.phone) {
    await twilioClient.messages.create({
      to: user.phone,
      from: '+61412345678',
      body: `🎊 ${vendor} replied! Quote: $${quote?.toLocaleString()}. View: weddingplan.app/r/${userId}`,
    })
  }

  // In-app notification
  await prisma.notification.create({
    data: {
      userId,
      type,
      title: `${vendor} responded!`,
      message: quote ? `Quote: $${quote.toLocaleString()}` : 'View their response',
      read: false,
      link: `/dashboard?vendor=${vendor}`,
    },
  })
}
```

---

## 🎨 User Control & Transparency

### **Manual Intervention Points**

**1. Before Sending**:

```
☑ Review all emails before sending
☑ Edit individual emails
☑ Customize email template
☑ Choose which vendors to contact
☑ Add personal notes to emails
```

**2. During Process**:

```
☑ View email tracking (sent, opened, bounced)
☑ Send manual follow-ups
☑ Call vendors directly (phone shown)
☑ Pause automated outreach
☑ Add notes to vendor cards
```

**3. After Responses**:

```
☑ View raw vendor emails
☑ Download all correspondence
☑ Reply manually to vendors
☑ Export quotes to spreadsheet
☑ Mark vendors as "not interested"
```

---

### **Transparency Features**

**Show Everything**:

```
Dashboard shows:
- Exact email sent to each vendor
- When it was sent (timestamp)
- If they opened it (tracking)
- Full vendor response (unedited)
- Our AI interpretation (for comparison)
- All contact attempts (log)
```

**User Control Panel**:

```
Settings → Email Outreach

☑ Send emails on my behalf
☑ Track email opens
☑ Auto-parse vendor responses
☑ Send me notifications

Email Signature:
[Edit what appears at bottom of emails]

Email Template:
[Customize the AI template]

Vendor Blacklist:
[Don't contact these vendors]
```

---

## 🚀 Implementation Roadmap

### **Week 1: Email Sending** ✅

**Goal**: Send emails to vendors

- [x] Create API endpoint: `/api/vendors/outreach`
- [x] Integrate Resend API
- [x] Generate emails with Claude
- [x] Track sent emails in database
- [x] Build vendor selection UI
- [x] Add email preview screen
- [x] Deploy and test

**Test with**: Contact 5 test vendors

---

### **Week 2: Response Tracking**

**Goal**: Receive and organize responses

- [ ] Set up Resend webhook
- [ ] Parse vendor responses with AI
- [ ] Update database with response data
- [ ] Build dashboard UI
- [ ] Show response status per vendor
- [ ] Add manual response entry (for phone calls)

**Test with**: Receive and parse 10 vendor responses

---

### **Week 3: Notifications**

**Goal**: Alert users when vendors respond

- [ ] Email notifications
- [ ] SMS notifications (Twilio)
- [ ] In-app notification center
- [ ] Notification preferences
- [ ] Batch digest (daily summary)

**Test with**: Send notifications for 20 responses

---

### **Week 4: Quote Comparison**

**Goal**: Help users compare vendor quotes

- [ ] Side-by-side quote comparison
- [ ] Sort by price, rating, availability
- [ ] Highlight best value
- [ ] Export to PDF/Excel
- [ ] Share quotes with partner

**Test with**: Compare 15 vendor quotes

---

## 💡 Key Features That Make This Powerful

### **1. Personalization at Scale**

Each email is unique:

```
To: Caves Coastal
"We fell in love with your stunning beachside ceremony deck..."

To: Noah's on the Beach
"Your oceanfront location is exactly what we envisioned..."

To: Ravella
"We're drawn to your modern waterfront aesthetic..."
```

**NOT** generic mass email - each one references specific vendor features.

---

### **2. Intelligent Response Parsing**

AI extracts structured data from messy emails:

**Vendor email**:

```
"Hi! Thanks for reaching out! We have availability
for October 2027 and our wedding package starts at
$12,000 for up to 150 guests which includes the
venue, catering, and drinks..."
```

**AI extraction**:

```json
{
  "available": true,
  "quote": 12000,
  "guestCount": 150,
  "includes": ["venue", "catering", "drinks"],
  "nextStep": "They want to schedule a tour"
}
```

---

### **3. Smart Follow-ups**

Auto-suggest follow-ups:

```
Vendor opened email but didn't reply (3 days ago)
→ [Send Follow-up: "Just checking if you received our inquiry..."]

Vendor replied but didn't give quote
→ [Send: "Thanks for your response! Could you share your pricing..."]

Vendor said "call us"
→ [Remind me to call] [Schedule call] [Mark as contacted]
```

---

### **4. Response Quality Insights**

Show patterns:

```
⚡ Quick responders (replied within 24h):
• Cavanagh Photography
• The Wilderness Chef
• Noah's on the Beach

💯 Best value (high rating, good price):
• Caves Coastal - $12k (4.8★)
• Thierry Boudan - $3.2k (4.9★)

🚨 Red flags detected:
• Vendor X: No availability mentioned
• Vendor Y: Significantly over budget
```

---

## 🎯 The Pitch

**Before our app**:

```
User manually:
1. Googles 30 photographers
2. Visits 30 websites
3. Finds 30 contact forms
4. Writes 30 personalized emails
5. Sends 30 emails individually
6. Tracks responses across email threads
7. Manually compares pricing
8. Follows up with non-responders

Time: 10-15 hours
Success rate: 40% (12 responses from 30)
```

**With our app**:

```
User:
1. Answers 5 questions (30 seconds)
2. Checks boxes on vendors they like (2 minutes)
3. Reviews AI emails (optional, 5 minutes)
4. Clicks "Send to 30 vendors" (1 click)
5. Gets notified when they respond (automatic)
6. Compares quotes in dashboard (5 minutes)
7. Books vendors (10 minutes)

Time: 25 minutes
Success rate: 65% (20 responses from 30)
Effort saved: 14+ hours
```

**Value**: $29/mo = **Save 14 hours** = $2/hour if you value your time

---

## ✅ Next Steps - What Should I Build First?

**Option 1: Full Flow (2 weeks)**
Build everything: selection → emails → tracking → dashboard

**Option 2: MVP (1 week)**
Just email sending + basic tracking, no fancy dashboard

**Option 3: Start with Manual (3 days)**
Show contact info, let them email manually, build automation later

**What do you think? Should I start building the automated outreach system now?**
