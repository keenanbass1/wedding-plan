import Anthropic from '@anthropic-ai/sdk';

// Initialize Claude API client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || '',
});

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatOptions {
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
}

/**
 * Send a message to Claude and get a streaming response
 */
export async function* streamChatResponse(
  messages: Message[],
  options: ChatOptions = {}
): AsyncGenerator<string> {
  const {
    systemPrompt = 'You are a helpful wedding planning assistant.',
    maxTokens = 1024,
    temperature = 0.7,
  } = options;

  const stream = await anthropic.messages.stream({
    model: process.env.CLAUDE_MODEL || 'claude-3-5-haiku-20241022', // Haiku for dev, can switch to Sonnet
    max_tokens: maxTokens,
    temperature,
    system: systemPrompt,
    messages: messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    })),
  });

  for await (const chunk of stream) {
    if (
      chunk.type === 'content_block_delta' &&
      chunk.delta.type === 'text_delta'
    ) {
      yield chunk.delta.text;
    }
  }
}

/**
 * Send a message to Claude and get a complete response
 */
export async function getChatResponse(
  messages: Message[],
  options: ChatOptions = {}
): Promise<string> {
  const {
    systemPrompt = 'You are a helpful wedding planning assistant.',
    maxTokens = 1024,
    temperature = 0.7,
  } = options;

  const response = await anthropic.messages.create({
    model: process.env.CLAUDE_MODEL || 'claude-3-5-haiku-20241022', // Haiku for dev, can switch to Sonnet
    max_tokens: maxTokens,
    temperature,
    system: systemPrompt,
    messages: messages.map(msg => ({
      role: msg.role,
      content: msg.content,
    })),
  });

  const textContent = response.content.find(block => block.type === 'text');
  return textContent && textContent.type === 'text' ? textContent.text : '';
}

// Wedding planning specific system prompt
export const WEDDING_PLANNER_PROMPT = `
You are a friendly, empathetic wedding planning assistant helping couples plan their dream wedding in New South Wales, Australia.

Your goal is to gather the following information through natural conversation:
1. Wedding date (or preferred month/season if flexible)
2. Location (suburb/region in NSW)
3. Expected guest count (approximate is fine)
4. Total budget and category budgets (venue, catering, photography)
5. Wedding style and aesthetic preferences
6. Must-have requirements and deal-breakers
7. Dietary restrictions and accessibility needs

Guidelines:
- Be warm, empathetic, and genuinely excited for their wedding
- Ask ONE question at a time - don't overwhelm them
- If they provide vague answers, gently probe for more specifics
- Celebrate their answers with enthusiasm ("That sounds beautiful!")
- Use Australian English spellings and references
- After gathering all required info, summarize everything and ask for confirmation
- Keep responses concise and conversational

When you've collected all necessary information, let them know you'll now search for vendors that match their requirements.
`.trim();
