"use client";

import { useState, useTransition } from "react";

import { SponsorTiers } from "@/components/elements/polar/sponsor-tiers";

// Example Polar Product IDs - Replace with your own product IDs
const EXAMPLE_POLAR_PRODUCT_IDS = {
  "Tip Jar": "714b5098-71bd-43a3-b704-b776ab9b57d3",
  Supporter: "a80fbd28-adb3-48e2-9dba-ca7d19919abb",
  Sponsor: "99ba3a23-8056-4532-a0ea-f378d40ac178",
  Backer: "8bf45d94-2972-4bd4-b745-cd34b3bdc629",
};

interface SponsorTier {
  name: string;
  price: number;
  description: string;
  perks: string[];
  popular?: boolean;
  isHighlight?: boolean;
  isFlexible?: boolean;
  isOneTime?: boolean;
}

interface SponsorshipPageProps {
  title?: string;
  subtitle?: string;
  tiers: SponsorTier[];
  productIds?: Record<string, string>;
  className?: string;
  children?: React.ReactNode;
}

export function SponsorshipPage({
  title = "Sponsor This Project",
  subtitle = "Support open source development",
  tiers,
  productIds,
  className,
  children,
}: SponsorshipPageProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleChooseYourTier = () => {
    // Smooth scroll to sponsor tiers section
    const sponsorTiersSection = document.getElementById("sponsor-tiers");
    if (sponsorTiersSection) {
      sponsorTiersSection.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    // Select Supporter tier by default
    setSelectedTier("Supporter");
  };

  const handleSponsor = (tierName: string) => {
    startTransition(() => {
      try {
        // Use provided product IDs or fall back to examples
        const productIdsToUse = productIds || EXAMPLE_POLAR_PRODUCT_IDS;
        const productId = productIdsToUse[tierName];

        if (!productId) {
          throw new Error(`No product ID found for tier: ${tierName}`);
        }

        // Use the Polar NextJS adapter checkout route
        const checkoutUrl = `/api/checkout?products=${productId}`;
        window.location.href = checkoutUrl;
      } catch (error) {
        console.error("Failed to create checkout:", error);
        alert("Failed to create checkout. Please try again.");
      }
    });
  };

  return (
    <div className={className}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="w-full pt-12 pb-8 px-4">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                {title}
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                {subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom content */}
      {children}

      {/* Sponsor Tiers */}
      <div id="sponsor-tiers" className="w-full px-4 py-8">
        <SponsorTiers
          tiers={tiers}
          onSponsor={handleSponsor}
          selectedTier={selectedTier}
          onTierSelect={setSelectedTier}
          isPending={isPending}
        />
      </div>
    </div>
  );
}
