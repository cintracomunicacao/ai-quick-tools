import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getToolBySlug } from '@/lib/tools'
import { ToolRunner } from '@/components/ToolRunner'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) return { title: 'Não encontrado' }
  return {
    title: `${tool.name} — Ferramentas IA`,
    description: tool.description,
  }
}

export default async function ToolPage({ params }: Props) {
  const { slug } = await params
  const tool = getToolBySlug(slug)
  if (!tool) notFound()

  return (
    <div className="px-6 py-8 max-w-3xl mx-auto">
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 mb-6">
        <Link href="/" className="hover:text-amber-400 transition-colors">
          Início
        </Link>
        <span>/</span>
        <span className="text-zinc-400">{tool.name}</span>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <span className="text-2xl">{tool.icon}</span>
          <h1 className="font-mono text-base font-semibold text-zinc-100">{tool.name}</h1>
        </div>
        <p className="text-sm text-zinc-500">{tool.description}</p>
      </div>

      <ToolRunner tool={tool} />
    </div>
  )
}
