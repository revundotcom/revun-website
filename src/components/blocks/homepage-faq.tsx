const faqs = [
  {
    question: 'What is Revun?',
    answer:
      'Revun is the operating system for property operations: an infrastructure layer that unifies leasing, payments, maintenance, compliance, communications, accounting, and reporting into one system. It replaces disconnected tools with a single platform built for Canada and the United States.',
  },
  {
    question: 'Who is Revun built for?',
    answer:
      'Revun serves self-managing property owners, property management companies, brokerages, leasing teams, maintenance companies, REITs, and tenants. Whether you manage one unit or an entire national portfolio, the platform gives every role, including internal ops teams, the exact workflows and visibility they need.',
  },
  {
    question: 'How much does Revun cost?',
    answer:
      'Revun is free for self-managing owners with 1-2 units. The Operator plan starts at $29/unit/month, Brokerage & Leasing at $49/unit/month, and Enterprise & REIT pricing is custom. All paid plans include a 14-day free trial with no credit card required.',
  },
  {
    question: 'Is Revun available in my province or state?',
    answer:
      'Revun operates across all 13 Canadian provinces and territories plus all 50 US states and DC, with jurisdiction-specific compliance built in from day one.',
  },
  {
    question: 'What integrations does Revun support?',
    answer:
      'Revun integrates with 40+ tools including Stripe, QuickBooks, Xero, DocuSign, Twilio, Salesforce, HubSpot, Zapier, Google Workspace, Microsoft 365, Plaid, and Interac.',
  },
  {
    question: 'How do I get started?',
    answer:
      'See the full platform at revun.com/platform, or book a live demo to walk through it with our team. You can also sign up for a free account, no credit card required, and start managing properties immediately.',
  },
]

export function HomepageFaq() {
  return (
    <section className="bg-brand-off-white py-12 md:py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-12">
          <p className="text-sm font-heading font-semibold uppercase tracking-wider text-brand-blue">
            FAQ
          </p>
          <h2 className="mt-3 font-heading text-3xl md:text-4xl font-bold text-brand-graphite">
            Frequently asked <span className="text-keyword">questions</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group rounded-xl border border-[#E5E7EB] bg-white transition-all duration-200 hover:shadow-card-hover"
            >
              <summary className="flex cursor-pointer items-center justify-between px-6 py-5 list-none [&::-webkit-details-marker]:hidden">
                <span className="font-heading font-semibold text-brand-graphite text-[15px] pr-4">
                  {faq.question}
                </span>
                <svg
                  className="h-5 w-5 shrink-0 text-[#94A3B8] transition-transform duration-200 group-open:rotate-45"
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="10" y1="4" x2="10" y2="16" />
                  <line x1="4" y1="10" x2="16" y2="10" />
                </svg>
              </summary>
              <div className="px-6 pb-5 -mt-1">
                <p className="text-[#555860] text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
