# 📚 Documentation Index

This folder contains project documentation, strategic planning, and reference materials.

---

## 📋 Strategic Documents

### **PRODUCT_STRATEGY.md**
Comprehensive product strategy covering:
- AI assistant architecture (simple vs agentic)
- Vendor data expansion plan
- Data quality standards
- Decision rationale and recommendations

**When to read:** Understanding product direction, planning features

---

### **VENDOR_OUTREACH_RESEARCH.md**
Research plan for understanding real vendor communication workflows:
- What couples write in vendor emails
- What vendors reply with
- Common pain points and friction
- Research methods (Reddit, surveys, mystery shopping)

**When to read:** Before implementing email generation or dashboard features

---

## 🔍 Technical Analysis

### **VENDOR_MATCHING_DEBUG.md**
Debug report for vendor matching issue:
- Root cause analysis (location mismatch)
- Test results for different locations
- Current vendor inventory (42 vendors)
- Long-term solutions

**When to read:** Debugging vendor matching or understanding algorithm

---

### **STATUS_UPDATE.md**
Snapshot of project status at specific point in time:
- Issue resolutions
- Decision summaries
- Current stats
- Next steps

**When to read:** Quick overview of what was decided and why

---

## 🚀 Deployment & Operations

### **DEPLOYMENT.md**
Deployment guide and production configuration:
- Vercel deployment steps
- Environment variable setup
- Database migrations
- Troubleshooting

**When to read:** Deploying to production or debugging deployment issues

---

### **VERCEL_ENV_SETUP.md**
Detailed Vercel environment configuration:
- All environment variables explained
- API key setup
- Verification steps

**When to read:** Setting up Vercel project or adding new env vars

---

## 🧪 Testing

### **TESTING_PLAN.md**
Comprehensive testing strategy:
- Unit tests
- Integration tests
- E2E scenarios
- Testing checklist

**When to read:** Before implementing new features or running tests

---

### **TESTING_CHECKLIST.md**
Quick reference testing checklist:
- Feature-by-feature test scenarios
- Manual testing steps
- Expected results

**When to read:** Before deploying or doing QA

---

## 🐛 Maintenance

### **BUGS.md**
Known issues and bug tracking:
- Active bugs
- Workarounds
- Priority levels
- Resolution status

**When to read:** Before starting work or debugging issues

---

### **CHANGELOG.md**
Version history and changes:
- Feature additions
- Bug fixes
- Breaking changes
- Migration notes

**When to read:** Understanding what changed between versions

---

## 📁 Root-Level Documents

These docs live in the project root for easy access:

### **README.md**
Main project readme - start here!
- What the project is
- Key features
- Setup instructions
- Tech stack

### **ROADMAP.md**
Future features and enhancements:
- Phase 1-4 planning
- Feature specs with effort estimates
- Technical implementation details
- Post-MVP backlog

### **USER_JOURNEY.md** ⭐ **Critical Reference**
Complete user flow documentation:
- Every step from signup to vendor booking
- Time saved at each stage
- Transparency checklist
- Value proposition per stage

**Must-read before implementing ANY user-facing feature**

### **QUICK_START.md**
Quick setup guide for developers:
- 5-minute setup
- Environment variables
- Database setup
- Running locally

---

## 🎯 How to Use This Documentation

**When starting a new feature:**
1. Read USER_JOURNEY.md - understand the user flow
2. Check ROADMAP.md - see if it's planned
3. Review PRODUCT_STRATEGY.md - understand strategic direction
4. Check BUGS.md - avoid known issues

**When debugging:**
1. Check BUGS.md - is this a known issue?
2. Review VENDOR_MATCHING_DEBUG.md - for vendor issues
3. Check DEPLOYMENT.md - for production issues
4. Run TESTING_CHECKLIST.md - verify expected behavior

**When deploying:**
1. Follow DEPLOYMENT.md
2. Use VERCEL_ENV_SETUP.md for env vars
3. Run through TESTING_CHECKLIST.md
4. Update CHANGELOG.md

---

## 📝 Documentation Standards

**Keep docs:**
- ✅ Up-to-date (mark outdated sections)
- ✅ Actionable (concrete steps, not vague ideas)
- ✅ Searchable (use clear headings)
- ✅ Honest (don't hide problems)

**Delete docs that:**
- ❌ Are outdated and no longer relevant
- ❌ Duplicate other docs
- ❌ Contain only temporary snapshots
- ❌ Are test-specific and not reusable

---

**Last Updated:** February 16, 2026
