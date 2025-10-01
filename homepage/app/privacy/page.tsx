import Link from 'next/link'
import { APP_NAME, CONTACT_EMAIL } from '@/lib/brand'

export default function PrivacyPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="prose prose-invert max-w-3xl w-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
        <h1 className="mb-6">Privacy Policy</h1>

        <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>

        <p>
          This Privacy Policy explains how <strong>{APP_NAME}</strong> ("we", "us", "our") collects, uses, and protects
          information when you visit our website, share webinar recordings, or work with us on marketing deliverables.
        </p>

        <h2>1. Information We Collect</h2>
        <p>We collect the following categories of data as part of delivering our services:</p>
        <ul>
          <li><strong>Account &amp; Contact Information:</strong> Names, email addresses, job titles, and company details you provide.</li>
          <li><strong>Content Inputs:</strong> Webinar recordings, transcripts, creative briefs, brand assets, and notes you supply.</li>
          <li><strong>Usage Data:</strong> Basic analytics (pages visited, device/browser data, referral sources) captured through privacy-focused tooling.</li>
          <li><strong>Communications:</strong> Emails, support tickets, and meeting notes related to your projects.</li>
        </ul>

        <h2>2. How We Use Information</h2>
        <p>Your information is processed to:</p>
        <ul>
          <li>Deliver contracted content repurposing, copywriting, and strategy services.</li>
          <li>Personalize deliverables to your brand tone, compliance requirements, and priorities.</li>
          <li>Operate and improve internal workflows, QA, and customer success operations.</li>
          <li>Send operational updates, invoices, and client communications.</li>
        </ul>

        <h2>3. Legal Basis &amp; Sharing</h2>
        <p>
          We process data based on legitimate interest in providing professional services, and as required to fulfill our agreements with you.
          We do <strong>not</strong> sell personal information. Limited third-party sharing may occur with:
        </p>
        <ul>
          <li>Trusted subcontractors or contractors under NDA assisting with editing, design, or QA.</li>
          <li>Infrastructure providers (hosting, storage, analytics) operating under data processing agreements.</li>
          <li>Regulators or authorities when required by law.</li>
        </ul>

        <h2>4. Data Retention</h2>
        <p>
          Project files and assets are retained for the duration of our engagement and up to 12 months afterward to support revisions and
          portfolio analysis, unless you request earlier deletion. Invoice and tax records are stored according to applicable regulations.
        </p>

        <h2>5. Security</h2>
        <p>
          We use encrypted storage, access controls, and least-privilege permissions to safeguard your content. Team members and contractors
          receive training on handling sensitive customer material. Despite these safeguards, no system is entirely immune to risk.
        </p>

        <h2>6. International Transfers</h2>
        <p>
          GTM LABS operates from the United States and may collaborate with team members in other regions. Cross-border data transfers
          are protected by contractual safeguards and best-practice security reviews.
        </p>

        <h2>7. Your Choices</h2>
        <p>You may request to access, correct, export, or delete personal information by emailing <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>

        <h2>8. Updates</h2>
        <p>
          We may update this Privacy Policy to reflect operational, legal, or regulatory changes. We will post the updated policy date above and
          will notify ongoing clients of material updates.
        </p>

        <h2>9. Contact</h2>
        <p>
          Questions or requests can be sent to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We aim to reply within two business days.
        </p>

        <p>
          <Link href="/" className="text-blue-400 hover:text-blue-300">Return home</Link>
        </p>
      </div>
    </main>
  )
}
