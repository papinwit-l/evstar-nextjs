import type { Metadata } from "next";
import { PortfolioFilters } from "@/components/portfolio/PortfolioFilters";
import { CaseCard } from "@/components/shared/CaseCard";
import { Container } from "@/components/shared/Container";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHero } from "@/components/shared/PageHero";
import { getPortfolioPage } from "@/lib/api/portfolio";

export const metadata: Metadata = {
  title: "ผลงานการติดตั้ง",
  description:
    "ตัวอย่างงานติดตั้งเครื่องชาร์จรถยนต์ไฟฟ้า ChargeCore โดย EVSTAR SOLUTIONS ทั้งบ้าน คอนโด อาคารสำนักงาน โรงงาน และสถานีชาร์จ",
};

type PortfolioPageProps = {
  searchParams: Promise<{ type?: string }>;
};

export default async function PortfolioPage({
  searchParams,
}: PortfolioPageProps) {
  const { type } = await searchParams;
  const data = await getPortfolioPage();

  // Unknown ?type= values fall back to showing everything
  const known = data.filters.some((filter) => filter.value === type);
  const active = known ? type : undefined;
  const cases = active
    ? data.cases.filter((item) => item.filter === active)
    : data.cases;

  return (
    <>
      <PageHero title={data.title} lead={data.lead} />

      <section aria-label="รายการผลงาน" className="pb-(--band-py)">
        <Container>
          {data.cases.length > 0 && (
            <PortfolioFilters filters={data.filters} active={active} />
          )}

          {cases.length > 0 ? (
            <ul className="mt-9 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {cases.map((item, i) => (
                <li key={`${item.title}-${item.type}-${i}`}>
                  <CaseCard item={item} headingLevel="h2" zoomable />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-12 rounded-[18px] bg-surface-dim px-6 py-16 text-center text-text-muted">
              {data.cases.length === 0
                ? "กำลังรวบรวมผลงานการติดตั้ง ติดต่อทีมงานเพื่อขอดูตัวอย่างงานจริงได้"
                : "ยังไม่มีผลงานในหมวดนี้"}
            </p>
          )}
        </Container>
      </section>

      <CtaSection data={data.cta} />
    </>
  );
}
