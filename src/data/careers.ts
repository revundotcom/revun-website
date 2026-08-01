/**
 * ═══════════════════════════════════════════════════════════════════
 *  MoveSmart Rentals — Careers / Open Roles
 * ═══════════════════════════════════════════════════════════════════
 *
 *  Single source of truth for the open roles that appear on:
 *    •  /careers/                — listing page, grouped by region/city
 *    •  /careers/<slug>/         — individual role detail page
 *
 *  ─────────────────────────────────────────────────────────────────────
 *  How to add / remove / edit a role
 *  ─────────────────────────────────────────────────────────────────────
 *
 *  1. ADD A NEW ROLE
 *     Copy any existing entry below (everything from `{` to `},`) and
 *     paste it at the end of the ROLES array. Update the values inside
 *     the quotes. IMPORTANT: every role needs a unique `slug`
 *     (lowercase + dashes only, no spaces). That becomes the URL.
 *
 *  2. REMOVE A ROLE (closed / filled)
 *     Delete the entire `{ ... },` block. Its card disappears from
 *     /careers/ and its detail URL returns 404 on the next deploy.
 *
 *  3. EDIT A ROLE
 *     Change the values inside the quotes. Don't change the field
 *     names on the left of the colon: those are wired into the page.
 *
 *  4. JOB ID + POSTING DATE
 *     `jobId` should follow the pattern MSR-YYYY-NNN. `postingStartDate`
 *     is a YYYY-MM-DD string.
 *
 *  After editing, save → commit → push. Vercel redeploys in ~2 min.
 * ═══════════════════════════════════════════════════════════════════
 */

export interface Role {
  /** Unique URL identifier (lowercase + dashes, no spaces). */
  slug: string
  /** Display title, e.g. "Senior Leasing Agent". */
  title: string
  /** Free-form department / team label shown under the title in the hero. */
  department: string
  /** Employment type. "Full-time" | "Part-time" | "Contract" | "Internship" */
  type: string
  /** City the role is based in. Use "Remote" for fully remote roles. */
  city: string
  /** Province (Canada) or state (US). */
  province: string
  /** Country. */
  country: string
  /** Display location string used in the hero. */
  locationDisplay: string
  /** Job opening ID. */
  jobId: string
  /** Location ID from Zoho. */
  locId?: string
  /** ISO date — YYYY-MM-DD. Shown in the hero. */
  postingStartDate: string
  /** Display string — e.g. "$55,000 to $75,000 base". */
  compensation: string
  /** Job description summary — short paragraph in the body. */
  summary: string
  /** Bullet list — Key Responsibilities section. */
  responsibilities: string[]
  /** Bullet list — Required Skills section. */
  requiredSkills: string[]
  /** Bullet list — Good to have Skills (optional). */
  goodToHaveSkills: string[]
  /** Bullet list — Education and Experience. */
  educationAndExperience: string[]
  /** Free-form short paragraph — Additional Information block. */
  additionalInfo: string | null
  /** Whether relocation assistance is provided. */
  relocationAssistance: boolean
  /** HTML description from API. */
  htmlDescription?: string
  /** The specific work type to determine which application form to show. */
  workType: 'remote' | 'hybrid'
  /** Job Category for filtering. */
  category: string
  /** Parsed array of categories. */
  categories: string[]
}

export function parseCategories(raw: any): string[] {
  if (!raw) return ['Other']
  if (Array.isArray(raw)) {
    const cleaned = raw.map((s) => String(s).trim()).filter(Boolean)
    return cleaned.length > 0 ? cleaned : ['Other']
  }
  if (typeof raw === 'string') {
    let str = raw.trim()
    if (!str) return ['Other']
    if (str.startsWith('[') && str.endsWith(']')) {
      try {
        const parsed = JSON.parse(str)
        if (Array.isArray(parsed)) {
          const cleaned = parsed.map((s) => String(s).trim()).filter(Boolean)
          if (cleaned.length > 0) return cleaned
        }
      } catch {
        // Fallthrough if invalid JSON
      }
    }
    const split = str.split(',').map((s) => s.trim()).filter(Boolean)
    if (split.length > 0) return split
  }
  return ['Other']
}

interface ApiJob {
  Job_Description?: string
  Pay_Disclosure?: string
  Salary?: string
  Work_Type?: string | null
  City?: string
  State?: string
  Country?: string
  slug: string
  Posting_Title?: string
  Industry?: string
  Job_Type?: string
  zoho_id?: string
  location_id?: string
  Date_Opened?: string
  Role_Category?: string
}

