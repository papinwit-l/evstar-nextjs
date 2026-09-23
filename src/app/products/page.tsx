import type { Metadata } from "next";
import { CategoryNav } from "@/components/products/CategoryNav";
import { ProductsHero } from "@/components/products/ProductsHero";
import { getProductsPage } from "@/lib/api/products";

export const metadata: Metadata = {
  title: "สินค้า",
  description:
    "เครื่องชาร์จรถยนต์ไฟฟ้า ChargeCore ทั้ง AC สำหรับบ้านและธุรกิจ, DC Fast Charger 60–240 kW และอุปกรณ์เสริม จำหน่ายและติดตั้งโดย EVSTAR SOLUTIONS",
};

export default async function ProductsPage() {
  const data = await getProductsPage();

  return (
    <>
      <ProductsHero title={data.title} lead={data.lead} />
      <CategoryNav categories={data.categories} />
      {/* next: one section per category */}
    </>
  );
}
