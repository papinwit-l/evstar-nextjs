import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { StorySection } from "@/components/about/StorySection";
import { CtaSection } from "@/components/shared/CtaSection";
import { HighlightsSection } from "@/components/shared/HighlightsSection";
import { getAboutPage } from "@/lib/api/about";

export const metadata: Metadata = {
  title: "เกี่ยวกับเรา",
  description:
    "EVSTAR SOLUTIONS ตัวแทนจำหน่ายและติดตั้งสถานีชาร์จ ChargeCore อย่างเป็นทางการ พร้อมบริการครบวงจรโดยทีมวิศวกรคนไทย",
};

export default async function AboutPage() {
  const about = await getAboutPage();

  return (
    <>
      <AboutHero data={about.hero} />
      <StorySection data={about.story} />
      <HighlightsSection data={about.why} id="why" className="bg-surface" />
      <CtaSection data={about.cta} />
    </>
  );
}
