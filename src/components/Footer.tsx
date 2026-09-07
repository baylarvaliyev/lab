import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export default function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <footer className="relative border-t border-line-soft px-4 pb-8 pt-16 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lime/40 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-10 sm:px-2 md:grid-cols-3">
        <div>
          <h2 className="font-display text-lg font-semibold text-ink">
            Torpaq, Su və Bitki
            <br />
            Analizləri Laboratoriyası
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-dim">
            {dict.footer.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-lime-soft">
            {dict.footer.nav}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-dim">
            <li><Link className="focus-ring rounded hover:text-ink" href={`/${locale}/xidmetler`}>{dict.nav.services}</Link></li>
            <li><Link className="focus-ring rounded hover:text-ink" href={`/${locale}/haqqimizda`}>{dict.nav.about}</Link></li>
            <li><Link className="focus-ring rounded hover:text-ink" href={`/${locale}/elaqe`}>{dict.nav.contact}</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-lime-soft">
            {dict.footer.contact}
          </h3>
          <address className="mt-4 space-y-1.5 text-sm not-italic text-ink-dim">
            <p>{dict.contact.address}</p>
            <p>
              <a className="focus-ring rounded hover:text-ink" href="tel:0708501584">{dict.contact.phone}</a>
            </p>
          </address>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-line-soft pt-6 text-center text-xs text-ink-dimmer">
        © {new Date().getFullYear()} {dict.footer.rights}
      </div>
    </footer>
  );
}
