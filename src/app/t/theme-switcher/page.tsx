import { ComponentPageTemplate } from "@/components/component-page-template";
import { MoonIcon } from "@/components/icons/moon";
import { ThemeSwitcherSwitch } from "@registry/default/elements/theme-switcher/switch";
import { ThemeSwitcherButton } from "@registry/default/elements/theme-switcher/button";
import { ThemeSwitcherDropdown } from "@registry/default/elements/theme-switcher/dropdown";
import { ThemeSwitcherToggle } from "@registry/default/elements/theme-switcher/toggle";
import { ThemeSwitcherMultiButton } from "@registry/default/elements/theme-switcher/multi-button";
import { ShieldIcon } from "@/components/icons/shield";
import { ServerIcon } from "@/components/icons/server";
import { ZapIcon } from "@/components/icons/zap";

export default function ThemeSwitcherPage() {
  const features = [
    {
      icon: <MoonIcon className="w-3 h-3" />,
      title: "Multiple Variants",
      description: "Switch, button, dropdown, and toggle implementations",
    },
    {
      icon: <ServerIcon className="w-3 h-3" />,
      title: "System Detection",
      description: "Automatically detects system preference on first load",
    },
    {
      icon: <ZapIcon className="w-3 h-3" />,
      title: "Smooth Animations",
      description: "Elegant transitions between light and dark modes",
    },
  ];

  const technicalDetails = [
    {
      icon: <ShieldIcon className="w-6 h-6" />,
      title: "next-themes Integration",
      description:
        "Built with next-themes for seamless SSR support and no flash issues",
    },
    {
      icon: <ServerIcon className="w-6 h-6" />,
      title: "TypeScript",
      description:
        "Fully typed components with proper theme state management",
    },
    {
      icon: <ZapIcon className="w-6 h-6" />,
      title: "Accessible",
      description:
        "Screen reader friendly with proper ARIA labels and keyboard support",
    },
  ];

  const usageExample = `<span class="text-blue-400">import</span>
<span class="text-foreground"> { ThemeSwitcherButton } </span>
<span class="text-blue-400">from</span>
<span class="text-green-400"> "@registry/theme-switcher-button"</span>
<br />
<span class="text-gray-500">&lt;ThemeSwitcherButton /&gt;</span>`;

  const themeSwitcherComponents = {
    "switch": <ThemeSwitcherSwitch />,
    "button": <ThemeSwitcherButton />,
    "dropdown": <ThemeSwitcherDropdown />,
    "toggle": <ThemeSwitcherToggle />,
    "multi-button": <ThemeSwitcherMultiButton />,
  };

  const componentInstallUrls = {
    "switch": "@elements/theme-switcher-switch",
    "button": "@elements/theme-switcher-button", 
    "dropdown": "@elements/theme-switcher-dropdown",
    "toggle": "@elements/theme-switcher-toggle",
    "multi-button": "@elements/theme-switcher-multi-button",
  };

  return (
    <ComponentPageTemplate
      brandColor="#8B5CF6"
      category="UI"
      name="Theme Switcher"
      description="Dark/light mode toggle components with system preference detection. Multiple variants for different use cases."
      icon={<MoonIcon className="w-12 h-12" />}
      features={features}
      technicalDetails={technicalDetails}
      installCommand="bunx shadcn@latest add @elements/theme-switcher"
      usageExample={usageExample}
      components={themeSwitcherComponents}
      componentInstallUrls={componentInstallUrls}
      layout={{ type: "auto", columns: 2, gap: "md" }}
    />
  );
}