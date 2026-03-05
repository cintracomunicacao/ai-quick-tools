import { NextRequest } from 'next/server'
import { getToolBySlug } from '@/lib/tools'
import { buildMessages } from '@/lib/prompts'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  const { slug, input, options } = await req.json()

  if (!slug || !input?.trim()) {
    return new Response(JSON.stringify({ error: 'Missing slug or input' }), { status: 400 })
  }

  const tool = getToolBySlug(slug)
  if (!tool) {
    return new Response(JSON.stringify({ error: 'Unknown tool' }), { status: 404 })
  }

  const messages = buildMessages(slug, input, options || {})

  const apiKey = process.env.OPENROUTER_API_KEY
  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 })
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': 'https://ai-quick-tools.vercel.app',
      'X-Title': 'AI Quick Tools',
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4-5',
      messages,
      stream: true,
      max_tokens: 2048,
    }),
  })

  if (!response.ok) {
    const err = await response.text()
    return new Response(JSON.stringify({ error: err }), { status: response.status })
  }

  // Pass the SSE stream directly to the client
  return new Response(response.body, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  })
}
