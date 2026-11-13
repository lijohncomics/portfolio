import type { Locale } from "@/lib/i18n";

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
  telegram: { label: "@john_li_comics", href: "https://t.me/john_li_comics" },
  behance: "https://www.behance.net/licomics3b51",
  dprofile: "https://dprofile.ru/johnli",
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

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

function withBasePath(path?: string): string | undefined {
  if (!path) return path;
  if (path.startsWith("http") || (basePath && path.startsWith(basePath))) {
    return path;
  }
  return `${basePath}${path}`;
}

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
    cover: withBasePath(work.cover),
    coverAspect: work.coverAspect,
    coverOnPage: work.coverOnPage,
    images: work.images?.map((image) => ({
      src: withBasePath(image.src) || image.src,
      caption: locale === "en" ? image.captionEn : image.captionRu,
    })),
    figmaEmbeds: work.figmaEmbeds,
  };
}

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

export const works: Work[] = [
  {
    slug: "visual-navigation",
    index: "01",
    titleRu: "Средства визуальной навигации",
    titleEn: "Visual Navigation Tools",
    typeRu: "Городская навигация",
    typeEn: "Urban wayfinding",
    year: "2026",
    clientRu: "Концепт",
    clientEn: "Concept",
    category: "graphic",
    descriptionRu:
      "Концепт единой визуальной навигации для электротранспорта Нижнего Новгорода. Проект решает проблему фрагментированной городской среды, где метро, трамваи, троллейбусы и канатная дорога существуют изолированно друг от друга. На основе UX-исследования по методологии JTBD была создана сквозная дизайн-система: кодирование видов транспорта цветом и формой линий, система узнаваемых городских маркеров. Результат — бесшовный комбинированный маршрут, который снижает когнитивную нагрузку на пассажира и легко масштабируется как на физических носителях, так и в цифровой среде.",
    descriptionEn:
      "A concept of unified visual wayfinding for Nizhny Novgorod electric transport. The project addresses the problem of a fragmented urban environment where the metro, trams, trolleybuses and a cable car exist in isolation from each other. Based on JTBD UX research, an end-to-end design system was created: colour and line-shape coding for transport modes, a system of recognisable city markers. The result is a seamless combined route that reduces passenger cognitive load and scales easily to both physical media and digital environments.",
    cover: "/works/visual-navigation/cover.png",
    coverAspect: "1616 / 1264",
    images: [
      {
        src: "/works/visual-navigation/1.png",
        captionRu: "фиг. 01 — обложка проекта",
        captionEn: "fig. 01 — project cover",
      },
      {
        src: "/works/visual-navigation/2.png",
        captionRu: "фиг. 02 — исследование и проблема",
        captionEn: "fig. 02 — research and problem",
      },
      {
        src: "/works/visual-navigation/3.png",
        captionRu: "фиг. 03 — JTBD-фреймворк",
        captionEn: "fig. 03 — JTBD framework",
      },
      {
        src: "/works/visual-navigation/4.png",
        captionRu: "фиг. 04 — цветовое кодирование линий",
        captionEn: "fig. 04 — line colour coding",
      },
      {
        src: "/works/visual-navigation/5.png",
        captionRu: "фиг. 05 — система городских маркеров",
        captionEn: "fig. 05 — city marker system",
      },
      {
        src: "/works/visual-navigation/6.png",
        captionRu: "фиг. 06 — навигационные указатели",
        captionEn: "fig. 06 — wayfinding signage",
      },
      {
        src: "/works/visual-navigation/7.png",
        captionRu: "фиг. 07 — станция метро",
        captionEn: "fig. 07 — metro station",
      },
      {
        src: "/works/visual-navigation/8.png",
        captionRu: "фиг. 08 — трамвайная остановка",
        captionEn: "fig. 08 — tram stop",
      },
      {
        src: "/works/visual-navigation/9.png",
        captionRu: "фиг. 09 — комбинированный маршрут",
        captionEn: "fig. 09 — combined route",
      },
      {
        src: "/works/visual-navigation/10.png",
        captionRu: "фиг. 10 — вагон электротранспорта",
        captionEn: "fig. 10 — electric transport carriage",
      },
      {
        src: "/works/visual-navigation/11.png",
        captionRu: "фиг. 11 — цифровая среда",
        captionEn: "fig. 11 — digital environment",
      },
      {
        src: "/works/visual-navigation/12.png",
        captionRu: "фиг. 12 — масштабируемость системы",
        captionEn: "fig. 12 — system scalability",
      },
    ],
  },
  {
    slug: "charity-app",
    index: "02",
    titleRu: "Концепт приложения благотворительной организации",
    titleEn: "Charity Organisation App Concept",
    typeRu: "Концепт UI/UX",
    typeEn: "UI/UX concept",
    year: "2026",
    clientRu: "Концепт",
    clientEn: "Concept",
    category: "uiux",
    descriptionRu:
      "Проект мобильного приложения для благотворительной организации решает проблему перегруженных и сложных интерфейсов, которые часто становятся барьером для людей в кризисный момент. Вместо стандартного сбора пожертвований приложение ставит на первое место реальные задачи человека, объединяя экстренную помощь, инклюзивное трудоустройство, медицину и безопасное общение в один бесшовный сценарий.",
    descriptionEn:
      "A mobile app concept for a charity organisation that tackles the problem of overloaded, complicated interfaces, which often become a barrier for people in a moment of crisis. Instead of the standard donation-collection pattern, the app puts a person’s real needs first, combining emergency assistance, inclusive employment, healthcare and safe communication into one seamless scenario.",
    cover: "/works/charity-app/cover.png",
    coverAspect: "1616 / 1616",
    coverOnPage: false,
    images: [
      {
        src: "/works/charity-app/1.png",
        captionRu: "иллюстрация 01",
        captionEn: "illustration 01",
      },
      {
        src: "/works/charity-app/2.png",
        captionRu: "иллюстрация 02",
        captionEn: "illustration 02",
      },
      {
        src: "/works/charity-app/3.png",
        captionRu: "иллюстрация 03",
        captionEn: "illustration 03",
      },
      {
        src: "/works/charity-app/4.png",
        captionRu: "иллюстрация 04",
        captionEn: "illustration 04",
      },
      {
        src: "/works/charity-app/5.png",
        captionRu: "иллюстрация 05",
        captionEn: "illustration 05",
      },
      {
        src: "/works/charity-app/6.png",
        captionRu: "иллюстрация 06",
        captionEn: "illustration 06",
      },
      {
        src: "/works/charity-app/7.png",
        captionRu: "иллюстрация 07",
        captionEn: "illustration 07",
      },
      {
        src: "/works/charity-app/8.png",
        captionRu: "иллюстрация 08",
        captionEn: "illustration 08",
      },
      {
        src: "/works/charity-app/9.png",
        captionRu: "иллюстрация 09",
        captionEn: "illustration 09",
      },
      {
        src: "/works/charity-app/10.png",
        captionRu: "иллюстрация 10",
        captionEn: "illustration 10",
      },
      {
        src: "/works/charity-app/11.png",
        captionRu: "иллюстрация 11",
        captionEn: "illustration 11",
      },
      {
        src: "/works/charity-app/12.png",
        captionRu: "иллюстрация 12",
        captionEn: "illustration 12",
      },
      {
        src: "/works/charity-app/13.png",
        captionRu: "иллюстрация 13",
        captionEn: "illustration 13",
      },
      {
        src: "/works/charity-app/14.png",
        captionRu: "иллюстрация 14",
        captionEn: "illustration 14",
      },
    ],
  },
  {
    slug: "ozon-family",
    index: "03",
    titleRu: "Ozon. Дополнительные функции для семейных людей",
    titleEn: "Ozon. Additional Features for Families",
    typeRu: "UI/UX",
    typeEn: "UI/UX",
    year: "2025",
    clientRu: "Хаккатон от Ozon",
    clientEn: "Ozon Hackathon",
    category: "uiux",
    descriptionRu:
      "Разработка UX/UI-концепции нового семейного функционала внутри приложения Ozon. Проект направлен на создание бесшовного клиентского опыта для семей, объединяя процессы выбора, оформления, оплаты и получения товаров.",
    descriptionEn:
      "A UX/UI concept for a new family-oriented feature set inside the Ozon app. The project aims to create a seamless customer experience for families, bringing together product discovery, checkout, payment and delivery into one flow.",
    cover: "/works/ozon-family/cover.png",
    coverAspect: "1 / 1",
    coverOnPage: false,
    images: [
      {
        src: "/works/ozon-family/1.png",
        captionRu: "иллюстрация 01",
        captionEn: "illustration 01",
      },
      {
        src: "/works/ozon-family/2.png",
        captionRu: "иллюстрация 02",
        captionEn: "illustration 02",
      },
      {
        src: "/works/ozon-family/3.png",
        captionRu: "иллюстрация 03",
        captionEn: "illustration 03",
      },
      {
        src: "/works/ozon-family/4.png",
        captionRu: "иллюстрация 04",
        captionEn: "illustration 04",
      },
      {
        src: "/works/ozon-family/5.png",
        captionRu: "иллюстрация 05",
        captionEn: "illustration 05",
      },
    ],
    figmaEmbeds: [
      {
        src: "https://embed.figma.com/proto/xs1Opz4MNMI36Jt4JgqDS6/Ozon--%D0%90%D0%BD%D0%B0%D0%BB%D0%B8%D0%B7--%D0%9F%D1%80%D0%BE%D1%82%D0%BE%D1%82%D0%B8%D0%BF-?page-id=3143%3A19549&node-id=3143-21733&viewport=171%2C274%2C0.1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3143%3A21733&embed-host=share",
        afterImage: 1,
      },
      {
        src: "https://embed.figma.com/proto/xs1Opz4MNMI36Jt4JgqDS6/Ozon-Family?page-id=3143%3A19550&node-id=3143-25281&viewport=45%2C298%2C0.16&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3143%3A25281&embed-host=share",
        afterImage: 2,
      },
      {
        src: "https://embed.figma.com/proto/xs1Opz4MNMI36Jt4JgqDS6/Ozon-Family?page-id=3143%3A19551&node-id=3143-26923&viewport=253%2C320%2C0.11&scaling=scale-down&content-scaling=fixed&starting-point-node-id=3143%3A26923&embed-host=share",
        afterImage: 3,
      },
    ],
  },
  {
    slug: "dashar-logo",
    index: "04",
    titleRu: "Логотип для бренда «ДаШар!»",
    titleEn: "Logo for the DaShar! Brand",
    typeRu: "Графический дизайн. Логотип",
    typeEn: "Graphic design. Logo",
    year: "2025",
    clientRu: "ДаШар!",
    clientEn: "DaShar!",
    category: "graphic",
    descriptionRu:
      "«Да!Шар» — бренд, специализирующийся на продаже воздушных шаров и праздничной упаковки. Цель проекта заключалась в создании дружелюбного, запоминающегося и масштабируемого визуального стиля, который подчеркивает атмосферу праздника, легкости и радости. Результатом работы стал комплексный логобук, регламентирующий правила использования фирменного стиля на различных носителях.",
    descriptionEn:
      "Da!Shar is a brand specialising in balloons and festive packaging. The goal of the project was to create a friendly, memorable and scalable visual style that emphasises an atmosphere of celebration, lightness and joy. The result of the work was a comprehensive logo book that regulates the rules for using the brand identity across various media.",
    cover: "/works/dashar-logo/cover.png",
    coverAspect: "1616 / 1264",
    coverOnPage: false,
    images: [
      {
        src: "/works/dashar-logo/01.png",
        captionRu: "страница 01",
        captionEn: "page 01",
      },
      {
        src: "/works/dashar-logo/03.png",
        captionRu: "страница 03",
        captionEn: "page 03",
      },
      {
        src: "/works/dashar-logo/04.png",
        captionRu: "страница 04",
        captionEn: "page 04",
      },
      {
        src: "/works/dashar-logo/05.png",
        captionRu: "страница 05",
        captionEn: "page 05",
      },
      {
        src: "/works/dashar-logo/06.png",
        captionRu: "страница 06",
        captionEn: "page 06",
      },
      {
        src: "/works/dashar-logo/07.png",
        captionRu: "страница 07",
        captionEn: "page 07",
      },
      {
        src: "/works/dashar-logo/08.png",
        captionRu: "страница 08",
        captionEn: "page 08",
      },
      {
        src: "/works/dashar-logo/09.png",
        captionRu: "страница 09",
        captionEn: "page 09",
      },
      {
        src: "/works/dashar-logo/10.png",
        captionRu: "страница 10",
        captionEn: "page 10",
      },
      {
        src: "/works/dashar-logo/11.png",
        captionRu: "страница 11",
        captionEn: "page 11",
      },
      {
        src: "/works/dashar-logo/12.png",
        captionRu: "страница 12",
        captionEn: "page 12",
      },
      {
        src: "/works/dashar-logo/14.png",
        captionRu: "страница 14",
        captionEn: "page 14",
      },
    ],
  },
  {
    slug: "comics-magazine",
    index: "05",
    titleRu: "«Кто стоит за?» Журнал о комиксах",
    titleEn: "“Who Is Behind?” Comics Magazine",
    typeRu: "Графический дизайн, вёрстка",
    typeEn: "Graphic design, layout",
    year: "2023",
    clientRu: "Концепт",
    clientEn: "Concept",
    category: "graphic",
    descriptionRu:
      "«Кто стоит за…?» — разработка фирменного стиля и дизайн-системы для ежемесячного тиражного издания. Проект по созданию комплексной визуальной айдентики для серийного печатного медиа о поп-культуре. Главной задачей было спроектировать узнаваемую и масштабируемую дизайн-систему, рассчитанную на регулярный ежемесячный цикл производства больших аналитических выпусков.",
    descriptionEn:
      "“Who Is Behind…?” — the development of a brand identity and design system for a monthly print magazine. A project to create a comprehensive visual identity for serial print media about pop culture. The main task was to design a recognisable and scalable design system built for a regular monthly production cycle of large analytical issues.",
    cover: "/works/comics-magazine/cover.png",
    coverAspect: "6734 / 5267",
    coverOnPage: false,
    images: [
      {
        src: "/works/comics-magazine/1.png",
        captionRu: "иллюстрация 01",
        captionEn: "illustration 01",
      },
      {
        src: "/works/comics-magazine/2.png",
        captionRu: "иллюстрация 02",
        captionEn: "illustration 02",
      },
    ],
  },
];

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
