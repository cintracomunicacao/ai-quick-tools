'use client'

import { useState, useCallback, useRef } from 'react'
import { Tool, ToolField } from '@/lib/tools'

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: ToolField
  value: string
  onChange: (val: string) => void
}) {
  const baseClass =
    'w-full bg-zinc-900 border border-zinc-700 focus:border-amber-500 focus:outline-none text-zinc-100 text-sm font-mono px-3 py-2 transition-colors'

  if (field.type === 'select') {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={baseClass + ' cursor-pointer'}
      >
        {field.options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    )
  }

  if (field.type === 'textarea') {
    return (
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        rows={6}
        className={baseClass + ' resize-none leading-relaxed'}
      />
    )
  }

  return (
    <input
      type={field.type === 'number' ? 'number' : field.type === 'date' ? 'date' : 'text'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      className={baseClass}
    />
  )
}

export function ToolRunner({ tool }: { tool: Tool }) {
  const [fields, setFields] = useState<Record<string, string>>(() => {
    const defaults: Record<string, string> = {}
    tool.fields.forEach((f) => {
      if (f.type === 'select' && f.options?.length) {
        defaults[f.name] = f.options[0].value
      } else {
        defaults[f.name] = ''
      }
    })
    return defaults
  })

  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const setField = (name: string, value: string) => {
    setFields((prev) => ({ ...prev, [name]: value }))
  }

  const requiredFilled = tool.fields
    .filter((f) => f.required)
    .every((f) => fields[f.name]?.trim())

  const run = useCallback(async () => {
    if (!requiredFilled || loading) return
    setLoading(true)
    setOutput('')
    setError('')

    abortRef.current = new AbortController()

    try {
      const res = await fetch('/api/tools', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: tool.slug, fields }),
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
          } catch { /* skip */ }
        }
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        setError('Falha na requisição. Verifique sua conexão.')
      }
    } finally {
      setLoading(false)
    }
  }, [fields, tool.slug, loading, requiredFilled])

  const copyOutput = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-5">
      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tool.fields.map((field) => (
          <div
            key={field.name}
            className={field.type === 'textarea' ? 'sm:col-span-2' : ''}
          >
            <label className="block text-xs font-mono text-zinc-400 mb-1 uppercase tracking-widest">
              {field.label}
              {field.required && <span className="text-amber-500 ml-1">*</span>}
            </label>
            <FieldInput
              field={field}
              value={fields[field.name] || ''}
              onChange={(val) => setField(field.name, val)}
            />
            {field.hint && (
              <p className="mt-1 text-xs text-zinc-600">{field.hint}</p>
            )}
          </div>
        ))}
      </div>

      {/* Submit */}
      <button
        onClick={run}
        disabled={!requiredFilled || loading}
        className="px-6 py-2 bg-amber-500 text-black text-sm font-mono font-semibold hover:bg-amber-400 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        {loading ? 'Gerando...' : tool.submitLabel}
      </button>

      {/* Error */}
      {error && (
        <div className="border border-red-800 bg-red-950 text-red-400 text-sm font-mono p-4">
          {error}
        </div>
      )}

      {/* Output */}
      {(output || loading) && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
              Resultado
            </label>
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
              tool.outputMode === 'code'
                ? 'font-mono text-emerald-400'
                : 'text-zinc-100'
            }`}
          >
            {output || (
              <span className="text-zinc-600 font-mono text-xs animate-pulse">
                Pensando...
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
