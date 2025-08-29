"use client";

import { motion } from "motion/react";
import { useActionState } from "react";
import { addToWaitlist } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type WaitlistState = {
  success?: boolean;
  error?: string;
  message?: string;
};

interface SubmitButtonProps {
  isPending?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

function SubmitButton({ isPending, disabled, children = "Join Waitlist" }: SubmitButtonProps) {
  return (
    <Button
      type="submit"
      disabled={isPending || disabled}
      className="px-6 whitespace-nowrap"
    >
      {isPending ? "Joining..." : children}
    </Button>
  );
}

function PixelatedCheckIcon({ className }: { className?: string }) {
  return (
    <svg
      width="32"
      height="32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
    >
      <path
        d="M18 6h2v2h-2V6zm-2 4V8h2v2h-2zm-2 2v-2h2v2h-2zm-2 2h2v-2h-2v2zm-2 2h2v-2h-2v2zm-2 0v2h2v-2H8zm-2-2h2v2H6v-2zm0 0H4v-2h2v2z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WaitlistElement() {
  const [state, formAction, isPending] = useActionState(addToWaitlist, {
    success: false,
  } as WaitlistState);

  return (
    <motion.div
      className={`border-2 border-dashed p-4 rounded-md h-[5.5rem] flex items-center justify-center ${
        state.success
          ? "border-teal-400 dark:border-teal-400 dark:bg-teal-950/30"
          : "border-foreground/50"
      }`}
      animate={{
        borderColor: state.success
          ? "rgb(45 212 191)"
          : "hsl(var(--foreground) / 0.5)",
        backgroundColor: state.success
          ? "hsl(var(--muted) / 0.3)"
          : "transparent",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
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
            <form
              action={formAction}
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
  );
}