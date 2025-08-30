"use client";

import { useState } from "react";
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ClerkLogo } from "@/components/clerk-logo";
import { EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";

interface SignUpState {
  isLoading?: boolean;
  error?: string;
  step?: "form" | "verify";
}

export function ClerkSignUpElement() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [state, setState] = useState<SignUpState>({ step: "form" });
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const router = useRouter();

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
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error: err.errors?.[0]?.message || "Failed to create account",
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
