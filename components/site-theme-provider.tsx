"use client";

import { useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";

function ThemeSync() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const handleThemeChange = () => {
      const savedTheme = localStorage.getItem("site-theme");
      if (!savedTheme || savedTheme === "system") {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
        setTheme(systemTheme);
      }
    };

    // Запуск при загрузке
    handleThemeChange();

    // Слушаем изменение темы устройства в реальном времени
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", handleThemeChange);
    
    return () => mediaQuery.removeEventListener("change", handleThemeChange);
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
