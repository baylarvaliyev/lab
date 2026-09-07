import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { createClient } from "@/lib/supabase/server";
import type { ServiceCategory } from "@/lib/types";
import { isLocale, localized, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("service_categories")
    .select("*")
    .order("sort_order")
    .returns<ServiceCategory[]>();

  const missionCards = [
    { title: dict.mission.missionTitle, body: dict.mission.missionBody },
    { title: dict.mission.visionTitle, body: dict.mission.visionBody },
    { title: dict.mission.goalTitle, body: dict.mission.goalBody },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden pb-20 pt-36 sm:pt-44">
        <div className="glow-lime pointer-events-none absolute -left-40 top-10 h-[420px] w-[420px] rounded-full blur-3xl" />
        <div className="glow-emerald pointer-events-none absolute -right-32 top-52 h-[380px] w-[380px] rounded-full blur-3xl" />

        <div className="mx-auto grid max-w-6xl items-center gap-6 px-5 sm:px-8 md:grid-cols-2 md:gap-10">
          <Reveal>
            <p className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-[13px] text-ink-dim">
              <span className="h-1.5 w-1.5 rounded-full bg-lime" />
              {dict.home.eyebrow}
            </p>
            <h1 className="mt-5 max-w-lg font-display text-[2.7rem] font-semibold leading-[1.05] tracking-tight text-ink sm:text-[3.4rem]">
              {dict.home.titleA} <span className="text-gradient">{dict.home.titleHighlight}</span> {dict.home.titleB}
            </h1>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-ink-dim">
              {dict.home.lead}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href={`/${locale}/elaqe`}
                className="focus-ring rounded-full bg-lime px-7 py-3.5 text-[15px] font-semibold text-bg transition-transform hover:scale-105"
              >
                {dict.home.ctaOrder}
              </Link>
              <Link
                href={`/${locale}/xidmetler`}
                className="focus-ring glass rounded-full px-7 py-3.5 text-[15px] font-medium text-ink transition-colors hover:bg-glass-strong"
              >
                {dict.home.ctaServices}
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-line sm:aspect-square">
              <Image
                src="/images/campus.jpg"
                alt="Bakı Mühəndislik Universiteti kampusu"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/40 via-transparent to-transparent" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* MISSION -- glass bento */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-5 md:grid-cols-3">
          {missionCards.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="glass h-full rounded-2xl px-6 py-7 transition-colors hover:bg-glass-strong">
                <h2 className="font-display text-lg font-semibold text-lime-soft">
                  {item.title}
                </h2>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink-dim">
                  {item.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICE CATEGORIES */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">
            {dict.home.directionsTitle}
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {(categories ?? []).map((c, i) => (
            <Reveal key={c.id} delay={i * 0.06}>
              <Link
                href={`/${locale}/xidmetler#${c.slug}`}
                className="focus-ring group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-line bg-bg-elev px-6 py-6 transition-all hover:border-lime/40 hover:bg-bg-elev-2"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-lime/0 blur-2xl transition-colors group-hover:bg-lime/15" />
                <div>
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {localized(c, "name", locale)}
                  </h3>
                  {localized(c, "description", locale) && (
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-dim">
                      {localized(c, "description", locale)}
                    </p>
                  )}
                </div>
                <span className="mt-5 text-[14px] font-medium text-lime-soft">
                  {dict.home.more} &rarr;
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <Reveal>
          <div className="glow-emerald relative overflow-hidden rounded-3xl border border-line bg-bg-elev px-8 py-14 sm:px-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full blur-3xl" />
            <h2 className="max-w-lg font-display text-3xl font-semibold tracking-tight text-ink">
              {dict.home.ctaBoxTitle}
            </h2>
            <p className="mt-3 max-w-md text-[15px] text-ink-dim">
              {dict.home.ctaBoxBody}
            </p>
            <Link
              href={`/${locale}/elaqe`}
              className="focus-ring mt-8 inline-block rounded-full bg-lime px-7 py-3.5 text-[15px] font-semibold text-bg transition-transform hover:scale-105"
            >
              {dict.home.ctaBoxButton}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
