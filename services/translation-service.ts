const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000/api";

export type TranslationApiLang = "eng" | "km";

// Returns an empty map when the API cannot be reached so labels fall back to English defaults.
export async function fetchTranslations(lang: TranslationApiLang): Promise<Record<string, string>> {
  try {
    const response = await fetch(`${API_URL}/translations?lang=${lang}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`Translations request failed with status ${response.status}`);
    }

    const payload = (await response.json()) as { data?: Record<string, string> };
    return payload.data ?? {};
  } catch (error) {
    console.error("Unable to load translations from the API", error);
    return {};
  }
}

// Returns the translation for the English text, or the text itself when no translation exists.
export function createTranslator(translations: Record<string, string>) {
  return (text: string): string => translations[text] ?? text;
}
