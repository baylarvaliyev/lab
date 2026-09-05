import Link from "next/link";
import SoilStrata from "@/components/SoilStrata";
import { createClient } from "@/lib/supabase/server";
import type { ServiceCategory } from "@/lib/types";

export const revalidate = 60;

export default async function Home() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("service_categories")
    .select("*")
    .order("sort_order")
    .returns<ServiceCategory[]>();

  return (
    <>
      {/* HERO */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 sm:px-8 md:grid-cols-2 md:py-20">
          <div>
            <p className="text-sm font-medium text-clay">
              Bakı Mühəndislik Universiteti
            </p>
            <h1 className="mt-3 max-w-lg font-display text-[2.6rem] leading-[1.08] text-ink sm:text-[3.1rem]">
              Torpağın, suyun və bitkinin dilini rəqəmlərlə oxuyuruq
            </h1>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-ink-soft">
              Əkin sahəsində, suvarma suyunda və bitkidə aqrokimyəvi analizlər
              apararaq fermerlərə dəqiq nəticə və izahlı protokol təqdim
              edirik -- torpaqdan səmərəli istifadə və bol məhsul üçün.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/elaqe"
                className="focus-ring rounded-sm bg-green px-6 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-green-deep"
              >
                Analiz sifariş et
              </Link>
              <Link
                href="/xidmetler"
                className="focus-ring rounded-sm border border-ink/20 px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:border-ink/40"
              >
                Xidmətlərə bax
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-sm border border-line-dark">
            <SoilStrata className="h-full w-full" />
            <div className="absolute bottom-4 left-4 right-4 flex justify-between text-[11px] text-paper/85">
              <span>Torpaq nümunəsi -- profil kəsiyi</span>
              <span>0&ndash;60 sm</span>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-display text-2xl text-green-deep">Missiyamız</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              Əkin sahəsində və digər kənd təsərrüfatına yararlı torpaqda,
              suvarma suyunda və bitkidə aqrokimyəvi analizlər aparmaqla,
              fermerlərə nəticələrə dair protokolların verilməsi.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-green-deep">Vizyonumuz</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              Fermerlərin torpaqdan düzgün və səmərəli istifadə etməsinə,
              bol məhsul əldə etməsinə kömək etmək.
            </p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-green-deep">Hədəfimiz</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              Yarana bilən problemləri qısa zamanda müəyyən edib, aradan
              qaldırılması üçün operativ və düzgün həll yolları təqdim etmək.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      <section className="border-t border-line bg-paper-dim">
        <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
          <h2 className="font-display text-3xl text-ink">Analiz istiqamətlərimiz</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {(categories ?? []).map((c) => (
              <Link
                key={c.id}
                href={`/xidmetler#${c.slug}`}
                className="focus-ring group flex flex-col justify-between rounded-sm border border-line bg-paper px-6 py-6 transition-colors hover:border-green"
              >
                <div>
                  <h3 className="font-display text-xl text-ink group-hover:text-green-deep">
                    {c.name_az}
                  </h3>
                  {c.description_az && (
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">
                      {c.description_az}
                    </p>
                  )}
                </div>
                <span className="mt-4 text-[14px] font-medium text-clay">
                  Ətraflı bax &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="rounded-sm border border-line-dark bg-green-deep px-8 py-12 text-paper sm:px-14">
          <h2 className="max-w-lg font-display text-3xl">
            Nümunənizi bizə göndərin, nəticəni izahlı protokolla alın
          </h2>
          <p className="mt-3 max-w-md text-[15px] text-paper/75">
            Fərdi fermerlər və biznes müştəriləri üçün. Zəhmət olmasa əlaqə
            formasını doldurun, komandamız qısa zamanda sizinlə əlaqə saxlayacaq.
          </p>
          <Link
            href="/elaqe"
            className="focus-ring mt-7 inline-block rounded-sm bg-ochre px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-ochre-light"
          >
            Əlaqə formasına keç
          </Link>
        </div>
      </section>
    </>
  );
}
