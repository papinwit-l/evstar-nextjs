/**
 * Installation cases. In WordPress these become a "portfolio" post type
 * (gallery, location, charger model, optional customer review).
 */

import type { CtaData, Media } from "@/types/common";

export type CaseCardData = {
  /** Filter key on /portfolio, e.g. "house" — matches PortfolioFilter.value */
  filter?: string;
  /** Project or site name */
  title: string;
  /** Site type + model, e.g. "บ้านเดี่ยว · AC006" */
  type: string;
  /** District, province */
  location?: string;
  image?: Media;
  /** Links to the case on /portfolio; omit while there are no detail pages */
  href?: string;
};

export type ReviewData = {
  quote: string;
  author: string;
  /** e.g. site type or project */
  context?: string;
};

export type PortfolioPreviewData = {
  title: string;
  cases: CaseCardData[];
  review?: ReviewData;
};

export type PortfolioFilter = {
  value: string;
  label: string;
};

export type PortfolioPageData = {
  title: string;
  lead?: string;
  filters: PortfolioFilter[];
  cases: CaseCardData[];
  cta: CtaData;
};
