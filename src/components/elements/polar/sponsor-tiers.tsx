"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

interface SponsorTiersProps {
  tiers: SponsorTier[];
  onSponsor: (tierName: string) => void;
  selectedTier?: string | null;
  onTierSelect: (tierName: string) => void;
  isPending?: boolean;
  className?: string;
}

export function SponsorTiers({
  tiers,
  onSponsor,
  selectedTier,
  onTierSelect,
  isPending = false,
  className,
}: SponsorTiersProps) {
  return (
    <div className={className}>
      <div className="space-y-8">
        <div className="grid gap-4 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <button
              key={tier.name}
              type="button"
              className={`relative flex h-full w-full flex-col justify-between border border-border p-6 text-sm hover:border-foreground/20 transition-all duration-200 group cursor-pointer ${
                selectedTier === tier.name
                  ? "bg-primary/5 border-primary"
                  : tier.isHighlight
                    ? "bg-red-500/5 border-red-500/20"
                    : "bg-card/30"
              }`}
              onClick={() => onTierSelect(tier.name)}
              aria-label={`Select ${tier.name} sponsorship tier`}
            >
              {/* Corner decorations */}
              <div className="absolute top-0 left-0 w-2 h-2 bg-border"></div>
              <div className="absolute top-0 right-0 w-2 h-2 bg-border"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 bg-border"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-border"></div>

              {tier.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground">
                  Most Popular
                </Badge>
              )}
              {tier.isHighlight && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-red-500 text-white flex items-center gap-1">
                  Dream Tier
                </Badge>
              )}

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center justify-center w-10 h-10 bg-muted group-hover:bg-muted/80 transition-colors">
                    <svg
                      className="size-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-label="Heart icon"
                      role="img"
                    >
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <Badge
                    variant={tier.popular ? "default" : "secondary"}
                    className="text-xs"
                  >
                    {tier.name}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="text-2xl font-bold">
                    <span className="text-base">
                      ${tier.price}+{" "}
                      <span className="text-xs font-normal text-muted-foreground">
                        {tier.isOneTime ? "minimum/once" : "minimum/mo"}
                      </span>
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                <ul className="space-y-2 text-xs">
                  {tier.perks.map((perk, index) => (
                    <li
                      key={`${tier.name}-perk-${index}`}
                      className="flex items-start gap-2"
                    >
                      <div className="size-1 bg-primary flex-shrink-0 mt-1.5" />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <div className="my-2 h-[1px] w-full bg-border"></div>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {tier.isOneTime ? "Donation" : "Sponsorship"}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {tier.isOneTime ? "One-time" : "Monthly"}
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center space-y-4">
          <Button
            size="lg"
            className="h-14 px-8 text-lg gap-2"
            disabled={!selectedTier || isPending}
            onClick={() => selectedTier && onSponsor(selectedTier)}
          >
            <svg
              className="size-5"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-label="Heart icon"
              role="img"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            {isPending
              ? "Creating checkout..."
              : selectedTier
                ? `Sponsor with ${selectedTier}`
                : "Select a tier"}
          </Button>
          <p className="text-sm text-muted-foreground">
            Need a custom tier?{" "}
            <a
              href="mailto:hello@yourdomain.com?subject=Custom Sponsorship"
              className="underline hover:text-foreground"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
