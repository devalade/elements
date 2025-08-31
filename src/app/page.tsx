"use client";

import { ScrambleText } from "@/components/scramble-text";
import { ShadcnIcon } from "@/components/shadcn-icon";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ComponentCard } from "@/components/component-card";
import { ClerkLogo } from "@/components/clerk-logo";
import { MoonIcon } from "@/components/icons/moon";
import { TriggerIcon } from "@/components/icons/trigger";
import { UploadThingIcon } from "@/components/icons/upload-thing";
import { SupabaseIcon } from "@/components/ui/logos/supabase";
import { StripeIcon } from "@/components/ui/logos/stripe";
import { ResendIcon } from "@/components/ui/logos/resend";
import { BetterAuthIcon } from "@/components/ui/logos/better-auth";
import { UpstashIcon } from "@/components/ui/logos/upstash";
import { VercelIcon } from "@/components/ui/logos/vercel";
import { PolarIcon } from "@/components/ui/logos/polar";
import { GroupIcon } from "@/components/icons/group";
import { CrafterStationLogo } from "@/components/ui/logos/crafter-station";
import { KeboLogo } from "@/components/ui/logos/kebo";
import { PixelatedHeartIcon } from "@/components/pixelated-heart-icon";
import { ElementSuggestionForm } from "@/components/element-suggestion-form";
import { QuickstartCard } from "@/components/quickstart-card";
import { Button } from "@/components/ui/button";

