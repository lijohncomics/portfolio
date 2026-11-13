"use client";

import { designer, footerMeta } from "@/lib/data";
import { useDict, useLocale } from "@/lib/i18n";

export function SiteFooter() {
  const { locale } = useLocale();
  const dict = useDict();
  const email = locale === "en" ? designer.gmailEmail : designer.yandexEmail;
  return (
    <footer className="border-t">
      <div className="container-site py-8 xl:py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="marginalia">
          © {footerMeta.year} {designer.nameEn} — {dict.footer.edition}
        </p>
        <a
          href={`mailto:${email}`}
          className="marginalia text-accent link-underline"
        >
          {email}
        </a>
      </div>
    </footer>
  );
}
