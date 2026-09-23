/**
 * Services page — mirror as ACF fields on the WP "Services" page.
 */

import type { CtaData, StepsData } from "@/types/common";

export type ServiceItem = {
  /** Anchor id, e.g. "install" */
  id: string;
  /** Icon key — mapped to a lucide icon in ServiceList */
  icon: "install" | "platform" | "maintenance";
  title: string;
  body: string;
  bullets?: string[];
};

export type ServicesPageData = {
  title: string;
  lead: string;
  services: ServiceItem[];
  process: StepsData;
  cta: CtaData;
};
