"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Settings,
  Moon,
  Sun,
  Languages,
  Check,
  Sparkles,
  Menu,
  X,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useScrollAnimation } from "@/components/scroll-animation";
import { useDict, useLocale, type Locale } from "@/lib/i18n";

function AnimationToggleRow() {
  const { scrollAnimations, toggle } = useScrollAnimation();
  const dict = useDict();
  return (
    <button
      type="button"
      role="switch"
      aria-checked={scrollAnimations}
      aria-label={dict.header.animation}
      onClick={toggle}
      className="group flex w-full items-center justify-between gap-4 px-4 py-3 cursor-pointer transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      <span className="flex items-center gap-3">
        <Sparkles
          className={cn(
            "h-4 w-4 transition-colors",
            scrollAnimations
              ? "text-accent"
              : "text-muted-foreground group-hover:text-accent"
          )}
        />
        <span className="text-base font-medium tracking-tight">
          {dict.header.animation}
        </span>
      </span>
      <span
        className={cn(
          "relative inline-flex h-4 w-8 shrink-0 items-center rounded-full border transition-colors duration-300",
          scrollAnimations
            ? "bg-accent/90 border-accent"
            : "bg-transparent border-border"
        )}
      >
        <span
          className={cn(
            "inline-block h-3 w-3 rounded-full transition-transform duration-300",
            scrollAnimations
              ? "translate-x-[1.25rem] bg-background"
              : "translate-x-1 bg-muted-foreground"
          )}
        />
      </span>
    </button>
  );
}

function ThemeToggleRow() {
  const { resolvedTheme, setTheme } = useTheme();
  const dict = useDict();
  const dark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      onClick={() => {
        sessionStorage.setItem("theme-manually-clicked", "true");
        setTheme(dark ? "light" : "dark");
      }}
      className="group flex w-full items-center justify-between gap-4 px-4 py-3 cursor-pointer transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      <span className="flex items-center gap-3">
        {dark ? (
          <Moon className="h-4 w-4 text-accent" />
        ) : (
          <Sun className="h-4 w-4 text-muted-foreground group-hover:text-accent transition-colors" />
        )}
        <span className="text-base font-medium tracking-tight">
          {dict.header.theme}
        </span>
      </span>
      <span
        className={cn(
          "relative inline-flex h-4 w-8 shrink-0 items-center rounded-full border transition-colors duration-300",
          dark ? "bg-accent/90 border-accent" : "bg-transparent border-border"
        )}
      >
        <span
          className={cn(
            "inline-block h-3 w-3 rounded-full transition-transform duration-300",
            dark
              ? "translate-x-[1.25rem] bg-background"
              : "translate-x-1 bg-muted-foreground"
          )}
        />
      </span>
    </button>
  );
}

