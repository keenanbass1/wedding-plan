# 📧 Email/Password Signup Testing Guide

## ✅ How It Works

**Supabase sends verification emails automatically** - no Resend needed for this!

- **Signup emails** → Sent by Supabase (verification link)
- **Password reset emails** → Sent by Supabase
- **Vendor outreach emails** → Will use Resend (later)

---

## 🧪 Test Email/Password Signup

### **Step 1: Go to Signup Page**
https://wedding-plan-lime.vercel.app/auth/signup

### **Step 2: Fill Out Form**
- Full Name: Your Name
- Email: Use a **real email** you can access (NOT test@weddingplanai.com)
- Password: At least 8 characters
- Confirm Password: Same password

### **Step 3: Click "Create Account"**

**Expected Results:**
- ✅ Page shows "Check Your Email" message
- ✅ Email sent to your inbox

### **Step 4: Check Email**

**Subject:** "Confirm your signup"
**From:** noreply@mail.app.supabase.co

**If you don't see it:**
1. Check spam/junk folder
2. Wait 2-3 minutes (sometimes delayed)
3. Check Supabase email settings (see below)

### **Step 5: Click Verification Link**

**Expected:**
- ✅ Redirects to callback URL
- ✅ Callback processes verification
- ✅ Redirects to dashboard
- ✅ You're logged in!

### **Step 6: Verify Database**

Run locally:
```bash
npm run db:studio
```

Check:
- ✅ Your new user exists in User table
- ✅ `authId` field is populated
- ✅ Email matches what you signed up with

---

## 🔧 If Email Doesn't Arrive

### **Check Supabase Email Settings**

1. Go to: https://supabase.com/dashboard/project/vagxoaocuphgwwzritds/auth/templates
2. Check **Email Templates** tab
3. Verify "Confirm signup" template is enabled

**Default Template Should Include:**
```
Confirm your email address by clicking this link:
{{ .ConfirmationURL }}
```

### **Check Supabase Auth Settings**

1. Go to: https://supabase.com/dashboard/project/vagxoaocuphgwwzritds/settings/auth
2. Verify these settings:

**Email Auth:**
- ✅ Enable Email Signup: ON
- ✅ Enable Email Confirmations: ON (This is what sends the email!)
- ✅ Secure Email Change: ON

**Site URL:**
- Should be: `https://wedding-plan-lime.vercel.app`

**Redirect URLs:**
- Should include:
  - `https://wedding-plan-lime.vercel.app/auth/callback`
  - `https://wedding-plan-lime.vercel.app/**`

### **SMTP Settings (If Using Custom Email)**

By default, Supabase uses their own SMTP. But if you want emails from your domain:

1. Go to: https://supabase.com/dashboard/project/vagxoaocuphgwwzritds/settings/auth
2. Scroll to **SMTP Settings**
3. Configure with your email provider (optional)

**For now, use Supabase's default email** - it works fine!

---

## 🎯 Quick Test Right Now

Since you're already logged in, test with a **different email**:

1. Open **Incognito/Private Window**
2. Go to: https://wedding-plan-lime.vercel.app/auth/signup
3. Sign up with a new email (use your real email)
4. Check your email for verification link
5. Click link → Should log you in

**This will verify:**
- ✅ Signup form works
- ✅ Supabase sends emails
- ✅ Email verification works
- ✅ Callback processes correctly
- ✅ User gets logged in

---

## ✅ Checklist

After testing, you should be able to say:

- [ ] Signup form loads correctly
- [ ] Form validation works (password match, length, etc.)
- [ ] "Check Your Email" screen appears after signup
- [ ] Verification email arrives in inbox
- [ ] Email contains clickable verification link
- [ ] Clicking link redirects to callback
- [ ] Callback redirects to dashboard
- [ ] User is logged in
- [ ] User appears in database

---

## 🚨 Common Issues

### **Issue: "User already registered"**
**Solution:** Email already exists. Use a different email or log in.

### **Issue: Email never arrives**
**Possible causes:**
1. Email in spam folder
2. Supabase email confirmations disabled
3. Invalid email address
4. Supabase rate limiting (max 60 emails/hour on free tier)

**Debug:**
1. Check spam folder
2. Verify Supabase auth settings
3. Try different email provider
4. Check Supabase logs for errors

### **Issue: Verification link redirects to home page**
**Solution:** Same as Google OAuth issue - we're debugging the callback.

### **Issue: "Invalid email or password"**
**Solution:**
- Password must be at least 8 characters
- Email must be valid format
- Passwords must match

---

## 💡 Why This Matters

Having email/password signup working means:
1. ✅ Users can create accounts WITHOUT Google OAuth
2. ✅ You have a backup authentication method
3. ✅ You can onboard users who don't use Google
4. ✅ Email verification builds trust (reduces spam signups)

---

## 🔄 Comparison: Auth Methods

| Method | Status | Email Provider | Works? |
|--------|--------|----------------|--------|
| Email/Password | ✅ Ready | Supabase (auto) | Test now! |
| Google OAuth | ⚠️ Debugging | N/A | Working on it |
| Magic Link | ✅ Ready | Supabase (auto) | Available on login |

**Test email/password signup now!** It should work perfectly. 🎉
