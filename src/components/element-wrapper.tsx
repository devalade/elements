import { ReactNode } from "react";

interface ElementWrapperProps {
  children: ReactNode;
  logo?: ReactNode;
  className?: string;
}

export function ElementWrapper({ children, logo, className = "" }: ElementWrapperProps) {
  return (
    <div className={`w-full max-w-md space-y-4 ${className}`}>
      <div className="relative border-2 border-dashed border-foreground/50 p-4 rounded-md">
        {logo && (
          <div className="size-8 flex items-center justify-center absolute -top-3 -right-3 bg-card border rounded-full">
            {logo}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}