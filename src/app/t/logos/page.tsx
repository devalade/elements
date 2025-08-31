"use client";

import { useState, useMemo } from "react";
import { AppleLogo } from "@registry/default/logos/apple";
import { GoogleLogo } from "@registry/default/logos/google";
import { GitHubLogo } from "@registry/default/logos/github";
import { LinearLogo } from "@registry/default/logos/linear";
import { MicrosoftLogo } from "@registry/default/logos/microsoft";
import { SlackLogo } from "@registry/default/logos/slack";
import { NotionLogo } from "@registry/default/logos/notion";
import { DiscordLogo } from "@registry/default/logos/discord";
import { SpotifyLogo } from "@registry/default/logos/spotify";
import { TwitchLogo } from "@registry/default/logos/twitch";
import { TwitterLogo } from "@registry/default/logos/twitter";
import { GitLabLogo } from "@registry/default/logos/gitlab";
import { QwenLogo } from "@registry/default/logos/qwen";
import { MoonshotAILogo } from "@registry/default/logos/moonshot-ai";
import { CohereLogo } from "@registry/default/logos/cohere";
import { OpenAILogo } from "@registry/default/logos/openai";
import { AnthropicLogo } from "@registry/default/logos/anthropic";
import { DeepSeekLogo } from "@registry/default/logos/deepseek";
import { HuggingFaceLogo } from "@registry/default/logos/hugging-face";
import { GroqLogo } from "@registry/default/logos/groq";
import { GrokLogo } from "@registry/default/logos/grok";
import { GeminiLogo } from "@registry/default/logos/gemini";
import { LovableLogo } from "@registry/default/logos/lovable";
import { PerplexityLogo } from "@registry/default/logos/perplexity";
import { XAILogo } from "@registry/default/logos/xai";
import { V0Logo } from "@registry/default/logos/v0";
import { ClaudeLogo } from "@registry/default/logos/claude";
import { MistralLogo } from "@registry/default/logos/mistral";
import { MetaLogo } from "@registry/default/logos/meta";
import { AWSLogo } from "@registry/default/logos/aws";
import { KimiLogo } from "@registry/default/logos/kimi";
import { SupabaseIcon } from "@registry/default/logos/supabase";
import { StripeIcon } from "@registry/default/logos/stripe";
import { ResendIcon } from "@registry/default/logos/resend";
import { BetterAuthIcon } from "@registry/default/logos/better-auth";
import { UpstashIcon } from "@registry/default/logos/upstash";
import { VercelIcon } from "@registry/default/logos/vercel";
import { PolarIcon } from "@registry/default/logos/polar";
import { CrafterStationLogo } from "@registry/default/logos/crafter-station";
import { KeboLogo } from "@registry/default/logos/kebo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrambleText } from "@/components/scramble-text";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GroupIcon } from "@/components/icons/group";
import { CopyIcon } from "@/components/icons/copy";
import { InstallCommand } from "@/components/install-command";
import { SearchIcon } from "@/components/icons/search";

interface Logo {
  id: string;
  name: string;
  displayName: string;
  component: React.ComponentType<{ className?: string }>;
  category: string;
}

