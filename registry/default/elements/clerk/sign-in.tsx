"use client";

import { useState, useEffect, useMemo } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type { OAuthStrategy } from "@clerk/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ClerkLogo } from "@/components/clerk-logo";
import { EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";
import { GitHubLogo } from "../logos/github";
import { GoogleLogo } from "../logos/google";
import { AppleLogo } from "../logos/apple";
import { LinearLogo } from "../logos/linear";
import { MicrosoftLogo } from "../logos/microsoft";
import { SpotifyLogo } from "../logos/spotify";
import { SlackLogo } from "../logos/slack";
import { TwitchLogo } from "../logos/twitch";
import { TwitterLogo } from "../logos/twitter";
import { GitLabLogo } from "../logos/gitlab";
import { DiscordLogo } from "../logos/discord";
import { NotionLogo } from "../logos/notion";

export function ClerkSignInElement() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);
  const router = useRouter();

  // Clear errors after some time
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Initialize signIn to populate supportedFirstFactors (only once)
  useEffect(() => {
    if (isLoaded && signIn && !signIn.id && !signIn.supportedFirstFactors && !hasInitialized) {
      setHasInitialized(true);
      signIn.create({}).catch((err) => {
        console.error("Failed to initialize signIn:", err);
      });
    }
  }, [isLoaded, signIn, hasInitialized]);

  const socialProviders = useMemo(() => {
    if (!signIn?.supportedFirstFactors) return [];
    return signIn.supportedFirstFactors.filter((factor) =>
      factor.strategy.startsWith("oauth_"),
    );
  }, [signIn?.supportedFirstFactors]);

  // Debug info (removed to prevent unnecessary re-renders)
  // console.log({ supportedFirstFactors: signIn?.supportedFirstFactors });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/elements/clerk/dashboard");
      } else {
        // Handle multi-factor authentication or other cases
        setError("Sign-in requires additional verification");
      }
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || "Failed to sign in";
      
      // Handle rate limiting specifically
      if (errorMessage.includes("too many requests") || errorMessage.includes("rate limit")) {
        setError("Too many attempts. Please wait a moment and try again.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignIn = async (provider: string) => {
    if (!isLoaded || !signIn) return;

    setError("");
    setIsLoading(true);
    
    try {
      await signIn.authenticateWithRedirect({
        strategy: provider as OAuthStrategy,
        redirectUrl: "/elements/clerk/sso-callback",
        redirectUrlComplete: "/elements/clerk/dashboard",
      });
    } catch (err: any) {
      setError(
        err.errors?.[0]?.message ||
          `Failed to sign in with ${provider.replace("oauth_", "")}`,
      );
      setIsLoading(false);
    }
  };

  const getSocialIcon = (provider: string) => {
    switch (provider) {
      case "oauth_github":
        return <GitHubLogo className="w-4 h-4" />;
      case "oauth_google":
        return <GoogleLogo className="w-4 h-4" />;
      case "oauth_apple":
        return <AppleLogo className="w-4 h-4" />;
      case "oauth_linear":
        return <LinearLogo className="w-4 h-4" />;
      case "oauth_microsoft":
        return <MicrosoftLogo className="w-4 h-4" />;
      case "oauth_spotify":
        return <SpotifyLogo className="w-4 h-4" />;
      case "oauth_slack":
        return <SlackLogo className="w-4 h-4" />;
      case "oauth_twitch":
        return <TwitchLogo className="w-4 h-4" />;
      case "oauth_twitter":
      case "oauth_x":
        return <TwitterLogo className="w-4 h-4" />;
      case "oauth_gitlab":
        return <GitLabLogo className="w-4 h-4" />;
      case "oauth_discord":
        return <DiscordLogo className="w-4 h-4" />;
      case "oauth_notion":
        return <NotionLogo className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getProviderLabel = (provider: string) => {
    return (
      provider.replace("oauth_", "").charAt(0).toUpperCase() +
      provider.replace("oauth_", "").slice(1)
    );
  };

  if (!isLoaded) {
    return (
      <div className="w-full max-w-sm mx-auto p-6 border border-border rounded-lg bg-card">
        <div className="flex items-center justify-center py-8">
          <LoaderIcon className="w-6 h-6 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto p-6 border border-border rounded-lg bg-card">
      <div className="space-y-4">
        <div className="text-center">
          <ClerkLogo className="w-8 h-8 mx-auto mb-2" />
          <h2 className="text-lg font-semibold">Sign in</h2>
          <p className="text-sm text-muted-foreground">Welcome back</p>
        </div>

        {socialProviders.length > 0 && (
          <div className="space-y-3">
            {socialProviders.map((provider) => (
              <Button
                key={provider.strategy}
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialSignIn(provider.strategy)}
                disabled={isLoading}
              >
                {getSocialIcon(provider.strategy)}
                <span className="ml-2">
                  Continue with {getProviderLabel(provider.strategy)}
                </span>
              </Button>
            ))}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or</span>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                disabled={isLoading}
                autoComplete="current-password"
                className="pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <EyeIcon className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            onClick={() =>
              signIn?.create({
                strategy: "reset_password_email_code",
                identifier: email,
              })
            }
            disabled={!email || isLoading}
          >
            Forgot your password?
          </button>
        </div>
      </div>
    </div>
  );
}
