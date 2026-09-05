"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Ana səhifə" },
  { href: "/xidmetler", label: "Xidmətlər" },
  { href: "/haqqimizda", label: "Haqqımızda" },
  { href: "/elaqe", label: "Əlaqə" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:px-8">
        <Link href="/" className="flex items-center gap-3 focus-ring rounded">
          <Image
            src="/images/logo.png"
            alt="Torpaq, Su və Bitki Analizləri Laboratoriyası"
            width={44}
            height={44}
            className="h-11 w-11 object-contain"
            priority
          />
          <span className="hidden font-display text-[17px] leading-tight text-green-deep sm:block">
            Torpaq, Su və Bitki
            <br />
            Analizləri Laboratoriyası
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`focus-ring rounded text-[15px] transition-colors ${
                pathname === l.href
                  ? "text-clay font-medium"
                  : "text-ink-soft hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/elaqe"
            className="focus-ring rounded-sm bg-green px-4 py-2 text-[14px] font-medium text-paper transition-colors hover:bg-green-deep"
          >
            Sifariş ver
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="focus-ring rounded p-2 md:hidden"
          aria-label={open ? "Menyunu bağla" : "Menyunu aç"}
          aria-expanded={open}
        >
          <span className="block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-paper px-5 pb-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="focus-ring block rounded py-2.5 text-[15px] text-ink-soft"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
