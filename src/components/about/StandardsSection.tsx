import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { StandardsData } from "@/types/about";

/**
 * Certificates and awards as small cards.
 * No bottom padding: PartnersSection follows on the same white background.
 */
export function StandardsSection({ data }: { data: StandardsData }) {
  if (data.items.length === 0) return null;

  return (
    <section aria-labelledby="standards-title" className="pt-(--section-py)">
      <Container>
        <SectionHeading
          id="standards-title"
          title={data.title}
          lead={data.lead}
        />

        <ul className="mx-auto mt-12 grid max-w-[1000px] grid-cols-2 gap-3 lg:grid-cols-4">
          {data.items.map((item) => (
            <li
              key={item.name}
              className="flex flex-col items-center gap-3.5 rounded-[18px] bg-surface-dim px-5 py-7 text-center"
            >
              {item.logo ? (
                <Image
                  src={item.logo.src}
                  alt=""
                  width={item.logo.width}
                  height={item.logo.height}
                  sizes="64px"
                  className="size-16 object-contain"
                />
              ) : (
                <ImagePlaceholder label="โลโก้" className="size-16" />
              )}
              <div>
                <h3 className="text-[1rem] font-semibold leading-[1.35] text-balance">
                  {item.name}
                </h3>
                {item.note && (
                  <p className="mt-1 text-[0.82rem] text-text-muted">
                    {item.note}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
