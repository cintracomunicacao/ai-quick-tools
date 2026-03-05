# Plan: AI Quick Tools

## Architecture

### Directory Structure
```
ai-quick-tools/
├── app/
│   ├── layout.tsx          # Root layout, fonts, dark theme
│   ├── page.tsx            # Homepage — tools grid
│   ├── tools/
│   │   └── [slug]/
│   │       └── page.tsx    # Dynamic tool page
│   └── api/
│       └── tools/
│           └── route.ts    # Single API route handles all tools
├── lib/
│   ├── tools.ts            # Tool registry — single source of truth
│   └── prompts.ts          # All system/user prompts per tool
├── components/
│   ├── ToolGrid.tsx        # Homepage grid
│   ├── ToolCard.tsx        # Individual card in grid
│   └── ToolRunner.tsx      # Input/output UI, shared across all tools
├── public/
└── tailwind.config.ts
```

### Adding a New Tool
1. Add entry to `lib/tools.ts` (slug, name, description, icon, input config)
2. Add prompt to `lib/prompts.ts`
3. Done. The dynamic route and API handle the rest.

---

## Key Design Decisions

### Tool Registry (`lib/tools.ts`)
Each tool is an object:
```ts
{
  slug: string
  name: string
  description: string       // one-liner for homepage card
  icon: string              // emoji or lucide icon name
  inputLabel: string        // label above the textarea
  inputPlaceholder: string
  options?: {               // optional dropdowns/toggles
    name: string
    values: string[]
  }[]
}
```

### API Route (`app/api/tools/route.ts`)
- Single POST endpoint: `{ slug, input, options? }`
- Looks up prompt from `lib/prompts.ts` by slug
- Calls OpenRouter API with streaming (`https://openrouter.ai/api/v1/chat/completions`)
- OpenRouter is OpenAI-compatible — use `fetch` with standard chat completions format
- Returns a `ReadableStream` (SSE)
- API key lives in `process.env.OPENROUTER_API_KEY` — never exposed client-side

### Tool Page (`app/tools/[slug]/page.tsx`)
- Reads slug, finds tool in registry
- Renders `<ToolRunner>` with tool config
- If slug not found → 404

### ToolRunner Component
- Textarea input
- Optional controls (dropdowns for tools that need them, e.g. Tone Rewriter)
- Submit button
- Output renders below as streaming text (monospace for code tools, prose for text tools)
- Copy-to-clipboard button on output
- Stateless — no saves, no history

---

## Tools (Initial 10)

| Slug | Name | Options |
|------|------|---------|
| `summarize` | Text Summarizer | Length: short / medium / long |
| `rewrite-tone` | Tone Rewriter | Tone: formal / casual / friendly / aggressive |
| `eli5` | Explain Like I'm 5 | — |
| `grammar` | Grammar & Style Fixer | — |
| `json-explainer` | JSON Formatter & Explainer | Mode: format / explain |
| `regex-builder` | Regex Builder | — |
| `sql-builder` | SQL Query Builder | Dialect: PostgreSQL / MySQL / SQLite |
| `code-explainer` | Code Explainer | — |
| `email-writer` | Email Writer | Tone: professional / friendly / assertive |
| `tweet-generator` | Tweet / Thread Generator | Format: single tweet / thread |

---

## Design

### Theme
- Dark by default. Near-black background (`#0a0a0a`), off-white text.
- Accent: a single sharp color — amber (`#f59e0b`) for interactive elements.
- No gradients. No purple. No rounded-everything.

### Typography
- Display/headings: **DM Mono** or **Geist Mono** — monospace, utilitarian
- Body/UI: **Instrument Sans** — clean but not generic
- Code output blocks: monospace

### Homepage
- Top bar: site name (left), GitHub link (right)
- Below: tools grid — 3–4 columns on desktop, 1–2 on mobile
- Each card: icon, name, one-line description. Clicking goes to `/tools/[slug]`
- No hero. No tagline. Straight to the tools.

### Tool Page
- Breadcrumb: Home → Tool Name
- Tool title + one-line description
- Input area (full-width textarea, generous height)
- Options row (if any)
- Submit button — "Run" 
- Output section appears after submit; streams in
- Copy button top-right of output

---

## Streaming Implementation
- Use `fetch` with `ReadableStream` on client
- API route calls OpenRouter with `stream: true` via standard fetch (no SDK needed)
- Parse SSE chunks (`data: {...}`) and extract `choices[0].delta.content`
- Pipe chunks to client as raw stream
- Client reads chunks and appends to output state

---

## Environment
```
OPENROUTER_API_KEY=sk-or-v1-...
```
Single `.env.local` variable. Nothing else required.

OpenRouter base URL: `https://openrouter.ai/api/v1/chat/completions`  
Model: `anthropic/claude-sonnet-4-5` (switchable via env var later)

---

## Out of Scope (for now)
- Auth / user accounts
- Saved history
- Rate limiting (add later)
- Analytics
- Paid tier

---

## Todo List

### Setup
- [ ] `npx create-next-app@latest ai-quick-tools --typescript --tailwind --app --no-src-dir`
- [ ] No extra SDK needed — OpenRouter uses standard fetch with OpenAI-compatible format
- [ ] Install fonts via `next/font` (Geist Mono + Instrument Sans or equivalents)
- [ ] Set up `tailwind.config.ts` with custom colors and font variables
- [ ] Create `.env.local` with `OPENROUTER_API_KEY`

### Core Library
- [ ] Create `lib/tools.ts` — define all 10 tools with full config
- [ ] Create `lib/prompts.ts` — write system + user prompt templates for all 10 tools

### API
- [ ] Create `app/api/tools/route.ts`
  - [ ] Accept POST `{ slug, input, options }`
  - [ ] Validate slug exists in registry
  - [ ] Build prompt from `lib/prompts.ts`
  - [ ] Call Claude API with streaming enabled
  - [ ] Return streamed response

### Components
- [ ] Create `components/ToolCard.tsx` — icon, name, description, link
- [ ] Create `components/ToolGrid.tsx` — responsive grid of ToolCards
- [ ] Create `components/ToolRunner.tsx`
  - [ ] Textarea input with label/placeholder from tool config
  - [ ] Optional controls row (dropdowns)
  - [ ] Submit / Run button with loading state
  - [ ] Streaming output display
  - [ ] Copy to clipboard button
  - [ ] Output styled by type (prose vs monospace)

### Pages
- [ ] Create `app/layout.tsx` — root layout, fonts, dark background, metadata
- [ ] Create `app/page.tsx` — homepage with `<ToolGrid>`
- [ ] Create `app/tools/[slug]/page.tsx` — dynamic tool page with `<ToolRunner>`
- [ ] Handle 404 for unknown slugs

### Polish
- [ ] Responsive layout (mobile + desktop)
- [ ] Loading/streaming states (spinner or "thinking..." indicator)
- [ ] Error states (API failure, empty input)
- [ ] Keyboard shortcut: Cmd/Ctrl+Enter to submit
- [ ] Page titles and meta descriptions per tool (SEO)
- [ ] Top navigation bar: site name + GitHub link

### Verification
- [ ] Test all 10 tools end-to-end
- [ ] Test on mobile viewport
- [ ] Confirm API key never appears in client bundle
- [ ] Confirm streaming works on Vercel (check Edge vs Node runtime)
