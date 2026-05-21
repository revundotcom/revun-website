/**
 * Canadian city data for /ca/[province]/[city] pages.
 *
 * Each city record carries the facts that make the page unique:
 *   - population & rental household count
 *   - median 1BR rent + vacancy rate
 *   - 2-3 distinctive area/neighbourhood names with one-line context
 *   - one market note (1-2 sentences) that ties to the local rental dynamic
 *
 * Province-level regulatory copy lives in the province template; city pages
 * inherit that and layer the local market context on top.
 */

export interface CaCityRecord {
  name: string
  slug: string
  province: string
  provinceSlug: string
  population: string
  rentalHouseholds: string
  medianRent1BR: string
  vacancyRate: string
  marketNote: string
  areas: { name: string; note: string }[]
}

export const caCities: CaCityRecord[] = [
  // ─── Ontario ──────────────────────────────────────────────────────────────
  {
    name: 'Toronto',
    slug: 'toronto',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '2.93 million',
    rentalHouseholds: '~470,000',
    medianRent1BR: '$2,500',
    vacancyRate: '1.4%',
    marketNote:
      'Toronto draws disproportionate immigration and interprovincial migration, keeping rental demand structurally high. Downtown condo units dominate new stock while purpose-built rental remains undersupplied.',
    areas: [
      { name: 'Downtown Core', note: 'Condo towers and purpose-built rentals; tenants skew young professional and international.' },
      { name: 'North York', note: 'Suburban feel with strong transit access along the Yonge subway corridor.' },
      { name: 'Scarborough', note: 'Most affordable submarket within Toronto proper; large long-term tenant base.' },
      { name: 'Etobicoke', note: 'Waterfront access and mid-rise stock; tenants seeking more space at lower price points than the core.' },
    ],
  },
  {
    name: 'Mississauga',
    slug: 'mississauga',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '742,000',
    rentalHouseholds: '~85,000',
    medianRent1BR: '$2,250',
    vacancyRate: '1.5%',
    marketNote:
      'Anchored by Square One and Pearson Airport, Mississauga has built more high-rise rental stock per capita than almost any GTA suburb. Condo investors own a meaningful share of the rental supply.',
    areas: [
      { name: 'City Centre', note: 'High-rise condo cluster around Square One; investor-owned rentals dominate.' },
      { name: 'Port Credit', note: 'Waterfront mixed-use redevelopment with newer purpose-built rental supply.' },
      { name: 'Streetsville', note: 'Heritage village core surrounded by mid-rise rental and townhomes.' },
    ],
  },
  {
    name: 'Brampton',
    slug: 'brampton',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '700,000',
    rentalHouseholds: '~65,000',
    medianRent1BR: '$2,000',
    vacancyRate: '1.7%',
    marketNote:
      'One of the fastest-growing cities in Canada with a high share of secondary suites in detached homes. Basement apartment compliance is a recurring issue for owners and the City has an active rental registration program.',
    areas: [
      { name: 'Downtown Brampton', note: 'Older stock plus growing transit-oriented redevelopment.' },
      { name: 'Mount Pleasant', note: 'Newer master-planned community with high investor ownership.' },
      { name: 'Bramalea', note: 'Established neighbourhood with significant townhouse and walk-up rental stock.' },
    ],
  },
  {
    name: 'Hamilton',
    slug: 'hamilton',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '590,000',
    rentalHouseholds: '~80,000',
    medianRent1BR: '$1,800',
    vacancyRate: '2.1%',
    marketNote:
      'Hamilton has seen the largest rent inflation of any Ontario CMA since 2018 as Toronto renters move west. The city has an active landlord licensing pilot and a strong tenant advocacy presence at the LTB.',
    areas: [
      { name: 'Downtown / Corktown', note: 'Heritage stock plus newer infill condos; tenant base mixes professionals and students.' },
      { name: 'Westdale', note: 'McMaster University catchment; bedroom-style rental demand year-round.' },
      { name: 'Stoney Creek', note: 'Suburban East Hamilton with newer townhouse and mid-rise rental supply.' },
    ],
  },
  {
    name: 'Ottawa',
    slug: 'ottawa',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '1.05 million',
    rentalHouseholds: '~155,000',
    medianRent1BR: '$1,950',
    vacancyRate: '2.1%',
    marketNote:
      'Federal government employment stabilizes long-term rental demand. Ottawa has a meaningful furnished/corporate rental segment tied to ministerial postings and contractor work.',
    areas: [
      { name: 'Centretown', note: 'High-density rental between Parliament Hill and the Glebe; long-tenured units below market.' },
      { name: 'ByWard Market / Sandy Hill', note: 'University of Ottawa catchment plus tourism-driven short-term demand.' },
      { name: 'Kanata', note: 'Tech corridor in the west end with corporate housing demand from Shopify, Nokia and others.' },
    ],
  },
  {
    name: 'London',
    slug: 'london',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '425,000',
    rentalHouseholds: '~55,000',
    medianRent1BR: '$1,650',
    vacancyRate: '2.2%',
    marketNote:
      'Western University and Fanshawe College drive a large student rental segment that pushes peak demand from June to September. London also has a residential rental licensing bylaw covering several neighbourhoods.',
    areas: [
      { name: 'Downtown', note: 'High-rise condo and purpose-built rental stock; professional and student mix.' },
      { name: 'Old North', note: 'Heritage homes near Western, many converted to student suites.' },
      { name: 'Masonville', note: 'North London suburban district with newer townhouse and walk-up supply.' },
    ],
  },
  {
    name: 'Vaughan',
    slug: 'vaughan',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '335,000',
    rentalHouseholds: '~28,000',
    medianRent1BR: '$2,300',
    vacancyRate: '1.4%',
    marketNote:
      'The Vaughan Metropolitan Centre subway extension has anchored a cluster of new condo and purpose-built rental towers. Outside the VMC, most rentals are basement suites in detached homes.',
    areas: [
      { name: 'Vaughan Metropolitan Centre', note: 'New rental towers around the TTC terminus.' },
      { name: 'Woodbridge', note: 'Established detached-home neighbourhood with high secondary-suite rental stock.' },
      { name: 'Maple', note: 'Family-oriented community with townhouse and condo rental supply.' },
    ],
  },
  {
    name: 'Markham',
    slug: 'markham',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '350,000',
    rentalHouseholds: '~30,000',
    medianRent1BR: '$2,250',
    vacancyRate: '1.5%',
    marketNote:
      'Tech employment around Highway 404 anchors a corporate rental segment. The city has one of the highest condo-to-purpose-built rental ratios in the GTA.',
    areas: [
      { name: 'Unionville', note: 'Heritage village core plus higher-end condo and townhouse supply.' },
      { name: 'Cornell', note: 'New-urbanist community with row housing and accessory unit rentals.' },
      { name: 'Markham Centre', note: 'Mid-rise rental towers near Highway 7 transit corridor.' },
    ],
  },
  {
    name: 'Richmond Hill',
    slug: 'richmond-hill',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '200,000',
    rentalHouseholds: '~18,000',
    medianRent1BR: '$2,200',
    vacancyRate: '1.6%',
    marketNote:
      'A high-income suburb on Yonge Street with a mature condo market along the subway extension alignment. Most non-condo rental stock is secondary suites in detached homes.',
    areas: [
      { name: 'Yonge & 16th', note: 'High-rise condo cluster anchoring future subway access.' },
      { name: 'Oak Ridges', note: 'North Richmond Hill detached community with high secondary-suite share.' },
      { name: 'Bayview & Major Mac', note: 'Established townhouse and mid-rise pockets.' },
    ],
  },
  {
    name: 'Oakville',
    slug: 'oakville',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '215,000',
    rentalHouseholds: '~15,000',
    medianRent1BR: '$2,150',
    vacancyRate: '1.8%',
    marketNote:
      'High-income community west of Toronto with limited multifamily supply. Most rentals are detached or townhouse units owned by individual investors.',
    areas: [
      { name: 'Downtown Oakville', note: 'Heritage stock plus newer condo redevelopment along Lakeshore Road.' },
      { name: 'Bronte', note: 'Lakefront village core with growing condo supply.' },
      { name: 'Glen Abbey', note: 'Established detached neighbourhood with townhouse rental pockets.' },
    ],
  },
  {
    name: 'Burlington',
    slug: 'burlington',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '190,000',
    rentalHouseholds: '~20,000',
    medianRent1BR: '$1,950',
    vacancyRate: '1.9%',
    marketNote:
      'Burlington sits at the Halton-Hamilton border and draws renters priced out of Oakville plus Hamilton-area professionals. Downtown intensification has added meaningful condo rental supply.',
    areas: [
      { name: 'Downtown Burlington', note: 'Lakeshore condo cluster with growing rental investor ownership.' },
      { name: 'Aldershot', note: 'Transit-served pocket with redevelopment along Plains Road.' },
      { name: 'Alton Village', note: 'Newer master-planned community with townhouse rentals.' },
    ],
  },
  {
    name: 'Kitchener',
    slug: 'kitchener',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '275,000',
    rentalHouseholds: '~40,000',
    medianRent1BR: '$1,750',
    vacancyRate: '2.0%',
    marketNote:
      'The Waterloo Region tech corridor and the ION light rail line have triggered the largest rental construction wave in the city in 30 years. Tech employment from Google, Shopify and others anchors corporate demand.',
    areas: [
      { name: 'Downtown / Innovation District', note: 'New mid-rise rental towers along the ION line.' },
      { name: 'Belmont Village', note: 'Walkable secondary node with heritage stock and infill.' },
      { name: 'Doon', note: 'South Kitchener suburban community with townhouse rental supply.' },
    ],
  },
  {
    name: 'Waterloo',
    slug: 'waterloo',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '125,000',
    rentalHouseholds: '~25,000',
    medianRent1BR: '$1,800',
    vacancyRate: '2.3%',
    marketNote:
      'University of Waterloo and Wilfrid Laurier University drive a per-bed leasing market with very high seasonal turnover. Co-op terms reset the rental cycle four times per year, not just September.',
    areas: [
      { name: 'University District', note: 'Purpose-built student housing towers and converted heritage rentals.' },
      { name: 'Uptown Waterloo', note: 'Walkable retail core with mixed-use mid-rise stock.' },
      { name: 'Lakeshore', note: 'Quieter family-oriented neighbourhoods with townhouse rentals.' },
    ],
  },
  {
    name: 'Cambridge',
    slug: 'cambridge',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '140,000',
    rentalHouseholds: '~17,000',
    medianRent1BR: '$1,650',
    vacancyRate: '2.1%',
    marketNote:
      'Cambridge is the most affordable of the three Waterloo Region cities and has absorbed significant rental demand spillover from Kitchener-Waterloo. Manufacturing and logistics employment anchors year-round demand.',
    areas: [
      { name: 'Galt', note: 'Heritage downtown core with stone-front conversions and infill mid-rise.' },
      { name: 'Preston', note: 'Mixed industrial-residential pocket with affordable rental stock.' },
      { name: 'Hespeler', note: 'Established village core with townhouse and detached secondary suites.' },
    ],
  },
  {
    name: 'Guelph',
    slug: 'guelph',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '145,000',
    rentalHouseholds: '~20,000',
    medianRent1BR: '$1,700',
    vacancyRate: '1.9%',
    marketNote:
      'University of Guelph drives student rental demand, while the city is also a meaningful manufacturing centre (Linamar, Cargill). Vacancy has run below the Ontario median for most of the past decade.',
    areas: [
      { name: 'Downtown Guelph', note: 'Heritage stock plus newer mid-rise infill.' },
      { name: 'South End', note: 'University catchment with house-share rental conversions.' },
      { name: 'East End', note: 'Established residential with townhouse rental pockets.' },
    ],
  },
  {
    name: 'Barrie',
    slug: 'barrie',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '155,000',
    rentalHouseholds: '~16,000',
    medianRent1BR: '$1,700',
    vacancyRate: '2.0%',
    marketNote:
      'GO Transit access to Toronto has anchored a commuter-renter segment in Barrie. The city has seen significant detached-home conversion to secondary suites since 2020.',
    areas: [
      { name: 'Downtown / Lakeshore', note: 'Newer mid-rise rentals overlooking Kempenfelt Bay.' },
      { name: 'South Barrie', note: 'Newer subdivisions with townhouse and basement suite rentals.' },
      { name: 'Allandale', note: 'Heritage stock near the GO station.' },
    ],
  },
  {
    name: 'Milton',
    slug: 'milton',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '135,000',
    rentalHouseholds: '~9,000',
    medianRent1BR: '$2,000',
    vacancyRate: '1.6%',
    marketNote:
      'Milton has been one of the fastest-growing municipalities in Canada for two decades. Most rental supply is secondary suites in newer detached homes; purpose-built rental is still emerging.',
    areas: [
      { name: 'Old Milton', note: 'Heritage core with limited rental supply.' },
      { name: 'Beaty / Bronte Meadows', note: 'Newer suburban detached communities with high secondary-suite share.' },
      { name: 'Boyne / Cobban', note: 'Newest growth area with townhouse and condo apartment rental supply.' },
    ],
  },
  {
    name: 'Oshawa',
    slug: 'oshawa',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '180,000',
    rentalHouseholds: '~25,000',
    medianRent1BR: '$1,700',
    vacancyRate: '2.2%',
    marketNote:
      'Ontario Tech University and Durham College anchor a meaningful student rental market. The legacy GM auto plant has been succeeded by EV-related employment that continues to drive long-term demand.',
    areas: [
      { name: 'Downtown Oshawa', note: 'Heritage stock and newer condo redevelopment.' },
      { name: 'North Oshawa', note: 'University catchment with house-share conversions.' },
      { name: 'South Oshawa', note: 'Lakefront industrial-residential mix with affordable stock.' },
    ],
  },
  {
    name: 'Ajax',
    slug: 'ajax',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '135,000',
    rentalHouseholds: '~11,000',
    medianRent1BR: '$1,950',
    vacancyRate: '1.7%',
    marketNote:
      'Ajax sits on the GO Lakeshore East commuter line and draws Toronto-bound professionals. Most rental supply is in newer townhouse complexes and secondary suites.',
    areas: [
      { name: 'South Ajax', note: 'Lakefront detached community with high secondary-suite share.' },
      { name: 'Central Ajax', note: 'GO station catchment with newer townhouse rentals.' },
      { name: 'North Ajax', note: 'Newest subdivisions with limited established rental supply.' },
    ],
  },
  {
    name: 'Pickering',
    slug: 'pickering',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '100,000',
    rentalHouseholds: '~10,000',
    medianRent1BR: '$1,950',
    vacancyRate: '1.7%',
    marketNote:
      'Pickering is the gateway between Toronto and Durham Region. The waterfront condo cluster and the future Durham Live development have shaped most new rental supply.',
    areas: [
      { name: 'Pickering City Centre', note: 'High-rise condo cluster at the GO station.' },
      { name: 'Bay Ridges', note: 'Lakefront detached community with mature secondary-suite stock.' },
      { name: 'Brougham / North Pickering', note: 'Emerging growth area, limited current rental supply.' },
    ],
  },
  {
    name: 'Whitby',
    slug: 'whitby',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '140,000',
    rentalHouseholds: '~12,000',
    medianRent1BR: '$1,900',
    vacancyRate: '1.8%',
    marketNote:
      'Whitby has historically been a commuter community, and the GO Lakeshore East line keeps demand tied to Toronto employment cycles. Recent town centre intensification has added condo rental supply.',
    areas: [
      { name: 'Downtown Whitby', note: 'Heritage stock plus newer mid-rise rentals.' },
      { name: 'Brooklin', note: 'North Whitby village community with townhouse and detached rentals.' },
      { name: 'Port Whitby', note: 'Lakefront mixed-use redevelopment.' },
    ],
  },
  {
    name: 'St. Catharines',
    slug: 'st-catharines',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '140,000',
    rentalHouseholds: '~22,000',
    medianRent1BR: '$1,650',
    vacancyRate: '2.2%',
    marketNote:
      'Brock University and Niagara College drive student demand, while wine-region tourism supports a furnished and short-term rental segment. Pandemic-era price growth has stabilized.',
    areas: [
      { name: 'Downtown St. Catharines', note: 'Heritage stock plus FirstOntario Performing Arts Centre catchment.' },
      { name: 'North End', note: 'Lakefront detached and townhouse community.' },
      { name: 'Glenridge', note: 'Brock University catchment with student-oriented rental supply.' },
    ],
  },
  {
    name: 'Niagara Falls',
    slug: 'niagara-falls',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '95,000',
    rentalHouseholds: '~14,000',
    medianRent1BR: '$1,550',
    vacancyRate: '2.4%',
    marketNote:
      'Tourism and hospitality employment drives a meaningful seasonal furnished rental segment. The city has worked to expand long-term rental supply through inclusionary zoning around the GO station.',
    areas: [
      { name: 'Tourist District', note: 'Furnished and short-term rental concentration near the Falls.' },
      { name: 'Stamford Centre', note: 'Established residential with detached and townhouse rentals.' },
      { name: 'Chippawa', note: 'South Niagara Falls community with lower-density rental stock.' },
    ],
  },
  {
    name: 'Kingston',
    slug: 'kingston',
    province: 'Ontario',
    provinceSlug: 'ontario',
    population: '135,000',
    rentalHouseholds: '~22,000',
    medianRent1BR: '$1,650',
    vacancyRate: '2.0%',
    marketNote:
      'Queen\'s University is the central rental demand driver, and Kingston has one of the highest student-renter shares in Ontario. CFB Kingston also supports a long-term military-family rental segment.',
    areas: [
      { name: 'University District (Sydenham Ward)', note: 'Dense student rental conversions in heritage stock.' },
      { name: 'Downtown', note: 'Mid-rise rentals and condos near Kingston Harbour.' },
      { name: 'West End', note: 'Suburban detached community with secondary suites.' },
    ],
  },

  // ─── British Columbia ─────────────────────────────────────────────────────
  {
    name: 'Vancouver',
    slug: 'vancouver',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    population: '675,000',
    rentalHouseholds: '~155,000',
    medianRent1BR: '$2,800',
    vacancyRate: '0.9%',
    marketNote:
      'Vancouver\'s sub-1% vacancy rate is structural, not cyclical. Constrained geography, restrictive zoning, and sustained immigration have kept vacancy near or below 1% for most of the past decade.',
    areas: [
      { name: 'Downtown / West End', note: 'Densest rental market in BC; long-tenured units pay well below current market.' },
      { name: 'Kitsilano', note: 'Beach proximity and walkable retail; tenants pay a lifestyle premium.' },
      { name: 'East Vancouver', note: 'Most supply-diverse submarket: detached suites, laneway houses, co-ops, mid-rise.' },
      { name: 'Mount Pleasant', note: 'Rapidly gentrifying district along the Broadway corridor.' },
    ],
  },
  {
    name: 'Burnaby',
    slug: 'burnaby',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    population: '250,000',
    rentalHouseholds: '~35,000',
    medianRent1BR: '$2,400',
    vacancyRate: '1.0%',
    marketNote:
      'Metrotown and Brentwood are high-density rental hubs with extensive SkyTrain access. Burnaby has its own business licensing requirements for rental operators.',
    areas: [
      { name: 'Metrotown', note: 'High-rise rental cluster around the SkyTrain interchange.' },
      { name: 'Brentwood', note: 'Newest rental tower concentration along the Millennium Line.' },
      { name: 'Burnaby Heights', note: 'Established detached community with secondary-suite stock.' },
    ],
  },
  {
    name: 'Surrey',
    slug: 'surrey',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    population: '595,000',
    rentalHouseholds: '~70,000',
    medianRent1BR: '$2,000',
    vacancyRate: '1.1%',
    marketNote:
      'Surrey is the second-largest city in BC and on track to overtake Vancouver by population. Rental supply has expanded fastest in Surrey Central along the Expo Line.',
    areas: [
      { name: 'Surrey Central / Whalley', note: 'New mid-rise rental towers around the SkyTrain.' },
      { name: 'Newton', note: 'High immigrant rental demand with significant townhouse stock.' },
      { name: 'South Surrey', note: 'Higher-income detached community with limited rental supply.' },
    ],
  },
  {
    name: 'Richmond',
    slug: 'richmond',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    population: '210,000',
    rentalHouseholds: '~25,000',
    medianRent1BR: '$2,300',
    vacancyRate: '1.0%',
    marketNote:
      'Richmond has the highest foreign-buyer share of any BC municipality and a correspondingly high investor-owned condo rental supply. Canada Line transit access keeps demand tied to Vancouver job cycles.',
    areas: [
      { name: 'City Centre', note: 'High-rise condo cluster along the Canada Line.' },
      { name: 'Steveston', note: 'Heritage village core with limited rental supply.' },
      { name: 'East Richmond', note: 'Mix of established detached and townhouse rental stock.' },
    ],
  },
  {
    name: 'Coquitlam',
    slug: 'coquitlam',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    population: '150,000',
    rentalHouseholds: '~15,000',
    medianRent1BR: '$2,100',
    vacancyRate: '1.1%',
    marketNote:
      'The Evergreen extension of the Millennium Line catalyzed Coquitlam\'s rental construction boom. Burquitlam-Lougheed Town Centre concentrates most new supply.',
    areas: [
      { name: 'Burquitlam', note: 'Newest rental tower cluster along the SkyTrain.' },
      { name: 'Coquitlam Centre', note: 'Established commercial-residential node with mid-rise rentals.' },
      { name: 'Maillardville', note: 'Heritage francophone neighbourhood with infill rental supply.' },
    ],
  },
  {
    name: 'Langley',
    slug: 'langley',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    population: '135,000',
    rentalHouseholds: '~13,000',
    medianRent1BR: '$1,900',
    vacancyRate: '1.3%',
    marketNote:
      'Langley refers to two municipalities (City and Township) that operate as one rental market. The forthcoming SkyTrain extension to Surrey-Langley has driven significant investor purchase activity along the corridor.',
    areas: [
      { name: 'Willoughby', note: 'Township growth area with new townhouse and mid-rise rentals.' },
      { name: 'Downtown Langley City', note: 'Heritage core with established mid-rise rental supply.' },
      { name: 'Walnut Grove', note: 'Established detached neighbourhood with secondary suites.' },
    ],
  },
  {
    name: 'Victoria',
    slug: 'victoria',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    population: '95,000',
    rentalHouseholds: '~30,000',
    medianRent1BR: '$2,200',
    vacancyRate: '1.2%',
    marketNote:
      'Victoria has the highest renter share of any BC city. Provincial government employment and the University of Victoria anchor stable long-term rental demand.',
    areas: [
      { name: 'Downtown / Inner Harbour', note: 'Heritage rental stock plus newer condo conversion.' },
      { name: 'Fairfield', note: 'Established residential with character-home secondary suites.' },
      { name: 'Vic West', note: 'Mixed-use redevelopment area with new mid-rise rental supply.' },
    ],
  },
  {
    name: 'Kelowna',
    slug: 'kelowna',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    population: '145,000',
    rentalHouseholds: '~20,000',
    medianRent1BR: '$2,000',
    vacancyRate: '1.4%',
    marketNote:
      'Wine-country tourism plus UBC Okanagan have shifted Kelowna into a year-round rental market. Short-term rental restrictions have pushed some operators back into long-term inventory.',
    areas: [
      { name: 'Downtown / Cultural District', note: 'High-rise rental supply and heritage stock.' },
      { name: 'Pandosy / Mission', note: 'Lakefront established community with secondary suites.' },
      { name: 'Glenmore', note: 'Family-oriented suburb with townhouse and detached rentals.' },
    ],
  },
  {
    name: 'Abbotsford',
    slug: 'abbotsford',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    population: '160,000',
    rentalHouseholds: '~18,000',
    medianRent1BR: '$1,700',
    vacancyRate: '1.5%',
    marketNote:
      'Abbotsford is the largest city in the Fraser Valley outside Surrey. Agricultural employment, the University of the Fraser Valley, and Abbotsford International Airport all anchor steady rental demand.',
    areas: [
      { name: 'Clearbrook', note: 'High-density rental cluster with mid-rise supply.' },
      { name: 'Sumas Mountain', note: 'Newer single-family community with secondary suites.' },
      { name: 'Downtown / Historic District', note: 'Heritage stock plus infill mid-rise.' },
    ],
  },
  {
    name: 'Nanaimo',
    slug: 'nanaimo',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    population: '105,000',
    rentalHouseholds: '~15,000',
    medianRent1BR: '$1,750',
    vacancyRate: '1.5%',
    marketNote:
      'Vancouver Island\'s second-largest city. Ferry connections to Metro Vancouver have attracted both remote workers and retirees, increasing competition for rental supply.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock plus newer mid-rise infill.' },
      { name: 'North Nanaimo', note: 'Newer suburban community with townhouse rentals.' },
      { name: 'Departure Bay', note: 'Established detached neighbourhood with secondary suites.' },
    ],
  },

  // ─── Quebec ───────────────────────────────────────────────────────────────
  {
    name: 'Montreal',
    slug: 'montreal',
    province: 'Quebec',
    provinceSlug: 'quebec',
    population: '1.78 million',
    rentalHouseholds: '~480,000',
    medianRent1BR: '$1,500',
    vacancyRate: '1.5%',
    marketNote:
      'Montreal has the highest renter share of any major Canadian city at roughly 63%. Two universities (McGill, UdeM) and four CEGEPs drive a meaningful student segment. July 1 moving day is the central rental calendar event.',
    areas: [
      { name: 'Plateau-Mont-Royal', note: 'Triplex and walk-up stock with extremely tight turnover.' },
      { name: 'Centre-Ville / Ville-Marie', note: 'High-rise rental and condo cluster.' },
      { name: 'Verdun', note: 'Rapidly gentrifying southwest borough with mature triplex stock.' },
      { name: 'Rosemont', note: 'Established francophone family neighbourhood with triplex rentals.' },
    ],
  },
  {
    name: 'Laval',
    slug: 'laval',
    province: 'Quebec',
    provinceSlug: 'quebec',
    population: '440,000',
    rentalHouseholds: '~70,000',
    medianRent1BR: '$1,400',
    vacancyRate: '1.7%',
    marketNote:
      'Laval is connected to Montreal by metro and serves as a major suburban rental market. Most supply is mid-rise walk-ups and newer mid-rise rental towers near the metro stations.',
    areas: [
      { name: 'Chomedey', note: 'Densest rental cluster with mid-rise walk-ups.' },
      { name: 'Sainte-Rose', note: 'Family-oriented community with townhouse and walk-up rentals.' },
      { name: 'Vimont', note: 'Established residential with secondary-suite stock.' },
    ],
  },
  {
    name: 'Quebec City',
    slug: 'quebec-city',
    province: 'Quebec',
    provinceSlug: 'quebec',
    population: '550,000',
    rentalHouseholds: '~115,000',
    medianRent1BR: '$1,200',
    vacancyRate: '1.9%',
    marketNote:
      'Université Laval and provincial government employment anchor stable long-term rental demand. Quebec City has one of the lowest median rents of any Canadian provincial capital.',
    areas: [
      { name: 'Saint-Roch', note: 'Revitalized lower-town neighbourhood with infill rental supply.' },
      { name: 'Sainte-Foy', note: 'Université Laval catchment with student-oriented stock.' },
      { name: 'Limoilou', note: 'Established working-class neighbourhood with triplex stock.' },
    ],
  },
  {
    name: 'Longueuil',
    slug: 'longueuil',
    province: 'Quebec',
    provinceSlug: 'quebec',
    population: '255,000',
    rentalHouseholds: '~55,000',
    medianRent1BR: '$1,350',
    vacancyRate: '1.8%',
    marketNote:
      'Longueuil sits across the river from Montreal and is connected by the Yellow Line metro. Rental supply is dominated by walk-up apartments and mid-rise rental towers.',
    areas: [
      { name: 'Vieux-Longueuil', note: 'Heritage core with mature walk-up rental stock.' },
      { name: 'Saint-Hubert', note: 'Suburban borough with townhouse and detached secondary suites.' },
      { name: 'Greenfield Park', note: 'Established anglophone community with mid-rise rentals.' },
    ],
  },
  {
    name: 'Gatineau',
    slug: 'gatineau',
    province: 'Quebec',
    provinceSlug: 'quebec',
    population: '290,000',
    rentalHouseholds: '~55,000',
    medianRent1BR: '$1,400',
    vacancyRate: '1.7%',
    marketNote:
      'Gatineau forms the National Capital Region with Ottawa, and federal government employment crosses provincial lines. The Quebec tax regime and lower rents make Gatineau a destination for cross-river commuters.',
    areas: [
      { name: 'Hull', note: 'Closest sector to downtown Ottawa with the densest rental supply.' },
      { name: 'Aylmer', note: 'Anglophone west sector with detached and townhouse rentals.' },
      { name: 'Gatineau Sector', note: 'Eastern francophone borough with mid-rise rental stock.' },
    ],
  },
  {
    name: 'Sherbrooke',
    slug: 'sherbrooke',
    province: 'Quebec',
    provinceSlug: 'quebec',
    population: '170,000',
    rentalHouseholds: '~30,000',
    medianRent1BR: '$1,000',
    vacancyRate: '2.1%',
    marketNote:
      'Université de Sherbrooke and Bishop\'s University anchor a meaningful student rental segment. Median rents remain among the lowest in any Quebec CMA.',
    areas: [
      { name: 'Centre-Ville', note: 'Heritage stock and newer mid-rise rental infill.' },
      { name: 'Université', note: 'Student-oriented walk-up and townhouse rentals.' },
      { name: 'Fleurimont', note: 'Established residential with townhouse rental supply.' },
    ],
  },

  // ─── Alberta ──────────────────────────────────────────────────────────────
  {
    name: 'Calgary',
    slug: 'calgary',
    province: 'Alberta',
    provinceSlug: 'alberta',
    population: '1.38 million',
    rentalHouseholds: '~155,000',
    medianRent1BR: '$1,700',
    vacancyRate: '1.4%',
    marketNote:
      'Calgary led Canada in interprovincial migration in 2023 and 2024, driving the largest rent inflation in Alberta\'s history. Energy sector employment remains the central economic driver.',
    areas: [
      { name: 'Beltline', note: 'Downtown-adjacent high-rise rental cluster.' },
      { name: 'Kensington / Hillhurst', note: 'Walkable inner-city community with mid-rise stock.' },
      { name: 'NW Calgary (Brentwood / University)', note: 'University catchment with established walk-up rental supply.' },
      { name: 'Mahogany / South Calgary', note: 'Newer suburban communities with townhouse and detached secondary suites.' },
    ],
  },
  {
    name: 'Edmonton',
    slug: 'edmonton',
    province: 'Alberta',
    provinceSlug: 'alberta',
    population: '1.06 million',
    rentalHouseholds: '~135,000',
    medianRent1BR: '$1,400',
    vacancyRate: '2.0%',
    marketNote:
      'Edmonton has historically been Canada\'s most affordable major rental market. The University of Alberta and provincial government employment anchor stable long-term demand.',
    areas: [
      { name: 'Downtown / Ice District', note: 'High-rise rental and condo cluster with new supply.' },
      { name: 'Garneau / Strathcona', note: 'University catchment with character-home rental conversions.' },
      { name: 'Oliver / Westmount', note: 'Mature walk-up rental stock west of downtown.' },
    ],
  },
  {
    name: 'Red Deer',
    slug: 'red-deer',
    province: 'Alberta',
    provinceSlug: 'alberta',
    population: '105,000',
    rentalHouseholds: '~15,000',
    medianRent1BR: '$1,100',
    vacancyRate: '2.8%',
    marketNote:
      'Red Deer sits midway between Edmonton and Calgary and serves Central Alberta\'s agricultural and energy sectors. Rental vacancy has run above the provincial average.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock plus older walk-up rentals.' },
      { name: 'Northwest Red Deer', note: 'Newer suburban community with townhouse rentals.' },
      { name: 'Bower', note: 'Established residential with secondary-suite stock.' },
    ],
  },
  {
    name: 'Lethbridge',
    slug: 'lethbridge',
    province: 'Alberta',
    provinceSlug: 'alberta',
    population: '105,000',
    rentalHouseholds: '~15,000',
    medianRent1BR: '$1,100',
    vacancyRate: '3.0%',
    marketNote:
      'Lethbridge is southern Alberta\'s service centre. The University of Lethbridge anchors a student rental segment, and agricultural processing employment supports long-term demand.',
    areas: [
      { name: 'West Lethbridge', note: 'University catchment with student-oriented rental stock.' },
      { name: 'South Lethbridge', note: 'Established residential with townhouse and detached rentals.' },
      { name: 'North Lethbridge', note: 'Older walk-up rental concentration.' },
    ],
  },

  // ─── Nova Scotia ──────────────────────────────────────────────────────────
  {
    name: 'Halifax',
    slug: 'halifax',
    province: 'Nova Scotia',
    provinceSlug: 'nova-scotia',
    population: '460,000',
    rentalHouseholds: '~75,000',
    medianRent1BR: '$1,900',
    vacancyRate: '1.0%',
    marketNote:
      'Halifax has experienced the largest population and rent growth of any Atlantic Canadian city. Dalhousie University, the Halifax Shipyard, and federal employment anchor demand.',
    areas: [
      { name: 'Downtown / South End', note: 'High-rise rental cluster and Dalhousie catchment.' },
      { name: 'North End', note: 'Gentrifying neighbourhood with new mid-rise rental supply.' },
      { name: 'Bedford', note: 'Suburban community with townhouse and detached rentals.' },
    ],
  },
  {
    name: 'Dartmouth',
    slug: 'dartmouth',
    province: 'Nova Scotia',
    provinceSlug: 'nova-scotia',
    population: '105,000',
    rentalHouseholds: '~20,000',
    medianRent1BR: '$1,650',
    vacancyRate: '1.2%',
    marketNote:
      'Dartmouth is part of the Halifax Regional Municipality across the harbour. Bridge and ferry access keeps demand tied to Halifax employment. Newer purpose-built rental supply has concentrated on the Dartmouth waterfront.',
    areas: [
      { name: 'Downtown Dartmouth', note: 'Waterfront mixed-use redevelopment with new mid-rise rentals.' },
      { name: 'Cole Harbour', note: 'Suburban community with townhouse rental supply.' },
      { name: 'Eastern Passage', note: 'Coastal residential with detached secondary suites.' },
    ],
  },

  // ─── Manitoba ─────────────────────────────────────────────────────────────
  {
    name: 'Winnipeg',
    slug: 'winnipeg',
    province: 'Manitoba',
    provinceSlug: 'manitoba',
    population: '750,000',
    rentalHouseholds: '~110,000',
    medianRent1BR: '$1,250',
    vacancyRate: '2.4%',
    marketNote:
      'Winnipeg remains one of Canada\'s most affordable big-city rental markets. The University of Manitoba, the University of Winnipeg, and the provincial government anchor stable demand.',
    areas: [
      { name: 'Downtown / Exchange District', note: 'Heritage stock plus newer mid-rise rental conversions.' },
      { name: 'Osborne Village', note: 'Walkable mid-rise rental cluster with retail.' },
      { name: 'River Heights', note: 'Established residential with secondary suites.' },
    ],
  },
  {
    name: 'Brandon',
    slug: 'brandon',
    province: 'Manitoba',
    provinceSlug: 'manitoba',
    population: '52,000',
    rentalHouseholds: '~7,500',
    medianRent1BR: '$1,000',
    vacancyRate: '3.0%',
    marketNote:
      'Brandon is Manitoba\'s second city, with employment anchored in agriculture, food processing, and Brandon University. Vacancy has run above the provincial average.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock plus older walk-up rentals.' },
      { name: 'North Hill', note: 'Brandon University catchment with student-oriented rentals.' },
      { name: 'South Brandon', note: 'Established residential with detached rental supply.' },
    ],
  },

  // ─── Saskatchewan ─────────────────────────────────────────────────────────
  {
    name: 'Saskatoon',
    slug: 'saskatoon',
    province: 'Saskatchewan',
    provinceSlug: 'saskatchewan',
    population: '275,000',
    rentalHouseholds: '~37,000',
    medianRent1BR: '$1,250',
    vacancyRate: '2.6%',
    marketNote:
      'Saskatoon\'s rental market is anchored by the University of Saskatchewan plus mining, manufacturing, and the BHP Jansen potash project. Population growth has outpaced new rental supply since 2022.',
    areas: [
      { name: 'Downtown', note: 'Heritage and mid-rise rental cluster.' },
      { name: 'Varsity View / Nutana', note: 'University catchment with character-home conversions.' },
      { name: 'Stonebridge', note: 'Newer suburban community with townhouse rentals.' },
    ],
  },
  {
    name: 'Regina',
    slug: 'regina',
    province: 'Saskatchewan',
    provinceSlug: 'saskatchewan',
    population: '230,000',
    rentalHouseholds: '~30,000',
    medianRent1BR: '$1,150',
    vacancyRate: '3.0%',
    marketNote:
      'Regina is the provincial capital and home to the University of Regina. Rental supply runs at slightly higher vacancy than Saskatoon and has historically been cheaper to operate in.',
    areas: [
      { name: 'Downtown / Cathedral', note: 'Heritage stock plus walk-up rental conversions.' },
      { name: 'University Park', note: 'U of R catchment with student-oriented stock.' },
      { name: 'East Regina', note: 'Established residential with townhouse rentals.' },
    ],
  },

  // ─── New Brunswick ────────────────────────────────────────────────────────
  {
    name: 'Moncton',
    slug: 'moncton',
    province: 'New Brunswick',
    provinceSlug: 'new-brunswick',
    population: '85,000',
    rentalHouseholds: '~16,000',
    medianRent1BR: '$1,300',
    vacancyRate: '1.8%',
    marketNote:
      'Moncton has been the fastest-growing CMA in Atlantic Canada and the largest rent inflation outside Halifax. Bilingual workforce and call-centre concentration anchor employment.',
    areas: [
      { name: 'Downtown Moncton', note: 'Heritage stock plus newer mid-rise infill.' },
      { name: 'Dieppe', note: 'Adjacent francophone city with townhouse rental supply.' },
      { name: 'Riverview', note: 'Suburban community with detached rentals across the river.' },
    ],
  },
  {
    name: 'Saint John',
    slug: 'saint-john',
    province: 'New Brunswick',
    provinceSlug: 'new-brunswick',
    population: '70,000',
    rentalHouseholds: '~13,000',
    medianRent1BR: '$1,100',
    vacancyRate: '2.0%',
    marketNote:
      'Saint John is New Brunswick\'s largest city by metropolitan area and a port-anchored industrial economy. The Irving group of companies and Saint John Energy are major employers.',
    areas: [
      { name: 'Uptown', note: 'Heritage commercial-residential core with character rentals.' },
      { name: 'West Saint John', note: 'Established detached neighbourhood with secondary suites.' },
      { name: 'East Saint John', note: 'Suburban community with townhouse rental supply.' },
    ],
  },
  {
    name: 'Fredericton',
    slug: 'fredericton',
    province: 'New Brunswick',
    provinceSlug: 'new-brunswick',
    population: '65,000',
    rentalHouseholds: '~13,000',
    medianRent1BR: '$1,150',
    vacancyRate: '1.7%',
    marketNote:
      'Fredericton is the provincial capital and home to the University of New Brunswick. Provincial government employment and the university anchor stable long-term demand.',
    areas: [
      { name: 'Downtown / Old Town', note: 'Heritage stock plus newer mid-rise infill.' },
      { name: 'UNB Hill', note: 'University catchment with student-oriented rental conversions.' },
      { name: 'North Fredericton', note: 'Established residential with townhouse rentals.' },
    ],
  },

  // ─── PEI ──────────────────────────────────────────────────────────────────
  {
    name: 'Charlottetown',
    slug: 'charlottetown',
    province: 'Prince Edward Island',
    provinceSlug: 'prince-edward-island',
    population: '40,000',
    rentalHouseholds: '~9,000',
    medianRent1BR: '$1,250',
    vacancyRate: '0.8%',
    marketNote:
      'Charlottetown has had one of the tightest rental markets in Canada for five consecutive years. UPEI and Holland College, plus tourism and provincial employment, anchor demand against a constrained supply pipeline.',
    areas: [
      { name: 'Downtown', note: 'Heritage stock plus newer mid-rise infill near the waterfront.' },
      { name: 'Sherwood', note: 'Established residential with townhouse and detached rentals.' },
      { name: 'West Royalty', note: 'Suburban growth area with newer rental supply.' },
    ],
  },

  // ─── Newfoundland and Labrador ────────────────────────────────────────────
  {
    name: "St. John's",
    slug: 'st-johns',
    province: 'Newfoundland and Labrador',
    provinceSlug: 'newfoundland-and-labrador',
    population: '110,000',
    rentalHouseholds: '~18,000',
    medianRent1BR: '$1,100',
    vacancyRate: '2.5%',
    marketNote:
      'St. John\'s is the provincial capital and home to Memorial University. Energy sector employment, the provincial government, and MUN anchor demand. Rents have grown faster than the provincial median since 2021.',
    areas: [
      { name: 'Downtown', note: 'Heritage row-house stock with character conversions.' },
      { name: 'MUN Area / Pleasantville', note: 'University catchment with student-oriented stock.' },
      { name: 'Mount Pearl', note: 'Adjacent suburban city with townhouse rental supply.' },
    ],
  },
]

export const caCityBySlug = (citySlug: string, provinceSlug: string) =>
  caCities.find((c) => c.slug === citySlug && c.provinceSlug === provinceSlug)
