import Link from 'next/link'
import { CONTACT_EMAIL, APP_NAME } from '@/lib/brand'

export default function ContactPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="prose prose-invert max-w-2xl w-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
        <h1 className="mb-6">Contact GTM LABS</h1>

        <p>
          We work with marketing and revenue teams to turn long-form content into full-funnel campaigns. If you have a project in mind or need
          a quick audit of your webinar library, reach out and we will respond within one business day.
        </p>

        <h2>Email</h2>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-400 hover:text-blue-300">{CONTACT_EMAIL}</a>
        </p>

        <h2>What to include</h2>
        <ul>
          <li>Links to recent webinars, podcasts, or product demos you want repurposed.</li>
          <li>Any brand guidelines, tone-of-voice notes, or compliance requirements.</li>
          <li>Preferred turnaround timing and distribution channels.</li>
        </ul>

        <h2>Mailing Address</h2>
        <p>
          GTM LABS<br />
          548 Market St PMB 35956<br />
          San Francisco, CA 94104
        </p>

        <p className="text-sm text-slate-400">We do not accept walk-ins, but we are happy to schedule a video call once we review your request.</p>

        <p>
          <Link href="/" className="text-blue-400 hover:text-blue-300">Return home</Link>
        </p>
      </div>
    </main>
  )
}
