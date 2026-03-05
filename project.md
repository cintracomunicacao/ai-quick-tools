# Project: AI Quick Tools

## Overview
A fast, utility-focused website offering a collection of small AI-powered tools. Inspired by invertexto.com — simple, no-frills, high utility. Each tool lives on its own page. The homepage is a grid/directory of all tools.

## Goals
- Speed and simplicity over flash.
- Each tool is self-contained and immediately usable (no sign-up, no friction).
- Looks clean and professional, not generic or AI-slop.
- Easily extensible — adding a new tool should be trivial.

## Target User
Someone who needs a quick AI-assisted task done right now. Developers, writers, researchers, students.

## Stack
- Next.js (App Router) — fast routing, easy per-tool pages
- Tailwind CSS — utility-first, fast to iterate
- Anthropic Claude API (claude-sonnet-4-20250514) — all AI calls go through this
- No database required at launch (stateless tools)
- Deployed on Vercel

## Tool Ideas (initial set)
1. **Text Summarizer** — paste text, get a summary (short/medium/long)
2. **Tone Rewriter** — rewrite text in a chosen tone (formal, casual, aggressive, friendly)
3. **Explain Like I'm 5** — simplify complex text or concepts
4. **Grammar & Style Fixer** — clean up prose
5. **JSON Formatter / Explainer** — paste JSON, get it formatted or explained in plain English
6. **Regex Builder** — describe what you want to match, get a regex + explanation
7. **SQL Query Builder** — describe a query in plain English, get SQL
8. **Code Explainer** — paste code, get a plain-English walkthrough
9. **Email Writer** — bullet points in, polished email out
10. **Tweet/Thread Generator** — long-form content → tweet or thread

## Design Direction
- Utilitarian. Dense but readable. No hero sections, no marketing fluff.
- Dark mode by default.
- Tools grid on homepage: icon, name, one-line description.
- Each tool page: title, simple input, submit, output. Nothing else.
- Distinctive typography — not Inter, not generic.

## Constraints
- API key stored server-side only (Next.js API routes or Server Actions).
- No auth at launch.
- No persistent storage at launch.
- Mobile-friendly but desktop-first.
- Each tool should load and return results fast — streaming responses preferred.

## Success Criteria
- Homepage loads in < 1s.
- Any tool produces output in < 5s for typical inputs.
- Adding a new tool requires touching ≤ 3 files.
