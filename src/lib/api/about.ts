import { cache } from "react";
import { aboutCta, aboutHero, aboutStory, aboutWhy } from "@/lib/mock/about";
import type { AboutPageData } from "@/types/about";

/** About page ACF fields. Later: one WPGraphQL query with next: { tags: ["about"] }. */
export const getAboutPage = cache(async (): Promise<AboutPageData> => {
  return {
    hero: aboutHero,
    story: aboutStory,
    why: aboutWhy,
    cta: aboutCta,
  };
});
