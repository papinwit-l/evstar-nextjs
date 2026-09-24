import { cache } from "react";
import { featuredReview, portfolioPage } from "@/lib/mock/portfolio";
import type {
  PortfolioPageData,
  PortfolioPreviewData,
} from "@/types/portfolio";

/** Later: WPGraphQL query on the "portfolio" post type. */
export const getPortfolioPage = cache(async (): Promise<PortfolioPageData> => {
  return portfolioPage;
});

/**
 * Newest cases for the home page.
 * Returns null when there is nothing to show, and the section hides itself.
 */
export const getPortfolioPreview = cache(
  async (limit = 3): Promise<PortfolioPreviewData | null> => {
    const cases = portfolioPage.cases.slice(0, limit);
    if (cases.length === 0) return null;
    return { title: portfolioPage.title, cases, review: featuredReview };
  },
);
