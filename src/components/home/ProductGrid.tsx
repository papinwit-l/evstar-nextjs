import { ProductTile } from "@/components/home/ProductTile";
import { ChevronLink } from "@/components/shared/ChevronLink";
import type { LinkField, ProductTileData } from "@/types/home";

type ProductGridProps = {
  items: ProductTileData[];
  moreLink?: LinkField;
};

/** 2×2 grid of grey product tiles, with a link to the full product list below. */
export function ProductGrid({ items, moreLink }: ProductGridProps) {
  return (
    <div>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <ProductTile key={item.primary.href} data={item} variant="grid" />
        ))}
      </div>

      {moreLink && (
        <p className="pt-9 text-center text-[1.05rem]">
          <ChevronLink href={moreLink.href}>{moreLink.label}</ChevronLink>
        </p>
      )}
    </div>
  );
}
