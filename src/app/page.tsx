import { ScrambleText } from "@/components/scramble-text";
import { WaitlistElement } from "../../registry/default/elements/waitlist/waitlist";
import { InstallCommand } from "@/components/install-command";
import { ShadcnIcon } from "@/components/shadcn-icon";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ElementWrapper } from "@/components/element-wrapper";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 w-full max-w-screen-xl border-border border-dotted border-x mx-auto flex flex-col justify-center items-center gap-6 sm:gap-8 px-4">
        <div className="flex flex-col justify-center items-center text-center w-full space-y-4">
          <h1 className="font-dotted font-black">
            <ScrambleText text="Elements" />
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-sm sm:max-w-lg">
            Full-stack components. Install flows, not pixels.
          </p>
        </div>

        <div className="w-full max-w-md space-y-4">
          <ElementWrapper>
            <WaitlistElement />
          </ElementWrapper>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ShadcnIcon className="w-4 h-4" />
              <span>Install this element with shadcn CLI 3.0</span>
            </div>
            <InstallCommand />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
