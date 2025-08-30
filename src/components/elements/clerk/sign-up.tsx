"use client";

import { useState, useEffect, useMemo } from "react";
import { useSignUp, useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type { OAuthStrategy, SignInFirstFactor } from "@clerk/types";
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

interface SignUpState {
  isLoading?: boolean;
  error?: string;
  step?: "form" | "verify";
}

export function ClerkSignUpElement() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { signIn } = useSignIn();
  const [state, setState] = useState<SignUpState>({ step: "form" });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [hasInitialized, setHasInitialized] = useState(false);
  const router = useRouter();

  // Clear errors after some time
  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() =>
        setState(prev => ({ ...prev, error: undefined })), 5000
      );
      return () => clearTimeout(timer);
    }
  }, [state.error]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !signUp) return;

    setState((prev) => ({ ...prev, isLoading: true, error: undefined }));

    try {
      await signUp.create({
        firstName: formData.firstName,
        lastName: formData.lastName,
        emailAddress: formData.email,
        password: formData.password,
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setState((prev) => ({ ...prev, isLoading: false, step: "verify" }));
    } catch (err: any) {
      const errorMessage = err.errors?.[0]?.message || "Failed to create account";

      // Handle rate limiting specifically
      let displayError = errorMessage;
      if (errorMessage.includes("too many requests") || errorMessage.includes("rate limit")) {
        displayError = "Too many attempts. Please wait a moment and try again.";
      }

      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: displayError,
      }));
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !signUp) return;

    setState((prev) => ({ ...prev, isLoading: true, error: undefined }));

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code: verificationCode,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/elements/clerk/dashboard");
      } else {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: "Verification incomplete",
        }));
      }
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err.errors?.[0]?.message || "Invalid verification code",
      }));
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSocialSignUp = async (provider: SignInFirstFactor) => {
    if (!isLoaded || !signUp) return;

    setState((prev) => ({ ...prev, error: undefined, isLoading: true }));

    try {
      await signUp.authenticateWithRedirect({
        strategy: provider.strategy as OAuthStrategy,
        redirectUrl: "/elements/clerk/sso-callback",
        redirectUrlComplete: "/elements/clerk/dashboard",
      });
    } catch (err: any) {
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error:
          err.errors?.[0]?.message ||
          `Failed to sign up with ${provider.strategy.replace("oauth_", "")}`,
      }));
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

  if (state.step === "verify") {
    return (
      <div className="w-full max-w-sm mx-auto p-6 border border-border rounded-lg bg-card">
        <div className="space-y-4">
          <div className="text-center">
            <ClerkLogo className="w-8 h-8 mx-auto mb-2" />
            <h2 className="text-lg font-semibold">Verify your email</h2>
            <p className="text-sm text-muted-foreground">
              We sent a code to {formData.email}
            </p>
          </div>

          <form onSubmit={handleVerification} className="space-y-3">
            <div className="space-y-2">
              <Label
                htmlFor="verification-code"
                className="text-sm font-medium"
              >
                Verification code
              </Label>
              <Input
                id="verification-code"
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="Enter 6-digit code"
                required
                disabled={state.isLoading}
                maxLength={6}
                autoComplete="one-time-code"
              />
            </div>

            {state.error && (
              <Alert variant="destructive">
                <AlertDescription>{state.error}</AlertDescription>
              </Alert>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={state.isLoading || verificationCode.length !== 6}
            >
              {state.isLoading ? (
                <>
                  <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </Button>

            <div className="text-center">
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                onClick={() =>
                  signUp?.prepareEmailAddressVerification({
                    strategy: "email_code",
                  })
                }
                disabled={state.isLoading}
              >
                Resend code
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm mx-auto p-6 border border-border rounded-lg bg-card">
      <div className="space-y-4">
        <div className="text-center">
          <ClerkLogo className="w-8 h-8 mx-auto mb-2" />
          <h2 className="text-lg font-semibold">Create account</h2>
          <p className="text-sm text-muted-foreground">Get started today</p>
        </div>
        {socialProviders.length > 0 && (
          <div className="space-y-3">
            {socialProviders.map((provider) => (
              <Button
                key={provider.strategy}
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialSignUp(provider)}
                disabled={state.isLoading}
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
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-sm font-medium">
                First name
              </Label>
              <Input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={(e) => updateFormData("firstName", e.target.value)}
                placeholder="John"
                required
                disabled={state.isLoading}
                autoComplete="given-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-sm font-medium">
                Last name
              </Label>
              <Input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={(e) => updateFormData("lastName", e.target.value)}
                placeholder="Doe"
                required
                disabled={state.isLoading}
                autoComplete="family-name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateFormData("email", e.target.value)}
              placeholder="you@company.com"
              required
              disabled={state.isLoading}
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
                value={formData.password}
                onChange={(e) => updateFormData("password", e.target.value)}
                placeholder="••••••••"
                required
                disabled={state.isLoading}
                autoComplete="new-password"
                className="pr-10"
                minLength={8}
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

          {state.error && (
            <Alert variant="destructive">
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          )}

          {/* CAPTCHA Widget - Required for bot protection */}
          <div id="clerk-captcha" data-cl-theme="auto" />

          <Button type="submit" className="w-full" disabled={state.isLoading}>
            {state.isLoading ? (
              <>
                <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
