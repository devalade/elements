"use client";

import { useState } from "react";

import { Check } from "lucide-react";
import { toast } from "sonner";

import { ShadcnIcon } from "@/components/shadcn-icon";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InstallCommandProps {
  url?: string;
  className?: string;
  brandColor?: string;
}

export function InstallCommand({
  url = "@elements/clerk-waitlist",
  className,
  brandColor,
}: InstallCommandProps) {
  const [packageManager, setPackageManager] = useState("bunx");
  const [copied, setCopied] = useState(false);

  const getCommand = (pm: string) => {
    const commands = {
      bunx: `bunx shadcn@latest add ${url}`,
      npx: `npx shadcn@latest add ${url}`,
      pnpm: `pnpm dlx shadcn@latest add ${url}`,
      yarn: `yarn dlx shadcn@latest add ${url}`,
    };
    return commands[pm as keyof typeof commands];
  };

  const copyCommand = async () => {
    const command = getCommand(packageManager);
    await navigator.clipboard.writeText(command);
    setCopied(true);
    toast.success("Command copied to clipboard!");
    setTimeout(() => setCopied(false), 1000);
  };

  return (
    <div className={`w-full max-w-sm ${className || ""}`}>
      <div className="flex rounded-md shadow-xs border">
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
        <Button
          onClick={copyCommand}
          variant="ghost"
          className={`-ms-px flex-1 rounded-s-none border-0 shadow-none h-9 px-3 justify-start font-mono text-xs sm:text-sm ${
            copied ? "bg-muted" : "hover:bg-muted"
          } ${
            brandColor
              ? `hover:text-[${brandColor}]`
              : "text-teal-600 hover:text-teal-500"
          }`}
          style={
            brandColor
              ? {
                  color: brandColor,
                }
              : undefined
          }
        >
          {copied ? (
            <Check className="w-4 h-4 mr-2 flex-shrink-0" />
          ) : (
            <ShadcnIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          )}
          <span className="truncate">{url}</span>
        </Button>
      </div>
    </div>
  );
}
