"use client";

import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ClerkLogo } from "@/components/clerk-logo";
import { EyeIcon, EyeOffIcon, LoaderIcon } from "lucide-react";

export function ClerkSignInElement() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

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
      setError(err.errors?.[0]?.message || "Failed to sign in");
    } finally {
      setIsLoading(false);
    }
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
