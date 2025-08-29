import { ReactNode } from "react";
import { ScrambleText } from "@/components/scramble-text";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ThemeAwareBrandText, ThemeAwareButton, ThemeAwarePattern } from "@/components/theme-aware-brand";

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
  children
}: ComponentPageTemplateProps) {

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="flex-1 w-full max-w-screen-xl border-border border-dotted border-x mx-auto">
        <div className="relative overflow-hidden">
          {/* Background Pattern */}
          <ThemeAwarePattern brandColor={brandColor} darkBrandColor={darkBrandColor} />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full min-h-[60vh] py-16 px-8 lg:px-16">
            {/* Left Column - Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <ThemeAwareBrandText brandColor={brandColor} darkBrandColor={darkBrandColor}>
                  <span className="font-mono">[ {category} ]</span>
                </ThemeAwareBrandText>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 flex items-center justify-center">
                    {icon}
                  </div>
                  <h1 className="font-dotted font-black text-4xl lg:text-5xl">
                    <ScrambleText text={name} />
                  </h1>
                </div>
                <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
                  {description}
                </p>
                <Badge variant="default" className="text-sm">
                  Available Now
                </Badge>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">What's Included</h3>
                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center bg-primary/20 mt-0.5">
                        <div className="w-3 h-3 text-primary">
                          {feature.icon}
                        </div>
                      </div>
                      <div>
                        <p className="font-medium text-sm">{feature.title}</p>
                        <p className="text-xs text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                <ThemeAwareButton brandColor={brandColor} darkBrandColor={darkBrandColor}>
                  Install Component
                </ThemeAwareButton>
                <Button variant="outline">
                  View Documentation
                </Button>
              </div>
            </div>

            {/* Right Column - Code Preview */}
            <div className="relative">
              <div className="border border-border rounded-lg p-6 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-sm">Installation</h4>
                  <Badge variant="secondary" className="text-xs">Copy</Badge>
                </div>
                <div className="space-y-4">
                  <div className="bg-muted/50 rounded p-3 font-mono text-sm">
                    <div className="text-muted-foreground mb-2"># Install the component</div>
                    <div className="text-primary">{installCommand}</div>
                  </div>
                  
                  <div className="bg-muted/50 rounded p-3 font-mono text-sm">
                    <div className="text-muted-foreground mb-2">// Usage</div>
                    <div dangerouslySetInnerHTML={{ __html: usageExample }} />
                  </div>

                  {additionalExamples.map((example, index) => (
                    <div key={index} className="bg-muted/50 rounded p-3 font-mono text-sm">
                      <div className="text-muted-foreground mb-2">// {example.title}</div>
                      <div dangerouslySetInnerHTML={{ __html: example.code }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {children}

        {/* Technical Details */}
        <div className="border-t border-border border-dotted px-8 lg:px-16 py-16">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">Technical Details</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Built with modern React patterns and TypeScript. Fully customizable and production-ready.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {technicalDetails.map((detail, index) => (
                <div key={index} className="text-center space-y-3">
                  <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mx-auto">
                    <div className="w-6 h-6">
                      {detail.icon}
                    </div>
                  </div>
                  <h3 className="font-semibold">{detail.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {detail.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}