import { AccessoryBlock } from "@/components/products/AccessoryBlock";
import { ProductBlock } from "@/components/products/ProductBlock";
import { Container } from "@/components/shared/Container";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types/products";

/**
 * One category. Chargers get full blocks with specs; accessories (no specs)
 * get simple cards side by side.
 * scroll-mt clears both the site header and the sticky category nav.
 */
export function CategorySection({
  category,
  alt,
}: {
  category: ProductCategory;
  /** Tints every other section so the categories read as separate */
  alt?: boolean;
}) {
  if (category.products.length === 0) return null;
  const simple = category.products.every((product) => !product.specs);

  return (
    <section
      id={category.id}
      aria-labelledby={`${category.id}-title`}
      className={cn(
        "scroll-mt-[calc(var(--header-height)+48px)] py-(--band-py)",
        alt && "bg-surface-dim",
      )}
    >
      <Container>
        <h2
          id={`${category.id}-title`}
          className="text-[clamp(1.7rem,3.2vw,2.4rem)] font-semibold leading-[1.2] tracking-[-0.015em] text-balance"
        >
          {category.title}
        </h2>
        {category.lead && (
          <p className="mt-3 max-w-[52ch] text-[1.1rem] text-text-muted text-pretty">
            {category.lead}
          </p>
        )}

        {simple ? (
          <div className="mt-10 grid gap-3 md:grid-cols-2">
            {category.products.map((product) => (
              <AccessoryBlock key={product.name} product={product} />
            ))}
          </div>
        ) : (
          <div className="mt-12 grid gap-(--band-py)">
            {category.products.map((product, i) => (
              <ProductBlock
                key={product.name}
                product={product}
                reversed={i % 2 === 1}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
