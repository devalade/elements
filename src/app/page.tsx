import { ScrambleText } from "@/components/scramble-text";
import { WaitlistElement } from "../../registry/default/elements/waitlist/waitlist";
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
                      Full-Stack Integration
                    </h5>
                    <p className="text-sm transition-colors duration-500 text-muted-foreground">
                      Complete components with backend logic, database schemas,
                      and API routes included.
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
                      Copy & Paste Ready
                    </h5>
                    <p className="text-sm transition-colors duration-500 text-muted-foreground">
                      Install with shadcn CLI 3.0. No complex setup or
                      configuration required.
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
                      Platform Agnostic
                    </h5>
                    <p className="text-sm transition-colors duration-500 text-muted-foreground">
                      Works with any platform - Vercel, Supabase, Clerk, Stripe,
                      and more.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full relative">
            <div className="relative p-6 border border-dashed border-border/50 transition-all duration-700 bg-primary/5 rounded-lg">
              <div className="relative rounded-lg overflow-hidden w-full flex flex-col items-center justify-center min-h-[400px] transition-all duration-700 space-y-4">
                <div className="text-center space-y-2 mb-6">
                  <p className="text-lg font-medium text-foreground max-w-sm">
                    Be first. No noise.
                  </p>
                </div>
                <ElementWrapper icon={<ClerkLogo className="w-4 h-4" />}>
                  <WaitlistElement />
                </ElementWrapper>

                <p className="text-xs text-muted-foreground/60 text-center mb-0">
                  Only drops worth your inbox.
                </p>

                <div className="space-y-3 w-full max-w-md mt-8">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                    <ShadcnIcon className="w-3 h-3" />
                    <span>Install with shadcn CLI 3.0</span>
                  </div>
                  <InstallCommand />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Beta Component Gallery - Full Width */}
        <div className="w-full py-16 border-t border-border border-dotted px-8">
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Beta Component Gallery</h2>
              <p className="text-muted-foreground">
                Components coming soon to Elements
              </p>
            </div>

            <div className="grid gap-4 place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <ComponentCard
                name="Clerk Auth"
                description="Complete authentication flows with Clerk integration"
                icon={<ClerkLogo className="w-6 h-6" />}
                category="Auth"
                brandColor="#654BF6"
                isEnabled={true}
                href="/components/clerk"
              />
              <ComponentCard
                name="Trigger.dev Jobs"
                description="Background job scheduling and monitoring components"
                icon={<TriggerIcon className="w-6 h-6" />}
                category="Jobs"
                brandColor="#8DFF53"
                isEnabled={true}
                href="/components/trigger"
              />
              <ComponentCard
                name="UploadThing"
                description="Complete file upload solution with drag & drop interface"
                icon={<UploadThingIcon className="w-6 h-6" />}
                category="Files"
                brandColor="#E91515"
                isEnabled={true}
                href="/components/uploadthing"
              />
              <ComponentCard
                name="Supabase DB"
                description="Database connection and CRUD operation components"
                icon={<ServerIcon className="w-6 h-6" />}
                category="Database"
              />
              <ComponentCard
                name="ElectricSQL"
                description="Real-time sync and offline-first database components"
                icon={<BranchIcon className="w-6 h-6" />}
                category="Database"
              />
              <ComponentCard
                name="Theme Switcher"
                description="Dark/light mode toggle with system preference detection"
                icon={<MoonIcon className="w-6 h-6" />}
                category="UI"
              />
              <ComponentCard
                name="Auth Guard"
                description="Route protection and role-based access control"
                icon={<ShieldIcon className="w-6 h-6" />}
                category="Auth"
              />
              <ComponentCard
                name="Email Templates"
                description="Responsive email templates with React Email"
                icon={<MailIcon className="w-6 h-6" />}
                category="Email"
              />
              <ComponentCard
                name="Payment Forms"
                description="Stripe integration with checkout and subscription flows"
                icon={<MoneyIcon className="w-6 h-6" />}
                category="Payments"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
