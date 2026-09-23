/**
 * Products page. In WordPress: a "product" post type with a category
 * taxonomy (home / commercial / dc-fast / accessories).
 */

import type { LinkField, Media } from "@/types/common";

export type SpecRow = {
  label: string;
  value: string;
};

export type ProductDetail = {
  /** Model name, e.g. "AC006" */
  name: string;
  /** Short line above the name, e.g. "Smart Home AC · 7–22 kW" */
  kicker?: string;
  tagline: string;
  /** Bullet points — the client's "จุดเด่น" and "ฟังก์ชัน" */
  features: string[];
  specs?: SpecRow[];
  /** Who it suits */
  audience?: string;
  image?: Media;
  cta?: LinkField;
};

export type ProductCategory = {
  /** Anchor id — the home page links to /products#home etc. */
  id: string;
  /** Short label for the category nav */
  label: string;
  title: string;
  lead?: string;
  products: ProductDetail[];
};

export type ProductsPageData = {
  title: string;
  lead: string;
  categories: ProductCategory[];
};
