import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [{ count: newCount }, { count: totalCount }, { count: serviceCount }] =
    await Promise.all([
      supabase
        .from("submissions")
        .select("*", { count: "exact", head: true })
        .eq("status", "yeni"),
      supabase.from("submissions").select("*", { count: "exact", head: true }),
      supabase
        .from("services")
        .select("*", { count: "exact", head: true })
        .eq("active", true),
    ]);

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">İcmal</h1>
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        <StatCard label="Yeni müraciətlər" value={newCount ?? 0} accent="clay" />
        <StatCard label="Ümumi müraciətlər" value={totalCount ?? 0} accent="green" />
        <StatCard label="Aktiv xidmətlər" value={serviceCount ?? 0} accent="ochre" />
      </div>

      <div className="mt-10">
        <Link
          href="/admin/muraciyetler"
          className="focus-ring inline-block rounded-sm bg-green px-5 py-2.5 text-[14.5px] font-medium text-paper hover:bg-green-deep"
        >
          Bütün müraciətlərə bax
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: "clay" | "green" | "ochre";
}) {
  const accentClass = {
    clay: "text-clay",
    green: "text-green-deep",
    ochre: "text-ochre",
  }[accent];

  return (
    <div className="rounded-sm border border-line bg-paper px-6 py-6">
      <p className="text-[13.5px] text-ink-soft">{label}</p>
      <p className={`mt-2 font-display text-4xl ${accentClass}`}>{value}</p>
    </div>
  );
}
