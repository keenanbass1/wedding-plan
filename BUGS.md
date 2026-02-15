# Known Bugs & Issues

**Last Updated:** 2026-02-16
**Status:** Pre-Production Testing Phase

---

## 🔴 CRITICAL (Must Fix Before Production)

### 1. No Logout Button

**Status:** ❌ **NOT FIXED**
**Priority:** **CRITICAL**
**Impact:** Users cannot log out of the application

**Description:**
There is no logout button anywhere in the application. Users who sign in cannot sign out without manually clearing browser cookies.

**Location:** Missing from `/dashboard` and all dashboard sub-pages

**Expected Behavior:**

- Logout button should appear in dashboard header/navigation
- Clicking logout should:
  1. Call `supabase.auth.signOut()`
  2. Clear session cookies
  3. Redirect to home page or login page

**Fix Required:**

```typescript
// Add to dashboard layout or header component
const handleLogout = async () => {
  const supabase = createClient()
  await supabase.auth.signOut()
  router.push('/')
  router.refresh()
}
```

**Files to Modify:**

- Create `/components/LogoutButton.tsx` or add button to existing navigation
- Add to `/app/dashboard/page.tsx` or create shared layout

---

### 2. Resend API Integration Blocked

**Status:** ⏸️ **BLOCKED** (Resend service down)
**Priority:** **CRITICAL**
**Impact:** Email sending functionality completely non-functional

**Description:**
Cannot test or use email outreach feature because Resend API service is currently down.

**Blockers:**

- Resend service unavailable
- No API key can be obtained
- Cannot verify email sending works
- Cannot test webhook integration

**Workaround:** None until Resend service is back online

**Actions Required:**

1. Wait for Resend to come back online
2. Sign up for Resend account
3. Get API key and add to environment variables
4. Verify domain for production email sending
5. Test batch email sending
6. Configure webhooks

---

## 🟡 HIGH PRIORITY (Should Fix Soon)

### 3. Email Verification Redirect Not Tested

**Status:** ⚠️ **UNTESTED**
**Priority:** **HIGH**
**Impact:** Users may not be redirected correctly after email verification

**Description:**
Email verification flow hasn't been tested end-to-end. Need to verify:

- Verification email is sent
- Click verification link redirects to correct page
- Session is established after verification
- User can access dashboard immediately

**Testing Required:**

1. Sign up with new email
2. Check email for verification link
3. Click link
4. Verify redirect to `/dashboard`
5. Verify session persists

---

### 4. Wedding Data Persistence from Chat

**Status:** ⚠️ **UNTESTED**
**Priority:** **HIGH**
**Impact:** Vendor matching may not work if wedding data isn't saved

**Description:**
Need to verify that completing the chat questionnaire actually saves wedding data to the database and associates it with the logged-in user.

**Testing Required:**

1. Complete chat questionnaire
2. Check database for Wedding record
3. Verify user ID is correctly associated
4. Verify vendor matching uses this data
5. Test "View All Vendors" button navigation

---

### 5. Vendor Page May Not Exist

**Status:** ⚠️ **UNCERTAIN**
**Priority:** **HIGH**
**Impact:** "View All Vendors" button may lead to 404

**Description:**
The chat interface likely has a "View All Vendors" button, but we need to verify `/vendors` page exists and works.

**Testing Required:**

1. Check if `/vendors` page exists
2. Test navigation from chat to vendors page
3. Verify vendor data is passed correctly
4. Verify selection state works

---

## 🟢 MEDIUM PRIORITY (Nice to Have)

### 6. Generic Error Messages

**Status:** ❌ **NOT FIXED**
**Priority:** **MEDIUM**
**Impact:** Poor user experience when errors occur

**Description:**
Many API routes and forms show generic error messages like "Failed to save response" or "Something went wrong"

**Files Affected:**

- All API routes (`/api/*`)
- All form components
- VendorResponseForm
- Email generation flows

**Improvement:**
Provide specific, actionable error messages:

- "Email address is already in use"
- "Invalid password (must be at least 8 characters)"
- "Failed to connect to email service. Please try again later."

---

### 7. Loading States Missing or Inconsistent

**Status:** ⚠️ **PARTIAL**
**Priority:** **MEDIUM**
**Impact:** User doesn't know if action is processing

**Description:**
Some actions may not show loading indicators:

- Email generation (long-running AI request)
- Dashboard data loading
- Vendor matching algorithm
- Form submissions

**Files to Check:**

- `/app/outreach/preview/page.tsx` - Email generation
- `/app/dashboard/page.tsx` - Dashboard stats loading
- `/app/vendors/page.tsx` - Vendor matching
- All form components

---

### 8. Empty States Need Improvement

