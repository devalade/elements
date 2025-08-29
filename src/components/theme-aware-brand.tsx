"use client";

import { useTheme } from "next-themes";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface ThemeAwareBrandProps {
  brandColor: string;
  darkBrandColor?: string;
  children?: ReactNode;
}

export function ThemeAwareBrandText({ 
  brandColor, 
  darkBrandColor, 
  children 
}: ThemeAwareBrandProps) {
  const { theme } = useTheme();
  const currentBrandColor = theme === 'dark' && darkBrandColor ? darkBrandColor : brandColor;

  return (
    <div className="text-base uppercase tracking-widest font-light mb-2" style={{ color: currentBrandColor }}>
      {children}
    </div>
  );
}

export function ThemeAwareButton({ 
  brandColor, 
  darkBrandColor, 
  children 
}: ThemeAwareBrandProps) {
  const { theme } = useTheme();
  const currentBrandColor = theme === 'dark' && darkBrandColor ? darkBrandColor : brandColor;

  return (
    <Button 
      style={{ 
        backgroundColor: currentBrandColor, 
        color: currentBrandColor === "#8DFF53" ? '#000000' : '#FFFFFF'
      }} 
      className="hover:opacity-90"
    >
      {children}
    </Button>
  );
}

export function ThemeAwarePattern({ 
  brandColor, 
  darkBrandColor 
}: { brandColor: string; darkBrandColor?: string }) {
  const { theme } = useTheme();
  const currentBrandColor = theme === 'dark' && darkBrandColor ? darkBrandColor : brandColor;
  
  const patternStyle = {
    backgroundColor: `${currentBrandColor}05`,
    backgroundImage: `repeating-linear-gradient(
      45deg,
      transparent,
      transparent 8px,
      ${currentBrandColor}15 8px,
      ${currentBrandColor}15 9px
    )`
  };

  return (
    <div 
      className="absolute inset-0 opacity-30"
      style={patternStyle}
    />
  );
}