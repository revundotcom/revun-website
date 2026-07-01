import { sanitizeJsonLd } from '@/lib/utils'

interface JsonLdProps {
  /** Single schema object or array of schemas to combine into @graph */
  data: Record<string, unknown> | Record<string, unknown>[]
}

export function JsonLd({ data }: JsonLdProps) {
  const schema = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data.map((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { '@context': _, ...rest } = item
        return rest
      }) }
    : data

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(schema) }}
    />
  )
}
