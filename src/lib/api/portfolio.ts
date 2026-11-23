import { cache } from "react";
import { featuredReview, portfolioPage } from "@/lib/mock/portfolio";
import { isWordPressEnabled, wpQuery } from "@/lib/wp/client";
import {
  CTA,
  cta,
  IMAGE,
  media,
  SEO,
  str,
  text,
  type WpCta,
  type WpImage,
  type WpSeo,
} from "@/lib/wp/map";
import type {
  CaseCardData,
  PortfolioPageData,
  PortfolioPreviewData,
  ReviewData,
} from "@/types/portfolio";

type WpCase = {
  title: string;
  featuredImage: WpImage;
  siteTypes: { nodes: { slug: string; name: string }[] } | null;
  portfolioFields: {
    location: string | null;
    featuredOnHome: boolean | null;
    model: { nodes: { title?: string }[] } | null;
    review: { quote: string | null; author: string | null; context: string | null } | null;
  } | null;
};

type Portfolio = PortfolioPageData & {
  /** Cases ticked "แสดงบนหน้าแรก", newest first */
  featured: CaseCardData[];
  review?: ReviewData;
};

const PORTFOLIO_QUERY = `
  query Portfolio {
    evstarPage(key: PORTFOLIO) {
      portfolioPage { title lead cta { ${CTA} } }
      ${SEO}
    }
    portfolioCases(first: 100, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        title
        featuredImage { ${IMAGE} }
        siteTypes { nodes { slug name } }
        portfolioFields {
          location featuredOnHome
          model { nodes { ... on Product { title } } }
          review { quote author context }
        }
      }
    }
    siteTypes(first: 50, where: { hideEmpty: true, orderby: TERM_ID, order: ASC }) {
      nodes { slug name }
    }
  }
`;

const getPortfolio = cache(async (): Promise<Portfolio> => {
  if (!isWordPressEnabled) {
    return { ...portfolioPage, featured: portfolioPage.cases, review: featuredReview };
  }

  const data = await wpQuery<{
    evstarPage: {
      portfolioPage: { title: string | null; lead: string | null; cta: WpCta } | null;
      pageSeo: WpSeo;
    } | null;
    portfolioCases: { nodes: WpCase[] };
    siteTypes: { nodes: { slug: string; name: string }[] };
  }>(PORTFOLIO_QUERY, ["portfolio"]);

  const cases = data.portfolioCases.nodes.map((node) => {
    const site = node.siteTypes?.nodes[0];
    const model = node.portfolioFields?.model?.nodes[0]?.title;
    const item: CaseCardData = {
      filter: site?.slug,
      title: node.title,
      type: [site?.name, model].filter(Boolean).join(" · "),
      location: str(node.portfolioFields?.location),
      image: media(node.featuredImage, node.title),
    };
    return { item, node };
  });

  const featured = cases.filter(({ node }) => node.portfolioFields?.featuredOnHome);
  const withReview = [...featured, ...cases].find(
    ({ node }) => node.portfolioFields?.review?.quote,
  )?.node.portfolioFields?.review;

  const page = data.evstarPage?.portfolioPage;
  return {
    title: text(page?.title),
    lead: str(page?.lead),
    filters: data.siteTypes.nodes.map((t) => ({ value: t.slug, label: t.name })),
    cases: cases.map(({ item }) => item),
    cta: cta(page?.cta ?? null),
    seo: {
      title: str(data.evstarPage?.pageSeo?.seoTitle),
      description: str(data.evstarPage?.pageSeo?.seoDescription),
    },
    featured: featured.map(({ item }) => item),
    review: withReview?.quote
      ? {
          quote: withReview.quote,
          author: text(withReview.author),
          context: str(withReview.context),
        }
      : undefined,
  };
});

export const getPortfolioPage = cache(async (): Promise<PortfolioPageData> => {
  const { title, lead, filters, cases, cta, seo } = await getPortfolio();
  return { title, lead, filters, cases, cta, seo };
});

/**
 * Cases for the home page: those ticked "แสดงบนหน้าแรก", else the newest.
 * Returns null when there is nothing to show, and the section hides itself.
 */
export const getPortfolioPreview = cache(
  async (limit = 3): Promise<PortfolioPreviewData | null> => {
    const portfolio = await getPortfolio();
    const cases = (portfolio.featured.length ? portfolio.featured : portfolio.cases).slice(
      0,
      limit,
    );
    if (cases.length === 0) return null;
    return { title: portfolio.title, cases, review: portfolio.review };
  },
);
