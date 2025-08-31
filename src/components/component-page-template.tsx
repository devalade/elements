"use client";

import { ReactNode } from "react";
import { ScrambleText } from "@/components/scramble-text";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { InstallCommand } from "@/components/install-command";
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

      <Footer />
    </div>
  );
}

function ComponentGrid({
  components,
  layout,
  installUrls = {},
}: {
  components: Record<string, ReactNode | ComponentWithLayout>;
  layout: Layout;
  installUrls?: Record<string, string>;
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

        return (
          <div key={key} className={`${customClassName}`}>
            {/* Component Header - Outside bordered area */}
            <div className="bg-background px-4 sm:px-6 py-4 border-t border-border border-dotted">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                {/* Component Label */}
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary" />
                  <span className="text-sm md:text-base font-medium text-foreground capitalize">
                    {key.replace("-", " ")}
                  </span>
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
            <div className="border-t border-l border-r border-b border-border border-dotted bg-card/30 backdrop-blur-sm transition-all duration-300 hover:bg-card/60">
              <div className="flex items-center justify-center min-h-[350px] md:min-h-[400px] px-4 py-14">
                <div className="w-full max-w-lg">
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
