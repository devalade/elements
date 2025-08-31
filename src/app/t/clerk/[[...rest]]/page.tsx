"use client";

import { useRouter } from "next/navigation";

import { SignIn, SignUp, useClerk, useUser, Waitlist } from "@clerk/nextjs";
import { ClerkSignInElement } from "@registry/default/elements/clerk/sign-in";
import { ClerkSignUpElement } from "@registry/default/elements/clerk/sign-up";
import { WaitlistElement } from "@registry/default/elements/clerk/waitlist-shadcn/waitlist";

import { ClerkLogo } from "@/components/clerk-logo";
import { ComponentPageTemplate } from "@/components/component-page-template";
import { ServerIcon } from "@/components/icons/server";
import { ShieldIcon } from "@/components/icons/shield";
import { ZapIcon } from "@/components/icons/zap";
import { Button } from "@/components/ui/button";

export default function ClerkPage() {
  const { isSignedIn, isLoaded } = useUser();
  const clerk = useClerk();
  const router = useRouter();
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

  const clerkComponents = {
    "sign-in":
      isLoaded && isSignedIn ? (
        <div className="w-full max-w-sm mx-auto p-6 border border-border rounded-lg bg-card">
          <div className="space-y-4">
            <div className="text-center">
              <ClerkLogo className="w-8 h-8 mx-auto mb-2" />
              <h2 className="text-lg font-semibold">Already Signed In</h2>
              <p className="text-sm text-muted-foreground">
                You're currently signed in
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => router.push("/0-dashboard")}
                className="flex-1"
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  await clerk.signOut();
                  window.location.reload();
                }}
                className="flex-1"
              >
                Sign Out & Try
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <SignIn routing="hash" />
      ),
    "sign-up":
      isLoaded && isSignedIn ? (
        <div className="w-full max-w-sm mx-auto p-6 border border-border rounded-lg bg-card">
          <div className="space-y-4">
            <div className="text-center">
              <ClerkLogo className="w-8 h-8 mx-auto mb-2" />
              <h2 className="text-lg font-semibold">Already Signed In</h2>
              <p className="text-sm text-muted-foreground">
                You're currently signed in
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => router.push("/0-dashboard")}
                className="flex-1"
              >
                Go to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={async () => {
                  await clerk.signOut();
                  window.location.reload();
                }}
                className="flex-1"
              >
                Sign Out & Try
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <SignUp routing="hash" />
      ),
    waitlist: <Waitlist />,
    "sign-in-shadcn": <ClerkSignInElement />,
    "sign-up-shadcn": <ClerkSignUpElement />,
    "waitlist-shadcn": <WaitlistElement />,
  };

  const componentInstallUrls = {
    "sign-in": "@elements/clerk-sign-in",
    "sign-up": "@elements/clerk-sign-up",
    waitlist: "@elements/clerk-waitlist",
    "sign-in-shadcn": "@elements/clerk-sign-in-shadcn",
    "sign-up-shadcn": "@elements/clerk-sign-up-shadcn",
    "waitlist-shadcn": "@elements/clerk-waitlist-shadcn",
  };

  return (
    <ComponentPageTemplate
      brandColor="#654BF6"
      category="AUTHENTICATION"
      name="Clerk Auth"
      description="Complete authentication flows with Clerk. Drop-in full-stack elements for sign-in, sign-up, and waitlists."
      icon={<ClerkLogo className="w-12 h-12" />}
      features={features}
      installCommand="bunx shadcn@latest add @elements/clerk-auth"
      components={clerkComponents}
      componentInstallUrls={componentInstallUrls}
      layout={{ type: "auto", columns: 3, gap: "sm" }}
    />
  );
}
