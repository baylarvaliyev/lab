import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Haqqımızda | Laboratoriya" };

export default function HaqqimizdaPage() {
  const sections = [
    {
      title: "Missiya",
      body: "Əkin sahəsində və digər kənd təsərrüfatına yararlı torpaqda, suvarma suyunda və bitkidə aqrokimyəvi analizlər aparmaqla, fermerlərə analiz nəticələrinə dair protokolların verilməsi.",
    },
    {
      title: "Vizyon",
      body: "Əkinə yararlı torpaqlarda, bitkilərdə və suvarma suyunda aqrokimyəvi analizlər aparmaqla fermerlərin torpaqdan düzgün və səmərəli istifadə etməsinə və bol məhsul əldə etməsinə kömək etməkdir.",
    },
    {
      title: "Hədəf",
      body: "Aparılmış analiz nəticələrinin düzgün emalı və yüksək keyfiyyətli təhlili -- əkinçilik və ya bitkiçilik fəaliyyəti ilə məşğul olan fermerlərə torpaq tərkibində, suvarma sularında və becərilən bitkilərdə analizlər aparmaqla, yarana bilən problemləri qısa zamanda müəyyən edib, aradan qaldırılması üçün operativ və düzgün həll yolları haqqında məlumat əldə etməyə kömək etməkdir.",
    },
  ];

  return (
    <div className="relative overflow-hidden pb-24 pt-36 sm:pt-44">
      <div className="glow-emerald pointer-events-none absolute -right-40 top-10 h-[380px] w-[380px] rounded-full blur-3xl" />

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-medium text-lime-soft">Haqqımızda</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink">
            Bakı Mühəndislik Universitetinin Torpaq, Su və Bitki Analizləri
            Laboratoriyası
          </h1>
        </Reveal>

        <div className="mt-12 space-y-6">
          {sections.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="glass rounded-2xl px-7 py-7">
                <h2 className="font-display text-xl font-semibold text-lime-soft">{s.title}</h2>
                <p className="mt-3 text-[15.5px] leading-relaxed text-ink-dim">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
