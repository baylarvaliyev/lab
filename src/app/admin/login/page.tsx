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
    <div className="flex min-h-screen items-center justify-center bg-green-deep px-5">
      <div className="w-full max-w-sm rounded-sm border border-paper/10 bg-paper px-8 py-10">
        <p className="text-sm font-medium text-clay">Admin panel</p>
        <h1 className="mt-1 font-display text-2xl text-ink">Daxil ol</h1>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-[13.5px] font-medium text-ink-soft" htmlFor="email">
              E-poçt
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="focus-ring mt-1.5 w-full rounded-sm border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink outline-none"
            />
          </div>
          <div>
            <label className="block text-[13.5px] font-medium text-ink-soft" htmlFor="password">
              Şifrə
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="focus-ring mt-1.5 w-full rounded-sm border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink outline-none"
            />
          </div>

          {error && <p className="text-[14px] text-clay" role="alert">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="focus-ring w-full rounded-sm bg-green px-6 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-green-deep disabled:opacity-60"
          >
            {loading ? "Yoxlanılır..." : "Daxil ol"}
          </button>
        </form>
      </div>
    </div>
  );
}
