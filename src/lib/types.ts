export type ServiceCategory = {
  id: string;
  slug: string;
  name_az: string;
  description_az: string | null;
  name_en?: string | null;
  name_ru?: string | null;
  name_nl?: string | null;
  description_en?: string | null;
  description_ru?: string | null;
  description_nl?: string | null;
  sort_order: number;
};

export type Service = {
  id: string;
  category_id: string;
  name_az: string;
  description_az: string | null;
  name_en?: string | null;
  name_ru?: string | null;
  name_nl?: string | null;
  is_package: boolean;
  sort_order: number;
  active: boolean;
};

export type Submission = {
  id: string;
  created_at: string;
  full_name: string;
  phone: string;
  email: string | null;
  company: string | null;
  service_interest: string | null;
  message: string | null;
  status: "yeni" | "baxilir" | "cavablandirilib" | "baglanib";
  admin_note: string | null;
};

export type SubmissionFile = {
  id: string;
  submission_id: string;
  file_path: string;
  file_name: string;
  uploaded_at: string;
};

export type SiteSettings = {
  id: number;
  hero_video_path: string | null;
  updated_at: string;
};
