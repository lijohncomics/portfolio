"use client";

import { useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";

function ThemeSync() {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Чистим вообще все возможные ключи памяти при старте вкладки
    try {
      localStorage.removeItem("site-theme");
      localStorage.removeItem("theme");
    } catch (e) {}

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const sessionActive = sessionStorage.getItem("theme-clicked");

    // Если в этой сессии клика не было — включаем строго тему устройства
    if (!sessionActive) {
      setTheme(mediaQuery.matches ? "dark" : "light");
    }

    const handleChange = (e: MediaQueryListEvent) => {
      const sessionActiveNow = sessionStorage.getItem("theme-clicked");
      if (!sessionActiveNow) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [setTheme]);

  return null;
}

export function SiteThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={false} // Отключаем внутренний хаотичный встроенный поиск системы
      disableTransitionOnChange
      storageKey="site-theme"
    >
      <ThemeSync />
      {children}
    </ThemeProvider>
  );
}
