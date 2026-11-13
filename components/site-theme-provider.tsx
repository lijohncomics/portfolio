"use client";

import { useEffect } from "react";
import { ThemeProvider, useTheme } from "next-themes";

function ThemeSync() {
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    // 1. Принудительно очищаем старую память при каждом заходе или обновлении страницы (Cmd+R)
    try {
      localStorage.removeItem("site-theme");
    } catch (e) {}

    // 2. Считываем реальную системную тему устройства в эту секунду
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const systemTheme = mediaQuery.matches ? "dark" : "light";

    // 3. Выставляем тему устройства как стартовую
    setTheme(systemTheme);

    // 4. Слушаем, если пользователь изменит тему в настройках самого Mac/смартфона, пока вкладка открыта
    const handleChange = (e: MediaQueryListEvent) => {
      // Меняем тему устройства только если пользователь не переключал тумблер вручную на сайте
      const currentStored = localStorage.getItem("site-theme");
      if (!currentStored || currentStored === "system") {
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
