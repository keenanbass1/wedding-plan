# 🧪 End-to-End Testing Strategy: Email Outreach System

**Date:** February 16, 2026
**Status:** Planning Phase

---

## 🎯 Testing Goals

**What we need to test:**
1. Email generation (AI creates personalized emails)
2. Email sending (Resend API batch send)
3. Email delivery tracking (webhook events)
4. Vendor response handling (manual entry + future automation)
5. Dashboard updates (stats, timeline, response display)
6. Full user journey (questionnaire → vendors → email → tracking → response)

**Critical constraint:** **Cannot spam real vendors** during testing

---

## 🚫 What NOT To Do

❌ Send test emails to real vendors (damages reputation)
❌ Use vendor email addresses without permission
❌ Send bulk tests to production email accounts
❌ Test on real couples' weddings (privacy/data concerns)

---

## ✅ Recommended Testing Approaches

### **Phase 1: Internal Testing (Week 1)**
**Goal:** Validate technical functionality without external contacts

#### **1.1 Test Email Addresses (Controlled)**
Create test email accounts for different vendor roles:

```javascript
const TEST_VENDORS = [
  {
    email: 'test-venue-1@streamwedding.com',
    name: 'Test Venue Newcastle',
    category: 'VENUE'
  },
  {
    email: 'test-photographer-1@streamwedding.com',
    name: 'Test Photographer Hunter Valley',
    category: 'PHOTOGRAPHER'
  },
  {
    email: 'test-caterer-1@streamwedding.com',
    name: 'Test Caterer Sydney',
    category: 'CATERING'
  }
]
```

**Setup:**
1. Create 5-10 test email addresses (Gmail, Outlook, your domain)
2. Add test vendors to database with these emails
3. Run full outreach flow
4. Manually check each inbox for delivery
5. Test webhook events (delivered, opened)
6. Manually reply to test vendor responses

**Pros:**
- ✅ Full control over all emails
- ✅ Can test webhooks end-to-end
- ✅ No risk of spamming real vendors
- ✅ Can simulate different response types

**Cons:**
- ⏱️ Manual email checking required
- ⏱️ Can't test real vendor behavior

---

#### **1.2 Resend Test Mode**
Use Resend's test/sandbox mode (if available):

```typescript
// /lib/email/resend-client.ts
const isTestMode = process.env.NODE_ENV !== 'production'

export const resendConfig = {
  apiKey: process.env.RESEND_API_KEY,
  // Test mode prevents actual delivery
  testMode: isTestMode
}
```

**How it works:**
- Emails appear in Resend dashboard but aren't delivered
- Webhooks still trigger for testing
- No actual email sent to inboxes

**Check Resend docs:** https://resend.com/docs/api-reference/introduction

---

#### **1.3 Email Preview/Capture Tool**
Use tools like **Mailpit** or **MailHog** for local email testing:

**Mailpit** (recommended):
```bash
# Install Mailpit (local SMTP server with web UI)
docker run -d -p 1025:1025 -p 8025:8025 axllent/mailpit

# Configure in .env.local for testing
SMTP_HOST=localhost
SMTP_PORT=1025
```

