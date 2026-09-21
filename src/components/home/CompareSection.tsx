import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { Container } from "@/components/shared/Container";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import type { CompareData } from "@/types/home";

/** Rows above the specs in each column: image, title, subtitle, buttons */
const HEAD_ROWS = 4;

/**
 * "Which one is right for you" — side-by-side columns whose rows line up.
 * Each column is a CSS subgrid over the same rows, so a spec value that
 * wraps to two lines in one column pushes the matching row in the other
 * column down too (like Apple's compare pages).
 */
export function CompareSection({ data }: { data: CompareData }) {
  const specRows = Math.max(...data.columns.map((c) => c.specs.length));
  const totalRows = HEAD_ROWS + specRows;

  return (
    <section aria-labelledby="compare-title" className="py-(--section-py)">
      <Container>
        <SectionHeading
          id="compare-title"
          title={data.title}
          lead={data.lead}
        />

        <div className="mx-auto mt-16 grid max-w-[920px] gap-x-[clamp(24px,5vw,72px)] md:grid-cols-2">
          {data.columns.map((col, i) => (
            <article
              key={col.title}
              style={{ gridRow: `span ${totalRows}` }}
              className={cn(
                "grid grid-rows-subgrid justify-items-center text-center",
                i > 0 && "max-md:mt-20",
              )}
            >
              <div className="flex h-[220px] items-end justify-center">
                <Image
                  src={col.image.src}
                  alt={col.image.alt}
                  width={col.image.width}
                  height={col.image.height}
                  sizes="240px"
                  className="h-auto max-h-full w-auto object-contain"
                />
              </div>

              <h3 className="mt-7 text-[1.6rem] font-semibold leading-tight">
                {col.title}
              </h3>
              <p className="mt-1 text-text-muted">{col.subtitle}</p>

              <div className="mt-[18px] flex flex-wrap justify-center gap-3">
                <Button href={col.primary.href} size="sm">
                  {col.primary.label}
                </Button>
                {col.secondary && (
                  <Button href={col.secondary.href} variant="outline" size="sm">
                    {col.secondary.label}
                  </Button>
                )}
              </div>

              <dl
                style={{ gridRow: `span ${specRows}` }}
                className="mt-9 grid w-full grid-rows-subgrid border-t border-border"
              >
                {col.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="border-b border-border py-[18px]"
                  >
                    <dt className="text-[0.82rem] text-text-muted">
                      {spec.label}
                    </dt>
                    <dd className="mt-1 font-medium leading-normal">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
