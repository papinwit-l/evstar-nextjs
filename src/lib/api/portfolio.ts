import { cache } from "react";
import { portfolioPreview } from "@/lib/mock/portfolio";
import type { PortfolioPreviewData } from "@/types/portfolio";

/**
 * Recent installation cases for the home page.
 * Returns null when there is nothing to show, and the section hides itself.
 * Later: a WPGraphQL query on the "portfolio" post type, newest first.
 */
export const getPortfolioPreview = cache(
  async (limit = 3): Promise<PortfolioPreviewData | null> => {
    const cases = portfolioPreview.cases.slice(0, limit);
    if (cases.length === 0) return null;
    return { ...portfolioPreview, cases };
  },
);
