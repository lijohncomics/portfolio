"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/lib/i18n";
import { getDesigner } from "@/lib/data";

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
      // Если onlyClock = true (блок автора), жестко фиксируем Нижний Новгород (UTC+3).
      // Иначе берем местный часовой пояс устройства посетителя (например, Ямал).
      const formatted = now.toLocaleTimeString("ru-RU", {
        ...(onlyClock ? { timeZone: "Europe/Moscow" } : {}),
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
  }, [onlyClock]);

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

export function DesignerLocation({ className }: { className?: string }) {
  const { locale } = useLocale();
  const d = getDesigner(locale);
  return (
    <span className={className}>
      {d.location} <LocalTime onlyClock />
    </span>
  );
}
