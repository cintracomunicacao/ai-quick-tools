'use client'

import { useState, useCallback, useRef } from 'react'
import { Tool } from '@/lib/tools'

export function ToolRunner({ tool }: { tool: Tool }) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [options, setOptions] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {}
    tool.options?.forEach((o) => {
      defaults[o.name] = o.values[0].value
    })
    return defaults
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const run = useCallback(async () => {
    if (!input.trim() || loading) return
    setLoading(true)
    setOutput('')
    setError('')

    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: tool.slug, input, options }),
        signal: abortRef.current.signal,
      })

      if (!res.ok) {
        const err = await res.json()
        setError(err.error || 'Algo deu errado. Tente novamente.')
        setLoading(false)
        return
      }

      const reader = res.body?.getReader()
      const decoder = new TextDecoder()
      if (!reader) return

      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          const data = line.slice(6).trim()
          if (data === '[DONE]') continue
          try {
            const json = JSON.parse(data)
            const delta = json.choices?.[0]?.delta?.content
            if (delta) setOutput((prev) => prev + delta)
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError('Falha na requisição. Verifique sua conexão.')
      }
    } finally {
      setLoading(false)
    }
  }, [input, options, tool.slug, loading])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      run()
    }
  }

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const submitLabel = tool.submitLabel || 'Gerar'

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-mono text-zinc-400 mb-2 uppercase tracking-widest">
          {tool.inputLabel}
        </label>
        <textarea
          className="w-full bg-zinc-900 border border-zinc-700 focus:border-amber-500 focus:outline-none text-zinc-100 text-sm font-mono p-4 resize-none leading-relaxed transition-colors"
          rows={10}
          placeholder={tool.inputPlaceholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      {tool.options && tool.options.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {tool.options.map((opt) => (
            <div key={opt.name} className="flex items-center gap-2">
              <label className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                {opt.label}
              </label>
              <div className="flex">
                {opt.values.map((v) => (
                  <button
                    key={v.value}
                    onClick={() => setOptions((prev) => ({ ...prev, [opt.name]: v.value }))}
                    className={`px-3 py-1 text-xs font-mono border transition-colors ${
                      options[opt.name] === v.value
                        ? 'bg-amber-500 border-amber-500 text-black'
                        : 'bg-transparent border-zinc-700 text-zinc-400 hover:border-zinc-500'
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={run}
        disabled={!input.trim() || loading}
        className="px-6 py-2 bg-amber-500 text-black text-sm font-mono font-semibold hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Gerando...' : submitLabel}
        {!loading && (
          <span className="ml-2 text-xs opacity-60">
            {typeof navigator !== 'undefined' && /Mac/.test(navigator.platform) ? '⌘' : 'Ctrl'}+↵
          </span>
        )}
      </button>

      {error && (
        <div className="border border-red-800 bg-red-950 text-red-400 text-sm font-mono p-4">
          {error}
        </div>
      )}

      {(output || loading) && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Resultado</label>
            {output && (
              <button
                onClick={copyOutput}
                className="text-xs font-mono text-zinc-500 hover:text-amber-400 transition-colors"
              >
                {copied ? '✓ Copiado' : 'Copiar'}
              </button>
            )}
          </div>
          <div
            className={`w-full min-h-32 bg-zinc-900 border border-zinc-700 p-4 text-sm leading-relaxed whitespace-pre-wrap ${
              tool.outputMode === 'code' ? 'font-mono text-emerald-400' : 'text-zinc-100'
            }`}
          >
            {output || <span className="text-zinc-600 font-mono text-xs animate-pulse">Pensando...</span>}
          </div>
        </div>
      )}
    </div>
  )
}
