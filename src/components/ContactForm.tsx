"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [file, setFile] = useState<File | null>(null);

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
      setErrorMsg(
        "Sorğu göndərilmədi. Zəhmət olmasa bir az sonra yenidən cəhd edin və ya telefonla əlaqə saxlayın."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-sm border border-green bg-green-deep/5 px-6 py-8 text-center">
        <p className="font-display text-xl text-green-deep">Təşəkkür edirik!</p>
        <p className="mt-2 text-[15px] text-ink-soft">
          Sorğunuz qəbul edildi. Komandamız qısa zamanda sizinlə əlaqə
          saxlayacaq.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Ad, soyad *" name="full_name" required />
        <Field label="Telefon *" name="phone" type="tel" required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="E-poçt" name="email" type="email" />
        <Field label="Şirkət (B2B üçün)" name="company" />
      </div>
      <Field label="Maraqlandığınız xidmət" name="service_interest" placeholder="Məsələn: Torpaq analizi -- Paket 2" />
      <div>
        <label className="block text-[13.5px] font-medium text-ink-soft" htmlFor="message">
          Mesajınız
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="focus-ring mt-1.5 w-full rounded-sm border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink outline-none"
          placeholder="Nümunə haqqında məlumat, sahənin yeri, sifariş edilən analiz sayı və s."
        />
      </div>
      <div>
        <label className="block text-[13.5px] font-medium text-ink-soft" htmlFor="file">
          Fayl əlavə edin (sahənin şəkli, sənəd -- opsional)
        </label>
        <input
          id="file"
          name="file"
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="focus-ring mt-1.5 w-full text-[14px] text-ink-soft file:mr-4 file:rounded-sm file:border-0 file:bg-green file:px-4 file:py-2 file:text-[13.5px] file:font-medium file:text-paper hover:file:bg-green-deep"
        />
      </div>

      {status === "error" && (
        <p className="text-[14px] text-clay" role="alert">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="focus-ring rounded-sm bg-green px-6 py-3 text-[15px] font-medium text-paper transition-colors hover:bg-green-deep disabled:opacity-60"
      >
        {status === "submitting" ? "Göndərilir..." : "Sorğunu göndər"}
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-[13.5px] font-medium text-ink-soft" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="focus-ring mt-1.5 w-full rounded-sm border border-line bg-paper px-3.5 py-2.5 text-[15px] text-ink outline-none"
      />
    </div>
  );
}
