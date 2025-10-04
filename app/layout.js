import Link from 'next/link'
import { Home, CheckSquare, LogIn } from 'lucide-react'

export const metadata = {
  title: 'Bootcamp Site',
  description: 'Next.js + Supabase demo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900">
        <header className="sticky top-0 z-40 border-b bg-white/80 backdrop-blur">
          <div className="mx-auto max-w-4xl px-4 py-3">
            <div className="flex items-center justify-between">
              <Link href="/" className="font-semibold tracking-tight">
                Bootcamp
              </Link>
            </div>

            {/* stacked links with icons */}
            <nav className="mt-2 flex flex-col gap-2 text-sm">
              <Link href="/" className="inline-flex items-center gap-2 hover:text-blue-600">
                <Home size={16} /> Home
              </Link>
              <Link href="/check" className="inline-flex items-center gap-2 hover:text-blue-600">
                <CheckSquare size={16} /> Check
              </Link>
              <Link href="/auth" className="inline-flex items-center gap-2 hover:text-blue-600">
                <LogIn size={16} /> Auth
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-4xl px-4 py-6">{children}</main>

        <footer className="border-t text-xs text-slate-500 py-6 text-center">
          © {new Date().getFullYear()} Bootcamp
        </footer>
      </body>
    </html>
  )
}
