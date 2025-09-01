"use client";

import { useState, useTransition } from "react";

import { SponsorTiers } from "./sponsor-tiers";

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
  onSponsor: (tierName: string) => Promise<void> | void;
  className?: string;
  children?: React.ReactNode;
}

export function SponsorshipPage({
  title = "Sponsor This Project",
  subtitle = "Support open source development",
  tiers,
  onSponsor,
  className,
  children,
}: SponsorshipPageProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSponsor = (tierName: string) => {
    startTransition(async () => {
      try {
        await onSponsor(tierName);
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
