import type { Candidate, Election } from "@prisma/client";
import { ElectionCandidateSrc } from "../types";

export const mayorElectionCandidates: ElectionCandidateSrc = {
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
};
