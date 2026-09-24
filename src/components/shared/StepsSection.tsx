import { ChevronRight } from "lucide-react";
import { ChevronLink } from "@/components/shared/ChevronLink";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import type { StepsData } from "@/types/common";

/**
 * Numbered process steps. Shared: the home page passes one-line bodies,
 * /services passes fuller text for the same four steps.
 */
export function StepsSection({
  data,
  className,
}: {
  data: StepsData;
  className?: string;
}) {
  if (data.steps.length === 0) return null;

  // Matches the lg:grid-cols-4 below — used to hide the arrow at row ends
  const columns = 4;
  const lastIndex = data.steps.length - 1;

  return (
    <section
      id="process"
      aria-labelledby="process-title"
      className={cn("scroll-mt-(--header-height) py-(--section-py)", className)}
    >
      <Container>
        <SectionHeading
          id="process-title"
          title={data.title}
          lead={data.lead}
        />

        <ol className="mt-16 grid gap-x-[clamp(28px,4vw,56px)] gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {data.steps.map((step, i) => (
            <li
              key={step.title}
              className="relative border-t border-border pt-5"
            >
              {/* Flow arrow, desktop only: the numbers carry the order elsewhere */}
              {i !== lastIndex && (i + 1) % columns !== 0 && (
                <ChevronRight
                  size={22}
                  strokeWidth={2.25}
                  aria-hidden="true"
                  className="absolute -right-5 top-3.5 hidden text-text-subtle lg:block"
                />
              )}
              <p className="text-[0.82rem] font-semibold text-accent-text">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-[1.25rem] font-semibold leading-snug">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[0.95rem] leading-[1.6] text-text-muted text-pretty">
                {step.body}
              </p>
            </li>
          ))}
        </ol>

        {data.link && (
          <p className="pt-14 text-center text-[1.05rem]">
            <ChevronLink href={data.link.href}>{data.link.label}</ChevronLink>
          </p>
        )}
      </Container>
    </section>
  );
}
