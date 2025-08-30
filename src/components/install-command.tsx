"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
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
}

export function InstallCommand({
  url = "@elements/clerk-waitlist",
  className,
}: InstallCommandProps) {
  const [packageManager, setPackageManager] = useState("bunx");
  const [copied, setCopied] = useState(false);

  const getCommand = (pm: string) => {
    const commands = {
      bunx: `bunx shadcn add ${url}`,
      npx: `npx shadcn add ${url}`,
      pnpm: `pnpm dlx shadcn add ${url}`,
      yarn: `yarn dlx shadcn add ${url}`,
    };
    return commands[pm as keyof typeof commands];
  };

  const copyCommand = async () => {
    const command = getCommand(packageManager);
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`w-full max-w-lg ${className || ""}`}>
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
        <Input
          readOnly
          value={`shadcn add ${url}`}
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
              <Copy className="w-4 h-4 sm:hidden" />
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
