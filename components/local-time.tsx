"use client";

import { useEffect, useState } from "react";
import { useDict } from "@/lib/i18n";

export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);
  const dict = useDict();

  useEffect(() => {
    const format = () => {
      const now = new Date();
      
      const clock = now.toLocaleTimeString("ru-RU", {
        timeZone: "Europe/Moscow",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
      });

      setTime(`${clock} ${dict.home.localTime}`);
    };

    format();
    const id = setInterval(format, 1000);
    window.addEventListener("focus", format);
    
    return () => {
      clearInterval(id);
      window.removeEventListener("focus", format);
    };
  }, [dict]);

  return <span className={className}>{time ?? dict.home.localTime}</span>;
}
