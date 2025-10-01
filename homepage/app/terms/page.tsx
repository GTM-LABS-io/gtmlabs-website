import Link from 'next/link'
import { APP_NAME, CONTACT_EMAIL } from '@/lib/brand'

export default function TermsPage() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center px-6 py-20">
      <div className="prose prose-invert max-w-3xl w-full rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-md">
        <h1 className="mb-6">Terms &amp; Conditions</h1>

        <p className="text-sm text-slate-400">Last updated: {new Date().toLocaleDateString()}</p>

        <p>
          These Terms &amp; Conditions ("Terms") govern your access to and use of the services offered by <strong>{APP_NAME}</strong>
          ("we", "us", "our"). By commissioning a project, subscribing to a package, or using our website, you agree to these Terms.
        </p>

        <h2>1. Services</h2>
        <p>
          We provide marketing content repurposing, copywriting, and strategy services for technology and B2B organizations.
          Specific deliverables, timelines, and pricing are outlined in the statement of work, order form, or plan you select.
        </p>

        <h2>2. Client Responsibilities</h2>
        <ul>
          <li>Provide timely access to webinar recordings, source files, branding assets, and subject-matter experts when requested.</li>
          <li>Confirm the accuracy of supplied materials and ensure you have rights to share them with us.</li>
          <li>Review deliverables promptly and communicate feedback within the agreed revision window.</li>
        </ul>

        <h2>3. Intellectual Property</h2>
        <p>
          You retain ownership of your pre-existing materials. Upon full payment, we assign to you the rights to final deliverables
          produced specifically for your project, excluding any underlying tools, frameworks, or templates we use to produce them.
        </p>

        <h2>4. Payment &amp; Renewals</h2>
        <ul>
          <li>Fees are due upfront unless otherwise stated. Recurring plans renew automatically unless canceled before the renewal date.</li>
          <li>Late payments may pause work until the balance is cleared.</li>
          <li>All fees are non-refundable once work has begun for the billing cycle.</li>
        </ul>

        <h2>5. Confidentiality</h2>
        <p>
          We treat your materials as confidential and use them only to deliver the agreed services. We may showcase work in our portfolio
          with your prior written consent. Both parties agree to protect non-public information shared during the engagement.
        </p>

        <h2>6. Non-Solicitation</h2>
        <p>
          During the engagement and for 12 months afterward, neither party will solicit or hire the other party’s employees or contractors
          without prior written consent.
        </p>

        <h2>7. Warranty Disclaimer</h2>
        <p>
          Services are provided "as is". We do not guarantee specific business outcomes, search rankings, or platform approvals. You are
          responsible for reviewing content for accuracy, compliance, and regulatory requirements prior to publication.
        </p>

        <h2>8. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, our liability for claims arising out of these Terms is limited to the fees paid to us in the
          three months preceding the claim. We are not liable for indirect, incidental, or consequential damages.
        </p>

        <h2>9. Termination</h2>
        <p>
          Either party may terminate for convenience with written notice. We may terminate immediately if you breach these Terms or fail to pay.
          Sections relating to confidentiality, intellectual property, payment, and liability survive termination.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the State of California, without regard to conflict-of-law principles. Disputes will be resolved
          in the state or federal courts located in San Francisco County, California.
        </p>

        <h2>11. Updates</h2>
        <p>
          We may update these Terms to reflect operational, legal, or pricing changes. Continued use of our services after an update signals
          acceptance of the revised Terms.
        </p>

        <h2>12. Contact</h2>
        <p>
          Questions about these Terms can be directed to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <p>
          <Link href="/" className="text-blue-400 hover:text-blue-300">Return home</Link>
        </p>
      </div>
    </main>
  )
}
