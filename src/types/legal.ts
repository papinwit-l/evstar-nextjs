/**
 * Legal pages. Simple structured sections so the client can edit them in
 * WordPress; later this can become rendered HTML from the editor instead.
 */

export type LegalSection = {
  /** Anchor id, e.g. "cookies" — the cookie banner links to it */
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export type LegalPageData = {
  title: string;
  /** Shown under the title, e.g. "ปรับปรุงล่าสุด 1 ตุลาคม 2569" */
  updated?: string;
  intro?: string;
  sections: LegalSection[];
};
