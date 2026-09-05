import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = { title: "Əlaqə | Laboratoriya" };

export default function ElaqePage() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <p className="text-sm font-medium text-clay">Əlaqə</p>
      <h1 className="mt-2 font-display text-4xl text-ink">
        Analiz sifarişi və sorğular
      </h1>

      <div className="mt-10 grid gap-12 md:grid-cols-[1fr_1.3fr]">
        <div>
          <h2 className="font-display text-xl text-green-deep">Ünvan</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            AZ 0101, Xırdalan ş., Həsən Əliyev küç., 120
          </p>

          <h2 className="mt-8 font-display text-xl text-green-deep">Telefon</h2>
          <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">
            <a className="focus-ring rounded hover:underline" href="tel:0708501584">
              070 850 15 84
            </a>
          </p>

          <div className="mt-10 rounded-sm border border-line bg-paper-dim px-5 py-5">
            <p className="text-[14px] leading-relaxed text-ink-soft">
              <strong className="text-ink">B2B müştərilər:</strong> şirkət
              adını və maraqlandığınız paketi qeyd edin -- həcmə uyğun
              təklif hazırlayaq.
            </p>
          </div>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
