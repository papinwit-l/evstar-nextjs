/**
 * Small mappers from WPGraphQL shapes to the types in src/types.
 * Shapes produced by WPGraphQL for ACF:
 *   - post pickers → connection: { nodes: [...] }
 *   - selects → string[]
 *   - text lists → [{ text }]
 *   - images → { node: { sourceUrl, altText, mediaDetails { width, height } } }
 *   - empty text → null
 */

import type {
  CtaData,
  HighlightsData,
  LinkField,
  Media,
  StepsData,
} from "@/types/common";

export type WpImage = {
  node: {
    sourceUrl: string;
    altText?: string | null;
    mediaDetails?: { width?: number | null; height?: number | null } | null;
  } | null;
} | null;

export type WpLink = { label?: string | null; href?: string | null } | null;

export type WpCta = {
  title?: string | null;
  lead?: string | null;
  primary?: WpLink;
  secondary?: WpLink;
  showLine?: boolean | null;
} | null;

export type WpHighlights = {
  title?: string | null;
  lead?: string | null;
  items?: { value?: string | null; title?: string | null; body?: string | null }[] | null;
  link?: WpLink;
} | null;

export type WpSteps = {
  title?: string | null;
  lead?: string | null;
  steps?: { title?: string | null; body?: string | null }[] | null;
  link?: WpLink;
} | null;

export type WpSeo = { seoTitle?: string | null; seoDescription?: string | null } | null;

/** "" and null → undefined, so optional fields stay optional. */
export const str = (value?: string | null) => (value ? value : undefined);

export const text = (value?: string | null) => value ?? "";

export const first = <T>(value?: T[] | null) => value?.[0];

export const lines = (items?: { text?: string | null }[] | null) =>
  (items ?? []).map((item) => item.text ?? "").filter(Boolean);

export function media(image: WpImage, fallbackAlt = ""): Media | undefined {
  const node = image?.node;
  if (!node?.sourceUrl) return undefined;
  return {
    src: node.sourceUrl,
    alt: node.altText || fallbackAlt,
    width: node.mediaDetails?.width ?? 1200,
    height: node.mediaDetails?.height ?? 1200,
  };
}

export function link(value: WpLink): LinkField | undefined {
  if (!value?.label || !value.href) return undefined;
  return { label: value.label, href: value.href };
}

export function cta(value: WpCta): CtaData {
  return {
    title: text(value?.title),
    lead: str(value?.lead),
    primary: link(value?.primary ?? null) ?? { label: "ขอใบเสนอราคา", href: "/quote" },
    secondary: link(value?.secondary ?? null),
    showLine: Boolean(value?.showLine),
  };
}

export function highlights(value: WpHighlights): HighlightsData {
  return {
    title: text(value?.title),
    lead: str(value?.lead),
    items: (value?.items ?? []).map((item) => ({
      value: text(item.value),
      title: text(item.title),
      body: text(item.body),
    })),
    link: link(value?.link ?? null),
  };
}

export function steps(value: WpSteps): StepsData {
  return {
    title: text(value?.title),
    lead: str(value?.lead),
    steps: (value?.steps ?? []).map((step) => ({
      title: text(step.title),
      body: text(step.body),
    })),
    link: link(value?.link ?? null),
  };
}

/* GraphQL fragments shared by several queries */

export const IMAGE = `node { sourceUrl altText mediaDetails { width height } }`;
export const LINK = `label href`;
export const CTA = `title lead primary { ${LINK} } secondary { ${LINK} } showLine`;
export const HIGHLIGHTS = `title lead items { value title body } link { ${LINK} }`;
export const STEPS = `title lead steps { title body } link { ${LINK} }`;
export const SEO = `pageSeo { seoTitle seoDescription }`;
