"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Dictionary } from "@/lib/i18n/dictionaries";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ dict }: { dict: Dictionary }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const f = dict.contact.form;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const supabase = createClient();

    try {
      const { data: submission, error: insertError } = await supabase
        .from("submissions")
        .insert({
          full_name: String(data.get("full_name") || ""),
          phone: String(data.get("phone") || ""),
          email: String(data.get("email") || "") || null,
          company: String(data.get("company") || "") || null,
          service_interest: String(data.get("service_interest") || "") || null,
          message: String(data.get("message") || "") || null,
        })
        .select("id")
        .single();

      if (insertError) throw insertError;

      if (file) {
        const path = `${submission.id}/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage
          .from("submission-uploads")
          .upload(path, file);
        if (uploadError) throw uploadError;

        const { error: fileRowError } = await supabase
          .from("submission_files")
          .insert({
            submission_id: submission.id,
            file_path: path,
            file_name: file.name,
          });
        if (fileRowError) throw fileRowError;
      }

      setStatus("success");
      form.reset();
      setFile(null);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMsg(f.error);
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-emerald/30 bg-emerald/10 px-6 py-8 text-center">
        <p className="font-display text-xl font-semibold text-emerald">{f.successTitle}</p>
        <p className="mt-2 text-[15px] text-ink-dim">{f.successBody}</p>
      </div>
    );
  }

  const inputClass =
    "focus-ring mt-1.5 w-full rounded-xl border border-line bg-bg-elev px-3.5 py-2.5 text-[15px] text-ink outline-none placeholder:text-ink-dimmer";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.fullName} name="full_name" required inputClass={inputClass} />
        <Field label={f.phone} name="phone" type="tel" required inputClass={inputClass} />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.email} name="email" type="email" inputClass={inputClass} />
        <Field label={f.company} name="company" inputClass={inputClass} />
      </div>
      <Field
        label={f.serviceInterest}
        name="service_interest"
        placeholder={f.serviceInterestPlaceholder}
        inputClass={inputClass}
      />
      <div>
        <label className="block text-[13.5px] font-medium text-ink-dim" htmlFor="message">
          {f.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={inputClass}
          placeholder={f.messagePlaceholder}
        />
      </div>
      <div>
        <label className="block text-[13.5px] font-medium text-ink-dim" htmlFor="file">
          {f.file}
        </label>
        <input
          id="file"
          name="file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="focus-ring mt-1.5 w-full text-[14px] text-ink-dim file:mr-4 file:rounded-full file:border-0 file:bg-lime file:px-4 file:py-2 file:text-[13.5px] file:font-semibold file:text-bg"
        />
      </div>

      {status === "error" && (
        <p className="text-[14px] text-gold" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring rounded-full bg-lime px-7 py-3.5 text-[15px] font-semibold text-bg transition-transform hover:scale-105 disabled:opacity-60"
      >
        {status === "submitting" ? f.submitting : f.submit}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  inputClass,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  inputClass: string;
}) {
  return (
    <div>
      <label className="block text-[13.5px] font-medium text-ink-dim" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}
