import { Button } from "@/components/ui/button";
import { V0Logo } from "@/components/ui/logos/v0";

export interface OpenInV0ButtonProps {
  url: string;
}

export function OpenInV0Button({ url }: OpenInV0ButtonProps) {
  return (
    <Button
      aria-label="Open in v0"
      className="h-9 gap-1 rounded-[6px] bg-black px-3 text-xs text-white hover:bg-black hover:text-white dark:bg-white dark:text-black"
      asChild
    >
      <a
        href={`https://v0.dev/chat/api/open?url=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        Open in <V0Logo className="h-3 w-6" />
      </a>
    </Button>
  );
}
