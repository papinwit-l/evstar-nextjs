/**
 * Home page data shapes. Mirror these as ACF fields in WordPress
 * so the mock data can be swapped for a WPGraphQL query later.
 */

import type { CtaData, LinkField, Media } from "@/types/common";

// Re-exported so existing imports from "@/types/home" keep working
export type { LinkField, Media };

export type ProductTileData = {
  /** Small orange line above the title, e.g. "AC 7–22 kW" */
  kicker?: string;
  /** Line breaks ("\n", from an ACF textarea) mark where Thai phrases may wrap */
  title: string;
  /** Same "\n" phrase breaks as the title */
  subtitle: string;
  /** Who it suits, e.g. "บ้านเดี่ยว · ทาวน์โฮม" — shown under the subtitle */
  audience?: string;
  /** Optional: a missing photo shows a placeholder in dev, nothing in production */
  image?: Media;
  primary: LinkField;
  secondary?: LinkField;
};

export type AccessoryCardData = {
  kicker?: string;
  title: string;
  body: string;
  link: LinkField;
  image?: Media;
};

export type ChargeLineData = {
  label: string;
  /** Bold part on the right, e.g. "7 – 240 kW" */
  value: string;
  detail?: string;
};

/** Hero = a product tile with an h1, plus the animated charge line */
export type HeroData = ProductTileData & {
  chargeLine?: ChargeLineData;
};

/** Everything the home page reads from its own WP page (ACF fields). */
export type HomePageData = {
  hero: HeroData;
  /** Black full-width tile under the hero */
  featured: ProductTileData;
  /** 2-up grid of AC chargers; keep an even count so the grid has no gap */
  grid: ProductTileData[];
  /** Small cards under the tiles (Home Load Balancer, EVCC) */
  accessories: AccessoryCardData[];
  /** Link under the product tiles, e.g. "ดูสินค้าทั้งหมด" */
  productsLink: LinkField;
  highlights: HighlightsData;
  oem: OemData;
  finalCta: FinalCtaData;
};

/** Article card; will come from WP posts, not from the home page fields. */
export type ArticleCard = {
  title: string;
  href: string;
  category: string;
  image?: Media;
};

export type Highlight = {
  /** Big typographic value, e.g. "3 ปี" — keep it short (1–2 words) */
  value: string;
  title: string;
  body: string;
};

export type HighlightsData = {
  title: string;
  /** Designed for 4 items (one row on desktop) */
  items: Highlight[];
  link?: LinkField;
};

export type OemData = {
  title: string;
  lead?: string;
  /**
   * Partner logos. One item = shown as a single banner image;
   * several items = shown as a logo grid (preferred: editable, sharper).
   */
  logos: Media[];
  primary: LinkField;
  secondary?: LinkField;
};

/** Kept as an alias so existing imports keep working. */
export type FinalCtaData = CtaData;
