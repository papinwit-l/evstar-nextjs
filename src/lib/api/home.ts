import { cache } from "react";
import { getCatalog, type CatalogProduct } from "@/lib/api/products";
import {
  accessoryCards,
  featuredTile,
  finalCta,
  gridTiles,
  heroTile,
  highlights as mockHighlights,
  installSteps,
  productsLink,
} from "@/lib/mock/home";
import { isWordPressEnabled, wpQuery } from "@/lib/wp/client";
import {
  CTA,
  cta,
  HIGHLIGHTS,
  highlights,
  IMAGE,
  LINK,
  link,
  media,
  SEO,
  STEPS,
  steps,
  str,
  text,
  type WpCta,
  type WpHighlights,
  type WpImage,
  type WpLink,
  type WpSeo,
  type WpSteps,
} from "@/lib/wp/map";
import type {
  AccessoryCardData,
  HomePageData,
  ProductTileData,
} from "@/types/home";

/**
 * Data layer for the home page.
 * Components never import mocks directly — only these functions.
 * cache() dedupes calls within one request, e.g. page + generateMetadata.
 */

type WpTileRef = {
  product: { nodes: { slug: string }[] } | null;
  subtitleOverride: string | null;
  imageOverride: WpImage;
} | null;

type WpHome = {
  hero: {
    kicker: string | null;
    title: string | null;
    subtitle: string | null;
    image: WpImage;
    primary: WpLink;
    secondary: WpLink;
    chargeLine: { label: string | null; value: string | null; detail: string | null } | null;
  } | null;
  featuredProduct: WpTileRef;
  gridProducts: WpTileRef[] | null;
  accessories: WpTileRef[] | null;
  productsLink: WpLink;
  highlights: WpHighlights;
  process: WpSteps;
  finalCta: WpCta;
};

const TILE = `product { nodes { slug } } subtitleOverride imageOverride { ${IMAGE} }`;

const HOME_QUERY = `
  query HomePage {
    evstarPage(key: HOME) {
      homePage {
        hero {
          kicker title subtitle
          image { ${IMAGE} }
          primary { ${LINK} } secondary { ${LINK} }
          chargeLine { label value detail }
        }
        featuredProduct { ${TILE} }
        gridProducts { ${TILE} }
        accessories { ${TILE} }
        productsLink { ${LINK} }
        highlights { ${HIGHLIGHTS} }
        process { ${STEPS} }
        finalCta { ${CTA} }
      }
      ${SEO}
    }
  }
`;

/** Resolve a tile's product reference against the catalog (unpublished → skipped). */
function resolve(ref: WpTileRef, catalog: CatalogProduct[]) {
  const slug = ref?.product?.nodes[0]?.slug;
  const product = slug ? catalog.find((p) => p.slug === slug) : undefined;
  return product && ref ? { product, ref } : null;
}

function productTile(product: CatalogProduct, ref: NonNullable<WpTileRef>): ProductTileData {
  return {
    kicker: product.kicker,
    title: product.name,
    subtitle: ref.subtitleOverride || product.tagline,
    audience: product.audience,
    image: media(ref.imageOverride, product.name) ?? product.image,
    primary: { label: "ดูรายละเอียด", href: `/products#${product.categoryId}` },
    secondary: product.cta,
  };
}

function accessoryCard(product: CatalogProduct, ref: NonNullable<WpTileRef>): AccessoryCardData {
  return {
    kicker: product.kicker ?? "อุปกรณ์เสริม",
    title: product.name,
    body: ref.subtitleOverride || product.tagline,
    link: { label: "ดูรายละเอียด", href: `/products#${product.categoryId}` },
    image: media(ref.imageOverride, product.name) ?? product.image,
  };
}

export const getHomePage = cache(async (): Promise<HomePageData> => {
  if (!isWordPressEnabled) {
    return {
      hero: heroTile,
      featured: featuredTile,
      grid: gridTiles,
      accessories: accessoryCards,
      productsLink,
      highlights: mockHighlights,
      process: installSteps,
      finalCta,
    };
  }

  const [catalog, data] = await Promise.all([
    getCatalog(),
    wpQuery<{ evstarPage: { homePage: WpHome | null; pageSeo: WpSeo } | null }>(
      HOME_QUERY,
      ["home"],
    ),
  ]);

  const home = data.evstarPage?.homePage;
  if (!home) throw new Error("Home page fields are missing in WordPress");

  const hero = home.hero;
  const featured = resolve(home.featuredProduct, catalog.products);
  const grid = (home.gridProducts ?? [])
    .map((ref) => resolve(ref, catalog.products))
    .filter((x) => x !== null);
  const accessories = (home.accessories ?? [])
    .map((ref) => resolve(ref, catalog.products))
    .filter((x) => x !== null);

  return {
    hero: {
      kicker: str(hero?.kicker),
      title: text(hero?.title),
      subtitle: text(hero?.subtitle),
      image: media(hero?.image ?? null),
      primary: link(hero?.primary ?? null) ?? { label: "ขอใบเสนอราคา", href: "/quote" },
      secondary: link(hero?.secondary ?? null),
      chargeLine:
        hero?.chargeLine?.label && hero.chargeLine.value
          ? {
              label: hero.chargeLine.label,
              value: hero.chargeLine.value,
              detail: str(hero.chargeLine.detail),
            }
          : undefined,
    },
    featured: featured
      ? productTile(featured.product, featured.ref)
      : // No featured product chosen yet: fall back to the first one in the catalog
        productTile(catalog.products[0], {
          product: null,
          subtitleOverride: null,
          imageOverride: null,
        }),
    // Keep the 2-up grid even so it never shows a gap
    grid: grid
      .slice(0, grid.length - (grid.length % 2))
      .map(({ product, ref }) => productTile(product, ref)),
    accessories: accessories.map(({ product, ref }) => accessoryCard(product, ref)),
    productsLink: link(home.productsLink) ?? { label: "ดูสินค้าทั้งหมด", href: "/products" },
    highlights: highlights(home.highlights),
    process: steps(home.process),
    finalCta: cta(home.finalCta),
    seo: {
      title: str(data.evstarPage?.pageSeo?.seoTitle),
      description: str(data.evstarPage?.pageSeo?.seoDescription),
    },
  };
});
