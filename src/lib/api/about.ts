import { cache } from "react";
import { aboutHero, aboutStats, aboutStory } from "@/lib/mock/about";
import type { AboutPageData } from "@/types/about";

/** About page ACF fields. Later: one WPGraphQL query with next: { tags: ["about"] }. */
export const getAboutPage = cache(async (): Promise<AboutPageData> => {
  return { hero: aboutHero, stats: aboutStats, story: aboutStory };
});
