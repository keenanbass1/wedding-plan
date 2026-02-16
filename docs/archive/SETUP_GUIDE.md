# Wedding Plan AI - Setup Guide

## ✅ What's Already Configured

### Vercel (Production)

- ✅ Supabase credentials
- ✅ Database connection
- ✅ Claude API key and model
- ⚠️ NextAuth variables (need to remove - we're using Supabase Auth now)
- ❌ Resend API key (needs to be added)
- ❌ EMAIL_FROM (needs to be added)

### Local (.env.local)

- ✅ Supabase credentials
- ✅ Database URL
- ✅ Claude API key
- ✅ Claude model
- ❌ RESEND_API_KEY (empty - needs your API key)
- ✅ EMAIL_FROM (set to noreply@streamwedding.com)

## 🔧 Required Setup Steps

### 1. Get Resend API Key

1. Go to: https://resend.com/signup
2. Sign up with your email
3. Verify your email
4. Go to: https://resend.com/api-keys
5. Click "Create API Key"
6. Name it: "Wedding Plan Production"
7. Copy the API key (starts with `re_`)

### 2. Add Resend API Key Locally

```bash
# Edit .env.local and update this line:
RESEND_API_KEY="re_your_api_key_here"
```

### 3. Add Resend API Key to Vercel

**Option A: Using Vercel Dashboard (Recommended)**

1. Go to: https://vercel.com/keenanbass-outlookcoms-projects/wedding-plan/settings/environment-variables
2. Click "Add New"
3. Key: `RESEND_API_KEY`
4. Value: `re_your_api_key_here`
5. Environments: Check all (Production, Preview, Development)
6. Click "Save"

**Option B: Using Vercel CLI**

```bash
npx vercel env add RESEND_API_KEY production
# Paste your API key when prompted
# Type 'y' for sensitive
```

### 4. Add EMAIL_FROM to Vercel

**Using Vercel Dashboard:**

1. Same page as above
2. Click "Add New"
3. Key: `EMAIL_FROM`
4. Value: `noreply@streamwedding.com` (or your verified domain)
5. Environments: Check all
6. Click "Save"

**Using CLI:**

```bash
echo "noreply@streamwedding.com" | npx vercel env add EMAIL_FROM production
```

### 5. Remove Old NextAuth Variables (Optional but Recommended)

Since we're using Supabase Auth, remove these:

```bash
npx vercel env rm NEXTAUTH_URL production
npx vercel env rm NEXTAUTH_SECRET production
```

Or via dashboard:

1. Go to environment variables page
2. Find NEXTAUTH_URL and NEXTAUTH_SECRET
3. Click "..." → "Delete"

### 6. Verify Domain for Email Sending (Production)

**For Testing (Free):**

- Use `@resend.dev` email addresses
- Update EMAIL_FROM to: `onboarding@resend.dev`
- Emails may go to spam

**For Production:**

1. Go to: https://resend.com/domains
2. Click "Add Domain"
3. Enter your domain: `streamwedding.com`
4. Add DNS records to your domain registrar:

   ```
   Type: TXT
   Name: @
   Value: [provided by Resend]

   Type: MX
   Name: @
   Value: [provided by Resend]
   ```

5. Wait for verification (can take up to 48 hours)
6. Once verified, update EMAIL_FROM to: `noreply@streamwedding.com`

## 🧪 Testing Checklist

### Local Testing

```bash
# 1. Start dev server
npm run dev

# 2. Test authentication
- Go to http://localhost:3000
- Click "Begin Your Journey"
- Complete questionnaire
- You should see vendor matches

# 3. Test Google OAuth
- Go to http://localhost:3000/auth/login
- Click "Sign in with Google"
- Should redirect to Google
- After login, should redirect to /dashboard

# 4. Test vendor selection
- Browse vendors
- Select 2-3 vendors
- Click "Contact Selected Vendors"
- Should see email preview page

# 5. Test email generation (without sending)
- On preview page, you'll see AI-generated emails
- You can edit them
- DON'T click send yet (unless you have Resend API key)
```

### Production Testing

1. **Deploy latest changes:**

   ```bash
   git push origin master
   # Vercel auto-deploys
   ```

2. **Test on production:**
   - Go to: https://wedding-plan-lime.vercel.app
   - Test same flow as local
   - Google OAuth should work
   - Email sending will work once Resend API key is added

## 🔍 Troubleshooting

### "Error: RESEND_API_KEY not configured"

- Add your Resend API key to .env.local (local)
- Add to Vercel environment variables (production)

### "Error: Invalid Google OAuth redirect"

- Make sure callback URL in Google Cloud Console is:
  `https://vagxoaocuphgwwzritds.supabase.co/auth/v1/callback`

### "Access blocked: This app's request is invalid"

- Add yourself as a test user in Google Cloud Console
- OAuth consent screen → Test users

### Database connection errors

- Already configured correctly in Vercel
- Uses pooled connection for production
- Uses non-pooled for migrations

## 📊 Current Environment Variables

### ✅ Already in Vercel

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
DATABASE_URL (POSTGRES_URL_NON_POOLING)
ANTHROPIC_API_KEY
CLAUDE_MODEL
SUPABASE_* (all keys)
POSTGRES_* (all credentials)
```

### ❌ Need to Add

```
RESEND_API_KEY (get from resend.com)
EMAIL_FROM (set to noreply@streamwedding.com or onboarding@resend.dev)
```

### 🗑️ Can Remove (old NextAuth)

```
NEXTAUTH_URL
NEXTAUTH_SECRET
```

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Run database migrations
npx prisma db push

# Start development server
npm run dev

# Deploy to Vercel
git push origin master

# Check Vercel deployment
npx vercel ls

# Pull environment variables from Vercel
npx vercel env pull
```

## 📝 Next Steps After Setup

1. ✅ Configure Google OAuth
2. ⏳ Get Resend API key
3. ⏳ Add Resend key to local and Vercel
4. ⏳ Test authentication flow
5. ⏳ Test email generation
6. ⏳ Verify domain for production emails
7. ⏳ Test complete user journey
8. ⏳ Launch! 🎉

## 🔗 Important Links

- **Production App:** https://wedding-plan-lime.vercel.app
- **Vercel Dashboard:** https://vercel.com/keenanbass-outlookcoms-projects/wedding-plan
- **Supabase Dashboard:** https://supabase.com/dashboard/project/vagxoaocuphgwwzritds
- **Resend Dashboard:** https://resend.com/
- **Google Cloud Console:** https://console.cloud.google.com/
- **GitHub Repo:** https://github.com/keenanbass1/wedding-plan
