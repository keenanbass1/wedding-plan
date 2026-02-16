import Anthropic from '@anthropic-ai/sdk'
import { Vendor, Wedding } from '@prisma/client'
import { sanitizeForAIPrompt } from '@/lib/input-validation'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
})

export interface GeneratedEmail {
  subject: string
  body: string
}

/**
 * Generate a personalized email to a vendor using Claude AI
 */
export async function generateVendorEmail(
  vendor: Vendor,
  wedding: Wedding,
  userEmail: string
): Promise<GeneratedEmail> {
  // Sanitize all user inputs to prevent prompt injection
  const sanitizedVendorName = sanitizeForAIPrompt(vendor.name)
  const sanitizedLocation = sanitizeForAIPrompt(wedding.location)
  const sanitizedStyle = sanitizeForAIPrompt(wedding.style || 'Not specified')
  const sanitizedMustHaves = wedding.mustHaves.map(h => sanitizeForAIPrompt(h)).join(', ')
  const sanitizedDietaryNeeds = wedding.dietaryNeeds.map(d => sanitizeForAIPrompt(d)).join(', ')

  const prompt = `You are helping a couple contact wedding vendors. Generate a professional, warm, and personalized email inquiry.

VENDOR DETAILS:
- Name: ${sanitizedVendorName}
- Category: ${vendor.category}
- Location: ${vendor.location}
- Services: ${vendor.servicesOffered.join(', ')}

WEDDING DETAILS:
- Date: ${wedding.weddingDate ? new Date(wedding.weddingDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Flexible'}
- Location: ${sanitizedLocation}
- Guest Count: ${wedding.guestCount || 'To be determined'}
- Style: ${sanitizedStyle}
${wedding.mustHaves.length > 0 ? `- Must-haves: ${sanitizedMustHaves}` : ''}
${wedding.dietaryNeeds.length > 0 ? `- Dietary requirements: ${sanitizedDietaryNeeds}` : ''}

Generate a professional email with:
1. A compelling subject line (max 60 characters)
2. An email body that:
   - Opens warmly and mentions how you found them
   - Briefly describes the wedding vision and key details
   - Asks about availability for the date
   - Requests pricing/packages information
   - Mentions 1-2 specific things about their services that appeal to the couple
   - Ends with a clear call-to-action
   - Includes the couple's contact email: ${userEmail}
   - Is professional but friendly (Australian English)
   - Is concise (200-300 words)

Format your response as:
SUBJECT: [subject line]

BODY:
[email body]

Do not include any other text before or after.`

  try {
    const response = await anthropic.messages.create({
      model: process.env.CLAUDE_MODEL || 'claude-sonnet-4-5-20250929',
      max_tokens: 1000,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const textContent = response.content.find(block => block.type === 'text')
    const generatedText = textContent && textContent.type === 'text' ? textContent.text : ''

    // Parse the response
    const subjectMatch = generatedText.match(/SUBJECT:\s*(.+?)(?:\n|$)/i)
    const bodyMatch = generatedText.match(/BODY:\s*([\s\S]+?)(?:\n\n---|\n\nBest regards|$)/i)

    const subject =
      subjectMatch?.[1]?.trim() ||
      `Wedding Inquiry - ${new Date(wedding.weddingDate || Date.now()).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}`
    const body = bodyMatch?.[1]?.trim() || generatedText

    return { subject, body }
  } catch (error) {
    console.error('Error generating email with Claude:', error)

    // Fallback to template if AI fails
    return generateFallbackEmail(vendor, wedding, userEmail)
  }
}

/**
 * Fallback email template if AI generation fails
 */
function generateFallbackEmail(
  vendor: Vendor,
  wedding: Wedding,
  userEmail: string
): GeneratedEmail {
  const dateStr = wedding.weddingDate
    ? new Date(wedding.weddingDate).toLocaleDateString('en-AU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : "a date we're still finalising"

  const subject = `Wedding Inquiry - ${vendor.category} for ${new Date(wedding.weddingDate || Date.now()).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}`

  const body = `Dear ${vendor.name} team,

I hope this email finds you well. I'm reaching out regarding ${vendor.category.toLowerCase()} services for our upcoming wedding.

Wedding Details:
• Date: ${dateStr}
• Location: ${wedding.location}
• Guest Count: ${wedding.guestCount || 'Approximately 50-150'} guests
${wedding.style ? `• Style: ${wedding.style}` : ''}

We're very interested in learning more about your services and would love to know:
1. Are you available for our wedding date?
2. What packages do you offer, and what are your rates?
3. Do you have any portfolio examples we could review?

${wedding.mustHaves.length > 0 ? `We're particularly looking for: ${wedding.mustHaves.slice(0, 2).join(', ')}.` : ''}

Please let me know if you'd like to arrange a call or meeting to discuss our requirements in more detail.

Looking forward to hearing from you!

Best regards,
${userEmail}`

  return { subject, body }
}