export async function fetchRolesFromApi(): Promise<Role[]> {
  const baseUrl = process.env.NEXT_PUBLIC_PORTAL_BASE_URL || 'https://phpstack-1217932-6516253.cloudwaysapps.com'
  const url = `${baseUrl}/api/v1/job-postings?client_name=Revun`
  try {
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) {
      console.error('Failed to fetch roles', res.status)
      return []
    }
    const json = await res.json()
    const apiJobs = json.data || []
    return apiJobs.map((job: ApiJob) => {
      let rawHtml = job.Job_Description || ''

      // Selectively strip font-size, font-family, and colors to preserve other formatting (like bold/headings)
      const styleStripRegex = /(font-family|font-size|color|background-color|background|line-height)\s*:[^;]+;?/gi

      const cleanStyles = (html: string) => {
        let cleanedHtml = html.replace(/style="([^"]*)"/gi, (match, styles) => {
          const cleaned = styles.replace(styleStripRegex, '').trim()
          return cleaned ? `style="${cleaned}"` : ''
        })
        cleanedHtml = cleanedHtml.replace(/style='([^']*)'/gi, (match, styles) => {
          const cleaned = styles.replace(styleStripRegex, '').trim()
          return cleaned ? `style='${cleaned}'` : ''
        })
        return cleanedHtml
      }

      rawHtml = cleanStyles(rawHtml)

      // Strip <font> and <span> tags but keep the content inside them
      rawHtml = rawHtml.replace(/<\/?(font|span)[^>]*>/gi, '')

      // Clean up messy Zoho HTML artifacts (non-breaking spaces, empty trailing br tags)
      rawHtml = rawHtml.replace(/&nbsp;/gi, ' ')
      rawHtml = rawHtml.replace(/<br\s*\/?>\s*(?=<\/div>|<\/p>)/gi, '')

      // Convert double breaks into clean paragraph splits
      rawHtml = rawHtml.replace(/(?:<br\s*\/?>\s*){2,}/gi, '</p><p>')

      // Strip any paragraph or div whose text content is empty / whitespace
      rawHtml = rawHtml.replace(/<(p|div)[^>]*>(.*?)(?:<\/p>|<\/div>)/gi, (fullMatch, tag, inner) => {
        const text = inner.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim()
        if (text.length === 0) {
          return ''
        }
        return fullMatch
      })

      const isHeadingText = (text: string) => {
        let trimmed = text.replace(/&nbsp;/g, ' ').trim()
        if (trimmed.endsWith(':')) {
          trimmed = trimmed.slice(0, -1).trim()
        }
        if (trimmed.length < 2 || trimmed.length > 85) return false
        if (trimmed.endsWith('.')) return false
        if (/^[-•*\d]/i.test(trimmed)) return false
        if (/\d+\s*(gb|mbps|ram|years)/i.test(trimmed)) return false
        if (/^(est|hours|pay|location|salary|base salary|performance bonus|total compensation|job type|work type|note|ref|id)\b/i.test(trimmed)) return false
        return true
      }

      // 1. Convert standalone bold section titles to <h3>
      rawHtml = rawHtml.replace(/(?:<(div|p)[^>]*>)?\s*(?:<b>|<strong>)\s*([^<]{2,85}?)\s*(?:<\/b>|<\/strong>)\s*(?:<\/(?:div|p)>)?/gi, (match, tag, headingText) => {
        const cleanHeading = headingText.replace(/&nbsp;/g, ' ').trim()
        if (isHeadingText(cleanHeading)) {
          return `\n<h3>${cleanHeading.replace(/:$/, '')}</h3>\n`
        }
        return match
      })

      // 2. Strip empty paragraphs, divs, and breaks directly following <h3> or </h2>
      rawHtml = rawHtml.replace(/(<\/h[1-6]>\s*)(?:<(p|div)[^>]*>\s*(?:&nbsp;|\s)*<\/\2>|<br\s*\/?>|\s)+/gi, '$1')

      // 3. Format plain text lists (- item or • item) into HTML <ul><li> ONLY if non-HTML list
      if (!rawHtml.includes('<li')) {
        rawHtml = rawHtml.replace(/(?:<div[^>]*>|<p[^>]*>|<br\s*\/?>|\n|^)\s*[-•*]\s*(.*?)\s*(?:<\/div>|<\/p>|<br\s*\/?>|\n|$)/gi, '\n<li>$1</li>\n')
        rawHtml = rawHtml.replace(/(?:\n*<li>.*?<\/li>\n*)+/g, (match) => `\n<ul>${match}</ul>\n`)
      }

      const hidePay =
        job.Pay_Disclosure === 'Do not disclose pay' ||
        job.Salary === 'Do not disclose pay'
      let compensation = hidePay ? '' : job.Salary || ''
      if (compensation && /\d/.test(compensation)) {
        //compensation = compensation.replace(/\$/g, '').trim()

        // Add commas to numbers 1000 and above
        compensation = compensation.replace(/\d{4,}/g, (match) => {
          return Number(match).toLocaleString('en-US')
        })

        compensation = `${compensation}`
      }

      const isRemote = job.Job_Type == null || String(job.Job_Type).toLowerCase() === 'hybrid' || String(job.Job_Type).toLowerCase() === 'remote'
      const workTypeSuffix = isRemote ? 'Remote' : 'Hybrid'

      const locParts = []
      if (job.City) locParts.push(job.City)
      if (job.State) locParts.push(job.State)
      if (job.Country) locParts.push(job.Country)

      const locationDisplay = locParts.length > 0
        ? `${locParts.join(', ')} · ${workTypeSuffix}`
        : workTypeSuffix

      const parsedCats = parseCategories(job.Role_Category || job.Industry)

      return {
        slug: job.slug,
        title: job.Posting_Title || 'Untitled Role',
        department: job.Industry || 'Careers',
        type: job.Work_Type || job.Job_Type || 'Full time',
        city: job.City || '',
        province: job.State || '',
        country: job.Country || '',
        locationDisplay,
        jobId: job.zoho_id || '',
        locId: job.location_id || '',
        postingStartDate: job.Date_Opened ? job.Date_Opened.split('T')[0] : '',
        compensation,
        summary: '',
        responsibilities: [],
        requiredSkills: [],
        goodToHaveSkills: [],
        educationAndExperience: [],
        additionalInfo: null,
        relocationAssistance: false,
        htmlDescription: rawHtml,
        workType: isRemote ? 'remote' : 'hybrid',
        categories: parsedCats,
        category: parsedCats.join(', '),
      }
    })
  } catch (error) {
    console.error('Failed to fetch roles from API', error)
    return []
  }
}

