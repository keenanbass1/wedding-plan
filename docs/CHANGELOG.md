# Changelog

All notable changes to WeddingPlan AI will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Unreleased]

### Pending
- Resend webhook integration (waiting for Resend service restoration)
- Automated email notifications when vendors respond
- Expand vendor database to Hunter Valley, Blue Mountains, Sydney
- Vitest testing suite implementation

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
