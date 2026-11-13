"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  getDesigner,
  getLatestWork,
  getNavIndex,
  type LocalizedWork,
} from "@/lib/data";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { LocalTime } from "@/components/local-time";
import { useDict, useLocale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

function WorkCard({
  work,
  alignEnd,
  previewLabel,
  topLabel,
}: {
  work: LocalizedWork;
  alignEnd?: boolean;
  previewLabel: string;
  topLabel?: string;
}) {
  return (
    <div
      className={cn("h-full md:flex md:flex-col", alignEnd && "md:justify-end")}
    >
      <Link
        href={`/works/${work.slug}`}
        className={cn("group block card-hover", alignEnd && "md:relative")}
      >
        {topLabel ? (
          <p className="marginalia mb-3 group-hover:text-accent transition-colors">
            {topLabel}
          </p>
        ) : null}
        <div
          className="relative overflow-hidden dark-section"
          style={
            work.coverAspect ? { aspectRatio: work.coverAspect } : undefined
          }
        >
          {work.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={work.cover}
              alt={previewLabel}
              className={
                work.coverAspect
                  ? "absolute inset-0 h-full w-full object-cover object-left transition-transform duration-500 group-hover:scale-[1.03]"
                  : "absolute inset-0 aspect-[4/3] h-full w-full object-cover object-left transition-transform duration-500 group-hover:scale-[1.03]"
              }
            />
          ) : null}
        </div>
        <div
          className={cn(
            "mt-4 flex items-baseline justify-between gap-4",
            alignEnd && "md:absolute md:inset-x-0 md:top-full"
          )}
        >
          <div className="flex items-baseline gap-3">
            <span className="marginalia group-hover:text-accent transition-colors">
              {work.index}
            </span>
            <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
              {work.title}
            </h3>
          </div>
          <p className="marginalia">
            {work.type} · {work.year}
          </p>
        </div>
      </Link>
    </div>
  );
}

function NavItem({ item }: { item: ReturnType<typeof getNavIndex>[number] }) {
  return (
    <Link
      href={item.href}
      className="group flex items-start justify-between gap-3 md:gap-4 border-b border-border/70 py-5 md:py-6 transition-colors hover:bg-background/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
    >
      <span className="flex min-w-0 items-baseline gap-3">
        <span className="marginalia shrink-0 group-hover:text-accent transition-colors">
          {item.index}
        </span>
        <span className="min-w-0">
          <span className="block text-2xl lg:text-3xl xl:text-4xl font-semibold tracking-tight uppercase leading-[1.08] break-words link-underline">
            {item.label}
          </span>
          <span className="marginalia mt-1 block">{item.note}</span>
        </span>
      </span>
      <ArrowUpRight className="mt-2 h-5 w-5 shrink-0 text-accent opacity-0 -translate-x-1 translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
    </Link>
  );
}

export function HomeContent() {
  const { locale } = useLocale();
  const dict = useDict();
  const latestWork = getLatestWork(locale);
  const nav = getNavIndex(locale);
  const d = getDesigner(locale);

  return (
    <div className="container-site">
      <section className="flex flex-col justify-end min-h-[calc(100svh-18rem)] py-16 md:py-24 xl:py-32">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-baseline justify-between gap-4 border-b pb-4 mb-8">
            <p className="marginalia">{d.specialization}</p>
            <p className="marginalia">
              <LocalTime />
            </p>
          </div>
          <h1 className="text-[clamp(2.75rem,12vw,9rem)] font-bold leading-[0.9] tracking-tighter uppercase break-words md:break-normal md:whitespace-nowrap">
            {d.nameFirst}
            <span className="block text-accent md:pl-[7%]">{d.nameRest}</span>
          </h1>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-12 md:gap-4 md:items-baseline md:mt-3 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <p className="marginalia md:col-span-3">{d.location}</p>
          <p className="text-lg md:text-xl max-w-xl leading-relaxed md:col-span-9 md:col-start-4 md:pl-[4%]">
            {d.tagline}
          </p>
        </div>
      </section>

      <section
        aria-label={dict.home.featuredAndNav}
        className="py-16 md:py-24 xl:py-32"
      >
        <div className="flex flex-col gap-24 md:gap-44 xl:gap-48">
          <div className="grid grid-cols-1 md:grid-cols-10">
            <RevealOnScroll
              className="md:col-span-5 md:ml-[8%]"
              delay={0}
              variant="scale"
            >
              {latestWork ? (
                <WorkCard
                  work={latestWork}
                  topLabel={dict.home.recentProject}
                  previewLabel={dict.works.previewAlt(latestWork.title)}
                />
              ) : null}
            </RevealOnScroll>

            <RevealOnScroll
              className="hidden lg:block md:col-span-4 md:col-start-7"
              delay={100}
              variant="right"
            >
              <div className="glass-panel p-4 md:p-8">
                <p className="marginalia border-b border-border/60 pb-4 mb-4">
                  {dict.home.navigation}
                </p>
                {nav.map((item) => (
                  <NavItem key={item.href} item={item} />
                ))}
              </div>
            </RevealOnScroll>
          </div>
        </div>

        <RevealOnScroll delay={100}>
          <div className="mt-24 md:mt-44 xl:mt-48 flex justify-end border-t pt-6 pb-16 md:pb-24 xl:pb-32">
            <Link
              href="/works"
              className="group inline-flex items-center gap-2 text-2xl md:text-4xl font-semibold tracking-tight uppercase link-underline"
            >
              {dict.home.allWorks}
              <ArrowUpRight className="h-6 w-6 md:h-8 md:w-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
            </Link>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
