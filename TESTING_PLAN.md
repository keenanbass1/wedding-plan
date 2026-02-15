# Comprehensive Testing Plan

## Overview
This document outlines a systematic approach to verify all implemented features (Phases 1-4) are working correctly. Since Resend is currently down, we'll test everything except the actual email sending.

---

## Phase 1: Authentication System ✓

### 1.1 Local Build Test
**Status:** PRIORITY - Test First
**What:** Ensure the app builds without errors
**How:**
```bash
npm run build
```
**Expected:** Build completes successfully with no TypeScript or ESLint errors
**Blockers:** None

---

### 1.2 Signup Flow
**Status:** Can Test Now
**What:** New user registration with email/password
**How:**
1. Navigate to `/auth/signup`
2. Enter test email: `test@example.com`
3. Enter password: `TestPassword123!`
4. Check "I agree to terms"
5. Click "Create Account"

**Expected:**
- Loading state shows "Creating account..."
- Success message: "Check your email to verify your account"
- Email sent to test@example.com (check Supabase dashboard)
- User record created in Supabase Auth
- User record created in Prisma database with `authId`

**Verification:**
```sql
-- Check Supabase dashboard: Authentication > Users
-- Check Prisma database:
SELECT id, authId, email, name, createdAt FROM User WHERE email = 'test@example.com';
```

**Potential Issues:**
- [ ] Email verification email not sending (check Supabase email settings)
- [ ] User sync to database failing (check `/api/auth/sync-user`)
- [ ] Password requirements not clear to user

---

### 1.3 Email Verification
**Status:** Can Test Now
**What:** Verify email confirmation flow
**How:**
1. Check email inbox for verification link
2. Click verification link
3. Should redirect to `/dashboard`

**Expected:**
- User redirected to dashboard
- Session established (cookie set)
- User marked as verified in Supabase

**Verification:**
```bash
# Check browser cookies for sb-* cookies
# Check Supabase dashboard: user should show "Confirmed"
```

**Potential Issues:**
- [ ] Redirect URL incorrect (check `emailRedirectTo` in signup page)
- [ ] Session not persisting after verification

---

### 1.4 Login Flow (Email/Password)
**Status:** Can Test Now
**What:** Existing user login
**How:**
1. Navigate to `/auth/login`
2. Enter verified email: `test@example.com`
3. Enter password: `TestPassword123!`
4. Click "Sign In"

**Expected:**
- Loading state shows "Signing in..."
- Redirect to `/dashboard`
- Session established
- User data loaded

**Potential Issues:**
- [ ] Incorrect credentials error not shown clearly
- [ ] Session not syncing to database

---

### 1.5 Magic Link Flow
**Status:** Can Test Now
**What:** Passwordless login via email
**How:**
1. Navigate to `/auth/login`
2. Enter email: `test@example.com`
3. Click "Send magic link"
4. Check email for magic link
5. Click link

**Expected:**
- Success message: "Check your email for a magic sign-in link"
- Email received with login link
- Clicking link redirects to `/dashboard`
- Session established

**Verification:**
```bash
# Check Supabase dashboard: Email Templates > Magic Link
```

**Potential Issues:**
- [ ] Magic link expiring too quickly
- [ ] Redirect URL incorrect

---

### 1.6 Google OAuth
**Status:** Can Test Now (if user configured Google OAuth)
**What:** Social login with Google
**How:**
1. Navigate to `/auth/login`
2. Click "Sign in with Google"
3. Complete Google OAuth flow
4. Should redirect to `/dashboard`

**Expected:**
- Google consent screen appears
- After approval, redirect to `/auth/callback`
- Session established
- User created in Supabase and Prisma

**Potential Issues:**
- [ ] Redirect URI mismatch (check Google Cloud Console)
- [ ] Missing scopes
- [ ] User sync failing for OAuth users

---

### 1.7 Middleware Protection
**Status:** Can Test Now
**What:** Ensure protected routes require authentication
**How:**
1. Log out (or open incognito window)
2. Try to navigate to `/dashboard`
3. Try to navigate to `/dashboard/outreach`
4. Try to navigate to `/dashboard/responses`

