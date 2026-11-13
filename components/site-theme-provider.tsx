"use client";

import { useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";

function ThemeSync() {
  const { setTheme } = useTheme();

  useEffect(() => {
    // Принудительно очищаем старый выбор темы из памяти браузера при каждом заходе/обновлении
    try {
      localStorage.removeItem("site-theme");
    } catch (e) {}

    const handleThemeChange = () => {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      setTheme(systemTheme);
    };

    // Мгновенно включаем системную тему
    handleThemeChange();

    // Следим за изменениями темы в настройках устройства в реальном времени
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
