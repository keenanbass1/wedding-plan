# Changelog

All notable changes to StreamWedding will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Pending
- Loading states (loading.tsx for key routes)
- Content Security Policy header
- Custom domain configuration

## [0.5.0] - 2026-03-18

### Added — Week 1: Auth & Reliability
- Password reset flow: `/auth/reset-password` (request) and `/auth/update-password` (set new password)
- Upstash Redis rate limiting with in-memory development fallback (`lib/rate-limit.ts` rewritten)
- Rate limit configs for AI generation, email send, chat, and general API

### Fixed — Week 1
- Silent email failures: outreach records now only created for successfully sent emails
- `emailId` stored on outreach records for webhook correlation
- `checkRateLimit()` now async — all 3 callers updated

### Added — Week 2: Content & Monitoring
- Sydney vendor seed script (17 vendors)
- Blue Mountains vendor seed script (12 vendors)
- South Coast vendor seed script (14 vendors)
- Sentry error monitoring (@sentry/nextjs v10) — client, server, edge
- Global error boundary (`app/global-error.tsx`)
- Instrumentation files for Sentry (`instrumentation.ts`, `instrumentation-client.ts`, `sentry.server.config.ts`, `sentry.edge.config.ts`)
- npm scripts: `db:seed:sydney`, `db:seed:blue-mountains`, `db:seed:south-coast`, `db:seed:all-vendors`

### Added — Week 3: Resilience & Validation
- Retry utility with exponential backoff and jitter (`lib/retry.ts`)
- `isTransientError()` helper for identifying retryable errors
- Resend webhook endpoint (`/api/webhooks/resend`) — handles delivery, open, bounce, complaint events
- Retry logic for Claude email generation and Resend batch sending
- Email format validation before sending
- Server-side input validation in wedding API: past date rejection, budget minimum ($1,000), guest count clamping (1-10,000)

### Added — Week 4: Testing & Security
- Security headers in `next.config.ts`: HSTS, X-Frame-Options, X-Content-Type-Options, X-XSS-Protection, Referrer-Policy, Permissions-Policy
- Per-page error boundaries: `app/auth/error.tsx`, `app/dashboard/error.tsx`, `app/chat/error.tsx`, `app/questionnaire/error.tsx`, `app/outreach/error.tsx`
- Playwright E2E testing (16 tests): homepage, auth pages, navigation redirects, security headers
- Unit tests (97 new, 121 total): input-validation, retry, env-validation, rate-limit, auth-helpers, vendor-matching, wedding-route, webhook-resend
- `vitest.config.ts` updated to exclude e2e directory
- `playwright.config.ts` for E2E configuration

### Changed — Week 4
- `.env.example` updated with Upstash, Sentry, and Resend webhook vars
- `next.config.ts` wrapped with `withSentryConfig`
- `package.json`: new scripts and dependencies (@upstash/ratelimit, @upstash/redis, @sentry/nextjs, @playwright/test, @vitest/coverage-v8)

## [0.4.0] - 2026-02-16

### Added
- Comprehensive linting with Prettier and enhanced ESLint
- Auto-formatting on save in VS Code
- Import ordering and unused import detection
- Documentation reorganization with proper structure
- docs/INDEX.md for navigation
- CHANGELOG.md (this file)

### Changed
- Moved 20+ documentation files to docs/ directory
- Archived historical documentation to docs/archive/
- Updated README.md to reflect current project status
- Renamed BUGS_AND_ISSUES.md to BUGS.md

### Fixed
- Import ordering across all source files
- Code formatting standardization (70+ files)

## [0.3.0] - 2026-02-14

### Added
- Dashboard with outreach tracking (/dashboard)
- Individual vendor detail pages with response tracking
- Manual response entry system
- Email delivery and open status tracking
- Response inbox UI (/dashboard/responses)
- Vendor outreach statistics and analytics

### Changed
- Enhanced VendorOutreach schema with emailId and tracking fields
- Updated dashboard UI with elegant wedding theme

## [0.2.0] - 2026-02-12

### Added
- Email outreach system with Resend API integration
- AI-powered personalized email generation
- Batch email sending (up to 100 vendors)
- Email preview and editing page (/outreach/preview)
- Vendor selection UI with checkboxes
- VendorCard and VendorGrid components
- Vendor browsing page (/vendors)
- Email generation API endpoint
- Batch sending API endpoint

### Changed
- Updated Prisma schema to support email tracking
- Enhanced vendor matching algorithm

## [0.1.0] - 2026-02-10

### Added
- User authentication with Supabase Auth
- Login and signup pages with elegant wedding theme
- Google OAuth integration
- Email/password authentication
- Protected routes with middleware
- Session management with @supabase/ssr
- OAuth callback handler
- User sync API endpoint

### Changed
- Migrated from NextAuth to Supabase Auth
- Updated User model with authId field
- Enhanced security with proper session handling

## [0.0.1] - 2026-02-01

### Added
- Initial MVP foundation
- Next.js 15 App Router setup
- Claude Sonnet 4.5 integration
- Multi-stage questionnaire UI with button selections
- AI chat consultant mode
- Vendor matching algorithm (Newcastle region)
- 17 Newcastle vendors seeded
- Elegant wedding-themed UI with rose gold gradients
- Cormorant serif typography
- Glass morphism effects
- PostgreSQL database with Prisma ORM
- 7 database tables (User, Wedding, Vendor, VendorOutreach, Conversation, SavedVendor, Session)
- Landing page with feature showcase
- Deployment to Vercel
- Supabase PostgreSQL database
- Docker setup for local development

### Technical
- TypeScript strict mode
- Tailwind CSS for styling
- Server Components and Client Components architecture
- Edge runtime for API routes
- Prisma migrations and seeding scripts

---

## Version History Summary

- **0.4.0** - Tooling and documentation improvements
- **0.3.0** - Dashboard and response tracking
- **0.2.0** - Email outreach system
- **0.1.0** - Authentication system
- **0.0.1** - Initial MVP foundation

---

**Note**: This project is currently in active development. Version numbers follow semantic versioning principles but are pre-1.0 (experimental/beta).
