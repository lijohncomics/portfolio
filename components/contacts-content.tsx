"use client";

import { ArrowUpRight } from "lucide-react";
import { getContactLinks, getDesigner } from "@/lib/data";
import { RevealOnScroll } from "@/components/reveal-on-scroll";
import { useDict, useLocale, usePageTitle } from "@/lib/i18n";

export function ContactsContent() {
  const { locale } = useLocale();
  const dict = useDict();
  usePageTitle(dict.contacts.pageTitle);
  const d = getDesigner(locale);
  const contactLinks = getContactLinks(locale);

  return (
    <div className="container-site">
      <section className="pt-12 md:pt-20 xl:pt-28 pb-16 md:pb-24 xl:pb-32 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="flex items-baseline justify-between gap-4 border-b pb-4 mb-6">
          <p className="marginalia">{dict.contacts.kicker}</p>
          <p className="marginalia">{d.location}</p>
        </div>
        <h1 className="text-[clamp(2.5rem,10vw,8.5rem)] font-bold leading-[0.92] tracking-tighter uppercase break-words">
          {dict.contacts.titlePlain}{" "}
          <span className="text-accent">{dict.contacts.titleAccent}</span>{" "}
          {dict.contacts.titleEnd}
        </h1>
        <p className="mt-8 md:mt-10 max-w-xl text-lg md:text-xl leading-relaxed">
          {dict.contacts.lead}
        </p>
      </section>

      <RevealOnScroll variant="scale" delay={100}>
        <section
          aria-label={dict.contacts.pageTitle}
          className="pb-16 md:pb-24 xl:pb-32"
        >
          {d.emails.map((email) => (
            <div key={email.address} className="border-t">
              <a
                href={`mailto:${email.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 py-8 md:py-12 link-underline min-w-0 max-w-full"
              >
                <span className="marginalia">e-mail</span>
                <span className="min-w-0 max-w-full text-[clamp(1.6rem,5.5vw,4.25rem)] font-semibold leading-[1.05] tracking-tight transition-colors group-hover:text-accent [overflow-wrap:anywhere] break-words">
                  {email.address}
                </span>
              </a>
            </div>
          ))}
        </section>
      </RevealOnScroll>

      <section
        aria-label={dict.contacts.socialSection}
        className="grid gap-8 md:grid-cols-12 md:gap-x-6 border-t pt-12 md:pt-16 xl:pt-20 pb-20 md:pb-32 xl:pb-40"
      >
        <RevealOnScroll className="md:col-span-4" variant="left">
          <p className="marginalia">{dict.contacts.socialSection}</p>
        </RevealOnScroll>
        <RevealOnScroll
          className="md:col-span-8 md:col-start-4"
          delay={100}
          variant="right"
        >
          <ul className="glass-panel border-t-0">
            {contactLinks.map((link, i) => (
              <li key={link.label} className="border-b last:border-b-0">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline gap-4 py-4 md:py-5 transition-colors hover:bg-secondary/60"
                >
                  <span className="marginalia w-8 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-2xl md:text-4xl font-semibold tracking-tight uppercase transition-colors group-hover:text-accent">
                    {link.label}
                  </span>
                  <span className="marginalia hidden sm:block">
                    {link.note}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 self-center transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </section>
    </div>
  );
}
