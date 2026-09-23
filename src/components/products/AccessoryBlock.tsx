import { Check } from "lucide-react";
import { ChevronLink } from "@/components/shared/ChevronLink";
import type { ProductDetail } from "@/types/products";

/** Accessories have no specs or photos yet — a simple card is enough. */
export function AccessoryBlock({ product }: { product: ProductDetail }) {
  return (
    <article className="rounded-[18px] bg-surface-dim p-[clamp(24px,3vw,40px)]">
      <h3 className="text-[1.35rem] font-semibold leading-snug">
        {product.name}
      </h3>
      <p className="mt-1.5 text-text-muted text-pretty">{product.tagline}</p>

      <ul className="mt-5 grid gap-2.5">
        {product.features.map((feature) => (
          <li key={feature} className="flex gap-2.5 text-[0.95rem]">
            <Check
              size={17}
              strokeWidth={2}
              aria-hidden="true"
              className="mt-1 shrink-0 text-accent-text"
            />
            <span className="text-pretty">{feature}</span>
          </li>
        ))}
      </ul>

      {product.cta && (
        <p className="mt-6">
          <ChevronLink href={product.cta.href}>{product.cta.label}</ChevronLink>
        </p>
      )}
    </article>
  );
}
