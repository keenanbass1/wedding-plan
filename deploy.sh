#!/bin/bash

echo "🚀 Wedding Planning App - Vercel Deployment"
echo "==========================================="
echo ""

# Check if logged in
echo "📝 Step 1: Login to Vercel..."
npx vercel login

echo ""
echo "🏗️  Step 2: Deploying to Vercel..."
npx vercel --prod

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Visit Vercel dashboard: https://vercel.com/dashboard"
echo "2. Go to your project → Settings → Environment Variables"
echo "3. Add these variables:"
echo "   - DATABASE_URL (get from Neon, Supabase, or Vercel Postgres)"
echo "   - ANTHROPIC_API_KEY (your Claude API key)"
echo "   - CLAUDE_MODEL=claude-sonnet-4-5-20250929"
echo "   - NEXTAUTH_SECRET (generate with: openssl rand -base64 32)"
echo ""
echo "4. Redeploy: npx vercel --prod"
echo "5. Set up database: See DEPLOYMENT.md for full guide"
echo ""
echo "Your app URL will be shown above! 🎉"
