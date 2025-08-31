import type { Metadata } from "next";
import { Figtree, JetBrains_Mono, Doto } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { shadcn } from "@clerk/themes";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const doto = Doto({
  variable: "--font-doto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Elements",
  description: "Full Stack Components by Crafter Station",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadcn,
        elements: {
          modalBackdrop: "backdrop-blur-sm bg-black/50",
          modalContent: "flex items-center justify-center !my-auto",
        },
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${figtree.variable} ${jetbrainsMono.variable} ${doto.variable} font-sans antialiased selection:bg-foreground selection:text-background`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
