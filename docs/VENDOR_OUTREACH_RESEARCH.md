# 🔬 Vendor Outreach Research: Understanding Real User Workflows

**Purpose:** Understand how couples currently contact vendors and what responses they get, so we can build a product that genuinely improves this process.

**Philosophy:** Build what people actually need, not what we assume they need.

---

## 🎯 Research Questions

### **1. Couple's Outreach Workflow**
- [ ] What email subject lines do couples use?
- [ ] What structure/format do couples use in emails?
- [ ] What information do couples include?
- [ ] What questions do couples ask?
- [ ] How many vendors do they contact at once?
- [ ] How do they track responses?
- [ ] What's the biggest pain point?

### **2. Vendor Response Patterns**
- [ ] Average response time?
- [ ] Do vendors answer all questions or ask for a call?
- [ ] How do vendors structure pricing info?
- [ ] Do vendors use templates or personalize?
- [ ] What follow-up do vendors request?
- [ ] Do vendors ask questions back?

### **3. Common Problems**
- [ ] What % of vendors don't respond?
- [ ] What causes friction (missing info, unclear asks)?
- [ ] What makes vendors respond faster?
- [ ] How do couples compare inconsistent pricing?
- [ ] What gets lost in the process?

---

## 📊 Research Methods

### **Method 1: Reddit Analysis** ✅ Recommended First Step
**Subreddits:**
- r/weddingplanning (500k members)
- r/wedding (200k members)
- r/AusWeddingPlanning (AU-specific)

**Search Terms:**
- "vendor email template"
- "how to contact venues"
- "vendor not responding"
- "vendor pricing quote"
- "vendor ghosted me"
- "is this quote reasonable"

**What to capture:**
- Screenshot examples of emails (sent & received)
- Common complaints
- What worked vs what didn't
- Vendor communication red flags

**Time:** 2-3 hours
**Cost:** Free

---

### **Method 2: Wedding Planning Resources**
**Sites to review:**
- Easy Weddings (AU) - https://www.easyweddings.com.au/articles
- The Knot - https://www.theknot.com/content/wedding-planning
- Brides - https://www.brides.com/wedding-planning-checklist-4584012
- Polka Dot Bride (AU) - https://www.polkadotbride.com/

**Articles to find:**
- "How to Email a Wedding Vendor"
- "Questions to Ask Your Venue"
- "What to Include in Vendor Inquiry"
- "When to Book Your Photographer"

**Extract:**
- Recommended email templates
- Must-ask questions per category
- Timeline for vendor booking

**Time:** 1-2 hours
**Cost:** Free

---

### **Method 3: Primary Research - Survey** ⏳ After prototype
**Post in wedding groups:**

> "Hi everyone! 👋
>
> I'm building a tool to help couples organize vendor outreach (no more spreadsheets!).
>
> If you've contacted wedding vendors, I'd love your help:
>
> 1. **What did you write in your first email to vendors?** (you can copy/paste or summarize)
> 2. **What did they reply with?** (pricing format, availability, follow-up requests)
> 3. **What was the most annoying part of vendor outreach?**
>
> Your insights will help make this actually useful (not just more AI vaporware 😅)"

**Incentive:** Offer early access to beta testers

**Expected responses:** 10-20 couples sharing real examples

**Time:** 1 week (post + wait for responses)
**Cost:** Free (or $50 Amazon gift card raffle)

---

### **Method 4: Mystery Shopping** 🎯 Most Accurate
**Process:**
1. Create test email: sarahtesting2027@gmail.com
2. Contact 10 vendors (2 per category):
   - 2 Newcastle venues
   - 2 Newcastle photographers
   - 2 Hunter Valley venues
   - 2 Hunter Valley caterers
   - 2 Blue Mountains venues

**Email template (realistic inquiry):**
```
Subject: Wedding Inquiry - June 14, 2027

Hi [Vendor Name],

My name is Sarah and I'm planning my wedding for June 14, 2027. I came across your [venue/services] and was really impressed.

Here are our details:
- Date: Saturday, June 14, 2027
- Location: Newcastle area
- Guest count: 75-80
- Budget: $40,000 total (looking at $10-12k for venue)
- Style: Rustic with outdoor elements

I'd love to know:
1. Are you available on this date?
2. What packages do you offer for this guest count?
3. What's included in your pricing?
4. Do you have availability for a tour in the next few weeks?

Looking forward to hearing from you!

Best,
Sarah
```

