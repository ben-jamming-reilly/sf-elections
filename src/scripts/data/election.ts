import { ElectionCandidateSrc } from "../types";

const elections: ElectionCandidateSrc[] = [
  {
    name: "Mayor of San Francisco",
    slug: "mayor",
    description: "Election for Mayor of San Francisco",
    isActive: true,
    isQuestionnaire: true,
    candidates: [
      {
        name: "London Breed",
        slug: "london-breed",
        profileImg: "/candidates/london-breed-pfp.jpg", // Add URL if available
        description: "Incumbent Mayor of San Francisco",
        hasFinished: true,
        urls: [
          "https://www.londonformayor.com/issues",
          "https://www.sf.gov/mayoral-priorities",
        ],
      },
      {
        name: "Mark Farrell",
        slug: "mark-farrell",
        profileImg: "/candidates/mark-farrell-pfp.jpg", // Add URL if available
        description: "Former interim mayor and San Francisco Supervisor",
        hasFinished: true,
        urls: [
          "https://www.markfarrell.com/public-safety/",
          "https://www.markfarrell.com/fentanyl-overdose-crisis/",
          "https://www.markfarrell.com/street-conditions/",
          "https://www.markfarrell.com/economic-vitality/",
          "https://www.markfarrell.com/housing/",
          "https://www.markfarrell.com/public-education/",
          "https://www.markfarrell.com/universal-childcare/",
          "https://www.markfarrell.com/tech/",
        ],
      },
      {
        name: "Daniel Lurie",
        slug: "daniel-lurie",
        profileImg: "/candidates/daniel-lurie-pfp.jpg", // Add URL if available
        description: "Founder and former CEO of Tipping Point Community",
        hasFinished: true,
        urls: [
          "https://daniellurie.com/priorities/public-safety/",
          "https://daniellurie.com/priorities/mental-health-drug-crisis/",
          "https://daniellurie.com/priorities/accountability/",
          "https://daniellurie.com/priorities/small-business-downtown-revitalization/",
          "https://daniellurie.com/priorities/housing/",
          "https://daniellurie.com/priorities/shelter/",
          "https://daniellurie.com/priorities/lgbtq/",
          "https://daniellurie.com/climatehub/",
          "https://daniellurie.com/priorities/climate-emergency-transportation/",
          "https://daniellurie.com/priorities/ethics/",
          "https://daniellurie.com/priorities/family/",
        ],
      },
      {
        name: "Aaron Peskin",
        slug: "aaron-peskin",
        profileImg: "/candidates/aaron-peskin-pfp.jpg", // Add URL if available
        description: "President of the Board of Supervisors",
        hasFinished: true,
        urls: [
          "https://www.aaron2024.com/platform",
          "https://www.aaron2024.com/homelessness-strategy",
          "https://www.aaron2024.com/public-safety",
          "https://www.aaron2024.com/housing-agenda",
          "https://www.aaron2024.com/transit-platform",
        ],
      },
      {
        name: "Ahsha Safaí",
        slug: "ahsha-safai",
        profileImg: "/candidates/ahsha-safai-pfp.jpg", // Add URL if available
        description: "Supervisor of District 11",
        hasFinished: true,
        urls: [
          "https://www.ahshaformayor.com/endstreethomelessness",
          "https://www.ahshaformayor.com/improve-public-safety",
          "https://www.ahshaformayor.com/mental-health",
          "https://www.ahshaformayor.com/reimagine-our-downtown",
          "https://www.ahshaformayor.com/violence-prevention",
        ],
      },
    ],
  },
  {
    name: "Board of Supervisors, District 1",
    slug: "supervisors-district-1",
    description: "Election for Board of Supervisors, District 1",
    isActive: true,
    isQuestionnaire: true,
    candidates: [
      {
        name: "Jeremiah Boehner",
        description: "",
        hasFinished: true,
        slug: "jeremiah-boehner",
        profileImg: "/candidates/jeremiah-boehner-pfp.webp",
        urls: [
          "https://www.jeremiahforsf.com/about",
          "https://www.jeremiahforsf.com/post/let-s-talk-trash-cans",
          "https://www.jeremiahforsf.com/post/will-taxing-rideshare-save-muni",
          "https://www.jeremiahforsf.com/post/muni-we-have-a-problem",
          "https://www.jeremiahforsf.com/post/we-need-more-police",
          "https://www.jeremiahforsf.com/post/a-plan-to-save-san-francisco",
          "https://www.jeremiahforsf.com/post/san-francisco-is-in-trouble",
        ],
      },
      {
        name: "Connie Chan",
        slug: "connie-chan",
        profileImg: "/candidates/connie-chan-pfp.jpg", // Add URL if available
        description: "Incumbent District 1 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.conniechansf.com/issues",
          "https://www.conniechansf.com/post/roadmap-for-a-safer-district-1",
          "https://www.conniechansf.com/post/supporting-tenants-and-small-property-landlords",
          "https://www.conniechansf.com/post/boosting-small-business-and-improving-the-richmond",
          "https://www.conniechansf.com/post/protecting-workers-and-their-families",
          "https://www.conniechansf.com/post/demanding-transit-safety-equity-and-efficiency",
          "https://www.conniechansf.com/post/tackling-the-climate-crisis",
          "https://www.conniechansf.com/post/ensuring-local-input-for-future-tax-revenues",
        ],
      },
      {
        name: "Sherman D'Silva",
        slug: "sherman-dsilva",
        profileImg: "/candidates/sherman-dsilva-pfp.jpeg", // Add URL if available
        description: "Business owner running for District 1 Supervisor",
        hasFinished: true,
        urls: [
          "https://2016dsilva.wixsite.com/vote-dsilva-2016/priorities",
          "https://richmondsunsetnews.com/2020/10/06/candidate-for-district-1-supervisor-sherman-dsilva/",
        ],
      },
      {
        name: "Jen Nossokoff",
        slug: "jen-nossokoff",
        profileImg: "/candidates/jen-nossokoff-pfp.jpeg", // Add URL if available
        description: "Nonprofit director",
        hasFinished: false,
        urls: ["https://www.jennossokoff.com/platform"],
      },
      {
        name: "Marjan Philhour",
        slug: "marjan-philhour",
        profileImg: "/candidates/marjan-philhour-pfp.jpg", // Add URL if available
        description: "Political strategist and community advocate",
        hasFinished: true,
        urls: ["https://www.votemarjan.com/marjansplan"],
      },
    ],
  },
  {
    name: "Board of Supervisors, District 3",
    slug: "supervisors-district-3",
    description: "Election for Board of Supervisors, District 3",
    isActive: true,
    isQuestionnaire: true,
    candidates: [
      {
        name: "Wendy Ha Chau",
        slug: "wendy-ha-chau",
        profileImg: "/candidates/wendy-ha-chau-pfp.jpg", // Add URL if available
        description: "Candidate for District 3 Supervisor",
        hasFinished: true,
        urls: ["https://voteforwendy.org/important-issues"],
      },
      {
        name: "Moe Jamil",
        slug: "moe-jamil",
        profileImg: "/candidates/moe-jamil-pfp.webp", // Add URL if available
        description: "Candidate for District 3 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.moejamil.com/issues",
          "https://ballotpedia.org/Moe_Jamil#Campaign_themes",
          "https://sfberniecrats.com/wp-content/uploads/2024/05/Jamil_d3.pdf",
        ],
      },
      {
        name: "Sharon Lai",
        slug: "sharon-lai",
        profileImg: "/candidates/sharon-lai-pfp.jpeg", // Add URL if available
        description: "Candidate for District 3 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.sharonlaisf.com/issues",
          "https://ballotpedia.org/Sharon_Lai",
        ],
      },
      {
        name: "Eduard Navarro",
        slug: "eduard-navarro",
        profileImg: "/candidates/eduard_navarro-pfp.png", // Add URL if available
        description: "Candidate for District 3 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.navarro.vote/discover",
          "https://ballotpedia.org/Eduard_Navarro",
        ],
      },
      {
        name: "Danny Sauter",
        slug: "danny-sauter",
        profileImg: "/candidates/danny-sauter-pfp.png", // Add URL if available
        description: "Candidate for District 3 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.dannyd3.com/issues",
          "https://ballotpedia.org/Danny_Sauter",
        ],
      },
      {
        name: "Matthew Susk",
        slug: "matthew-susk",
        profileImg: "/candidates/matthew-susk-pfp.jpg", // Add URL if available
        description: "Candidate for District 3 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.votesusk.com/issues/housing",
          "https://www.votesusk.com/issues/government-accountability",
          "https://www.votesusk.com/issues/thriving-businesses",
          "https://www.votesusk.com/issues/safe-streets",
        ],
      },
    ],
  },
  {
    name: "Board of Supervisors, District 5",
    slug: "supervisors-district-5",
    description: "Election for Board of Supervisors, District 5",
    isActive: true,
    isQuestionnaire: true,
    candidates: [
      {
        name: "Scotty Jacobs",
        slug: "scotty-jacobs",
        profileImg: "/candidates/scotty-jacobs-pfp.jpeg", // Add URL if available
        description: "Candidate for District 5 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.scottyd5.org/affordable-housing-now",
          "https://www.scottyd5.org/end-problematic-homelessness",
          "https://www.scottyd5.org/2plus2",
          "https://www.scottyd5.org/public-safety",
          "https://www.scottyd5.org/save-muni",
          "https://www.scottyd5.org/education-first",
          "https://www.scottyd5.org/dance-music-capital",
          "https://ballotpedia.org/Scotty_Jacobs",
        ],
      },
      {
        name: "Allen Jones",
        slug: "allen-jones",
        profileImg: "/candidates/allen-jones-pfp.jpg", // Add URL if available
        description: "Candidate for District 5 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.d5campaign.com/",
          "https://www.d5campaign.com/my-top-concerns",
          "https://www.d5campaign.com/why-run",
          "https://www.d5campaign.com/my-top-concerns",
          "https://www.d5campaign.com/about",
          "https://ballotpedia.org/Allen_Jones",
        ],
      },
      {
        name: "Autumn Hope Looijen",
        slug: "autumn-hope-looijen",
        profileImg: "/candidates/autumn-looijen-pfp.png", // Add URL if available
        description: "Candidate for District 5 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.sfchronicle.com/bayarea/article/sf-district-5-supervisor-race-preston-looijen-18887730.php",
          "https://www.hope4sf.com/",
          "https://yeson36treatmentnow.com/",
          "https://www.hope4sf.com/keep-proxy-parcel-k---autumn-for-d5-supervisor",
          "https://www.hope4sf.com/sf-d5-drug-policy-fenta-nil-shut-down-the-open-drug-markets",
          "https://www.recallsfschoolboard.org/",
          "https://ballotpedia.org/Autumn_Looijen",
        ],
      },
      {
        name: "Bilal Mahmood",
        slug: "bilal-mahmood",
        profileImg: "/candidates/bilal-mahmood-pfp.png", // Add URL if available
        description: "Candidate for District 5 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.bilalmahmood.com/platform",
          "https://www.bilalmahmood.com/about",
          "https://ballotpedia.org/Bilal_Mahmood",
          "https://en.wikipedia.org/wiki/Bilal_Mahmood",
        ],
      },
      {
        name: "Dean Preston",
        slug: "dean-preston",
        profileImg: "/candidates/dean-preston-pfp.png", // Add URL if available
        description: "Incumbent District 5 Supervisor",
        hasFinished: true,
        urls: [
          "https://ballotpedia.org/Dean_Preston",
          "https://en.wikipedia.org/wiki/Dean_Preston",
          "https://dean2024.com/housingrecord",
          "https://dean2024.com/public-safety",
          "https://dean2024.com/housing",
          "https://dean2024.com/tenants-rights",
          "https://dean2024.com/homelessness",
          "https://dean2024.com/mental-health-and-addiction",
          "https://dean2024.com/small-business",
          "https://dean2024.com/public-transit-and-pedestrian-safety",
          "https://dean2024.com/food-security",
          "https://dean2024.com/environment",
          "https://dean2024.com/children-families-and-youth",
          "https://dean2024.com/combating-corruption-and-promoting-good-government",
          "https://dean2024.com/vision-for-the-next-four-years",
        ],
      },
    ],
  },
  {
    name: "Board of Supervisors, District 7",
    slug: "supervisors-district-7",
    description: "Election for Board of Supervisors, District 7",
    isActive: true,
    isQuestionnaire: true,
    candidates: [
      {
        name: "Matt Boschetto",
        slug: "matt-boschetto",
        profileImg: "/candidates/matt-boschetto-pfp.webp", // Add URL if available
        description: "Candidate for District 7 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.matt4supervisor.com/",
          "https://www.matt4supervisor.com/priorities",
        ],
      },
      {
        name: "Stephen Martin-Pinto",
        slug: "stephen-martin-pinto",
        profileImg: "/candidates/steve-martin-pinto-pfp.jpg", // Add URL if available
        description: "Candidate for District 7 Supervisor",
        hasFinished: true,
        urls: [
          "https://ballotpedia.org/Stephen_Martin-Pinto",
          "https://www.stephenmartinpinto.com/",
          "https://www.stephenmartinpinto.com/my-platform",
        ],
      },
      {
        name: "Myrna Melgar",
        slug: "myrna-melgar",
        profileImg: "/candidates/myrna-melgar-pfp.jpg", // Add URL if available
        description: "Incumbent District 7 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.myrnamelgar.com/issues",
          "https://en.wikipedia.org/wiki/Myrna_Melgar",
          "https://ballotpedia.org/Myrna_Melgar",
        ],
      },
      {
        name: "Edward S. Yee",
        slug: "edward-s-yee",
        profileImg: "/candidates/edward-s-yee-pfp.jpg", // Add URL if available
        description: "Candidate for District 7 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.inglesidelight.com/edward-yee-district-7-supervisor-candidate-questionnaire/",
        ],
      },
    ],
  },
  {
    name: "Board of Supervisors, District 9",
    slug: "supervisors-district-9",
    description: "Election for Board of Supervisors, District 9",
    isActive: true,
    isQuestionnaire: true,
    candidates: [
      {
        name: "Julian E. Bermudez",
        slug: "julian-e-bermudez",
        profileImg: "/candidates/julian-bermudez-pfp.jpeg", // Add URL if available
        description: "Candidate for District 9 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.votelocalsf.com/",
          "https://www.votelocalsf.com/meettheteam",
          "https://ballotpedia.org/Julian_Bermudez",
        ],
      },
      {
        name: "H. Brown",
        slug: "h-brown",
        profileImg: null, // Add URL if available
        description: "Candidate for District 9 Supervisor",
        hasFinished: true,
        urls: [],
      },
      {
        name: "Trevor Chandler",
        slug: "trevor-chandler",
        profileImg: "/candidates/trevor-chandler-pfp.png", // Add URL if available
        description: "Candidate for District 9 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.trevor4sf.com/",
          "https://www.trevor4sf.com/public-safety",
          "https://www.trevor4sf.com/homelessness",
          "https://www.trevor4sf.com/small-business",
          "https://www.trevor4sf.com/greener-sf",
          "https://www.trevor4sf.com/vandalism",
          "https://www.trevor4sf.com/bart",
          "https://www.trevor4sf.com/housing-for-all",
          "https://ballotpedia.org/Trevor_Chandler",
        ],
      },
      {
        name: "Jackie Fielder",
        slug: "jackie-fielder",
        profileImg: "/candidates/jackie-fielder-pfp.png", // Add URL if available
        description: "Candidate for District 9 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.jackieforsf.com/",
          "https://www.jackieforsf.com/about",
          "https://www.jackieforsf.com/housing",
          "https://www.jackieforsf.com/publicsafety",
          "https://www.jackieforsf.com/homelessness",
          "https://www.jackieforsf.com/overdosementalhealth",
          "https://www.jackieforsf.com/transportation",
          "https://www.jackieforsf.com/smallbusiness",
          "https://www.jackieforsf.com/environmentaljustice",
          "https://ballotpedia.org/Jackie_Fielder",
        ],
      },
      {
        name: "Jaime Gutierrez",
        slug: "jaime-gutierrez",
        profileImg: "/candidates/jaime-gutierrez-pfp.jpg", // Add URL if available
        description: "Candidate for District 9 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.gutierrez2024.com/",
          "https://ballotpedia.org/Jaime_Gutierrez",
        ],
      },
      {
        name: "Roberto Hernandez",
        slug: "roberto-hernandez",
        profileImg: "/candidates/roberto-hermandez-pfp.webp", // Add URL if available
        description: "Candidate for District 9 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.roberto4sf.com/",
          "https://www.roberto4sf.com/about",
          "https://www.roberto4sf.com/government-experience",
          "https://www.roberto4sf.com/issues",
          "https://www.roberto4sf.com/safetyplan",
        ],
      },
      {
        name: "Stephen Jon Torres",
        slug: "stephen-jon-torres",
        profileImg: "/candidates/stephen-jon-torres-pfp.jpeg", // Add URL if available
        description: "Candidate for District 9 Supervisor",
        hasFinished: false,
        urls: [
          "https://www.stephentorressf.com/issues",
          "https://www.stephentorressf.com/issues-economy",
          "https://www.stephentorressf.com/education",
          "https://www.stephentorressf.com/issues-health",
          "https://www.stephentorressf.com/housing",
          "https://www.stephentorressf.com/transportation",
        ],
      },
    ],
  },
  {
    name: "Board of Supervisors, District 11",
    slug: "supervisors-district-11",
    description: "Election for Board of Supervisors, District 11",
    isActive: true,
    isQuestionnaire: true,
    candidates: [
      {
        name: "Chyanne Chen",
        slug: "chyanne-chen",
        profileImg: "/candidates/chyanne-chen-pfp.webp", // Add URL if available
        description: "Candidate for District 11 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.chyannechen.com/",
          "https://www.chyannechen.com/about",
          "https://www.chyannechen.com/issues",
          "https://www.chyannechen.com/post/health-safety",
          "https://www.chyannechen.com/post/caring-across-generations",
          "https://www.chyannechen.com/post/thriving-economy",
          "https://www.chyannechen.com/post/housing-infrastructure",
        ],
      },
      {
        name: "Adlah Chisti",
        slug: "adlah-chisti",
        profileImg: "/candidates/adlah-christi-pfp.jpg", // Add URL if available
        description: "Candidate for District 11 Supervisor",
        hasFinished: true,
        urls: ["https://www.adlahchisti.com/policy"],
      },
      {
        name: "Oscar Flores",
        slug: "oscar-flores",
        profileImg: "/candidates/oscar-flores-pfp.jpg", // Add URL if available
        description: "Candidate for District 11 Supervisor",
        hasFinished: true,
        urls: [
          "https://oscarforsf.com/",
          "https://oscarforsf.com/issues",
          "https://ballotpedia.org/Oscar_Flores",
        ],
      },
      {
        name: 'Ernest "EJ" Jones',
        slug: "ernest-jones",
        profileImg: "/candidates/ernest-jones-pfp.jpg", // Add URL if available
        description: "Candidate for District 11 Supervisor",
        hasFinished: true,
        urls: [
          "https://www.ejforsf.com/",
          "https://www.ejforsf.com/issues",
          "https://www.ejforsf.com/about",
        ],
      },
      {
        name: "Michael Lai",
        slug: "michael-lai",
        profileImg: "/candidates/michael-lai-pfp.jpg", // Add URL if available
        description: "Candidate for District 11 Supervisor",
        hasFinished: false,
        urls: [
          "https://www.votemichaellai.com/",
          "https://www.votemichaellai.com/facts",
          "https://ballotpedia.org/Michael_Lai",
        ],
      },
      {
        name: "Roger K. Marenco",
        slug: "roger-k-marenco",
        profileImg: "/candidates/roger-marenco-pfp.jpg", // Add URL if available
        description: "Candidate for District 11 Supervisor",
        hasFinished: false,
        urls: [
          "https://www.inglesidelight.com/roger-marenco-district-11-supervisor-campaign/",
        ],
      },
      {
        name: "Jose Morales",
        slug: "jose-morales",
        profileImg: "/candidates/jose-morales-pfp.png", // Add URL if available
        description: "Candidate for District 11 Supervisor",
        hasFinished: true,
        urls: [
          "https://ballotpedia.org/Jose_Morales_(California)",
          "https://joseforsf.com/",
        ],
      },
    ],
  },
];
