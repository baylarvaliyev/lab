import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Submission, SubmissionFile } from "@/lib/types";
import StatusForm from "./StatusForm";

export default async function SubmissionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: submission } = await supabase
    .from("submissions")
    .select("*")
    .eq("id", id)
    .single<Submission>();

  if (!submission) notFound();

  const { data: files } = await supabase
    .from("submission_files")
    .select("*")
    .eq("submission_id", id)
    .returns<SubmissionFile[]>();

  const filesWithUrls = await Promise.all(
    (files ?? []).map(async (f) => {
      const { data } = await supabase.storage
        .from("submission-uploads")
        .createSignedUrl(f.file_path, 60 * 30);
      return { ...f, url: data?.signedUrl };
    })
  );

  return (
    <div className="max-w-2xl">
      <h1 className="font-display text-3xl text-ink">{submission.full_name}</h1>
      <p className="mt-1 text-[14px] text-ink-soft">
        {new Date(submission.created_at).toLocaleString("az-AZ")}
      </p>

      <dl className="mt-8 grid grid-cols-[140px_1fr] gap-y-3 rounded-sm border border-line bg-paper px-6 py-6 text-[14.5px]">
        <dt className="text-ink-soft">Telefon</dt>
        <dd>
          <a className="focus-ring rounded hover:underline" href={`tel:${submission.phone}`}>
            {submission.phone}
          </a>
        </dd>

        <dt className="text-ink-soft">E-poçt</dt>
        <dd>{submission.email || "--"}</dd>

        <dt className="text-ink-soft">Şirkət</dt>
        <dd>{submission.company || "--"}</dd>

        <dt className="text-ink-soft">Xidmət</dt>
        <dd>{submission.service_interest || "--"}</dd>

        <dt className="text-ink-soft">Mesaj</dt>
        <dd className="whitespace-pre-wrap">{submission.message || "--"}</dd>

        <dt className="text-ink-soft">Fayllar</dt>
        <dd>
          {filesWithUrls.length === 0 && "--"}
          <ul className="space-y-1">
            {filesWithUrls.map((f) => (
              <li key={f.id}>
                {f.url ? (
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring rounded font-medium text-green-deep hover:underline"
                  >
                    {f.file_name}
                  </a>
                ) : (
                  f.file_name
                )}
              </li>
            ))}
          </ul>
        </dd>
      </dl>

      <div className="mt-8">
        <StatusForm
          id={submission.id}
          status={submission.status}
          note={submission.admin_note ?? ""}
        />
      </div>
    </div>
  );
}
