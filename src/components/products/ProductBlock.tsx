import { Check } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/shared/Button";
import { ImagePlaceholder } from "@/components/shared/ImagePlaceholder";
import { cn } from "@/lib/utils";
import type { ProductDetail } from "@/types/products";

type ProductBlockProps = {
  product: ProductDetail;
  /** Alternate sides down the page */
  reversed?: boolean;
};

/** One charger: photo on one side, details on the other. Stacks below lg. */
export function ProductBlock({ product, reversed }: ProductBlockProps) {
  return (
    <article className="grid items-center gap-[clamp(28px,5vw,72px)] lg:grid-cols-2">
      <div
        className={cn(
          "flex items-center justify-center rounded-[18px] bg-surface-dim p-8",
          reversed && "lg:order-2",
        )}
      >
        {product.image ? (
          <Image
            src={product.image.src}
            alt={product.image.alt}
            width={product.image.width}
            height={product.image.height}
            sizes="(min-width: 1024px) 45vw, 90vw"
            className="h-auto max-h-[420px] w-auto object-contain mix-blend-multiply"
          />
        ) : (
          <ImagePlaceholder
            label={`ภาพสินค้า: ${product.name}`}
            className="aspect-square w-full max-w-[320px]"
          />
        )}
      </div>

      <div>
        {product.kicker && (
          <p className="text-[0.9rem] font-semibold text-accent-text">
            {product.kicker}
          </p>
        )}
        <h3 className="mt-1.5 text-[clamp(1.8rem,3vw,2.4rem)] font-semibold leading-[1.15] tracking-[-0.02em]">
          {product.name}
        </h3>
        <p className="mt-2 text-[1.1rem] text-text-muted text-pretty">
          {product.tagline}
        </p>

        {product.features.length > 0 && (
          <ul className="mt-6 grid gap-2.5">
            {product.features.map((feature) => (
              <li key={feature} className="flex gap-2.5 text-[0.98rem]">
                <Check
                  size={18}
                  strokeWidth={2}
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-accent-text"
                />
                <span className="text-pretty">{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {product.specs && product.specs.length > 0 && (
          <dl className="mt-7 border-t border-border">
            {product.specs.map((spec) => (
              <div
                key={spec.label}
                className="flex flex-wrap justify-between gap-x-6 gap-y-1 border-b border-border py-3"
              >
                <dt className="text-[0.9rem] text-text-muted">{spec.label}</dt>
                <dd className="text-[0.95rem] font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
        )}

        {product.audience && (
          <p className="mt-5 text-[0.9rem] text-text-muted">
            <span className="font-medium text-text">เหมาะสำหรับ </span>
            {product.audience}
          </p>
        )}

        {product.cta && (
          <Button href={product.cta.href} className="mt-7">
            {product.cta.label}
          </Button>
        )}
      </div>
    </article>
  );
}
