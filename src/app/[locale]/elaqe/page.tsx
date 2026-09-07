import { notFound } from "next/navigation";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

export default async function ElaqePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  return (
    <div className="relative overflow-hidden pb-24 pt-36 sm:pt-44">
      <div className="glow-lime pointer-events-none absolute -left-40 top-10 h-[380px] w-[380px] rounded-full blur-3xl" />

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal>
          <p className="text-sm font-medium text-lime-soft">{dict.contact.eyebrow}</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight text-ink">
            {dict.contact.title}
          </h1>
        </Reveal>

        <div className="mt-12 grid gap-8 md:grid-cols-[1fr_1.3fr]">
          <Reveal delay={0.05}>
            <div className="glass rounded-2xl px-7 py-7">
              <h2 className="font-display text-lg font-semibold text-ink">{dict.contact.addressTitle}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-dim">
                {dict.contact.address}
              </p>

              <h2 className="mt-7 font-display text-lg font-semibold text-ink">{dict.contact.phoneTitle}</h2>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-dim">
                <a className="focus-ring rounded hover:text-ink hover:underline" href="tel:0708501584">
                  {dict.contact.phone}
                </a>
              </p>

              <div className="mt-8 rounded-xl border border-gold/30 bg-gold/5 px-5 py-5">
                <p className="text-[14px] leading-relaxed text-ink-dim">
                  {dict.contact.b2bNote}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="glass rounded-2xl px-7 py-7">
              <ContactForm dict={dict} />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
