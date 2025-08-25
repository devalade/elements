import { ScrambleText } from "@/components/scramble-text";
import { WaitlistElement } from "@/components/waitlist-element";
import { ThemeSwitcherElement } from "@/components/theme-switcher-element";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <div className="absolute top-4 right-4">
        <ThemeSwitcherElement />
      </div>
      <div className="min-h-screen flex flex-col justify-center items-center gap-6 sm:gap-8 px-4">
        <div className="text-center space-y-4">
          <h1 className="font-dotted font-black">
            <ScrambleText text="Elements" />
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-sm sm:max-w-lg">
            Full-stack components. Install flows, not pixels.
          </p>
        </div>

        <WaitlistElement />
      </div>
    </div>
  );
}
