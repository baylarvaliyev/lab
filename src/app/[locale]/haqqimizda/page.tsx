import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function HaqqimizdaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const sections = [
    { title: dict.about.missionTitle, body: dict.about.missionBody },
    { title: dict.about.visionTitle, body: dict.about.visionBody },
    { title: dict.about.goalTitle, body: dict.about.goalBody },
  ];

  return (
    <div className="relative overflow-hidden pb-24 pt-36 sm:pt-44">
      <div className="glow-emerald pointer-events-none absolute -right-40 top-10 h-[380px] w-[380px] rounded-full blur-3xl" />

      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-medium text-lime-soft">{dict.about.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink">
            {dict.about.title}
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
