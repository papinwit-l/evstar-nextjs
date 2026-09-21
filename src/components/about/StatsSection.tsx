import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";
import type { Stat } from "@/types/about";

// Static class names so Tailwind can find them
const desktopCols: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * Key figures as big numbers. Uses <dl> so screen readers pair each
 * label with its value; flex-col-reverse shows the value above the label.
 */
export function StatsSection({ items }: { items: Stat[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="stats-title" className="py-(--section-py)">
      <h2 id="stats-title" className="sr-only">
        EV Star ในตัวเลข
      </h2>
      <Container>
        <dl
          className={cn(
            "mx-auto grid max-w-[1100px] grid-cols-2 gap-x-[clamp(24px,4vw,56px)] gap-y-11",
            desktopCols[items.length] ?? "lg:grid-cols-4",
          )}
        >
          {items.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse items-center text-center"
            >
              <dt className="mt-2.5 text-[0.95rem] text-text-muted text-balance">
                {stat.label}
              </dt>
              <dd className="whitespace-nowrap text-[clamp(2.2rem,4vw,3.2rem)] font-semibold leading-[1.1] tracking-[-0.02em]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