function LanguageToggleRow() {
  const { locale, setLocale } = useLocale();
  const dict = useDict();
  const options: { id: Locale; label: string }[] = [
    { id: "ru", label: dict.header.languageRu },
    { id: "en", label: dict.header.languageEn },
  ];
  return (
    <div className="px-4 py-3">
      <div className="flex items-center gap-3 mb-2">
        <Languages className="h-4 w-4 text-muted-foreground" />
        <span className="text-base font-medium tracking-tight">
          {dict.header.language}
        </span>
      </div>
      <div className="flex flex-col">
        {options.map((option) => {
          const active = locale === option.id;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={active}
              onClick={() => setLocale(option.id)}
              className={cn(
                "flex w-full items-center justify-between gap-4 px-2 py-2 cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                active
                  ? "text-accent"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <span className="text-base font-medium tracking-tight">
                {option.label}
              </span>
              {active ? <Check className="h-4 w-4" /> : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function BrandLabel() {
  const { locale } = useLocale();
  const dict = useDict();
  const pathname = usePathname();
  const sectionLabel =
    pathname === "/works" || pathname.startsWith("/works/")
      ? dict.header.works
      : pathname === "/about"
        ? dict.header.about
        : pathname === "/contacts"
          ? dict.header.contacts
          : null;
  const name = locale === "en" ? "John Li" : "Джон Ли";
  const isHome = pathname === "/";
  return (
    <span className="text-base font-semibold tracking-tight uppercase select-none">
      <Link
        href="/"
        aria-current={isHome ? "page" : undefined}
        className={cn(
          "hidden md:inline link-underline brand-underline",
          isHome && "link-underline-active"
        )}
      >
        {name}
      </Link>
      <span className="md:hidden">{sectionLabel ?? name}</span>
    </span>
  );
}

export function SiteHeader() {
  const [hidden, setHidden] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);
  const settingsRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const dict = useDict();
  const pathname = usePathname();

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const delta = y - lastY.current;
      if (Math.abs(delta) > 8) {
        const shouldHide = delta > 0 && y > 120;
        setHidden(shouldHide);
        if (shouldHide) {
          setSettingsOpen(false);
          setMenuOpen(false);
        }
        lastY.current = y;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!settingsOpen && !menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (settingsOpen && !settingsRef.current?.contains(target)) {
        setSettingsOpen(false);
      }
      if (menuOpen && !menuRef.current?.contains(target)) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSettingsOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [settingsOpen, menuOpen]);

  const navLinks = [
    { href: "/", label: dict.header.home },
    { href: "/works", label: dict.header.works },
    { href: "/about", label: dict.header.about },
    { href: "/contacts", label: dict.header.contacts },
  ];
  const desktopNavLinks = navLinks.slice(1);
  const isWorkCase = pathname.startsWith("/works/");

  return (
    <header
      className={cn(
        "w-full sticky top-0 z-40 border-b bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/90",
        "transition-transform duration-300 ease-out",
        hidden ? "-translate-y-full" : "translate-y-0"
      )}
    >
      <div className="container-site py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 md:gap-6 min-w-0">
          <div
            className="relative flex items-center gap-4 md:gap-6 min-w-0"
            ref={menuRef}
          >
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={menuOpen}
              aria-label={dict.header.menu}
              onClick={() => setMenuOpen((open) => !open)}
              className="md:hidden inline-flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
            >
              {menuOpen ? (
                <X className="h-4 w-4 shrink-0" />
              ) : (
                <Menu className="h-4 w-4 shrink-0" />
              )}
            </button>
            <BrandLabel />
            {menuOpen ? (
              <nav
                role="menu"
                aria-label={dict.header.navLabel}
                className="md:hidden absolute left-0 top-[calc(100%+0.75rem)] w-64 max-w-[calc(100vw-3rem)] glass-panel shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
              >
                <p className="marginalia border-b border-border/60 px-4 py-3">
                  {dict.header.navLabel}
                </p>
                {navLinks.map((link) => {
                  const active =
                    pathname === link.href ||
                    (isWorkCase && link.href === "/works");
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      role="menuitem"
                      aria-current={active ? "page" : undefined}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "flex items-center px-4 py-3 marginalia transition-colors hover:bg-secondary/70 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-ring",
                        "link-underline",
                        active && "link-underline-active"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            ) : null}
          </div>
          <nav
            aria-label={dict.header.navLabel}
            className="hidden md:flex items-center gap-4 md:gap-6"
          >
            {desktopNavLinks.map((link) => {
              const active =
                pathname === link.href ||
                (isWorkCase && link.href === "/works");
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "marginalia link-underline",
                    active && "link-underline-active"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="relative" ref={settingsRef}>
          <button
            type="button"
            aria-haspopup="menu"
            aria-expanded={settingsOpen}
            aria-label={dict.header.settings}
            onClick={() => setSettingsOpen((open) => !open)}
            className="inline-flex h-9 items-center gap-2 px-3 border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
          >
            <Settings className="h-4 w-4 shrink-0" />
            <span className="hidden md:inline text-base font-medium tracking-tight whitespace-nowrap">
              {dict.header.settingsMenu}
            </span>
          </button>
          {settingsOpen ? (
            <div
              role="menu"
              aria-label={dict.header.settingsMenu}
              className="absolute right-0 top-[calc(100%+0.5rem)] w-64 glass-panel shadow-lg animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <p className="marginalia border-b border-border/60 px-4 py-3">
                {dict.header.settingsMenu}
              </p>
              <ThemeToggleRow />
              <div className="border-t border-border/60">
                <AnimationToggleRow />
              </div>
              <div className="border-t border-border/60">
                <LanguageToggleRow />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
