import { ChargeLine } from "@/components/home/ChargeLine";
import { ProductTile } from "@/components/home/ProductTile";
import type { HeroData } from "@/types/home";

export function HeroSection({ data }: { data: HeroData }) {
  return (
    <ProductTile data={data} variant="hero">
      {data.chargeLine && <ChargeLine {...data.chargeLine} />}
    </ProductTile>
  );
}
