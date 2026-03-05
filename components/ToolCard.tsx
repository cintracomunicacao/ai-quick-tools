import Link from 'next/link'
import { Tool } from '@/lib/tools'

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group block border border-zinc-800 bg-zinc-950 hover:border-amber-500 hover:bg-zinc-900 transition-all duration-150 p-5"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl leading-none mt-0.5 font-mono">{tool.icon}</span>
        <div>
          <h2 className="font-mono text-sm font-semibold text-zinc-100 group-hover:text-amber-400 transition-colors">
            {tool.name}
          </h2>
          <p className="mt-1 text-xs text-zinc-500 leading-relaxed">{tool.description}</p>
        </div>
      </div>
    </Link>
  )
}
