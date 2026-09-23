import { ProductTile } from "@/components/home/ProductTile";
import type { ProductTileData } from "@/types/home";

/** 2-up grid of grey product tiles. */
export function ProductGrid({ items }: { items: ProductTileData[] }) {
  if (items.length === 0) return null;

  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <ProductTile key={item.primary.href} data={item} variant="grid" />
      ))}
    </div>
  );
}
