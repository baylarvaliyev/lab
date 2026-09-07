"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionaries";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Nav({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/xidmetler`, label: dict.nav.services },
    { href: `/${locale}/haqqimizda`, label: dict.nav.about },
    { href: `/${locale}/elaqe`, label: dict.nav.contact },
  ];

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-4 sm:px-6">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all sm:px-6 ${
          scrolled ? "glass" : "border border-transparent bg-transparent"
        }`}
      >
        <Link href={`/${locale}`} className="flex min-w-0 items-center gap-2.5 focus-ring rounded-xl sm:gap-3">
          <Image
            src="/images/logo-v2.png"
            alt="Torpaq, Su və Bitki Analizləri Laboratoriyası"
            width={40}
            height={40}
            className="h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
            priority
          />
          <span className="min-w-0 font-display text-[12px] font-semibold leading-[1.2] tracking-tight text-ink sm:hidden">
            Torpaq, Su və Bitki
            <br />
            Analizləri Laboratoriyası
          </span>
          <span className="hidden font-display text-[14px] font-semibold leading-tight tracking-tight text-ink sm:block">
            Torpaq · Su · Bitki
            <br />
            <span className="text-ink-dim">Analizləri Laboratoriyası</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`focus-ring rounded-full px-4 py-2 text-[14px] transition-colors ${
                pathname === l.href
                  ? "bg-glass-strong text-ink"
                  : "text-ink-dim hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <div className="ml-1">
            <LanguageSwitcher locale={locale} />
          </div>
          <Link
            href={`/${locale}/elaqe`}
            className="focus-ring ml-2 rounded-full bg-lime px-5 py-2 text-[14px] font-semibold text-bg transition-transform hover:scale-105"
          >
            {dict.nav.order}
          </Link>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher locale={locale} />
          <button
            onClick={() => setOpen(!open)}
            className="focus-ring rounded-full p-2"
            aria-label={open ? "Menyunu bağla" : "Menyunu aç"}
            aria-expanded={open}
          >
            <span className="block h-0.5 w-6 bg-ink" />
            <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
            <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="glass mx-auto mt-2 max-w-6xl rounded-2xl px-5 py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="focus-ring block rounded-lg py-2.5 text-[15px] text-ink-dim"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={`/${locale}/elaqe`}
            onClick={() => setOpen(false)}
            className="focus-ring mt-2 block rounded-full bg-lime px-4 py-2.5 text-center text-[14px] font-semibold text-bg"
          >
            {dict.nav.order}
          </Link>
        </nav>
      )}
    </header>
  );
}
