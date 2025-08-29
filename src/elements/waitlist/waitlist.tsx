"use client";

import { motion } from "motion/react";
import { useActionState } from "react";
import { addToWaitlist } from "./actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { InstallCommand } from "@/components/install-command";
import { ShadcnIcon } from "@/components/shadcn-icon";
import { PixelatedCheckIcon } from "@/components/pixelated-check-icon";
import { SubmitButton } from "./submit-button";
import { ElementWrapper } from "@/components/element-wrapper";
import { ClerkLogo } from "@/components/clerk-logo";

type WaitlistState = {
  success?: boolean;
  error?: string;
  message?: string;
};

export function WaitlistElement() {
  const [state, formAction, isPending] = useActionState(
    addToWaitlist,
    { success: false } as WaitlistState
  );


  return (
    <div className="w-full max-w-md space-y-4">
      <motion.div
        className={`relative border-2 border-dashed p-4 rounded-md h-[5.5rem] flex items-center justify-center ${
          state.success 
            ? "border-teal-400 dark:border-teal-400 dark:bg-teal-950/30" 
            : "border-foreground/50"
        }`}
        animate={{
          borderColor: state.success ? "rgb(45 212 191)" : "rgb(255 255 255 / 0.5)",
          backgroundColor: state.success ? "rgb(19 78 74 / 0.3)" : "transparent"
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {!state.success && (
          <div className="size-8 flex items-center justify-center absolute -top-3 -right-3 bg-card border rounded-full">
            <ClerkLogo className="size-4" />
          </div>
        )}

        <div className="w-full">
          {state.success ? (
            <motion.div
              className="space-y-3 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              <motion.div
                className="flex justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200,
                }}
              >
                <PixelatedCheckIcon className="w-8 h-8 text-teal-400" />
              </motion.div>
              <motion.p
                className="text-sm text-teal-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              >
                {state.message || "You're on the list."}
              </motion.p>
            </motion.div>
          ) : (
            <div className="space-y-2">
              <form action={formAction} className="flex flex-col sm:flex-row gap-2">
                <Label htmlFor="email" className="sr-only">
                  Email address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  disabled={isPending}
                  autoComplete="email"
                />
                <SubmitButton isPending={isPending} />
              </form>

              {state.error && (
                <p
                  className="text-sm text-destructive text-center"
                  role="alert"
                >
                  {state.error}
                </p>
              )}
            </div>
          )}
        </div>
      </motion.div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <ShadcnIcon className="w-4 h-4" />
          <span>Install this element with shadcn CLI 3.0</span>
        </div>
        <InstallCommand />
      </div>
    </div>
  );
}