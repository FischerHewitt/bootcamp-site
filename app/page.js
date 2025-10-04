import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center bg-gray-50 p-8">
      <div className="max-w-xl text-center space-y-6">
        <h1 className="text-4xl font-bold">Bootcamp Site</h1>
        <p className="text-gray-600">
          You’re live on Vercel and connected to Supabase.
        </p>
        <Link
          href="/check"
          className="inline-block px-5 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          Go to Supabase Check
        </Link>
      </div>
    </main>
  )
}