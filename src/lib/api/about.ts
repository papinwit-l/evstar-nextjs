import { cache } from "react";
import { aboutCta, aboutHero, aboutStory, aboutWhy } from "@/lib/mock/about";
import { isWordPressEnabled, wpQuery } from "@/lib/wp/client";
import {
  CTA,
  cta,
  HIGHLIGHTS,
  highlights,
  IMAGE,
  lines,
  media,
  SEO,
  str,
  text,
  type WpCta,
  type WpHighlights,
  type WpImage,
  type WpSeo,
} from "@/lib/wp/map";
import type { AboutPageData } from "@/types/about";

type WpAbout = {
  hero: { kicker: string | null; title: string | null; lead: string | null; image: WpImage } | null;
  story: {
    kicker: string | null;
    title: string | null;
    paragraphs: { text: string | null }[] | null;
    image: WpImage;
  } | null;
  why: WpHighlights;
  cta: WpCta;
};

const ABOUT_QUERY = `
  query AboutPage {
    evstarPage(key: ABOUT) {
      aboutPage {
        hero { kicker title lead image { ${IMAGE} } }
        story { kicker title paragraphs { text } image { ${IMAGE} } }
        why { ${HIGHLIGHTS} }
        cta { ${CTA} }
      }
      ${SEO}
    }
  }
`;

export const getAboutPage = cache(async (): Promise<AboutPageData> => {
  if (!isWordPressEnabled) {
    return { hero: aboutHero, story: aboutStory, why: aboutWhy, cta: aboutCta };
  }

  const data = await wpQuery<{
    evstarPage: { aboutPage: WpAbout | null; pageSeo: WpSeo } | null;
  }>(ABOUT_QUERY, ["about"]);

  const page = data.evstarPage?.aboutPage;
  return {
    hero: {
      kicker: str(page?.hero?.kicker),
      title: text(page?.hero?.title),
      lead: text(page?.hero?.lead),
      image: media(page?.hero?.image ?? null),
    },
    story: {
      kicker: str(page?.story?.kicker),
      title: text(page?.story?.title),
      paragraphs: lines(page?.story?.paragraphs),
      image: media(page?.story?.image ?? null),
    },
    why: highlights(page?.why ?? null),
    cta: cta(page?.cta ?? null),
    seo: {
      title: str(data.evstarPage?.pageSeo?.seoTitle),
      description: str(data.evstarPage?.pageSeo?.seoDescription),
    },
  };
});