/** Find a role by slug. Returns undefined if not found. */
export async function getRoleBySlug(slug: string): Promise<Role | undefined> {
  const roles = await fetchRolesFromApi()
  return roles.find((r) => r.slug === slug)
}

/** All slugs — used by generateStaticParams on the dynamic route. */
export async function getAllRoleSlugs(): Promise<string[]> {
  const roles = await fetchRolesFromApi()
  return roles.map((r) => r.slug)
}

export interface CityGroup {
  city: string
  roles: Role[]
}

export interface RegionGroup {
  region: string
  cities: CityGroup[]
}

export interface CountryGroup {
  country: string
  regions: RegionGroup[]
}

export function groupRolesByCountry(roles: Role[]): CountryGroup[] {
  const countryOrder: string[] = []
  const countryMap = new Map<
    string,
    { regionOrder: string[]; regionMap: Map<string, { cityOrder: string[]; cityMap: Map<string, Role[]> }> }
  >()

  for (const role of roles) {
    const countryKey = role.country || 'Other'
    if (!countryMap.has(countryKey)) {
      countryOrder.push(countryKey)
      countryMap.set(countryKey, {
        regionOrder: [],
        regionMap: new Map(),
      })
    }
    const country = countryMap.get(countryKey)!

    const regionKey = role.province || 'Other'
    if (!country.regionMap.has(regionKey)) {
      country.regionOrder.push(regionKey)
      country.regionMap.set(regionKey, {
        cityOrder: [],
        cityMap: new Map(),
      })
    }
    const region = country.regionMap.get(regionKey)!

    const cityKey = role.city || 'Remote'
    if (!region.cityMap.has(cityKey)) {
      region.cityOrder.push(cityKey)
      region.cityMap.set(cityKey, [])
    }
    region.cityMap.get(cityKey)!.push(role)
  }

  // Sort countries alphabetically
  countryOrder.sort((a, b) => a.localeCompare(b))

  return countryOrder.map((countryKey) => {
    const country = countryMap.get(countryKey)!
    return {
      country: countryKey,
      regions: country.regionOrder.map((regionKey) => {
        const region = country.regionMap.get(regionKey)!
        return {
          region: regionKey,
          cities: region.cityOrder.map((cityKey) => ({
            city: cityKey,
            roles: region.cityMap.get(cityKey)!,
          })),
        }
      }),
    }
  })
}
