import Image from "next/image";
import { ChevronLink } from "@/components/shared/ChevronLink";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import type { AccessoryCardData } from "@/types/home";

/** Compact cards for add-ons (Home Load Balancer, EVCC): text left, small photo right. */
export function AccessoryCards({ items }: { items: AccessoryCardData[] }) {
  if (items.length === 0) return null;

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <article
          key={item.title}
          className="grid grid-cols-[1fr_96px] items-center gap-5 bg-surface-dim px-[clamp(24px,4vw,48px)] py-8 sm:grid-cols-[1fr_160px]"
        >
          <div>
            {item.kicker && (
              <p className="text-[0.9rem] font-semibold text-accent-text">
                {item.kicker}
              </p>
            )}
            <h3 className="mt-1 text-[1.35rem] font-semibold leading-snug">
              {item.title}
            </h3>
            <p className="mt-1.5 text-[0.95rem] text-text-muted text-pretty">
              {item.body}
            </p>
            <p className="mt-3">
              <ChevronLink href={item.link.href} className="text-[0.95rem]">
                {item.link.label}
              </ChevronLink>
            </p>
          </div>

          {item.image ? (
            <Image
              src={item.image.src}
              alt={item.image.alt}
              width={item.image.width}
              height={item.image.height}
              sizes="160px"
              className="mx-auto h-auto max-h-32 w-auto object-contain mix-blend-multiply"
            />
          ) : (
            <ImagePlaceholder label="ภาพสินค้า" className="h-32" />
          )}
        </article>
      ))}
    </div>
  );
}
