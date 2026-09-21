import { ChargeLine } from "@/components/home/ChargeLine";
import { ProductTile } from "@/components/home/ProductTile";
import type { ProductTileData } from "@/types/home";

export function HeroSection({ data }: { data: ProductTileData }) {
  return (
    <ProductTile data={data} variant="hero">
      <ChargeLine />
    </ProductTile>
  );
}
