# Content Audit & Redesign Plan

**Created:** February 16, 2026
**Status:** Pending Review & Implementation

---

## 🎯 Product Philosophy (Current Vision)

### Unix Philosophy Approach
- **Do small jobs really well** - specific tools, not a black box
- **Chain tasks together** - collaborative workflow
- **Transparent operations** - user always knows what's happening
- **Time-saving for admin tasks** - reduce burden, not replace decisions

### What We Actually Do
✅ **Vendor discovery** - Match users with relevant vendors
✅ **Communication tracking** - Keep vendor emails organized
✅ **Template management** - Provide editable email templates
✅ **Admin reduction** - Less busywork, more time for planning

### What We DON'T Do
❌ "Plan your whole wedding at the click of a button"
❌ Black box AI that makes all decisions
❌ "Orchestrate every detail automatically"
❌ Replace the user's judgment and choices

---

## 🔍 Current Issues Found

### 1. Dark Mode Broken (app/page.tsx)

**Homepage Issues:**
```tsx
// Line 62 - "Your Dream" - invisible in dark mode
<span className="block text-gray-900 mb-2">Your Dream</span>
// NEEDS: dark:text-white

// Line 69 - Description text - hard to read in dark mode
<p className="text-xl md:text-2xl text-gray-600 ...">
// NEEDS: dark:text-gray-300

// Lines 110-140 - Trust indicators, feature descriptions
// All use text-gray-500, text-gray-600, text-gray-900
// NEED: dark mode color variants
```

**Dashboard Issues:**
- Header has dark mode
- Body content still light (needs investigation of dashboard components)

### 2. Misleading Content

#### Line 54 - Hero Tagline
```tsx
<span className="text-sm font-medium tracking-[0.3em] text-rose-600 uppercase">
  AI-Powered Wedding Planning
</span>
```
**Problem:** Too broad, implies we plan everything
**Better:** "Smart Vendor Discovery & Outreach"

#### Lines 72-74 - Main Promise
```tsx
Let our intelligent assistant orchestrate every detail of your perfect day
```
**Problem:** False promise - we don't orchestrate "every detail"
**Better:** "Find and connect with the perfect vendors for your wedding"

#### Lines 159-161 - Feature: "Intelligent Conversations"
```tsx
title: 'Intelligent Conversations',
description: 'Share your vision through natural dialogue. Our AI understands your style, budget, and dreams.'
```
**Problem:** Black box language, vague AI magic
**Better:**
- Title: "Tell Us Your Vision"
- Description: "Answer a few questions about your wedding so we can find vendors that match your style and budget."

