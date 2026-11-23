import { cache } from "react";
import { legalToBlocks } from "@/lib/legal-html";
import { privacyPolicy } from "@/lib/mock/legal";
import { isWordPressEnabled, wpQuery } from "@/lib/wp/client";
import { SEO, str, type WpSeo } from "@/lib/wp/map";
import type { LegalHtmlPage } from "@/types/legal";

const PRIVACY_QUERY = `
  query PrivacyPolicy {
    evstarPage(key: PRIVACY_POLICY) {
      title
      content
      modified
      ${SEO}
    }
  }
`;

const thaiDate = (iso: string) =>
  new Date(iso).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  });

/** Privacy policy — block-editor content from WordPress. */
export const getPrivacyPolicy = cache(async (): Promise<LegalHtmlPage> => {
  if (!isWordPressEnabled) {
    return {
      title: privacyPolicy.title,
      updated: privacyPolicy.updated,
      html: legalToBlocks(privacyPolicy),
    };
  }

  const data = await wpQuery<{
    evstarPage: {
      title: string | null;
      content: string | null;
      modified: string | null;
      pageSeo: WpSeo;
    } | null;
  }>(PRIVACY_QUERY, ["privacy-policy"]);

  const page = data.evstarPage;
  return {
    title: page?.title || privacyPolicy.title,
    updated: page?.modified ? `ปรับปรุงล่าสุด ${thaiDate(page.modified)}` : undefined,
    html: page?.content ?? "",
    seo: {
      title: str(page?.pageSeo?.seoTitle),
      description: str(page?.pageSeo?.seoDescription),
    },
  };
});
