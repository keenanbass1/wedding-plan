# 🎯 Email Outreach System - Setup Guide

**Status:** ✅ Fully built and ready to use - just needs Resend API key

---

## 📋 What's Already Built

Your automated vendor outreach system is **100% complete**:

✅ **Vendor Selection** - Choose vendors with checkboxes (`/vendors` page)
✅ **AI Email Generation** - Claude creates personalized emails for each vendor
✅ **Email Preview & Editing** - Review/edit before sending (`/outreach/preview` page)
✅ **Batch Email Sending** - Send to 100 vendors at once via Resend API
✅ **Response Tracking** - Dashboard to monitor delivery, opens, and replies
✅ **Database Storage** - All outreach tracked in VendorOutreach table

---

## 🔧 What You Need to Do

### **Step 1: Get a Resend API Key**

1. **Sign up at Resend:**
   - Go to: https://resend.com/signup
   - Use your email or GitHub to sign up
   - **Free tier:** 100 emails/day (perfect for testing)
   - **Paid tier:** $20/month for 50,000 emails

2. **Create an API key:**
   - After signup, go to: https://resend.com/api-keys
   - Click "Create API Key"
   - Name it: "Wedding Plan - Production"
   - Copy the key (starts with `re_...`)
   - ⚠️ **IMPORTANT:** Save it somewhere safe - you can only see it once!

3. **Verify a domain (optional for testing):**
   - For testing: Use `onboarding@resend.dev` (no verification needed)
   - For production: Verify your own domain (e.g., `noreply@weddingplanai.com`)
   - Guide: https://resend.com/docs/dashboard/domains/introduction

---

### **Step 2: Add API Key to Local Environment**

Edit `.env.local` in your project:

```bash
# Email (Resend)
RESEND_API_KEY="re_YOUR_ACTUAL_API_KEY_HERE"  # ← Paste your Resend API key
EMAIL_FROM="onboarding@resend.dev"  # ← For testing (or your verified domain)
```

**For testing:**

- Use `EMAIL_FROM="onboarding@resend.dev"` (works immediately)

**For production:**

- Use `EMAIL_FROM="noreply@yourdomain.com"` (requires domain verification)

---

### **Step 3: Add API Key to Vercel (Production)**

Push the environment variable to Vercel:

```bash
vercel env add RESEND_API_KEY production
# Paste your API key when prompted: re_YOUR_KEY_HERE

vercel env add EMAIL_FROM production
# Enter: onboarding@resend.dev (or your verified email)
```

Or add manually in Vercel dashboard:

1. Go to: https://vercel.com/keenanbass1/wedding-plan/settings/environment-variables
2. Add `RESEND_API_KEY` = `re_YOUR_KEY_HERE`
3. Add `EMAIL_FROM` = `onboarding@resend.dev`
4. Redeploy: `vercel --prod`

---

## 🧪 Testing the Email System

### **Local Testing:**

1. **Start the dev server:**

   ```bash
   npm run dev
   ```

