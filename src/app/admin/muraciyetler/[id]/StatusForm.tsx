"use client";

import { useState, useTransition } from "react";
import { updateSubmissionStatus } from "@/lib/actions";

const options = [
  { value: "yeni", label: "Yeni" },
  { value: "baxilir", label: "Baxılır" },
  { value: "cavablandirilib", label: "Cavablandırılıb" },
  { value: "baglanib", label: "Bağlanıb" },
];

export default function StatusForm({
  id,
  status,
  note,
}: {
  id: string;
  status: string;
  note: string;
}) {
  const [statusValue, setStatusValue] = useState(status);
  const [noteValue, setNoteValue] = useState(note);
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(false);

  function handleSave() {
    startTransition(async () => {
      await updateSubmissionStatus(id, statusValue, noteValue);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    });
  }

  return (
    <div className="rounded-sm border border-line bg-paper px-6 py-6">
      <h2 className="font-display text-lg text-green-deep">Status və qeyd</h2>
      <div className="mt-4">
        <label className="block text-[13.5px] font-medium text-ink-soft" htmlFor="status">
          Status
        </label>
        <select
          id="status"
          value={statusValue}
          onChange={(e) => setStatusValue(e.target.value)}
          className="focus-ring mt-1.5 w-full rounded-sm border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink outline-none"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        <label className="block text-[13.5px] font-medium text-ink-soft" htmlFor="note">
          Daxili qeyd
        </label>
        <textarea
          id="note"
          rows={3}
          value={noteValue}
          onChange={(e) => setNoteValue(e.target.value)}
          className="focus-ring mt-1.5 w-full rounded-sm border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink outline-none"
        />
      </div>
      <button
        onClick={handleSave}
        disabled={isPending}
        className="focus-ring mt-4 rounded-sm bg-green px-5 py-2.5 text-[14.5px] font-medium text-paper hover:bg-green-deep disabled:opacity-60"
      >
        {isPending ? "Yadda saxlanılır..." : saved ? "Yadda saxlanıldı ✓" : "Yadda saxla"}
      </button>
    </div>
  );
}
