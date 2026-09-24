import { Country, State, City, type ICountry, type IState, type ICity } from 'country-state-city'

export interface ResolvedLocation {
  id: string
  type: 'city' | 'state'
  name: string
  boldText: string
  subtleText: string
  displayText: string
  city: string
  state: string
  province: string
  state_province: string
  country: string
  country_code: string
  residential_location: string
}

// Country name overrides for accurate, modern international naming
const COUNTRY_NAME_OVERRIDES: Record<string, string> = {
  MK: 'North Macedonia',
  US: 'United States',
  GB: 'United Kingdom',
  AE: 'United Arab Emirates',
  KR: 'South Korea',
  KP: 'North Korea',
  RU: 'Russia',
  VN: 'Vietnam',
  TW: 'Taiwan',
  CD: 'DR Congo',
  CG: 'Congo',
  PS: 'Palestine',
  VA: 'Vatican City',
  SY: 'Syria',
  LA: 'Laos',
  IR: 'Iran',
  BO: 'Bolivia',
  TZ: 'Tanzania',
  VE: 'Venezuela',
  MD: 'Moldova',
  BN: 'Brunei',
}

// Extra aliases to help matching countries
const COUNTRY_ALIASES: Record<string, string[]> = {
  MK: ['macedonia', 'north macedonia', 'fyrom'],
  US: ['usa', 'united states', 'united states of america', 'america'],
  GB: ['uk', 'united kingdom', 'great britain', 'england', 'scotland', 'wales'],
  AE: ['uae', 'emirates', 'united arab emirates'],
  KR: ['korea', 'south korea'],
  IN: ['india', 'bharat'],
  CA: ['canada'],
}

interface SearchIndex {
  countries: ICountry[]
  countryByCode: Map<string, string>
  states: IState[]
  stateByCodeAndCountry: Map<string, string>
  allCities: ICity[]
}

let cachedIndex: SearchIndex | null = null

function getSearchIndex(): SearchIndex {
  if (cachedIndex) return cachedIndex

  const countries = Country.getAllCountries()
  const countryByCode = new Map<string, string>()

  for (const c of countries) {
    const name = COUNTRY_NAME_OVERRIDES[c.isoCode] || c.name
    countryByCode.set(c.isoCode, name)
  }

  const states = State.getAllStates()
  const stateByCodeAndCountry = new Map<string, string>()

  for (const s of states) {
    stateByCodeAndCountry.set(`${s.countryCode}:${s.isoCode}`, s.name)
  }

  const allCities = City.getAllCities()

  cachedIndex = {
    countries,
    countryByCode,
    states,
    stateByCodeAndCountry,
    allCities,
  }

  return cachedIndex
}

/**
 * Searches global cities and states/provinces offline using country-state-city.
 * Full global coverage for all 250 countries.
 */
