import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Media } from "@/types/common";

type PartnerLogosProps = {
  logos: Media[];
  className?: string;
};

/**
 * Partner logos, used on Home (OEM section) and About.
 * One item  → shown as a single banner image (current combined banner).
 * Many items → logo grid (preferred: editable per partner, sharper, own alt text).
 */
export function PartnerLogos({ logos, className }: PartnerLogosProps) {
  if (logos.length === 0) return null;

  if (logos.length === 1) {
    const logo = logos[0];
    return (
      <div
        className={cn(
          "mx-auto grid min-h-[200px] max-w-[1000px] place-items-center rounded-[18px] bg-surface-dim p-[clamp(28px,4vw,52px)]",
          className,
        )}
      >
        <Image
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
          sizes="(min-width: 1080px) 900px, 90vw"
          className="h-auto w-full object-contain"
        />
      </div>
    );
  }

  return (
    <ul
      className={cn(
        "mx-auto grid max-w-[1000px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4",
        className,
      )}
    >
      {logos.map((logo) => (
        <li
          key={logo.src}
          className="flex h-28 items-center justify-center rounded-[18px] bg-surface-dim px-6"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            sizes="200px"
            className="h-auto max-h-12 w-auto object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
