"use client";

import { useEffect, useState } from "react";
import { useDict, useLocale } from "@/lib/i18n";

export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);
  const { locale } = useLocale();
  const dict = useDict();

  useEffect(() => {
    const format = () => {
      const now = new Date();
      const offsetMinutes = -now.getTimezoneOffset();
      const sign = offsetMinutes >= 0 ? "+" : "−";
      const hours = Math.floor(Math.abs(offsetMinutes) / 60);
      const minutes = Math.abs(offsetMinutes) % 60;
      const utc =
        minutes === 0 ? `UTC${sign}${hours}` : `UTC${sign}${hours}:${minutes}`;
      const clock = now.toLocaleTimeString(
        locale === "en" ? "en-GB" : "ru-RU",
        {
          hour: "2-digit",
          minute: "2-digit",
        }
      );
      setTime(`${clock} ${utc}`);
    };

    format();
    const id = setInterval(format, 1000 * 30);
    window.addEventListener("focus", format);
    return () => {
      clearInterval(id);
      window.removeEventListener("focus", format);
    };
  }, [locale]);

  return <span className={className}>{time ?? dict.home.localTime}</span>;
}
