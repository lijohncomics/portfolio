"use client";

import { useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";

function ActiveThemeObserver() {
  const { setTheme } = useTheme();

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Функция, которая синхронизирует сайт с системой, если пользователь не кликал тумблер
    const syncWithSystem = () => {
      const hasManualClick = sessionStorage.getItem("theme-manually-clicked");
      if (!hasManualClick) {
        setTheme(mediaQuery.matches ? "dark" : "light");
      }
    };

    // 1. Стираем жёсткую память принудительно, чтобы сайт всегда стартовал с чистого листа
    try {
      localStorage.removeItem("site-theme");
      localStorage.removeItem("theme");
    } catch (e) {}

    // 2. Выставляем тему устройства при первой загрузке страницы
    syncWithSystem();

    // 3. ЖИВОЙ НАБЛЮДАТЕЛЬ: реагирует на системное переключение в фоне БЕЗ перезагрузки
    const handleSystemChange = (e: MediaQueryListEvent) => {
      const hasManualClick = sessionStorage.getItem("theme-manually-clicked");
      if (!hasManualClick) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleSystemChange);
    return () => mediaQuery.removeEventListener("change", handleSystemChange);
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
      <ActiveThemeObserver />
      {children}
    </ThemeProvider>
  );
}
