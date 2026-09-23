import Image from "next/image";
import Link from "next/link";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import type { CaseCardData } from "@/types/portfolio";

type CaseCardProps = {
  item: CaseCardData;
  /** h3 under a section heading (home); h2 on the /portfolio listing */
  headingLevel?: "h2" | "h3";
};

/** One installation case: photo, site type + model, then project and location. */
export function CaseCard({ item, headingLevel = "h3" }: CaseCardProps) {
  const Heading = headingLevel;

  const body = (
    <>
      {item.image ? (
        <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-surface-dim">
          <Image
            src={item.image.src}
            alt={item.image.alt}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none"
          />
        </div>
      ) : (
        <ImagePlaceholder label="ภาพหน้างานจริง" className="aspect-[4/3]" />
      )}

      <p className="mt-4 text-[0.82rem] font-semibold text-text-muted">
        {item.type}
      </p>
      <Heading className="mt-1 text-[1.15rem] font-semibold leading-[1.4] text-balance group-hover:underline group-hover:underline-offset-[3px]">
        {item.title}
        {item.location && (
          <span className="font-normal text-text-muted">
            {" "}
            · {item.location}
          </span>
        )}
      </Heading>
    </>
  );

  // No detail pages yet: render a plain card until href exists
  return item.href ? (
    <Link href={item.href} className="group block">
      {body}
    </Link>
  ) : (
    <div className="group">{body}</div>
  );
}
