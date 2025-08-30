import { ComponentPageTemplate } from "@/components/component-page-template";
import { MailIcon } from "@/components/icons/mail";
import { ServerIcon } from "@/components/icons/server";
import { ZapIcon } from "@/components/icons/zap";
import { ShieldIcon } from "@/components/icons/shield";
import { WaitlistElement } from "@/components/elements/clerk/waitlist/waitlist";

export default function WaitlistPage() {
  const features = [
    {
      icon: <MailIcon className="w-3 h-3" />,
      title: "Email Collection",
      description:
        "Collects and validates email addresses with form validation",
    },
    {
      icon: <ServerIcon className="w-3 h-3" />,
      title: "Server Actions",
      description:
        "Uses React Server Actions for secure server-side processing",
    },
    {
      icon: <ZapIcon className="w-3 h-3" />,
      title: "Animated Feedback",
      description: "Smooth animations and loading states for better UX",
    },
  ];

  const technicalDetails = [
    {
      icon: <ShieldIcon className="w-6 h-6" />,
      title: "Clerk Integration",
      description:
        "Built-in integration with Clerk's waitlist API for user management",
    },
    {
      icon: <ServerIcon className="w-6 h-6" />,
      title: "Server Actions",
      description: "Leverages React 19's useActionState hook for form handling",
    },
    {
      icon: <ZapIcon className="w-6 h-6" />,
      title: "Motion Animations",
      description: "Framer Motion integration for smooth state transitions",
    },
  ];

  const usageExample = `<span class="text-blue-400">import</span>
<span class="text-foreground"> {"{ WaitlistElement }"} </span>
<span class="text-blue-400">from</span>
<span class="text-green-400"> "@/components/waitlist"</span>
<br />
<span class="text-gray-500">{"<WaitlistElement />"}</span>`;

  const waitlistComponents = {
    default: <WaitlistElement />,
    compact: (
      <div className="max-w-sm">
        <WaitlistElement />
      </div>
    ),
    wide: {
      component: (
        <div className="w-full max-w-lg">
          <WaitlistElement />
        </div>
      ),
      colSpan: 2 as const,
    },
  };

  return (
    <ComponentPageTemplate
      brandColor="#10B981"
      darkBrandColor="#059669"
      category="FORM"
      name="Waitlist"
      description="Elegant waitlist signup component with email validation, server actions, and animated feedback states."
      icon={<MailIcon className="w-12 h-12" />}
      features={features}
      technicalDetails={technicalDetails}
      installCommand="shadcn add @elements/clerk-waitlist"
      usageExample={usageExample}
      components={waitlistComponents}
      layout={{ type: "auto", columns: 3, gap: "md" }}
    />
  );
}
