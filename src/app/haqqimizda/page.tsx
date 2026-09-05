import type { Metadata } from "next";

export const metadata: Metadata = { title: "Haqqımızda | Laboratoriya" };

export default function HaqqimizdaPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <p className="text-sm font-medium text-clay">Haqqımızda</p>
      <h1 className="mt-2 font-display text-4xl text-ink">
        Bakı Mühəndislik Universitetinin Torpaq, Su və Bitki Analizləri
        Laboratoriyası
      </h1>

      <div className="mt-10 space-y-10">
        <div>
          <h2 className="font-display text-xl text-green-deep">Missiya</h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
            Əkin sahəsində və digər kənd təsərrüfatına yararlı torpaqda,
            suvarma suyunda və bitkidə aqrokimyəvi analizlər aparmaqla,
            fermerlərə analiz nəticələrinə dair protokolların verilməsi.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-green-deep">Vizyon</h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
            Əkinə yararlı torpaqlarda, bitkilərdə və suvarma suyunda
            aqrokimyəvi analizlər aparmaqla fermerlərin torpaqdan düzgün və
            səmərəli istifadə etməsinə və bol məhsul əldə etməsinə kömək
            etməkdir.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl text-green-deep">Hədəf</h2>
          <p className="mt-3 text-[15.5px] leading-relaxed text-ink-soft">
            Aparılmış analiz nəticələrinin düzgün emalı və yüksək keyfiyyətli
            təhlili -- əkinçilik və ya bitkiçilik fəaliyyəti ilə məşğul olan
            fermerlərə torpaq tərkibində, suvarma sularında və becərilən
            bitkilərdə analizlər aparmaqla, yarana bilən problemləri qısa
            zamanda müəyyən edib, aradan qaldırılması üçün operativ və düzgün
            həll yolları haqqında məlumat əldə etməyə kömək etməkdir.
          </p>
        </div>
      </div>
    </div>
  );
}
