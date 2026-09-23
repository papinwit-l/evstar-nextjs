/**
 * About page data shapes — mirror as ACF fields on the WP "About" page.
 */

import type { CtaData, HighlightsData, Media } from "@/types/common";

export type AboutHeroData = {
  kicker?: string;
  /** "\n" marks where Thai phrases may wrap */
  title: string;
  lead: string;
  /** Wide photo (team, office or an installation). Optional until the client supplies it. */
  image?: Media;
};

export type StoryData = {
  kicker?: string;
  title: string;
  /** First paragraph is shown larger as the intro */
  paragraphs: string[];
  /** Portrait photo (4:5) */
  image?: Media;
};

export type AboutPageData = {
  hero: AboutHeroData;
  story: StoryData;
  /** "Why ChargeCore" — facts about the brand they represent */
  why: HighlightsData;
  cta: CtaData;
};
