"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useLanguage } from "./LanguageProvider";

type LocaleLinkProps = ComponentProps<typeof Link>;

export default function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const { localizeHref } = useLanguage();
  const localizedHref = typeof href === "string" ? localizeHref(href) : href;
  return <Link href={localizedHref} {...props} />;
}
