import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line-dark bg-green-deep text-paper">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <h2 className="font-display text-lg">
            Torpaq, Su və Bitki
            <br />
            Analizləri Laboratoriyası
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-paper/70">
            Bakı Mühəndislik Universiteti nəzdində fəaliyyət göstərən
            aqrokimyəvi analiz laboratoriyası.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-ochre-light">
            Naviqasiya
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-paper/80">
            <li><Link className="focus-ring rounded hover:text-paper" href="/xidmetler">Xidmətlər</Link></li>
            <li><Link className="focus-ring rounded hover:text-paper" href="/haqqimizda">Haqqımızda</Link></li>
            <li><Link className="focus-ring rounded hover:text-paper" href="/elaqe">Əlaqə</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold tracking-wide text-ochre-light">
            Əlaqə
          </h3>
          <address className="mt-4 space-y-1.5 text-sm not-italic text-paper/80">
            <p>AZ 0101, Xırdalan ş., Həsən Əliyev küç., 120</p>
            <p>
              <a className="focus-ring rounded hover:text-paper" href="tel:0708501584">070 850 15 84</a>
            </p>
          </address>
        </div>
      </div>

      <div className="border-t border-paper/10 px-5 py-5 text-center text-xs text-paper/50 sm:px-8">
        © {new Date().getFullYear()} Bakı Mühəndislik Universiteti -- Torpaq, Su və Bitki Analizləri Laboratoriyası
      </div>
    </footer>
  );
}
