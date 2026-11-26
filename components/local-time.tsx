"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";

export function LocalTime({
  className,
  onlyClock = false,
}: {
  className?: string;
  onlyClock?: boolean;
}) {
  const [clock, setClock] = useState<string | null>(null);
  const { locale } = useLocale();

  useEffect(() => {
    const format = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("ru-RU", {
        timeZone: "Europe/Moscow",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });
      setClock(formatted);
    };

    format();
    const id = setInterval(format, 1000);
    window.addEventListener("focus", format);
    return () => {
      clearInterval(id);
      window.removeEventListener("focus", format);
    };
  }, []);

  const currentClock = clock ?? "—:—";

  if (onlyClock) {
    return <span className={className}>{currentClock}</span>;
  }

  const label = locale === "en" ? "— local time" : "— локальное время";
  return (
    <span className={className}>
      {currentClock} {label}
    </span>
  );
}
