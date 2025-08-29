import { ComponentPageTemplate } from "@/components/component-page-template";
import { ClerkLogo } from "@/components/clerk-logo";
import { ShieldIcon } from "@/components/icons/shield";
import { ServerIcon } from "@/components/icons/server";
import { ZapIcon } from "@/components/icons/zap";

export default function ClerkPage() {
  const features = [
    {
      icon: <ShieldIcon className="w-3 h-3" />,
      title: "Authentication Components",
      description: "Sign-in, sign-up, user profile, and organization management"
    },
    {
      icon: <ServerIcon className="w-3 h-3" />,
      title: "Backend Integration",
      description: "API routes, middleware, and session management"
    },
    {
      icon: <ZapIcon className="w-3 h-3" />,
      title: "Zero Configuration",
      description: "Works out of the box with your existing setup"
    }
  ];

  const technicalDetails = [
    {
      icon: <ShieldIcon className="w-6 h-6" />,
      title: "Security First",
      description: "Built-in CSRF protection, secure session management, and OAuth integration"
    },
    {
      icon: <ServerIcon className="w-6 h-6" />,
      title: "Full-Stack",
      description: "Includes API routes, middleware, database schemas, and client components"
    },
    {
      icon: <ZapIcon className="w-6 h-6" />,
      title: "Fast Setup",
      description: "One command installation with automatic configuration and setup"
    }
  ];

  const usageExample = `<span class="text-blue-400">import</span>
<span class="text-foreground"> {"{ ClerkAuth }"} </span>
<span class="text-blue-400">from</span>
<span class="text-green-400"> "@/components/clerk-auth"</span>
<br />
<span class="text-gray-500">{"<ClerkAuth />"}</span>`;

  return (
    <ComponentPageTemplate
      brandColor="#654BF6"
      category="AUTHENTICATION"
      name="Clerk Auth"
      description="Complete authentication flows with Clerk integration. Drop-in components for sign-up, sign-in, user management, and session handling."
      icon={<ClerkLogo className="w-12 h-12" />}
      features={features}
      technicalDetails={technicalDetails}
      installCommand="shadcn add @elements/clerk-auth"
      usageExample={usageExample}
    />
  );
}