"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const data = new FormData(e.currentTarget);
    const supabase = createClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: String(data.get("email") || ""),
      password: String(data.get("password") || ""),
    });

    if (signInError) {
      setError("E-poçt və ya şifrə yanlışdır.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-5">
      <div className="glow-lime pointer-events-none absolute -left-40 top-10 h-[380px] w-[380px] rounded-full blur-3xl" />
      <div className="glass relative w-full max-w-sm rounded-2xl px-8 py-10">
        <p className="text-sm font-medium text-lime-soft">Admin panel</p>
        <h1 className="mt-1 font-display text-2xl font-semibold text-ink">Daxil ol</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-[13.5px] font-medium text-ink-dim" htmlFor="email">
              E-poçt
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="focus-ring mt-1.5 w-full rounded-xl border border-line bg-bg-elev px-3.5 py-2.5 text-[15px] text-ink outline-none"
            />
          </div>
          <div>
            <label className="block text-[13.5px] font-medium text-ink-dim" htmlFor="password">
              Şifrə
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="focus-ring mt-1.5 w-full rounded-xl border border-line bg-bg-elev px-3.5 py-2.5 text-[15px] text-ink outline-none"
            />
          </div>

          {error && <p className="text-[14px] text-gold" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="focus-ring w-full rounded-full bg-lime px-6 py-3 text-[15px] font-semibold text-bg transition-transform hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Yoxlanılır..." : "Daxil ol"}
          </button>
        </form>
      </div>
    </div>
  );
}
