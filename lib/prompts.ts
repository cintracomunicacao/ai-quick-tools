type Options = Record<string, string>

export function buildMessages(
  slug: string,
  input: string,
  options: Options = {}
): { role: 'system' | 'user'; content: string }[] {
  switch (slug) {
    case 'summarize': {
      const length = options.length || 'medium'
      const instruction =
        length === 'short'
          ? 'Write a 2-3 sentence summary.'
          : length === 'long'
          ? 'Write a detailed summary covering all main points and key details.'
          : 'Write a concise summary in one short paragraph.'
      return [
        { role: 'system', content: `You are a precise summarization assistant. ${instruction} Output only the summary, no preamble.` },
        { role: 'user', content: input },
      ]
    }

    case 'rewrite-tone': {
      const tone = options.tone || 'formal'
      return [
        { role: 'system', content: `You are a writing assistant. Rewrite the user's text in a ${tone} tone. Preserve the meaning exactly. Output only the rewritten text, no commentary.` },
        { role: 'user', content: input },
      ]
    }

    case 'eli5': {
      return [
        { role: 'system', content: `You explain things simply and clearly, as if to a curious 10-year-old. Use plain language, short sentences, and concrete analogies. No jargon. Output only the explanation.` },
        { role: 'user', content: input },
      ]
    }

    case 'grammar': {
      return [
        { role: 'system', content: `You are an expert editor. Fix grammar, spelling, punctuation, and style issues in the user's text. Preserve their voice. Output only the corrected text with no explanation or markup.` },
        { role: 'user', content: input },
      ]
    }

    case 'json-explainer': {
      const mode = options.mode || 'format'
      if (mode === 'format') {
        return [
          { role: 'system', content: `You are a JSON formatter. Take the input JSON and output it properly formatted with 2-space indentation. Output only the formatted JSON, nothing else.` },
          { role: 'user', content: input },
        ]
      } else {
        return [
          { role: 'system', content: `You are a JSON explainer. Explain what the JSON structure represents in plain English. Describe the shape, key fields, and what the data likely represents. Be concise and practical.` },
          { role: 'user', content: input },
        ]
      }
    }

    case 'regex-builder': {
      return [
        { role: 'system', content: `You are a regex expert. Given a description of what the user wants to match, output:
1. The regex pattern (on its own line, in a code block)
2. Flags to use (if any)
3. A brief explanation of how it works
4. 2-3 example matches and non-matches

Be practical. Use common regex syntax compatible with JavaScript/Python/most engines unless specified otherwise.` },
        { role: 'user', content: input },
      ]
    }

    case 'sql-builder': {
      const dialect = options.dialect || 'postgresql'
      return [
        { role: 'system', content: `You are a SQL expert. Generate a ${dialect} SQL query based on the user's description. Output:
1. The SQL query in a code block
2. A brief explanation of what it does and any assumptions made (e.g. assumed table/column names)

Use clean, readable SQL with proper formatting.` },
        { role: 'user', content: input },
      ]
    }

    case 'code-explainer': {
      return [
        { role: 'system', content: `You are a senior developer and teacher. Explain the provided code in plain English. Cover:
1. What the code does overall
2. How it works step by step (walk through the logic)
3. Any notable patterns, potential issues, or things worth knowing

Be clear and practical. Assume the reader is a developer but may not know this specific code or language deeply.` },
        { role: 'user', content: input },
      ]
    }

    case 'email-writer': {
      const tone = options.tone || 'professional'
      return [
        { role: 'system', content: `You are an expert email writer. Write a complete, polished email based on the user's bullet points. Tone: ${tone}. Include a subject line. Output only the email (subject line first, then body). No meta-commentary.` },
        { role: 'user', content: input },
      ]
    }

    case 'tweet-generator': {
      const format = options.format || 'single'
      if (format === 'single') {
        return [
          { role: 'system', content: `You are a social media expert. Distill the user's content into a single punchy tweet under 280 characters. Make it engaging and shareable. Output only the tweet text, no explanation.` },
          { role: 'user', content: input },
        ]
      } else {
        return [
          { role: 'system', content: `You are a social media expert. Convert the user's content into a compelling Twitter/X thread. Format each tweet numbered (1/, 2/, etc.). 4-8 tweets. Make each tweet standalone but part of a clear narrative. Output only the thread, no commentary.` },
          { role: 'user', content: input },
        ]
      }
    }

    default:
      return [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: input },
      ]
  }
}
