import type { LegalPageData } from "@/types/legal";

const escape = (text: string) =>
  text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const paragraph = (text: string) =>
  `<!-- wp:paragraph -->\n<p>${escape(text)}</p>\n<!-- /wp:paragraph -->`;

/**
 * Structured legal sections → WordPress block markup.
 * Used to seed the privacy policy into the block editor, and as the fallback
 * HTML when WordPress is not configured. Block comments render as nothing.
 */
export function legalToBlocks(data: LegalPageData): string {
  const blocks: string[] = [];
  if (data.intro) blocks.push(paragraph(data.intro));

  for (const section of data.sections) {
    blocks.push(
      `<!-- wp:heading {"anchor":"${section.id}"} -->\n` +
        `<h2 class="wp-block-heading" id="${section.id}">${escape(section.title)}</h2>\n` +
        `<!-- /wp:heading -->`,
    );
    section.paragraphs?.forEach((text) => blocks.push(paragraph(text)));
    if (section.bullets?.length) {
      const items = section.bullets
        .map(
          (text) =>
            `<!-- wp:list-item -->\n<li>${escape(text)}</li>\n<!-- /wp:list-item -->`,
        )
        .join("\n");
      blocks.push(
        `<!-- wp:list -->\n<ul class="wp-block-list">${items}</ul>\n<!-- /wp:list -->`,
      );
    }
  }

  return blocks.join("\n\n");
}
