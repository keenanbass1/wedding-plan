# 🧪 Complete Testing Checklist

**Last Updated:** February 16, 2026
**Status:** Ready for Testing

---

## 🎯 Pre-Testing Verification

### ✅ Environment Check
Run these commands locally to verify setup:

```bash
# 1. Check database connection
npm run db:test

# 2. View database in Prisma Studio
npm run db:studio

# 3. Verify environment variables are set
cat .env.local | grep -E "SUPABASE|ANTHROPIC|RESEND|DATABASE"
```

### ✅ Production Verification
- [ ] Deployment complete: https://vercel.com/keenanbass-outlookcoms-projects/wedding-plan
- [ ] All environment variables set in Vercel
- [ ] No build errors in latest deployment

---

## 📋 Test Suite

### **Test 1: Landing Page** ✅
**URL:** https://wedding-plan-lime.vercel.app

**Expected:**
- [ ] Beautiful rose/pink/purple gradient background
- [ ] Floral decorative elements
- [ ] "Begin Your Journey" button visible
- [ ] "Sign In" button in header (if not logged in)
- [ ] Click "Begin Your Journey" → Redirects to `/dashboard`

---

### **Test 2: Dashboard (Not Logged In)** ✅
**URL:** https://wedding-plan-lime.vercel.app/dashboard

**Expected:**
- [ ] Redirects to `/auth/login?redirect=/dashboard`
- [ ] Shows login page
- [ ] After login, returns to dashboard

---

### **Test 3: Email/Password Signup** ✅
**URL:** https://wedding-plan-lime.vercel.app/auth/signup

**Steps:**
1. Enter email and password
2. Click "Sign Up"
3. Check email for verification link
4. Click verification link
5. Should redirect to dashboard

**Expected:**
- [ ] Signup form loads correctly
- [ ] Validation works (email format, password requirements)
- [ ] Email verification sent
- [ ] Verification link works
- [ ] After verification, redirected to dashboard
- [ ] User appears in database (check Prisma Studio)

---

### **Test 4: Email/Password Login** ✅
**URL:** https://wedding-plan-lime.vercel.app/auth/login

**Steps:**
1. Enter email and password from Test 3
2. Click "Sign In"
3. Should redirect to dashboard

**Expected:**
- [ ] Login form loads
- [ ] Correct credentials → Dashboard
- [ ] Wrong credentials → Error message shown
- [ ] Session persists (refresh page, still logged in)

---

### **Test 5: Google OAuth Login** ⚠️ **NEEDS DEBUGGING**
**URL:** https://wedding-plan-lime.vercel.app/auth/login

**Steps:**
1. Click "Sign in with Google"
2. Select Google account
3. Click "Continue"
4. Watch what happens

**Expected (if working):**
- [ ] Redirects to Google OAuth consent screen
- [ ] After consent, redirects to `/auth/callback?code=...`
- [ ] Callback processes code
- [ ] Redirects to `/dashboard`
- [ ] User logged in

**Current Issue:**
- Redirects to home page instead of dashboard
- With new error handling, should show error on login page if failing

**Debug Steps:**
1. Open browser DevTools (F12) → Network tab
2. Click "Sign in with Google"
3. Watch the redirect flow:
   - `/auth/login` → Google OAuth URL
   - Google → `/auth/callback?code=XXX` (or error)
   - Callback → Where does it go? (Dashboard or home?)
4. Check Console tab for any errors
5. Check Application tab → Cookies → Look for Supabase auth cookies

**If it fails:**
- [ ] Does it show an error message on the login page?
- [ ] Check Vercel function logs for `/auth/callback`
- [ ] Look for error in browser console

---

### **Test 6: Questionnaire Flow** ✅
**URL:** https://wedding-plan-lime.vercel.app/questionnaire
**Prerequisite:** Must be logged in

**Steps:**
1. Navigate to questionnaire
2. Step 1: Select wedding date
3. Step 2: Select location (Newcastle or Hunter Valley)
4. Step 3: Select guest count
5. Step 4: Select budget
6. Step 5: Select style
7. Click "Complete"

**Expected:**
- [ ] All 5 steps display correctly
- [ ] Can navigate between steps
- [ ] Progress bar shows current step
- [ ] Data saves on completion
- [ ] Redirects to dashboard after completion
- [ ] Wedding summary appears on dashboard
- [ ] Data appears in database (Prisma Studio → Wedding table)

---

### **Test 7: Edit Wedding Details** ✅
**URL:** https://wedding-plan-lime.vercel.app/dashboard
**Prerequisite:** Must have completed questionnaire

**Steps:**
1. Go to dashboard
2. Click "Edit Details" button
3. Change some selections
4. Click "Complete"

**Expected:**
- [ ] "Edit Details" button visible on dashboard
- [ ] Questionnaire opens with current selections highlighted
- [ ] Can change selections
- [ ] Changes save correctly
- [ ] Dashboard updates with new data

---

### **Test 8: Vendor Matching** ✅
**URL:** https://wedding-plan-lime.vercel.app/vendors
**Prerequisite:** Must have completed questionnaire

**Steps:**
1. Navigate to vendors page
2. Review matched vendors