**Expected:**
- All attempts redirect to `/auth/login?redirect=/dashboard/*`
- After login, redirect to originally requested page

**Potential Issues:**
- [ ] Redirect parameter not working
- [ ] Middleware not catching all dashboard routes

---

### 1.8 Session Persistence
**Status:** Can Test Now
**What:** Session should persist across page refreshes
**How:**
1. Log in successfully
2. Navigate to `/dashboard`
3. Refresh page
4. Close browser, reopen, navigate to `/dashboard`

**Expected:**
- Session persists across refreshes
- Session persists across browser restarts (for ~7 days by default)

**Potential Issues:**
- [ ] Session expiring too quickly
- [ ] Cookies not being set correctly

---

### 1.9 Logout Flow
**Status:** Can Test Now
**What:** User can log out successfully
**How:**
1. Log in
2. Find and click logout button (need to add this if missing)
3. Should redirect to home or login page

**Expected:**
- Session cleared
- Cookies removed
- Redirect to public page

**⚠️ POTENTIAL ISSUE:** I don't see a logout button in the dashboard. Need to add this!

---

## Phase 2: Vendor Selection UI ✓

### 2.1 Chat to Vendors Flow
**Status:** Can Test Now
**What:** Complete questionnaire and see vendor matches
**How:**
1. Navigate to `/chat` (or home page)
2. Complete multi-stage questionnaire
3. Submit final answers

**Expected:**
- Vendor matches displayed with match scores
- Categories shown: Venues, Photographers, Caterers, etc.
- "View All Vendors" button appears

**Potential Issues:**
- [ ] Wedding data not saving to database
- [ ] Vendor matching algorithm not running
- [ ] Match scores not calculated correctly

---

### 2.2 Vendor Browsing Page
**Status:** Can Test Now
**What:** Browse all matched vendors
**How:**
1. Click "View All Vendors" from chat
2. Navigate to `/vendors`

**Expected:**
- VendorGrid component renders
- Vendors grouped by category
- Each vendor card shows:
  - Photo (or placeholder)
  - Name
  - Category badge
  - Location
  - Pricing
  - Match score
  - Selection checkbox

**Verification:**
```bash
# Check browser console for errors
# Inspect vendor data structure
```

**Potential Issues:**
- [ ] Vendors page not found (404)
- [ ] Wedding data not passed to page
- [ ] No vendors found for location

---

### 2.3 Vendor Selection
**Status:** Can Test Now
**What:** Select/deselect individual vendors
**How:**
1. On `/vendors`, click checkbox on 3 vendors
2. Counter should update
3. Deselect 1 vendor
4. Counter should update

**Expected:**
- Checkbox visual state toggles
- Counter shows "3 vendors selected" then "2 vendors selected"
- Selection state persists while navigating within page

**Potential Issues:**
- [ ] Selection state not updating
- [ ] Checkboxes not visually changing
- [ ] Counter not updating

---

### 2.4 Bulk Selection
**Status:** Can Test Now
**What:** Select/deselect all vendors in a category
**How:**
1. Click "Select All" for Venues category
2. All venue checkboxes should check
3. Click "Deselect All"
4. All venue checkboxes should uncheck

**Expected:**
- All vendors in category toggle
- Counter updates correctly
- Other categories not affected

**Potential Issues:**
- [ ] Bulk selection not working
- [ ] Categories not properly grouped

---

### 2.5 Vendor Detail Expansion
**Status:** Can Test Now
**What:** Expand vendor card to see details
**How:**
1. Click "View Details" on a vendor card
2. Details section should expand

**Expected:**
- Match reasons displayed
- Contact info shown (website, phone)
- Smooth animation

**Potential Issues:**
- [ ] Expansion not working
- [ ] Match reasons not showing
- [ ] Contact info missing

---

