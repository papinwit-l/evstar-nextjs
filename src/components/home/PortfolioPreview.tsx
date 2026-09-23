import { CaseCard } from "@/components/shared/CaseCard";
import { ChevronLink } from "@/components/shared/ChevronLink";
import { Container } from "@/components/shared/Container";
import type { PortfolioPreviewData } from "@/types/portfolio";

/** Recent installations + one customer review. Proof that they do the work. */
export function PortfolioPreview({ data }: { data: PortfolioPreviewData }) {
  if (data.cases.length === 0) return null;

  return (
    <section aria-labelledby="portfolio-title" className="py-(--section-py)">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-5">
          <h2
            id="portfolio-title"
            className="text-[clamp(1.8rem,3.4vw,2.5rem)] font-semibold leading-[1.2] tracking-[-0.015em]"
          >
            {data.title}
          </h2>
          <ChevronLink href="/portfolio">ดูผลงานทั้งหมด</ChevronLink>
        </div>

        <ul className="mt-9 grid gap-x-6 gap-y-10 md:grid-cols-3">
          {data.cases.map((item) => (
            <li key={`${item.type}-${item.title}`}>
              <CaseCard item={item} />
            </li>
          ))}
        </ul>

        {data.review && (
          <figure className="mt-12 grid gap-7 rounded-[18px] bg-surface-dim p-[clamp(28px,4vw,48px)] sm:grid-cols-[auto_1fr]">
            <span
              aria-hidden="true"
              className="text-[3.4rem] font-bold leading-[0.8] text-accent"
            >
              &ldquo;
            </span>
            <div>
              <blockquote className="text-[clamp(1.1rem,1.8vw,1.4rem)] leading-[1.55] text-pretty">
                {data.review.quote}
              </blockquote>
              <figcaption className="mt-3.5 text-[0.9rem] text-text-muted">
                {data.review.author}
                {data.review.context && ` · ${data.review.context}`}
              </figcaption>
            </div>
          </figure>
        )}
      </Container>
    </section>
  );
}
