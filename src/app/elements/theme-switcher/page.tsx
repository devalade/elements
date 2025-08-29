import { ThemeProvider } from "next-themes";
import { ThemeSwitcherElement } from "@/components/elements/theme-switcher/theme-switcher";

export default function ThemeSwitcherTestPage() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">Theme Switcher Test</h1>
            <p className="text-muted-foreground">
              Test your theme switcher element with dark/light mode
            </p>
          </div>
          
          <div className="flex justify-center">
            <ThemeSwitcherElement />
          </div>
          
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Toggle between light and dark themes
            </p>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}