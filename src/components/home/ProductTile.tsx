import Image from "next/image";
import type { ReactNode } from "react";
import { Button } from "@/components/shared/Button";
import { Phrases } from "@/components/shared/Phrases";
import { cn } from "@/lib/utils";
import type { ProductTileData } from "@/types/home";

type ProductTileProps = {
  data: ProductTileData;
  /**
   * hero = first tile, white, page <h1>, loads image eagerly
   * dark = black full-width tile
   * grid = grey half-width tile in the 2×2 grid
   */
  variant?: "hero" | "dark" | "grid";
  /** Extra content between the buttons and the image (e.g. <ChargeLine />) */
  children?: ReactNode;
};

const styles = {
  hero: {
    section:
      "bg-surface min-h-[calc(100svh-var(--header-height)-12px)] max-h-[900px]",
    // Min size keeps the longest nowrap phrase inside a 375px screen
    title: "text-[clamp(1.7rem,5.6vw,4rem)] tracking-[-0.025em] max-w-[16ch]",
    subtitle: "text-[clamp(1.05rem,1.8vw,1.4rem)] max-w-[34ch] text-text-muted",
    image: "max-h-[min(44vh,460px)]",
  },
  dark: {
    section: "bg-black text-surface-dim",
    title: "text-[clamp(2.3rem,5.4vw,3.6rem)]",
    subtitle: "text-[clamp(1.1rem,2vw,1.6rem)] max-w-[30ch]",
    image: "max-h-[min(52vh,480px)]",
  },
  grid: {
    section: "bg-surface-dim min-h-[520px] lg:min-h-[580px]",
    title: "text-[clamp(2rem,3.6vw,2.7rem)]",
    subtitle: "text-[clamp(1.05rem,1.5vw,1.25rem)] max-w-[28ch]",
    image: "max-h-80 mix-blend-multiply",
  },
};

export function ProductTile({
  data,
  variant = "grid",
  children,
}: ProductTileProps) {
  const s = styles[variant];
  const tone = variant === "dark" ? "dark" : "light";
  const Heading = variant === "hero" ? "h1" : "h2";

  return (
    <section
      className={cn(
        "relative flex flex-col items-center overflow-hidden px-(--page-px) pt-[clamp(44px,6vw,56px)] text-center",
        s.section,
      )}
    >
      {data.kicker && (
        <p
          className={cn(
            "mb-1.5 text-[0.9rem] font-semibold",
            tone === "dark" ? "text-accent-on-dark" : "text-accent-text",
          )}
        >
          {data.kicker}
        </p>
      )}

      <Heading
        className={cn(
          "font-semibold leading-[1.2] tracking-[-0.015em] text-balance",
          s.title,
        )}
      >
        <Phrases text={data.title} />
      </Heading>

      <p className={cn("mt-2 leading-[1.35] text-balance", s.subtitle)}>
        <Phrases text={data.subtitle} />
      </p>

      <div className="mt-[22px] flex flex-wrap justify-center gap-3.5">
        <Button
          href={data.primary.href}
          tone={tone}
          size={variant === "grid" ? "sm" : "md"}
        >
          {data.primary.label}
        </Button>
        {data.secondary && (
          <Button
            href={data.secondary.href}
            variant="outline"
            tone={tone}
            size={variant === "grid" ? "sm" : "md"}
          >
            {data.secondary.label}
          </Button>
        )}
      </div>

      {children}

      <div className="mt-auto flex w-full justify-center pt-8">
        <Image
          src={data.image.src}
          alt={data.image.alt}
          width={data.image.width}
          height={data.image.height}
          sizes="(min-width: 1024px) 480px, 80vw"
          loading={variant === "hero" ? "eager" : "lazy"}
          fetchPriority={variant === "hero" ? "high" : "auto"}
          className={cn("h-auto w-auto object-contain", s.image)}
        />
      </div>
    </section>
  );
}
