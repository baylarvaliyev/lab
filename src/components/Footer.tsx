import Link from "next/link";

export default function Footer() {
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
            Bakı Mühəndislik Universiteti nəzdində fəaliyyət göstərən
            aqrokimyəvi analiz laboratoriyası.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-lime-soft">
            Naviqasiya
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-ink-dim">
            <li><Link className="focus-ring rounded hover:text-ink" href="/xidmetler">Xidmətlər</Link></li>
            <li><Link className="focus-ring rounded hover:text-ink" href="/haqqimizda">Haqqımızda</Link></li>
            <li><Link className="focus-ring rounded hover:text-ink" href="/elaqe">Əlaqə</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-lime-soft">
            Əlaqə
          </h3>
          <address className="mt-4 space-y-1.5 text-sm not-italic text-ink-dim">
            <p>AZ 0101, Xırdalan ş., Həsən Əliyev küç., 120</p>
            <p>
              <a className="focus-ring rounded hover:text-ink" href="tel:0708501584">070 850 15 84</a>
            </p>
          </address>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl border-t border-line-soft pt-6 text-center text-xs text-ink-dimmer">
        © {new Date().getFullYear()} Bakı Mühəndislik Universiteti -- Torpaq, Su və Bitki Analizləri Laboratoriyası
      </div>
    </footer>
  );
}