**Expected:**
- [ ] Vendors displayed based on location
- [ ] If Newcastle selected → See Newcastle vendors
- [ ] If Hunter Valley selected → See Hunter Valley vendors
- [ ] Vendor cards show: name, category, pricing, rating
- [ ] Match scores displayed
- [ ] Can click vendor for details

---

### **Test 9: Header & Navigation** ✅
**Prerequisite:** Must be logged in

**Expected:**
- [ ] Header appears on all pages
- [ ] Shows user avatar/initials
- [ ] Click avatar → Dropdown menu opens
- [ ] Dropdown shows: Dashboard, Vendors, Questionnaire, Logout
- [ ] Click "Dashboard" → Goes to dashboard
- [ ] Click "Vendors" → Goes to vendors
- [ ] Click "Questionnaire" → Goes to questionnaire

---

### **Test 10: Logout** ✅
**URL:** Any page while logged in

**Steps:**
1. Click user avatar in header
2. Click "Logout"

**Expected:**
- [ ] Logout button visible in dropdown
- [ ] Click logout → Session cleared
- [ ] Redirected to home page
- [ ] Header shows "Sign In" button (not avatar)
- [ ] Visiting `/dashboard` redirects to login

---

### **Test 11: Database Verification** ✅
**Locally run:** `npm run db:studio`

**Check Tables:**

**User Table:**
- [ ] Test user exists: test@wedding.com
- [ ] Your registered user exists (from Test 3)
- [ ] authId field populated for each user

**Wedding Table:**
- [ ] Test wedding exists (Hunter Valley, 100 guests, $60k)
- [ ] Your wedding exists (from Test 6)
- [ ] All fields populated correctly

**Vendor Table:**
- [ ] 17 Newcastle vendors
- [ ] 28 Hunter Valley vendors
- [ ] Total: 45 vendors

**VendorOutreach Table:**
- [ ] Empty for now (will be used later for email outreach)

---

## 🐛 Google OAuth Debugging Guide

If Google OAuth still fails, follow these steps:

### **Step 1: Check Browser Network Tab**
1. Open DevTools (F12)
2. Go to Network tab
3. Click "Sign in with Google"
4. Watch for these requests:
   - Initial redirect to Google
   - Google redirect back to `/auth/callback?code=...`
   - Callback redirect to dashboard or error

**Screenshot the network flow and share**

### **Step 2: Check Vercel Function Logs**
1. Go to: https://vercel.com/keenanbass-outlookcoms-projects/wedding-plan/deployments
2. Click latest deployment
3. Click "Functions" tab
4. Look for `/auth/callback` function
5. Check for errors

**Screenshot any errors and share**

### **Step 3: Check Browser Console**
1. Open DevTools (F12)
2. Go to Console tab
3. Try Google sign-in
4. Look for errors (red text)

**Screenshot any errors and share**

### **Step 4: Check Cookies**
1. Open DevTools (F12)
2. Go to Application tab → Cookies
3. Look for domain: `.wedding-plan-lime.vercel.app`
4. Should see Supabase cookies like:
   - `sb-vagxoaocuphgwwzritds-auth-token`
   - `sb-vagxoaocuphgwwzritds-auth-token.0`
   - etc.

**If no cookies after Google sign-in, session isn't being created**

### **Step 5: Test with Error Query Param**
Try this URL to simulate an OAuth error:
```
https://wedding-plan-lime.vercel.app/auth/callback?error=test_error&error_description=Test+error+message
```

**Expected:** Should redirect to login page with error message displayed

If this works, it means callback error handling is working. If not, there's a deeper issue.

---

## 🎯 Success Criteria

**Core Functionality (Must Work):**
- [ ] Email/password signup ✅
- [ ] Email/password login ✅
- [ ] Questionnaire completion ✅
- [ ] Vendor matching ✅
- [ ] Edit wedding details ✅
- [ ] Logout ✅

**Google OAuth (Debugging):**
- [ ] Google sign-in works OR
- [ ] Clear error message shown explaining why it fails

**Database:**
- [ ] All data persists correctly ✅
- [ ] 45 vendors seeded ✅

**UI/UX:**
- [ ] Beautiful wedding theme throughout ✅
- [ ] Navigation works ✅
- [ ] No broken links ✅
- [ ] Responsive on mobile ✅

---

## 📊 Current Status

| Feature | Status | Notes |
|---------|--------|-------|
| Landing Page | ✅ Working | |
| Email/Password Auth | ✅ Working | |
| Google OAuth | ⚠️ Debugging | Redirects to home page |
| Dashboard | ✅ Working | |
| Questionnaire | ✅ Working | 5-step form |
| Vendor Matching | ✅ Working | 45 vendors |
| Edit Details | ✅ Working | |
| Header/Navigation | ✅ Working | |
| Logout | ✅ Working | |
| Database | ✅ Working | All tables seeded |
| Email Outreach | 🚧 Ready | Resend API configured |

---

## 🚨 Known Issues

1. **Google OAuth redirects to home page instead of dashboard**
   - Configuration appears correct (Google Cloud Console + Supabase)
   - Need to check callback error handling
   - May be a cookie/session issue

---

## 📝 Next Steps After Testing

Once all tests pass:
1. Configure Resend webhooks for email tracking
2. Test email outreach flow
3. Add more vendors (Blue Mountains)
4. Implement quote comparison
5. Add payment integration (Stripe)

---

**Test and report back what works and what doesn't!** 🚀