**Benefits:**
- All "sent" emails captured in web UI (http://localhost:8025)
- Test email content, formatting, personalization
- No external emails sent
- Perfect for development

**Setup:**
1. Run Mailpit locally
2. Configure Resend/SMTP to use localhost:1025 in dev
3. Send test outreach emails
4. View all emails in web UI
5. Test email templates, subject lines, personalization

---

### **Phase 2: Controlled Real-World Testing (Week 2)**

#### **2.1 Friendly Vendor Testing**
**Find 2-3 vendors who will collaborate:**

**Ideal candidates:**
- Friends/family who run wedding businesses
- Vendors you have personal relationships with
- Vendors who understand you're building a product

**Process:**
1. Email vendor: "Hey [Name], I'm building a wedding planning tool. Can I send you a test inquiry email to see if it looks professional?"
2. Get explicit permission
3. Send 1-2 test emails
4. Ask for feedback:
   - Did email look professional?
   - Was information clear?
   - Would they respond to this type of inquiry?
   - Any red flags or improvements?

**Value:**
- ✅ Real vendor feedback on email quality
- ✅ Professional validation
- ✅ Relationship-building with potential partners

---

#### **2.2 Friends Getting Married (Beta Testers)**
**Find 2-3 couples actually planning weddings:**

**Ideal candidates:**
- Friends who are genuinely planning weddings
- Open to using your product (free beta access)
- Comfortable with early-stage software
- Will provide honest feedback

**Process:**
1. Onboard as beta users (free account)
2. They complete real questionnaire (their actual wedding)
3. They select real vendors they're interested in
4. **They review and approve emails before sending**
5. You monitor the full process:
   - Email delivery
   - Vendor responses
   - Dashboard functionality
   - Real-world pain points

**Benefits:**
- ✅ Real user behavior (not test data)
- ✅ Real vendor responses (genuine outreach)
- ✅ Authentic feedback loop
- ✅ Case study for future marketing

**Important:**
- Must be people you trust
- They're sending real inquiries (not tests)
- Gives you real-world data without spam

---

### **Phase 3: Webhook & Response Testing (Week 2-3)**

#### **3.1 Resend Webhook Simulation**
Test webhook handling without real emails:

**Using Resend Dashboard:**
1. Go to Resend webhooks section
2. Send test webhook events manually
3. Verify your `/api/webhooks/resend` endpoint processes them

**Using curl for local testing:**
```bash
# Test delivered event
curl -X POST http://localhost:3000/api/webhooks/resend \
  -H "Content-Type: application/json" \
  -H "resend-signature: test-signature" \
  -d '{
    "type": "email.delivered",
    "data": {
      "email_id": "test-email-123",
      "to": "vendor@example.com",
      "delivered_at": "2026-02-16T10:00:00Z"
    }
  }'

# Test opened event
curl -X POST http://localhost:3000/api/webhooks/resend \
  -d '{
    "type": "email.opened",
    "data": {
      "email_id": "test-email-123",
      "opened_at": "2026-02-16T11:30:00Z"
    }
  }'
```

**Verify:**
- Database updates correctly
- Dashboard shows "Delivered" status
- Dashboard shows "Opened" timestamp

---

#### **3.2 Manual Response Entry Testing**
Test vendor response handling:

**Create test response scenarios:**

**Scenario 1: Simple availability confirmation**
```
Subject: Re: Wedding Inquiry - June 14, 2027

Hi Sarah,

Thanks for reaching out! We're available on June 14, 2027.
Our venue package starts at $12,000 for 80 guests.

Would you like to schedule a tour?

Best,
Caves Coastal Team
```

**Scenario 2: Complex quote with options**
```
Subject: Re: Wedding Inquiry

Hi Sarah,

We'd love to photograph your wedding! Here are our packages:

Package A: 6 hours, 300 photos - $2,500
Package B: 8 hours, 500 photos, album - $3,800
Package C: Full day, 800 photos, album, engagement shoot - $5,200

All packages include online gallery and editing.

Available: June 14, 2027
```

**Scenario 3: Not available**
```
Unfortunately we're already booked for June 14, 2027.

Would you consider June 21 or June 28?
```

**Scenario 4: Needs more info**
```
Thanks for your inquiry! To provide an accurate quote, can you tell us:

1. Indoor or outdoor ceremony?
2. Dietary restrictions?
3. Bar service needed?
```

**Test process:**
1. Paste each response into manual entry form
2. Verify dashboard displays correctly
3. Test AI quote extraction (if implemented)
4. Check status updates (RESPONDED, QUOTED, etc.)

---

### **Phase 4: Full E2E Journey (Week 3-4)**

#### **4.1 Complete User Flow Test**
**Test with your own account:**

1. **Sign up** → Create new test user account
2. **Questionnaire** → Complete with realistic data (Newcastle, 75 guests, $40k, Rustic)
3. **Vendor matches** → See 17 Newcastle vendors
4. **Select vendors** → Choose 5-8 vendors (mix of categories)
5. **Review emails** → Check AI-generated emails for quality
6. **Edit emails** → Test email customization (see next section)
7. **Send batch** → Send to your test email addresses
8. **Check delivery** → Verify emails arrived
9. **Simulate webhooks** → Trigger delivered/opened events
10. **Manual response** → Add vendor responses manually
11. **Dashboard review** → Check all stats update correctly
12. **Compare quotes** → Use dashboard to compare vendor options

**Document:**
- Time to complete each step
- Pain points or confusion
- UI/UX issues
- Technical errors
- Loading times

---

### **Phase 5: Production Validation (Week 4+)**

#### **5.1 Beta Launch with Real Couples**
**Recruit 5-10 beta users:**

**Criteria:**
- Planning weddings in next 12 months
- Comfortable with early-stage product
- Will provide feedback
- Located in Newcastle/Hunter Valley (current vendor coverage)

**Beta program:**
- Free access for first 6 months
- Weekly check-ins for feedback
- Bug reports prioritized
- Feature requests considered

**Monitoring:**
- Track all email sends
- Monitor webhook success rates
- Watch for delivery failures
- Collect vendor response data

**Metrics to track:**
- Email delivery rate (target: >98%)
- Email open rate (target: >50%)
- Vendor response rate (industry average: 60-70%)
- User satisfaction (NPS score)

---

## 🧪 Testing Checklist

### **Email Generation**
- [ ] AI generates personalized emails
- [ ] Subject lines are professional
- [ ] All wedding details included (date, guests, budget, style)
- [ ] Tone is warm but professional
- [ ] No spelling/grammar errors
- [ ] Questions are clear and relevant
- [ ] Contact info included

### **Email Sending**
- [ ] Batch API sends all emails at once
- [ ] Emails arrive in inbox (not spam)
- [ ] Formatting renders correctly
- [ ] Links work (if any)
- [ ] Reply-to address is correct
- [ ] From name is professional

### **Webhook Tracking**
- [ ] Delivered event updates database
- [ ] Opened event records timestamp
- [ ] Bounced event shows error
- [ ] Dashboard reflects webhook data in real-time

### **Response Handling**
- [ ] Manual entry form works
- [ ] Responses display in dashboard
- [ ] Quote extraction works (if implemented)
- [ ] Timeline updates correctly
- [ ] Notifications sent to user (if implemented)

### **Dashboard**
- [ ] Stats are accurate (contacted, responded, etc.)
- [ ] Vendor list shows all outreach
- [ ] Individual vendor pages display correctly
- [ ] Filters work (responded, pending, etc.)
- [ ] Mobile responsive

---

## 🛠️ Testing Tools & Services

### **Email Testing**
- **Mailpit**: Local SMTP server with web UI
- **Mailtrap**: Cloud-based email sandbox
- **Resend Test Mode**: API test mode (check docs)

### **Webhook Testing**
- **ngrok**: Expose localhost for webhook testing
- **Resend Dashboard**: Manual webhook triggers
- **Postman**: Test webhook endpoints

### **Monitoring**
- **Resend Dashboard**: Email delivery metrics
- **Vercel Logs**: Function logs for debugging
- **Sentry** (future): Error tracking

---

## 📊 Success Criteria

**Before launching to public:**
- ✅ 10+ test emails sent without errors
- ✅ 100% email delivery rate in tests
- ✅ Webhooks update database correctly
- ✅ Dashboard shows accurate data
- ✅ 2-3 friendly vendors provide positive feedback
- ✅ 2-3 beta couples successfully use the system
- ✅ No spam complaints
- ✅ Professional email appearance verified

---

## 🚨 Red Flags to Watch For

**Stop and fix if:**
- ❌ Emails going to spam (>10% rate)
- ❌ Vendors complaining about spam
- ❌ Webhook failures (>5% rate)
- ❌ Database inconsistencies
- ❌ Email formatting breaks
- ❌ Resend API errors

---

## 📅 Recommended Testing Timeline

**Week 1: Internal Testing**
- Days 1-2: Set up test email accounts + Mailpit
- Days 3-4: Test email generation + sending
- Days 5-7: Test webhooks + manual responses

**Week 2: Controlled External Testing**
- Days 1-2: Reach out to friendly vendors
- Days 3-4: Send test emails, collect feedback
- Days 5-7: Recruit beta couples, onboard

**Week 3: Beta User Testing**
- Days 1-3: Beta couples use system (real outreach)
- Days 4-5: Monitor results, fix bugs
- Days 6-7: Iterate based on feedback

**Week 4: Validation & Launch Prep**
- Days 1-2: Full E2E test yourself
- Days 3-4: Review all metrics
- Days 5-7: Final polish, prepare for launch

---

## 💡 Pro Tips

**Tip 1:** Start with Mailpit for fast iteration without external dependencies

**Tip 2:** Beta couples are your best source of real-world feedback - treat them well!

**Tip 3:** Document every bug and user pain point - these become features later

**Tip 4:** Vendors who provide good feedback become potential partners for referral program

**Tip 5:** Track vendor response rates to validate your value proposition

---

**Next:** Implement email customization to give users control before sending (see EMAIL_CUSTOMIZATION.md)
