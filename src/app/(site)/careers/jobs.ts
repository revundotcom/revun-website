import { Code2, Layers, Users, Cpu, type LucideIcon } from 'lucide-react'

export interface Job {
  slug: string
  title: string
  location: string
  type: string
  summary: string
  requirements: string[]
  compensation: string
}

export const WHY_JOIN: { Icon: LucideIcon; title: string; body: string }[] = [
  { Icon: Code2, title: 'Remote-first engineering', body: 'Our engineering team is distributed across North America. We ship fast, review code thoroughly, and trust people to do great work without micromanagement.' },
  { Icon: Layers, title: 'Modern stack, real scale', body: 'Next.js, TypeScript, Postgres, Redis. Infrastructure that handles real property management volumes across thousands of units.' },
  { Icon: Users, title: 'Small team, high impact', body: 'Every engineer, designer, and PM owns a meaningful piece of the product. You are not a ticket-triager; you are a builder.' },
  { Icon: Cpu, title: 'AI-native product development', body: 'We are building AI features into the core of property management. If you want to work on applied AI in a production product, this is the team.' },
]

export const JOBS: Job[] = [
  {
    slug: 'senior-software-engineer',
    title: 'Senior Software Engineer',
    location: 'Remote, North America',
    type: 'Full-time',
    summary: 'You will build and own features across the Revun platform, from property listing infrastructure to tenant payment flows and owner reporting dashboards. You work closely with product and design, contribute to architectural decisions, and help establish engineering standards for the team.',
    requirements: ['5 or more years of full-stack engineering experience', 'Proficient in TypeScript, React, and Node.js or equivalent modern stack', 'Experience building and scaling production systems, not just prototypes', 'Strong communication: you write clear technical docs and code reviews'],
    compensation: '$140,000 to $180,000 USD base',
  },
  {
    slug: 'product-designer',
    title: 'Product Designer',
    location: 'Remote, North America',
    type: 'Full-time',
    summary: 'You will own design across the Revun product: landlord dashboards, tenant portals, leasing flows, and mobile experiences. You think in systems, build in Figma, and work closely with engineering to ship high-quality UI. Your standard is Stripe meets real estate software.',
    requirements: ['4 or more years of product design experience, SaaS preferred', 'Strong portfolio showing end-to-end design work, not just visual comps', 'Proficient in Figma, with experience building and maintaining design systems', 'Comfortable doing user research and translating insights into product decisions'],
    compensation: '$110,000 to $145,000 USD base',
  },
  {
    slug: 'customer-success-manager',
    title: 'Customer Success Manager',
    location: 'Toronto, ON or Remote',
    type: 'Full-time',
    summary: 'You will manage a book of Revun accounts: onboarding new property management companies, driving feature adoption, resolving issues, and ensuring customers achieve their desired outcomes. You are the primary relationship owner and an internal advocate for product improvements the customer base needs.',
    requirements: ['3 or more years of customer success or account management experience, SaaS preferred', 'Strong communicator who can translate technical concepts for non-technical customers', 'Experience with property management or real estate software is a real advantage', 'Data-driven: you track and report on your accounts with discipline'],
    compensation: '$75,000 to $100,000 USD base plus variable',
  },
  {
    slug: 'solutions-architect',
    title: 'Solutions Architect',
    location: 'Remote, North America',
    type: 'Full-time',
    summary: 'You will lead complex technical integrations and enterprise implementations for Revun. That means scoping integration work, designing data migration approaches, building custom API workflows for large customers, and working closely with engineering and sales to close and onboard enterprise accounts.',
    requirements: ['5 or more years of solutions architecture, technical consulting, or integration engineering experience', 'Proficient with REST APIs, webhooks, and integration patterns', 'Experience with property management software or real estate tech is a strong advantage', 'Ability to communicate technical architecture to both engineering teams and non-technical executives'],
    compensation: '$130,000 to $170,000 USD base',
  },
  {
    slug: 'sales-engineer',
    title: 'Sales Engineer',
    location: 'Toronto, ON or New York, NY',
    type: 'Full-time',
    summary: 'You will work with the sales team on technical evaluations, demos, and POCs for enterprise and mid-market prospects. You own the technical side of the sales process: answering integration questions, running product demonstrations, scoping implementation requirements, and building confidence in Revun before close.',
    requirements: ['3 or more years of sales engineering, pre-sales, or technical account management', 'Ability to demonstrate complex software products to a technical and non-technical audience', 'Comfortable with APIs, data models, and integration discussions at a detailed level', 'Property management software or proptech experience is a meaningful plus'],
    compensation: '$100,000 to $135,000 USD base plus commission',
  },
]

export const getJob = (slug: string) => JOBS.find((j) => j.slug === slug)
export const jobSlugs = () => JOBS.map((j) => ({ slug: j.slug }))