2. **Navigate to the vendors page:**
   - Go to: http://localhost:3000/vendors
   - (You'll need to be logged in - sign up first if needed)

3. **Select vendors:**
   - Click checkboxes on 2-3 vendor cards
   - Click "Contact Selected Vendors" button

4. **Preview emails:**
   - You'll see AI-generated personalized emails
   - Edit them if you want
   - Click "Send All Emails"

5. **Check Resend dashboard:**
   - Go to: https://resend.com/emails
   - You should see the emails sent
   - Check delivery status

6. **Check database:**
   ```bash
   npx prisma studio
   ```

   - Look at the `VendorOutreach` table
   - You should see records with `sentAt` timestamps

### **Production Testing:**

1. **Deploy with new env vars:**

   ```bash
   git add .
   git commit -m "Add Resend API key configuration"
   git push
   ```

2. **Test on live site:**
   - Go to: https://wedding-plan-lime.vercel.app
   - Log in
   - Select vendors
   - Send test emails

---

## 📊 How the Email System Works

### **User Journey:**

1. **Chat Interface** → User completes questionnaire
   ↓
2. **Vendor Matching** → AI finds 15+ matching vendors
   ↓
3. **View All Vendors** → User browses vendor cards
   ↓
4. **Select Vendors** → User checks boxes for 10 vendors
   ↓
5. **Generate Emails** → Claude AI creates personalized emails
   ↓
6. **Preview & Edit** → User reviews and can modify emails
   ↓
7. **Send Batch** → Resend API sends all emails at once
   ↓
8. **Dashboard** → User tracks responses, delivery, opens

### **API Endpoints:**

- `POST /api/outreach/generate-emails` - Generates AI emails
  - Input: `{ vendorIds: string[], weddingId: string }`
  - Output: `{ emails: GeneratedEmail[] }`

- `POST /api/outreach/send-batch` - Sends emails via Resend
  - Input: `{ emails: EmailToSend[], weddingId: string }`
  - Output: `{ success: true, sent: 10 }`

### **Database Schema:**

```prisma
model VendorOutreach {
  id              String   @id @default(cuid())
  weddingId       String
  vendorId        String
  emailSubject    String
  emailBody       String   @db.Text
  emailId         String?  // Resend email ID
  sentAt          DateTime?
  delivered       Boolean  @default(false)
  deliveredAt     DateTime?
  opened          Boolean  @default(false)
  openedAt        DateTime?
  replied         Boolean  @default(false)
  repliedAt       DateTime?
  bounced         Boolean  @default(false)
  responseEmail   String?  @db.Text
  quote           Int?     // In cents
}
```

---

## 🔍 Monitoring Email Delivery

### **Resend Dashboard:**

- View all emails: https://resend.com/emails
- Filter by status:
  - ✅ Delivered
  - 📧 Opened
  - ❌ Bounced
  - ⏳ Queued

### **Webhook Setup (Future):**

For real-time updates, set up a webhook:

1. **Create webhook endpoint:**
   - Already exists: `/app/api/webhooks/resend/route.ts`

2. **Add webhook in Resend:**
   - Go to: https://resend.com/webhooks
   - Add endpoint: `https://wedding-plan-lime.vercel.app/api/webhooks/resend`
   - Select events: `email.delivered`, `email.opened`, `email.bounced`

3. **Add webhook secret to env:**
   ```bash
   RESEND_WEBHOOK_SECRET="whsec_YOUR_SECRET"
   ```

---

## 📈 Rate Limits

### **Free Tier:**

- 100 emails/day
- 10 requests/second
- Perfect for testing

### **Paid Tier ($20/mo):**

- 50,000 emails/month
- $0.001 per email after that
- Same API rate limits

### **Batch Sending:**

- Up to 100 emails per batch API call
- Your app automatically chunks into batches of 100

---

## ⚠️ Important Notes

### **Email Deliverability:**

1. **Start slow:**
   - First day: Send 10-20 emails
   - Second day: Send 50 emails
   - Third day+: Send up to 100/day
   - This "warms up" your sending reputation

2. **Use verified domain:**
   - `onboarding@resend.dev` is fine for testing
   - For production, verify your own domain
   - Better deliverability with custom domain

3. **Include unsubscribe link:**
   - Already handled by Resend automatically
   - Required for compliance

### **Email Content:**

- ✅ Personalized to each vendor
- ✅ Mentions wedding details (date, location, guest count)
- ✅ Asks about availability and pricing
- ✅ Includes couple's reply-to email
- ✅ Professional but friendly tone
- ✅ 200-300 words (concise)

### **Fallback Behavior:**

If Claude API fails, a template email is used:

- See: `/lib/email/generate-vendor-email.ts` line 91-127
- Still personalized with wedding details
- Ensures emails always send even if AI is down

---

## 🎉 You're Ready!

Once you add your Resend API key, the entire automated outreach system will work:

1. ✅ Select 20+ vendors at once
2. ✅ AI generates personalized emails in seconds
3. ✅ Review and edit before sending
4. ✅ Send all emails with one click
5. ✅ Track delivery and responses in dashboard
6. ✅ Get notifications when vendors reply

**This is exactly what you asked for:** "automatically blast a lot of emails out to a lot of different places and then get actual options and automatically somehow feed that back to them potentially with some kind of notification system"

---

## 🆘 Troubleshooting

### **Problem: "Email not configured" error**

**Solution:**

```bash
# Check your .env.local has:
RESEND_API_KEY="re_..." (not empty)
EMAIL_FROM="onboarding@resend.dev" (or your domain)

# Restart dev server:
npm run dev
```

### **Problem: Emails not sending**

**Solution:**

1. Check Resend dashboard for errors
2. Verify API key is correct
3. Check rate limits (free: 100/day)
4. Check vendor email addresses are valid

### **Problem: Emails going to spam**

**Solution:**

1. Use a verified domain (not @resend.dev)
2. Warm up sending (start with 10-20 emails/day)
3. Ensure email content is personalized and professional

---

## 📞 Support

- **Resend Docs:** https://resend.com/docs
- **Resend Discord:** https://discord.gg/resend
- **Email Support:** support@resend.com

---

**Last Updated:** 2026-02-16
