"use client";

import { useState, useTransition, type ChangeEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { setHeroVideoPath } from "@/lib/actions";

export default function HeroVideoManager({
  currentPath,
  currentUrl,
}: {
  currentPath: string | null;
  currentUrl: string | null;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("video/")) {
      setError("Zəhmət olmasa video formatında fayl seçin (mp4, webm və s.).");
      return;
    }
    if (file.size > 60 * 1024 * 1024) {
      setError("Video 60MB-dan kiçik olmalıdır -- veb üçün sıxılmış mp4 tövsiyə olunur.");
      return;
    }

    setError("");
    setUploading(true);
    const supabase = createClient();
    const path = `hero/${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("site-assets")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      setError("Yükləmə uğursuz oldu: " + uploadError.message);
      setUploading(false);
      return;
    }

    const previousPath = currentPath;
    startTransition(async () => {
      await setHeroVideoPath(path);
      if (previousPath) {
        await supabase.storage.from("site-assets").remove([previousPath]);
      }
      setUploading(false);
    });
  }

  function handleRemove() {
    if (!currentPath) return;
    if (!confirm("Video silinsin? Ana səhifədə yenidən kampus şəkli görünəcək.")) return;

    const supabase = createClient();
    startTransition(async () => {
      await setHeroVideoPath(null);
      await supabase.storage.from("site-assets").remove([currentPath]);
    });
  }

  return (
    <div className="glass rounded-2xl px-6 py-6">
      <h2 className="font-display text-lg font-semibold text-ink">Baş səhifə video</h2>

      {currentUrl ? (
        <div className="mt-4">
          <video
            src={currentUrl}
            className="w-full rounded-xl border border-line"
            controls
            muted
          />
          <button
            onClick={handleRemove}
            disabled={isPending}
            className="focus-ring mt-4 rounded-full border border-gold px-4 py-2 text-[13.5px] font-medium text-gold hover:bg-gold hover:text-bg disabled:opacity-60"
          >
            {isPending ? "Silinir..." : "Videonu sil"}
          </button>
        </div>
      ) : (
        <p className="mt-2 text-[14px] text-ink-dim">
          Hazırda video yüklənməyib -- ana səhifədə kampus şəkli göstərilir.
        </p>
      )}

      <div className="mt-6 border-t border-line-soft pt-5">
        <label className="block text-[13.5px] font-medium text-ink-dim" htmlFor="hero-video">
          {currentUrl ? "Videonu dəyişdir" : "Video yüklə"}
        </label>
        <input
          id="hero-video"
          type="file"
          accept="video/*"
          onChange={handleFile}
          disabled={uploading || isPending}
          className="focus-ring mt-2 w-full text-[14px] text-ink-dim file:mr-4 file:rounded-full file:border-0 file:bg-lime file:px-4 file:py-2 file:text-[13.5px] file:font-semibold file:text-bg disabled:opacity-60"
        />
        <p className="mt-2 text-[12.5px] text-ink-dimmer">
          MP4 tövsiyə olunur, 60MB-dan kiçik, mütləq səssiz (audiosuz) olsun --
          avtomatik və dövri (loop) oynadılacaq.
        </p>
        {uploading && <p className="mt-2 text-[13px] text-lime-soft">Yüklənir...</p>}
        {error && <p className="mt-2 text-[13px] text-gold">{error}</p>}
      </div>
    </div>
  );
}
