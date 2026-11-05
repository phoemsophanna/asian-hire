"use client";

import { useEffect } from "react";
import { useHomepageStore } from "@/store/homepage-store";
import type { ApiLang, HomepageData } from "@/services/homepage-service";

export function HomepageStoreHydrator({
  data,
  lang,
}: {
  data: HomepageData | null;
  lang: ApiLang;
}) {
  const setHomepage = useHomepageStore((state) => state.setHomepage);

  useEffect(() => {
    setHomepage(data, lang);
  }, [data, lang, setHomepage]);

  return null;
}
