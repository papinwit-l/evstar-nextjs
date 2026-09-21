import { Fragment } from "react";

/**
 * Renders "phrase one\nphrase two" as phrases that never break internally.
 * Thai has no spaces between words, so this lets editors choose where a
 * heading may wrap (ACF textarea line breaks) instead of the browser guessing.
 * The space sits BETWEEN the spans so the browser can still break there.
 * Text without "\n" is returned unchanged and wraps normally.
 */
export function Phrases({ text }: { text: string }) {
  const lines = text.split("\n");
  // No breaks marked → wrap normally (a single nowrap span would overflow on mobile)
  if (lines.length === 1) return text;

  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      <span className="whitespace-nowrap">{line}</span>
    </Fragment>
  ));
}
