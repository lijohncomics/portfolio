import type { Metadata } from "next";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import { BridgeProvider } from "@/components/bridge-provider";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollAnimationProvider } from "@/components/scroll-animation";
import { LanguageProvider } from "@/lib/i18n";
import { SiteThemeProvider } from "@/components/site-theme-provider";

const geist = Geist({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title:
    "Иван Лавриненко / John Li — визуальные системы, айдентика и полиграфическая подготовка",
  description:
    "Проектирую визуальные системы и айдентику, довожу идеи до готовых макетов — от концепции до чистого печатного файла.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={cn("font-sans", geist.variable, geistMono.variable)}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen bg-background text-foreground flex flex-col">
        <SiteThemeProvider>
          <BridgeProvider />
          <LanguageProvider>
            <ScrollAnimationProvider>
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </ScrollAnimationProvider>
          </LanguageProvider>
        </SiteThemeProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
