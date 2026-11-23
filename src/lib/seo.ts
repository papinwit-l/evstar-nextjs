import type { Metadata } from "next";
import type { SeoData } from "@/types/common";

/** Merge WordPress SEO fields over a page's built-in defaults. */
export function seoMetadata(seo: SeoData | undefined, defaults: Metadata): Metadata {
  return {
    ...defaults,
    ...(seo?.title && { title: { absolute: seo.title } }),
    ...(seo?.description && { description: seo.description }),
  };
}
