import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, HelpCircle, BookOpen } from 'lucide-react'
import { buildCanonicalUrl, sanitizeJsonLd } from '@/lib/utils'
import { buildBreadcrumbSchema, buildFAQPageSchema, buildArticleSchema } from '@/lib/schema-builders'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'
import { blogPosts, blogSlugs } from '@/data/blog-posts'

export function generateStaticParams() {
  return blogSlugs.map((slug) => ({ slug }))
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts[slug]
  if (!post) return { title: 'Article Not Found | Revun' }
  const url = buildCanonicalUrl(`/resources/${post.slug}`)
  return {
    title: post.metaTitle,
    description: post.description,
    alternates: { canonical: url },
    openGraph: { title: post.metaTitle, description: post.description, url, type: 'article' },
  }
}

export default async function ResourcePost({ params }: Props) {
  const { slug } = await params
  const post = blogPosts[slug]
  if (!post) notFound()

  const pageUrl = `https://revun.com/resources/${post.slug}/`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildBreadcrumbSchema([
              { name: 'Home', url: 'https://revun.com/' },
              { name: 'Resources', url: 'https://revun.com/resources/' },
              { name: post.title, url: pageUrl },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildArticleSchema({
              headline: post.title,
              description: post.description,
              datePublished: post.datePublished,
              dateModified: post.dateModified,
              url: pageUrl,
              category: post.category,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: sanitizeJsonLd(
            buildFAQPageSchema(post.faqs.map((f) => ({ question: f.q, answer: f.a })))
          ),
        }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-[#F5F6F8]">
        <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
          <p className="mb-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <BookOpen className="h-4 w-4" />
            {post.category}
          </p>
          <h1 className="font-display font-extrabold text-3xl text-[#0A1628] md:text-5xl">{post.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-[#555860]">{post.intro}</p>
          <p className="mt-6 text-sm text-[#94A3B8]">{post.readMinutes} min read</p>
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      <article className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          {post.sections.map((section) => (
            <RevealOnScroll key={section.h2} className="mb-12">
              <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite md:text-3xl">
                {section.h2}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="mt-5 text-base leading-relaxed text-[#475569]">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="mt-5 space-y-3">
                  {section.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                      <span className="text-base leading-relaxed text-[#334155]">{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </RevealOnScroll>
          ))}

          {/* Key takeaways */}
          <RevealOnScroll className="mt-4 rounded-2xl border border-brand-blue/30 bg-brand-blue/5 p-6 md:p-8">
            <h2 className="font-heading text-lg font-bold text-brand-graphite">Key takeaways</h2>
            <ul className="mt-4 space-y-3">
              {post.keyTakeaways.map((k) => (
                <li key={k} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <span className="text-base leading-relaxed text-[#334155]">{k}</span>
                </li>
              ))}
            </ul>
          </RevealOnScroll>
        </div>
      </article>

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="bg-brand-off-white py-12 md:py-20">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-blue">
            <HelpCircle className="h-4 w-4" />
            FAQ
          </p>
          <h2 className="font-heading text-2xl font-bold tracking-tight text-brand-graphite md:text-3xl">
            Common questions
          </h2>
          <div className="mt-8 space-y-4">
            {post.faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-white p-6">
                <h3 className="mb-2 font-heading text-base font-bold text-brand-graphite">{f.q}</h3>
                <p className="text-sm leading-relaxed text-[#475569]">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related ──────────────────────────────────────────────────────── */}
      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <h2 className="font-heading text-lg font-bold text-brand-graphite">Keep reading</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {post.related.map((r) => (
              <Link
                key={r.href}
                href={r.href}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-brand-off-white px-5 py-3 text-sm font-semibold text-brand-graphite transition-colors hover:border-brand-blue/40"
              >
                {r.label}
                <ArrowRight className="h-4 w-4 text-brand-blue" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="bg-brand-blue py-14 md:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center md:px-6 lg:px-8">
          <h2 className="font-heading text-2xl font-bold tracking-tight text-white md:text-4xl">
            Run your whole property business on one platform
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-white/80">
            Leasing, payments, maintenance, communications, and accounting across the US and Canada.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/demo/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-8 text-base font-semibold text-brand-blue transition-colors hover:bg-white/90"
            >
              Book a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/pricing/"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/40 px-8 text-base font-semibold text-white"
            >
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
