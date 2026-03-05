import type { Metadata } from 'next'
import { Geist_Mono, Instrument_Sans } from 'next/font/google'
import Link from 'next/link'
import './globals.css'

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

const instrumentSans = Instrument_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'AI Quick Tools',
  description: 'Simple, fast AI tools for everyday tasks.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistMono.variable} ${instrumentSans.variable} bg-zinc-950 text-zinc-100 antialiased`}>
        <header className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="font-mono text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors tracking-tight">
            AI Quick Tools
          </Link>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
          >
            GitHub ↗
          </a>
        </header>
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  )
}
