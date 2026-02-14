# 🚀 Quick Start Guide

**Get up and running in 3 minutes!**

---

## ✅ What's Already Done

- ✅ Next.js app configured
- ✅ PostgreSQL database running (Docker)
- ✅ Database tables created (7 tables)
- ✅ Test data seeded (users, weddings, vendors)
- ✅ Claude AI integration ready

---

## 🎯 To Start Using the App

### **Step 1: Add Your Claude API Key** (Required)

Edit `.env.local`:
```bash
ANTHROPIC_API_KEY="sk-ant-your-key-here"
```

Get your key from: https://console.anthropic.com/settings/keys

### **Step 2: Start the App**

```bash
npm run dev
```

### **Step 3: Open in Browser**

- **Landing Page**: http://localhost:3000
- **Chat Interface**: http://localhost:3000/chat 👈 **Try this!**

---

## 🎨 What You Can Do Now

### 1. Chat with the AI Wedding Planner
Visit `/chat` and have a conversation:
- It will ask about your wedding date
- Location preferences (NSW)
- Guest count
- Budget
- Style and requirements

### 2. View the Database
```bash
npm run db:studio
```
Opens a visual database browser at http://localhost:5555

You'll see:
- 1 test user
- 1 test wedding (Blue Mountains)
- 3 test vendors (2 venues + 1 photographer)

### 3. Test Database Connection
```bash
npm run db:test
```

Should output:
```
✅ Database connection successful!
📊 Database Status:
   Users: 1
   Weddings: 1
   Vendors: 3
```

---

## 📊 Database Info

**Container**: `wedding-postgres`
**Port**: 5433 (localhost)
**Database**: weddingplan
**Username**: weddinguser
**Password**: weddingpass123

**Connection String**:
```
postgresql://weddinguser:weddingpass123@localhost:5433/weddingplan
```

---

## 🛠️ Useful Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run lint             # Check code quality

# Database
npm run db:studio        # Visual database browser
npm run db:test          # Test connection
npm run db:seed          # Re-seed test data
npm run db:push          # Push schema changes

# Docker
docker ps                # View running containers
docker logs wedding-postgres    # View database logs
docker stop wedding-postgres    # Stop database
docker start wedding-postgres   # Start database
```

---

## 📁 Key Files

```
app/
├── page.tsx           # Landing page
├── chat/page.tsx      # Chat interface
└── api/chat/route.ts  # Claude API endpoint

components/
└── ChatInterface.tsx  # Chat UI component

lib/
├── claude.ts          # AI integration
└── prisma.ts          # Database client

prisma/
└── schema.prisma      # Database schema

.env.local             # YOUR API KEYS GO HERE
```

---

## 📚 Documentation

- **PRD.md** - What we're building
- **ARCHITECTURE.md** - How it's built
- **IMPLEMENTATION_PLAN.md** - 10-week roadmap
- **SETUP_CHECKLIST.md** - Detailed setup
- **PROJECT_STATUS.md** - Current status
- **REVIEW.md** - Comprehensive system audit
- **README.md** - Project overview

---

## 🐛 Troubleshooting

### Chat doesn't work?
→ Make sure `ANTHROPIC_API_KEY` is in `.env.local`

### Database connection failed?
```bash
docker start wedding-postgres
npm run db:test
```

### Port 3000 already in use?
```bash
PORT=3001 npm run dev
```

---

## 🎯 Next Steps (Week 2)

See `IMPLEMENTATION_PLAN.md` for details:

1. Implement user authentication (NextAuth.js)
2. Save chat conversations to database
3. Build vendor matching algorithm
4. Expand vendor database (50+ Sydney venues)

---

## ✨ Current Capabilities

✅ **Working Now:**
- Beautiful landing page
- AI chat interface (with Claude API key)
- Real-time streaming responses
- PostgreSQL database with test data
- Prisma ORM for database queries
- Docker container management

❌ **Not Yet Built (Coming in Weeks 2-10):**
- User login/signup
- Conversation persistence
- Vendor search and matching
- Email automation
- Response dashboard

---

**Status**: 🎉 **Ready to Start Coding!**

**Just add your Claude API key and run `npm run dev`**
