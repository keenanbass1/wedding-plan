# 🚀 Setup Checklist

Follow these steps to get WeddingPlan AI running on your machine.

## ✅ Prerequisites (Already Installed)

- [x] Node.js v24.13.0
- [x] npm v11.6.2
- [x] Git

## 🔧 Configuration Needed

### 1. Database Setup

**Option A: Local PostgreSQL (Recommended for development)**

Install PostgreSQL if not already installed:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Start PostgreSQL
sudo service postgresql start

# Create database
sudo -u postgres createdb weddingplan
sudo -u postgres psql -c "CREATE USER weddinguser WITH PASSWORD 'your_password';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE weddingplan TO weddinguser;"
```

**Option B: Docker PostgreSQL (Easier)**

```bash
docker run --name wedding-postgres \
  -e POSTGRES_DB=weddingplan \
  -e POSTGRES_USER=weddinguser \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:16
```

**Option C: Cloud Database (Vercel Postgres, Supabase, Neon)**
- Sign up for free tier
- Copy connection string

### 2. Environment Variables

Edit `.env.local` with your configuration:

```bash
# 1. Update DATABASE_URL
DATABASE_URL="postgresql://weddinguser:your_password@localhost:5432/weddingplan"

# 2. Generate NEXTAUTH_SECRET
openssl rand -base64 32
# Copy output and paste as NEXTAUTH_SECRET

# 3. Add your Claude API key
# Get it from: https://console.anthropic.com/settings/keys
ANTHROPIC_API_KEY="sk-ant-your-key-here"

# 4. (Optional) Email service - for later
RESEND_API_KEY=""
```

### 3. Push Database Schema

Once database is configured:

```bash
npm run db:push
```

This creates all tables based on `prisma/schema.prisma`.

### 4. Verify Setup

```bash
# Generate Prisma client (already done)
npm run db:generate

# Check health endpoint
npm run dev
# Then visit: http://localhost:3000/api/health
```

## 🎯 Quick Start

```bash
# Start development server
npm run dev

# Open browser
open http://localhost:3000

# Test chat interface
open http://localhost:3000/chat
```

## 🧪 Testing Claude Integration

1. Make sure `ANTHROPIC_API_KEY` is set in `.env.local`
2. Navigate to [http://localhost:3000/chat](http://localhost:3000/chat)
3. Start a conversation with the AI
4. It should respond with wedding planning questions

## 📊 Database Tools

```bash
# Open Prisma Studio (visual database browser)
npm run db:studio

# Push schema changes to database
npm run db:push

# Generate Prisma client after schema changes
npm run db:generate
```

## 🔍 Troubleshooting

### "Cannot connect to database"
- Check PostgreSQL is running: `sudo service postgresql status`
- Verify DATABASE_URL in `.env.local`
- Test connection: `psql postgresql://weddinguser:your_password@localhost:5432/weddingplan`

### "Claude API error"
- Verify ANTHROPIC_API_KEY is correct
- Check you have API credits: https://console.anthropic.com/
- Look at browser console and terminal for error messages

### "Port 3000 already in use"
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

## 📝 Next Steps After Setup

1. **Test the chat flow**: Go to `/chat` and have a full conversation
2. **Review database schema**: Open Prisma Studio and explore tables
3. **Start building vendor database**: Add test venues to `Vendor` table
4. **Read the docs**:
   - [PRD.md](./PRD.md) - Product requirements
   - [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical design
   - [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - Development roadmap

## ✨ What Works Right Now

- ✅ Landing page at `/`
- ✅ AI chat interface at `/chat`
- ✅ Claude API integration (streaming responses)
- ✅ Database schema ready
- ✅ Beautiful UI with Tailwind CSS

## 🚧 What's Next (Week 2-3)

- [ ] User authentication (login/signup)
- [ ] Save conversation to database
- [ ] Build vendor database (50+ venues)
- [ ] Create vendor matching algorithm
- [ ] Email template system

---

**Need help?** Check the README.md or review the implementation plan.
