"use client";

import { useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";

function ThemeSync() {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem("site-theme");
    if (!savedTheme || savedTheme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(systemTheme);
    }
  }, [setTheme]);

  return null;
}

export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="site-theme"
    >
      <ThemeSync />
      {children}
    </ThemeProvider>
  );
}
