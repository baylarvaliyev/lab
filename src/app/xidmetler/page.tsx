import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Service, ServiceCategory } from "@/lib/types";

export const metadata: Metadata = { title: "Xidmətlər | Laboratoriya" };
export const revalidate = 60;

export default async function XidmetlerPage() {
  const supabase = await createClient();

  const [{ data: categories }, { data: services }] = await Promise.all([
    supabase.from("service_categories").select("*").order("sort_order").returns<ServiceCategory[]>(),
    supabase
      .from("services")
      .select("*")
      .eq("active", true)
      .order("sort_order")
      .returns<Service[]>(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <p className="text-sm font-medium text-clay">Xidmətlərimiz</p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl text-ink">
        Aqrokimyəvi analiz istiqamətləri
      </h1>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-soft">
        Aşağıdakı bütün analizlər üzrə qiymət təklifi üçün bizimlə əlaqə
        saxlayın -- fərdi nümunə sayına və paketə görə qiymət təyin olunur.
      </p>

      <div className="mt-12 space-y-14">
        {(categories ?? []).map((cat) => {
          const items = (services ?? []).filter((s) => s.category_id === cat.id);
          if (items.length === 0) return null;
          return (
            <section key={cat.id} id={cat.slug} className="scroll-mt-24">
              <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-line pb-4">
                <h2 className="font-display text-2xl text-green-deep">{cat.name_az}</h2>
                <Link
                  href="/elaqe"
                  className="focus-ring rounded text-[14px] font-medium text-clay hover:underline"
                >
                  Bu bölmə üzrə sifariş ver &rarr;
                </Link>
              </div>
              <ul className="mt-5 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {items.map((s) => (
                  <li
                    key={s.id}
                    className={`flex items-start gap-3 rounded-sm px-4 py-3 text-[14.5px] leading-snug ${
                      s.is_package
                        ? "border border-ochre/40 bg-paper-dim font-medium text-ink"
                        : "text-ink-soft"
                    }`}
                  >
                    <span
                      className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${
                        s.is_package ? "bg-ochre" : "bg-green-mid"
                      }`}
                    />
                    {s.name_az}
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
