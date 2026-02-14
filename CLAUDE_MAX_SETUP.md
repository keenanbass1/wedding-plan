# 🚀 Use Your Claude Max Subscription for Free API Access

**Save $100s-1000s** by using your existing Claude Max subscription instead of paying per API call!

---

## Option 1: Claude Max API Proxy (RECOMMENDED)

### Step 1: Install the Proxy

```bash
cd ~
git clone https://github.com/atalovesyou/claude-max-api-proxy.git
cd claude-max-api-proxy
npm install
```

### Step 2: Configure with Your Max Account

```bash
# Get your OAuth token
claude setup-token

# Copy your credentials
cat ~/.claude/.credentials.json

# Set environment variables
export CLAUDE_OAUTH_ACCESS_TOKEN="sk-ant-oat01-..."
export CLAUDE_OAUTH_REFRESH_TOKEN="sk-ant-ort01-..."
```

### Step 3: Start the Proxy

```bash
npm start
# Proxy running at http://localhost:3001
```

### Step 4: Update Your Wedding App

Edit `lib/claude.ts`:

```typescript
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'dummy-key',
  baseURL: process.env.CLAUDE_BASE_URL || undefined,
});
```

Edit `.env.local`:

```bash
# Use Claude Max via proxy
CLAUDE_BASE_URL="http://localhost:3001/v1"
ANTHROPIC_API_KEY="dummy-key"  # Not used, but required by SDK
```

### Step 5: Test It!

```bash
cd /home/mrfishpants/code/wedding-plan
npm run dev

# Visit http://localhost:3000/chat
# Chat now uses your Max subscription! 🎉
```

---

## Option 2: Direct OAuth Token (Manual)

### Step 1: Get Your Tokens

```bash
# Setup Claude Code
claude setup-token

# Extract tokens
cat ~/.claude/.credentials.json
```

You'll see:
```json
{
  "access_token": "sk-ant-oat01-...",
  "refresh_token": "sk-ant-ort01-...",
  "expires_at": "..."
}
```

### Step 2: Use Token Directly

Edit `.env.local`:

```bash
# Use OAuth access token
ANTHROPIC_API_KEY="sk-ant-oat01-YOUR-ACCESS-TOKEN"
```

**Note:** Access token expires every 8 hours. Need to implement refresh logic (see Option 1).

---

## Benefits

✅ **FREE** - Uses existing Max subscription ($200/month)
✅ **Unlimited** - Within Max usage limits (way higher than you'll use)
✅ **No per-token charges** - Flat monthly cost
✅ **Same quality** - Same models as API
✅ **Easy switch** - Can switch back to regular API anytime

---

## Cost Savings Example

### Development Phase (4 weeks, 1000 test conversations)
- **With API (Haiku):** $5-10
- **With API (Sonnet):** $50-100
- **With Max:** $0 (already paying $200/month)
- **Savings:** $50-100

### Beta Phase (4 weeks, 10,000 conversations)
- **With API (Haiku):** $50-100
- **With API (Sonnet):** $500-1,000
- **With Max:** $0
- **Savings:** $500-1,000

### Production (first 3 months, 50,000 conversations)
- **With API (Sonnet):** $2,500-5,000
- **With Max:** $0 (or $200/month if only using for this)
- **Savings:** $2,000-4,400

**Total Savings: $2,500-5,500** 🎉

---

## Troubleshooting

### Proxy won't start
```bash
# Check if Claude Code is installed
claude --version

# Re-authenticate
claude setup-token
```

### Token expired
```bash
# Tokens expire every 8 hours
# The proxy auto-refreshes using your refresh token
# Or manually refresh:
claude setup-token
```

### App can't connect to proxy
```bash
# Make sure proxy is running
curl http://localhost:3001/health

# Check .env.local has correct URL
cat .env.local | grep CLAUDE_BASE_URL
```

---

## When to Use What

**Use Max Subscription (Option 1) if:**
- ✅ You already have Claude Max ($100-200/month)
- ✅ You're in development/testing
- ✅ You want unlimited free usage
- ✅ You don't mind running a local proxy

**Use Claude API if:**
- ✅ You don't have Max subscription
- ✅ You're in production with many users
- ✅ You need official Anthropic support
- ✅ You want simplicity (no proxy setup)

---

## Sources

- [claude-max-api-proxy GitHub](https://github.com/atalovesyou/claude-max-api-proxy)
- [How I Built claude_max](https://dsco2048.substack.com/p/how-i-built-claude_max-to-unlock)
- [Unlock Claude API from Pro/Max](https://www.alif.web.id/posts/claude-oauth-api-key)
- [Using Claude Code with Pro/Max](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-pro-or-max-plan)

---

**Ready to use your Max subscription for free API access? Follow Option 1 above!** 🚀
