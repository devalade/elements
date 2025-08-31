"use client";

import { ReactNode, useState } from "react";
import { ScrambleText } from "@/components/scramble-text";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { InstallCommand } from "@/components/install-command";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CopyIcon } from "@/components/icons/copy";
import {
  ThemeAwareBrandText,
  ThemeAwarePattern,
} from "@/components/theme-aware-brand";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface TechnicalDetail {
  icon: ReactNode;
  title: string;
  description: string;
}

interface CodeExample {
  title: string;
  code: string;
  language?: string;
}

interface ComponentWithLayout {
  component: ReactNode;
  colSpan?: 1 | 2 | 3 | 4 | "full";
  className?: string;
  installUrl?: string;
}

interface Layout {
  type: "auto" | "custom";
  columns?: 1 | 2 | 3 | 4;
  gap?: "sm" | "md" | "lg";
}

interface ComponentPageTemplateProps {
  brandColor: string;
  darkBrandColor?: string;
  category: string;
  name: string;
  description: string;
  icon: ReactNode;
  features: Feature[];
  technicalDetails: TechnicalDetail[];
  installCommand: string;
  usageExample: string;
  additionalExamples?: CodeExample[];
  components?: Record<string, ReactNode | ComponentWithLayout>;
  componentInstallUrls?: Record<string, string>;
  layout?: Layout;
  children?: ReactNode;
}