### 2.6 Contact Selected Vendors Button
**Status:** Can Test Now (UI only, email send will fail)
**What:** Proceed to email preview with selected vendors
**How:**
1. Select 5 vendors
2. Click "Contact Selected Vendors" button
3. Should navigate to `/outreach/preview`

**Expected:**
- Button appears when ≥1 vendor selected
- Button shows count: "Contact 5 Vendors"
- Navigates to preview page with selected vendor IDs

**Potential Issues:**
- [ ] Button not appearing
- [ ] Navigation not working
- [ ] Vendor IDs not passed to preview page

---

## Phase 3: Email Outreach System ⚠️

### 3.1 Email Generation (AI)
**Status:** Can Test Now (Claude API should work)
**What:** Generate personalized emails for selected vendors
**How:**
1. Select 3 vendors
2. Click "Contact Selected Vendors"
3. Wait for emails to generate

**Expected:**
- Loading state shown
- 3 personalized emails generated
- Each email has:
  - Vendor-specific subject
  - Personalized body mentioning vendor name, category
  - User's wedding details (date, location, guest count)
  - Call to action

**Verification:**
```bash
# Check browser Network tab for API call to /api/outreach/generate-emails
# Check response payload
```

**Potential Issues:**
- [ ] Claude API key invalid or missing
- [ ] API rate limit exceeded
- [ ] Timeout on email generation
- [ ] Fallback template not triggering on API failure

---

### 3.2 Email Preview Page
**Status:** Can Test Now
**What:** View generated emails before sending
**How:**
1. After emails generated, verify preview page shows all emails
2. Check layout and formatting

**Expected:**
- All selected vendors shown
- Subject and body preview for each
- Edit buttons functional
- Remove buttons functional
- "Send All" button present

**Potential Issues:**
- [ ] Preview page not loading
- [ ] Emails not displaying correctly
- [ ] Wedding data not showing in emails

---

### 3.3 Email Editing
**Status:** Can Test Now
**What:** Edit generated emails before sending
**How:**
1. Click "Edit" on an email
2. Modify subject line
3. Modify email body
4. Save changes

**Expected:**
- Email becomes editable
- Changes persist in state
- Preview updates with edits

**Potential Issues:**
- [ ] Edit mode not working
- [ ] Changes not saving
- [ ] Preview not updating

---

### 3.4 Email Removal
**Status:** Can Test Now
**What:** Remove vendors from outreach batch
**How:**
1. Click "Remove" on an email
2. Email should disappear
3. Counter should update

**Expected:**
- Email removed from preview
- Vendor count updates
- Removed vendor not included in send

**Potential Issues:**
- [ ] Remove not working
- [ ] Counter not updating

---

### 3.5 Send Batch API
**Status:** CANNOT FULLY TEST (Resend down)
**What:** Send batch of emails via Resend
**How:** (When Resend is back up)
1. On preview page, click "Send All"
2. Confirm in dialog
3. Wait for send

**Expected:**
- Loading state shown
- API call to `/api/outreach/send-batch`
- Database records created in `VendorOutreach`
- Wedding status updated to `OUTREACH`
- Redirect to dashboard after success

**Alternative Test (Without Resend):**
```bash
# Test the API endpoint with a mock request
curl -X POST http://localhost:3000/api/outreach/send-batch \
  -H "Content-Type: application/json" \
  -d '{
    "weddingId": "test-wedding-id",
    "emails": [{
      "vendorId": "test-vendor-id",
      "vendorEmail": "vendor@example.com",
      "vendorName": "Test Venue",
      "subject": "Wedding Inquiry",
      "body": "Hi there..."
    }]
  }'
```

**Potential Issues:**
- [ ] Resend API key missing
- [ ] Batch API format incorrect
- [ ] Database records not created
- [ ] Error handling not working

---

## Phase 4: Dashboard & Response Tracking ✓

### 4.1 Main Dashboard Load
**Status:** Can Test Now
**What:** Dashboard shows correct data
**How:**
1. Log in
2. Navigate to `/dashboard`
3. Verify data displayed

