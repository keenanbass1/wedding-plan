# 🚀 Deployment Guide - Wedding Planning AI

## Quick Deploy to Vercel

### 1. Prerequisites

- Vercel account (free tier works)
- PostgreSQL database (Vercel Postgres, Neon, or Supabase)
- Anthropic API key

### 2. Deploy Command

```bash
vercel
```

Follow the prompts:

- Link to existing project or create new
- Set project name: `wedding-plan-ai`
- Keep default settings

### 3. Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

```bash
# Database
DATABASE_URL="postgresql://user:pass@host:5432/dbname"

# Claude API
ANTHROPIC_API_KEY="sk-ant-api03-..."
CLAUDE_MODEL="claude-sonnet-4-5-20250929"

# NextAuth (generate random strings)
NEXTAUTH_URL="https://your-app.vercel.app"
NEXTAUTH_SECRET="your-random-secret-here"

# Email (optional - for future use)
RESEND_API_KEY=""
EMAIL_FROM="noreply@yourapp.com"
```

### 4. Set Up Production Database

**Option A: Vercel Postgres** (Easiest)

```bash
# In Vercel Dashboard:
1. Go to Storage → Create Database → Postgres
2. Copy DATABASE_URL automatically
3. Run: vercel env pull .env.local
4. Run: npx prisma db push
5. Run: npx tsx scripts/seed-newcastle-vendors.ts
```

**Option B: Neon** (Free PostgreSQL)

```bash
1. Sign up at https://neon.tech
2. Create new project "wedding-plan"
3. Copy connection string
4. Add to Vercel env vars as DATABASE_URL
```

**Option C: Supabase** (Free PostgreSQL + extras)

```bash
1. Sign up at https://supabase.com
2. Create project
3. Get connection string from Settings → Database
4. Use "Connection Pooling" string for better performance
5. Add to Vercel env vars
```

### 5. Deploy Database Schema

After setting up database and env vars:

```bash
# Local: push schema to production DB
DATABASE_URL="your-production-url" npx prisma db push

# Local: seed production DB with Newcastle vendors
DATABASE_URL="your-production-url" npx tsx scripts/seed-newcastle-vendors.ts
```

Or in Vercel:

```bash
vercel env pull
npx prisma db push
npx tsx scripts/seed-newcastle-vendors.ts
```

### 6. Verify Deployment

Visit your deployed URL:

- `/` - Landing page
- `/chat` - Chat interface
- `/api/health` - Health check

Test the flow:

1. Click "Begin Your Journey"
2. Answer 5 questionnaire questions
3. See vendor matches for Newcastle

---

## Current Status

✅ **Build**: Successful (110 kB)
✅ **Vendors**: 17 Newcastle vendors seeded locally
✅ **API**: Claude Sonnet 4.5 configured
✅ **Features**: Questionnaire → Vendor matching working

⚠️ **Needs Setup**:

- Production database
- Environment variables in Vercel
- Seed production database with vendors

---

## Deployment Checklist

- [ ] Vercel account created
- [ ] Production database provisioned
- [ ] DATABASE_URL added to Vercel env vars
- [ ] ANTHROPIC_API_KEY added to Vercel env vars
- [ ] CLAUDE_MODEL added to Vercel env vars
- [ ] NEXTAUTH_URL and NEXTAUTH_SECRET added
- [ ] `vercel` command run
- [ ] Schema pushed to production DB
- [ ] Newcastle vendors seeded to production DB
- [ ] Tested live URL

---

## Production URL

After deployment, your app will be at:
**https://wedding-plan-ai.vercel.app** (or your custom domain)

---

## Troubleshooting

**Build fails:**

- Check Node version (should be 18+)
- Verify all dependencies in package.json
- Check build logs in Vercel dashboard

**Database connection fails:**

- Verify DATABASE_URL format
- Check database is accessible from Vercel
- Try connection pooling URL (for Supabase/Neon)

**Vendor matching returns empty:**

- Check database was seeded
- Verify Prisma client generated: `npx prisma generate`
- Check location matching (currently only Newcastle)

**Claude API errors:**

- Verify ANTHROPIC_API_KEY is valid
- Check API key has credits
- Verify CLAUDE_MODEL is correct: `claude-sonnet-4-5-20250929`

---

## Next Steps After Deployment

1. **Test thoroughly** on production URL
2. **Add more vendors** (Hunter Valley, Blue Mountains, Sydney)
3. **Implement email sending** (Resend integration)
4. **Add user authentication** (NextAuth)
5. **Build dashboard** for tracking vendor responses
6. **Custom domain** (optional)

---

## Cost Estimate

**Free Tier Deployment:**

- Vercel: Free (Hobby plan)
- Database: Free (Neon/Supabase/Vercel Postgres)
- Claude API: Pay-as-you-go (~$0.05-0.10 per conversation)

**Expected Monthly Cost** (100 conversations):

- Hosting: $0
- Database: $0
- Claude API: ~$5-10
- **Total: $5-10/month**

---

## Support

Issues? Check:

- Vercel deployment logs
- Browser console for frontend errors
- API route logs in Vercel functions

Happy deploying! 🚀
