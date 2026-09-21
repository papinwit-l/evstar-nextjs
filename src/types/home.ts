/**
 * Home page data shapes. Mirror these as ACF fields in WordPress
 * so the mock data can be swapped for a WPGraphQL query later.
 */

import type { LinkField, Media } from "@/types/common";

// Re-exported so existing imports from "@/types/home" keep working
export type { LinkField, Media };

export type ProductTileData = {
  /** Small orange line above the title, e.g. "AC 7–22 kW" */
  kicker?: string;
  /** Line breaks ("\n", from an ACF textarea) mark where Thai phrases may wrap */
  title: string;
  subtitle: string;
  image: Media;
  primary: LinkField;
  secondary?: LinkField;
};

/** Everything the home page reads from its own WP page (ACF fields). */
export type HomePageData = {
  hero: ProductTileData;
  /** Black full-width tile under the hero */
  featured: ProductTileData;
  /** 2×2 grid; keep an even count so the grid has no gap */
  grid: ProductTileData[];
  /** Link under the grid, e.g. "ดูสินค้าทั้งหมด 7 รุ่น" */
  productsLink: LinkField;
  compare: CompareData;
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

export type SpecRow = {
  label: string;
  value: string;
};

export type CompareColumn = {
  title: string;
  subtitle: string;
  image: Media;
  primary: LinkField;
  secondary?: LinkField;
  /** Same labels, same order in every column so the rows line up */
  specs: SpecRow[];
};

export type CompareData = {
  title: string;
  lead?: string;
  columns: CompareColumn[];
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

export type FinalCtaData = {
  title: string;
  lead?: string;
  primary: LinkField;
  /** Show the LINE OA button (URL comes from site config) */
  showLine?: boolean;
};