**Expected:**
- Wedding summary card (date, location, guest count)
- Stats cards showing:
  - Total vendors contacted (should be 0 initially)
  - Responses received (0)
  - Emails opened (0)
  - Pending responses (0)
- Recent activity timeline (empty initially)
- Quick action cards

**Potential Issues:**
- [ ] Dashboard not loading
- [ ] Wedding data not displaying
- [ ] Stats not calculating correctly
- [ ] Empty state not shown properly

---

### 4.2 Navigation Links
**Status:** Can Test Now
**What:** All dashboard navigation works
**How:**
1. From dashboard, click "View Outreach"
2. Navigate to `/dashboard/outreach`
3. Click "View Responses"
4. Navigate to `/dashboard/responses`
5. Use back links to return

**Expected:**
- All links navigate correctly
- Back buttons work
- No 404 errors

**Potential Issues:**
- [ ] Broken links
- [ ] 404 errors
- [ ] Back navigation broken

---

### 4.3 Outreach Tracking Page
**Status:** Can Test Now (with mock data)
**What:** View all contacted vendors
**How:**
1. Navigate to `/dashboard/outreach`
2. View vendor outreach table/grid

**Expected:**
- Table shows all contacted vendors
- Columns: Vendor, Category, Status, Sent Date, Response Date, Quote
- Filter options (if implemented)
- Click vendor → navigate to detail page

**Note:** Will be empty until emails are sent via Resend

**Potential Issues:**
- [ ] Page not loading
- [ ] Empty state not showing
- [ ] Table layout broken

---

### 4.4 Individual Vendor Detail Page
**Status:** Can Test Now (after sending emails)
**What:** View single vendor outreach details
**How:**
1. Navigate to `/dashboard/vendor/[id]`
2. View email history

**Expected:**
- Original sent email displayed
- Delivery tracking (if available)
- Response section (empty or with response)
- Manual response entry form
- Quote display (if provided)

**Potential Issues:**
- [ ] Page not loading
- [ ] Email content not displaying
- [ ] Form not rendering

---

### 4.5 Manual Response Entry
**Status:** Can Test Now
**What:** Add vendor response manually
**How:**
1. On vendor detail page, find response form
2. Paste mock vendor response
3. Enter quote amount: 5000
4. Add notes
5. Click "Save Response"

**Expected:**
- Loading state shown
- Response saved to database
- Page updates to show response
- Stats on dashboard update
- Response appears in responses inbox

**Verification:**
```sql
SELECT * FROM VendorOutreach WHERE replied = true;
```

**Potential Issues:**
- [ ] Form submission failing
- [ ] Database not updating
- [ ] Quote conversion (dollars to cents) incorrect
- [ ] Page not refreshing

---

### 4.6 Responses Inbox
**Status:** Can Test Now (after adding manual responses)
**What:** View all vendor responses
**How:**
1. Navigate to `/dashboard/responses`
2. View response list

**Expected:**
- All responded vendors shown
- Response preview snippet
- Quote amount displayed (if provided)
- Responded date shown
- Click vendor → navigate to detail page

**Potential Issues:**
- [ ] Empty state showing when responses exist
- [ ] Response text not displaying
- [ ] Quote formatting incorrect
- [ ] Date formatting wrong

---

## Database & Infrastructure

### 5.1 Database Migrations
**Status:** Can Test Now
**What:** All migrations applied correctly
**How:**
```bash
npx prisma migrate status
```

**Expected:**
- All migrations applied
- No pending migrations
- Database schema matches Prisma schema

**Potential Issues:**
- [ ] Pending migrations not applied
- [ ] Schema drift

---

### 5.2 Database Relationships
**Status:** Can Test Now
**What:** Foreign keys and relations working
**How:**
```sql
-- Test User -> Wedding relationship
SELECT u.email, w.date, w.location
FROM User u
JOIN Wedding w ON u.id = w.userId;

-- Test Wedding -> VendorOutreach relationship
SELECT w.date, vo.emailSent, v.name
FROM Wedding w
LEFT JOIN VendorOutreach vo ON w.id = vo.weddingId
LEFT JOIN Vendor v ON vo.vendorId = v.id;
```

