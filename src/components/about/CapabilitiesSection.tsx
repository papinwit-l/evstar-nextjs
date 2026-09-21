import Image from "next/image";
import { Container } from "@/components/shared/Container";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { SectionHeading } from "@/components/shared/SectionHeading";
import type { CapabilitiesData } from "@/types/about";

/** Three grey cards: text on top, photo filling the bottom edge. */
export function CapabilitiesSection({ data }: { data: CapabilitiesData }) {
  return (
    <section aria-labelledby="capabilities-title" className="py-(--section-py)">
      <Container>
        <SectionHeading
          id="capabilities-title"
          title={data.title}
          lead={data.lead}
        />

        <ul className="mt-16 grid gap-3 lg:grid-cols-3">
          {data.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col overflow-hidden rounded-[18px] bg-surface-dim"
            >
              <div className="px-[clamp(24px,3vw,36px)] pt-[clamp(24px,3vw,36px)]">
                <h3 className="text-[clamp(1.4rem,2vw,1.7rem)] font-semibold leading-[1.25]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-[0.98rem] text-text-muted text-pretty">
                  {item.body}
                </p>
              </div>

              {/* mt-auto keeps photos aligned when body text lengths differ */}
              <div className="mt-auto pt-7">
                {item.image ? (
                  <div className="relative aspect-[4/3] bg-surface-deep">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <ImagePlaceholder
                    label={`ภาพประกอบ: ${item.title}`}
                    variant="flush"
                    className="aspect-[4/3]"
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