**Track for each vendor:**
- Response time (hours/days)
- Response format (detailed email? "call us"? package PDF?)
- Pricing clarity (specific numbers? ranges? "starting from"?)
- Availability (clear yes/no? need to check?)
- Follow-up requests (book tour? send deposit? call back?)
- Tone (warm/helpful vs transactional)

**Time:** 1-2 weeks (waiting for responses)
**Cost:** Free (just inquiry, no bookings)

**⚠️ Ethics:**
- Don't waste vendor time with tours
- Reply "Thanks, we've decided on another vendor" if they respond
- Use this data ethically to improve the product

---

## 📝 Research Findings Template

### **Sample Email Structures Found:**

#### **Example 1: From Reddit u/weddingplanning2024**
```
[Copy actual examples found]

Subject: ...
Body: ...

Vendor Response: ...
```

#### **Example 2: From The Knot Template**
```
[Copy template]
```

---

### **Common Information Couples Include:**

**Always included:**
- [ ] Wedding date
- [ ] Guest count
- [ ] Location preference

**Sometimes included:**
- [ ] Budget range
- [ ] Style/theme
- [ ] Dietary requirements (for caterers)
- [ ] Accessibility needs

**Rarely included:**
- [ ] Specific package interest
- [ ] Timeline for decision
- [ ] Why they chose this vendor

---

### **Vendor Response Patterns:**

**Fast responders (same day):**
- Usually send templated packages
- Ask for phone call or tour
- May include pricing PDF

**Slow responders (2-7 days):**
- May be checking availability
- More personalized responses
- Ask clarifying questions

**Non-responders:**
- Too busy/overbooked?
- Inquiry went to spam?
- Vendor doesn't check email regularly?

---

### **Pain Points Identified:**

**From couples:**
1. ___________
2. ___________
3. ___________

**From vendors:**
1. ___________
2. ___________
3. ___________

---

## 🎯 How This Informs Our Product

### **Email Generation:**
Based on research, our AI should generate emails that:
- [ ] Use clear subject lines: "Wedding Inquiry - [Date]"
- [ ] Include all key info upfront (date, guests, budget, style)
- [ ] Ask specific, clear questions
- [ ] Show genuine interest (not mass-spam tone)
- [ ] Make it easy for vendor to say yes/no to availability

**Template structure:**
```
1. Introduction (who we are, when's the wedding)
2. Key details (date, location, guest count)
3. Why we're interested (specific to this vendor)
4. Specific questions (3-5 clear questions)
5. Next steps request (tour? phone call? package info?)
6. Thank you + signature
```

---

### **Response Tracking:**
Based on what vendors send back, our dashboard should handle:
- [ ] Pricing in multiple formats (flat rate, per person, packages)
- [ ] Availability status (yes/no/tentative)
- [ ] Documents attached (contracts, packages, photos)
- [ ] Follow-up requests (need deposit, want to schedule call)
- [ ] Questions vendors ask back

---

### **Comparison Tools:**
Make it easy to compare:
- [ ] Pricing (normalize per-person vs flat rate)
- [ ] What's included vs what's extra
- [ ] Availability (who's free on our date?)
- [ ] Response time (who's eager vs who's slow?)

---

## 📅 Research Timeline

**Week 1:**
- [ ] Reddit analysis (2-3 hours)
- [ ] Wedding blog templates (1-2 hours)
- [ ] Compile findings document

**Week 2:**
- [ ] Post survey in wedding groups
- [ ] Send mystery shop emails to vendors

**Week 3:**
- [ ] Collect survey responses
- [ ] Track vendor responses
- [ ] Synthesize all findings

**Week 4:**
- [ ] Update email generation templates
- [ ] Refine dashboard based on real vendor responses
- [ ] Validate with 2-3 beta test couples

---

## 🎓 Key Learnings (To Be Filled In)

### **What couples wish vendors would do:**
1. ___________
2. ___________
3. ___________

### **What vendors wish couples would do:**
1. ___________
2. ___________
3. ___________

### **Opportunities for our product:**
1. ___________
2. ___________
3. ___________

---

## 🚀 Action Items After Research

**Based on findings, update:**
- [ ] Email generation prompts (lib/email/generate-vendor-email.ts)
- [ ] Email templates to match successful patterns
- [ ] Dashboard to handle common response formats
- [ ] Comparison tools to normalize pricing differences
- [ ] User guidance (what to ask vendors, when to book)

---

**Next:** Start with Reddit research (easiest, fastest). Takes 2-3 hours, costs nothing, gives real examples.
