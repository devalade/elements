import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface ComponentCardProps {
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  brandColor?: string;
  isEnabled?: boolean;
  href?: string;
  elementsCount?: number;
  providerLink?: string;
}

export function ComponentCard({
  name,
  description,
  icon,
  category,
  brandColor,
  isEnabled = false,
  href,
  elementsCount,
  providerLink,
}: ComponentCardProps) {
  const patternStyle =
    brandColor && isEnabled
      ? {
          backgroundColor: `${brandColor}05`,
          backgroundImage: `repeating-linear-gradient(
          45deg,
          transparent,
          transparent 8px,
          ${brandColor}15 8px,
          ${brandColor}15 9px
        )`,
        }
      : {};

  const CardContent = (
    <figure
      className={`relative flex h-full w-full flex-col justify-between border border-border p-4 sm:p-6 text-sm backdrop-blur-sm hover:border-foreground/20 transition-all duration-200 group ${
        isEnabled
          ? brandColor
            ? "cursor-pointer"
            : "bg-card/50"
          : "bg-card/30 opacity-60"
      }`}
      style={patternStyle}
    >
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-2 h-2 bg-border"></div>
      <div className="absolute top-0 right-0 w-2 h-2 bg-border"></div>
      <div className="absolute bottom-0 left-0 w-2 h-2 bg-border"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 bg-border"></div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center w-10 h-10 rounded-none bg-muted group-hover:bg-muted/80 transition-colors">
            {icon}
          </div>
          <Badge
            variant={isEnabled ? "default" : "secondary"}
            className="text-xs"
          >
            {isEnabled ? "Available" : "Coming Soon"}
          </Badge>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium text-sm text-primary">{name}</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-4">
        <div className="my-2 h-[1px] w-full bg-border"></div>
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {category}
          </Badge>
          <div className="flex items-center gap-2">
            {isEnabled && elementsCount && (
              <span className="text-xs text-muted-foreground">
                {elementsCount} elements
              </span>
            )}
            {providerLink && (
              <a
                href={providerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
                onClick={(e) => e.stopPropagation()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-arrow-up-right"
                >
                  <path d="M7 7h10v10" />
                  <path d="M7 17 17 7" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </figure>
  );

  if (href && isEnabled) {
    return (
      <Link className="w-full h-full" href={href}>
        {CardContent}
      </Link>
    );
  }

  return CardContent;
}
