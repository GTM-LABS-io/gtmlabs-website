import Link from 'next/link'

export default function TermsPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="prose prose-invert max-w-2xl w-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
        <h1>Terms</h1>
        <p>This is a lightweight placeholder for QA. Replace with your real Terms content.</p>
        <p>
          <Link href="/" className="text-blue-400 hover:text-blue-300">Return home</Link>
        </p>
      </div>
    </main>
  )
}
