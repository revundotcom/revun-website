/**
 * United States city data for /us/[state]/[city] pages.
 *
 * Each city record carries:
 *   - population & rental household count
 *   - median 1BR rent + vacancy rate
 *   - 2-3 distinctive neighbourhood/submarket names
 *   - one market note tying to local rental dynamics
 *
 * State-level regulatory copy lives in the state template; city pages inherit
 * that and layer local market context on top.
 *
 * Slugs that include a state suffix (eg. `arlington-va`, `cambridge-ma`,
 * `vancouver-wa`, `aurora-co`) match the disambiguated entries in the
 * pre-strip sitemap.
 */

export interface UsCityRecord {
  name: string
  slug: string
  state: string
  stateSlug: string
  population: string
  rentalHouseholds: string
  medianRent1BR: string
  vacancyRate: string
  marketNote: string
  areas: { name: string; note: string }[]
}

export const usCities: UsCityRecord[] = [
  // ─── Florida ──────────────────────────────────────────────────────────────
  {
    name: 'Miami',
    slug: 'miami',
    state: 'Florida',
    stateSlug: 'florida',
    population: '450,000',
    rentalHouseholds: '~115,000',
    medianRent1BR: '$2,500',
    vacancyRate: '3.2%',
    marketNote:
      'Miami absorbs the largest cross-border investor capital flow in the US. Condo stock dominates rental supply, and HOA approval requirements add complexity to leasing workflows.',
    areas: [
      { name: 'Brickell', note: 'High-rise condo cluster with the highest rental investor share in the city.' },
      { name: 'Wynwood', note: 'Art-district mixed-use redevelopment with newer rental supply.' },
      { name: 'Coconut Grove', note: 'Established residential with townhouse and detached rentals.' },
      { name: 'Little Havana', note: 'Mid-rise rental stock with lower median rents than coastal districts.' },
    ],
  },
  {
    name: 'Orlando',
    slug: 'orlando',
    state: 'Florida',
    stateSlug: 'florida',
    population: '320,000',
    rentalHouseholds: '~95,000',
    medianRent1BR: '$1,750',
    vacancyRate: '4.1%',
    marketNote:
      'Theme park employment and the medical city anchor steady long-term demand. The Orlando MSA also has the largest short-term rental concentration in the eastern US after Las Vegas.',
    areas: [
      { name: 'Downtown / Thornton Park', note: 'Mid-rise rental cluster around Lake Eola.' },
      { name: 'Lake Nona / Medical City', note: 'Newer master-planned community with corporate housing demand.' },
      { name: 'Winter Park', note: 'Higher-end suburb with townhouse and detached rentals.' },
    ],
  },
  {
    name: 'Tampa',
    slug: 'tampa',
    state: 'Florida',
    stateSlug: 'florida',
    population: '410,000',
    rentalHouseholds: '~100,000',
    medianRent1BR: '$1,800',
    vacancyRate: '4.0%',
    marketNote:
      'Tampa Bay\'s population growth has outpaced new rental supply for several years. Tech and finance employment around Water Street has shifted rent inflation to the high end.',
    areas: [
      { name: 'Downtown / Channelside', note: 'High-rise rental cluster around Water Street.' },
      { name: 'Westshore', note: 'Office park-adjacent district with corporate rental demand.' },
      { name: 'Ybor City', note: 'Historic district with character-home conversions.' },
    ],
  },
  {
    name: 'Jacksonville',
    slug: 'jacksonville',
    state: 'Florida',
    stateSlug: 'florida',
    population: '975,000',
    rentalHouseholds: '~165,000',
    medianRent1BR: '$1,450',
    vacancyRate: '5.1%',
    marketNote:
      'Jacksonville is geographically the largest city in the contiguous US. Naval employment, banking, and logistics anchor a stable long-term rental market with above-average vacancy.',
    areas: [
      { name: 'Riverside / Avondale', note: 'Historic residential with character-home rentals.' },
      { name: 'Southside', note: 'Suburban district with townhouse and detached rental supply.' },
      { name: 'Downtown / Brooklyn', note: 'Newer mid-rise rental supply along the river.' },
    ],
  },
  {
    name: 'St. Petersburg',
    slug: 'st-petersburg',
    state: 'Florida',
    stateSlug: 'florida',
    population: '260,000',
    rentalHouseholds: '~55,000',
    medianRent1BR: '$1,700',
    vacancyRate: '3.8%',
    marketNote:
      'St. Petersburg has been the fastest-rent-growing city in the Tampa Bay region. Walkable downtown redevelopment plus waterfront condo conversion shapes most new rental supply.',
    areas: [
      { name: 'Downtown / Old Northeast', note: 'Heritage stock plus newer mid-rise rentals.' },
      { name: 'Grand Central District', note: 'Mid-density redevelopment area with townhouse and walk-up stock.' },
      { name: 'Snell Isle / Coffee Pot', note: 'Higher-end coastal residential with detached rentals.' },
    ],
  },
  {
    name: 'Fort Lauderdale',
    slug: 'fort-lauderdale',
    state: 'Florida',
    stateSlug: 'florida',
    population: '185,000',
    rentalHouseholds: '~50,000',
    medianRent1BR: '$2,100',
    vacancyRate: '3.5%',
    marketNote:
      'Fort Lauderdale\'s rental market is dominated by waterfront condo investor ownership. Cross-border buyers and seasonal residents push furnished and short-term rental supply.',
    areas: [
      { name: 'Downtown / Las Olas', note: 'High-rise condo cluster with the highest investor share.' },
      { name: 'Victoria Park', note: 'Established residential with character-home conversions.' },
      { name: 'Wilton Manors', note: 'Adjacent walkable city with mid-rise rental supply.' },
    ],
  },
  {
    name: 'West Palm Beach',
    slug: 'west-palm-beach',
    state: 'Florida',
    stateSlug: 'florida',
    population: '120,000',
    rentalHouseholds: '~35,000',
    medianRent1BR: '$2,000',
    vacancyRate: '3.6%',
    marketNote:
      'West Palm Beach has absorbed significant finance-industry relocation from the Northeast since 2020. Downtown CityPlace and the waterfront anchor most new rental construction.',
    areas: [
      { name: 'Downtown / CityPlace', note: 'High-rise rental cluster with newer supply.' },
      { name: 'Northwood', note: 'Historic district with character-home rentals.' },
      { name: 'South of Southern', note: 'Mid-density established residential with townhouse stock.' },
    ],
  },
  {
    name: 'Hollywood',
    slug: 'hollywood',
    state: 'Florida',
    stateSlug: 'florida',
    population: '155,000',
    rentalHouseholds: '~45,000',
    medianRent1BR: '$1,900',
    vacancyRate: '3.7%',
    marketNote:
      'Hollywood sits between Miami and Fort Lauderdale and serves both job markets. Beachfront condo stock dominates investor-owned rental supply.',
    areas: [
      { name: 'Hollywood Beach', note: 'Oceanfront condo cluster with high investor share.' },
      { name: 'Downtown Hollywood', note: 'Walkable mixed-use core with mid-rise rentals.' },
      { name: 'Hollywood Lakes', note: 'Established residential with character-home conversions.' },
    ],
  },
  {
    name: 'Pembroke Pines',
    slug: 'pembroke-pines',
    state: 'Florida',
    stateSlug: 'florida',
    population: '170,000',
    rentalHouseholds: '~30,000',
    medianRent1BR: '$1,950',
    vacancyRate: '3.9%',
    marketNote:
      'Pembroke Pines is one of Broward County\'s largest cities, with suburban townhouse and gated-community rental supply. HOA management is integral to rental operations here.',
    areas: [
      { name: 'Pembroke Falls', note: 'Gated community with detached rental supply.' },
      { name: 'Silver Lakes', note: 'Established residential with townhouse rentals.' },
      { name: 'Pembroke Shores', note: 'Suburban community with townhouse and detached stock.' },
    ],
  },
  {
    name: 'Tallahassee',
    slug: 'tallahassee',
    state: 'Florida',
    stateSlug: 'florida',
    population: '200,000',
    rentalHouseholds: '~50,000',
    medianRent1BR: '$1,250',
    vacancyRate: '5.5%',
    marketNote:
      'Florida State University and Florida A&M University anchor a large student rental segment. State government employment provides counter-cyclical demand.',
    areas: [
      { name: 'College Town', note: 'Student-oriented mid-rise rental cluster near FSU.' },
      { name: 'Midtown', note: 'Walkable mixed-use district with character-home conversions.' },
      { name: 'Killearn', note: 'Established suburban residential with detached rentals.' },
    ],
  },

  // ─── Texas ────────────────────────────────────────────────────────────────
  {
    name: 'Houston',
    slug: 'houston',
    state: 'Texas',
    stateSlug: 'texas',
    population: '2.30 million',
    rentalHouseholds: '~430,000',
    medianRent1BR: '$1,400',
    vacancyRate: '6.5%',
    marketNote:
      'Houston has no formal zoning code and the deepest energy-industry rental demand in the US. The Texas Medical Center anchors a meaningful corporate housing segment.',
    areas: [
      { name: 'Downtown / Midtown', note: 'High-rise rental cluster with newer supply.' },
      { name: 'Montrose', note: 'Walkable inner-city district with character-home rentals.' },
      { name: 'Energy Corridor', note: 'West Houston employment cluster with corporate housing demand.' },
    ],
  },
  {
    name: 'San Antonio',
    slug: 'san-antonio',
    state: 'Texas',
    stateSlug: 'texas',
    population: '1.49 million',
    rentalHouseholds: '~210,000',
    medianRent1BR: '$1,200',
    vacancyRate: '6.8%',
    marketNote:
      'San Antonio is the seventh-largest city in the US and has the lowest median rent of any Texas major market. Military employment (Joint Base San Antonio) anchors stable demand.',
    areas: [
      { name: 'Downtown', note: 'River Walk-adjacent mid-rise rental cluster.' },
      { name: 'Stone Oak', note: 'North suburban community with townhouse and gated rentals.' },
      { name: 'Alamo Heights', note: 'Established higher-income enclave with detached rentals.' },
    ],
  },
  {
    name: 'Dallas',
    slug: 'dallas',
    state: 'Texas',
    stateSlug: 'texas',
    population: '1.30 million',
    rentalHouseholds: '~265,000',
    medianRent1BR: '$1,500',
    vacancyRate: '7.0%',
    marketNote:
      'Dallas led US metros in corporate relocations from 2020 to 2024. Uptown, the Design District, and Deep Ellum have seen the largest rental construction pipeline outside Sun Belt rivals.',
    areas: [
      { name: 'Uptown', note: 'Highest-density rental cluster with newest supply.' },
      { name: 'Lower Greenville', note: 'Walkable mixed-use district with character-home conversions.' },
      { name: 'Lakewood', note: 'Established higher-end residential with detached rentals.' },
    ],
  },
  {
    name: 'Fort Worth',
    slug: 'fort-worth',
    state: 'Texas',
    stateSlug: 'texas',
    population: '950,000',
    rentalHouseholds: '~135,000',
    medianRent1BR: '$1,350',
    vacancyRate: '6.3%',
    marketNote:
      'Fort Worth has been one of the fastest-growing major US cities for the past decade. Defense and aerospace employment (Lockheed, Bell) anchors corporate rental demand.',
    areas: [
      { name: 'Downtown / Sundance Square', note: 'Walkable core with mid-rise rental supply.' },
      { name: 'Westside / TCU', note: 'University catchment with character-home conversions.' },
      { name: 'Alliance / North Fort Worth', note: 'Newer suburban community with townhouse rentals.' },
    ],
  },
  {
    name: 'Austin',
    slug: 'austin',
    state: 'Texas',
    stateSlug: 'texas',
    population: '975,000',
    rentalHouseholds: '~210,000',
    medianRent1BR: '$1,650',
    vacancyRate: '7.5%',
    marketNote:
      'Austin had the largest rental construction pipeline of any US metro in 2024, which has pushed vacancy above 7% and reversed two years of rent inflation. Tech employment remains the central demand driver.',
    areas: [
      { name: 'Downtown / Rainey', note: 'High-rise rental cluster with significant new supply.' },
      { name: 'East Austin', note: 'Gentrifying neighbourhood with character-home conversions.' },
      { name: 'South Congress', note: 'Walkable mixed-use district with townhouse and mid-rise stock.' },
    ],
  },
  {
    name: 'El Paso',
    slug: 'el-paso',
    state: 'Texas',
    stateSlug: 'texas',
    population: '680,000',
    rentalHouseholds: '~95,000',
    medianRent1BR: '$1,000',
    vacancyRate: '5.8%',
    marketNote:
      'El Paso has the lowest median rent of any Texas major city and a high share of military-family renters tied to Fort Bliss. Cross-border employment from Ciudad Juárez also shapes rental demand.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock with newer mid-rise infill.' },
      { name: 'Westside', note: 'Established residential with townhouse rentals.' },
      { name: 'Fort Bliss area', note: 'Military-family rental supply with BAH-aligned pricing.' },
    ],
  },
  {
    name: 'Arlington',
    slug: 'arlington',
    state: 'Texas',
    stateSlug: 'texas',
    population: '395,000',
    rentalHouseholds: '~75,000',
    medianRent1BR: '$1,350',
    vacancyRate: '6.5%',
    marketNote:
      'Arlington sits between Dallas and Fort Worth with stadium-anchored employment and the University of Texas at Arlington. Tourist activity around AT&T Stadium and Globe Life Field also drives short-term demand.',
    areas: [
      { name: 'Entertainment District', note: 'Stadium-anchored mid-rise rentals.' },
      { name: 'UTA area', note: 'University catchment with student-oriented stock.' },
      { name: 'South Arlington', note: 'Established residential with townhouse rentals.' },
    ],
  },
  {
    name: 'Corpus Christi',
    slug: 'corpus-christi',
    state: 'Texas',
    stateSlug: 'texas',
    population: '320,000',
    rentalHouseholds: '~50,000',
    medianRent1BR: '$1,150',
    vacancyRate: '6.0%',
    marketNote:
      'Corpus Christi is a Gulf Coast port city with petrochemical and naval employment. Hurricane risk is a material consideration for property operators.',
    areas: [
      { name: 'Downtown / Bayfront', note: 'Heritage stock plus newer waterfront condo conversion.' },
      { name: 'Padre Island', note: 'Beachfront short-term rental concentration.' },
      { name: 'Calallen', note: 'Suburban residential with detached rentals.' },
    ],
  },
  {
    name: 'Plano',
    slug: 'plano',
    state: 'Texas',
    stateSlug: 'texas',
    population: '290,000',
    rentalHouseholds: '~50,000',
    medianRent1BR: '$1,550',
    vacancyRate: '6.5%',
    marketNote:
      'Plano hosts the headquarters of Toyota North America, JPMorgan, and Frito-Lay among others. Corporate housing demand from relocations runs above the Dallas MSA average.',
    areas: [
      { name: 'Legacy West', note: 'Walkable mixed-use district with newer mid-rise rentals.' },
      { name: 'Downtown Plano', note: 'Historic core with character-home and mid-rise stock.' },
      { name: 'West Plano', note: 'Established residential with townhouse rentals.' },
    ],
  },
  {
    name: 'Frisco',
    slug: 'frisco',
    state: 'Texas',
    stateSlug: 'texas',
    population: '230,000',
    rentalHouseholds: '~30,000',
    medianRent1BR: '$1,600',
    vacancyRate: '7.0%',
    marketNote:
      'Frisco has been one of the fastest-growing US cities since 2010. Corporate relocations and master-planned community development drive most rental supply.',
    areas: [
      { name: 'The Star', note: 'Dallas Cowboys-anchored mixed-use district.' },
      { name: 'Frisco Bridges', note: 'Walkable master-planned community with mid-rise rentals.' },
      { name: 'Phillips Creek Ranch', note: 'Master-planned residential with townhouse and detached rentals.' },
    ],
  },

  // ─── California ───────────────────────────────────────────────────────────
  {
    name: 'Los Angeles',
    slug: 'los-angeles',
    state: 'California',
    stateSlug: 'california',
    population: '3.85 million',
    rentalHouseholds: '~880,000',
    medianRent1BR: '$2,400',
    vacancyRate: '4.0%',
    marketNote:
      'Los Angeles has the largest rent-stabilized housing stock of any US city. The Rent Stabilization Ordinance (RSO) caps annual rent increases at CPI plus 1% to 8% maximum, and the Just Cause Eviction ordinance applies citywide.',
    areas: [
      { name: 'Downtown / DTLA', note: 'High-rise rental cluster with new supply.' },
      { name: 'Hollywood / West Hollywood', note: 'Mid-rise rental stock with high turnover.' },
      { name: 'Westside (Santa Monica, Venice)', note: 'Beachfront and walkable districts with the highest rents.' },
      { name: 'San Fernando Valley', note: 'Suburban-feeling districts with townhouse and detached rentals.' },
    ],
  },
  {
    name: 'San Diego',
    slug: 'san-diego',
    state: 'California',
    stateSlug: 'california',
    population: '1.39 million',
    rentalHouseholds: '~245,000',
    medianRent1BR: '$2,500',
    vacancyRate: '3.5%',
    marketNote:
      'San Diego\'s rental market combines naval employment, biotech (Sorrento Valley), and tourism. AB 1482 caps rent increases at 5% plus CPI for non-exempt units.',
    areas: [
      { name: 'Downtown / East Village', note: 'High-rise rental cluster with newer supply.' },
      { name: 'North Park / Hillcrest', note: 'Walkable district with character-home conversions.' },
      { name: 'La Jolla', note: 'Coastal higher-end residential with detached rentals.' },
    ],
  },
  {
    name: 'San Jose',
    slug: 'san-jose',
    state: 'California',
    stateSlug: 'california',
    population: '985,000',
    rentalHouseholds: '~140,000',
    medianRent1BR: '$2,750',
    vacancyRate: '4.2%',
    marketNote:
      'San Jose anchors Silicon Valley and has the highest median household income of any US city. The Apartment Rent Ordinance (ARO) provides additional rent stabilization on top of state-wide AB 1482.',
    areas: [
      { name: 'Downtown San Jose', note: 'Mid-rise rental cluster with newer supply around SAP Center.' },
      { name: 'Willow Glen', note: 'Walkable district with character-home rentals.' },
      { name: 'North San Jose', note: 'Tech-corridor employment area with newer mid-rise rentals.' },
    ],
  },
  {
    name: 'San Francisco',
    slug: 'san-francisco',
    state: 'California',
    stateSlug: 'california',
    population: '810,000',
    rentalHouseholds: '~265,000',
    medianRent1BR: '$3,000',
    vacancyRate: '5.0%',
    marketNote:
      'San Francisco has one of the strongest tenant protection regimes in the US. The Rent Ordinance covers most pre-1979 buildings, and the city operates its own Rent Board.',
    areas: [
      { name: 'SoMa', note: 'High-rise rental cluster with significant tech employment proximity.' },
      { name: 'Mission', note: 'Gentrifying district with rent-controlled character stock.' },
      { name: 'Sunset / Richmond', note: 'Established residential with detached rentals.' },
    ],
  },
  {
    name: 'Sacramento',
    slug: 'sacramento',
    state: 'California',
    stateSlug: 'california',
    population: '525,000',
    rentalHouseholds: '~110,000',
    medianRent1BR: '$1,650',
    vacancyRate: '5.0%',
    marketNote:
      'Sacramento has the largest state-government employment concentration in California, plus a meaningful UC Davis Health corridor. The Sacramento Tenant Protection Act adds local rent stabilization.',
    areas: [
      { name: 'Downtown / Midtown', note: 'Walkable district with character-home and mid-rise rentals.' },
      { name: 'East Sacramento', note: 'Established residential with detached rentals.' },
      { name: 'Natomas', note: 'Newer suburban community with townhouse rental supply.' },
    ],
  },
  {
    name: 'Fresno',
    slug: 'fresno',
    state: 'California',
    stateSlug: 'california',
    population: '545,000',
    rentalHouseholds: '~95,000',
    medianRent1BR: '$1,250',
    vacancyRate: '4.5%',
    marketNote:
      'Fresno is the largest city in the Central Valley and has the lowest median rent of any major California city. Agricultural employment and Fresno State anchor demand.',
    areas: [
      { name: 'Tower District', note: 'Walkable historic district with character-home rentals.' },
      { name: 'Fresno State area', note: 'University catchment with student-oriented stock.' },
      { name: 'North Fresno', note: 'Established residential with townhouse rentals.' },
    ],
  },
  {
    name: 'Irvine',
    slug: 'irvine',
    state: 'California',
    stateSlug: 'california',
    population: '310,000',
    rentalHouseholds: '~60,000',
    medianRent1BR: '$2,800',
    vacancyRate: '4.0%',
    marketNote:
      'Irvine is largely operated as a master-planned community by the Irvine Company. UC Irvine and tech employment anchor stable demand, and rental supply is dominated by purpose-built communities.',
    areas: [
      { name: 'University Town Center', note: 'UC Irvine catchment with student and faculty rental supply.' },
      { name: 'Woodbridge', note: 'Master-planned community with townhouse and detached rentals.' },
      { name: 'Northwood', note: 'Established master-planned community with mid-rise rentals.' },
    ],
  },
  {
    name: 'Anaheim',
    slug: 'anaheim',
    state: 'California',
    stateSlug: 'california',
    population: '345,000',
    rentalHouseholds: '~65,000',
    medianRent1BR: '$2,000',
    vacancyRate: '4.5%',
    marketNote:
      'Anaheim\'s rental market is shaped by Disneyland-area tourism employment plus the Platinum Triangle high-rise rental cluster. Anaheim has one of the largest short-term rental concentrations in California.',
    areas: [
      { name: 'Platinum Triangle', note: 'High-rise rental cluster around Angel Stadium.' },
      { name: 'Anaheim Hills', note: 'Suburban residential with detached and townhouse rentals.' },
      { name: 'Anaheim Resort District', note: 'Tourism-anchored short-term rental concentration.' },
    ],
  },
  {
    name: 'Long Beach',
    slug: 'long-beach',
    state: 'California',
    stateSlug: 'california',
    population: '450,000',
    rentalHouseholds: '~95,000',
    medianRent1BR: '$2,000',
    vacancyRate: '4.5%',
    marketNote:
      'Long Beach has the largest port complex on the US west coast and a meaningful Cal State Long Beach student rental segment. The city has its own just-cause eviction ordinance.',
    areas: [
      { name: 'Downtown / East Village', note: 'Mid-rise rental cluster with newer supply.' },
      { name: 'Belmont Shore', note: 'Beachfront walkable district with character-home rentals.' },
      { name: 'Cal State Long Beach area', note: 'University catchment with student-oriented stock.' },
    ],
  },
  {
    name: 'Oakland',
    slug: 'oakland',
    state: 'California',
    stateSlug: 'california',
    population: '440,000',
    rentalHouseholds: '~120,000',
    medianRent1BR: '$2,200',
    vacancyRate: '5.5%',
    marketNote:
      'Oakland\'s rental market combines Bay Area job spillover with one of the strongest local tenant protection regimes outside San Francisco. Just Cause for Eviction Ordinance and Rent Adjustment Program apply.',
    areas: [
      { name: 'Downtown / Uptown', note: 'Mid-rise rental cluster with newer supply.' },
      { name: 'Rockridge', note: 'Walkable district with character-home rentals.' },
      { name: 'Fruitvale', note: 'Established residential with rent-controlled stock.' },
    ],
  },

  // ─── New York ─────────────────────────────────────────────────────────────
  {
    name: 'New York City',
    slug: 'new-york-city',
    state: 'New York',
    stateSlug: 'new-york',
    population: '8.34 million',
    rentalHouseholds: '~2.2 million',
    medianRent1BR: '$3,500',
    vacancyRate: '1.4%',
    marketNote:
      'New York City has the largest renter share of any US major city at roughly 67%. Rent-stabilized units cover roughly one million apartments and follow Rent Guidelines Board annual increase rules.',
    areas: [
      { name: 'Manhattan', note: 'Highest-rent borough with the largest rent-stabilized stock.' },
      { name: 'Brooklyn', note: 'Largest rental supply borough with the most varied stock.' },
      { name: 'Queens', note: 'Diverse borough with high immigrant rental demand and varied stock.' },
      { name: 'Bronx', note: 'Most affordable borough with the highest rent-stabilized share.' },
    ],
  },
  {
    name: 'Buffalo',
    slug: 'buffalo',
    state: 'New York',
    stateSlug: 'new-york',
    population: '275,000',
    rentalHouseholds: '~55,000',
    medianRent1BR: '$1,000',
    vacancyRate: '4.5%',
    marketNote:
      'Buffalo has one of the lowest median rents of any major US Northeast city. Medical Campus development and the University at Buffalo anchor stable demand.',
    areas: [
      { name: 'Elmwood Village', note: 'Walkable district with character-home rentals.' },
      { name: 'Allentown', note: 'Historic district with character conversions.' },
      { name: 'UB South Campus area', note: 'University catchment with student-oriented stock.' },
    ],
  },
  {
    name: 'Rochester',
    slug: 'rochester',
    state: 'New York',
    stateSlug: 'new-york',
    population: '210,000',
    rentalHouseholds: '~45,000',
    medianRent1BR: '$1,050',
    vacancyRate: '4.0%',
    marketNote:
      'Rochester is anchored by the University of Rochester, Rochester Institute of Technology, and the Mayo Clinic\'s growing regional presence. Median rent is among the lowest in New York State.',
    areas: [
      { name: 'East Avenue', note: 'Heritage district with character-home conversions.' },
      { name: 'Park Avenue', note: 'Walkable established neighbourhood with townhouse rentals.' },
      { name: 'U of R area', note: 'University catchment with student-oriented stock.' },
    ],
  },
  {
    name: 'Yonkers',
    slug: 'yonkers',
    state: 'New York',
    stateSlug: 'new-york',
    population: '210,000',
    rentalHouseholds: '~50,000',
    medianRent1BR: '$1,900',
    vacancyRate: '3.0%',
    marketNote:
      'Yonkers is the largest city in Westchester County and connects directly to Manhattan via Metro-North. Suburban commuter demand has pushed rents above the regional median.',
    areas: [
      { name: 'Downtown / Getty Square', note: 'Mid-rise rental cluster with redevelopment supply.' },
      { name: 'Bronxville border', note: 'Higher-end residential with detached rentals.' },
      { name: 'Park Hill', note: 'Established residential with townhouse stock.' },
    ],
  },
  {
    name: 'Syracuse',
    slug: 'syracuse',
    state: 'New York',
    stateSlug: 'new-york',
    population: '145,000',
    rentalHouseholds: '~32,000',
    medianRent1BR: '$950',
    vacancyRate: '4.5%',
    marketNote:
      'Syracuse University anchors a meaningful student rental segment, while Micron\'s announced semiconductor megafab is expected to reshape long-term demand. Median rent remains the lowest of any New York metro.',
    areas: [
      { name: 'University Hill', note: 'Student-oriented rental concentration near Syracuse University.' },
      { name: 'Armory Square', note: 'Heritage district with newer mid-rise rental supply.' },
      { name: 'Eastwood', note: 'Established residential with detached rentals.' },
    ],
  },
  {
    name: 'Albany',
    slug: 'albany',
    state: 'New York',
    stateSlug: 'new-york',
    population: '100,000',
    rentalHouseholds: '~25,000',
    medianRent1BR: '$1,300',
    vacancyRate: '4.0%',
    marketNote:
      'Albany is the New York State capital, and state government employment anchors counter-cyclical demand. The University at Albany adds student rental volume.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock plus newer mid-rise rental conversion.' },
      { name: 'Pine Hills', note: 'University catchment with student-oriented stock.' },
      { name: 'Center Square', note: 'Walkable historic district with character-home rentals.' },
    ],
  },

  // ─── Illinois ─────────────────────────────────────────────────────────────
  {
    name: 'Chicago',
    slug: 'chicago',
    state: 'Illinois',
    stateSlug: 'illinois',
    population: '2.66 million',
    rentalHouseholds: '~570,000',
    medianRent1BR: '$1,950',
    vacancyRate: '5.5%',
    marketNote:
      'Chicago has the third-largest rental market in the US. The Residential Landlord and Tenant Ordinance (RLTO) creates extensive tenant protections, and the Chicago Just Cause Eviction ordinance is being considered.',
    areas: [
      { name: 'The Loop / River North', note: 'High-rise rental cluster with newer supply.' },
      { name: 'Lincoln Park / Lakeview', note: 'Walkable established districts with character-home rentals.' },
      { name: 'Hyde Park', note: 'University of Chicago catchment with mature rental stock.' },
      { name: 'Logan Square', note: 'Gentrifying district with character conversions.' },
    ],
  },
  {
    name: 'Aurora',
    slug: 'aurora',
    state: 'Illinois',
    stateSlug: 'illinois',
    population: '180,000',
    rentalHouseholds: '~30,000',
    medianRent1BR: '$1,350',
    vacancyRate: '5.0%',
    marketNote:
      'Aurora is the second-largest city in Illinois and serves the western Chicago suburbs. Metra commuter rail access keeps demand tied to Chicago employment cycles.',
    areas: [
      { name: 'Downtown Aurora', note: 'Heritage stock plus newer mid-rise rental redevelopment.' },
      { name: 'Far East Aurora', note: 'Suburban townhouse and detached rental supply.' },
      { name: 'Far West Aurora', note: 'Master-planned community with newer townhouse rentals.' },
    ],
  },
  {
    name: 'Naperville',
    slug: 'naperville',
    state: 'Illinois',
    stateSlug: 'illinois',
    population: '150,000',
    rentalHouseholds: '~18,000',
    medianRent1BR: '$1,650',
    vacancyRate: '5.0%',
    marketNote:
      'Naperville is a higher-income western suburb with significant tech employment (formerly Lucent/Nokia, currently several Edward-Elmhurst Health and Northwestern Medicine sites). Detached rental supply dominates.',
    areas: [
      { name: 'Downtown Naperville', note: 'Walkable mixed-use district with mid-rise rental supply.' },
      { name: 'South Naperville', note: 'Established residential with detached rentals.' },
      { name: 'River Run', note: 'Master-planned community with townhouse rentals.' },
    ],
  },
  {
    name: 'Joliet',
    slug: 'joliet',
    state: 'Illinois',
    stateSlug: 'illinois',
    population: '150,000',
    rentalHouseholds: '~22,000',
    medianRent1BR: '$1,200',
    vacancyRate: '5.5%',
    marketNote:
      'Joliet is a major logistics hub with significant warehouse and distribution employment. Metra commuter access connects to downtown Chicago.',
    areas: [
      { name: 'Downtown Joliet', note: 'Heritage stock plus newer rental conversions.' },
      { name: 'Joliet West', note: 'Established residential with townhouse rentals.' },
      { name: 'Plainfield border', note: 'Newer suburban community with townhouse stock.' },
    ],
  },
  {
    name: 'Rockford',
    slug: 'rockford',
    state: 'Illinois',
    stateSlug: 'illinois',
    population: '145,000',
    rentalHouseholds: '~22,000',
    medianRent1BR: '$900',
    vacancyRate: '6.0%',
    marketNote:
      'Rockford has the lowest median rent of any major Illinois city. Manufacturing and aerospace employment anchor demand, but vacancy has run above the state median.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock with redevelopment-area rental supply.' },
      { name: 'East State Street corridor', note: 'Established residential with detached rentals.' },
      { name: 'West Rockford', note: 'Older walk-up rental concentration.' },
    ],
  },

  // ─── Georgia ──────────────────────────────────────────────────────────────
  {
    name: 'Atlanta',
    slug: 'atlanta',
    state: 'Georgia',
    stateSlug: 'georgia',
    population: '500,000',
    rentalHouseholds: '~140,000',
    medianRent1BR: '$1,750',
    vacancyRate: '7.0%',
    marketNote:
      'Atlanta has the largest rental construction pipeline of any Southeast US metro. Corporate headquarters concentration (Coca-Cola, Delta, Home Depot, UPS) anchors demand.',
    areas: [
      { name: 'Midtown', note: 'High-rise rental cluster with new supply.' },
      { name: 'Buckhead', note: 'Higher-end district with luxury rental supply.' },
      { name: 'Old Fourth Ward', note: 'Walkable gentrifying district with new mid-rise rentals.' },
    ],
  },
  {
    name: 'Savannah',
    slug: 'savannah',
    state: 'Georgia',
    stateSlug: 'georgia',
    population: '150,000',
    rentalHouseholds: '~30,000',
    medianRent1BR: '$1,500',
    vacancyRate: '5.5%',
    marketNote:
      'Savannah\'s rental market combines tourism employment with the Hyundai Metaplant America project announced for nearby Bryan County. Historic District short-term rental supply has prompted city regulation.',
    areas: [
      { name: 'Historic District', note: 'Heritage stock with regulated short-term rental concentration.' },
      { name: 'Starland District', note: 'Walkable gentrifying area with character conversions.' },
      { name: 'Southside Savannah', note: 'Established residential with townhouse rentals.' },
    ],
  },
  {
    name: 'Augusta',
    slug: 'augusta',
    state: 'Georgia',
    stateSlug: 'georgia',
    population: '200,000',
    rentalHouseholds: '~40,000',
    medianRent1BR: '$1,100',
    vacancyRate: '5.5%',
    marketNote:
      'Augusta\'s rental market is anchored by Fort Eisenhower (formerly Fort Gordon) and the US Army Cyber Center of Excellence. The Masters Tournament creates significant short-term furnished rental demand each April.',
    areas: [
      { name: 'Downtown / Olde Town', note: 'Heritage stock with character-home conversions.' },
      { name: 'West Augusta', note: 'Established residential with townhouse rentals.' },
      { name: 'Fort Eisenhower area', note: 'Military-family rental concentration.' },
    ],
  },
  {
    name: 'Columbus',
    slug: 'columbus',
    state: 'Georgia',
    stateSlug: 'georgia',
    population: '200,000',
    rentalHouseholds: '~35,000',
    medianRent1BR: '$1,000',
    vacancyRate: '5.5%',
    marketNote:
      'Columbus borders Fort Moore (formerly Fort Benning), and military-family rental demand shapes much of the market. Aflac and TSYS provide corporate employment in downtown Columbus.',
    areas: [
      { name: 'Downtown / Uptown Columbus', note: 'Heritage stock with character-home rentals.' },
      { name: 'North Columbus', note: 'Established residential with detached rentals.' },
      { name: 'Fort Moore area', note: 'Military-family rental concentration.' },
    ],
  },
  {
    name: 'Macon',
    slug: 'macon',
    state: 'Georgia',
    stateSlug: 'georgia',
    population: '155,000',
    rentalHouseholds: '~28,000',
    medianRent1BR: '$950',
    vacancyRate: '6.0%',
    marketNote:
      'Macon-Bibb County combines historic district appeal with Mercer University anchor employment. Median rent is among the lowest of any Georgia metro.',
    areas: [
      { name: 'Downtown Macon', note: 'Heritage stock with character-home conversions.' },
      { name: 'Mercer Village', note: 'University catchment with student-oriented stock.' },
      { name: 'North Macon', note: 'Established residential with townhouse rentals.' },
    ],
  },

  // ─── North Carolina ───────────────────────────────────────────────────────
  {
    name: 'Charlotte',
    slug: 'charlotte',
    state: 'North Carolina',
    stateSlug: 'north-carolina',
    population: '895,000',
    rentalHouseholds: '~190,000',
    medianRent1BR: '$1,600',
    vacancyRate: '6.5%',
    marketNote:
      'Charlotte is the second-largest banking centre in the US after New York. Bank of America, Truist, and Wells Fargo headquarters operations anchor corporate rental demand.',
    areas: [
      { name: 'Uptown', note: 'High-rise rental cluster with new supply.' },
      { name: 'South End', note: 'Walkable rail-corridor district with newer mid-rise rentals.' },
      { name: 'NoDa', note: 'Walkable gentrifying district with character conversions.' },
    ],
  },
  {
    name: 'Raleigh',
    slug: 'raleigh',
    state: 'North Carolina',
    stateSlug: 'north-carolina',
    population: '470,000',
    rentalHouseholds: '~95,000',
    medianRent1BR: '$1,500',
    vacancyRate: '6.0%',
    marketNote:
      'Raleigh anchors the Research Triangle alongside Durham and Chapel Hill. NC State University, plus the Apple campus announced in 2021, drive tech-corridor rental demand.',
    areas: [
      { name: 'Downtown / Glenwood South', note: 'Walkable mid-rise rental cluster.' },
      { name: 'NC State area', note: 'University catchment with student-oriented stock.' },
      { name: 'North Hills', note: 'Mixed-use district with newer rental supply.' },
    ],
  },
  {
    name: 'Durham',
    slug: 'durham',
    state: 'North Carolina',
    stateSlug: 'north-carolina',
    population: '290,000',
    rentalHouseholds: '~60,000',
    medianRent1BR: '$1,400',
    vacancyRate: '6.0%',
    marketNote:
      'Durham combines Duke University catchment with the Research Triangle Park employment base. Rents have grown faster than the Raleigh median since 2020.',
    areas: [
      { name: 'Downtown Durham', note: 'Walkable mid-rise rental cluster with newer supply.' },
      { name: 'Duke area / Ninth Street', note: 'University catchment with character conversions.' },
      { name: 'South Durham', note: 'Established residential with townhouse rentals.' },
    ],
  },
  {
    name: 'Greensboro',
    slug: 'greensboro',
    state: 'North Carolina',
    stateSlug: 'north-carolina',
    population: '300,000',
    rentalHouseholds: '~60,000',
    medianRent1BR: '$1,100',
    vacancyRate: '6.0%',
    marketNote:
      'Greensboro anchors the Piedmont Triad with UNC Greensboro, NC A&T, and significant logistics employment. Median rent is meaningfully lower than the Charlotte or Raleigh markets.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock with newer mid-rise rental supply.' },
      { name: 'UNCG / A&T area', note: 'University catchment with student-oriented stock.' },
      { name: 'Adams Farm', note: 'Established residential with townhouse rentals.' },
    ],
  },
  {
    name: 'Winston-Salem',
    slug: 'winston-salem',
    state: 'North Carolina',
    stateSlug: 'north-carolina',
    population: '250,000',
    rentalHouseholds: '~50,000',
    medianRent1BR: '$1,050',
    vacancyRate: '6.0%',
    marketNote:
      'Winston-Salem combines Wake Forest University catchment with Atrium Health Wake Forest Baptist as the central employer. Median rent runs slightly below Greensboro.',
    areas: [
      { name: 'Downtown / Innovation Quarter', note: 'Walkable mid-rise rental district.' },
      { name: 'Ardmore', note: 'Established residential with character-home rentals.' },
      { name: 'Wake Forest area', note: 'University catchment with student-oriented stock.' },
    ],
  },

  // ─── Arizona ──────────────────────────────────────────────────────────────
  {
    name: 'Phoenix',
    slug: 'phoenix',
    state: 'Arizona',
    stateSlug: 'arizona',
    population: '1.65 million',
    rentalHouseholds: '~280,000',
    medianRent1BR: '$1,400',
    vacancyRate: '8.0%',
    marketNote:
      'Phoenix had one of the largest US rent inflations from 2020 to 2022 followed by one of the sharpest reversals as new supply came online. The TSMC semiconductor megafab is expected to reshape long-term demand.',
    areas: [
      { name: 'Downtown / Roosevelt Row', note: 'Walkable mid-rise rental cluster.' },
      { name: 'Arcadia', note: 'Established higher-end residential with detached rentals.' },
      { name: 'North Phoenix', note: 'Newer suburban community with townhouse rentals.' },
    ],
  },
  {
    name: 'Tucson',
    slug: 'tucson',
    state: 'Arizona',
    stateSlug: 'arizona',
    population: '545,000',
    rentalHouseholds: '~115,000',
    medianRent1BR: '$1,100',
    vacancyRate: '7.5%',
    marketNote:
      'Tucson is anchored by the University of Arizona and Raytheon Missile Systems. Median rent runs roughly 20% below Phoenix and vacancy is consistently higher.',
    areas: [
      { name: 'University area', note: 'Student-oriented rental concentration near the U of A.' },
      { name: 'Downtown / Sunshine Mile', note: 'Walkable mixed-use district with newer rental supply.' },
      { name: 'Foothills', note: 'Higher-end suburban residential with detached rentals.' },
    ],
  },
  {
    name: 'Mesa',
    slug: 'mesa',
    state: 'Arizona',
    stateSlug: 'arizona',
    population: '510,000',
    rentalHouseholds: '~85,000',
    medianRent1BR: '$1,350',
    vacancyRate: '8.0%',
    marketNote:
      'Mesa is the third-largest city in Arizona and absorbs Phoenix MSA spillover demand. Significant new master-planned community development around the Eastmark area has added supply.',
    areas: [
      { name: 'Downtown Mesa', note: 'Heritage stock plus newer mid-rise rental supply.' },
      { name: 'Eastmark', note: 'Master-planned community with townhouse rentals.' },
      { name: 'Dobson Ranch', note: 'Established residential with detached rentals.' },
    ],
  },
  {
    name: 'Scottsdale',
    slug: 'scottsdale',
    state: 'Arizona',
    stateSlug: 'arizona',
    population: '240,000',
    rentalHouseholds: '~40,000',
    medianRent1BR: '$1,800',
    vacancyRate: '7.5%',
    marketNote:
      'Scottsdale\'s rental market combines higher-end resort tourism with corporate housing for the Phoenix MSA. Old Town short-term rental supply has prompted active city regulation.',
    areas: [
      { name: 'Old Town Scottsdale', note: 'Walkable district with high short-term rental concentration.' },
      { name: 'North Scottsdale', note: 'Master-planned community with detached and townhouse rentals.' },
      { name: 'McCormick Ranch', note: 'Established master-planned community with townhouse stock.' },
    ],
  },
  {
    name: 'Chandler',
    slug: 'chandler',
    state: 'Arizona',
    stateSlug: 'arizona',
    population: '280,000',
    rentalHouseholds: '~45,000',
    medianRent1BR: '$1,500',
    vacancyRate: '7.0%',
    marketNote:
      'Chandler is a major tech corridor with Intel\'s Ocotillo campus and Northrop Grumman among others. Master-planned community development dominates rental supply.',
    areas: [
      { name: 'Downtown Chandler', note: 'Walkable historic district with mid-rise rental supply.' },
      { name: 'Ocotillo', note: 'Master-planned community with townhouse and detached rentals.' },
      { name: 'Sun Lakes', note: 'Adjacent age-restricted community with detached rental supply.' },
    ],
  },

  // ─── Colorado ─────────────────────────────────────────────────────────────
  {
    name: 'Denver',
    slug: 'denver',
    state: 'Colorado',
    stateSlug: 'colorado',
    population: '710,000',
    rentalHouseholds: '~155,000',
    medianRent1BR: '$1,750',
    vacancyRate: '6.5%',
    marketNote:
      'Denver has had one of the largest US rental construction pipelines for the past five years. Tech, energy, and federal employment anchor demand, and rents stabilized in 2024 after sharp 2021 to 2022 inflation.',
    areas: [
      { name: 'LoDo / Downtown', note: 'High-rise rental cluster with significant new supply.' },
      { name: 'RiNo', note: 'Walkable gentrifying district with new mid-rise rentals.' },
      { name: 'Capitol Hill', note: 'Established walkable district with character-home rentals.' },
    ],
  },
  {
    name: 'Colorado Springs',
    slug: 'colorado-springs',
    state: 'Colorado',
    stateSlug: 'colorado',
    population: '485,000',
    rentalHouseholds: '~75,000',
    medianRent1BR: '$1,400',
    vacancyRate: '6.5%',
    marketNote:
      'Colorado Springs is anchored by the US Air Force Academy, Fort Carson, and significant defense contractor employment. Median rent runs 20% below Denver.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock plus newer mid-rise rental supply.' },
      { name: 'Briargate', note: 'Master-planned community with townhouse rentals.' },
      { name: 'Old Colorado City', note: 'Walkable historic district with character-home stock.' },
    ],
  },
  {
    name: 'Aurora',
    slug: 'aurora-co',
    state: 'Colorado',
    stateSlug: 'colorado',
    population: '395,000',
    rentalHouseholds: '~65,000',
    medianRent1BR: '$1,500',
    vacancyRate: '6.5%',
    marketNote:
      'Aurora is the third-largest city in Colorado and absorbs significant Denver MSA spillover demand. The Anschutz Medical Campus is the city\'s largest employer.',
    areas: [
      { name: 'Anschutz Medical Campus area', note: 'Medical employment-driven rental supply.' },
      { name: 'Stapleton / Central Park', note: 'Master-planned community with townhouse rentals.' },
      { name: 'Original Aurora', note: 'Heritage neighbourhood with character-home rentals.' },
    ],
  },
  {
    name: 'Fort Collins',
    slug: 'fort-collins',
    state: 'Colorado',
    stateSlug: 'colorado',
    population: '170,000',
    rentalHouseholds: '~35,000',
    medianRent1BR: '$1,500',
    vacancyRate: '5.5%',
    marketNote:
      'Fort Collins is anchored by Colorado State University and significant tech employment (HP, Woodward). Student-renter share is among the highest in any Colorado city.',
    areas: [
      { name: 'Old Town', note: 'Walkable historic district with character conversions.' },
      { name: 'CSU area', note: 'Student-oriented rental concentration.' },
      { name: 'Southwest Fort Collins', note: 'Master-planned community with townhouse rentals.' },
    ],
  },
  {
    name: 'Boulder',
    slug: 'boulder',
    state: 'Colorado',
    stateSlug: 'colorado',
    population: '105,000',
    rentalHouseholds: '~25,000',
    medianRent1BR: '$2,200',
    vacancyRate: '5.0%',
    marketNote:
      'Boulder has one of the most restrictive zoning regimes among major US college towns. CU Boulder anchors student demand, and federal lab employment (NIST, NCAR) adds long-term corporate rental segments.',
    areas: [
      { name: 'University Hill', note: 'Student-oriented rental concentration near CU Boulder.' },
      { name: 'Downtown / Pearl Street', note: 'Walkable historic district with character-home rentals.' },
      { name: 'North Boulder', note: 'Established residential with detached rentals.' },
    ],
  },

  // ─── New Jersey ───────────────────────────────────────────────────────────
  {
    name: 'Newark',
    slug: 'newark',
    state: 'New Jersey',
    stateSlug: 'new-jersey',
    population: '305,000',
    rentalHouseholds: '~80,000',
    medianRent1BR: '$1,750',
    vacancyRate: '4.5%',
    marketNote:
      'Newark has the highest renter share of any major New Jersey city. PATH and NJ Transit access keeps demand tied to Manhattan employment cycles, and Rutgers Newark adds student rental volume.',
    areas: [
      { name: 'Downtown', note: 'Walkable mixed-use core with mid-rise rental supply.' },
      { name: 'Ironbound', note: 'Heritage Portuguese district with walk-up rental stock.' },
      { name: 'University Heights', note: 'Rutgers and NJIT catchment with student-oriented stock.' },
    ],
  },
  {
    name: 'Jersey City',
    slug: 'jersey-city',
    state: 'New Jersey',
    stateSlug: 'new-jersey',
    population: '290,000',
    rentalHouseholds: '~80,000',
    medianRent1BR: '$2,750',
    vacancyRate: '4.0%',
    marketNote:
      'Jersey City has the largest rental construction pipeline of any New Jersey city. PATH waterfront access has shifted significant Manhattan-bound rental demand across the river.',
    areas: [
      { name: 'Downtown / Newport', note: 'High-rise rental cluster with significant new supply.' },
      { name: 'Journal Square', note: 'PATH hub with newer mid-rise rental development.' },
      { name: 'The Heights', note: 'Established residential with character-home rentals.' },
    ],
  },
  {
    name: 'Paterson',
    slug: 'paterson',
    state: 'New Jersey',
    stateSlug: 'new-jersey',
    population: '160,000',
    rentalHouseholds: '~38,000',
    medianRent1BR: '$1,400',
    vacancyRate: '4.5%',
    marketNote:
      'Paterson has one of the most diverse immigrant populations in New Jersey and a high renter share. Industrial heritage building stock supports a meaningful affordable rental segment.',
    areas: [
      { name: 'Downtown / Riverside', note: 'Heritage stock with walk-up rental supply.' },
      { name: 'Hillcrest', note: 'Established residential with character-home rentals.' },
      { name: 'Eastside', note: 'Mid-density established district with townhouse stock.' },
    ],
  },
  {
    name: 'Elizabeth',
    slug: 'elizabeth',
    state: 'New Jersey',
    stateSlug: 'new-jersey',
    population: '135,000',
    rentalHouseholds: '~35,000',
    medianRent1BR: '$1,650',
    vacancyRate: '4.5%',
    marketNote:
      'Elizabeth combines the Port Newark-Elizabeth Marine Terminal industrial base with a high immigrant renter share. Newark Liberty Airport employment also anchors demand.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock with walk-up rental supply.' },
      { name: 'Elmora Hills', note: 'Established residential with character-home rentals.' },
      { name: 'North Elizabeth', note: 'Mid-density district with townhouse stock.' },
    ],
  },
  {
    name: 'Trenton',
    slug: 'trenton',
    state: 'New Jersey',
    stateSlug: 'new-jersey',
    population: '90,000',
    rentalHouseholds: '~22,000',
    medianRent1BR: '$1,250',
    vacancyRate: '5.0%',
    marketNote:
      'Trenton is the New Jersey state capital, with state government employment as the dominant anchor. Median rent runs meaningfully below the rest of the state.',
    areas: [
      { name: 'Downtown / Mill Hill', note: 'Heritage stock with character-home rentals.' },
      { name: 'Chambersburg', note: 'Established residential with walk-up rental supply.' },
      { name: 'Hiltonia', note: 'Higher-end residential with detached rentals.' },
    ],
  },

  // ─── Virginia ─────────────────────────────────────────────────────────────
  {
    name: 'Virginia Beach',
    slug: 'virginia-beach',
    state: 'Virginia',
    stateSlug: 'virginia',
    population: '460,000',
    rentalHouseholds: '~65,000',
    medianRent1BR: '$1,500',
    vacancyRate: '5.5%',
    marketNote:
      'Virginia Beach combines tourism employment, Naval Air Station Oceana, and coastal corporate housing demand. Hurricane risk and HOA prevalence shape operational decisions.',
    areas: [
      { name: 'Oceanfront', note: 'Beachfront short-term rental concentration.' },
      { name: 'Town Center', note: 'Mid-rise rental cluster with newer supply.' },
      { name: 'Kempsville', note: 'Established suburban residential with townhouse rentals.' },
    ],
  },
  {
    name: 'Richmond',
    slug: 'richmond',
    state: 'Virginia',
    stateSlug: 'virginia',
    population: '230,000',
    rentalHouseholds: '~55,000',
    medianRent1BR: '$1,450',
    vacancyRate: '5.0%',
    marketNote:
      'Richmond is the Virginia state capital and home to Virginia Commonwealth University. State government, VCU Health, and Capital One Financial anchor employment.',
    areas: [
      { name: 'The Fan', note: 'Heritage district with row-house rental conversions.' },
      { name: 'Scott\'s Addition', note: 'Adaptive-reuse warehouse district with new rental supply.' },
      { name: 'Church Hill', note: 'Walkable historic neighbourhood with character-home rentals.' },
    ],
  },
  {
    name: 'Arlington',
    slug: 'arlington-va',
    state: 'Virginia',
    stateSlug: 'virginia',
    population: '240,000',
    rentalHouseholds: '~65,000',
    medianRent1BR: '$2,300',
    vacancyRate: '5.0%',
    marketNote:
      'Arlington has the highest median household income of any Virginia jurisdiction and absorbs significant Washington DC employment overflow. Amazon HQ2 (National Landing) has shifted rental demand to Crystal City and Pentagon City.',
    areas: [
      { name: 'Crystal City / National Landing', note: 'Amazon HQ2-driven rental redevelopment.' },
      { name: 'Rosslyn / Courthouse', note: 'High-rise rental cluster along the Metro Orange Line.' },
      { name: 'Clarendon', note: 'Walkable mixed-use district with newer mid-rise rentals.' },
    ],
  },
  {
    name: 'Norfolk',
    slug: 'norfolk',
    state: 'Virginia',
    stateSlug: 'virginia',
    population: '235,000',
    rentalHouseholds: '~50,000',
    medianRent1BR: '$1,350',
    vacancyRate: '5.0%',
    marketNote:
      'Norfolk is home to Naval Station Norfolk, the largest naval base in the world. Military-family rental demand and Old Dominion University catchment shape most rental supply.',
    areas: [
      { name: 'Downtown / Ghent', note: 'Walkable historic district with character-home rentals.' },
      { name: 'ODU area', note: 'University catchment with student-oriented stock.' },
      { name: 'Ocean View', note: 'Beachfront residential with detached rentals.' },
    ],
  },
  {
    name: 'Alexandria',
    slug: 'alexandria',
    state: 'Virginia',
    stateSlug: 'virginia',
    population: '160,000',
    rentalHouseholds: '~40,000',
    medianRent1BR: '$1,900',
    vacancyRate: '5.0%',
    marketNote:
      'Alexandria sits across the Potomac from Washington DC and absorbs significant federal-employment rental demand. Old Town heritage stock plus newer Eisenhower Avenue corridor development shape supply.',
    areas: [
      { name: 'Old Town', note: 'Heritage stock with character-home rentals.' },
      { name: 'Eisenhower Avenue corridor', note: 'Newer mid-rise rental development.' },
      { name: 'Del Ray', note: 'Walkable established neighbourhood with townhouse stock.' },
    ],
  },

  // ─── Washington ───────────────────────────────────────────────────────────
  {
    name: 'Seattle',
    slug: 'seattle',
    state: 'Washington',
    stateSlug: 'washington',
    population: '755,000',
    rentalHouseholds: '~190,000',
    medianRent1BR: '$2,100',
    vacancyRate: '5.5%',
    marketNote:
      'Seattle is anchored by Amazon, Microsoft (in nearby Redmond), and the University of Washington. The Just Cause Eviction ordinance and the MHA inclusionary requirements shape much of the rental landscape.',
    areas: [
      { name: 'Downtown / South Lake Union', note: 'Amazon-anchored high-rise rental cluster.' },
      { name: 'Capitol Hill', note: 'Walkable district with character-home and mid-rise stock.' },
      { name: 'Ballard / Fremont', note: 'Walkable established neighbourhoods with townhouse rentals.' },
    ],
  },
  {
    name: 'Spokane',
    slug: 'spokane',
    state: 'Washington',
    stateSlug: 'washington',
    population: '230,000',
    rentalHouseholds: '~45,000',
    medianRent1BR: '$1,200',
    vacancyRate: '5.0%',
    marketNote:
      'Spokane is anchored by Gonzaga University, Washington State University Spokane, and significant medical employment. Median rent runs roughly 40% below Seattle.',
    areas: [
      { name: 'Downtown / Riverside', note: 'Heritage stock with newer mid-rise rental supply.' },
      { name: 'Gonzaga area', note: 'University catchment with student-oriented stock.' },
      { name: 'South Hill', note: 'Established residential with character-home rentals.' },
    ],
  },
  {
    name: 'Tacoma',
    slug: 'tacoma',
    state: 'Washington',
    stateSlug: 'washington',
    population: '220,000',
    rentalHouseholds: '~45,000',
    medianRent1BR: '$1,500',
    vacancyRate: '5.5%',
    marketNote:
      'Tacoma combines port industrial employment, Joint Base Lewis-McChord proximity, and significant Seattle MSA spillover demand. The Tacoma Tenant Protections initiative (Measure 1) shapes operational requirements.',
    areas: [
      { name: 'Downtown Tacoma', note: 'Walkable heritage district with mid-rise rental supply.' },
      { name: 'Stadium District', note: 'Walkable established neighbourhood with character-home rentals.' },
      { name: 'Hilltop', note: 'Gentrifying neighbourhood with character conversions.' },
    ],
  },
  {
    name: 'Vancouver',
    slug: 'vancouver-wa',
    state: 'Washington',
    stateSlug: 'washington',
    population: '195,000',
    rentalHouseholds: '~35,000',
    medianRent1BR: '$1,500',
    vacancyRate: '5.5%',
    marketNote:
      'Vancouver Washington sits across the Columbia River from Portland Oregon. Cross-river commuting and the lack of Washington state income tax draw professional renters from the Portland MSA.',
    areas: [
      { name: 'Downtown / Uptown Village', note: 'Walkable historic district with character-home rentals.' },
      { name: 'East Vancouver', note: 'Established residential with townhouse rentals.' },
      { name: 'Salmon Creek', note: 'Newer suburban community with townhouse rentals.' },
    ],
  },
  {
    name: 'Bellevue',
    slug: 'bellevue',
    state: 'Washington',
    stateSlug: 'washington',
    population: '150,000',
    rentalHouseholds: '~35,000',
    medianRent1BR: '$2,500',
    vacancyRate: '5.5%',
    marketNote:
      'Bellevue hosts Microsoft\'s second-largest US campus and significant Amazon expansion. Tech-corporate rental demand drives most new supply.',
    areas: [
      { name: 'Downtown Bellevue', note: 'High-rise rental cluster with newer supply.' },
      { name: 'Bridle Trails', note: 'Established residential with detached rentals.' },
      { name: 'Crossroads', note: 'Mid-rise rental cluster with diverse tenant base.' },
    ],
  },

  // ─── Nevada ───────────────────────────────────────────────────────────────
  {
    name: 'Las Vegas',
    slug: 'las-vegas',
    state: 'Nevada',
    stateSlug: 'nevada',
    population: '660,000',
    rentalHouseholds: '~135,000',
    medianRent1BR: '$1,400',
    vacancyRate: '7.0%',
    marketNote:
      'Las Vegas\'s rental market is shaped by hospitality and gaming employment plus significant California outmigration. Furnished and short-term rental supply runs higher than most US metros.',
    areas: [
      { name: 'Downtown / Arts District', note: 'Walkable district with newer mid-rise rental supply.' },
      { name: 'Summerlin', note: 'Master-planned community with townhouse and detached rentals.' },
      { name: 'Henderson border', note: 'Suburban residential with newer townhouse stock.' },
    ],
  },
  {
    name: 'Henderson',
    slug: 'henderson',
    state: 'Nevada',
    stateSlug: 'nevada',
    population: '335,000',
    rentalHouseholds: '~55,000',
    medianRent1BR: '$1,550',
    vacancyRate: '6.5%',
    marketNote:
      'Henderson is the second-largest city in Nevada and absorbs significant Las Vegas MSA spillover demand. Master-planned community development dominates the rental supply.',
    areas: [
      { name: 'Green Valley', note: 'Master-planned community with townhouse and detached rentals.' },
      { name: 'Anthem', note: 'Master-planned community with detached rental supply.' },
      { name: 'Downtown Henderson / Water Street', note: 'Heritage redevelopment district with mid-rise supply.' },
    ],
  },
  {
    name: 'Reno',
    slug: 'reno',
    state: 'Nevada',
    stateSlug: 'nevada',
    population: '270,000',
    rentalHouseholds: '~55,000',
    medianRent1BR: '$1,400',
    vacancyRate: '6.5%',
    marketNote:
      'Reno has shifted from a gaming-centric economy to a tech and logistics hub anchored by Tesla\'s Gigafactory and several data centres. Rental demand has tracked California outmigration.',
    areas: [
      { name: 'Midtown / Downtown', note: 'Walkable district with character-home and mid-rise rentals.' },
      { name: 'South Reno', note: 'Newer master-planned community with townhouse rentals.' },
      { name: 'UNR area', note: 'University of Nevada catchment with student-oriented stock.' },
    ],
  },
  {
    name: 'North Las Vegas',
    slug: 'north-las-vegas',
    state: 'Nevada',
    stateSlug: 'nevada',
    population: '270,000',
    rentalHouseholds: '~50,000',
    medianRent1BR: '$1,300',
    vacancyRate: '7.0%',
    marketNote:
      'North Las Vegas is a separately incorporated suburban city within the Las Vegas MSA. Master-planned community development around the I-15 corridor has absorbed significant Southern California outmigration.',
    areas: [
      { name: 'Aliante', note: 'Master-planned community with townhouse rentals.' },
      { name: 'Eldorado / Sun City Aliante', note: 'Master-planned residential with townhouse stock.' },
      { name: 'Downtown North Las Vegas', note: 'Heritage district with older walk-up rental supply.' },
    ],
  },
  {
    name: 'Sparks',
    slug: 'sparks',
    state: 'Nevada',
    stateSlug: 'nevada',
    population: '110,000',
    rentalHouseholds: '~22,000',
    medianRent1BR: '$1,300',
    vacancyRate: '6.5%',
    marketNote:
      'Sparks is adjacent to Reno and shares the same rental market dynamics. The Tahoe-Reno Industrial Center (home to Tesla\'s Gigafactory) is just east of Sparks and drives logistics employment demand.',
    areas: [
      { name: 'Victorian Square / Downtown', note: 'Walkable mixed-use district with mid-rise rental supply.' },
      { name: 'Sparks Heights', note: 'Established residential with detached rentals.' },
      { name: 'Spanish Springs', note: 'Newer suburban community with townhouse rentals.' },
    ],
  },

  // ─── Pennsylvania ─────────────────────────────────────────────────────────
  {
    name: 'Philadelphia',
    slug: 'philadelphia',
    state: 'Pennsylvania',
    stateSlug: 'pennsylvania',
    population: '1.55 million',
    rentalHouseholds: '~290,000',
    medianRent1BR: '$1,400',
    vacancyRate: '6.0%',
    marketNote:
      'Philadelphia has the largest rental market in Pennsylvania and the lowest median rent of any major US Northeast city. Penn, Temple, and Drexel anchor a meaningful student-renter segment.',
    areas: [
      { name: 'Center City', note: 'High-rise rental cluster with newer supply.' },
      { name: 'Northern Liberties / Fishtown', note: 'Walkable gentrifying district with character conversions.' },
      { name: 'University City', note: 'Penn and Drexel catchment with student-oriented stock.' },
    ],
  },
  {
    name: 'Pittsburgh',
    slug: 'pittsburgh',
    state: 'Pennsylvania',
    stateSlug: 'pennsylvania',
    population: '300,000',
    rentalHouseholds: '~65,000',
    medianRent1BR: '$1,250',
    vacancyRate: '5.5%',
    marketNote:
      'Pittsburgh has reinvented from steel to medicine, robotics, and education. UPMC, Carnegie Mellon University, and the University of Pittsburgh anchor employment and student rental demand.',
    areas: [
      { name: 'Downtown / Strip District', note: 'Heritage stock plus newer mid-rise rental supply.' },
      { name: 'Oakland', note: 'University catchment with student-oriented stock.' },
      { name: 'Shadyside / Squirrel Hill', note: 'Walkable established neighbourhoods with character-home rentals.' },
    ],
  },
  {
    name: 'Allentown',
    slug: 'allentown',
    state: 'Pennsylvania',
    stateSlug: 'pennsylvania',
    population: '125,000',
    rentalHouseholds: '~25,000',
    medianRent1BR: '$1,200',
    vacancyRate: '5.5%',
    marketNote:
      'Allentown anchors the Lehigh Valley and serves as a meaningful logistics and manufacturing hub. Recent industrial development around the Lehigh Valley International Airport has added employment.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock with newer mid-rise rental conversion.' },
      { name: 'West End', note: 'Established residential with character-home rentals.' },
      { name: 'South Side / Bethlehem border', note: 'Mid-density district with townhouse rentals.' },
    ],
  },
  {
    name: 'Erie',
    slug: 'erie',
    state: 'Pennsylvania',
    stateSlug: 'pennsylvania',
    population: '95,000',
    rentalHouseholds: '~20,000',
    medianRent1BR: '$850',
    vacancyRate: '6.0%',
    marketNote:
      'Erie has the lowest median rent of any major Pennsylvania city. Penn State Behrend, Mercyhurst University, and the GE Transportation legacy facility anchor employment.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock with older walk-up rentals.' },
      { name: 'Bayfront / Frontier', note: 'Lakefront redevelopment district with newer mid-rise rentals.' },
      { name: 'West Erie', note: 'Established residential with detached rentals.' },
    ],
  },
  {
    name: 'Reading',
    slug: 'reading',
    state: 'Pennsylvania',
    stateSlug: 'pennsylvania',
    population: '95,000',
    rentalHouseholds: '~22,000',
    medianRent1BR: '$1,000',
    vacancyRate: '6.0%',
    marketNote:
      'Reading has one of the largest Latino population shares of any Pennsylvania city. Logistics and manufacturing employment along the Route 222 corridor anchor demand.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock with walk-up rental supply.' },
      { name: 'Centre Park', note: 'Historic district with character-home rentals.' },
      { name: 'Northeast Reading', note: 'Established residential with detached and townhouse rentals.' },
    ],
  },

  // ─── Ohio ─────────────────────────────────────────────────────────────────
  {
    name: 'Columbus',
    slug: 'columbus',
    state: 'Ohio',
    stateSlug: 'ohio',
    population: '910,000',
    rentalHouseholds: '~205,000',
    medianRent1BR: '$1,200',
    vacancyRate: '5.5%',
    marketNote:
      'Columbus is the largest city in Ohio and home to Ohio State University. The Intel Ohio One semiconductor megafab and Honda EV investment have shifted long-term rental demand expectations.',
    areas: [
      { name: 'Short North', note: 'Walkable mixed-use district with newer mid-rise rental supply.' },
      { name: 'OSU area', note: 'University catchment with student-oriented stock.' },
      { name: 'German Village', note: 'Heritage district with character-home rentals.' },
    ],
  },
  {
    name: 'Cleveland',
    slug: 'cleveland',
    state: 'Ohio',
    stateSlug: 'ohio',
    population: '370,000',
    rentalHouseholds: '~95,000',
    medianRent1BR: '$1,050',
    vacancyRate: '6.5%',
    marketNote:
      'Cleveland\'s rental market is anchored by Cleveland Clinic, Case Western Reserve University, and major banking presence (Key Bank, Huntington). Median rent runs meaningfully below Columbus.',
    areas: [
      { name: 'Downtown / Warehouse District', note: 'Heritage stock with newer mid-rise rental conversion.' },
      { name: 'Ohio City / Tremont', note: 'Walkable gentrifying districts with character conversions.' },
      { name: 'University Circle', note: 'CWRU and Cleveland Clinic catchment.' },
    ],
  },
  {
    name: 'Cincinnati',
    slug: 'cincinnati',
    state: 'Ohio',
    stateSlug: 'ohio',
    population: '310,000',
    rentalHouseholds: '~75,000',
    medianRent1BR: '$1,100',
    vacancyRate: '6.0%',
    marketNote:
      'Cincinnati anchors Greater Cincinnati across the Ohio River and combines corporate headquarters (P&G, Kroger, Fifth Third) with University of Cincinnati student demand.',
    areas: [
      { name: 'Over-the-Rhine', note: 'Heritage district with extensive adaptive reuse rental supply.' },
      { name: 'Downtown / Banks', note: 'Newer mid-rise rental cluster along the riverfront.' },
      { name: 'Clifton', note: 'University of Cincinnati catchment with student-oriented stock.' },
    ],
  },
  {
    name: 'Toledo',
    slug: 'toledo',
    state: 'Ohio',
    stateSlug: 'ohio',
    population: '270,000',
    rentalHouseholds: '~55,000',
    medianRent1BR: '$850',
    vacancyRate: '7.0%',
    marketNote:
      'Toledo has one of the lowest median rents of any US major metro. The University of Toledo, ProMedica healthcare, and Jeep manufacturing anchor employment.',
    areas: [
      { name: 'Downtown / Warehouse District', note: 'Heritage stock with newer rental conversion.' },
      { name: 'Old West End', note: 'Heritage district with character-home rentals.' },
      { name: 'West Toledo', note: 'Established residential with detached rentals.' },
    ],
  },
  {
    name: 'Akron',
    slug: 'akron',
    state: 'Ohio',
    stateSlug: 'ohio',
    population: '190,000',
    rentalHouseholds: '~45,000',
    medianRent1BR: '$850',
    vacancyRate: '7.0%',
    marketNote:
      'Akron is anchored by the University of Akron, Akron Children\'s Hospital, and the legacy tire industry. Median rent runs among the lowest of any US major city.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock with newer rental redevelopment.' },
      { name: 'University Park / Akron U area', note: 'University catchment with student-oriented stock.' },
      { name: 'West Hill', note: 'Established residential with character-home rentals.' },
    ],
  },

  // ─── Michigan ─────────────────────────────────────────────────────────────
  {
    name: 'Detroit',
    slug: 'detroit',
    state: 'Michigan',
    stateSlug: 'michigan',
    population: '630,000',
    rentalHouseholds: '~145,000',
    medianRent1BR: '$1,200',
    vacancyRate: '6.5%',
    marketNote:
      'Detroit\'s downtown and Midtown have seen significant rental redevelopment over the past decade. Wayne State University and Henry Ford Health anchor stable demand alongside the automotive industry.',
    areas: [
      { name: 'Downtown / Greektown', note: 'Heritage stock plus newer mid-rise rental conversion.' },
      { name: 'Midtown / WSU area', note: 'Walkable district with student-oriented stock.' },
      { name: 'Corktown', note: 'Walkable gentrifying district with character conversions.' },
    ],
  },
  {
    name: 'Grand Rapids',
    slug: 'grand-rapids',
    state: 'Michigan',
    stateSlug: 'michigan',
    population: '200,000',
    rentalHouseholds: '~40,000',
    medianRent1BR: '$1,250',
    vacancyRate: '5.5%',
    marketNote:
      'Grand Rapids combines significant medical employment (Spectrum Health, Mercy Health) with furniture manufacturing legacy companies (Steelcase, Haworth, Herman Miller). Median rent has grown faster than the Michigan median.',
    areas: [
      { name: 'Downtown / Heartside', note: 'Walkable heritage district with mid-rise rental supply.' },
      { name: 'East Hills', note: 'Walkable established neighbourhood with character-home rentals.' },
      { name: 'Wealthy Street', note: 'Walkable mixed-use corridor with character conversions.' },
    ],
  },
  {
    name: 'Warren',
    slug: 'warren',
    state: 'Michigan',
    stateSlug: 'michigan',
    population: '140,000',
    rentalHouseholds: '~25,000',
    medianRent1BR: '$1,100',
    vacancyRate: '6.0%',
    marketNote:
      'Warren is one of Detroit\'s largest northern suburbs and home to the General Motors Technical Center plus the US Army Detroit Arsenal. Automotive engineering employment anchors demand.',
    areas: [
      { name: 'Central Warren', note: 'Established residential with townhouse and detached rentals.' },
      { name: 'South Warren', note: 'Older established district with walk-up rental supply.' },
      { name: 'North Warren', note: 'Newer suburban community with detached rentals.' },
    ],
  },
  {
    name: 'Sterling Heights',
    slug: 'sterling-heights',
    state: 'Michigan',
    stateSlug: 'michigan',
    population: '135,000',
    rentalHouseholds: '~22,000',
    medianRent1BR: '$1,250',
    vacancyRate: '5.5%',
    marketNote:
      'Sterling Heights is a Detroit-area suburb anchored by automotive supplier employment. The Stellantis Sterling Heights Assembly Plant and several large engineering centres support stable long-term demand.',
    areas: [
      { name: 'Central Sterling Heights', note: 'Established residential with townhouse rentals.' },
      { name: 'South Sterling Heights', note: 'Mid-density established district with detached rentals.' },
      { name: 'North Sterling Heights', note: 'Newer suburban community with townhouse stock.' },
    ],
  },
  {
    name: 'Ann Arbor',
    slug: 'ann-arbor',
    state: 'Michigan',
    stateSlug: 'michigan',
    population: '125,000',
    rentalHouseholds: '~35,000',
    medianRent1BR: '$1,650',
    vacancyRate: '4.5%',
    marketNote:
      'Ann Arbor is home to the University of Michigan and has one of the lowest vacancy rates in Michigan. Student-renter share is the highest of any city in the state.',
    areas: [
      { name: 'Central Campus / Downtown', note: 'Student-oriented rental concentration.' },
      { name: 'Burns Park', note: 'Established residential with character-home rentals.' },
      { name: 'North Campus area', note: 'Engineering school catchment with newer rental supply.' },
    ],
  },

  // ─── Massachusetts ────────────────────────────────────────────────────────
  {
    name: 'Boston',
    slug: 'boston',
    state: 'Massachusetts',
    stateSlug: 'massachusetts',
    population: '675,000',
    rentalHouseholds: '~200,000',
    medianRent1BR: '$3,100',
    vacancyRate: '4.0%',
    marketNote:
      'Boston has the highest renter share of any US major city outside New York. 35+ universities and a massive medical employment base anchor demand. The September 1 move-in cycle dominates the rental calendar.',
    areas: [
      { name: 'Back Bay / South End', note: 'Heritage stock with character-home rentals.' },
      { name: 'Allston / Brighton', note: 'Student-oriented rental concentration.' },
      { name: 'Seaport District', note: 'Newer high-rise rental cluster with significant supply.' },
    ],
  },
  {
    name: 'Worcester',
    slug: 'worcester',
    state: 'Massachusetts',
    stateSlug: 'massachusetts',
    population: '210,000',
    rentalHouseholds: '~50,000',
    medianRent1BR: '$1,650',
    vacancyRate: '4.5%',
    marketNote:
      'Worcester is the second-largest city in New England and home to 14 colleges and universities. UMass Memorial Health and WPI anchor employment and student rental demand.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock with newer mid-rise rental conversion.' },
      { name: 'Main South / WPI area', note: 'University catchment with student-oriented stock.' },
      { name: 'Burncoat', note: 'Established residential with three-decker rentals.' },
    ],
  },
  {
    name: 'Springfield',
    slug: 'springfield',
    state: 'Massachusetts',
    stateSlug: 'massachusetts',
    population: '155,000',
    rentalHouseholds: '~38,000',
    medianRent1BR: '$1,200',
    vacancyRate: '5.0%',
    marketNote:
      'Springfield is the largest city in western Massachusetts and home to MGM Springfield, Baystate Health, and several colleges. Median rent runs meaningfully below Boston.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock with newer mid-rise rental conversion.' },
      { name: 'Forest Park', note: 'Established residential with character-home rentals.' },
      { name: 'Sixteen Acres', note: 'Suburban residential with detached and townhouse rentals.' },
    ],
  },
  {
    name: 'Cambridge',
    slug: 'cambridge-ma',
    state: 'Massachusetts',
    stateSlug: 'massachusetts',
    population: '120,000',
    rentalHouseholds: '~45,000',
    medianRent1BR: '$3,000',
    vacancyRate: '4.0%',
    marketNote:
      'Cambridge is home to Harvard, MIT, and the Kendall Square biotech cluster. Rental supply is dominated by triple-deckers and newer mid-rise development around the Red Line.',
    areas: [
      { name: 'Kendall Square / MIT', note: 'Tech-corporate rental cluster.' },
      { name: 'Harvard Square', note: 'Student-oriented rental concentration.' },
      { name: 'Central Square', note: 'Walkable mixed-use district with character-home rentals.' },
    ],
  },
  {
    name: 'Lowell',
    slug: 'lowell',
    state: 'Massachusetts',
    stateSlug: 'massachusetts',
    population: '115,000',
    rentalHouseholds: '~28,000',
    medianRent1BR: '$1,800',
    vacancyRate: '4.5%',
    marketNote:
      'Lowell sits north of Boston on the Merrimack River and is anchored by UMass Lowell plus extensive mill-building adaptive reuse. Commuter rail access connects to Boston.',
    areas: [
      { name: 'Downtown / Mills', note: 'Adaptive-reuse rental cluster in historic mill buildings.' },
      { name: 'UMass Lowell area', note: 'University catchment with student-oriented stock.' },
      { name: 'Highlands', note: 'Established residential with three-decker rentals.' },
    ],
  },

  // ─── Tennessee ────────────────────────────────────────────────────────────
  {
    name: 'Nashville',
    slug: 'nashville',
    state: 'Tennessee',
    stateSlug: 'tennessee',
    population: '680,000',
    rentalHouseholds: '~135,000',
    medianRent1BR: '$1,650',
    vacancyRate: '6.5%',
    marketNote:
      'Nashville had one of the largest rent inflations of any US metro from 2020 to 2022, followed by significant new supply that has shifted vacancy upward. Music tourism, healthcare, and Vanderbilt anchor demand.',
    areas: [
      { name: 'Downtown / The Gulch', note: 'High-rise rental cluster with newer supply.' },
      { name: 'East Nashville', note: 'Walkable gentrifying district with character conversions.' },
      { name: '12 South', note: 'Walkable mixed-use district with townhouse rentals.' },
    ],
  },
  {
    name: 'Memphis',
    slug: 'memphis',
    state: 'Tennessee',
    stateSlug: 'tennessee',
    population: '630,000',
    rentalHouseholds: '~125,000',
    medianRent1BR: '$1,050',
    vacancyRate: '7.0%',
    marketNote:
      'Memphis has the lowest median rent of any major Tennessee city and one of the highest single-family rental investor concentrations in the country. FedEx hub employment anchors demand.',
    areas: [
      { name: 'Downtown / South Main', note: 'Heritage stock with mid-rise rental conversion.' },
      { name: 'Midtown / Cooper-Young', note: 'Walkable district with character-home rentals.' },
      { name: 'East Memphis', note: 'Established residential with detached rentals.' },
    ],
  },
  {
    name: 'Knoxville',
    slug: 'knoxville',
    state: 'Tennessee',
    stateSlug: 'tennessee',
    population: '195,000',
    rentalHouseholds: '~45,000',
    medianRent1BR: '$1,250',
    vacancyRate: '5.5%',
    marketNote:
      'Knoxville is anchored by the University of Tennessee and Oak Ridge National Laboratory. Student-renter share is among the highest in any Tennessee city.',
    areas: [
      { name: 'Downtown / Old City', note: 'Heritage stock with newer mid-rise rental conversion.' },
      { name: 'UT area', note: 'University catchment with student-oriented stock.' },
      { name: 'Bearden', note: 'Established residential with character-home rentals.' },
    ],
  },
  {
    name: 'Chattanooga',
    slug: 'chattanooga',
    state: 'Tennessee',
    stateSlug: 'tennessee',
    population: '185,000',
    rentalHouseholds: '~40,000',
    medianRent1BR: '$1,200',
    vacancyRate: '5.5%',
    marketNote:
      'Chattanooga has reinvented from manufacturing legacy to a tech-friendly mid-size metro. The city-owned EPB fiber network has attracted remote workers and tech employers.',
    areas: [
      { name: 'Downtown / Northshore', note: 'Walkable mixed-use district with mid-rise rental supply.' },
      { name: 'Southside / Main Street', note: 'Walkable gentrifying district with character conversions.' },
      { name: 'St. Elmo', note: 'Walkable established neighbourhood with character-home rentals.' },
    ],
  },
  {
    name: 'Clarksville',
    slug: 'clarksville',
    state: 'Tennessee',
    stateSlug: 'tennessee',
    population: '180,000',
    rentalHouseholds: '~38,000',
    medianRent1BR: '$1,100',
    vacancyRate: '6.0%',
    marketNote:
      'Clarksville sits adjacent to Fort Campbell (a major Army installation on the Kentucky-Tennessee border). Military-family rental demand shapes most of the market.',
    areas: [
      { name: 'Downtown / Riverside', note: 'Heritage stock with newer mid-rise rental supply.' },
      { name: 'Sango', note: 'Newer suburban community with detached rentals.' },
      { name: 'Fort Campbell area', note: 'Military-family rental concentration with BAH-aligned pricing.' },
    ],
  },
]

export const usCityBySlug = (citySlug: string, stateSlug: string) =>
  usCities.find((c) => c.slug === citySlug && c.stateSlug === stateSlug)
