"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { addToWaitlist } from "@/lib/actions";
import { ShadcnIcon } from "./shadcn-icon";
import { ClerkLogo } from "./clerk-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function WaitlistElement() {
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState("loading");

    const formData = new FormData(e.currentTarget);

    try {
      const result = await addToWaitlist(formData);

      if (result.error) {
        setState("error");
        setMessage(result.error);
      } else {
        setState("success");
        setMessage("You're on the list.");
        (e.currentTarget as HTMLFormElement).reset();
      }
    } catch (error) {
      setState("error");
      setMessage("Something went wrong.");
    }
  };

  const copyCommand = async () => {
    const command = "npx shadcn add waitlist --with clerk";
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (state === "success") {
    return (
      <div className="w-full max-w-sm space-y-4">
        <div className="border-2 border-dashed border-green-300 bg-green-50/50 p-4 rounded-md text-center space-y-3">
          <div className="text-2xl">✅</div>
          <p className="text-sm text-green-700">{message}</p>
        </div>
        <div className="flex gap-2 justify-center">
          <Button onClick={copyCommand} size="sm">
            {copied ? "Copied!" : "Copy Install"}
          </Button>
          <Button variant="outline" size="sm">
            View Code
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm md:max-w-md space-y-4">
      <div className="relative border-2 border-dashed border-border p-4 rounded-md">
        <div className="size-8 flex items-center justify-center absolute -top-3 -right-3 bg-card border rounded-full">
          <ClerkLogo className="size-4" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-2"
        >
          <Label htmlFor="email" className="sr-only">
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your email"
            disabled={state === "loading"}
            autoComplete="email"
          />
          <Button
            type="submit"
            disabled={state === "loading"}
            className="px-6 whitespace-nowrap"
            aria-describedby={state === "error" ? "error-message" : undefined}
          >
            {state === "loading" ? "Joining..." : "Join Waitlist"}
          </Button>
        </form>
      </div>

      <Button
        onClick={() => setShowInstallModal(true)}
        variant="ghost"
        className="w-full gap-2 text-muted-foreground hover:text-foreground"
      >
        <ShadcnIcon className="w-4 h-4" />
        Installable via shadcn
      </Button>

      {message && state === "error" && (
        <p
          id="error-message"
          className="text-sm text-destructive mt-2 text-center"
          role="alert"
        >
          {message}
        </p>
      )}

      {showInstallModal && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setShowInstallModal(false)}
        >
          <div
            className="bg-card rounded-lg p-6 max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-card-foreground">
                Install Waitlist Element
              </h3>
              <Button
                onClick={() => setShowInstallModal(false)}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </Button>
            </div>
            <div className="bg-black text-green-400 p-3 rounded font-mono text-sm mb-4 overflow-x-auto">
              npx shadcn add waitlist --with clerk
            </div>
            <div className="flex gap-2">
              <Button onClick={copyCommand} className="flex-1" size="sm">
                {copied ? "Copied!" : "Copy Command"}
              </Button>
              <Button variant="outline" className="flex-1" size="sm">
                View Code
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