const logos: Logo[] = [
  {
    id: "google",
    name: "google-logo",
    displayName: "Google",
    component: GoogleLogo,
    category: "Search",
  },
  {
    id: "apple",
    name: "apple-logo",
    displayName: "Apple",
    component: AppleLogo,
    category: "Hardware",
  },
  {
    id: "github",
    name: "github-logo",
    displayName: "GitHub",
    component: GitHubLogo,
    category: "Development",
  },
  {
    id: "microsoft",
    name: "microsoft-logo",
    displayName: "Microsoft",
    component: MicrosoftLogo,
    category: "Software",
  },
  {
    id: "linear",
    name: "linear-logo",
    displayName: "Linear",
    component: LinearLogo,
    category: "Project Management",
  },
  {
    id: "slack",
    name: "slack-logo",
    displayName: "Slack",
    component: SlackLogo,
    category: "Communication",
  },
  {
    id: "notion",
    name: "notion-logo",
    displayName: "Notion",
    component: NotionLogo,
    category: "Productivity",
  },
  {
    id: "discord",
    name: "discord-logo",
    displayName: "Discord",
    component: DiscordLogo,
    category: "Communication",
  },
  {
    id: "spotify",
    name: "spotify-logo",
    displayName: "Spotify",
    component: SpotifyLogo,
    category: "Entertainment",
  },
  {
    id: "twitch",
    name: "twitch-logo",
    displayName: "Twitch",
    component: TwitchLogo,
    category: "Entertainment",
  },
  {
    id: "twitter",
    name: "twitter-logo",
    displayName: "Twitter/X",
    component: TwitterLogo,
    category: "Social",
  },
  {
    id: "gitlab",
    name: "gitlab-logo",
    displayName: "GitLab",
    component: GitLabLogo,
    category: "Development",
  },
  {
    id: "qwen",
    name: "qwen-logo",
    displayName: "Qwen",
    component: QwenLogo,
    category: "AI",
  },
  {
    id: "moonshot-ai",
    name: "moonshot-ai-logo",
    displayName: "MoonshotAI",
    component: MoonshotAILogo,
    category: "AI",
  },
  {
    id: "cohere",
    name: "cohere-logo",
    displayName: "Cohere",
    component: CohereLogo,
    category: "AI",
  },
  {
    id: "openai",
    name: "openai-logo",
    displayName: "OpenAI",
    component: OpenAILogo,
    category: "AI",
  },
  {
    id: "anthropic",
    name: "anthropic-logo",
    displayName: "Anthropic",
    component: AnthropicLogo,
    category: "AI",
  },
  {
    id: "deepseek",
    name: "deepseek-logo",
    displayName: "DeepSeek",
    component: DeepSeekLogo,
    category: "AI",
  },
  {
    id: "hugging-face",
    name: "hugging-face-logo",
    displayName: "Hugging Face",
    component: HuggingFaceLogo,
    category: "AI",
  },
  {
    id: "groq",
    name: "groq-logo",
    displayName: "Groq",
    component: GroqLogo,
    category: "AI",
  },
  {
    id: "grok",
    name: "grok-logo",
    displayName: "Grok",
    component: GrokLogo,
    category: "AI",
  },
  {
    id: "gemini",
    name: "gemini-logo",
    displayName: "Gemini",
    component: GeminiLogo,
    category: "AI",
  },
  {
    id: "lovable",
    name: "lovable-logo",
    displayName: "Lovable",
    component: LovableLogo,
    category: "AI",
  },
  {
    id: "perplexity",
    name: "perplexity-logo",
    displayName: "Perplexity",
    component: PerplexityLogo,
    category: "AI",
  },
  {
    id: "xai",
    name: "xai-logo",
    displayName: "xAI",
    component: XAILogo,
    category: "AI",
  },
  {
    id: "v0",
    name: "v0-logo",
    displayName: "v0",
    component: V0Logo,
    category: "AI",
  },
  {
    id: "claude",
    name: "claude-logo",
    displayName: "Claude",
    component: ClaudeLogo,
    category: "AI",
  },
  {
    id: "mistral",
    name: "mistral-logo",
    displayName: "Mistral",
    component: MistralLogo,
    category: "AI",
  },
  {
    id: "meta",
    name: "meta-logo",
    displayName: "Meta",
    component: MetaLogo,
    category: "Social",
  },
  {
    id: "aws",
    name: "aws-logo",
    displayName: "AWS",
    component: AWSLogo,
    category: "Cloud",
  },
  {
    id: "kimi",
    name: "kimi-logo",
    displayName: "Kimi",
    component: KimiLogo,
    category: "AI",
  },
  {
    id: "supabase",
    name: "supabase-logo",
    displayName: "Supabase",
    component: SupabaseIcon,
    category: "Database",
  },
  {
    id: "stripe",
    name: "stripe-logo",
    displayName: "Stripe",
    component: StripeIcon,
    category: "Payments",
  },
  {
    id: "resend",
    name: "resend-logo",
    displayName: "Resend",
    component: ResendIcon,
    category: "Email",
  },
  {
    id: "better-auth",
    name: "better-auth-logo",
    displayName: "Better Auth",
    component: BetterAuthIcon,
    category: "Auth",
  },
  {
    id: "upstash",
    name: "upstash-logo",
    displayName: "Upstash",
    component: UpstashIcon,
    category: "Database",
  },
  {
    id: "vercel",
    name: "vercel-logo",
    displayName: "Vercel",
    component: VercelIcon,
    category: "Cloud",
  },
  {
    id: "polar",
    name: "polar-logo",
    displayName: "Polar",
    component: PolarIcon,
    category: "Monetization",
  },
  {
    id: "crafter-station",
    name: "crafter-station-logo",
    displayName: "Crafter Station",
    component: CrafterStationLogo,
    category: "Development",
  },
  {
    id: "kebo",
    name: "kebo-logo",
    displayName: "Kebo",
    component: KeboLogo,
    category: "Development",
  },
];

