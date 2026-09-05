import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Submission } from "@/lib/types";

const statusLabel: Record<string, string> = {
  yeni: "Yeni",
  baxilir: "Baxılır",
  cavablandirilib: "Cavablandırılıb",
  baglanib: "Bağlanıb",
};

const statusColor: Record<string, string> = {
  yeni: "bg-clay text-paper",
  baxilir: "bg-ochre text-ink",
  cavablandirilib: "bg-green text-paper",
  baglanib: "bg-ink-soft text-paper",
};

export default async function MuraciyetlerPage() {
  const supabase = await createClient();
  const { data: submissions } = await supabase
    .from("submissions")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Submission[]>();

  return (
    <div>
      <h1 className="font-display text-3xl text-ink">Müraciətlər</h1>

      <div className="mt-8 overflow-x-auto rounded-sm border border-line bg-paper">
        <table className="w-full text-left text-[14px]">
          <thead className="border-b border-line bg-paper-dim text-[12.5px] uppercase tracking-wide text-ink-soft">
            <tr>
              <th className="px-4 py-3 font-medium">Tarix</th>
              <th className="px-4 py-3 font-medium">Ad, soyad</th>
              <th className="px-4 py-3 font-medium">Telefon</th>
              <th className="px-4 py-3 font-medium">Xidmət</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {(submissions ?? []).map((s) => (
              <tr key={s.id} className="border-b border-line last:border-0 hover:bg-paper-dim">
                <td className="px-4 py-3 text-ink-soft">
                  {new Date(s.created_at).toLocaleDateString("az-AZ")}
                </td>
                <td className="px-4 py-3">
                  <Link
                    href={`/admin/muraciyetler/${s.id}`}
                    className="focus-ring rounded font-medium text-ink hover:underline"
                  >
                    {s.full_name}
                  </Link>
                  {s.company && <span className="ml-1 text-ink-soft">({s.company})</span>}
                </td>
                <td className="px-4 py-3 text-ink-soft">{s.phone}</td>
                <td className="px-4 py-3 text-ink-soft">{s.service_interest || "--"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-sm px-2 py-1 text-[12px] font-medium ${statusColor[s.status]}`}>
                    {statusLabel[s.status]}
                  </span>
                </td>
              </tr>
            ))}
            {(submissions ?? []).length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-ink-soft">
                  Hələ heç bir müraciət yoxdur.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
