import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Service Level Agreement | GTM LABS',
  description: 'Our service level commitments, turnaround times, and service credit policy for webinar repurposing services.',
};

export default function SLAPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Service Level Agreement</h1>
          <p className="text-slate-400 text-lg">
            Last updated: October 7, 2025
          </p>
        </div>

        <div className="space-y-8 text-slate-300 leading-relaxed">
          {/* Introduction */}
          <section>
            <p>
              This Service Level Agreement ("SLA") describes the service level commitments GTM LABS makes to clients using our webinar repurposing services. This SLA is part of your service agreement with us.
            </p>
          </section>

          {/* Definitions */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">1. Definitions</h2>
            <div className="space-y-3">
              <p>
                <span className="font-medium text-slate-200">"Response"</span> means human acknowledgment of your request with the next step and the person responsible. A response is not the final delivery or resolution.
              </p>
              <p>
                <span className="font-medium text-slate-200">"Resolution"</span> means delivery of the completed asset or agreement on the next draft milestone.
              </p>
              <p>
                <span className="font-medium text-slate-200">"Business Hours"</span> means Monday through Friday, 9:00 AM to 6:00 PM Pacific Time, excluding U.S. federal holidays.
              </p>
              <p>
                <span className="font-medium text-slate-200">"Source Content"</span> means the webinar recording, transcript, or other video content you provide for repurposing.
              </p>
              <p>
                <span className="font-medium text-slate-200">"Core Assets"</span> means the standard deliverables in your plan: video clips, social posts, blog posts, lead magnets, and newsletters.
              </p>
            </div>
          </section>

          {/* Response Times */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">2. Response Times</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">First Draft</h3>
                <p>
                  We will deliver your first draft within <span className="font-medium text-white">48 hours</span> of receiving:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Your source content link (or upload confirmation)</li>
                  <li>Your completed brief (target audience, key messages, any brand assets)</li>
                </ul>
                <p className="text-sm text-slate-400 mt-2">
                  The 48-hour clock starts at the beginning of the next business hour after we receive both items.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Revisions</h3>
                <p>
                  Once you submit revision requests, we will deliver the updated draft within <span className="font-medium text-white">72 hours</span> during Business Hours.
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  Revision cycles run Monday–Friday. Requests submitted Friday after 3:00 PM PT or on weekends begin the following Monday.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Urgent Questions</h3>
                <p>
                  For time-sensitive questions outside of asset delivery, we commit to a <span className="font-medium text-white">24-hour response</span> during Business Hours.
                </p>
              </div>
            </div>
          </section>

          {/* Scope and Fair Use */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">3. Scope and Fair Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Free Sample Audits</h3>
                <p>
                  Free audits include processing of <span className="font-medium text-white">up to 1 source video</span> with a maximum duration of <span className="font-medium text-white">60 minutes</span> per audit request.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Paid Plans (Founding Partners)</h3>
                <p>
                  Standard monthly plans include processing of <span className="font-medium text-white">up to 2 webinars per month</span> with a combined maximum duration of <span className="font-medium text-white">120 minutes</span> of source content.
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  Example: Two 60-minute webinars, or one 90-minute and one 30-minute webinar.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Content Beyond Fair Use</h3>
                <p>
                  If you have longer source videos or need to process additional webinars:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Split footage across multiple months (with advance notice)</li>
                  <li>Purchase the "Extra Source Hours" add-on</li>
                  <li>Discuss custom pricing with your account manager</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Asset Quantity</h3>
                <p>
                  The "30+ assets" mentioned in marketing refers to the typical output from processing 2 webinars per month within the 120-minute fair-use limit. This includes:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>15 short-form video clips</li>
                  <li>20 social media posts (LinkedIn, Twitter/X, etc.)</li>
                  <li>1 long-form blog post per webinar (2 per month)</li>
                  <li>1 lead magnet per webinar (2 per month)</li>
                  <li>1 email newsletter per webinar (2 per month)</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Service Credits */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">4. Service Credits</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">When Credits Apply</h3>
                <p>
                  If we miss a stated turnaround time (first draft, revision, or urgent response) for reasons <span className="font-medium text-white">within our control</span>, we will issue a service credit on your next invoice.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Credit Calculation</h3>
                <p>
                  Service credits are calculated proportionally based on the delay:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-2">
                  <li>
                    <span className="font-medium text-slate-200">1-24 hour delay:</span> 5% credit of monthly subscription
                  </li>
                  <li>
                    <span className="font-medium text-slate-200">25-48 hour delay:</span> 10% credit of monthly subscription
                  </li>
                  <li>
                    <span className="font-medium text-slate-200">49-72 hour delay:</span> 20% credit of monthly subscription
                  </li>
                  <li>
                    <span className="font-medium text-slate-200">73+ hour delay:</span> 30% credit of monthly subscription
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Exclusions</h3>
                <p>
                  Service credits do not apply when delays result from:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Incomplete or missing source materials from client</li>
                  <li>Client delays in providing revision feedback or approvals</li>
                  <li>Requests that exceed fair-use scope without prior arrangement</li>
                  <li>Force majeure events (natural disasters, internet outages, etc.)</li>
                  <li>U.S. federal holidays</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Sole Remedy</h3>
                <p className="font-medium text-slate-200">
                  Service credits are the sole and exclusive remedy for SLA misses.
                </p>
                <p className="text-sm text-slate-400 mt-2">
                  Credits cannot be exchanged for cash, only applied to future invoices. Credits expire after 6 months if unused.
                </p>
              </div>
            </div>
          </section>

          {/* Clock Management */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">5. When Clocks Run</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Business Hours</h3>
                <p>
                  SLA clocks run only during <span className="font-medium text-white">Business Hours</span>: Monday–Friday, 9:00 AM to 6:00 PM Pacific Time.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Clock Start Times</h3>
                <ul className="list-disc list-inside ml-4 space-y-2">
                  <li>Submissions during business hours: Clock starts immediately</li>
                  <li>Submissions before 9:00 AM PT: Clock starts at 9:00 AM</li>
                  <li>Submissions after 6:00 PM PT: Clock starts at 9:00 AM next business day</li>
                  <li>Weekend submissions: Clock starts at 9:00 AM Monday</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Holidays</h3>
                <p>
                  The SLA clock pauses on U.S. federal holidays. We will notify you of observed holidays in advance via the client portal.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Clock Pauses</h3>
                <p>
                  Clocks pause when:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>We're waiting for client input, approvals, or assets</li>
                  <li>Client requests a pause via the portal or email</li>
                  <li>Technical issues prevent us from accessing your source materials</li>
                </ul>
                <p className="text-sm text-slate-400 mt-2">
                  We will notify you via the portal when clocks are paused and when they resume.
                </p>
              </div>
            </div>
          </section>

          {/* Communication Channels */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">6. Communication Channels</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Tracked Channels</h3>
                <p>
                  For SLA purposes, "response" and "resolution" clocks apply only to communication through these official channels:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Client portal comments and notifications</li>
                  <li>The original request thread you initiated</li>
                  <li>Email to <a href="mailto:jovanny@gtmlabs.io" className="text-blue-400 hover:text-blue-300 underline">jovanny@gtmlabs.io</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Non-Tracked Channels</h3>
                <p>
                  Messages sent via Slack, LinkedIn DM, text message, or other informal channels do not start or stop SLA clocks. We will acknowledge these messages and route them to the appropriate tracked channel.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Portal as Primary Channel</h3>
                <p>
                  We strongly encourage using the client portal for all requests and feedback. The portal:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Automatically timestamps all communications</li>
                  <li>Keeps assets, feedback, and history in one place</li>
                  <li>Sends you notifications at key milestones</li>
                  <li>Provides transparency on SLA clock status</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Reporting and Monitoring */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">7. Reporting and Monitoring</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Monthly SLA Report</h3>
                <p>
                  At the end of each month, we provide an SLA compliance report showing:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Average first draft turnaround time</li>
                  <li>Average revision turnaround time</li>
                  <li>Number of deliveries on-time vs. delayed</li>
                  <li>Any service credits issued</li>
                </ul>
                <p className="text-sm text-slate-400 mt-2">
                  Reports are available in your portal dashboard and sent via email.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-2">Real-Time Clock Visibility</h3>
                <p>
                  You can view SLA clock status for active requests at any time in your client portal. Each request shows:
                </p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Current stage (draft, revision, completed)</li>
                  <li>Hours elapsed / hours remaining</li>
                  <li>Whether the clock is running or paused</li>
                  <li>Estimated delivery time</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Changes to SLA */}
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">8. Changes to This SLA</h2>
            <p>
              We may update this SLA from time to time. When we make material changes, we will:
            </p>
            <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
              <li>Post the updated SLA on this page with a new "Last updated" date</li>
              <li>Notify you via email and the client portal</li>
              <li>Give you 30 days' notice before changes take effect</li>
            </ul>
            <p className="mt-4 text-sm text-slate-400">
              If you object to the changes, you may terminate your subscription before the effective date. Continued use after the effective date constitutes acceptance of the updated SLA.
            </p>
          </section>

          {/* Contact */}
          <section className="pt-8 border-t border-slate-800">
            <h2 className="text-2xl font-semibold text-white mb-4">Questions?</h2>
            <p>
              If you have questions about this SLA or need to discuss custom service levels, please contact us:
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <span className="font-medium text-slate-200">Email:</span>{' '}
                <a href="mailto:jovanny@gtmlabs.io" className="text-blue-400 hover:text-blue-300 underline">
                  jovanny@gtmlabs.io
                </a>
              </li>
              <li>
                <span className="font-medium text-slate-200">Portal:</span>{' '}
                <a href="https://account.gtmlabs.io" className="text-blue-400 hover:text-blue-300 underline">
                  account.gtmlabs.io
                </a>
              </li>
            </ul>
          </section>
        </div>

        {/* Back to Pricing Link */}
        <div className="mt-12 pt-8 border-t border-slate-800">
          <a 
            href="/pricing" 
            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Pricing
          </a>
        </div>
      </div>
    </div>
  );
}
