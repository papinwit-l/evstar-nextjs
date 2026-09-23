import type { Metadata } from "next";
import { ServiceList } from "@/components/services/ServiceList";
import { CtaSection } from "@/components/shared/CtaSection";
import { PageHero } from "@/components/shared/PageHero";
import { StepsSection } from "@/components/shared/StepsSection";
import { getServicesPage } from "@/lib/api/services";

export const metadata: Metadata = {
  title: "บริการ",
  description:
    "บริการออกแบบ ติดตั้ง และดูแลสถานีชาร์จ ChargeCore ตามมาตรฐาน MEA และ PEA พร้อมระบบ OCPP และบริการตรวจเช็กบำรุงรักษาโดย EVSTAR SOLUTIONS",
};

export default async function ServicesPage() {
  const data = await getServicesPage();

  return (
    <>
      <PageHero title={data.title} lead={data.lead} />
      <ServiceList items={data.services} />
      <StepsSection data={data.process} className="bg-surface-dim" />
      <CtaSection data={data.cta} />
    </>
  );
}
