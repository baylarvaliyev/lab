import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logoutAction } from "@/lib/actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // The login page renders its own full-screen layout; skip the shell there.
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-paper-dim">
      <div className="flex">
        <aside className="hidden w-60 shrink-0 border-r border-line bg-paper px-5 py-8 sm:block">
          <p className="font-display text-lg text-green-deep">Admin panel</p>
          <nav className="mt-8 space-y-1">
            <Link
              href="/admin"
              className="focus-ring block rounded-sm px-3 py-2 text-[14.5px] text-ink-soft hover:bg-paper-dim hover:text-ink"
            >
              İcmal
            </Link>
            <Link
              href="/admin/muraciyetler"
              className="focus-ring block rounded-sm px-3 py-2 text-[14.5px] text-ink-soft hover:bg-paper-dim hover:text-ink"
            >
              Müraciətlər
            </Link>
            <Link
              href="/admin/xidmetler"
              className="focus-ring block rounded-sm px-3 py-2 text-[14.5px] text-ink-soft hover:bg-paper-dim hover:text-ink"
            >
              Xidmətlər
            </Link>
          </nav>
          <div className="mt-10 border-t border-line pt-5">
            <p className="truncate text-[12.5px] text-ink-soft">{user.email}</p>
            <form action={logoutAction}>
              <button className="focus-ring mt-2 text-[13.5px] font-medium text-clay hover:underline">
                Çıxış et
              </button>
            </form>
          </div>
        </aside>

        <div className="min-w-0 flex-1 px-5 py-8 sm:px-10">{children}</div>
      </div>
    </div>
  );
}
