export const locales = ["az", "en", "nl", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "az";

export const localeNames: Record<Locale, string> = {
  az: "Az",
  en: "En",
  nl: "Nl",
  ru: "Ru",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Picks the translated column for the given locale, falling back to
// Azerbaijani when a row hasn't been translated yet.
export function localized<T extends Record<string, unknown>>(
  row: T,
  field: string,
  locale: Locale
): string {
  if (locale === "az") return (row[`${field}_az`] as string) ?? "";
  const translated = row[`${field}_${locale}`] as string | null | undefined;
  return translated || ((row[`${field}_az`] as string) ?? "");
}
