"use client";

import { getAbout, getDesigner } from "@/lib/data";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { useDict, useLocale, usePageTitle } from "@/lib/i18n";

export function AboutContent() {
  const { locale } = useLocale();
  const dict = useDict();
  usePageTitle(dict.about.pageTitle);
  const localized = getAbout(locale);
  const d = getDesigner(locale);

  return (
    <div className="container-site">
      <section className="pt-12 md:pt-20 xl:pt-28 pb-16 md:pb-24 xl:pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-baseline justify-between gap-4 border-b pb-4">
          <p className="marginalia">{dict.about.kicker}</p>
          <p className="marginalia">{d.location}</p>
        </div>
      </section>

      <section
        aria-label={dict.about.portrait}
        className="grid gap-12 md:grid-cols-12 md:gap-x-6 pb-16 md:pb-24 xl:pb-32"
      >
        <RevealOnScroll
          className="md:col-span-5 lg:col-span-4 md:translate-y-6"
          variant="scale"
          delay={0}
        >
          <div className="relative aspect-square w-56 sm:w-64 md:w-full max-w-80 overflow-hidden rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/portrait.png"
              alt={dict.about.portrait}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </RevealOnScroll>

        <RevealOnScroll
          className="md:col-span-7 lg:col-span-8 md:col-start-6 lg:col-start-6 md:pt-16"
          delay={120}
          variant="right"
        >
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold leading-[0.95] tracking-tighter uppercase mb-8 md:mb-12">
              {dict.about.title}
            </h1>
            <div className="space-y-6 text-base md:text-lg leading-relaxed">
              {localized.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <section
        aria-label={dict.about.skillsExperience}
        className="grid gap-12 md:grid-cols-12 md:gap-x-6 border-t pt-12 md:pt-16 xl:pt-20 pb-16 md:pb-24 xl:pb-32"
      >
        <RevealOnScroll className="md:col-span-5 lg:col-span-4" variant="left">
          <p className="marginalia mb-6">{dict.about.skillsTitle}</p>
          <ul className="border-t">
            {localized.skills.map((skill, i) => (
              <li
                key={skill}
                className="flex items-baseline gap-4 border-b py-3 md:py-4"
              >
                <span className="marginalia w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-lg md:text-xl font-semibold tracking-tight">
                  {skill}
                </span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>

        <RevealOnScroll
          className="md:col-span-6 lg:col-span-5 md:col-start-7 lg:col-start-6 md:-translate-y-[5%]"
          delay={100}
          variant="right"
        >
          <p className="marginalia mb-6">{dict.about.experienceTitle}</p>
          <ul className="border-t">
            {localized.experience.map((item) => (
              <li
                key={item.years + item.role}
                className="flex items-baseline justify-between gap-4 border-b py-3 md:py-4"
              >
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-base md:text-lg font-semibold tracking-tight">
                    {item.role}
                  </span>
                  <span className="marginalia">{item.years}</span>
                  {item.type ? (
                    <span className="marginalia whitespace-nowrap">
                      {item.type}
                    </span>
                  ) : null}
                  {item.note ? (
                    <p className="text-base leading-relaxed text-muted-foreground">
                      {item.note}
                    </p>
                  ) : null}
                </div>
                <span className="marginalia shrink-0 text-right">
                  {item.place}
                </span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </section>

      <section
        aria-label={dict.about.educationLabel}
        className="grid gap-8 md:grid-cols-12 md:gap-x-6 border-t pt-12 md:pt-16 xl:pt-20 pb-16 md:pb-24 xl:pb-32"
      >
        <RevealOnScroll className="md:col-span-4" variant="left">
          <p className="marginalia">{dict.about.educationTitle}</p>
        </RevealOnScroll>
        <RevealOnScroll
          className="md:col-span-8 md:col-start-4"
          delay={100}
          variant="up"
        >
          <ul className="border-t">
            {localized.education.map((item) => (
              <li
                key={item.years}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 border-b py-3 md:py-4"
              >
                <span className="marginalia w-28 shrink-0">{item.years}</span>
                <span className="text-base md:text-lg font-semibold tracking-tight">
                  {item.degree}
                </span>
                <span className="marginalia sm:ml-auto">{item.place}</span>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </section>
    </div>
  );
}
