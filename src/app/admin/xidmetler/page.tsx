import { createClient } from "@/lib/supabase/server";
import type { Service, ServiceCategory } from "@/lib/types";
import ServiceRow from "./ServiceRow";
import NewServiceForm from "./NewServiceForm";

export default async function AdminXidmetlerPage() {
  const supabase = await createClient();

  const [{ data: categories }, { data: services }] = await Promise.all([
    supabase.from("service_categories").select("*").order("sort_order").returns<ServiceCategory[]>(),
    supabase.from("services").select("*").order("sort_order").returns<Service[]>(),
  ]);

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Xidmətlər</h1>
      <p className="mt-2 max-w-xl text-[14.5px] text-ink-soft">
        Xidmətləri aktiv/deaktiv edin, adını dəyişin və ya yeni xidmət əlavə
        edin. Deaktiv xidmətlər sayta çıxmır.
      </p>

      <div className="mt-8 space-y-10">
        {(categories ?? []).map((cat) => {
          const items = (services ?? []).filter((s) => s.category_id === cat.id);
          return (
            <section key={cat.id}>
              <h2 className="font-display text-xl text-green-deep">{cat.name_az}</h2>
              <div className="mt-3 divide-y divide-line rounded-sm border border-line bg-paper">
                {items.map((s) => (
                  <ServiceRow key={s.id} service={s} />
                ))}
                {items.length === 0 && (
                  <p className="px-4 py-4 text-[14px] text-ink-soft">
                    Bu kateqoriyada xidmət yoxdur.
                  </p>
                )}
              </div>
              <div className="mt-3">
                <NewServiceForm categoryId={cat.id} />
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