**Expected:**
- Queries execute without errors
- Data properly joined
- Cascade deletes work (if configured)

**Potential Issues:**
- [ ] Missing foreign keys
- [ ] Orphaned records
- [ ] Cascade behavior incorrect

---

### 5.3 Environment Variables (Local)
**Status:** Can Test Now
**What:** All required env vars present in .env.local
**How:**
```bash
cat .env.local
```

**Required Variables:**
```bash
# Database
DATABASE_URL="postgresql://..."

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJ..."

# AI
ANTHROPIC_API_KEY="sk-ant-api03-..."
CLAUDE_MODEL="claude-sonnet-4-5-20250929"

# Email (when Resend is back)
RESEND_API_KEY=""  # ⚠️ Empty, needs value
EMAIL_FROM="onboarding@resend.dev"  # Or verified domain
```

**Potential Issues:**
- [ ] Missing required variables
- [ ] Invalid API keys
- [ ] Wrong format

---

### 5.4 Environment Variables (Vercel)
**Status:** Can Test Now
**What:** All env vars set in Vercel
**How:**
```bash
npx vercel env ls
```

**Expected:**
- All production env vars listed
- Match local .env.local (except for production-specific values)

**Potential Issues:**
- [ ] Missing variables in Vercel
- [ ] Variables not exposed to build/runtime correctly

---

### 5.5 Build Process
**Status:** Can Test Now
**What:** Production build succeeds
**How:**
```bash
npm run build
```

**Expected:**
- Build completes successfully
- No TypeScript errors
- No ESLint errors (already fixed)
- Static pages generated
- Server components compiled

**Potential Issues:**
- [ ] Build failures
- [ ] Type errors
- [ ] Missing dependencies

---

### 5.6 TypeScript Checks
**Status:** Can Test Now
**What:** No TypeScript errors
**How:**
```bash
npx tsc --noEmit
```

**Expected:**
- No type errors
- All imports resolved
- Proper type inference

**Potential Issues:**
- [ ] Type mismatches
- [ ] Missing type definitions
- [ ] Incorrect Prisma types

---

## Code Quality Checks

### 6.1 Console Errors
**Status:** Can Test Now
**What:** No console errors during normal usage
**How:**
1. Open browser DevTools
2. Navigate through all pages
3. Monitor console

**Expected:**
- No errors
- Warnings acceptable (document as known issues)

**Potential Issues:**
- [ ] React hydration errors
- [ ] API errors
- [ ] Image loading errors

---

### 6.2 Network Requests
**Status:** Can Test Now
**What:** All API calls successful
**How:**
1. Open Network tab
2. Perform actions (login, view vendors, etc.)
3. Check API responses

**Expected:**
- All requests return 200 or 3xx
- No 500 errors
- Proper request/response format

**Potential Issues:**
- [ ] API routes returning errors
- [ ] CORS issues
- [ ] Timeout errors

---

### 6.3 Responsive Design
**Status:** Can Test Now
**What:** UI works on mobile/tablet
**How:**
1. Open DevTools
2. Toggle device emulation
3. Test on iPhone, iPad, Desktop sizes

**Expected:**
- Layouts adapt to screen size
- Text readable
- Buttons clickable
- No horizontal scroll

**Potential Issues:**
- [ ] Layout breaks on mobile
- [ ] Text too small
- [ ] Buttons too small to tap

---

### 6.4 Loading States
**Status:** Can Test Now
**What:** All async actions show loading state
**How:**
1. Slow down network (DevTools throttling)
2. Perform actions (login, generate emails, etc.)
3. Verify loading indicators

**Expected:**
- Spinners or skeleton screens during loading
- Buttons disabled during submission
- No flash of incorrect content

**Potential Issues:**
- [ ] No loading indicators
- [ ] Double submissions possible
- [ ] Loading states not clearing

