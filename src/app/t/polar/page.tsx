"use client";

import { SponsorshipPage } from "@registry/default/elements/polar/sponsorship/sponsorship-page";

import { ComponentPageTemplate } from "@/components/component-page-template";
import { ServerIcon } from "@/components/icons/server";
import { ShieldIcon } from "@/components/icons/shield";
import { ZapIcon } from "@/components/icons/zap";
import { PolarIcon } from "@/components/ui/logos/polar";

export default function PolarPage() {
  const features = [
    {
      icon: <ShieldIcon className="w-3 h-3" />,
      title: "Complete Monetization",
      description: "Full sponsorship flow with Polar integration",
    },
    {
      icon: <ServerIcon className="w-3 h-3" />,
      title: "Production Ready",
      description: "Built with official Polar API and proper error handling",
    },
    {
      icon: <ZapIcon className="w-3 h-3" />,
      title: "Zero Config",
      description: "Works immediately with your existing Polar setup",
    },
  ];

  const technicalDetails = [
    {
      icon: <ShieldIcon className="w-6 h-6" />,
      title: "Production Ready",
      description:
        "Real Polar API integration with proper error handling and loading states",
    },
    {
      icon: <ServerIcon className="w-6 h-6" />,
      title: "TypeScript",
      description:
        "Fully typed components with comprehensive error handling and validation",
    },
    {
      icon: <ZapIcon className="w-6 h-6" />,
      title: "Copy & Use",
      description:
        "Install once, use immediately - no additional configuration needed",
    },
  ];

  const usageExample = `<span class="text-blue-400">import</span>
<span class="text-foreground"> { SponsorshipPage } </span>
<span class="text-blue-400">from</span>
<span class="text-green-400"> "@registry/polar-sponsorship"</span>
<br />
<span class="text-gray-500">&lt;SponsorshipPage /&gt;</span>`;

  // Mock data for the demo
  const mockTiers = [
    {
      name: "Supporter",
      price: 10,
      description: "Help keep the project alive",
      perks: ["Early access to updates", "Discord community access"],
    },
    {
      name: "Sponsor",
      price: 50,
      description: "Help shape the project direction",
      perks: ["Feature voting rights", "Priority support", "Logo in README"],
      popular: true,
    },
    {
      name: "Partner",
      price: 200,
      description: "Become a key partner",
      perks: [
        "Direct feature requests",
        "Monthly 1:1 calls",
        "Custom components",
      ],
      isHighlight: true,
    },
  ];

  const mockSponsorHandler = async (tierName: string) => {
    console.log("Mock sponsor handler:", tierName);
    alert(`Demo: Would initiate sponsorship for ${tierName} tier`);
  };

  const polarComponents = {
    sponsorship: (
      <div className="w-full max-w-4xl mx-auto">
        <SponsorshipPage
          title="Support Elements"
          subtitle="Help us build the future of full-stack components"
          tiers={mockTiers}
          onSponsor={mockSponsorHandler}
        />
      </div>
    ),
  };

  const componentInstallUrls = {
    sponsorship: "@elements/polar-sponsorship",
  };

  return (
    <ComponentPageTemplate
      brandColor="#0062FF"
      category="MONETIZATION"
      name="Polar"
      description="Monetization platform components for open source creators. Complete sponsorship flows with tier management and sponsor showcase."
      icon={<PolarIcon className="w-12 h-12" />}
      features={features}
      technicalDetails={technicalDetails}
      installCommand="bunx shadcn@latest add @elements/polar-sponsorship"
      usageExample={usageExample}
      components={polarComponents}
      componentInstallUrls={componentInstallUrls}
      layout={{ type: "auto", columns: 1, gap: "lg" }}
    />
  );
}
