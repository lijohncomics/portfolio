"use client";

import { Fragment } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { getWorks, getWork } from "@/lib/data";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { FigmaPrototype } from "@/components/figma-prototype";
import { useDict, useLocale, usePageTitle } from "@/lib/i18n";

const localVideoReels: Partial<Record<string, string>> = {
  "visual-navigation": "/portfolio/works/visual-navigation/showreel.mp4",
};

function WorkNav({
  direction,
  target,
  dict,
}: {
  direction: "prev" | "next";
  target: { slug: string; title: string };
  dict: ReturnType<typeof useDict>;
}) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? ArrowLeft : ArrowRight;
  return (
    <Link
      href={`/works/${target.slug}`}
      className={`group flex items-center gap-3 py-4 border-t link-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
        isPrev ? "md:flex-row" : "md:flex-row-reverse md:text-right"
      }`}
      aria-label={
        isPrev
          ? dict.works.ariaPrev(target.title)
          : dict.works.ariaNext(target.title)
      }
    >
      <Icon className="h-4 w-4 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0 group-hover:-translate-x-1 md:group-hover:translate-x-0" />
      <span>
        <span className="marginalia block">
          {isPrev ? dict.works.prevWork : dict.works.nextWork}
        </span>
        <span className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-accent transition-colors">
          {target.title}
        </span>
      </span>
    </Link>
  );
}

export function WorkContent() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;
  const { locale } = useLocale();
  const dict = useDict();
  usePageTitle(
    (() => {
      const work = getWork(locale, slug);
      return work ? `${work.title} — ${work.type}` : dict.works.workTitle;
    })()
  );

  const allWorks = getWorks(locale);
  const work = getWork(locale, slug);
  if (!work) notFound();
  const images = work.images ?? [];
  const i = allWorks.findIndex((w) => w.slug === work.slug);
  const prev = allWorks[(i - 1 + allWorks.length) % allWorks.length];
  const next = allWorks[(i + 1) % allWorks.length];

  return (
    <>
      <div className="container-site">
        <section className="pt-12 md:pt-20 xl:pt-28 pb-8 md:pb-12 xl:pb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex items-baseline justify-between gap-4 border-b pb-4 mb-6">
            <p className="marginalia">
              <Link
                href="/works"
                className="link-underline hover:text-accent transition-colors"
              >
                {dict.works.gallery}
              </Link>{" "}
              / {dict.works.workTitle.toLowerCase()} {work.index}
            </p>
            <p className="marginalia">
              {work.type} / {work.year}
            </p>
          </div>
          <h1 className="text-[clamp(2rem,8vw,7rem)] font-bold leading-[0.9] tracking-tighter uppercase break-normal hyphens-none md:-ml-[3%]">
            {work.title}
          </h1>
        </section>
      </div>

      <RevealOnScroll variant="scale" delay={100}>
        <section
          aria-label={dict.works.workTitle}
          className="pb-12 md:pb-16 xl:pb-24 px-6 lg:px-0"
        >
          {work.cover && work.coverOnPage ? (
            <div className="mb-12 md:mb-16 xl:mb-24">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={work.cover}
                alt={dict.works.previewAlt(work.title)}
                className="block w-full h-auto object-left"
              />
            </div>
          ) : null}
          {images.length > 0 ? (
            <div className="flex flex-col">
              {images.map((image, idx) => (
                <Fragment key={image.src}>
                  {image.src.toLowerCase().endsWith(".mp4") ? (
                    <video
                      src={image.src}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="block w-full h-auto"
                    />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={image.src}
                      alt={dict.works.imageAlt(
                        work.title,
                        idx + 1,
                        images.length
                      )}
                      className="block w-full h-auto"
                      loading={idx === 0 ? "eager" : "lazy"}
                    />
                  )}
                  {idx === 0 && localVideoReels[work.slug] ? (
                      <video
                        src={localVideoReels[work.slug]}
                        controls
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="block w-full h-auto"
                      />
                  ) : null}
                  {(work.figmaEmbeds ?? [])
                    .filter((embed) => embed.afterImage === idx)
                    .map((embed, embedIdx) => (
                      <FigmaPrototype
                        key={embed.src}
                        src={embed.src}
                        title={`${work.title} — Figma ${embedIdx + 1}`}
                      />
                    ))}
                </Fragment>
              ))}
              {(work.figmaEmbeds ?? [])
                .filter((embed) => embed.afterImage >= images.length)
                .map((embed, embedIdx) => (
                  <FigmaPrototype
                    key={embed.src}
                    src={embed.src}
                    title={`${work.title} — Figma ${images.length + embedIdx + 1}`}
                  />
                ))}
            </div>
          ) : (
            <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden dark-section flex items-center justify-center">
              <span className="text-[clamp(3rem,12vw,9rem)] font-bold tracking-tighter uppercase text-background/80 select-none text-center leading-[1.05] break-words">
                {work.title}
              </span>
              <span className="hidden md:block absolute bottom-6 left-6 marginalia !text-[oklch(0.62_0.01_286)]">
                {dict.works.fig(work.index, work.year)}
              </span>
            </div>
          )}
        </section>
      </RevealOnScroll>

      <div className="container-site">
        <RevealOnScroll variant="up" delay={100}>
          <section
            aria-label={dict.works.workTitle}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 pb-12 md:pb-16 xl:pb-24"
          >
            <aside className="md:col-span-3 md:order-2 md:pt-16">
              <dl className="glass-panel space-y-5 md:space-y-6 p-5 md:p-6">
                <div>
                  <dt className="marginalia mb-1">{dict.works.yearLabel}</dt>
                  <dd className="text-base font-medium">{work.year}</dd>
                </div>
                <div>
                  <dt className="marginalia mb-1">{dict.works.typeLabel}</dt>
                  <dd className="text-base font-medium">{work.type}</dd>
                </div>
                <div>
                  <dt className="marginalia mb-1">{dict.works.clientLabel}</dt>
                  <dd className="text-base font-medium">{work.client}</dd>
                </div>
              </dl>
            </aside>
            <div className="md:col-span-8 md:col-start-1 md:order-1 md:pt-6">
              <p className="text-base md:text-lg leading-relaxed max-w-prose">
                {work.description}
              </p>
            </div>
          </section>
        </RevealOnScroll>

        <RevealOnScroll variant="left" delay={100}>
          <nav
            aria-label={dict.works.prevWork + " / " + dict.works.nextWork}
            className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t mt-4 mb-16 md:mb-24 xl:mb-32"
          >
            <WorkNav direction="prev" target={prev} dict={dict} />
            <WorkNav direction="next" target={next} dict={dict} />
          </nav>
        </RevealOnScroll>
      </div>
    </>
  );
}