export function searchLocations(query: string, maxResults = 40): ResolvedLocation[] {
  const trimmed = query.trim().toLowerCase()
  if (trimmed.length < 2) return []

  const index = getSearchIndex()
  const results: ResolvedLocation[] = []
  const seenKeys = new Set<string>()

  // Helper to add unique result
  function addResult(item: ResolvedLocation): boolean {
    if (!seenKeys.has(item.id) && results.length < maxResults) {
      seenKeys.add(item.id)
      results.push(item)
      return true
    }
    return false
  }

  // Check if user used comma separation, e.g. "Toronto, Canada" or "Jaipur, Rajasthan"
  let primaryQuery = trimmed
  let contextQuery = ''

  if (trimmed.includes(',')) {
    const parts = trimmed.split(',').map((p) => p.trim())
    primaryQuery = parts[0] || ''
    contextQuery = parts.slice(1).join(' ').trim()
  }

  if (primaryQuery.length < 2) {
    primaryQuery = trimmed
    contextQuery = ''
  }

  function matchesContext(sName: string, cName: string, cCode: string): boolean {
    if (!contextQuery) return true
    const sLower = sName.toLowerCase()
    const cLower = cName.toLowerCase()
    const codeLower = cCode.toLowerCase()
    const aliases = COUNTRY_ALIASES[cCode.toUpperCase()] || []

    return (
      sLower.includes(contextQuery) ||
      cLower.includes(contextQuery) ||
      codeLower === contextQuery ||
      aliases.some((a) => a.includes(contextQuery))
    )
  }

  // -------------------------------------------------------------
  // 1. STATE / PROVINCE MATCHING (e.g. "Rajasthan", "Ontario", "California")
  // -------------------------------------------------------------
  const matchedStates: IState[] = []
  for (const s of index.states) {
    const sLower = s.name.toLowerCase()
    if (sLower === primaryQuery || sLower.startsWith(primaryQuery)) {
      const cName = index.countryByCode.get(s.countryCode) || s.countryCode
      if (matchesContext(s.name, cName, s.countryCode)) {
        matchedStates.push(s)
      }
    }
  }

  // If user searched for a State/Province, the State appears as the FIRST option
  // PLUS, all cities belonging to that state/province are listed underneath it!
  for (const s of matchedStates) {
    const cName = index.countryByCode.get(s.countryCode) || s.countryCode
    const stateId = `state:${s.countryCode}:${s.isoCode}`
    const stateDisplay = `${s.name}, ${cName}`

    addResult({
      id: stateId,
      type: 'state',
      name: s.name,
      boldText: s.name,
      subtleText: `(Province / State, ${cName})`,
      displayText: stateDisplay,
      city: s.name, // sets city = state name as required when province is chosen
      state: s.name,
      province: s.name,
      state_province: s.name,
      country: cName,
      country_code: s.countryCode,
      residential_location: stateDisplay,
    })

    // Add cities in this state/province
    const citiesInState = City.getCitiesOfState(s.countryCode, s.isoCode) || []
    for (const c of citiesInState) {
      if (results.length >= maxResults) break
      const cityId = `city:${c.countryCode}:${c.stateCode || ''}:${c.name.toLowerCase()}`
      const cityDisplay = `${c.name}, ${s.name}, ${cName}`

      addResult({
        id: cityId,
        type: 'city',
        name: c.name,
        boldText: c.name,
        subtleText: `(${s.name}, ${cName})`,
        displayText: cityDisplay,
        city: c.name,
        state: s.name,
        province: s.name,
        state_province: s.name,
        country: cName,
        country_code: c.countryCode,
        residential_location: cityDisplay,
      })
    }
  }

  // -------------------------------------------------------------
  // 2. CITY SEARCH (Exact match -> StartsWith -> Includes)
  // (e.g. "Jaipur", "Toronto", "Skopje", "Chicago")
  // -------------------------------------------------------------
  const COUNTRY_PRIORITY: Record<string, number> = {
    CA: 10,
    US: 9,
    GB: 8,
    MK: 8,
    IN: 7,
    AU: 6,
    NZ: 5,
    DE: 5,
    FR: 5,
    NL: 5,
    SG: 5,
    AE: 5,
  }

  function getPriorityScore(countryCode: string): number {
    return COUNTRY_PRIORITY[countryCode.toUpperCase()] || 0
  }

  if (results.length < maxResults) {
    const exactMatches: { city: ICity; sName: string; cName: string }[] = []
    const prefixMatches: { city: ICity; sName: string; cName: string }[] = []
    const substringMatches: { city: ICity; sName: string; cName: string }[] = []

    for (let i = 0; i < index.allCities.length; i++) {
      const c = index.allCities[i]
      const cLower = c.name.toLowerCase()

      if (cLower === primaryQuery) {
        const sName = index.stateByCodeAndCountry.get(`${c.countryCode}:${c.stateCode}`) || c.stateCode || ''
        const cName = index.countryByCode.get(c.countryCode) || c.countryCode
        if (matchesContext(sName, cName, c.countryCode)) {
          exactMatches.push({ city: c, sName, cName })
        }
      } else if (cLower.startsWith(primaryQuery)) {
        const sName = index.stateByCodeAndCountry.get(`${c.countryCode}:${c.stateCode}`) || c.stateCode || ''
        const cName = index.countryByCode.get(c.countryCode) || c.countryCode
        if (matchesContext(sName, cName, c.countryCode)) {
          prefixMatches.push({ city: c, sName, cName })
        }
      } else if (cLower.includes(primaryQuery)) {
        const sName = index.stateByCodeAndCountry.get(`${c.countryCode}:${c.stateCode}`) || c.stateCode || ''
        const cName = index.countryByCode.get(c.countryCode) || c.countryCode
        if (matchesContext(sName, cName, c.countryCode)) {
          substringMatches.push({ city: c, sName, cName })
        }
      }
    }

    // Sort exact matches by country priority
    exactMatches.sort((a, b) => getPriorityScore(b.city.countryCode) - getPriorityScore(a.city.countryCode))
    prefixMatches.sort((a, b) => getPriorityScore(b.city.countryCode) - getPriorityScore(a.city.countryCode))
    substringMatches.sort((a, b) => getPriorityScore(b.city.countryCode) - getPriorityScore(a.city.countryCode))

    // Add exact matches
    for (const item of exactMatches) {
      if (results.length >= maxResults) break
      const { city: c, sName, cName } = item
      const cityId = `city:${c.countryCode}:${c.stateCode || ''}:${c.name.toLowerCase()}`
      const subtle = sName ? `(${sName}, ${cName})` : `(${cName})`
      const cityDisplay = `${c.name}${sName ? `, ${sName}` : ''}, ${cName}`

      addResult({
        id: cityId,
        type: 'city',
        name: c.name,
        boldText: c.name,
        subtleText: subtle,
        displayText: cityDisplay,
        city: c.name,
        state: sName,
        province: sName,
        state_province: sName,
        country: cName,
        country_code: c.countryCode,
        residential_location: cityDisplay,
      })
    }

    // Add prefix matches
    for (const item of prefixMatches) {
      if (results.length >= maxResults) break
      const { city: c, sName, cName } = item
      const cityId = `city:${c.countryCode}:${c.stateCode || ''}:${c.name.toLowerCase()}`
      const subtle = sName ? `(${sName}, ${cName})` : `(${cName})`
      const cityDisplay = `${c.name}${sName ? `, ${sName}` : ''}, ${cName}`

      addResult({
        id: cityId,
        type: 'city',
        name: c.name,
        boldText: c.name,
        subtleText: subtle,
        displayText: cityDisplay,
        city: c.name,
        state: sName,
        province: sName,
        state_province: sName,
        country: cName,
        country_code: c.countryCode,
        residential_location: cityDisplay,
      })
    }

    // Add substring states
    for (const s of index.states) {
      if (results.length >= maxResults) break
      const sLower = s.name.toLowerCase()
      if (!sLower.startsWith(primaryQuery) && sLower.includes(primaryQuery)) {
        const cName = index.countryByCode.get(s.countryCode) || s.countryCode
        if (matchesContext(s.name, cName, s.countryCode)) {
          const stateId = `state:${s.countryCode}:${s.isoCode}`
          const stateDisplay = `${s.name}, ${cName}`

          addResult({
            id: stateId,
            type: 'state',
            name: s.name,
            boldText: s.name,
            subtleText: `(Province / State, ${cName})`,
            displayText: stateDisplay,
            city: s.name,
            state: s.name,
            province: s.name,
            state_province: s.name,
            country: cName,
            country_code: s.countryCode,
            residential_location: stateDisplay,
          })
        }
      }
    }

    // Add substring cities
    for (const item of substringMatches) {
      if (results.length >= maxResults) break
      const { city: c, sName, cName } = item
      const cityId = `city:${c.countryCode}:${c.stateCode || ''}:${c.name.toLowerCase()}`
      const subtle = sName ? `(${sName}, ${cName})` : `(${cName})`
      const cityDisplay = `${c.name}${sName ? `, ${sName}` : ''}, ${cName}`

      addResult({
        id: cityId,
        type: 'city',
        name: c.name,
        boldText: c.name,
        subtleText: subtle,
        displayText: cityDisplay,
        city: c.name,
        state: sName,
        province: sName,
        state_province: sName,
        country: cName,
        country_code: c.countryCode,
        residential_location: cityDisplay,
      })
    }
  }

  // -------------------------------------------------------------
  // 5. COUNTRY MATCHING (e.g. "North Macedonia", "Canada", "India")
  // If user typed a country name, suggest its provinces and major cities!
  // -------------------------------------------------------------
  if (results.length < 5) {
    const matchedCountries: ICountry[] = []
    for (const c of index.countries) {
      const cName = (index.countryByCode.get(c.isoCode) || c.name).toLowerCase()
      const aliases = COUNTRY_ALIASES[c.isoCode.toUpperCase()] || []
      if (
        cName === primaryQuery ||
        cName.startsWith(primaryQuery) ||
        aliases.some((a) => a === primaryQuery || a.startsWith(primaryQuery))
      ) {
        matchedCountries.push(c)
      }
    }

    for (const mc of matchedCountries) {
      if (results.length >= maxResults) break
      const countryResolvedName = index.countryByCode.get(mc.isoCode) || mc.name
      // Add states of this country
      const countryStates = State.getStatesOfCountry(mc.isoCode) || []
      for (const s of countryStates) {
        if (results.length >= maxResults) break
        const stateId = `state:${s.countryCode}:${s.isoCode}`
        const stateDisplay = `${s.name}, ${countryResolvedName}`

        addResult({
          id: stateId,
          type: 'state',
          name: s.name,
          boldText: s.name,
          subtleText: `(Province / State, ${countryResolvedName})`,
          displayText: stateDisplay,
          city: s.name,
          state: s.name,
          province: s.name,
          state_province: s.name,
          country: countryResolvedName,
          country_code: s.countryCode,
          residential_location: stateDisplay,
        })
      }

      // Add cities of this country
      const countryCities = City.getCitiesOfCountry(mc.isoCode) || []
      // If Skopje exists in MK cities, put Skopje first!
      const sortedCities = [...countryCities]
      if (mc.isoCode === 'MK') {
        const skopjeIdx = sortedCities.findIndex((x) => x.name.toLowerCase() === 'skopje')
        if (skopjeIdx > -1) {
          const [skopje] = sortedCities.splice(skopjeIdx, 1)
          sortedCities.unshift(skopje)
        }
      }

      for (const c of sortedCities) {
        if (results.length >= maxResults) break
        const sName = index.stateByCodeAndCountry.get(`${c.countryCode}:${c.stateCode}`) || c.stateCode || ''
        const cityId = `city:${c.countryCode}:${c.stateCode || ''}:${c.name.toLowerCase()}`
        const subtle = sName ? `(${sName}, ${countryResolvedName})` : `(${countryResolvedName})`
        const cityDisplay = `${c.name}${sName ? `, ${sName}` : ''}, ${countryResolvedName}`

        addResult({
          id: cityId,
          type: 'city',
          name: c.name,
          boldText: c.name,
          subtleText: subtle,
          displayText: cityDisplay,
          city: c.name,
          state: sName,
          province: sName,
          state_province: sName,
          country: countryResolvedName,
          country_code: c.countryCode,
          residential_location: cityDisplay,
        })
      }
    }
  }

  return results
}
