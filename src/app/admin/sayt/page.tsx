import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/lib/types";
import HeroVideoManager from "./HeroVideoManager";

export default async function SaytPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle<SiteSettings>();

  let currentUrl: string | null = null;
  if (settings?.hero_video_path) {
    const { data } = supabase.storage
      .from("site-assets")
      .getPublicUrl(settings.hero_video_path);
    currentUrl = data.publicUrl;
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-semibold text-ink">Sayt tənzimləmələri</h1>
      <p className="mt-2 max-w-xl text-[14.5px] text-ink-dim">
        Ana səhifənin arxa fonundakı video buradan idarə olunur. Video
        yüklənməyibsə, kampus şəkli göstərilir.
      </p>

      <div className="mt-8 max-w-xl">
        <HeroVideoManager
          currentPath={settings?.hero_video_path ?? null}
          currentUrl={currentUrl}
        />
      </div>
    </div>
  );
}
