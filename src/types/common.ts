/** Types shared by every page. */

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

/** Closing call-to-action band, used at the bottom of most pages. */
export type CtaData = {
  /** "\n" marks where Thai phrases may wrap */
  title: string;
  lead?: string;
  primary: LinkField;
  /** Outline button next to the primary one */
  secondary?: LinkField;
  /** Show the LINE OA button (URL comes from site config) */
  showLine?: boolean;
};
