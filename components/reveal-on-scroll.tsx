"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/components/scroll-animation";

type RevealVariant = "up" | "left" | "right" | "scale";

const hiddenClasses: Record<RevealVariant, string> = {
  up: "opacity-0 translate-y-8",
  left: "opacity-0 -translate-x-8",
  right: "opacity-0 translate-x-8",
  scale: "opacity-0 scale-[0.96]",
};

type RevealOnScrollProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
};

export function RevealOnScroll({
  children,
  className,
  delay = 0,
  variant = "up",
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollAnimations } = useScrollAnimation();
  const [visible, setVisible] = useState(false);
  const stagger = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < lastY - 2) {
        stagger.current = Math.max(0, stagger.current - 40);
      } else if (y > lastY + 2) {
        stagger.current = Math.min(400, stagger.current + 40);
      }
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (stagger.current < 400) stagger.current += 60;
        } else {
          if (stagger.current > 0) stagger.current -= 60;
          setVisible(false);
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const effectiveVisible = visible || !scrollAnimations;

  return (
    <div
      ref={ref}
      style={
        scrollAnimations && delay
          ? { transitionDelay: `${delay}ms` }
          : undefined
      }
      className={cn(
        "transition-all duration-700 ease-out",
        effectiveVisible
          ? "opacity-100 translate-x-0 translate-y-0 scale-100"
          : hiddenClasses[variant],
        "pointer-events-none",
        effectiveVisible && "pointer-events-auto",
        className
      )}
    >
      {children}
    </div>
  );
}