export function ComponentPageTemplate({
  brandColor,
  darkBrandColor,
  category,
  name,
  description,
  icon,
  features,
  technicalDetails,
  installCommand,
  usageExample,
  additionalExamples = [],
  components,
  componentInstallUrls = {},
  layout = { type: "auto", columns: 4, gap: "lg" },
  children,
}: ComponentPageTemplateProps) {
  const [selectedComponents, setSelectedComponents] = useState<Set<string>>(
    new Set(),
  );
  const [packageManager, setPackageManager] = useState("bunx");
  const [copied, setCopied] = useState(false);

  const handleComponentToggle = (componentKey: string) => {
    const newSelected = new Set(selectedComponents);
    if (newSelected.has(componentKey)) {
      newSelected.delete(componentKey);
    } else {
      newSelected.add(componentKey);
    }
    setSelectedComponents(newSelected);
  };

  const getInstallCommand = (pm: string) => {
    if (selectedComponents.size === 0) return "";

    const selectedUrls = Array.from(selectedComponents)
      .map((key) => {
        const component = components?.[key];
        const isComponentWithLayout =
          component &&
          typeof component === "object" &&
          "component" in component;
        return isComponentWithLayout
          ? (component as ComponentWithLayout).installUrl
          : componentInstallUrls[key];
      })
      .filter(Boolean)
      .join(" ");

    const commands = {
      bunx: `bunx shadcn@latest add ${selectedUrls}`,
      npx: `npx shadcn@latest add ${selectedUrls}`,
      pnpm: `pnpm dlx shadcn@latest add ${selectedUrls}`,
      yarn: `yarn dlx shadcn@latest add ${selectedUrls}`,
    };
    return commands[pm as keyof typeof commands] || "";
  };

  const copyCommand = async () => {
    if (selectedComponents.size === 0) return;

    const command = getInstallCommand(packageManager);
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy command:", err);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <div className="flex-1 w-full max-w-screen-xl border-border border-dotted sm:border-x mx-auto">
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <ThemeAwarePattern
            brandColor={brandColor}
            darkBrandColor={darkBrandColor}
          />

          <div className="relative z-10 w-full py-8 md:py-12 px-4 sm:px-6 md:px-8">
            {/* Centered Hero */}
            <div className="text-center max-w-3xl mx-auto space-y-4 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <ThemeAwareBrandText
                  brandColor={brandColor}
                  darkBrandColor={darkBrandColor}
                >
                  <span className="font-mono text-xs sm:text-sm">
                    [ {category} ]
                  </span>
                </ThemeAwareBrandText>
                <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                    {icon}
                  </div>
                  <h1 className="font-dotted font-black text-2xl sm:text-3xl md:text-4xl leading-tight">
                    <ScrambleText text={name} />
                  </h1>
                </div>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  {description}
                </p>
              </div>

              {/* CTA */}
              <div className="flex justify-center">
                <InstallCommand
                  url={installCommand.replace(/^bunx shadcn@latest add /, "")}
                  className="w-full max-w-lg"
                  brandColor={brandColor}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Components Grid */}
        {components && (
          <div className="border-t border-border border-dotted">
            <div className="space-y-6 md:space-y-8">
              <ComponentGrid
                components={components}
                layout={layout}
                installUrls={componentInstallUrls}
                selectedComponents={selectedComponents}
                onComponentToggle={handleComponentToggle}
              />
            </div>
          </div>
        )}

        {children}

        {/* Features & Technical Details - Combined and simplified */}
        <div className="border-t border-border border-dotted px-4 sm:px-6 md:px-8 lg:px-16 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  What's Included
                </h3>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center bg-primary/20 mt-0.5 flex-shrink-0">
                        <div className="w-2.5 h-2.5 text-primary">
                          {feature.icon}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm">{feature.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Installation */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">
                  Quick Start
                </h3>
                <p className="text-muted-foreground text-sm">
                  Get the complete suite with one command
                </p>
                <InstallCommand
                  url={installCommand.replace(/^bunx shadcn@latest add /, "")}
                  className="w-full max-w-md"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dock-style Install Command */}
      {selectedComponents.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-card border rounded-lg shadow-lg max-w-lg w-full mx-4">
            <div className="flex rounded-md">
              <Select value={packageManager} onValueChange={setPackageManager}>
                <SelectTrigger className="text-muted-foreground hover:text-foreground w-20 sm:w-20 rounded-e-none border-0 border-r shadow-none text-xs sm:text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bunx">bunx</SelectItem>
                  <SelectItem value="npx">npx</SelectItem>
                  <SelectItem value="pnpm">pnpm</SelectItem>
                  <SelectItem value="yarn">yarn</SelectItem>
                </SelectContent>
              </Select>
              <Input
                readOnly
                value={`shadcn@latest add ${Array.from(selectedComponents)
                  .map((key) => {
                    const component = components?.[key];
                    const isComponentWithLayout =
                      component &&
                      typeof component === "object" &&
                      "component" in component;
                    return isComponentWithLayout
                      ? (component as ComponentWithLayout).installUrl
                      : componentInstallUrls[key];
                  })
                  .filter(Boolean)
                  .join(" ")}`}
                className="-ms-px flex-1 rounded-none border-0 shadow-none font-mono text-xs sm:text-sm focus-visible:ring-0"
              />
              <Button
                onClick={copyCommand}
                size="sm"
                variant="outline"
                className="-ms-px rounded-s-none border-0 border-l shadow-none text-teal-600 hover:text-teal-500 h-9 w-12 sm:w-auto px-0 sm:px-3"
              >
                {copied ? (
                  <svg
                    width="16"
                    height="16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-4 h-4"
                  >
                    <path
                      d="M18 6h2v2h-2V6zm-2 4V8h2v2h-2zm-2 2v-2h2v2h-2zm-2 2h2v-2h-2v2zm-2 2h2v-2h-2v2zm-2 0v2h2v-2H8zm-2-2h2v2H6v-2zm0 0H4v-2h2v2z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <>
                    <CopyIcon className="w-4 h-4 sm:hidden" />
                    <span className="hidden sm:inline">Copy</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function ComponentGrid({
  components,
  layout,
  installUrls = {},
  selectedComponents,
  onComponentToggle,
}: {
  components: Record<string, ReactNode | ComponentWithLayout>;
  layout: Layout;
  installUrls?: Record<string, string>;
  selectedComponents: Set<string>;
  onComponentToggle: (componentKey: string) => void;
}) {
  // Determine grid layout
  const isCustomLayout = layout.type === "custom";

  let gridClasses = "";
  let gapClasses = "";

  // Gap classes
  switch (layout.gap) {
    case "sm":
      gapClasses = "gap-4";
      break;
    case "md":
      gapClasses = "gap-6";
      break;
    default:
      gapClasses = "gap-8";
      break;
  }

  if (isCustomLayout) {
    // For custom layout, we'll use a flexible grid that components can span
    gridClasses = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gapClasses}`;
  } else {
    // Auto layout based on columns prop
    const colsClass = {
      1: "grid-cols-1",
      2: "grid-cols-1 md:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
      4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    }[layout.columns || 4];

    gridClasses = `grid ${colsClass} ${gapClasses}`;
  }

  // Helper function to get col-span classes
  const getColSpanClass = (colSpan: ComponentWithLayout["colSpan"]) => {
    if (!colSpan || colSpan === 1) return "";
    if (colSpan === "full") return "col-span-full";

    // Generate proper responsive col-span classes
    switch (colSpan) {
      case 2:
        return "col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2";
      case 3:
        return "col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3";
      case 4:
        return "col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-0">
      {Object.entries(components).map(([key, item]) => {
        // Check if item is a ComponentWithLayout or just a ReactNode
        const isComponentWithLayout =
          item &&
          typeof item === "object" &&
          "component" in item &&
          item.component !== undefined;

        const componentNode = isComponentWithLayout
          ? (item as ComponentWithLayout).component
          : item;

        const customClassName = isComponentWithLayout
          ? (item as ComponentWithLayout).className
          : "";

        const isSelected = selectedComponents.has(key);

        return (
          <div key={key} className={`${customClassName} border-t border-l border-r border-b border-dotted transition-all duration-200 ${
                isSelected ? "border-primary/50" : "border-border"
              }`}>
            {/* Component Header - Outside bordered area */}
            <div
              className={`px-4 sm:px-6 py-4 transition-all duration-200 ${
                isSelected
                  ? "bg-primary/10"
                  : "bg-background hover:bg-accent/50"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {/* Component Label */}
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={() => onComponentToggle(key)}
                    className="shrink-0"
                  />
                  <div className="flex items-center gap-2">
                    <span 
                      className="text-sm md:text-base font-medium text-foreground capitalize cursor-pointer hover:text-primary transition-colors"
                      onClick={() => onComponentToggle(key)}
                    >
                      {key.replace("-", " ")}
                    </span>
                    {key.includes("shadcn") && (
                      <Badge variant="outline" className="border-blue-500 text-blue-500 text-xs">
                        BETA
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Install Command - Header Right */}
                {(installUrls[key] ||
                  (isComponentWithLayout &&
                    (item as ComponentWithLayout).installUrl)) && (
                  <InstallCommand
                    url={
                      installUrls[key] ||
                      (item as ComponentWithLayout).installUrl
                    }
                    className="w-auto"
                  />
                )}
              </div>
            </div>

            {/* Component Display Area - Bordered */}
            <div
              className="bg-card/30 backdrop-blur-sm border-t border-dotted border-border"
            >
              <div className="flex items-center justify-center min-h-[350px] md:min-h-[400px] px-4 py-14">
                <div className="flex justify-center w-full max-w-lg">
                  {componentNode as ReactNode}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
