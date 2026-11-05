"use client";

import { create } from "zustand";
import { fetchHomepage, type ApiLang, type HomepageData } from "@/services/homepage-service";

type HomepageState = {
  data: HomepageData | null;
  isLoading: boolean;
  error: string | null;
  lang: ApiLang | null;
  setHomepage: (data: HomepageData | null, lang: ApiLang) => void;
  loadHomepage: (lang: ApiLang) => Promise<void>;
};

export const useHomepageStore = create<HomepageState>()((set, get) => ({
  data: null,
  isLoading: false,
  error: null,
  lang: null,

  setHomepage: (data, lang) => set({ data, lang, error: data ? null : "Unable to load homepage data" }),

  loadHomepage: async (lang) => {
    if (get().lang === lang && get().data) return;

    set({ isLoading: true, error: null });

    const data = await fetchHomepage(lang);

    set({
      data,
      lang,
      isLoading: false,
      error: data ? null : "Unable to load homepage data",
    });
  },
}));
