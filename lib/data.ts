import type { Locale } from "@/lib/i18n";
import worksData from "../data/works.json";

export const designer = {
  name: "Иван Лавриненко",
  nameRuFirst: "Иван",
  nameRuRest: "Лавриненко",
  nameEn: "John Li",
  aliasRu: "Джон Ли / John Li",
  aliasEn: "John Li",
  specializationRu:
    "визуальные системы, айдентика и полиграфическая подготовка",
  specializationEn: "visual systems, identity and print production",
  taglineRu:
    "Проектирую визуальные системы и айдентику, довожу идеи до готовых макетов — от концепции до чистого печатного файла.",
  taglineEn:
    "I design visual systems and identity, taking ideas all the way to finished layouts — from concept to a clean print-ready file.",
  locationRu: "Нижний Новгород, UTC+3",
  locationEn: "Nizhny Novgorod, UTC+3",
  yandexEmail: "JohnLiComics@yandex.ru",
  gmailEmail: "li.john.comics@gmail.com",
  telegram: { label: "@john_li_comics", href: "https://t.me" },
  behance: "https://behance.net",
  dprofile: "https://dprofile.ru",
};

export function getDesigner(locale: Locale) {
  return {
    name: locale === "en" ? designer.nameEn : designer.name,
    nameFirst: locale === "en" ? "John" : designer.nameRuFirst,
    nameRest: locale === "en" ? "Li" : designer.nameRuRest,
    alias: locale === "en" ? designer.aliasEn : designer.aliasRu,
    specialization:
      locale === "en" ? designer.specializationEn : designer.specializationRu,
    tagline: locale === "en" ? designer.taglineEn : designer.taglineRu,
    location: locale === "en" ? designer.locationEn : designer.locationRu,
    emails: [
      {
        address: locale === "en" ? designer.gmailEmail : designer.yandexEmail,
        note: "",
      },
    ],
  };
}

export const navIndexRu = [
  { index: "01", label: "Работы", href: "/works", note: "галерея проектов" },
  {
    index: "02",
    label: "Обо мне",
    href: "/about",
    note: "биография и навыки",
  },
  {
    index: "03",
    label: "Контакты",
    href: "/contacts",
    note: "давайте работать",
  },
] as const;

export const navIndexEn = [
  { index: "01", label: "Works", href: "/works", note: "project gallery" },
  { index: "02", label: "About", href: "/about", note: "bio and skills" },
  {
    index: "03",
    label: "Contacts",
    href: "/contacts",
    note: "let’s work together",
  },
] as const;

export function getNavIndex(locale: Locale) {
  return locale === "en" ? navIndexEn : navIndexRu;
}

export type WorkCategoryId = "all" | "graphic" | "uiux";

export const workCategories: { id: WorkCategoryId; ru: string; en: string }[] =
  [
    { id: "all", ru: "Смотреть всё", en: "View all" },
    { id: "graphic", ru: "Графический дизайн", en: "Graphic design" },
    { id: "uiux", ru: "UI/UX", en: "UI/UX" },
  ];

export type Work = {
  slug: string;
  index: string;
  titleRu: string;
  titleEn: string;
  typeRu: string;
  typeEn: string;
  year: string;
  clientRu: string;
  clientEn: string;
  category: Exclude<WorkCategoryId, "all">;
  descriptionRu: string;
  descriptionEn: string;
  cover?: string;
  coverAspect?: string;
  coverOnPage?: boolean;
  images?: { src: string; captionRu: string; captionEn: string }[];
  figmaEmbeds?: { src: string; afterImage: number }[];
};

export type LocalizedWork = {
  slug: string;
  index: string;
  title: string;
  type: string;
  year: string;
  client: string;
  category: Exclude<WorkCategoryId, "all">;
  description: string;
  cover?: string;
  coverAspect?: string;
  coverOnPage?: boolean;
  images?: { src: string; caption: string }[];
  figmaEmbeds?: { src: string; afterImage: number }[];
};

function localizeWork(work: Work, locale: Locale): LocalizedWork {
  return {
    slug: work.slug,
    index: work.index,
    title: locale === "en" ? work.titleEn : work.titleRu,
    type: locale === "en" ? work.typeEn : work.typeRu,
    year: work.year,
    client: locale === "en" ? work.clientEn : work.clientRu,
    category: work.category,
    description: locale === "en" ? work.descriptionEn : work.descriptionRu,
    cover: work.cover,
    coverAspect: work.coverAspect,
    coverOnPage: work.coverOnPage,
    images: work.images?.map((image) => ({
      src: image.src,
      caption: locale === "en" ? image.captionEn : image.captionRu,
    })),
    figmaEmbeds: work.figmaEmbeds,
  };
}

