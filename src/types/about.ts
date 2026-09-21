/**
 * About page data shapes — mirror as ACF fields on the WP "About" page.
 */

import type { Media } from "@/types/common";

export type AboutHeroData = {
  kicker?: string;
  /** "\n" marks where Thai phrases may wrap */
  title: string;
  lead: string;
  /** Wide photo (factory, production line or team). Optional until the client supplies it. */
  image?: Media;
};

export type AboutPageData = {
  hero: AboutHeroData;
  // stats, story, capabilities, milestones, standards, cta … added section by section
};
