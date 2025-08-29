"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  isPending?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

export function SubmitButton({ isPending, disabled, children = "Join Waitlist" }: SubmitButtonProps) {
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