**Status:** ⚠️ **PARTIAL**
**Priority:** **MEDIUM**
**Impact:** User doesn't understand why page is empty

**Description:**
Empty states exist but may need better messaging and clearer calls-to-action

**Pages to Review:**

- Dashboard (no outreach yet)
- Outreach page (no vendors contacted)
- Responses page (no responses yet)

**Improvement Ideas:**

- Add helpful hints ("Get started by...")
- Add prominent CTAs
- Add illustration or icon
- Explain what will appear here once they take action

---

### 9. Responsive Design Not Fully Tested

**Status:** ⚠️ **UNTESTED**
**Priority:** **MEDIUM**
**Impact:** Poor mobile experience

**Description:**
UI was designed with desktop in mind. Need to test on:

- Mobile phones (320px - 428px)
- Tablets (768px - 1024px)
- Small laptops (1024px - 1440px)

**Components at Risk:**

- VendorGrid (may not stack well on mobile)
- Dashboard tables (may need horizontal scroll)
- Email preview cards (may be too wide)
- Forms (may have too-wide inputs)

---

## 🔵 LOW PRIORITY (Future Enhancements)

### 10. No Animations on Some Transitions

**Status:** 💡 **ENHANCEMENT**
**Priority:** **LOW**

**Description:**
Some page transitions and interactions lack smooth animations that would improve polish

**Suggestions:**

- Page transition animations
- Card hover effects (already have some)
- Form field focus animations
- Success/error message animations
- Modal enter/exit animations

---

### 11. Accessibility (ARIA) Not Implemented

**Status:** 💡 **ENHANCEMENT**
**Priority:** **LOW**

**Description:**
No ARIA labels, roles, or keyboard navigation considered

**Improvements Needed:**

- Add ARIA labels to all interactive elements
- Ensure keyboard navigation works
- Test with screen reader
- Add focus visible states
- Ensure proper heading hierarchy

---

### 12. Performance Optimization Not Done

**Status:** 💡 **ENHANCEMENT**
**Priority:** **LOW**

**Description:**
No performance optimization done yet

**Potential Optimizations:**

- Image optimization (vendor photos)
- Code splitting
- Lazy loading for vendor grid
- Debounce search/filter inputs
- Memoize expensive computations
- Add loading="lazy" to images

---

## Testing Checklist (From TESTING_PLAN.md)

### Build & Infrastructure ✅

- [x] 1. Local build test ✅ **PASSED**
- [x] 2. TypeScript checks ✅ **PASSED**
- [ ] 3. Environment variables check
- [ ] 4. Database migration status

### Authentication Tests

- [ ] 5. Signup flow
- [ ] 6. Email verification
- [ ] 7. Login flow
- [ ] 8. Magic link
- [ ] 9. Google OAuth (if configured)
- [ ] 10. Middleware protection
- [ ] 11. Session persistence
- [ ] 12. Logout flow ❌ **BLOCKED** (no logout button)

### Vendor Selection Tests

- [ ] 13. Chat to vendors flow
- [ ] 14. Vendor browsing page
- [ ] 15. Vendor selection
- [ ] 16. Bulk selection
- [ ] 17. Vendor detail expansion
- [ ] 18. Contact button

### Email Tests

- [ ] 19. Email generation (Claude API)
- [ ] 20. Email preview
- [ ] 21. Email editing
- [ ] 22. Email removal
- [ ] 23. Send batch ⏸️ **BLOCKED** (Resend down)

### Dashboard Tests

- [ ] 24. Main dashboard
- [ ] 25. Navigation
- [ ] 26. Outreach page
- [ ] 27. Vendor detail
- [ ] 28. Manual response entry
- [ ] 29. Responses inbox

### Infrastructure Tests

- [ ] 30. Database relationships
- [ ] 31. Vercel env vars

### Quality Tests (Ongoing)

- [ ] 32. Console errors
- [ ] 33. Network requests
- [ ] 34. Responsive design
- [ ] 35. Loading states
- [ ] 36. Error handling

---

## Summary

**Total Issues:** 12
**Critical:** 2 (Logout button, Resend integration)
**High Priority:** 3
**Medium Priority:** 4
**Low Priority:** 3

**Blocking Production:**

- No logout functionality
- Email outreach not testable (Resend down)

**Can Deploy to Staging:**

- Yes, all build errors fixed
- Authentication flows work (untested)
- Dashboard pages load
- Limited testing possible without Resend

**Next Steps:**

1. ✅ Fix all build errors (DONE)
2. **Add logout button (30 minutes)** ← NEXT
3. Test authentication flows locally
4. Test vendor browsing and selection
5. Wait for Resend to come back online
6. Complete email sending tests
7. Deploy to Vercel staging
8. Full end-to-end testing
