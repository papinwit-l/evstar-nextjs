import { cache } from "react";
import {
  featuredTile,
  gridTiles,
  heroTile,
  latestArticles,
  productsLink,
} from "@/lib/mock/home";
import type { ArticleCard, HomePageData } from "@/types/home";

/**
 * Data layer for the home page.
 * Components never import mocks directly — only these functions.
 * When WordPress is ready, replace each body with a WPGraphQL request;
 * the return types (and every component) stay the same.
 *
 * cache() dedupes calls within one request, e.g. page + generateMetadata.
 */

/** Home page ACF fields — one WP page, so one query. */
export const getHomePage = cache(async (): Promise<HomePageData> => {
  // later: return wpQuery(HOME_PAGE_QUERY, { next: { tags: ["home"] } })
  return {
    hero: heroTile,
    featured: featuredTile,
    grid: gridTiles,
    productsLink,
  };
});

/** Latest posts — a separate WP query, independent of the home page fields. */
export const getLatestArticles = cache(
  async (limit = 3): Promise<ArticleCard[]> => {
    // later: return wpQuery(LATEST_POSTS_QUERY, { first: limit }, { next: { tags: ["posts"] } })
    return latestArticles.slice(0, limit);
  },
);
