import { ScrambleText } from "@/components/scramble-text";
import { InstallCommand } from "@/components/install-command";
import { ShadcnIcon } from "@/components/shadcn-icon";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ElementWrapper } from "@/components/element-wrapper";
import { ComponentCard } from "@/components/component-card";
import { ClerkLogo } from "@/components/clerk-logo";
import { ServerIcon } from "@/components/icons/server";
import { ZapIcon } from "@/components/icons/zap";
import { ShieldIcon } from "@/components/icons/shield";
import { BranchIcon } from "@/components/icons/branch";
import { MailIcon } from "@/components/icons/mail";
import { MoneyIcon } from "@/components/icons/money";
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
import { ThemeSwitcherElement } from "@/components/theme-switcher-element";
import { GroupIcon } from "@/components/icons/group";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 w-full max-w-screen-xl border-border border-dotted border-x mx-auto">
        {/* Main Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full min-h-[80vh] py-16 px-8 lg:px-16">
          <div className="transition-all duration-700 space-y-6">
            <section className="w-full">
              <div className="text-left">
                <div className="text-base uppercase tracking-widest font-light mb-2 text-primary/70">
                  <span className="font-mono">[ FULL-STACK COMPONENTS ]</span>
                </div>
                <h1 className="font-dotted font-black text-4xl lg:text-6xl mb-4">
                  <ScrambleText text="Elements" />
                </h1>
                <p className="text-muted-foreground text-lg">
                  Ready-to-use components for modern web apps. Install flows,
                  not pixels.
                </p>
              </div>
            </section>

            <div className="space-y-0 transition-all duration-700">
              <div className="group py-6 transition-all duration-500">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 bg-primary/20">
                    <ServerIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h5 className="mb-2 transition-colors duration-500 text-foreground font-medium">
                      Full-Stack Components
                    </h5>
                    <p className="text-sm transition-colors duration-500 text-muted-foreground">
                      Complete solutions ready for the agentic era. Install
                      flows, not pixels.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-dashed border-border/50"></div>

              <div className="group py-6 transition-all duration-500">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 bg-primary/20">
                    <ZapIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h5 className="mb-2 transition-colors duration-500 text-foreground font-medium">
                      One-Command Install
                    </h5>
                    <p className="text-sm transition-colors duration-500 text-muted-foreground">
                      Install with shadcn CLI 3.0. Ready to use immediately with
                      minimal configuration.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-dashed border-border/50"></div>

              <div className="group py-6 transition-all duration-500">
                <div className="flex items-start gap-4 mb-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-500 bg-primary/20">
                    <ShieldIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h5 className="mb-2 transition-colors duration-500 text-foreground font-medium">
                      Framework Ready
                    </h5>
                    <p className="text-sm transition-colors duration-500 text-muted-foreground">
                      Built for Next.js with TypeScript. Integrates with Clerk,
                      Stripe, and modern services.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full relative">
            <div className="relative p-6 border border-dashed border-border/50 transition-all duration-700 bg-primary/5 rounded-lg">
              <div className="relative rounded-lg w-full flex flex-col items-center justify-center min-h-[400px] transition-all duration-700 space-y-4">
                <div className="text-center space-y-2 mb-6">
                  <p className="text-lg font-medium text-foreground max-w-sm">
                    Switch themes instantly
                  </p>
                </div>
                <ElementWrapper icon={<MoonIcon className="w-4 h-4" />}>
                  <ThemeSwitcherElement />
                </ElementWrapper>

                <p className="text-xs text-muted-foreground/60 text-center mb-0">
                  Toggle between light and dark modes
                </p>

                <div className="space-y-3 w-full max-w-md mt-8">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                    <ShadcnIcon className="w-3 h-3" />
                    <span>Install with shadcn CLI 3.0</span>
                  </div>
                  <InstallCommand url="@elements/theme-switcher" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Beta Component Gallery - Full Width */}
        <div className="w-full py-16 border-t border-border border-dotted px-8">
          <div className="space-y-8">
            <h2 className="text-center text-2xl font-bold">
              Beta Elements Gallery
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
      </div>
      <Footer />
    </div>
  );
}
