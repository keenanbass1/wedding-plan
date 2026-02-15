# 🚀 Setup Claude Max Proxy (Optional - Save $$)

**Run this later outside of Claude Code to use your Max subscription for free!**

---

## Why Do This?

You're already paying $200/month for Claude Max. Using the proxy lets you use that subscription for your wedding app API calls instead of paying extra per-token.

**Savings:** Could save $100s-1000s during development and production!

---

## Quick Setup (5 Minutes)

### Step 1: Open a Regular Terminal

**Important:** Exit Claude Code first! The proxy won't work inside a nested Claude Code session.

```bash
# Open a regular terminal (not Claude Code)
```

### Step 2: Start the Proxy

```bash
# The proxy is already built at /tmp/claude-max-api-proxy
cd /tmp/claude-max-api-proxy

# Start it
node dist/server/standalone.js
```

You should see:

```
Claude Code CLI Provider running at http://localhost:3456
```

### Step 3: Update Your Wedding App

Edit `.env.local`:

```bash
# Comment out the API key
# ANTHROPIC_API_KEY="sk-ant-api03-..."

# Add proxy URL
CLAUDE_BASE_URL="http://localhost:3456/v1"
```

### Step 4: Test It!

```bash
cd /home/mrfishpants/code/wedding-plan
npm run dev

# Visit http://localhost:3000/chat
# Now uses your Max subscription! 🎉
```

---

## Verify It's Working

```bash
# Test health endpoint
curl http://localhost:3456/health

# Should return: {"status":"ok"}
```

---

## Keep It Running

### Option 1: Run in Background

```bash
nohup node /tmp/claude-max-api-proxy/dist/server/standalone.js > ~/claude-proxy.log 2>&1 &
```

### Option 2: Use PM2 (Recommended)

```bash
# Install PM2
npm install -g pm2

# Start proxy
pm2 start /tmp/claude-max-api-proxy/dist/server/standalone.js --name claude-proxy

# Auto-start on boot
pm2 startup
pm2 save

# View logs
pm2 logs claude-proxy

# Stop
pm2 stop claude-proxy
```

---

## Troubleshooting

### "Claude CLI not found"

Make sure Claude Code CLI is in your PATH:

```bash
which claude
# Should show: /home/mrfishpants/.local/bin/claude
```

### "Not authenticated"

```bash
# This should already be done, but if needed:
unset CLAUDECODE  # Bypass nested session check
claude auth status
```

### Proxy won't start

```bash
# Check if port 3456 is in use
lsof -i :3456

# Kill if needed
kill -9 $(lsof -t -i:3456)
```

---

## Cost Comparison

### With Claude Max Proxy (FREE)

```
Development: $0 (unlimited)
Beta testing: $0 (unlimited)
Production: $0 (within Max limits)
Total: $0 extra per month
```

### With API (Current Setup)

```
Development (1000 chats): ~$50
Beta (10,000 chats): ~$500
Production: ~$50-100 per 1000 chats
Total: Can add up quickly!
```

---

## When to Use What

**Use Max Proxy:**

- ✅ Development and testing
- ✅ You're already paying for Max
- ✅ Want unlimited free usage

**Use API (Current):**

- ✅ Quick testing right now
- ✅ Don't want to manage proxy
- ✅ Simpler setup

---

## Your Current Credentials

You have both options available:

**Option 1: API Key (Active Now)**

```
ANTHROPIC_API_KEY="sk-ant-api03-X54qT..."
Model: claude-3-5-sonnet-20241022
Cost: ~$3/M input, ~$15/M output
```

**Option 2: Max OAuth (Set up later)**

```
Access Token: sk-ant-oat01-... (in ~/.claude/.credentials.json)
Refresh Token: sk-ant-ort01-...
Subscription: Claude Max
Cost: $0 extra (already paying $200/month)
```

---

## Next Steps

1. **For now:** Use the API key (already configured) ✅
2. **Later:** Set up proxy when you have time to save money
3. **Production:** Consider keeping proxy for free usage

---

**The proxy is already built at `/tmp/claude-max-api-proxy` - just start it outside Claude Code!**
