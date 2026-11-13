"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import {
  getWorks,
  workCategories,
  designer,
  type LocalizedWork,
  type WorkCategoryId,
} from "@/lib/data";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { useDict, useLocale, usePageTitle } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type RowLayout = {
  spans: [number, number];
  starts: [number | undefined, number | undefined];
  gap: string;
  alignEnd: boolean;
};

function getRowLayout(rowIndex: number): RowLayout {
  const wideFirst = rowIndex % 2 === 0;
  const gap = wideFirst ? "md:gap-x-12 xl:gap-x-20" : "md:gap-x-8 xl:gap-x-12";
  return {
    spans: wideFirst ? [5, 4] : [4, 5],
    starts: wideFirst ? [undefined, 7] : [undefined, 6],
    gap,
    alignEnd: !wideFirst,
  };
}

function GalleryCard({
  work,
  displayIndex,
  span,
  start,
  single,
  indexInRow,
  alignEnd,
  viewLabel,
  previewAlt,
}: {
  work: LocalizedWork;
  displayIndex: string;
  span: number;
  start?: number;
  single?: boolean;
  indexInRow?: number;
  alignEnd?: boolean;
  viewLabel: string;
  previewAlt: string;
}) {
  return (
    <RevealOnScroll
      className={cn(
        span === 5 ? "md:col-span-5" : "md:col-span-4",
        start === 7 && "md:col-start-7",
        start === 6 && "md:col-start-6",
        single && "md:col-start-2"
      )}
      delay={indexInRow ? 100 : 0}
      variant={indexInRow === 1 ? "right" : "left"}
    >
      <div
        className={cn(
          "h-full md:flex md:flex-col",
          alignEnd && "md:justify-end"
        )}
      >
        <Link
          href={`/works/${work.slug}`}
          className={cn(
            "group block card-hover focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
            alignEnd && "md:relative"
          )}
          aria-label={`${work.title} — ${work.type}, ${work.year}`}
        >
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
                alt={previewAlt}
                className={
                  work.coverAspect
                    ? "absolute inset-0 h-full w-full object-cover object-left transition-transform duration-500 group-hover:scale-[1.03]"
                    : "absolute inset-0 aspect-[4/3] h-full w-full object-cover object-left transition-transform duration-500 group-hover:scale-[1.03]"
                }
                loading="lazy"
              />
            ) : null}
          </div>
          <div
            className={cn(
              "mt-4",
              alignEnd && "md:absolute md:inset-x-0 md:top-full"
            )}
          >
            <div className="flex items-baseline justify-between gap-4 border-b pb-3">
              <div className="flex items-baseline gap-3">
                <span className="marginalia group-hover:text-accent transition-colors">
                  {displayIndex}
                </span>
                <h2 className="text-xl md:text-2xl font-semibold tracking-tight">
                  {work.title}
                </h2>
              </div>
              <p className="marginalia">{work.type}</p>
            </div>
            <div className="mt-2 flex items-center justify-between gap-4 md:opacity-0 md:translate-y-1 transition-all duration-300 group-hover:md:opacity-100 group-hover:md:translate-y-0">
              <p className="marginalia">
                {work.year} · {viewLabel}
              </p>
              <ArrowUpRight className="h-4 w-4 shrink-0 text-accent" />
            </div>
          </div>
        </Link>
      </div>
    </RevealOnScroll>
  );
}

export function WorksContent() {
  const { locale } = useLocale();
  const dict = useDict();
  usePageTitle(dict.works.pageTitle);
  const works = getWorks(locale);
  const [active, setActive] = useState<WorkCategoryId>("all");

  const filtered =
    active === "all" ? works : works.filter((work) => work.category === active);

  return (
    <div className="container-site">
      <section className="pt-12 md:pt-20 xl:pt-28 pb-12 md:pb-16 xl:pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-baseline justify-between gap-4 border-b pb-4 mb-6">
          <p className="marginalia">{dict.works.gallery}</p>
          <p className="marginalia">
            {locale === "en"
              ? designer.specializationEn
              : designer.specializationRu}
          </p>
        </div>
        <h1 className="text-[clamp(2.5rem,9vw,7rem)] font-bold leading-[0.9] tracking-tighter uppercase break-words">
          {dict.works.allWorks}
        </h1>
      </section>

      <section
        aria-label={dict.works.galleryLabel}
        className="pb-24 md:pb-40 xl:pb-48"
      >
        <RevealOnScroll variant="left">
          <div className="flex flex-col gap-8 mb-8 md:mb-16">
            <div
              role="group"
              aria-label={dict.works.groupLabel}
              className="flex flex-wrap items-baseline gap-x-6 gap-y-3 md:gap-x-8"
            >
              {workCategories.map((category) => {
                const isActive = active === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActive(category.id)}
                    className={cn(
                      "cursor-pointer text-sm md:text-base font-semibold tracking-tight uppercase link-underline pb-1 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
                      isActive
                        ? "text-foreground link-underline-active after:bg-accent"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {locale === "en" ? category.en : category.ru}
                  </button>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>

        {filtered.length > 0 ? (
          <div className="flex flex-col gap-24 md:gap-40 xl:gap-44">
            {Array.from(
              { length: Math.ceil(filtered.length / 2) },
              (_, rowIndex) => {
                const rowItems = filtered.slice(rowIndex * 2, rowIndex * 2 + 2);
                const layout = getRowLayout(rowIndex);
                const isSingle = rowItems.length === 1;
                return (
                  <div
                    key={`${active}-row-${rowIndex}`}
                    className={cn(
                      "grid grid-cols-1 gap-16 md:grid-cols-10",
                      isSingle ? "" : layout.gap,
                      !isSingle && layout.alignEnd
                        ? "md:pb-20 xl:pb-24"
                        : undefined
                    )}
                  >
                    {isSingle ? (
                      <GalleryCard
                        work={rowItems[0]}
                        displayIndex={String(rowIndex * 2 + 1).padStart(2, "0")}
                        span={5}
                        start={2}
                        single
                        viewLabel={dict.works.view}
                        previewAlt={dict.works.previewAlt(rowItems[0].title)}
                      />
                    ) : (
                      rowItems.map((work, i) => (
                        <GalleryCard
                          key={work.slug}
                          work={work}
                          displayIndex={String(rowIndex * 2 + i + 1).padStart(
                            2,
                            "0"
                          )}
                          span={layout.spans[i]}
                          start={layout.starts[i]}
                          indexInRow={i}
                          alignEnd={layout.alignEnd}
                          viewLabel={dict.works.view}
                          previewAlt={dict.works.previewAlt(work.title)}
                        />
                      ))
                    )}
                  </div>
                );
              }
            )}
          </div>
        ) : (
          <RevealOnScroll variant="up">
            <div className="border-t border-b py-16 flex flex-col items-center gap-3 text-center">
              <span className="marginalia">{dict.works.emptyNote}</span>
              <span className="text-xl md:text-2xl font-semibold tracking-tight">
                {dict.works.emptyTitle}
              </span>
            </div>
          </RevealOnScroll>
        )}
      </section>
    </div>
  );
}
