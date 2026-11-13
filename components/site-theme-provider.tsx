"use client";

import { useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";

function ThemeSync() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    // Проверяем, зафиксировал ли пользователь тему в текущей сессии вкладки
    const sessionActive = sessionStorage.getItem("theme-clicked");

    if (!sessionActive) {
      // Если это первый заход во вкладку, строго подчиняемся системе устройства
      const systemTheme = mediaQuery.matches ? "dark" : "light";
      setTheme(systemTheme);
      // Сбрасываем долгосрочную память, чтобы при следующем открытии сайта приоритет был у системы
      try {
        localStorage.removeItem("site-theme");
      } catch (e) {}
    }

    // Слушаем изменение темы в настройках самого Mac/смартфона в реальном времени
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
      enableSystem={true}
      disableTransitionOnChange
      storageKey="site-theme"
    >
      <ThemeSync />
      {children}
    </ThemeProvider>
  );
}
