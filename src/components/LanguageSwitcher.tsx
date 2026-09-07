"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { locales, localeNames, type Locale } from "@/lib/i18n/config";

// Swaps only the leading /xx locale segment, keeping the rest of the
// path (and any #hash) intact so switching language stays on the same page.
function pathWithLocale(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  segments[1] = locale;
  return segments.join("/") || "/";
}

export default function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="focus-ring flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[13px] font-medium text-ink-dim transition-colors hover:text-ink"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {localeNames[locale]}
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {open && (
        <div className="glass absolute right-0 top-full mt-2 w-28 overflow-hidden rounded-xl py-1">
          {locales.map((l) => (
            <Link
              key={l}
              href={pathWithLocale(pathname, l)}
              onClick={() => setOpen(false)}
              className={`focus-ring block px-4 py-2 text-[13.5px] transition-colors ${
                l === locale ? "text-lime-soft" : "text-ink-dim hover:text-ink"
              }`}
            >
              {localeNames[l]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
