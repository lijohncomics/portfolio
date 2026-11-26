"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";

const COOKIE_CONSENT_KEY = "site-cookie-consent";

export function CookieNotice() {
  const [visible, setVisible] = useState(false);
  const { locale } = useLocale();

  useEffect(() => {
    try {
      const accepted = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!accepted) {
        const timer = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      window.localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  const isEn = locale === "en";

  return (
    <aside
      aria-label={isEn ? "Cookie notice" : "Уведомление о cookie"}
      className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm z-50 glass-panel p-4 md:p-5 shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500"
    >
      <div className="flex flex-col gap-3">
        <p className="text-xs leading-relaxed text-muted-foreground">
          {isEn
            ? "This site uses cookies and Yandex Metrica to analyze traffic and improve your experience."
            : "Сайт использует файлы cookie и Яндекс.Метрику для анализа посещаемости и улучшения работы."}
        </p>
        <div className="flex items-center justify-between gap-4 border-t border-border/60 pt-3">
          <span className="marginalia">cookies</span>
          <button
            type="button"
            onClick={accept}
            className="marginalia link-underline text-foreground hover:text-accent transition-colors cursor-pointer font-semibold"
          >
            {isEn ? "Accept" : "Понятно"}
          </button>
        </div>
      </div>
    </aside>
  );
}