#### Lines 176-178 - Feature: "Curated Matching"
```tsx
title: 'Curated Matching',
description: 'Discover handpicked venues and vendors perfectly aligned with your aesthetic and requirements.'
```
**Problem:** "Handpicked" is misleading (it's algorithmic matching)
**Better:**
- Title: "Smart Vendor Matching"
- Description: "We match you with NSW vendors based on your location, guest count, budget, and style preferences."

#### Lines 193-195 - Feature: "Seamless Coordination"
```tsx
title: 'Seamless Coordination',
description: 'We reach out to vendors on your behalf, managing inquiries and gathering responses effortlessly.'
```
**Problem:** "Managing inquiries" is vague about user involvement
**Better:**
- Title: "Easy Outreach & Tracking"
- Description: "Send personalized inquiry emails (you can edit them!) and track all vendor responses in one dashboard."

---

## 📝 Proposed Content Rewrite

### Hero Section (New)

**Tagline:**
~~AI-Powered Wedding Planning~~
→ **"Vendor Discovery Made Simple"**

**Headline:**
~~Your Dream Wedding Awaits~~
→ **"Find Your Perfect Wedding Vendors"** (simpler, clearer)

**Description:**
~~Let our intelligent assistant orchestrate every detail of your perfect day, from venues to vendors.~~
→ **"Answer a few questions. Get matched with NSW vendors. Send inquiry emails. Track responses. Plan your wedding with less admin."**

### Three Features (Redesigned)

#### 01 - Share Your Details
**Icon:** Form/checklist
**Description:** "Quick questionnaire (date, location, guest count, budget, style) so we know what you're looking for."

#### 02 - Get Vendor Matches
**Icon:** Search/filter
**Description:** "We show you NSW vendors that match your criteria. Browse their services, pricing, and reviews."

#### 03 - Send & Track Inquiries
**Icon:** Email/checkmark
**Description:** "Use our email templates (or write your own). Send inquiries. Track who's responded. All in one dashboard."

### New Value Propositions

Instead of vague promises, specific benefits:
- ✅ "Stop hunting for vendor emails - we've already got 45+ NSW vendors"
- ✅ "No more lost emails - track all responses in one place"
- ✅ "Save time with templates - or customize them however you want"
- ✅ "Know exactly what we do - no black box AI magic"

---

## 🎨 Dark Mode Issues

### Files to Fix

1. **app/page.tsx** (Landing page)
   - All `text-gray-900` → add `dark:text-white`
   - All `text-gray-600` → add `dark:text-gray-300`
   - All `text-gray-500` → add `dark:text-gray-400`
   - Feature cards `bg-white/80` → add `dark:bg-gray-800/80`
   - Feature card text → add dark variants

2. **app/dashboard/page.tsx** (Dashboard)
   - Investigate body content (currently light in dark mode)
   - Ensure all cards, text, backgrounds have dark variants

3. **All other pages**
   - Questionnaire
   - Vendor browsing
   - Chat interface
   - Outreach preview

### Dark Mode Best Practices

✅ **Never use pure black** - Use gray-900, slate-900
✅ **Ensure contrast ratios** - WCAG AA minimum (4.5:1 for text)
✅ **Test gradients** - Some gradients invisible in dark mode
✅ **Consistent theme** - All pages should match
✅ **System preference** - Respect user's OS setting

---

## 🚀 Implementation Plan

### Phase 1: Dark Mode Fixes (HIGH PRIORITY)
**Estimate:** 2-3 hours
**Use:** frontend-design skill

1. Fix homepage text visibility (app/page.tsx)
2. Fix dashboard body content
3. Audit all pages for dark mode coverage
4. Add dark mode variants systematically
5. Test on actual dark mode OS settings

### Phase 2: Content Rewrite (HIGH PRIORITY)
**Estimate:** 2-3 hours

1. Rewrite hero section (landing page)
2. Rewrite three feature descriptions
3. Update trust indicators / value props
4. Remove "AI-powered" language where misleading
5. Add transparency about what we actually do

### Phase 3: Landing Page Redesign (MEDIUM PRIORITY)
**Estimate:** 4-6 hours
**Use:** frontend-design skill

1. New hero layout (clearer value prop)
2. "How it works" section (3 specific steps)
3. Screenshots/visuals showing the actual product
4. Honest feature list (what we do vs don't do)
5. Clear CTA ("Get Started" → "Find Vendors")

---

## 📋 Content Checklist

### Copy to Review
- [ ] Homepage hero tagline
- [ ] Homepage description
- [ ] Three feature descriptions
- [ ] Trust indicators
- [ ] Dashboard empty state text
- [ ] Questionnaire intro text
- [ ] Email templates (are they transparent?)
- [ ] Button CTAs ("Begin Your Journey" → "Find Vendors")

### Tone Guidelines
✅ **Transparent** - Say what we do, not what we aspire to
✅ **Helpful** - We're a tool, not a replacement for planning
✅ **Specific** - "45 NSW vendors" beats "curated matches"
✅ **Honest** - "You can edit templates" beats "seamless automation"

---

## 🎯 Success Criteria

After implementation:
1. User reads landing page and knows **exactly** what we do
2. No promises we can't deliver on
3. Dark mode works perfectly on all pages
4. Copy emphasizes **transparency** and **user control**
5. No "black box AI" language unless we explain it

---

**Next Steps:** Use frontend-design skill to fix dark mode, then review/approve content rewrites.
