export interface ToolOption {
  name: string
  label: string
  values: { value: string; label: string }[]
}

export interface Tool {
  slug: string
  name: string
  description: string
  icon: string
  inputLabel: string
  inputPlaceholder: string
  outputMode: 'prose' | 'code'
  options?: ToolOption[]
}

export const tools: Tool[] = [
  {
    slug: 'summarize',
    name: 'Text Summarizer',
    description: 'Condense any text to its core ideas.',
    icon: '📄',
    inputLabel: 'Text to summarize',
    inputPlaceholder: 'Paste any text here...',
    outputMode: 'prose',
    options: [
      {
        name: 'length',
        label: 'Length',
        values: [
          { value: 'short', label: 'Short' },
          { value: 'medium', label: 'Medium' },
          { value: 'long', label: 'Long' },
        ],
      },
    ],
  },
  {
    slug: 'rewrite-tone',
    name: 'Tone Rewriter',
    description: 'Rewrite text in a different tone.',
    icon: '✏️',
    inputLabel: 'Text to rewrite',
    inputPlaceholder: 'Paste text to rewrite...',
    outputMode: 'prose',
    options: [
      {
        name: 'tone',
        label: 'Tone',
        values: [
          { value: 'formal', label: 'Formal' },
          { value: 'casual', label: 'Casual' },
          { value: 'friendly', label: 'Friendly' },
          { value: 'aggressive', label: 'Aggressive' },
        ],
      },
    ],
  },
  {
    slug: 'eli5',
    name: 'Explain Like I\'m 5',
    description: 'Simplify anything into plain language.',
    icon: '🧠',
    inputLabel: 'What needs explaining?',
    inputPlaceholder: 'Paste complex text or describe a concept...',
    outputMode: 'prose',
  },
  {
    slug: 'grammar',
    name: 'Grammar & Style Fixer',
    description: 'Clean up prose. Fix grammar and style.',
    icon: '🔧',
    inputLabel: 'Text to fix',
    inputPlaceholder: 'Paste your text here...',
    outputMode: 'prose',
  },
  {
    slug: 'json-explainer',
    name: 'JSON Formatter & Explainer',
    description: 'Format or explain JSON in plain English.',
    icon: '{}',
    inputLabel: 'JSON input',
    inputPlaceholder: 'Paste JSON here...',
    outputMode: 'code',
    options: [
      {
        name: 'mode',
        label: 'Mode',
        values: [
          { value: 'format', label: 'Format' },
          { value: 'explain', label: 'Explain' },
        ],
      },
    ],
  },
  {
    slug: 'regex-builder',
    name: 'Regex Builder',
    description: 'Describe what to match. Get a regex.',
    icon: '.*',
    inputLabel: 'What do you want to match?',
    inputPlaceholder: 'e.g. "US phone numbers with optional country code"',
    outputMode: 'code',
  },
  {
    slug: 'sql-builder',
    name: 'SQL Query Builder',
    description: 'Plain English → SQL query.',
    icon: '🗄️',
    inputLabel: 'Describe your query',
    inputPlaceholder: 'e.g. "Get all users who signed up in the last 30 days and have made at least one purchase"',
    outputMode: 'code',
    options: [
      {
        name: 'dialect',
        label: 'Dialect',
        values: [
          { value: 'postgresql', label: 'PostgreSQL' },
          { value: 'mysql', label: 'MySQL' },
          { value: 'sqlite', label: 'SQLite' },
        ],
      },
    ],
  },
  {
    slug: 'code-explainer',
    name: 'Code Explainer',
    description: 'Paste code. Get a plain-English walkthrough.',
    icon: '</> ',
    inputLabel: 'Code to explain',
    inputPlaceholder: 'Paste any code here...',
    outputMode: 'prose',
  },
  {
    slug: 'email-writer',
    name: 'Email Writer',
    description: 'Bullet points in, polished email out.',
    icon: '📧',
    inputLabel: 'Key points for your email',
    inputPlaceholder: 'e.g.\n- Following up on last week\'s meeting\n- Need their decision by Friday\n- Happy to jump on a call',
    outputMode: 'prose',
    options: [
      {
        name: 'tone',
        label: 'Tone',
        values: [
          { value: 'professional', label: 'Professional' },
          { value: 'friendly', label: 'Friendly' },
          { value: 'assertive', label: 'Assertive' },
        ],
      },
    ],
  },
  {
    slug: 'tweet-generator',
    name: 'Tweet / Thread Generator',
    description: 'Turn long content into tweets or threads.',
    icon: '🐦',
    inputLabel: 'Content to convert',
    inputPlaceholder: 'Paste article, notes, or ideas...',
    outputMode: 'prose',
    options: [
      {
        name: 'format',
        label: 'Format',
        values: [
          { value: 'single', label: 'Single Tweet' },
          { value: 'thread', label: 'Thread' },
        ],
      },
    ],
  },
]

export function getToolBySlug(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug)
}