export default function Home() {
  const scrollToGallery = () => {
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
      gallerySection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToSuggest = () => {
    const suggestSection = document.getElementById("suggest");
    if (suggestSection) {
      suggestSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 w-full max-w-screen-xl border-border border-dotted border-x mx-auto">
        {/* Main Hero Section - Basement Style */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8 lg:gap-16 items-center w-full min-h-[80vh] py-16 px-8 lg:px-16">
          <div className="lg:col-span-4 space-y-8">
            {/* Narrative Block */}
            <section className="space-y-6">
              <div className="text-lg uppercase tracking-[0.2em] font-mono text-primary/70">
                [ELEMENTS]
              </div>
              <h1 className="font-dotted font-black text-5xl lg:text-7xl leading-tight tracking-tight">
                Full-Stack
                <br />
                <ShadcnIcon className="size-8 md:size-12 lg:size-16 inline-block" />{" "}
                shadcn/ui
                <br />
                components
              </h1>
              <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed max-w-2xl">
                Elements gives you production-ready auth, payments, AI and more
                — built for Next.js, TypeScript, and the agentic era.
              </p>
            </section>

            {/* CTAs */}
            <div className="flex items-center gap-4">
              <Button
                size="lg"
                className="font-medium"
                onClick={scrollToGallery}
              >
                Explore Gallery →
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="font-medium hover:underline"
                onClick={scrollToSuggest}
              >
                Suggest an Element
              </Button>
            </div>
          </div>

          {/* Quickstart Card */}
          <div className="lg:col-span-3 w-full">
            <QuickstartCard />
          </div>
        </div>

        {/* Beta Component Gallery - Full Width */}
        <div
          id="gallery"
          className="w-full py-16 border-t border-border border-dotted px-8"
        >
          <div className="space-y-8">
            <h2 className="w-full flex justify-center mb-16">
              <ScrambleText
                text="Beta Elements Gallery"
                className="font-dotted font-black text-4xl lg:text-6xl"
              />
            </h2>

            <div className="grid gap-4 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <ComponentCard
                name="Clerk Auth"
                description="Complete authentication flows with Clerk integration"
                icon={<ClerkLogo className="w-6 h-6" />}
                category="Auth"
                brandColor="#654BF6"
                isEnabled={true}
                href="/t/clerk"
              />
              <ComponentCard
                name="Tech Logos"
                description="Collection of popular tech company logos with shopping cart selection"
                icon={<GroupIcon className="w-6 h-6" />}
                category="Brand"
                isEnabled={true}
                href="/t/logos"
              />
              <ComponentCard
                name="Theme Switcher"
                description="Dark/light mode toggle with system preference detection"
                icon={<MoonIcon className="w-6 h-6" />}
                category="UI"
                isEnabled={true}
                href="/t/theme-switcher"
              />
              <ComponentCard
                name="Vercel AI SDK"
                description="AI-powered chat and streaming components with model providers"
                icon={<VercelIcon className="w-6 h-6" />}
                category="AI"
                brandColor="#000000"
                isEnabled={false}
                href="/t/vercel"
              />
              <ComponentCard
                name="Trigger.dev"
                description="Background job scheduling and monitoring components"
                icon={<TriggerIcon className="w-6 h-6" />}
                category="Jobs"
                brandColor="#8DFF53"
                isEnabled={false}
                href="/t/trigger"
              />
              <ComponentCard
                name="Upstash"
                description="Redis and Kafka database components with edge computing"
                icon={<UpstashIcon className="w-6 h-6" />}
                category="Database"
                brandColor="#00C98D"
                isEnabled={false}
                href="/t/upstash"
              />
              <ComponentCard
                name="UploadThing"
                description="Complete file upload solution with drag & drop interface"
                icon={<UploadThingIcon className="w-6 h-6" />}
                category="Files"
                brandColor="#E91515"
                isEnabled={false}
                href="/t/uploadthing"
              />
              <ComponentCard
                name="Supabase"
                description="Database connection and CRUD operation components"
                icon={<SupabaseIcon className="w-6 h-6" />}
                category="Database"
                brandColor="#3ECF8E"
              />
              <ComponentCard
                name="Polar"
                description="Monetization platform for open source creators"
                icon={<PolarIcon className="w-6 h-6" />}
                category="Monetization"
                brandColor="#0062FF"
              />
              <ComponentCard
                name="Better Auth"
                description="Route protection and role-based access control"
                icon={<BetterAuthIcon className="w-6 h-6" />}
                category="Auth"
                brandColor="#000000"
              />
              <ComponentCard
                name="Resend"
                description="Responsive email templates with React Email"
                icon={<ResendIcon className="w-6 h-6" />}
                category="Email"
                brandColor="#000000"
              />
              <ComponentCard
                name="Stripe"
                description="Stripe integration with checkout and subscription flows"
                icon={<StripeIcon className="w-6 h-6" />}
                category="Payments"
                brandColor="#635BFF"
              />
            </div>
          </div>
        </div>

        {/* Sponsors & Contact Section */}
        <div className="w-full border-t border-border border-dotted">
          <div className="space-y-0">
            <div className="px-8 py-16 text-center space-y-8">
              <div className="space-y-2">
                <h2>
                  <ScrambleText
                    text="Sponsors"
                    className="font-dotted font-black text-4xl lg:text-6xl"
                  />
                </h2>
                <p className="text-muted-foreground text-lg">
                  Join these companies building with Elements - ready-to-use
                  components that scale
                </p>
              </div>
            </div>

            {/* Three Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              <a
                href="https://crafterstation.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border-t border-r md:border-r border-border border-dotted bg-card/30 backdrop-blur-sm hover:bg-accent/20 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center justify-center min-h-[200px] px-6 py-12 space-y-4">
                  <CrafterStationLogo className="h-12 w-12 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-center space-y-1">
                    <h4 className="text-2xl uppercase font-black font-dotted text-foreground group-hover:text-primary transition-colors">
                      Crafter Station
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      crafterstation.com
                    </p>
                  </div>
                </div>
              </a>
              <a
                href="https://kebo.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border-t border-l md:border-l-0 border-r md:border-r border-border border-dotted bg-card/30 backdrop-blur-sm hover:bg-accent/20 transition-all duration-300 group"
              >
                <div className="flex flex-col items-center justify-center min-h-[200px] px-6 py-12 space-y-4">
                  <KeboLogo className="h-12 w-12 opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="text-center space-y-1">
                    <h4 className="text-2xl uppercase font-black font-dotted text-foreground group-hover:text-primary transition-colors">
                      Kebo
                    </h4>
                    <p className="text-xs text-muted-foreground">kebo.app</p>
                  </div>
                </div>
              </a>
              <div className="flex items-center justify-center border-t border-l md:border-l-0 border-border border-dotted bg-card/30 backdrop-blur-sm">
                <div className="flex flex-col items-center justify-center min-h-[200px] px-6 py-12 space-y-4">
                  <PixelatedHeartIcon className="h-12 w-12 text-red-500 opacity-80" />
                  <div className="text-center space-y-2">
                    <h4 className="text-sm font-medium text-foreground">
                      It Can Be You
                    </h4>
                    <div className="space-y-3 text-xs text-muted-foreground">
                      <p>Need custom components for your company?</p>
                      <a
                        href="mailto:railly@crafterstation.com?subject=Custom Elements Inquiry"
                        className="inline-flex items-center px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 text-xs font-medium"
                      >
                        Get Custom Elements
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Element Suggestion Section */}
        <div
          id="suggest"
          className="w-full border-t border-border border-dotted px-8 py-16"
        >
          <div className="max-w-2xl mx-auto">
            <ElementSuggestionForm />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
