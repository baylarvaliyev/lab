"use client";

import { useState, useTransition } from "react";
import { toggleServiceActive, updateService, deleteService } from "@/lib/actions";
import type { Service } from "@/lib/types";

export default function ServiceRow({ service }: { service: Service }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(service.name_az);
  const [desc, setDesc] = useState(service.description_az ?? "");
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(() => toggleServiceActive(service.id, !service.active));
  }

  function handleSave() {
    startTransition(async () => {
      await updateService(service.id, name, desc);
      setEditing(false);
    });
  }

  function handleDelete() {
    if (!confirm(`"${service.name_az}" silinsin?`)) return;
    startTransition(() => deleteService(service.id));
  }

  if (editing) {
    return (
      <div className="px-4 py-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus-ring w-full rounded-lg border border-line bg-bg-elev px-3 py-2 text-[14.5px] text-ink outline-none"
        />
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={2}
          placeholder="Qısa izah (opsional)"
          className="focus-ring mt-2 w-full rounded-lg border border-line bg-bg-elev px-3 py-2 text-[13.5px] text-ink outline-none"
        />
        <div className="mt-2 flex gap-3">
          <button
            onClick={handleSave}
            disabled={isPending}
            className="focus-ring rounded-full bg-lime px-4 py-1.5 text-[13.5px] font-semibold text-bg"
          >
            Yadda saxla
          </button>
          <button
            onClick={() => setEditing(false)}
            className="focus-ring text-[13.5px] text-ink-dim hover:underline"
          >
            İmtina
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3">
      <div className="min-w-0">
        <p className={`truncate text-[14.5px] ${service.active ? "text-ink" : "text-ink-dimmer line-through"}`}>
          {service.name_az}
        </p>
        {service.is_package && (
          <span className="text-[11.5px] font-medium text-gold">Paket</span>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-3 text-[13px]">
        <button
          onClick={handleToggle}
          disabled={isPending}
          className={`focus-ring rounded-full px-2.5 py-1 font-medium ${
            service.active ? "bg-emerald/15 text-emerald" : "bg-ink-dimmer/15 text-ink-dim"
          }`}
        >
          {service.active ? "Aktiv" : "Deaktiv"}
        </button>
        <button onClick={() => setEditing(true)} className="focus-ring text-ink-dim hover:text-ink">
          Düzəliş
        </button>
        <button onClick={handleDelete} className="focus-ring text-gold hover:underline">
          Sil
        </button>
      </div>
    </div>
  );
}
