"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useSyncExternalStore,
} from "react";

export type Locale = "ru" | "en";

const ru = {
  header: {
    home: "Джон Ли",
    works: "Работы",
    about: "Обо мне",
    contacts: "Контакты",
    menu: "Меню",
    animation: "Анимация",
    navLabel: "Основная навигация",
    settings: "Настройки",
    settingsMenu: "Настройки сайта",
    theme: "Тёмная тема",
    language: "Язык",
    languageRu: "Русский",
    languageEn: "English",
  },
  footer: {
    edition: "портфолио-издание",
  },
  home: {
    featuredAndNav: "Избранные работы и навигация",
    navigation: "Навигация",
    recentProject: "Недавний проект",
    allWorks: "Все работы",
    preview: "превью",
    localTime: "—:— локальное время",
  },
  works: {
    pageTitle: "Работы — галерея",
    gallery: "галерея",
    allWorks: "Все работы",
    groupLabel: "Фильтр работ по категориям",
    galleryLabel: "Галерея работ",
    view: "смотреть работу",
    emptyNote: "в этой категории пока пусто",
    emptyTitle: "Скоро здесь появятся новые работы",
    prevWork: "предыдущая работа",
    nextWork: "следующая работа",
    ariaPrev: (title: string) => `Предыдущая работа: ${title}`,
    ariaNext: (title: string) => `Следующая работа: ${title}`,
    workTitle: "Работа",
    yearLabel: "Год",
    typeLabel: "Тип проекта",
    clientLabel: "Клиент",
    showReelCaption: "шоу рил проекта",
    reelNote: "видео / шоурил",
    workReelTitle: "шоу рил",
    imageAlt: (title: string, i: number, total: number) =>
      `${title} — изображение ${i} из ${total}`,
    previewAlt: (title: string) => `Превью работы: ${title}`,
    fig: (index: string, year: string) => `фиг. ${index} / ${year}`,
  },
  about: {
    pageTitle: "Обо мне",
    kicker: "графический дизайнер",
    portrait: "Портрет и биография",
    skillsExperience: "Навыки и опыт",
    educationLabel: "Образование",
    skillsTitle: "Навыки",
    experienceTitle: "Опыт",
    educationTitle: "Образование",
    title: "Обо мне",
  },
  contacts: {
    pageTitle: "Контакты",
    kicker: "контакты",
    titlePlain: "Давайте",
    titleAccent: "работать",
    titleEnd: "вместе",
    lead: "Есть проект, идея или вопрос — напишите. Обычно отвечаю в течение одного-двух дней.",
    note: "почта",
    altNote: "альтернативная почта",
    socialSection: "Соцсети и мессенджеры",
  },
};

export type Dict = typeof ru;

const en: Dict = {
  header: {
    home: "John Li",
    works: "Works",
    about: "About",
    contacts: "Contacts",
    menu: "Menu",
    animation: "Animation",
    navLabel: "Main navigation",
    settings: "Settings",
    settingsMenu: "Site settings",
    theme: "Dark theme",
    language: "Language",
    languageRu: "Русский",
    languageEn: "English",
  },
  footer: {
    edition: "portfolio edition",
  },
  home: {
    featuredAndNav: "Featured works and navigation",
    navigation: "Navigation",
    recentProject: "Recent project",
    allWorks: "All works",
    preview: "preview",
    localTime: "—:— local time",
  },
  works: {
    pageTitle: "Works — gallery",
    gallery: "gallery",
    allWorks: "All works",
    groupLabel: "Filter works by category",
    galleryLabel: "Works gallery",
    view: "view project",
    emptyNote: "nothing here yet in this category",
    emptyTitle: "New works are coming soon",
    prevWork: "previous work",
    nextWork: "next work",
    ariaPrev: (title: string) => `Previous work: ${title}`,
    ariaNext: (title: string) => `Next work: ${title}`,
    workTitle: "Work",
    yearLabel: "Year",
    typeLabel: "Project type",
    clientLabel: "Client",
    showReelCaption: "project show reel",
    reelNote: "video / showreel",
    workReelTitle: "show reel",
    imageAlt: (title: string, i: number, total: number) =>
      `${title} — image ${i} of ${total}`,
    previewAlt: (title: string) => `Work preview: ${title}`,
    fig: (index: string, year: string) => `fig. ${index} / ${year}`,
  },
  about: {
    pageTitle: "About",
    kicker: "graphic designer",
    portrait: "Portrait and biography",
    skillsExperience: "Skills and experience",
    educationLabel: "Education",
    skillsTitle: "Skills",
    experienceTitle: "Experience",
    educationTitle: "Education",
    title: "About",
  },
  contacts: {
    pageTitle: "Contacts",
    kicker: "contacts",
    titlePlain: "Let’s",
    titleAccent: "work",
    titleEnd: "together",
    lead: "Have a project, an idea or a question — write to me. I usually reply within a day or two.",
    note: "mail",
    altNote: "alternative mail",
    socialSection: "Socials and messengers",
  },
};

const dicts: Record<Locale, Dict> = { ru, en };

const STORAGE_KEY = "site-locale";

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getSnapshot(): Locale {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ru") return saved;
    const lang = (navigator.language || "").toLowerCase();
    if (
      lang.startsWith("ru") ||
      lang.startsWith("be") ||
      lang.startsWith("kk")
    ) {
      return "ru";
    }
    return "en";
  } catch {
    return "ru";
  }
}

function getServerSnapshot(): Locale {
  return "ru";
}

const LanguageContext = createContext<{
  locale: Locale;
  setLocale: (locale: Locale) => void;
}>({ locale: "ru", setLocale: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const setLocale = useCallback((next: Locale) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    listeners.forEach((listener) => listener());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LanguageContext.Provider value={{ locale, setLocale }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLocale() {
  return useContext(LanguageContext);
}

export function getDict(locale: Locale): Dict {
  return dicts[locale];
}

export function useDict(): Dict {
  const { locale } = useLocale();
  return getDict(locale);
}

export function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
