import type { EvictionGuide } from './evictions'

/* AUTO-GENERATED Canadian eviction guides (revun-canada-evictions, 2026-06-06). Do not hand-edit. */

export const caEvictions: Record<string, EvictionGuide> = {
  "ontario": {
    "slug": "ontario",
    "state": "Ontario",
    "abbr": "ON",
    "metaTitle": "How to Evict a Tenant in Ontario (2026) | Revun",
    "description": "Ontario landlords must follow a strict tribunal process governed by the Residential Tenancies Act and the Landlord and Tenant Board (LTB). Serving the correct notice form is step one, and only the sheriff can physically remove a tenant after an LTB eviction order.",
    "quickAnswer": "In Ontario, evicting a tenant for non-payment requires serving an **N4 notice** (14-day notice period for monthly tenancies), then filing an **L1 application** with the **Landlord and Tenant Board (LTB)** for **$186 online ($201 paper)**. Hearings are typically scheduled within **3 months** of filing, and only the sheriff can enforce the final order.",
    "atAGlance": {
      "grounds": "Non-payment of rent, persistent late payment, damage, illegal acts, landlord personal use, demolition or conversion",
      "minNotice": "14 days (N4 non-payment, monthly tenancy); 7 days (N4 weekly tenancy); 60 days (N12 personal use)",
      "whereToFile": "Landlord and Tenant Board (LTB)",
      "filingFee": "$186 online / $201 paper (L1 application)",
      "typicalTimeframe": "3 to 6 months from notice to enforcement"
    },
    "noticeTypes": [
      {
        "name": "N4 Notice (non-payment of rent)",
        "period": "14 days (monthly); 7 days (weekly)",
        "detail": "Landlord must serve this before filing an L1 application; the notice is voided if the tenant pays all arrears before the LTB filing."
      },
      {
        "name": "N5 Notice (damage or interference)",
        "period": "20 days (first notice)",
        "detail": "Tenant has a 7-day window to correct the behaviour before the notice becomes enforceable."
      },
      {
        "name": "N12 Notice (landlord or purchaser personal use)",
        "period": "60 days",
        "detail": "Landlord must genuinely intend to occupy the unit and pay one month's compensation to the tenant."
      },
      {
        "name": "N13 Notice (demolition, repair, or conversion)",
        "period": "120 days",
        "detail": "Requires permits or municipal approval and one month's compensation to the tenant in most cases."
      }
    ],
    "steps": [
      {
        "title": "Serve the correct N-form notice",
        "timeframe": "Day 1",
        "detail": "Deliver the written notice in person, by mail, or by posting on the door of the rental unit."
      },
      {
        "title": "Wait out the notice period",
        "timeframe": "7 to 120 days depending on notice type",
        "detail": "If the tenant pays all arrears (N4) during this window the notice is void and no application can be filed."
      },
      {
        "title": "File the L-form application with the LTB",
        "timeframe": "Within 30 days of the termination date on the notice",
        "detail": "Pay the $186 online or $201 paper filing fee; the LTB schedules a hearing and sends notice to both parties."
      },
      {
        "title": "Attend the LTB hearing",
        "timeframe": "Approximately 3 months after filing",
        "detail": "Both landlord and tenant present evidence; the adjudicator issues a written eviction order if grounds are proven."
      },
      {
        "title": "File the eviction order with the Court Enforcement Office",
        "timeframe": "After order is issued",
        "detail": "Only a sheriff can carry out the physical eviction; the landlord files the LTB order and pays the sheriff's enforcement fee."
      },
      {
        "title": "Sheriff enforces the order",
        "timeframe": "Varies by jurisdiction, typically days to weeks after filing with sheriff",
        "detail": "The sheriff attends the property, allows the tenant a brief opportunity to leave voluntarily, then proceeds with removal."
      }
    ],
    "costs": "The LTB filing fee is **$186 online or $201 by paper** for an L1 application. Landlords also pay a separate sheriff enforcement fee to the Court Enforcement Office when filing the eviction order for execution.",
    "tenantDefenses": [
      "Full payment of arrears before the LTB application is filed voids the N4 notice",
      "Procedural errors in the notice (wrong amount, wrong termination date) can invalidate the notice",
      "Tenant can raise a maintenance or repair issue as an abatement of rent at the hearing",
      "Hardship arguments: the LTB may delay or condition an eviction order based on circumstances",
      "Human Rights Code defenses if the eviction is connected to a protected ground such as disability or family status"
    ],
    "afterJudgment": "After the LTB issues an eviction order, **only the sheriff (Court Enforcement Officer) can physically remove the tenant**; the landlord files the order with the Court Enforcement Office and pays a fee. Self-help eviction (changing locks, removing belongings, shutting off utilities) is **illegal** under the Residential Tenancies Act and can result in a damage award against the landlord.",
    "statute": "Residential Tenancies Act, 2006, S.O. 2006, c. 17",
    "statuteUrl": "https://www.ontario.ca/laws/statute/06r17",
    "faqs": [
      {
        "q": "Can I evict a tenant who pays the arrears after I serve the N4?",
        "a": "Yes, if the tenant pays the full amount owed before you file the L1 application with the LTB, the N4 notice is void and you cannot proceed with eviction on that notice."
      },
      {
        "q": "What is the filing fee for an L1 application at the LTB?",
        "a": "The fee is $186 when filed through the LTB's online portal or $201 when filed by paper."
      },
      {
        "q": "How long does the Ontario eviction process take?",
        "a": "The LTB typically schedules L1 hearings within 3 months of filing; adding the notice period and sheriff enforcement, the full process often runs 4 to 6 months."
      },
      {
        "q": "Can I change the locks myself once the LTB issues an eviction order?",
        "a": "No. Only the sheriff can physically enforce the order; self-help eviction including changing locks is illegal and can expose you to significant financial liability."
      },
      {
        "q": "What notice is required to evict for landlord personal use?",
        "a": "You must serve an N12 notice giving the tenant at least 60 days and pay one month's compensation; the tenant can then dispute the eviction at the LTB."
      }
    ]
  },
  "british-columbia": {
    "slug": "british-columbia",
    "state": "British Columbia",
    "abbr": "BC",
    "metaTitle": "How to Evict a Tenant in British Columbia (2026) | Revun",
    "description": "British Columbia landlords must use the Residential Tenancy Branch (RTB) to resolve eviction disputes, with notice periods as short as 10 days for unpaid rent and a direct request process available when tenants do not dispute. Physical eviction is carried out by a court-approved bailiff, not the landlord.",
    "quickAnswer": "In BC, a landlord can serve a **10-Day Notice** for unpaid rent (RTB Form 30); the tenant has **5 days to dispute**. If unchallenged, the landlord applies via the **RTB Direct Request** process (fee **$100**) for an Order of Possession. The **Residential Tenancy Branch** governs the process, and a **court-approved bailiff** enforces any order.",
    "atAGlance": {
      "grounds": "Unpaid rent or utilities, non-compliance with tenancy agreement or RTA, landlord or purchaser occupancy, demolition or conversion, major renovations",
      "minNotice": "10 days (RTB Form 30, unpaid rent); 1 month (RTB Form 33, cause/non-compliance); 3 months (landlord or purchaser occupancy)",
      "whereToFile": "Residential Tenancy Branch (RTB)",
      "filingFee": "$100 (dispute resolution or direct request application)",
      "typicalTimeframe": "2 to 8 weeks for non-payment (direct request); 2 to 4 months for disputed hearings"
    },
    "noticeTypes": [
      {
        "name": "10-Day Notice for Unpaid Rent or Utilities (RTB Form 30)",
        "period": "10 days",
        "detail": "Tenant has 5 days from receipt to dispute by applying to the RTB; if no dispute is filed the landlord may proceed with a direct request for an Order of Possession."
      },
      {
        "name": "One Month Notice for Cause (RTB Form 33)",
        "period": "1 month",
        "detail": "Used for non-compliance with the tenancy agreement or RTA obligations; tenant has 10 days to dispute."
      },
      {
        "name": "Three Month Notice for Landlord or Purchaser Occupancy (RTB Form 32L / 32P)",
        "period": "3 months",
        "detail": "Landlord or purchaser must genuinely intend to occupy the unit; tenant has 21 days to dispute."
      },
      {
        "name": "Four Month Notice for Demolition, Conversion, or Major Renovation",
        "period": "4 months",
        "detail": "Requires RTB application and hearing when the tenant disputes; tenant has 30 days to file a dispute."
      }
    ],
    "steps": [
      {
        "title": "Serve the written RTB notice form",
        "timeframe": "Day 1",
        "detail": "Use the correct RTB form, sign and date it, and deliver it in person, by mail, or by posting on the rental unit door."
      },
      {
        "title": "Wait for the tenant dispute window to close",
        "timeframe": "5 days (unpaid rent notice) to 30 days (demolition notice)",
        "detail": "If the tenant files a dispute application the matter proceeds to a full RTB hearing; if not, the landlord may proceed to the direct request process."
      },
      {
        "title": "File a Direct Request or Dispute Resolution application with the RTB",
        "timeframe": "After dispute window closes or as needed",
        "detail": "Pay the $100 filing fee; a Direct Request for an Order of Possession is available when the tenant does not dispute the 10-day notice."
      },
      {
        "title": "Attend RTB hearing (if disputed)",
        "timeframe": "Within 12 days (emergency); 2 to 4 months (standard)",
        "detail": "Both parties present evidence by phone or video; the RTB arbitrator issues a written decision."
      },
      {
        "title": "Obtain and register the Order of Possession",
        "timeframe": "After RTB decision",
        "detail": "File the RTB Order of Possession in BC Supreme Court to obtain a Writ of Possession, which authorizes enforcement."
      },
      {
        "title": "Hire a court-approved bailiff to enforce",
        "timeframe": "After Writ of Possession issued",
        "detail": "Only a court-approved bailiff can physically remove the tenant; the landlord must not touch the tenant's belongings or bar entry before the bailiff acts."
      }
    ],
    "costs": "The RTB application fee is **$100** for both dispute resolution and direct request applications. Additional costs include BC Supreme Court filing fees to register the Writ of Possession and the bailiff's enforcement fee.",
    "tenantDefenses": [
      "Paying all outstanding rent within the 10-day notice period cancels the notice",
      "Filing a dispute application within 5 days (unpaid rent) stops the direct request process and triggers a hearing",
      "RTB can reduce or cancel the notice if the landlord is in breach of maintenance obligations",
      "Procedural defects in the notice form can render it invalid",
      "Hardship or seasonal considerations may cause the RTB to delay enforcement"
    ],
    "afterJudgment": "After the RTB issues an Order of Possession, the landlord registers it in BC Supreme Court to obtain a **Writ of Possession**, and a **court-approved bailiff** carries out the physical eviction. Self-help eviction including changing locks, removing the tenant's property, or denying access is **illegal** under the Residential Tenancy Act and can result in an RTB order requiring the landlord to pay compensation to the tenant.",
    "statute": "Residential Tenancy Act, S.B.C. 2002, c. 78",
    "statuteUrl": "https://www.bclaws.gov.bc.ca/civix/document/id/complete/statreg/02078_01",
    "faqs": [
      {
        "q": "What is the notice period for non-payment of rent in BC?",
        "a": "The landlord must give a 10-Day Notice (RTB Form 30) and the tenant has 5 days from receipt to file a dispute with the RTB."
      },
      {
        "q": "What is the RTB filing fee?",
        "a": "The application fee is $100 for both a Direct Request and a full dispute resolution application."
      },
      {
        "q": "Can the tenant stop eviction by paying the rent after receiving the 10-day notice?",
        "a": "Yes, if the tenant pays all outstanding rent before the landlord files a Direct Request or dispute application, the notice is cancelled."
      },
      {
        "q": "Who physically removes the tenant?",
        "a": "Only a court-approved bailiff acting on a Writ of Possession can physically remove a tenant; the police can assist to keep the peace but do not independently execute evictions."
      },
      {
        "q": "How long does a BC eviction typically take?",
        "a": "An uncontested non-payment eviction via the Direct Request process can be resolved in 2 to 4 weeks; a fully disputed eviction hearing typically takes 2 to 4 months."
      }
    ]
  },
  "alberta": {
    "slug": "alberta",
    "state": "Alberta",
    "abbr": "AB",
    "metaTitle": "How to Evict a Tenant in Alberta (2026) | Revun",
    "description": "Alberta landlords use the Residential Tenancy Dispute Resolution Service (RTDRS) or the courts to resolve eviction disputes under the Residential Tenancies Act. A written 14-day notice for substantial breach (including non-payment) is required before any application, and court enforcement officers execute any resulting possession order.",
    "quickAnswer": "Alberta requires a written **14-day notice** for substantial breach including non-payment of rent. If the tenant does not vacate, the landlord files with the **Residential Tenancy Dispute Resolution Service (RTDRS)** (fee **$75 to $150**) or provincial court for a possession order. Only a **court enforcement officer** can physically remove the tenant.",
    "atAGlance": {
      "grounds": "Non-payment of rent (substantial breach), damage, illegal activity, disturbance of other occupants, unauthorized occupants",
      "minNotice": "14 days (substantial breach including non-payment); 24 hours (serious damage or physical assault); 48 hours (unauthorized occupants after tenant vacates)",
      "whereToFile": "Residential Tenancy Dispute Resolution Service (RTDRS) or Provincial Court",
      "filingFee": "$75 (claims up to $7,500); $150 (claims over $7,500)",
      "typicalTimeframe": "6 to 12 weeks from notice to possession order"
    },
    "noticeTypes": [
      {
        "name": "14-Day Notice (substantial breach, including non-payment)",
        "period": "14 clear days",
        "detail": "The day of notice and the day of termination do not count; for non-payment the notice must state the exact amount owing and any rent accruing during the notice period."
      },
      {
        "name": "24-Hour Notice (serious damage or physical assault)",
        "period": "24 hours",
        "detail": "Used only for significant property damage or a physical assault or credible threat against another person in the building."
      },
      {
        "name": "Monthly Notice (periodic tenancy, no cause required at end of fixed term)",
        "period": "1 rental period (typically 1 month)",
        "detail": "Given at the end of a fixed term or to terminate a month-to-month tenancy without cause, aligning with the last day of a rental period."
      }
    ],
    "steps": [
      {
        "title": "Serve the written 14-day notice to the tenant",
        "timeframe": "Day 1",
        "detail": "The notice must be in writing, signed, state the reason for termination, the amount of rent owing, and the exact termination date."
      },
      {
        "title": "Wait 14 clear days",
        "timeframe": "14 clear days",
        "detail": "The tenant may respond in writing within 14 days disputing the reasons; if the tenant pays in full during this period the landlord should assess whether the breach is cured."
      },
      {
        "title": "File an application with RTDRS or Provincial Court if tenant remains",
        "timeframe": "After notice period expires",
        "detail": "Pay the RTDRS filing fee ($75 or $150 depending on claim amount) and submit the completed application package."
      },
      {
        "title": "Attend the RTDRS or court hearing",
        "timeframe": "Typically 4 to 8 weeks after filing",
        "detail": "A tenancy dispute officer hears both sides and issues a written decision including a possession order if the landlord's case is proven."
      },
      {
        "title": "Register the possession order and enforce",
        "timeframe": "After order is issued",
        "detail": "If the tenant does not comply, the landlord registers the order with the court and a court enforcement officer carries out the physical eviction."
      }
    ],
    "costs": "RTDRS filing fees are **$75** for claims or counterclaims up to $7,500 and **$150** for claims over $7,500 (rates effective April 1, 2026). Additional court registration and enforcement officer fees apply if the tenant does not vacate voluntarily after the order.",
    "tenantDefenses": [
      "Paying all rent owing before or shortly after the 14-day notice may cure the breach depending on the circumstances",
      "Procedural defects in the notice (missing amount owed, incorrect date, unsigned) can invalidate it",
      "Tenant can counterclaim for breach of landlord obligations such as failure to maintain the unit",
      "Evidence that the notice was retaliatory may be raised at the RTDRS hearing",
      "Tenant may dispute a 24-hour notice by showing no serious damage or assault occurred"
    ],
    "afterJudgment": "Once the RTDRS or court issues a possession order, **a court enforcement officer** carries out the physical eviction if the tenant does not leave voluntarily. Self-help eviction including changing locks, cutting utilities, or removing the tenant's belongings is **illegal** under the Residential Tenancies Act and can expose the landlord to significant damages.",
    "statute": "Residential Tenancies Act, R.S.A. 2000, c. R-17.1",
    "statuteUrl": "https://open.alberta.ca/publications/r17p1",
    "faqs": [
      {
        "q": "What notice period applies to non-payment of rent in Alberta?",
        "a": "Alberta requires at least 14 clear days written notice for a substantial breach including non-payment; the notice must state the exact rent amount owing."
      },
      {
        "q": "What is the RTDRS filing fee?",
        "a": "The fee is $75 for claims up to $7,500 and $150 for claims exceeding $7,500, with rates effective April 1, 2026."
      },
      {
        "q": "Can a landlord use RTDRS or must they go to court?",
        "a": "Landlords can choose between RTDRS (faster, lower cost) and Provincial Court; RTDRS handles most residential tenancy disputes including non-payment evictions."
      },
      {
        "q": "How long does an Alberta eviction take?",
        "a": "The full process from notice to possession order typically takes 6 to 12 weeks, depending on how quickly the RTDRS or court schedules a hearing."
      },
      {
        "q": "Is a 24-hour notice valid for non-payment?",
        "a": "No, the 24-hour notice applies only to serious property damage or physical assault; non-payment requires a 14-day notice."
      }
    ]
  },
  "quebec": {
    "slug": "quebec",
    "state": "Quebec",
    "abbr": "QC",
    "metaTitle": "How to Evict a Tenant in Quebec (2026) | Revun",
    "description": "Quebec landlords do not serve a traditional notice before filing; once rent is more than 3 weeks late, the lessor files directly with the Tribunal administratif du logement (TAL) to recover unpaid rent and request lease termination and eviction. A bailiff enforces the TAL's decision, and evictions are prohibited during the holiday period from December 24 to January 2.",
    "quickAnswer": "In Quebec, a landlord can apply to the **Tribunal administratif du logement (TAL)** once rent is **more than 3 weeks late**. The filing fee is **$92** for an unpaid rent application. A **bailiff** enforces the TAL's eviction decision, and the tenant can avoid eviction by paying all rent, costs, and interest before the decision is rendered.",
    "atAGlance": {
      "grounds": "Rent more than 3 weeks late, serious breach of lease obligations, repossession for personal use, improper subletting",
      "minNotice": "No separate written notice required before filing; landlord may file once rent is 21 days overdue",
      "whereToFile": "Tribunal administratif du logement (TAL)",
      "filingFee": "$92 (unpaid rent application)",
      "typicalTimeframe": "3 to 6 months from filing to hearing and decision; enforcement by bailiff follows within days of decision"
    },
    "noticeTypes": [
      {
        "name": "Application for Unpaid Rent and Lease Termination (TAL Form)",
        "period": "Rent must be at least 21 days overdue",
        "detail": "The lessor files directly with the TAL to simultaneously claim the arrears and request lease termination and eviction; no separate demand letter is legally required."
      },
      {
        "name": "Repossession Notice (personal occupancy)",
        "period": "6 months before lease end",
        "detail": "The lessor must notify the tenant in writing at least 6 months before the lease expires and file a TAL application if the tenant refuses."
      }
    ],
    "steps": [
      {
        "title": "Confirm rent is at least 21 days overdue",
        "timeframe": "Day 21 of non-payment",
        "detail": "Quebec law permits the TAL application once the rent is more than three weeks late; acting earlier is not permissible."
      },
      {
        "title": "Complete and file the TAL application for unpaid rent",
        "timeframe": "Day 21 or later",
        "detail": "File the TAL unpaid rent application form and pay the $92 filing fee at a TAL office or online; the application requests both recovery of arrears and lease termination with eviction."
      },
      {
        "title": "TAL stamps the application and serves the tenant",
        "timeframe": "Within days of filing",
        "detail": "The Tribunal issues a hearing date and the tenant is officially notified; the landlord should keep all rent receipts and communication records."
      },
      {
        "title": "Attend the TAL hearing",
        "timeframe": "Typically 3 to 5 months after filing",
        "detail": "The adjudicator hears both parties; if the tenant pays all arrears, costs, and interest before the decision the case is dismissed and eviction cannot proceed."
      },
      {
        "title": "Receive TAL decision and instruct a bailiff",
        "timeframe": "After decision is rendered",
        "detail": "If the TAL orders eviction, the lessor retains a bailiff who must serve the tenant at least 5 days before executing the eviction."
      },
      {
        "title": "Bailiff executes the eviction",
        "timeframe": "At least 5 days after notice; not on holidays or December 24 to January 2",
        "detail": "The bailiff removes the tenant using legal authority; abandoned property may be sold, donated, or disposed of according to the TAL decision."
      }
    ],
    "costs": "The TAL filing fee is **$92** for an unpaid rent application. When the TAL deposits rent into trust, an administrative charge of **3.8%** applies. The landlord also pays the bailiff's service and enforcement fees, which vary by region and scope of work.",
    "tenantDefenses": [
      "Paying all arrears, costs, and interest before the TAL renders its decision avoids lease termination and eviction entirely",
      "Demonstrating that the landlord failed to carry out necessary repairs may support a rent reduction or abatement",
      "Contesting the amount claimed if the landlord has miscalculated the arrears",
      "Raising that the application was premature because the rent was less than 21 days overdue",
      "Evidence of extreme hardship may influence the TAL to allow additional time before the eviction takes effect"
    ],
    "afterJudgment": "Once the TAL issues an eviction decision, **the lessor instructs a bailiff** to serve a notice at least **5 days before execution** and then carry out the physical eviction. Evictions are prohibited on holidays and from **December 24 to January 2**. Self-help eviction including locking out the tenant or removing their belongings without a bailiff is **illegal** and can expose the landlord to damages.",
    "statute": "Civil Code of Quebec, art. 1971 (non-payment eviction); Act respecting the Administrative Housing Tribunal, CQLR c. T-15.01",
    "statuteUrl": "https://www.tal.gouv.qc.ca/en/",
    "faqs": [
      {
        "q": "Does a Quebec landlord need to serve a written notice before filing at the TAL?",
        "a": "No separate formal notice is required by law; the landlord may file directly with the TAL once the rent is more than 21 days overdue."
      },
      {
        "q": "What is the TAL filing fee for a non-payment eviction application?",
        "a": "The fee is $92 for an unpaid rent application, effective from November 1, 2025 following the annual 2% indexation."
      },
      {
        "q": "Can the tenant stop the eviction after the TAL application is filed?",
        "a": "Yes, if the tenant pays all rent owing plus costs and interest before the TAL renders its decision, the lease is not terminated and eviction cannot proceed."
      },
      {
        "q": "Who enforces a TAL eviction order?",
        "a": "A bailiff executes the eviction order; the bailiff must give the tenant at least 5 days written notice before proceeding, and evictions are prohibited on holidays and from December 24 to January 2."
      },
      {
        "q": "How long does the Quebec eviction process take?",
        "a": "TAL hearings for non-payment are typically scheduled 3 to 5 months after filing; the full process including bailiff enforcement commonly takes 4 to 6 months."
      }
    ]
  },
  "manitoba": {
    "slug": "manitoba",
    "state": "Manitoba",
    "abbr": "MB",
    "metaTitle": "How to Evict a Tenant in Manitoba (2026) | Revun",
    "description": "Manitoba landlords follow a two-step process: serve a written Notice of Termination (Form 8) once rent is at least 3 days overdue, then apply to the Residential Tenancies Branch (RTB) for an Order of Possession if the tenant does not vacate. Enforcement is through the Court of King's Bench if the tenant ignores the order.",
    "quickAnswer": "In Manitoba, a landlord can serve **Form 8 (Notice of Termination)** once rent is at least **3 days late**, then apply to the **Residential Tenancies Branch (RTB)** for an Order of Possession with a **$60 filing fee**. If the tenant still does not leave, the Order of Possession is enforced through the **Court of King's Bench**. Self-help eviction is illegal.",
    "atAGlance": {
      "grounds": "Non-payment of rent, breach of tenancy agreement, damage, illegal acts, or failure to vacate at end of tenancy",
      "minNotice": "5th day of the rental period for non-payment (landlord may issue notice if rent unpaid by the 5th day); reasonable notice for other breaches",
      "whereToFile": "Residential Tenancies Branch (RTB)",
      "filingFee": "$60 (Order of Possession application)",
      "typicalTimeframe": "6 to 12 weeks from notice to Order of Possession hearing"
    },
    "noticeTypes": [
      {
        "name": "Form 8 Notice of Termination (non-payment of rent)",
        "period": "Notice may be issued from the 5th day of the rental period if rent remains unpaid",
        "detail": "The notice must state the tenant's name, rental address, amount owing, move-out date, and the tenant's right to dispute; the tenant can remain if they pay in full and the landlord has not stated otherwise in writing."
      },
      {
        "name": "Form 9 Notice of Termination (breach of obligations other than non-payment)",
        "period": "Reasonable notice depending on severity",
        "detail": "Used for breaches such as damage or disturbance; specifies the breach and the required remedy or move-out date."
      }
    ],
    "steps": [
      {
        "title": "Issue Form 8 Notice of Termination to the tenant",
        "timeframe": "From the 5th day of the rental period if rent is unpaid",
        "detail": "Deliver the completed Form 8 in person to the tenant or an adult at the unit; the notice must include the amount owing and the termination date."
      },
      {
        "title": "Wait for the tenant to vacate or pay",
        "timeframe": "Until the termination date on the notice",
        "detail": "If the tenant pays the full amount before or on the termination date and the landlord has not reserved the right to terminate in writing, the tenancy continues."
      },
      {
        "title": "File an application for Order of Possession with the RTB",
        "timeframe": "After the termination date if tenant remains",
        "detail": "Submit the completed application form and pay the $60 filing fee to the RTB; the Branch schedules a hearing and returns the application to the landlord for service on the tenant."
      },
      {
        "title": "Attend the RTB hearing",
        "timeframe": "Typically 4 to 8 weeks after filing",
        "detail": "A hearing officer reviews the evidence from both parties and determines whether an Order of Possession should be issued."
      },
      {
        "title": "Enforce the Order of Possession through the Court of King's Bench",
        "timeframe": "If tenant does not comply with the order",
        "detail": "File the RTB Order of Possession in the Court of King's Bench, which authorizes court enforcement officers to carry out the physical eviction."
      }
    ],
    "costs": "The RTB Order of Possession application fee is **$60**. If enforcement is required through the Court of King's Bench, separate court filing fees and enforcement officer fees apply.",
    "tenantDefenses": [
      "Paying all rent owing before or on the termination date in the notice cancels the eviction if the landlord has not stated in writing that payment will not void the notice",
      "Procedural errors in the Form 8 (missing information, wrong amount, improper service) can invalidate the notice",
      "Tenant may raise a counterclaim for breach of landlord maintenance obligations at the RTB hearing",
      "Demonstrating that the notice was served prematurely (before the 5th day of the rental period) can defeat the application",
      "Hardship arguments may influence the hearing officer to extend the move-out date"
    ],
    "afterJudgment": "After the RTB issues an Order of Possession, **the landlord must file it in the Court of King's Bench** if the tenant refuses to vacate; court enforcement officers then carry out the physical eviction. Self-help eviction including changing locks, removing belongings, or cutting utilities is **illegal** under The Residential Tenancies Act and can expose the landlord to an order requiring compensation to the tenant.",
    "statute": "The Residential Tenancies Act, C.C.S.M. c. R119",
    "statuteUrl": "https://web2.gov.mb.ca/laws/statutes/ccsm/r119.php",
    "faqs": [
      {
        "q": "When can a Manitoba landlord serve a non-payment notice?",
        "a": "A landlord may issue Form 8 from the 5th day of the rental period if rent remains unpaid; for example, if rent is due on the 1st, notice can be given starting on the 5th."
      },
      {
        "q": "What is the RTB filing fee for an Order of Possession?",
        "a": "The filing fee is $60, submitted with the completed application to the Residential Tenancies Branch."
      },
      {
        "q": "Can the tenant stop the eviction by paying after the notice is served?",
        "a": "Yes, if the tenant pays all arrears before the termination date and the landlord has not stated in writing that payment will not prevent termination, the tenancy continues."
      },
      {
        "q": "Who enforces a Manitoba eviction order?",
        "a": "If the tenant does not comply with the RTB's Order of Possession, the landlord files the order in the Court of King's Bench and court enforcement officers carry out the physical eviction."
      },
      {
        "q": "How long does the Manitoba eviction process take?",
        "a": "From notice to an RTB Order of Possession typically takes 6 to 12 weeks; additional time is needed if court enforcement is required."
      }
    ]
  },
  "saskatchewan": {
    "slug": "saskatchewan",
    "state": "Saskatchewan",
    "abbr": "SK",
    "metaTitle": "How to Evict a Tenant in Saskatchewan (2026) | Revun",
    "description": "Saskatchewan landlords must serve written notice and, if the tenant refuses to leave, apply to the Office of Residential Tenancies (ORT) for a possession order. A Court of King's Bench sheriff is the only person who can physically remove a tenant.",
    "quickAnswer": "Serve a written termination notice (rent arrears trigger immediate notice after **15 days** overdue), then file with the **Office of Residential Tenancies (ORT)** for **$50**. A hearing is typically held within a few weeks and the ORT issues a decision within 1 to 2 days of the hearing.",
    "atAGlance": {
      "grounds": "Nonpayment of rent (15+ days overdue), lease violations, illegal activity, substantial property damage, landlord or family member moving in",
      "minNotice": "Immediate written notice (nonpayment 15+ days); 1 month (periodic tenancy, other cause); 1 week (week-to-week)",
      "whereToFile": "Office of Residential Tenancies (ORT)",
      "filingFee": "$50 CAD (non-refundable, paid via ORT online portal)",
      "typicalTimeframe": "4 to 8 weeks from notice to enforcement"
    },
    "noticeTypes": [
      {
        "name": "Immediate Notice to Vacate and Notice of Arrears",
        "period": "Immediate (no cure period required)",
        "detail": "Served when rent is overdue by **15 days or more**; the tenant may still dispute the notice at an ORT hearing before being removed."
      },
      {
        "name": "One-Month Notice to Vacate",
        "period": "1 full rental period (minimum 1 month)",
        "detail": "Used for most other grounds including lease violations, significant disturbance, or landlord personal use in a month-to-month tenancy."
      },
      {
        "name": "One-Week Notice to Vacate",
        "period": "1 week",
        "detail": "Used for week-to-week tenancies when ending the tenancy for cause or at natural expiry."
      },
      {
        "name": "Expedited / Emergency Notice",
        "period": "Varies (ORT hearing expedited)",
        "detail": "Available where a tenant creates a serious health or safety risk, significant property damage, or engages in illegal activity."
      }
    ],
    "steps": [
      {
        "title": "Serve written termination notice",
        "timeframe": "Day 1",
        "detail": "Deliver the notice in writing to the tenant at the rental unit, identifying the tenant, landlord, property address, termination date, and reason."
      },
      {
        "title": "Wait for notice period to expire",
        "timeframe": "Immediate to 1 month depending on grounds",
        "detail": "If the tenant pays all arrears or corrects the breach before the notice date, the tenancy continues and no application is needed."
      },
      {
        "title": "File application with the ORT",
        "timeframe": "After notice expiry",
        "detail": "Submit an ORT application online at saskatchewan.ca/ort and pay the **$50** non-refundable fee to request a possession order."
      },
      {
        "title": "Attend ORT hearing",
        "timeframe": "Within a few weeks of filing",
        "detail": "Both landlord and tenant present evidence; the ORT issues a written decision typically within 1 to 2 days of the hearing."
      },
      {
        "title": "Obtain Writ of Possession",
        "timeframe": "After ORT decision",
        "detail": "If the ORT orders possession, the landlord obtains a Writ of Possession from the ORT and delivers it to the Court of King's Bench sheriff."
      },
      {
        "title": "Sheriff enforces removal",
        "timeframe": "1 to 3 days after Writ delivery",
        "detail": "The Court of King's Bench sheriff is the **only** person authorized to physically remove the tenant; self-help eviction is illegal."
      }
    ],
    "costs": "The ORT application fee is **$50 CAD** (non-refundable). Landlords may also seek an order for unpaid rent and repair costs at the same hearing, avoiding a second filing fee.",
    "tenantDefenses": [
      "Paying all outstanding rent before the ORT hearing date voids a rent-arrears notice",
      "Disputing the notice within 15 days on grounds it was not properly served or the reason is invalid",
      "Proving the landlord failed to maintain the unit in a habitable condition (retaliatory eviction defense)",
      "Demonstrating the breach was minor or that the landlord did not allow a reasonable time to remedy a correctable violation",
      "Requesting a payment plan or demonstrating genuine hardship at the ORT hearing"
    ],
    "afterJudgment": "Once the ORT issues a possession order and a Writ of Possession is obtained, a **Court of King's Bench sheriff** executes the removal, typically within 1 to 3 days of receiving the writ. Self-help eviction (changing locks, removing belongings, or cutting utilities without a court order) is **illegal** in Saskatchewan and exposes the landlord to significant liability.",
    "statute": "The Residential Tenancies Act, 2006 (SS 2006, c R-22.0001)",
    "statuteUrl": "https://publications.saskatchewan.ca/#/products/23011",
    "faqs": [
      {
        "q": "How many days late must rent be before I can serve notice in Saskatchewan?",
        "a": "Rent must be at least **15 days overdue** before a landlord can serve an Immediate Notice to Vacate for non-payment."
      },
      {
        "q": "Can I lock a tenant out without a court order in Saskatchewan?",
        "a": "No. Only a Court of King's Bench sheriff acting on a Writ of Possession from the ORT may remove a tenant. Changing the locks yourself is illegal."
      },
      {
        "q": "How long does the ORT eviction process take in Saskatchewan?",
        "a": "The full process from notice to sheriff enforcement typically takes **4 to 8 weeks** depending on whether the tenant disputes the notice."
      },
      {
        "q": "What is the ORT filing fee for a possession application in Saskatchewan?",
        "a": "The non-refundable application fee is **$50 CAD**, payable through the ORT online portal at saskatchewan.ca/ort."
      },
      {
        "q": "What happens if a tenant pays rent arrears after receiving notice?",
        "a": "If the tenant pays all arrears owed before the ORT hearing date, the tenancy continues and the eviction application will typically not succeed."
      }
    ]
  },
  "nova-scotia": {
    "slug": "nova-scotia",
    "state": "Nova Scotia",
    "abbr": "NS",
    "metaTitle": "How to Evict a Tenant in Nova Scotia (2026) | Revun",
    "description": "Nova Scotia landlords must use prescribed forms administered by the Residential Tenancies Program. After serving Form D (nonpayment notice), landlords file Form J with the Director of Residential Tenancies and a sheriff enforces any resulting order.",
    "quickAnswer": "Serve **Form D** (Notice to Quit) giving the tenant **15 days** to pay or vacate, then file **Form J** with the **Residential Tenancies Program** for **$31.15**. A hearing is scheduled and only a sheriff can enforce the Director's eviction order.",
    "atAGlance": {
      "grounds": "Nonpayment of rent (3+ days overdue), lease violations, property damage, illegal activity, landlord or family member moving in, extensive renovations requiring vacant possession",
      "minNotice": "15 days (Form D nonpayment, monthly tenancy); 1 week (weekly tenancy nonpayment); notice periods vary by other grounds",
      "whereToFile": "Residential Tenancies Program (Director of Residential Tenancies), Access Nova Scotia",
      "filingFee": "$31.15 CAD (Form J application; waived for income assistance recipients)",
      "typicalTimeframe": "6 to 12 weeks from notice to enforcement"
    },
    "noticeTypes": [
      {
        "name": "Form D (Notice to Quit for Failure to Pay Rent)",
        "period": "15 days (monthly tenancy); 1 week (weekly tenancy)",
        "detail": "Landlord may serve Form D once rent is **3 days overdue**; tenant can cure the notice by paying all arrears within the 15-day period."
      },
      {
        "name": "Form K (Application for Non-Hearing Eviction and Rent Award)",
        "period": "After Form D notice period expires uncured",
        "detail": "Allows a landlord to apply for an eviction order and award of rent owing without scheduling a full hearing, if the tenant has not disputed."
      },
      {
        "name": "Notice to Quit (Lease Violation or Other Cause)",
        "period": "Varies by reason and tenancy type (typically 1 rental period)",
        "detail": "Used for grounds other than nonpayment, such as substantial breach of lease, property damage, or landlord personal use."
      },
      {
        "name": "Form J (Application to Director)",
        "period": "Filed after notice period expires",
        "detail": "The landlord's formal application for a hearing before the Director of Residential Tenancies to obtain an eviction order."
      }
    ],
    "steps": [
      {
        "title": "Serve Form D Notice to Quit",
        "timeframe": "Day 1 (once rent is 3+ days overdue)",
        "detail": "Deliver Form D to the tenant in writing, specifying the amount owed, the 15-day period to pay, and the consequence of non-payment."
      },
      {
        "title": "Wait 15-day cure period",
        "timeframe": "15 days",
        "detail": "If the tenant pays all arrears within 15 days, the notice is voided and the tenancy continues with no further action required."
      },
      {
        "title": "File Form J or Form K with Residential Tenancies Program",
        "timeframe": "After 15-day period expires",
        "detail": "Pay the **$31.15** fee and submit Form J (with hearing) or Form K (without hearing if uncontested) at any Access Nova Scotia location or online."
      },
      {
        "title": "Attend hearing before Director",
        "timeframe": "Several weeks after filing",
        "detail": "Both parties present evidence; the Director or designated officer issues a written decision on whether to grant the eviction order."
      },
      {
        "title": "Receive Director's eviction order",
        "timeframe": "Within days of hearing",
        "detail": "If the order is granted, the tenant is given a specified date to vacate; the landlord takes the order to court administrative offices for enforcement."
      },
      {
        "title": "Sheriff enforces removal",
        "timeframe": "After order is registered with the court",
        "detail": "Only the **sheriff** may physically remove a tenant; self-help eviction including changing locks or removing belongings without an order is **illegal**."
      }
    ],
    "costs": "The Form J application fee is **$31.15 CAD** (waived for those on Income Assistance, Social Assistance, or GIS). Landlords can request the fee be awarded against the tenant in the decision.",
    "tenantDefenses": [
      "Paying all outstanding rent within the 15-day Form D cure period voids the notice entirely",
      "Filing a written dispute within 10 days of receiving the notice with the Residential Tenancies Program",
      "Arguing the notice was not properly served or contained a material error",
      "Demonstrating the landlord was in breach of their own obligations (e.g., failure to maintain habitable conditions)",
      "Proving the eviction is retaliatory (e.g., following a tenant complaint to a regulatory body)"
    ],
    "afterJudgment": "The Director's eviction order must be registered with court administrative offices and is then enforced by a **sheriff**, who is the only person legally authorized to remove a tenant in Nova Scotia. Self-help eviction (changing locks, removing the tenant's property, or cutting utilities) is **illegal** and exposes the landlord to civil and potentially criminal liability.",
    "statute": "Residential Tenancies Act, RSNS 1989, c 401",
    "statuteUrl": "https://nslegislature.ca/sites/default/files/legc/statutes%20HTML/residential%20tenancies.htm",
    "faqs": [
      {
        "q": "How late does rent need to be before serving Form D in Nova Scotia?",
        "a": "Landlords may serve Form D once rent is **3 days overdue**, giving the tenant a 15-day period to pay all arrears or vacate."
      },
      {
        "q": "What is the filing fee for a Form J eviction application in Nova Scotia?",
        "a": "The fee is **$31.15 CAD**, and it may be waived if the applicant receives Income Assistance, Social Assistance, or the Guaranteed Income Supplement."
      },
      {
        "q": "Can a landlord change the locks without a court order in Nova Scotia?",
        "a": "No. Only a sheriff acting on a Director's eviction order may remove a tenant; changing locks without an order is illegal self-help eviction."
      },
      {
        "q": "How long does the Nova Scotia eviction process take?",
        "a": "The full process typically takes **6 to 12 weeks** from notice to sheriff enforcement, though contested cases or heavy caseloads can extend this further."
      },
      {
        "q": "What is Form K used for in Nova Scotia?",
        "a": "Form K allows landlords to apply for an eviction order and award of rent owing **without a full hearing** when the tenant has not disputed the Form D notice."
      }
    ]
  },
  "new-brunswick": {
    "slug": "new-brunswick",
    "state": "New Brunswick",
    "abbr": "NB",
    "metaTitle": "How to Evict a Tenant in New Brunswick (2026) | Revun",
    "description": "New Brunswick landlords serve a Notice to Vacate through Service New Brunswick and, if unpaid, a Final Notice to Vacate before filing a Landlord Application for Assistance with the Residential Tenancies Tribunal. A Residential Tenancies Officer or a Court of King's Bench judge must authorize any eviction order.",
    "quickAnswer": "Serve a **Notice to Vacate** giving **7 days** to pay rent arrears, then a **Final Notice to Vacate** (minimum **15 days**) if still unpaid, and file a **Landlord Application for Assistance** with the **Residential Tenancies Tribunal** (no application fee; **$75** sheriff enforcement fee). Most uncontested evictions resolve within **3 to 5 weeks**.",
    "atAGlance": {
      "grounds": "Nonpayment of rent, lease violations (nuisance, disturbance), illegal activity, substantial property damage, landlord personal use (with required notice)",
      "minNotice": "7 days (first Notice to Vacate, nonpayment); then 15 days (Final Notice to Vacate, nonpayment)",
      "whereToFile": "Residential Tenancies Tribunal (via Service New Brunswick / Tenant and Landlord Relations Office)",
      "filingFee": "No application fee; $75 CAD sheriff enforcement fee payable after eviction order is issued",
      "typicalTimeframe": "3 to 6 weeks from first notice to enforcement"
    },
    "noticeTypes": [
      {
        "name": "Notice to Vacate (Nonpayment of Rent)",
        "period": "7 days to pay or vacate",
        "detail": "First notice served when rent is unpaid; gives the tenant **7 days** to pay all arrears or the landlord may proceed to the next step."
      },
      {
        "name": "Final Notice to Vacate",
        "period": "Minimum 15 days to vacate",
        "detail": "Served if the tenant fails to pay after the first Notice to Vacate; **no payment option** is offered and the tenant must vacate by the stated date."
      },
      {
        "name": "Notice of Termination (Other Cause)",
        "period": "Varies by reason (typically 1 rental period)",
        "detail": "Used for lease violations such as nuisance, disturbance, illegal activity, or property damage; the tenant must vacate by the termination date."
      }
    ],
    "steps": [
      {
        "title": "Serve Notice to Vacate for nonpayment",
        "timeframe": "Day 1 of arrears",
        "detail": "Deliver a written Notice to Vacate to the tenant specifying the amount owed and the **7-day** period to pay all rent arrears."
      },
      {
        "title": "Serve Final Notice to Vacate if unpaid",
        "timeframe": "After 7-day cure period expires unpaid",
        "detail": "If the tenant does not pay, serve the Final Notice to Vacate giving at least **15 days** to vacate; no further payment option is available."
      },
      {
        "title": "File Landlord Application for Assistance",
        "timeframe": "Day after the tenant's required move-out date",
        "detail": "Submit the application to the Tenant and Landlord Relations Office by email, fax, mail, or at a Service New Brunswick service centre, attaching copies of all notices served."
      },
      {
        "title": "Residential Tenancies Officer investigation",
        "timeframe": "Within days to a few weeks of filing",
        "detail": "A Residential Tenancies Officer contacts the tenant, reviews evidence from both parties, and renders a decision on whether to issue an Eviction Order."
      },
      {
        "title": "Receive Eviction Order",
        "timeframe": "After officer's decision",
        "detail": "If an Eviction Order is issued, the Residential Tenancies Officer informs the landlord when the **$75** sheriff enforcement fee is due and provides the remittance form."
      },
      {
        "title": "Sheriff enforces the Eviction Order",
        "timeframe": "After $75 fee is paid",
        "detail": "Only a sheriff acting under the Eviction Order may physically remove the tenant; self-help eviction is **illegal** and can expose the landlord to liability."
      }
    ],
    "costs": "There is **no application fee** to file a Landlord Application for Assistance with the Residential Tenancies Tribunal. A **$75 CAD** non-refundable sheriff enforcement fee is payable only after an Eviction Order is issued, when the landlord wishes to have a sheriff carry out the order.",
    "tenantDefenses": [
      "Paying all outstanding rent within the 7-day cure period on the first Notice to Vacate to prevent issuance of the Final Notice",
      "Disputing the eviction to the Residential Tenancies Officer by demonstrating the notice was improperly served or the reason is invalid",
      "Proving the landlord failed to maintain the unit in a habitable state or breached the lease first",
      "Demonstrating the alleged lease violation (e.g., nuisance) did not occur or was not material",
      "Requesting a review of the Residential Tenancies Officer's decision before the Court of King's Bench"
    ],
    "afterJudgment": "Once a Residential Tenancies Officer issues an Eviction Order, the landlord pays the **$75 CAD** sheriff fee and a **sheriff** executes the removal. Only a Residential Tenancies Officer or a judge of the Court of King's Bench may authorize an eviction, and self-help eviction (such as changing locks without an order) is **illegal** in New Brunswick.",
    "statute": "The Residential Tenancies Act, SNB 1975, c R-10.2",
    "statuteUrl": "https://laws.gnb.ca/en/showdoc/cs/R-10.2",
    "faqs": [
      {
        "q": "What is the notice period for nonpayment of rent in New Brunswick?",
        "a": "Landlords first serve a **7-day** Notice to Vacate; if unpaid, they then serve a Final Notice to Vacate giving the tenant at least **15 more days** to vacate."
      },
      {
        "q": "Is there an application fee to file for eviction in New Brunswick?",
        "a": "There is **no application fee** to file the Landlord Application for Assistance. A separate **$75 CAD** fee is charged only when the sheriff is asked to enforce the Eviction Order."
      },
      {
        "q": "How long does a New Brunswick eviction typically take?",
        "a": "Uncontested evictions for nonpayment typically resolve in **3 to 5 weeks**; contested cases requiring a full officer investigation can extend to 6 weeks or longer."
      },
      {
        "q": "Who can legally remove a tenant in New Brunswick?",
        "a": "Only a **sheriff** acting under an Eviction Order issued by a Residential Tenancies Officer or a Court of King's Bench judge can physically remove a tenant."
      },
      {
        "q": "Can a tenant stop an eviction after receiving a Final Notice to Vacate?",
        "a": "A tenant can present their case to the Residential Tenancies Officer after a Landlord Application is filed, but the Final Notice to Vacate offers **no payment cure option**."
      }
    ]
  },
  "prince-edward-island": {
    "slug": "prince-edward-island",
    "state": "Prince Edward Island",
    "abbr": "PE",
    "metaTitle": "How to Evict a Tenant in Prince Edward Island (2026) | Revun",
    "description": "Prince Edward Island landlords serve a Notice of Termination and, if the tenant does not vacate, apply to the Director of Residential Rental Property (administered by IRAC) for a Delivery of Possession order. If needed, the order is filed with the Supreme Court and enforced by the Sheriff.",
    "quickAnswer": "Serve a written Notice of Termination giving **20 days** to vacate (nonpayment); the tenant has **10 days** to cure by paying all arrears. File an **Application for Delivery of Possession** with the **Director of Residential Rental Property (IRAC)**. The Sheriff enforces any Delivery of Possession order.",
    "atAGlance": {
      "grounds": "Nonpayment of rent, lease violations (breach of quiet enjoyment, cleanliness, damage), landlord or family member moving in, sale to purchaser requiring vacant possession, demolition or major renovation",
      "minNotice": "20 days (nonpayment of rent, monthly tenancy); 1 month (lease violation); 2 months (landlord personal use or sale)",
      "whereToFile": "Office of the Director of Residential Rental Property (IRAC Rental Office), Charlottetown, PE",
      "filingFee": "Approximately $10 CAD (complaint/application filing; confirm with IRAC at 1-800-501-6268)",
      "typicalTimeframe": "4 to 10 weeks from notice to enforcement depending on grounds and whether disputed"
    },
    "noticeTypes": [
      {
        "name": "Notice of Termination for Nonpayment of Rent (Form 4-A)",
        "period": "20 days to vacate; 10-day cure period to pay",
        "detail": "Served once rent is unpaid from the second day of the month; the tenant can void the notice by paying **all arrears within 10 days** of receiving it."
      },
      {
        "name": "Notice of Termination for Lease Violation",
        "period": "1 month",
        "detail": "Used for breaches such as failure to maintain cleanliness, interference with quiet enjoyment, or unreasonable damage to the property."
      },
      {
        "name": "Notice of Termination for Landlord Possession or Renovation",
        "period": "2 months (6 months for mobile home sites)",
        "detail": "Served when the landlord needs possession for a family member, a purchaser, demolition, or renovations requiring a vacant unit."
      }
    ],
    "steps": [
      {
        "title": "Serve written Notice of Termination",
        "timeframe": "Day 1 (once rent is 1+ day overdue)",
        "detail": "Deliver Form 4-A or the appropriate notice form to the tenant specifying the reason, amount owed (if applicable), and the termination date."
      },
      {
        "title": "Wait for cure period or vacate date",
        "timeframe": "10-day cure period; 20-day total notice (nonpayment)",
        "detail": "If the tenant pays all arrears within **10 days** of receiving the notice, the notice is voided and no further action is required."
      },
      {
        "title": "Tenant may file Application to Set Aside",
        "timeframe": "Within 10 days of receiving notice",
        "detail": "If the tenant disputes the notice, they file an Application to Set Aside with the Director; the landlord must wait for the Director's determination before proceeding."
      },
      {
        "title": "Apply for Delivery of Possession",
        "timeframe": "After vacate date passes and tenant remains",
        "detail": "If the tenant does not leave by the termination date, the landlord files an Application for Delivery of Possession with the IRAC Rental Office."
      },
      {
        "title": "Director issues Delivery of Possession order",
        "timeframe": "Within weeks of application",
        "detail": "The Director investigates and may hold a hearing; if the eviction is upheld, a Delivery of Possession order is issued to the landlord."
      },
      {
        "title": "File order with Supreme Court and engage Sheriff",
        "timeframe": "After order is issued",
        "detail": "The landlord files the Delivery of Possession order with the PEI Supreme Court, which enables **Sheriff Services** to escort the landlord to the property and remove the tenant."
      }
    ],
    "costs": "The application filing fee with the IRAC Rental Office is approximately **$10 CAD**. Additional costs include sheriff enforcement fees payable to Sheriff Services upon engaging the Supreme Court process. Contact IRAC at 1-800-501-6268 to confirm the current fee schedule.",
    "tenantDefenses": [
      "Paying all outstanding rent within the **10-day** cure period on a nonpayment notice voids the Notice of Termination",
      "Filing an Application to Set Aside within 10 days of receiving the notice, arguing improper service or an invalid ground",
      "Demonstrating that the landlord's stated ground (e.g., personal use) is pretextual or in bad faith",
      "Showing the landlord failed to maintain the unit in a habitable condition as a defense to a lease-violation notice",
      "Appealing the Director's decision to the Island Regulatory and Appeals Commission (IRAC)"
    ],
    "afterJudgment": "A Delivery of Possession order from the Director is filed with the **PEI Supreme Court**, after which **Sheriff Services** escorts the landlord to the property, removes the tenant if necessary, and permits the landlord to change the locks. Self-help eviction (locking out, removing belongings, or cutting services without an order) is **illegal** in Prince Edward Island.",
    "statute": "Rental of Residential Property Act, RSPEI 1988, c R-13.1 (for applications prior to April 2023); Residential Tenancy Act, SPEI 2023 (for applications filed on or after April 8, 2023)",
    "statuteUrl": "https://www.princeedwardisland.ca/en/legislation/rental-of-residential-property-act",
    "faqs": [
      {
        "q": "What is the notice period for nonpayment of rent in PEI?",
        "a": "The landlord serves a Notice of Termination (Form 4-A) giving the tenant **20 days** to vacate, with a **10-day window** to pay all arrears and void the notice."
      },
      {
        "q": "Which tribunal handles evictions in PEI?",
        "a": "The **Office of the Director of Residential Rental Property**, administered by the Island Regulatory and Appeals Commission (IRAC), hears eviction applications in PEI."
      },
      {
        "q": "Can a PEI tenant stop an eviction by paying rent after receiving the notice?",
        "a": "Yes. Paying all outstanding rent within **10 days** of receiving a nonpayment Notice of Termination fully voids the notice and the tenancy continues."
      },
      {
        "q": "How does a landlord in PEI physically remove a tenant after getting an order?",
        "a": "The Delivery of Possession order is filed with the **PEI Supreme Court**, and **Sheriff Services** then escorts the landlord to the property and removes the tenant."
      },
      {
        "q": "How long does the PEI eviction process take?",
        "a": "The process typically takes **4 to 10 weeks** from notice to sheriff enforcement, depending on whether the tenant disputes the notice and the Director's caseload."
      }
    ]
  },
  "newfoundland-labrador": {
    "slug": "newfoundland-labrador",
    "state": "Newfoundland and Labrador",
    "abbr": "NL",
    "metaTitle": "How to Evict a Tenant in Newfoundland and Labrador (2026) | Revun",
    "description": "Newfoundland and Labrador landlords serve a formal termination notice and, if the tenant remains, file an Application for Dispute Resolution with the Residential Tenancies Section of Service NL for a **$20** fee. The sheriff enforces the resulting Order of Possession.",
    "quickAnswer": "Serve a **Landlord's Notice to Terminate Early (Cause)** giving **10 days** notice when rent is **15+ days overdue**, then file an **Application for Dispute Resolution** with the **Residential Tenancies Section (Service NL)** for **$20 CAD**. A hearing is held within 20 km of the property and the local **Sheriff's Office** enforces any Order of Possession.",
    "atAGlance": {
      "grounds": "Nonpayment of rent (15+ days overdue), material breach of lease, illegal activity, significant property damage, interference with peaceful enjoyment of others",
      "minNotice": "10 days (nonpayment 15+ days overdue); 4 to 14 days (interference with peaceful enjoyment); 1 rental period (material breach after written notice); 3 months (periodic tenancy, no cause)",
      "whereToFile": "Residential Tenancies Section, Service NL (Department of Government Services)",
      "filingFee": "$20 CAD",
      "typicalTimeframe": "4 to 10 weeks from notice to enforcement; Order of Possession itself issued within approximately 1 week of hearing"
    },
    "noticeTypes": [
      {
        "name": "Landlord's Notice to Terminate Early (Cause)",
        "period": "10 days (nonpayment of rent 15+ days overdue)",
        "detail": "Served when rent has been unpaid for **15 days or more**; tenant receives **10 days** notice to vacate before the landlord may apply for dispute resolution."
      },
      {
        "name": "Landlord's Notice to Terminate (Interference)",
        "period": "Not less than 4 days (maximum 14 days)",
        "detail": "Served when a tenant interferes with the peaceful enjoyment of other occupants or causes a nuisance; the notice period ranges from **4 to 14 days**."
      },
      {
        "name": "Landlord's Notice to Terminate (Material Breach)",
        "period": "1 rental period after prior written notice",
        "detail": "Served after the landlord has given the tenant prior written notice of the breach and the tenant has failed to comply within the rental period."
      },
      {
        "name": "Landlord's Notice to Terminate (Standard / No Cause)",
        "period": "3 months (periodic tenancy)",
        "detail": "Used to end a month-to-month or other periodic tenancy without cause; at least **3 months** written notice is required."
      }
    ],
    "steps": [
      {
        "title": "Serve Landlord's Notice to Terminate Early (Cause)",
        "timeframe": "Day 1 (once rent is 15+ days overdue)",
        "detail": "Deliver the prescribed notice form to the tenant at the rental unit, specifying the grounds, amount owed (if applicable), and the 10-day termination date."
      },
      {
        "title": "Wait for notice period to expire",
        "timeframe": "10 days (nonpayment); varies by other grounds",
        "detail": "If the tenant pays all arrears or remedies the breach before the notice date, the landlord may not need to proceed further."
      },
      {
        "title": "File Application for Dispute Resolution with Service NL",
        "timeframe": "After notice period expires and tenant remains",
        "detail": "Complete the Application for Dispute Resolution form, pay the **$20** fee (online or in-person), and submit to the Residential Tenancies Section."
      },
      {
        "title": "Attend hearing",
        "timeframe": "Within weeks of filing",
        "detail": "A hearing is held within **20 km** of the rental property; both landlord and tenant present evidence and arguments to the adjudicator."
      },
      {
        "title": "Adjudicator issues Order of Possession",
        "timeframe": "Up to approximately 1 week after hearing",
        "detail": "If the eviction is upheld, the adjudicator issues a certified Order of Possession stating specific reasons; the tenant may appeal to the Director or Trial Division."
      },
      {
        "title": "Sheriff enforces Order of Possession",
        "timeframe": "After certified order is delivered to Sheriff's Office",
        "detail": "The landlord delivers the certified Order of Possession to the local **Sheriff's Office**, which escorts the landlord to the property and removes the tenant if necessary."
      }
    ],
    "costs": "The Application for Dispute Resolution fee is **$20 CAD**, payable online or in-person through Service NL. Separate sheriff enforcement fees may apply when the Sheriff's Office is engaged to carry out the Order of Possession.",
    "tenantDefenses": [
      "Paying all outstanding rent before the dispute resolution hearing to demonstrate arrears have been satisfied",
      "Disputing the notice on grounds it was improperly served or that rent was not actually 15 days overdue",
      "Demonstrating the landlord was in material breach of their own obligations (e.g., failure to repair or maintain)",
      "Appealing the adjudicator's decision to the Director of Residential Tenancies for reconsideration",
      "Appealing the Director's reconsideration decision to the Trial Division of the Newfoundland and Labrador Supreme Court"
    ],
    "afterJudgment": "The adjudicator's certified Order of Possession is delivered to the local **Sheriff's Office**, where a Sheriff's Officer escorts the landlord to the property, removes the tenant if necessary, and allows the landlord to change the locks. Self-help eviction (changing locks, removing belongings, or cutting utilities without an order) is **illegal** in Newfoundland and Labrador.",
    "statute": "Residential Tenancies Act, 2018, SNL 2018, c R-14.2",
    "statuteUrl": "https://assembly.nl.ca/legislation/sr/statutes/r14-2.htm",
    "faqs": [
      {
        "q": "How late does rent need to be before a landlord can serve notice in Newfoundland and Labrador?",
        "a": "Rent must be **15 days overdue** before a landlord can serve a Landlord's Notice to Terminate Early for nonpayment, which gives the tenant **10 days** notice."
      },
      {
        "q": "What is the filing fee for an eviction application in Newfoundland and Labrador?",
        "a": "The Application for Dispute Resolution fee is **$20 CAD**, payable to Service NL online or in-person."
      },
      {
        "q": "Who enforces eviction orders in Newfoundland and Labrador?",
        "a": "The local **Sheriff's Office** enforces Orders of Possession; a Sheriff's Officer escorts the landlord to the property and removes the tenant if they refuse to leave."
      },
      {
        "q": "How long does the Newfoundland and Labrador eviction process take?",
        "a": "The full process typically takes **4 to 10 weeks** from notice to sheriff enforcement; the Order of Possession itself is issued within approximately **1 week** of the hearing."
      },
      {
        "q": "Can a tenant appeal an eviction order in Newfoundland and Labrador?",
        "a": "Yes. A tenant may apply to the Director of Residential Tenancies for reconsideration and, if unsuccessful, may further appeal to the **Trial Division of the Supreme Court**."
      }
    ]
  },
  "yukon": {
    "slug": "yukon",
    "state": "Yukon",
    "abbr": "YT",
    "metaTitle": "How to Evict a Tenant in Yukon (2026) | Revun",
    "description": "A landlord in Yukon must serve a written notice, wait out the notice period, then apply to the Residential Tenancies Office (RTO) for dispute resolution if the tenant does not vacate. The RTO issues binding orders; a court enforcement officer carries out physical removal.",
    "quickAnswer": "Yukon evictions go through the **Residential Tenancies Office (RTO)**. Nonpayment of rent requires a **14-day notice**; the tenant can void it by paying within **5 days** (first offence only). The RTO filing fee is **$50**. Unlawful self-help eviction is prohibited under the *Residential Tenancies Act, S.Y. 2025, c. 7*.",
    "atAGlance": {
      "grounds": "Nonpayment of rent, breach of tenancy agreement, repeated late payment, property damage, disturbance, or landlord/family occupancy",
      "minNotice": "14 days (nonpayment or cause); 3 months (landlord/family occupancy)",
      "whereToFile": "Residential Tenancies Office (RTO), Whitehorse",
      "filingFee": "$50 CAD (fee waiver available)",
      "typicalTimeframe": "4 to 10 weeks from notice to order, depending on scheduling and whether the tenant contests"
    },
    "noticeTypes": [
      {
        "name": "14-Day Notice (nonpayment of rent)",
        "period": "14 days",
        "detail": "Served after rent is overdue; the tenant can void the notice by paying all outstanding rent within **5 days** of receipt, but only on the first offence."
      },
      {
        "name": "14-Day Notice (cause/breach)",
        "period": "14 days",
        "detail": "Used for significant breaches such as property damage, repeated disturbance, safety violations, or material breach of the tenancy agreement."
      },
      {
        "name": "3-Month Notice (landlord/family occupancy)",
        "period": "3 months",
        "detail": "Required when the landlord or an immediate family member genuinely needs to occupy the unit; no-cause evictions without this basis are prohibited under the 2025 Act."
      }
    ],
    "steps": [
      {
        "title": "Serve written notice",
        "timeframe": "Day 1",
        "detail": "Deliver the correct written notice (14-day or 3-month) stating the reason, effective date, and the tenant's address."
      },
      {
        "title": "Wait out the notice period",
        "timeframe": "14 days or 3 months",
        "detail": "The tenancy continues until the notice expires; do not attempt to enter or remove the tenant's belongings."
      },
      {
        "title": "Apply to the RTO if tenant remains",
        "timeframe": "After notice expires",
        "detail": "File an application for dispute resolution at the RTO (307 Black Street, Whitehorse) with the **$50** fee; the tenant has **10 days** from receiving the notice to file their own application."
      },
      {
        "title": "Attend RTO hearing",
        "timeframe": "Within weeks of filing",
        "detail": "A dispute resolution officer hears both parties and issues a binding written decision; no lawyer is required but one may be hired."
      },
      {
        "title": "Receive possession order",
        "timeframe": "Days after hearing",
        "detail": "If the RTO rules in the landlord's favour, it issues an order of possession specifying the date by which the tenant must vacate."
      },
      {
        "title": "Court enforcement if tenant refuses",
        "timeframe": "As needed after order",
        "detail": "If the tenant ignores the possession order, the landlord may apply to the Yukon Supreme Court to have a court enforcement officer remove the tenant and restore possession."
      }
    ],
    "costs": "The RTO application fee is **$50 CAD** (fee waiver available for low-income applicants). If court enforcement is required, additional sheriff or enforcement officer fees apply and vary by circumstance.",
    "tenantDefenses": [
      "Landlord failed to give proper written notice or used incorrect notice period",
      "Rent was paid in full before the 5-day void window expired (first nonpayment offence)",
      "Landlord served notice in bad faith (e.g., personal-use notice where occupancy did not occur)",
      "Landlord engaged in self-help eviction tactics (illegal under the Act)",
      "Tenant is protected from retaliatory eviction following a complaint or exercise of rights"
    ],
    "afterJudgment": "If the tenant does not vacate by the date in the RTO possession order, the landlord must apply to the Yukon Supreme Court for a writ of possession, which is then executed by a **court enforcement officer** (not the landlord). Self-help eviction tactics such as changing locks, removing belongings, or cutting utilities are illegal and expose the landlord to damages.",
    "statute": "Residential Tenancies Act, S.Y. 2025, c. 7",
    "statuteUrl": "https://laws.yukon.ca/cms/images/LEGISLATION/PRINCIPAL/2025/2025-0007/2025-0007_1.pdf",
    "faqs": [
      {
        "q": "Can a Yukon landlord evict without a reason?",
        "a": "No. The 2025 Residential Tenancies Act eliminated no-cause evictions. A landlord must cite a valid ground such as nonpayment, breach, or genuine personal occupancy."
      },
      {
        "q": "What happens if the tenant pays the overdue rent after receiving a 14-day notice?",
        "a": "On a first offence, the tenant can void the notice by paying all outstanding rent within **5 days** of receipt. On a second or subsequent nonpayment, paying does not void the notice."
      },
      {
        "q": "How long does the Yukon eviction process take?",
        "a": "From serving notice to receiving an RTO possession order typically takes **4 to 10 weeks**, longer if the tenant contests or court enforcement is later required."
      },
      {
        "q": "Can a landlord change the locks or remove a tenant's belongings to evict them?",
        "a": "No. Self-help eviction is illegal in Yukon. Only a court enforcement officer may physically remove a tenant after a proper court order."
      },
      {
        "q": "Where does a landlord file an eviction application in Yukon?",
        "a": "At the **Residential Tenancies Office (RTO)** at 307 Black Street, 1st Floor, Whitehorse, or by email to rto@yukon.ca, with a **$50** filing fee."
      }
    ]
  },
  "northwest-territories": {
    "slug": "northwest-territories",
    "state": "Northwest Territories",
    "abbr": "NT",
    "metaTitle": "How to Evict a Tenant in Northwest Territories (2026) | Revun",
    "description": "In the Northwest Territories, evictions are handled by the **Rental Officer** under the Residential Tenancies Act, RSNWT 1988, c. R-5. After obtaining an eviction order from the Rental Officer, the landlord files with the Supreme Court and the Sheriff carries out physical removal.",
    "quickAnswer": "NT evictions go through the **NWT Rental Office** (Rental Officer). The landlord files an eviction application (fee: **$100 CAD** for landlords); the Rental Officer holds a hearing and issues an order that carries the force of a Supreme Court order. The **Sheriff** enforces removal after a writ of possession is obtained. Self-help eviction is illegal.",
    "atAGlance": {
      "grounds": "Nonpayment or repeated late payment of rent, breach of tenancy agreement, property damage, disturbance/safety risk, or landlord/close-family occupancy",
      "minNotice": "10 days (cause/breach); 30 days (monthly tenancy termination); 90 days (landlord personal use)",
      "whereToFile": "NWT Rental Office, Yellowknife",
      "filingFee": "$100 CAD (landlord); $20 CAD (tenant); free for subsidized housing or domestic violence cases",
      "typicalTimeframe": "6 to 12 weeks from notice to Sheriff enforcement"
    },
    "noticeTypes": [
      {
        "name": "Notice to Terminate for Cause",
        "period": "10 days minimum",
        "detail": "Covers repeated nonpayment or late rent, property damage, disturbance, safety violations, or breach of the tenancy agreement."
      },
      {
        "name": "Notice to Terminate (monthly tenancy)",
        "period": "30 days",
        "detail": "Given on or before the last day of the month, effective the last day of the following rental month, for non-cause periodic terminations."
      },
      {
        "name": "Notice for Landlord/Family Occupancy",
        "period": "90 days",
        "detail": "Required when the landlord or a close relative intends to occupy the unit; must state the relationship and intended occupancy date."
      }
    ],
    "steps": [
      {
        "title": "Serve written termination notice",
        "timeframe": "Day 1",
        "detail": "Deliver written notice stating the premises address, reason for termination, and effective date; the reason must be a valid ground under the Act."
      },
      {
        "title": "Wait out the notice period",
        "timeframe": "10 to 90 days depending on ground",
        "detail": "The tenancy remains in effect through the notice period; do not take any self-help steps to remove the tenant."
      },
      {
        "title": "Apply to the Rental Officer for an eviction order",
        "timeframe": "After notice expires and tenant has not vacated",
        "detail": "File an application with the NWT Rental Office in Yellowknife with the **$100** fee; the Rental Officer schedules a hearing and gives the tenant at least **5 days** notice."
      },
      {
        "title": "Attend the Rental Officer hearing",
        "timeframe": "Within weeks of filing",
        "detail": "The Rental Officer hears both sides and issues an eviction order if the ground is proven; the order has the same force as a Supreme Court judgment."
      },
      {
        "title": "File writ of possession with the Supreme Court",
        "timeframe": "Within 6 months of order",
        "detail": "The landlord prepares an affidavit of non-compliance and files it with the Clerk of the NWT Supreme Court along with the writ of possession form and **$35** fee."
      },
      {
        "title": "Sheriff enforces removal",
        "timeframe": "Days to weeks after writ is issued",
        "detail": "The landlord delivers the eviction order and writ to the Sheriff personally; the Sheriff makes demand for entry and may use force if the tenant refuses to leave."
      }
    ],
    "costs": "The Rental Office application fee is **$100 CAD** for landlords (**$20** for tenants; free for subsidized housing or domestic-violence cases). Filing the writ of possession with the Supreme Court Clerk costs **$35 CAD**, plus the Sheriff's expenses and deposit (variable by circumstance).",
    "tenantDefenses": [
      "Notice was not in writing or did not state a valid reason under the Act",
      "The stated reason was not proven at the Rental Officer hearing",
      "Landlord engaged in self-help eviction (changing locks, removing belongings) before an order",
      "Eviction is retaliatory following a complaint or exercise of tenant rights",
      "Tenant is in subsidized public housing and qualifies for procedural protections or a fee waiver"
    ],
    "afterJudgment": "Once the NWT Rental Officer issues an eviction order, the landlord has **6 months** to file it with the Clerk of the NWT Supreme Court to obtain a writ of possession. The **Sheriff** then carries out physical removal; the landlord must deliver both documents to the Sheriff personally and pay a deposit for expenses. Changing locks, removing belongings, or cutting utilities before a writ is enforced by the Sheriff constitutes an illegal self-help eviction.",
    "statute": "Residential Tenancies Act, RSNWT 1988, c. R-5",
    "statuteUrl": "https://www.justice.gov.nt.ca/en/files/legislation/residential-tenancies/residential-tenancies.a.pdf",
    "faqs": [
      {
        "q": "Who handles evictions in the Northwest Territories?",
        "a": "The **NWT Rental Office** (a Rental Officer) adjudicates eviction applications. The Rental Officer's orders carry the same weight as a Supreme Court order."
      },
      {
        "q": "How much does it cost to file an eviction application in the NWT?",
        "a": "Landlords pay **$100 CAD**. Tenants pay **$20 CAD**. There is no fee for tenants in subsidized housing or domestic-violence situations."
      },
      {
        "q": "How long does an NT eviction typically take?",
        "a": "From serving notice to Sheriff enforcement typically takes **6 to 12 weeks**, assuming no appeals and prompt filing with the Supreme Court."
      },
      {
        "q": "Can a landlord remove a tenant's belongings to force them out?",
        "a": "No. Self-help eviction is illegal. Only the **Sheriff** may physically remove a tenant, and only after a writ of possession has been properly issued and filed."
      },
      {
        "q": "Can a tenant appeal a Rental Officer eviction order?",
        "a": "Yes. A tenant may appeal to the **NWT Supreme Court** within the time period set by the Act; however, filing the appeal does not automatically stay enforcement of the order."
      }
    ]
  },
  "nunavut": {
    "slug": "nunavut",
    "state": "Nunavut",
    "abbr": "NU",
    "metaTitle": "How to Evict a Tenant in Nunavut (2026) | Revun",
    "description": "Nunavut evictions are governed by the Residential Tenancies Act (as adopted for Nunavut) and administered by the **Nunavut Rental Office** through a Rental Officer. After an eviction order is issued, the landlord files with the Nunavut Court of Justice and the **Sheriff** carries out physical removal.",
    "quickAnswer": "Nunavut evictions go through the **Nunavut Rental Office** (Rental Officer). Nonpayment and most cause-based evictions require a **10-day notice**; periodic tenancies require **30 to 60 days**. The landlord filing fee is **$100 CAD** (tenant fee: $20 CAD). The **Sheriff** enforces removal after a writ of possession is registered with the Nunavut Court of Justice. Self-help eviction is illegal.",
    "atAGlance": {
      "grounds": "Repeated nonpayment of rent on due dates, missing security deposit, property damage, disturbance/safety risk, or landlord/close-family occupancy",
      "minNotice": "10 days (cause/nonpayment); 30 days (monthly tenancy under 12 months); 60 days (monthly tenancy over 12 months); 90 days (landlord personal use)",
      "whereToFile": "Nunavut Rental Office, Iqaluit (nu-rto.ca)",
      "filingFee": "$100 CAD (landlord); $20 CAD (tenant); free for subsidized housing or domestic violence cases",
      "typicalTimeframe": "6 to 14 weeks from notice to Sheriff enforcement, depending on remoteness and scheduling"
    },
    "noticeTypes": [
      {
        "name": "10-Day Notice to Vacate (cause/nonpayment)",
        "period": "10 days",
        "detail": "Used for repeated nonpayment of rent on the due dates specified in the tenancy agreement, failure to pay the security deposit, property damage, or disturbance/safety violations."
      },
      {
        "name": "30 to 60-Day Termination Notice (periodic tenancy)",
        "period": "30 days (tenancy under 12 months); 60 days (tenancy over 12 months)",
        "detail": "Required to end a monthly periodic tenancy without cause; notice must be given before the last day of the month with the corresponding period of notice."
      },
      {
        "name": "90-Day Notice (landlord/family occupancy)",
        "period": "90 days or end of the fixed term, whichever comes first",
        "detail": "Required when the landlord or a close family member genuinely intends to occupy the rental unit; must state the intended occupant's relationship to the landlord."
      }
    ],
    "steps": [
      {
        "title": "Serve written termination notice",
        "timeframe": "Day 1",
        "detail": "Deliver a signed, written notice stating the specific reason for termination, the address of the premises, and the date the tenant must vacate."
      },
      {
        "title": "Wait out the notice period",
        "timeframe": "10 days to 90 days depending on ground",
        "detail": "The tenancy continues through the notice period; do not lock out the tenant or remove their belongings."
      },
      {
        "title": "Apply to the Rental Officer for an eviction order",
        "timeframe": "After notice expires and tenant has not left",
        "detail": "File an application with the Nunavut Rental Office (nu-rto.ca) with the **$100** landlord fee; applications can also be submitted in person in Iqaluit."
      },
      {
        "title": "Rental Officer investigation and hearing",
        "timeframe": "Weeks after filing; hearings often held by telephone",
        "detail": "The Rental Officer investigates, may inspect the premises, attempts mediation, then holds a hearing; both parties are notified at least **5 days** in advance."
      },
      {
        "title": "Receive eviction order",
        "timeframe": "Days after hearing",
        "detail": "If granted, the Rental Officer issues an eviction order, which may be enforced by the Nunavut Court of Justice; a tenant may appeal to the Court within **14 days**."
      },
      {
        "title": "File writ of possession and Sheriff enforcement",
        "timeframe": "Within 6 months of order; Sheriff acts within days to weeks",
        "detail": "The landlord files the eviction order with the Clerk of the Nunavut Court of Justice to obtain a writ of possession, then delivers both documents to the **Sheriff** for physical enforcement."
      }
    ],
    "costs": "The Rental Office application fee is **$100 CAD** for landlords (**$20** for tenants; free for subsidized housing or domestic-violence cases). Additional court filing and Sheriff enforcement fees apply when the writ of possession stage is reached; exact amounts vary by community.",
    "tenantDefenses": [
      "Written notice was deficient or did not state a valid statutory ground",
      "Nonpayment was not repeated on the due dates specified in the tenancy agreement",
      "Landlord used illegal self-help tactics before obtaining a proper eviction order",
      "Eviction is retaliatory following the tenant exercising rights or making a complaint",
      "Appeal filed within 14 days of the Rental Officer order to the Nunavut Court of Justice"
    ],
    "afterJudgment": "Once the Rental Officer issues an eviction order, the landlord must register it with the Clerk of the **Nunavut Court of Justice** within **6 months** to obtain a writ of possession. The **Nunavut Sheriff** then physically removes the tenant; the landlord delivers the order and writ to the Sheriff personally. Changing locks, removing a tenant's belongings, cutting utilities, or otherwise forcing a tenant out without a Sheriff-executed writ constitutes an illegal self-help eviction.",
    "statute": "Residential Tenancies Act, RSNWT (Nu) 1988, c. R-5",
    "statuteUrl": "https://www.nunavutlegislation.ca/en/consolidated-law/residential-tenancies-act-official-consolidation",
    "faqs": [
      {
        "q": "Who handles evictions in Nunavut?",
        "a": "The **Nunavut Rental Office** (a Rental Officer) adjudicates eviction applications; its orders are enforceable by the Nunavut Court of Justice."
      },
      {
        "q": "How much does it cost to file an eviction in Nunavut?",
        "a": "Landlords pay **$100 CAD**. Tenants pay **$20 CAD**. There is no fee for tenants in subsidized housing or domestic-violence situations."
      },
      {
        "q": "How long does a Nunavut eviction typically take?",
        "a": "From serving notice to Sheriff enforcement typically takes **6 to 14 weeks**; remote communities can extend this significantly due to logistics and scheduling."
      },
      {
        "q": "Can a tenant appeal a Rental Officer's eviction order?",
        "a": "Yes. A landlord or tenant may appeal to the **Nunavut Court of Justice within 14 days** of the Rental Officer's decision."
      },
      {
        "q": "Can a landlord lock out a tenant who owes rent?",
        "a": "No. Self-help eviction is illegal in Nunavut. The landlord must obtain an eviction order from the Rental Officer and a writ from the Court, then the **Sheriff** carries out removal."
      }
    ]
  }
}
