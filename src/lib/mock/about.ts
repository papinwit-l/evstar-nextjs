import type { CtaData, HighlightsData } from "@/types/common";
import type { AboutHeroData, StoryData } from "@/types/about";

export const aboutHero: AboutHeroData = {
  kicker: "EVSTAR SOLUTIONS × ChargeCore",
  title: "Driving the Future\nwith ChargeCore",
  lead: "ผู้เชี่ยวชาญด้านระบบสถานีอัดประจุไฟฟ้า ตัวแทนจำหน่ายอย่างเป็นทางการของ ChargeCore Global ในประเทศไทย",
  // TODO: wide photo from the client — team, office, or a finished installation (21:9)
  image: undefined,
};

export const aboutStory: StoryData = {
  kicker: "เรื่องราวของเรา",
  title: "ยกระดับโครงสร้างพื้นฐาน\nด้าน EV ของไทย",
  paragraphs: [
    "บริษัท อีวีสตาร์ โซลูชั่น จำกัด คือผู้เชี่ยวชาญด้านระบบสถานีอัดประจุไฟฟ้า ที่มุ่งมั่นยกระดับโครงสร้างพื้นฐานด้าน EV ของประเทศไทย เราได้รับความไว้วางใจให้เป็นตัวแทนจำหน่ายอย่างเป็นทางการของ ChargeCore Global แบรนด์เทคโนโลยีสถานีชาร์จชั้นนำระดับโลก",
    "ความร่วมมือระหว่าง EVSTAR x ChargeCore ทำให้เราส่งมอบเครื่องชาร์จที่ทันสมัยทั้ง AC และ DC Fast Charger ที่โดดเด่นด้านความอัจฉริยะและความปลอดภัย พร้อมบริการแบบครบวงจร โดยทีมวิศวกรคนไทยที่มีประสบการณ์",
  ],
  image: undefined,
};

/**
 * Facts about ChargeCore, published by ChargeCore itself.
 * The lead says so, because these are the brand's claims, not EVSTAR's.
 * TODO: ask the client to confirm the figures against their partner materials.
 */
export const aboutWhy: HighlightsData = {
  title: "แบรนด์ที่เราเลือกเป็นตัวแทน",
  lead: "ข้อมูลจาก ChargeCore Global",
  items: [
    {
      value: "2015",
      title: "ประสบการณ์ระดับโลก",
      body: "พัฒนาเครื่องชาร์จมาตั้งแต่ปี 2015 ภายใต้ Nanjing PowerCore Technology",
    },
    {
      value: "50+",
      title: "ประเทศที่ส่งออก",
      body: "ใช้งานในเอเชียตะวันออกเฉียงใต้ ยุโรป และอเมริกาเหนือ",
    },
    {
      value: "TÜV · CE",
      title: "มาตรฐานสากล",
      body: "ผ่านการรับรองจาก TÜV Rheinland และ TÜV SÜD",
    },
    {
      value: "OCPP",
      title: "แพลตฟอร์มเปิด",
      body: "เชื่อมต่อระบบจัดการหลังบ้าน และอัปเดตซอฟต์แวร์แบบ OTA",
    },
  ],
};

export const aboutCta: CtaData = {
  title: "อยากร่วมงาน\nกับ EVSTAR",
  lead: "ติดตั้งเครื่องชาร์จที่บ้าน\nหรือวางระบบสถานีชาร์จสำหรับธุรกิจ",
  primary: { label: "ขอใบเสนอราคา", href: "/quote" },
  secondary: { label: "ดูบริการทั้งหมด", href: "/services" },
  showLine: true,
};