export default function TechLogosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLogos, setSelectedLogos] = useState<Set<string>>(new Set());
  const [packageManager, setPackageManager] = useState("bunx");
  const [copied, setCopied] = useState(false);

  const filteredLogos = useMemo(() => {
    return logos.filter(
      (logo) =>
        logo.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        logo.category.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  const handleLogoToggle = (logoId: string) => {
    const newSelected = new Set(selectedLogos);
    if (newSelected.has(logoId)) {
      newSelected.delete(logoId);
    } else {
      newSelected.add(logoId);
    }
    setSelectedLogos(newSelected);
  };

  const handleSelectAll = () => {
    if (selectedLogos.size === filteredLogos.length) {
      setSelectedLogos(new Set());
    } else {
      setSelectedLogos(new Set(filteredLogos.map((logo) => logo.id)));
    }
  };

  const getCommand = (pm: string) => {
    if (selectedLogos.size === 0) return "";

    const selectedNamesWithPrefix = logos
      .filter((logo) => selectedLogos.has(logo.id))
      .map((logo) => `@elements/${logo.name}`)
      .join(" ");

    const commands = {
      bunx: `bunx shadcn@latest add ${selectedNamesWithPrefix}`,
      npx: `npx shadcn@latest add ${selectedNamesWithPrefix}`,
      pnpm: `pnpm dlx shadcn@latest add ${selectedNamesWithPrefix}`,
      yarn: `yarn dlx shadcn@latest add ${selectedNamesWithPrefix}`,
    };
    return commands[pm as keyof typeof commands] || "";
  };

  const copyCommand = async () => {
    if (selectedLogos.size === 0) return;

    const command = getCommand(packageManager);
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
          <div className="absolute inset-0 opacity-30">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
          </div>

          <div className="relative z-10 w-full py-8 md:py-12 px-4 sm:px-6 md:px-8">
            {/* Centered Hero */}
            <div className="text-center max-w-3xl mx-auto space-y-4 md:space-y-6">
              <div className="space-y-3 md:space-y-4">
                <span className="font-mono text-xs sm:text-sm text-primary">
                  [ BRAND LOGOS ]
                </span>
                <div className="flex items-center justify-center gap-3 md:gap-4 mb-3 md:mb-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center flex-shrink-0">
                    <GroupIcon className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h1 className="font-dotted font-black text-2xl sm:text-3xl md:text-4xl leading-tight">
                    <ScrambleText text="Tech Logos" />
                  </h1>
                </div>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  Popular tech company logos for your projects. Select the ones
                  you need or Install all {logos.length} logos at once
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <InstallCommand
                  url="@elements/logos"
                  className="w-full max-w-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="border-t border-border border-dotted px-4 sm:px-6 md:px-8 py-6">
          <div className="w-full mx-auto">
            <div className="flex flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Input
                  type="text"
                  placeholder="Search logos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <SearchIcon className="size-4" />
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleSelectAll}
                className="shrink-0"
              >
                {selectedLogos.size === filteredLogos.length
                  ? `Deselect All (${filteredLogos.length})`
                  : `Select All (${filteredLogos.length})`}
              </Button>
            </div>
          </div>
        </div>

        {/* Logo Grid */}
        <div className="border-t border-border border-dotted px-4 sm:px-6 md:px-8 py-8">
          <div className="w-full mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
              {filteredLogos.map((logo) => {
                const LogoComponent = logo.component;
                const isSelected = selectedLogos.has(logo.id);

                return (
                  <div
                    key={logo.id}
                    onClick={() => handleLogoToggle(logo.id)}
                    className={`
                      group relative p-4 md:p-6 rounded-lg border cursor-pointer transition-all duration-200
                      hover:shadow-md hover:scale-105
                      ${
                        isSelected
                          ? "bg-primary/10 border-primary ring-2 ring-primary/20"
                          : "bg-card hover:bg-accent/50"
                      }
                    `}
                  >
                    {/* Selection indicator */}
                    <div
                      className={`absolute top-2 right-2 w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                        isSelected
                          ? "bg-primary border-primary"
                          : "border-muted-foreground/30 group-hover:border-primary/50"
                      }`}
                    >
                      {isSelected && (
                        <svg
                          className="w-2 h-2 text-primary-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                      )}
                    </div>

                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                        <LogoComponent className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-200 group-hover:scale-110" />
                      </div>

                      <div className="text-center space-y-1">
                        <h3 className="font-medium text-xs md:text-sm">
                          {logo.displayName}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {logo.category}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Empty state */}
            {filteredLogos.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  <svg
                    className="w-12 h-12 mx-auto mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.002-5.824-2.625"
                    />
                  </svg>
                  <p className="text-lg font-medium mb-2">No logos found</p>
                  <p className="text-sm">Try adjusting your search term</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dock-style Install Command */}
      {selectedLogos.size > 0 && (
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
                value={`shadcn@latest add ${logos
                  .filter((logo) => selectedLogos.has(logo.id))
                  .map((logo) => `@elements/${logo.name}`)
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
