"use client";

import { useRef, useState, useTransition } from "react";
import { createService } from "@/lib/actions";

export default function NewServiceForm({ categoryId }: { categoryId: string }) {
  const [name, setName] = useState("");
  const [isPackage, setIsPackage] = useState(false);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    startTransition(async () => {
      await createService(categoryId, name.trim(), isPackage);
      setName("");
      setIsPackage(false);
    });
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-wrap items-center gap-3">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Yeni xidmət adı"
        className="focus-ring min-w-[220px] flex-1 rounded-sm border border-line bg-paper px-3 py-2 text-[14px] text-ink outline-none"
      />
      <label className="flex items-center gap-1.5 text-[13px] text-ink-soft">
        <input
          type="checkbox"
          checked={isPackage}
          onChange={(e) => setIsPackage(e.target.checked)}
        />
        Paket
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="focus-ring rounded-sm border border-green px-4 py-2 text-[13.5px] font-medium text-green-deep hover:bg-green hover:text-paper"
      >
        Əlavə et
      </button>
    </form>
  );
}
