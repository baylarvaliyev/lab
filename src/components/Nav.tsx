"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Ana səhifə" },
  { href: "/xidmetler", label: "Xidmətlər" },
  { href: "/haqqimizda", label: "Haqqımızda" },
  { href: "/elaqe", label: "Əlaqə" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="fixed top-0 z-50 w-full px-4 pt-4 sm:px-6">
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all sm:px-6 ${
          scrolled ? "glass" : "border border-transparent bg-transparent"
        }`}
      >
        <Link href="/" className="flex items-center gap-3 focus-ring rounded-xl">
          <div className="rounded-full bg-ink p-1">
            <Image
              src="/images/logo.png"
              alt="Torpaq, Su və Bitki Analizləri Laboratoriyası"
              width={36}
              height={36}
              className="h-9 w-9 object-contain"
              priority
            />
          </div>
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
          <Link
            href="/elaqe"
            className="focus-ring ml-2 rounded-full bg-lime px-5 py-2 text-[14px] font-semibold text-bg transition-transform hover:scale-105"
          >
            Sifariş ver
          </Link>
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="focus-ring rounded-full p-2 md:hidden"
          aria-label={open ? "Menyunu bağla" : "Menyunu aç"}
          aria-expanded={open}
        >
          <span className="block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
          <span className="mt-1.5 block h-0.5 w-6 bg-ink" />
        </button>
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
            href="/elaqe"
            onClick={() => setOpen(false)}
            className="focus-ring mt-2 block rounded-full bg-lime px-4 py-2.5 text-center text-[14px] font-semibold text-bg"
          >
            Sifariş ver
          </Link>
        </nav>
      )}
    </header>
  );
}
