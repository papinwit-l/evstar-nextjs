/**
 * Home page data shapes. Mirror these as ACF fields in WordPress
 * so the mock data can be swapped for a WPGraphQL query later.
 */

export type Media = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type LinkField = {
  label: string;
  href: string;
};

export type ProductTileData = {
  /** Small orange line above the title, e.g. "AC 7–22 kW" */
  kicker?: string;
  /** Line breaks ("\n", from an ACF textarea) mark where Thai phrases may wrap */
  title: string;
  subtitle: string;
  image: Media;
  primary: LinkField;
  secondary?: LinkField;
};

/** Everything the home page reads from its own WP page (ACF fields). */
export type HomePageData = {
  hero: ProductTileData;
  // featured, grid, compare, highlights, oem … added section by section
};

/** Article card; will come from WP posts, not from the home page fields. */
export type ArticleCard = {
  title: string;
  href: string;
  category: string;
  image?: Media;
};