export function getWorks(locale: Locale): LocalizedWork[] {
  return works.map((work) => localizeWork(work, locale));
}

export function getLatestWork(locale: Locale): LocalizedWork | undefined {
  let latest: Work | undefined;
  for (const work of works) {
    if (!latest || work.year > latest.year) {
      latest = work;
    }
  }
  return latest ? localizeWork(latest, locale) : undefined;
}

export function getWork(
  locale: Locale,
  slug: string
): LocalizedWork | undefined {
  const work = works.find((w) => w.slug === slug);
  return work ? localizeWork(work, locale) : undefined;
}

export const works: Work[] = worksData.items as Work[];

export type About = {
  bioTitleRu: string;
  bioTitleEn: string;
  bioRu: string[];
  bioEn: string[];
  skillsRu: string[];
  skillsEn: string[];
  experience: {
    yearsRu: string;
    yearsEn: string;
    roleRu: string;
    roleEn: string;
    placeRu: string;
    placeEn: string;
    typeRu?: string;
    typeEn?: string;
    noteRu?: string;
    noteEn?: string;
  }[];
  education: {
    years: string;
    degreeRu: string;
    degreeEn: string;
    placeRu: string;
    placeEn: string;
  }[];
};

export const about: About = {
  bioTitleRu: "Биография",
  bioTitleEn: "Biography",
  bioRu: [
    "Меня зовут Иван, работаю под ником Джон Ли. Я графический дизайнер и магистр дизайна: за академической степенью — ежедневная практика, в которой визуальные системы, айдентика и полиграфическая подготовка сплетаются в один непрерывный процесс.",
    "Мой подход прост: дизайн начинается с текста, контекста и структуры, а заканчивается чистым макетом, готовым к печати или экрану. Я люблю типографику, сетку и ритм, но ещё больше — момент, когда разрозненные элементы складываются в цельный визуальный язык, который работает и на плакате, и в приложении, и на 250-й странице графического романа.",
    "За плечами — работа над графическим романом «Moonstone» для канадской студии Zserty Inc, айдентики для магазинов и локальных брендов, городская навигация и преподавание композиции и иллюстрации в ННГАСУ. Этот опыт научил меня главному: хороший дизайн — это дисциплина, внимание к деталям и уважение к тому, кто будет смотреть результат.",
  ],
  bioEn: [
    "My name is Ivan, I work under the alias John Li. I am a graphic designer with a master’s degree in design: behind the academic degree lies daily practice, where visual systems, identity and print production merge into one continuous process.",
    "My approach is simple: design starts with text, context and structure, and ends with a clean layout ready for print or screen. I love typography, grids and rhythm — but even more, the moment when scattered elements come together into a coherent visual language that works on a poster, in an app, and on page 250 of a graphic novel.",
    "My background includes the graphic novel “Moonstone” for the Canadian studio Zserty Inc, identity work for shops and local brands, urban wayfinding, and teaching composition and illustration at NNGASU. This experience taught me the main thing: good design is discipline, attention to detail, and respect for the person who will look at the result.",
  ],
  skillsRu: [
    "Графика",
    "Типографика",
    "Инфографика",
    "Визуализация данных",
    "Полиграфия",
    "Дизайн-концепция",
    "Логотип",
    "Брендбук",
    "Айдентика",
    "Веб-дизайн",
    "UI",
    "Прототипирование",
    "Анализ ЦА",
    "Иллюстрирование",
  ],
  skillsEn: [
    "Graphics",
    "Typography",
    "Infographics",
    "Data visualization",
    "Print",
    "Design concept",
    "Logo",
    "Brandbook",
    "Identity",
    "Web design",
    "UI",
    "Prototyping",
    "Audience analysis",
    "Illustration",
  ],
  experience: [
    {
      yearsRu: "ноя. 2022 — июл. 2026",
      yearsEn: "Nov 2022 — Jul 2026",
      roleRu: "Ведущий художник / графический дизайнер",
      roleEn: "Lead artist / graphic designer",
      placeRu: "Zserty Inc",
      placeEn: "Zserty Inc",
      typeRu: "удалённо—Торонто",
      typeEn: "remote—Toronto",
      noteRu:
        "Визуальное оформление графического романа «Moonstone»: единый визуальный язык мира, переработка локаций и карты, адаптация сценария под комикс, полный визуальный продакт-процесс — раскадровка, лайн-арт, координация колориста и шрифтовика, дизайн логотипа и обложек, вёрстка, предпечатная подготовка. Итог: 5 выпусков, 2 тома, 250+ страниц.",
      noteEn:
        "Visual design of the graphic novel “Moonstone”: a unified visual language for the world, reworked locations and map, script adaptation for comics, and the full visual production process — storyboarding, line art, coordinating the colourist and letterer, logo and cover design, layout, and pre-press. Outcome: 5 issues, 2 volumes, 250+ pages.",
    },
    {
      yearsRu: "сен. 2025 — июн. 2026",
      yearsEn: "Sep 2025 — Jun 2026",
      roleRu: "Преподаватель",
      roleEn: "Lecturer",
      placeRu: "ННГАСУ",
      placeEn: "NNGASU",
      typeRu: "офис",
      typeEn: "office",
      noteRu:
        "Вёл иллюстрацию и компьютерные технологии, композицию, стилизацию и визуальный язык; курировал студенческие проекты от концепции до результата.",
      noteEn:
        "Taught illustration and computer technologies, composition, stylization and visual language; supervised student projects from concept to final result.",
    },
    {
      yearsRu: "июл. 2025",
      yearsEn: "Jul 2025",
      roleRu: "Графический дизайнер",
      roleEn: "Graphic designer",
      placeRu: "ДаШар!",
      placeEn: "DaShar!",
      typeRu: "проект",
      typeEn: "project",
noteRu:
"Фирменный стиль и логобук, визитки, подготовка макетов к печати.",
noteEn:
"Brand identity and logo book, business cards, print-ready artwork preparation.",
},
{
yearsRu: "фев. 2023 — фев. 2024",
yearsEn: "Feb 2023 — Feb 2024",
roleRu: "Графический дизайнер",
roleEn: "Graphic designer",
placeRu: "GearMech",
placeEn: "GearMech",
typeRu: "проект",
typeEn: "project",
noteRu:
"Фирменный стиль для магазина автозапчастей, рекламные и информационные материалы под разные носители.",
noteEn:
"Brand identity for an auto parts store, advertising and information materials for various media.",
},
],
education: [
{
years: "2024–2026",
degreeRu: "Магистратура «Дизайн»",
degreeEn: "Master’s degree in Design",
placeRu: "ННГАСУ",
placeEn: "NNGASU",
},
{
years: "2020–2024",
degreeRu: "Бакалавриат «Графический дизайн»",
degreeEn: "Bachelor’s degree in Graphic Design",
placeRu: "ННГАСУ",
placeEn: "NNGASU",
},
],
};
export function getAbout(locale: Locale) {
return {
bioTitle: locale === "en" ? about.bioTitleEn : about.bioTitleRu,
bio: locale === "en" ? about.bioEn : about.bioRu,
skills: locale === "en" ? about.skillsEn : about.skillsRu,
experience: about.experience.map((item) => ({
years: locale === "en" ? item.yearsEn : item.yearsRu,
role: locale === "en" ? item.roleEn : item.roleRu,
place: locale === "en" ? item.placeEn : item.placeRu,
type: locale === "en" ? item.typeEn : item.typeRu,
note: locale === "en" ? item.noteEn : item.noteRu,
})),
education: about.education.map((item) => ({
years: item.years,
degree: locale === "en" ? item.degreeEn : item.degreeRu,
place: locale === "en" ? item.placeEn : item.placeRu,
})),
};
}
export type ContactLink = {
label: string;
href: string;
note: string;
};
export function getContactLinks(locale: Locale): ContactLink[] {
if (locale === "en") {
return [
{
label: "Telegram",
href: designer.telegram.href,
note: designer.telegram.label,
},
{ label: "Behance", href: designer.behance, note: "projects" },
];
}
return [
{
label: "Telegram",
href: designer.telegram.href,
note: designer.telegram.label,
},
{ label: "Behance", href: designer.behance, note: "проекты" },
{ label: "Dprofile", href: designer.dprofile, note: "портфолио" },
];
}
export const footerMeta = {
year: "2026",
} as const;
