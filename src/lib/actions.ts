"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function updateSubmissionStatus(id: string, status: string, note: string) {
  const supabase = await createClient();
  await supabase
    .from("submissions")
    .update({ status, admin_note: note })
    .eq("id", id);
  revalidatePath("/admin/muraciyetler");
  revalidatePath(`/admin/muraciyetler/${id}`);
}

export async function toggleServiceActive(id: string, active: boolean) {
  const supabase = await createClient();
  await supabase.from("services").update({ active }).eq("id", id);
  revalidatePath("/admin/xidmetler");
  revalidatePath("/xidmetler");
}

export async function updateService(id: string, name_az: string, description_az: string) {
  const supabase = await createClient();
  await supabase.from("services").update({ name_az, description_az }).eq("id", id);
  revalidatePath("/admin/xidmetler");
  revalidatePath("/xidmetler");
}

export async function createService(category_id: string, name_az: string, is_package: boolean) {
  const supabase = await createClient();
  await supabase.from("services").insert({ category_id, name_az, is_package });
  revalidatePath("/admin/xidmetler");
  revalidatePath("/xidmetler");
}

export async function deleteService(id: string) {
  const supabase = await createClient();
  await supabase.from("services").delete().eq("id", id);
  revalidatePath("/admin/xidmetler");
  revalidatePath("/xidmetler");
}

export async function setHeroVideoPath(path: string | null) {
  const supabase = await createClient();
  await supabase
    .from("site_settings")
    .update({ hero_video_path: path, updated_at: new Date().toISOString() })
    .eq("id", 1);
  revalidatePath("/", "layout");
  revalidatePath("/admin/sayt");
}
