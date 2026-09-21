import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { CapabilitiesSection } from "@/components/about/CapabilitiesSection";
import { MilestonesSection } from "@/components/about/MilestonesSection";
import { PartnersSection } from "@/components/about/PartnersSection";
import { StandardsSection } from "@/components/about/StandardsSection";
import { StatsSection } from "@/components/about/StatsSection";
import { StorySection } from "@/components/about/StorySection";
import { CtaSection } from "@/components/shared/CtaSection";
import { getAboutPage } from "@/lib/api/about";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description:
    "EV Star ผลิต จัดจำหน่าย และติดตั้งเครื่องชาร์จรถยนต์ไฟฟ้า สำหรับบ้าน ธุรกิจ และสถานีชาร์จสาธารณะ พร้อมรับผลิตแบบ OEM",
};

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <>
      <AboutHero data={about.hero} />
      <StatsSection items={about.stats} />
      <StorySection data={about.story} />
      <CapabilitiesSection data={about.capabilities} />
      <MilestonesSection data={about.milestones} />
      <StandardsSection data={about.standards} />
      <PartnersSection data={about.partners} />
      <CtaSection data={about.cta} />
    </>
  );
}
