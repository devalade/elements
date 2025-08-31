import { ComponentPageTemplate } from "@/components/component-page-template";
import { ClerkLogo } from "@/components/clerk-logo";
import { ClerkSignInElement } from "@registry/default/elements/clerk/sign-in";
import { ClerkSignUpElement } from "@registry/default/elements/clerk/sign-up";
import { WaitlistElement } from "@registry/default/elements/clerk/waitlist/waitlist";
import { ShieldIcon } from "@/components/icons/shield";
import { ServerIcon } from "@/components/icons/server";
import { ZapIcon } from "@/components/icons/zap";

export default function ClerkPage() {
  const features = [
    {
      icon: <ShieldIcon className="w-3 h-3" />,
      title: "Complete Auth Flows",
      description: "Sign-in, sign-up, and waitlist components with validation",
    },
    {
      icon: <ServerIcon className="w-3 h-3" />,
      title: "Production Ready",
      description: "Built with official Clerk SDK and proper error handling",
    },
    {
      icon: <ZapIcon className="w-3 h-3" />,
      title: "Zero Config",
      description: "Works immediately with your existing Clerk setup",
    },
  ];

  const technicalDetails = [
    {
      icon: <ShieldIcon className="w-6 h-6" />,
      title: "Production Ready",
      description:
        "Real Clerk API integration with proper error handling and loading states",
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
<span class="text-foreground"> {"{ ClerkSignIn }"} </span>
<span class="text-blue-400">from</span>
<span class="text-green-400"> "@registry/clerk/sign-in"</span>
<br />
<span class="text-gray-500">{"<ClerkSignIn />"}</span>`;

  const clerkComponents = {
    "sign-in": <ClerkSignInElement />,
    "sign-up": <ClerkSignUpElement />,
    waitlist: <WaitlistElement />,
  };

  const componentInstallUrls = {
    "sign-in": "@elements/clerk-sign-in",
    "sign-up": "@elements/clerk-sign-up",
    waitlist: "@elements/clerk-waitlist",
  };

  return (
    <ComponentPageTemplate
      brandColor="#654BF6"
      category="AUTHENTICATION"
      name="Clerk Auth"
      description="Complete authentication flows with Clerk. Drop-in full-stack elements for sign-in, sign-up, and waitlists."
      icon={<ClerkLogo className="w-12 h-12" />}
      features={features}
      technicalDetails={technicalDetails}
      installCommand="shadcn@latest add @elements/clerk-auth"
      usageExample={usageExample}
      components={clerkComponents}
      componentInstallUrls={componentInstallUrls}
      layout={{ type: "auto", columns: 3, gap: "sm" }}
    />
  );
}
