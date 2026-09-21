import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import type { MilestonesData } from "@/types/about";

const MAX_COLS = 4;

// Static class names so Tailwind can find them
const desktopCols: Record<number, string> = {
  1: "lg:grid-cols-1",
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * Timeline.
 * - Below lg: vertical, left-aligned, dots down the left edge.
 * - From lg: horizontal and centered — each dot sits in the middle of its
 *   column and the line runs dot-to-dot, so the whole row is symmetric
 *   under the centered heading. Up to 4 per row; the line breaks at row ends.
 * The newest (last) milestone gets a filled dot.
 */
export function MilestonesSection({ data }: { data: MilestonesData }) {
  const count = data.items.length;
  if (count === 0) return null;

  const cols = Math.min(count, MAX_COLS);
  const lastIndex = count - 1;

  return (
    <section
      aria-labelledby="milestones-title"
      className="bg-surface-dim py-(--section-py)"
    >
      <Container>
        <SectionHeading id="milestones-title" title={data.title} />

        <ol
          className={cn(
            "mt-16 grid gap-y-12 pl-9 lg:gap-y-14 lg:pl-0",
            desktopCols[cols],
          )}
        >
          {data.items.map((item, i) => {
            const isLast = i === lastIndex;
            const endsRow = (i + 1) % cols === 0;

            return (
              <li
                key={`${item.year}-${item.title}`}
                className="relative lg:px-4 lg:pt-10 lg:text-center"
              >
                {/* line to the next dot: down on mobile, across on desktop */}
                {!isLast && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute -bottom-12 -left-[29px] top-5 w-0.5 bg-border-strong",
                      "lg:bottom-auto lg:left-1/2 lg:top-[7px] lg:h-0.5 lg:w-full",
                      endsRow && "lg:hidden",
                    )}
                  />
                )}
                {/* dot (after the line so it sits on top) */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-9 top-1 size-4 rounded-full border-2 border-accent",
                    "lg:left-1/2 lg:top-0 lg:-translate-x-1/2",
                    isLast ? "bg-accent" : "bg-surface-dim",
                  )}
                />

                <p className="text-[clamp(1.6rem,2.4vw,2rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                  {item.year}
                </p>
                <h3 className="mt-2.5 text-[1.05rem] font-semibold leading-snug text-balance">
                  {item.title}
                </h3>
                {item.body && (
                  <p className="mt-1.5 text-[0.92rem] text-text-muted text-balance">
                    {item.body}
                  </p>
                )}
              </li>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
