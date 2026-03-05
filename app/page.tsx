import { ToolGrid } from '@/components/ToolGrid'

export default function Home() {
  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="font-mono text-lg font-semibold text-zinc-100">Tools</h1>
        <p className="text-sm text-zinc-500 mt-1">Pick a tool. Paste your input. Get output.</p>
      </div>
      <ToolGrid />
    </div>
  )
}
