import Link from 'next/link'

export default function LoginPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-md w-full rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-md">
        <h1 className="text-2xl font-semibold mb-2">Login</h1>
        <p className="text-slate-400 mb-6 text-sm">This is a placeholder page for QA. Replace with your real auth flow.</p>
        <div className="flex items-center justify-center gap-3">
          <Link href="/" className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-500 transition-colors">Go Home</Link>
          <Link href="/#pricing" className="px-4 py-2 rounded-md border border-white/10 hover:bg-white/5 transition-colors">See Pricing</Link>
        </div>
      </div>
    </main>
  )
}
