# WeddingPlan AI 💍

AI-powered wedding planning assistant that automates vendor discovery and outreach for couples planning weddings in New South Wales, Australia.

## 🎯 What We're Building

An intelligent wedding planning platform that:

- **Conversational AI Intake**: Natural chat interface to gather wedding requirements
- **Smart Vendor Matching**: Automatically finds venues, photographers, caterers based on your preferences
- **Automated Outreach**: Sends personalized emails to vendors on your behalf
- **Response Dashboard**: Aggregates vendor responses for easy comparison

## 🚀 Tech Stack

- **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **AI**: Claude 3.5 Sonnet (Anthropic API)
- **Email**: Resend (for vendor outreach)
- **Hosting**: Vercel

## 📋 Project Status

**Current Phase**: Week 1 - Foundation Setup ✅

See [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) for detailed roadmap.

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 20+
- PostgreSQL (local or cloud)
- Claude API key (Anthropic)

### Installation

1. **Clone and install dependencies**

   ```bash
   npm install
   ```

2. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `ANTHROPIC_API_KEY`: Your Claude API key
   - `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`

3. **Set up database**

   ```bash
   npm run db:push
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📁 Project Structure

```
wedding-plan/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   ├── chat/         # Claude AI chat endpoint
│   │   └── health/       # Health check endpoint
│   ├── chat/             # Chat interface page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Landing page
│   └── globals.css       # Global styles
├── components/            # React components
│   └── ChatInterface.tsx # AI chat component
├── lib/                   # Utility libraries
│   ├── claude.ts         # Claude API integration
│   └── prisma.ts         # Prisma client
├── prisma/
│   └── schema.prisma     # Database schema
├── public/               # Static assets
├── PRD.md               # Product Requirements Document
├── ARCHITECTURE.md      # Technical architecture
└── IMPLEMENTATION_PLAN.md # Development roadmap
```

## 🎨 Features (MVP)

### ✅ Implemented

- [x] Next.js project setup
- [x] Claude API integration
- [x] Chat interface
- [x] Database schema
- [x] Landing page

### 🚧 In Progress

- [ ] User authentication (NextAuth)
- [ ] Conversation persistence
- [ ] Vendor database
- [ ] Email automation

### 📅 Planned

- [ ] Vendor matching algorithm
- [ ] Response dashboard
- [ ] Admin panel for vendor management
- [ ] Deployment to Vercel

## 🧪 Testing the Chat

1. Add your Claude API key to `.env.local`:

   ```bash
   ANTHROPIC_API_KEY="sk-ant-your-key-here"
   ```

2. Navigate to `/chat` and start a conversation

3. The AI will ask about:
   - Wedding date
   - Location (NSW suburb/region)
   - Guest count
   - Budget
   - Style preferences
   - Requirements

## 📖 Documentation

- [PRD.md](./PRD.md) - Complete product requirements
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture and design
- [IMPLEMENTATION_PLAN.md](./IMPLEMENTATION_PLAN.md) - 10-week development plan

## 🎯 MVP Target

**Launch**: Mid-April 2026 (10 weeks)

**Initial Coverage**: Sydney and regional NSW

**Beta Users**: 10 couples

## 🤝 Contributing

This is currently a solo project. Contributions welcome after MVP launch.

## 📄 License

Private - Not yet open source

## 🚀 Next Steps

1. Set up PostgreSQL database
2. Add your Claude API key
3. Start building vendor database
4. Test chat flow with sample conversations
5. Implement user authentication

---

**Built with ❤️ for couples planning their dream wedding in Australia**
