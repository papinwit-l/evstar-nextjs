import { cache } from "react";
import { ACCESSORIES_CATEGORY, getCatalog } from "@/lib/api/products";
import { getSiteSettings, type Option } from "@/lib/api/settings";
import { chargerModels as mockChargerModels } from "@/lib/quote";
import { isWordPressEnabled, wpQuery } from "@/lib/wp/client";
import { SEO, str, text, type WpSeo } from "@/lib/wp/map";
import type { SeoData } from "@/types/common";

export type QuoteOptions = {
  chargerModels: Option[];
  meterSizes: Option[];
};

export type QuotePageData = {
  title: string;
  surveyTitle: string;
  lead: string;
  /** Shown after a successful submit; empty → the form's default message */
  thankYou?: string;
  responseTime?: string;
  seo?: SeoData;
};

const RECOMMEND: Option = { value: "recommend", label: "ให้ทีมงานแนะนำ" };

/**
 * Options for the quote form, used by the form AND by server-side validation,
 * so a model the client unpublishes can no longer be submitted.
 */
export const getQuoteOptions = cache(async (): Promise<QuoteOptions> => {
  if (!isWordPressEnabled) {
    const { meterSizes } = await getSiteSettings();
    return { chargerModels: [...mockChargerModels], meterSizes };
  }

  const [catalog, settings] = await Promise.all([getCatalog(), getSiteSettings()]);

  // Catalog order = category order (DC first), then the Order field
  const chargerModels = catalog.categories
    .filter((c) => c.id !== ACCESSORIES_CATEGORY)
    .flatMap((c) => catalog.products.filter((p) => p.categoryId === c.id))
    .map((p) => ({
      value: p.slug,
      label: p.kicker ? `${p.name} — ${p.kicker}` : p.name,
    }));

  return { chargerModels: [...chargerModels, RECOMMEND], meterSizes: settings.meterSizes };
});

const QUOTE_QUERY = `
  query QuotePage {
    evstarPage(key: QUOTE) {
      quotePage { title surveyTitle lead thankYou }
      ${SEO}
    }
  }
`;

export const getQuotePage = cache(async (): Promise<QuotePageData> => {
  const fallback: QuotePageData = {
    title: "ขอใบเสนอราคา",
    surveyTitle: "จองคิวสำรวจหน้างาน",
    lead: "กรอกข้อมูลเบื้องต้น ทีมงานจะติดต่อกลับเพื่อประเมินหน้างานและเสนอราคา",
  };
  if (!isWordPressEnabled) return fallback;

  const [data, settings] = await Promise.all([
    wpQuery<{
      evstarPage: {
        quotePage: {
          title: string | null;
          surveyTitle: string | null;
          lead: string | null;
          thankYou: string | null;
        } | null;
        pageSeo: WpSeo;
      } | null;
    }>(QUOTE_QUERY, ["quote"]),
    getSiteSettings(),
  ]);

  const page = data.evstarPage?.quotePage;
  return {
    title: page?.title || fallback.title,
    surveyTitle: page?.surveyTitle || fallback.surveyTitle,
    lead: text(page?.lead) || fallback.lead,
    thankYou: str(page?.thankYou),
    responseTime: settings.responseTime,
    seo: {
      title: str(data.evstarPage?.pageSeo?.seoTitle),
      description: str(data.evstarPage?.pageSeo?.seoDescription),
    },
  };
});
