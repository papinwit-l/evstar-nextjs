import type { Metadata } from "next";
import { CategorySection } from "@/components/products/CategorySection";
import { CategoryNav } from "@/components/products/CategoryNav";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHero } from "@/components/shared/PageHero";
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
      <PageHero title={data.title} lead={data.lead} />
      <CategoryNav categories={data.categories} />
      {data.categories.map((category, i) => (
        <CategorySection
          key={category.id}
          category={category}
          alt={i % 2 === 1}
        />
      ))}

      <CtaSection data={data.cta} />
    </>
  );
}
