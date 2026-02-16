# Vercel Environment Variables Setup

## 🔧 Required Environment Variables

**Note:** All environment variables are already configured in Vercel. This document is for reference only.

Add these to Vercel Dashboard: https://vercel.com/keenanbass-outlookcoms-projects/wedding-plan/settings/environment-variables

### Database (Supabase)
```bash
DATABASE_URL=[See .env.local file]
```
**Environments**: Production, Preview, Development

### Authentication (Supabase)
```bash
NEXT_PUBLIC_SUPABASE_URL=[See .env.local file]
NEXT_PUBLIC_SUPABASE_ANON_KEY=[See .env.local file]
```
**Environments**: Production, Preview, Development

### AI (Anthropic Claude)
```bash
ANTHROPIC_API_KEY=[See .env.local file]
CLAUDE_MODEL=claude-sonnet-4-5-20250929
```
**Environments**: Production, Preview, Development

### Email (Resend) ✅ **CONFIGURED**
```bash
RESEND_API_KEY=[Configured in Vercel]
EMAIL_FROM=onboarding@resend.dev
```
**Environments**: Production, Preview, Development

---

## ✅ How to Add Environment Variables to Vercel

1. Go to: https://vercel.com/keenanbass-outlookcoms-projects/wedding-plan/settings/environment-variables

2. For each variable above:
   - Click **"Add New"**
   - Enter the **Key** (e.g., `RESEND_API_KEY`)
   - Enter the **Value** (from your `.env.local` file)
   - Select **all three environments**: Production, Preview, Development
   - Click **"Save"**

3. After adding all variables, **redeploy** the app:
   - Go to: https://vercel.com/keenanbass-outlookcoms-projects/wedding-plan
   - Click **"Deployments"** tab
   - Click **"..."** menu on the latest deployment
   - Click **"Redeploy"**

---

## 📋 Verification Checklist

After adding the environment variables and redeploying:

- [x] `DATABASE_URL` is set ✅
- [x] `NEXT_PUBLIC_SUPABASE_URL` is set ✅
- [x] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set ✅
- [x] `ANTHROPIC_API_KEY` is set ✅
- [x] `CLAUDE_MODEL` is set ✅
- [x] `RESEND_API_KEY` is set ✅ **JUST ADDED**
- [x] `EMAIL_FROM` is set ✅ **JUST ADDED**

---

## 🎯 Current Status

**All environment variables are configured in Vercel Production.**

To view configured variables:
```bash
npx vercel env ls production
```

To pull environment variables locally:
```bash
npx vercel env pull .env.local
```
