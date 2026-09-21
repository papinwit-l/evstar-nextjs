import { ChevronLink } from "@/components/shared/ChevronLink";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { HighlightsData } from "@/types/home";

/** Service promise as big typographic values — Apple product-page style, no icons. */
export function HighlightsSection({ data }: { data: HighlightsData }) {
  return (
    <section
      aria-labelledby="highlights-title"
      className="bg-surface-dim py-(--section-py)"
    >
      <Container>
        <SectionHeading id="highlights-title" title={data.title} />

        <ul className="mt-16 grid gap-x-[clamp(28px,4vw,56px)] gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {data.items.map((item) => (
            <li key={item.title} className="text-center">
              <p className="text-[clamp(2rem,3.4vw,2.8rem)] font-semibold leading-[1.1] tracking-[-0.02em] whitespace-nowrap">
                {item.value}
              </p>
              <h3 className="mt-3 text-[1.05rem] font-semibold">
                {item.title}
              </h3>
              <p className="mx-auto mt-1.5 max-w-[28ch] text-[0.92rem] leading-[1.6] text-text-muted text-balance">
                {item.body}
              </p>
            </li>
          ))}
        </ul>

        {data.link && (
          <p className="pt-14 text-center text-[1.05rem]">
            <ChevronLink href={data.link.href}>{data.link.label}</ChevronLink>
          </p>
        )}
      </Container>
    </section>
  );
}
