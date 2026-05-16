import Anthropic from '@anthropic-ai/sdk'

if (typeof window !== 'undefined') {
  throw new Error('このファイルはサーバーサイドでのみ使用してください')
}

export const anthropic = new Anthropic({
  apiKey: process.env['ANTHROPIC_API_KEY'],
})

export async function generateText(
  systemPrompt: string,
  userPrompt: string,
): Promise<{ content: string; tokensUsed: number }> {
  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5',
    max_tokens: 800,
    system: systemPrompt,
    messages: [
      { role: 'user', content: userPrompt },
    ],
  })

  const content = response.content[0]?.type === 'text'
    ? response.content[0].text
    : '{}'

  const tokensUsed = response.usage.input_tokens + response.usage.output_tokens

  return { content, tokensUsed }
}