---

### 6.5 Error Handling
**Status:** Can Test Now
**What:** Errors displayed to user
**How:**
1. Trigger errors (wrong password, network error, etc.)
2. Verify error messages shown

**Expected:**
- Clear error messages
- No crashes
- User can recover from errors

**Potential Issues:**
- [ ] Generic error messages
- [ ] Errors not caught
- [ ] App crashes on error

---

## Testing Execution Order

### Immediate (Do Now)
1. ✅ Local build test (5.5)
2. ✅ TypeScript checks (5.6)
3. ✅ Environment variables check (5.3)
4. ✅ Database migration status (5.1)

### Authentication Tests (Can Do Now)
5. ✅ Signup flow (1.2)
6. ✅ Email verification (1.3)
7. ✅ Login flow (1.4)
8. ✅ Magic link (1.5)
9. ✅ Google OAuth (1.6) - if configured
10. ✅ Middleware protection (1.7)
11. ✅ Session persistence (1.8)
12. ⚠️ Logout flow (1.9) - need to add logout button first

### Vendor Selection Tests (Can Do Now)
13. ✅ Chat to vendors flow (2.1)
14. ✅ Vendor browsing page (2.2)
15. ✅ Vendor selection (2.3)
16. ✅ Bulk selection (2.4)
17. ✅ Vendor detail expansion (2.5)
18. ✅ Contact button (2.6)

### Email Tests (Partial)
19. ✅ Email generation (3.1) - Claude API should work
20. ✅ Email preview (3.2)
21. ✅ Email editing (3.3)
22. ✅ Email removal (3.4)
23. ⚠️ Send batch (3.5) - BLOCKED by Resend downtime

### Dashboard Tests (Can Do Now After Setup)
24. ✅ Main dashboard (4.1)
25. ✅ Navigation (4.2)
26. ✅ Outreach page (4.3)
27. ✅ Vendor detail (4.4)
28. ✅ Manual response entry (4.5)
29. ✅ Responses inbox (4.6)

### Infrastructure Tests (Can Do Now)
30. ✅ Database relationships (5.2)
31. ✅ Vercel env vars (5.4)

### Quality Tests (Ongoing)
32. ✅ Console errors (6.1)
33. ✅ Network requests (6.2)
34. ✅ Responsive design (6.3)
35. ✅ Loading states (6.4)
36. ✅ Error handling (6.5)

---

## Known Issues to Fix

### Critical (Must Fix Before Production)
- [ ] **No logout button** - Users cannot log out
- [ ] **Resend API integration** - Blocked until service is back

### High Priority
- [ ] **Email verification redirect** - Verify correct redirect after email confirmation
- [ ] **Wedding data persistence** - Ensure chat → vendors flow saves wedding data
- [ ] **Error messages** - Generic error messages need improvement

### Medium Priority
- [ ] **Responsive design** - Test on mobile devices thoroughly
- [ ] **Loading states** - Some actions may not show loading indicators
- [ ] **Empty states** - Verify all empty states are informative

### Low Priority
- [ ] **Animations** - Some transitions may need refinement
- [ ] **Accessibility** - ARIA labels and keyboard navigation
- [ ] **Performance** - Optimize large vendor lists

---

## Success Criteria

Before moving to Phase 5 (Webhooks), all of the following must be true:

- ✅ Build succeeds locally and on Vercel
- ✅ No TypeScript or ESLint errors
- ✅ Authentication flow works end-to-end
- ✅ Users can browse and select vendors
- ✅ Email generation works (Claude API)
- ✅ Dashboard displays correct data
- ✅ Manual response entry works
- ✅ Database relationships intact
- ⚠️ Email sending works (BLOCKED by Resend)
- ⚠️ Logout functionality added

---

## Next Steps After Testing

1. Fix all identified bugs
2. Add missing features (logout button)
3. Wait for Resend to be back online
4. Complete email sending tests
5. Proceed to Phase 5: Webhook Configuration
6. End-to-end production testing
