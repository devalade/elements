// Example sponsor data - replace with your actual sponsors
export interface Sponsor {
  name: string;
  tier: string;
  url: string;
  logo: React.ReactNode;
}

// Example sponsors - replace with your actual sponsors
export const currentSponsors: Sponsor[] = [
  // Add your sponsors here
  // {
  //   name: "Company Name",
  //   tier: "Sponsor",
  //   url: "https://company.com",
  //   logo: <CompanyLogo className="h-8 w-auto" />
  // }
];

// Default sponsor tiers - customize as needed
export interface SponsorTier {
  name: string;
  price: number;
  description: string;
  perks: string[];
  popular?: boolean;
  isHighlight?: boolean;
  isFlexible?: boolean;
  isOneTime?: boolean;
}

export const defaultSponsorTiers: SponsorTier[] = [
  {
    name: "Tip Jar",
    price: 3,
    description: "One-time thank you",
    perks: ["Good karma", "My eternal gratitude", "Warm fuzzy feeling"],
    popular: false,
    isFlexible: true,
    isOneTime: true,
  },
  {
    name: "Supporter",
    price: 15,
    description: "Monthly support",
    perks: ["Name in credits", "Progress updates", "Feel good vibes"],
    popular: true,
    isFlexible: true,
  },
  {
    name: "Sponsor",
    price: 75,
    description: "Serious support",
    perks: [
      "Logo on sponsor wall",
      "Priority feature requests",
      "Direct feedback line",
    ],
    popular: false,
    isFlexible: true,
  },
  {
    name: "Backer",
    price: 300,
    description: "Make me work full-time on open source",
    perks: [
      "Everything above",
      "Custom feature requests",
      "Monthly calls",
      "I'll probably cry (happy tears)",
    ],
    popular: false,
    isHighlight: true,
    isFlexible: true,
  },
];
