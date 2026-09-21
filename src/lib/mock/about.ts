import { oem } from "@/lib/mock/home";
import type { CtaData } from "@/types/common";
import type {
  AboutHeroData,
  CapabilitiesData,
  MilestonesData,
  PartnersData,
  Stat,
  StandardsData,
  StoryData,
} from "@/types/about";

export const aboutHero: AboutHeroData = {
  kicker: "เกี่ยวกับ EV Star",
  title: "เครื่องชาร์จที่ออกแบบ\nเพื่อการใช้งานจริง",
  lead: "EV Star ผลิต จัดจำหน่าย และติดตั้งเครื่องชาร์จรถยนต์ไฟฟ้า สำหรับบ้าน ธุรกิจ และสถานีชาร์จสาธารณะ พร้อมรับผลิตแบบ OEM ให้แบรนด์ชั้นนำ",
  // TODO: wide factory/team photo from the client (21:9, at least 2400px wide)
  image: undefined,
};

export const aboutStats: Stat[] = [
  // TODO: confirm both figures with the client (or remove until known)
  { value: "XX ปี", label: "ประสบการณ์ด้านระบบไฟฟ้า" },
  { value: "X,XXX+", label: "จุดติดตั้งทั่วประเทศ" },
  { value: "7 รุ่น", label: "เครื่องชาร์จ AC และ DC" },
  { value: "240 kW", label: "กำลังชาร์จสูงสุด" },
];

export const aboutStory: StoryData = {
  kicker: "เรื่องราวของเรา",
  title: "เริ่มจากความเชื่อ\nว่ารถไฟฟ้า\nต้องชาร์จได้ง่าย",
  paragraphs: [
    // TODO: founding year and real story from the client
    "EV Star ก่อตั้งเมื่อปี XXXX โดยทีมวิศวกรที่ต้องการให้คนไทยเข้าถึงการชาร์จรถยนต์ไฟฟ้าที่ปลอดภัย และใช้งานง่ายเหมือนเสียบปลั๊กทั่วไป",
    "จากเครื่องชาร์จสำหรับบ้าน สู่สถานีชาร์จเร็วสำหรับธุรกิจ เราดูแลตั้งแต่การออกแบบ การผลิต ไปจนถึงการติดตั้งและบริการหลังการขาย",
  ],
  image: undefined,
};

export const aboutCapabilities: CapabilitiesData = {
  title: "ครบทุกขั้นตอน\nในที่เดียว",
  lead: "ควบคุมคุณภาพเองทั้งหมด ตั้งแต่แบบร่างแรก จนถึงวันที่เครื่องชาร์จเริ่มทำงานที่หน้างานของคุณ",
  // TODO: photos of the production line, testing and installation team
  items: [
    {
      title: "ออกแบบและผลิต",
      body: "ออกแบบวงจร งานแม่พิมพ์ และประกอบ ทั้งสินค้าของเราเองและงาน OEM",
    },
    {
      title: "ทดสอบตามมาตรฐาน",
      body: "ทดสอบทุกเครื่องก่อนส่งมอบ รองรับมาตรฐานยุโรป อเมริกา และญี่ปุ่น",
    },
    {
      title: "ติดตั้งและดูแล",
      body: "ทีมช่างทั่วประเทศ รับประกัน 3 ปี และดูแลหลังการขายตลอดอายุการใช้งาน",
    },
  ],
};

// TODO: every year and event is an example structure — replace with the client's history
export const aboutMilestones: MilestonesData = {
  title: "เส้นทางของเรา",
  items: [
    { year: "XXXX", title: "ก่อตั้งบริษัท", body: "[รายละเอียด]" },
    { year: "XXXX", title: "เริ่มรับผลิตแบบ OEM", body: "[รายละเอียด]" },
    { year: "XXXX", title: "เปิดตัวเครื่องชาร์จ DC", body: "[รายละเอียด]" },
    {
      year: "XXXX",
      title: "LPC ได้รับรางวัล MUSE Design Awards",
      body: "[รายละเอียด]",
    },
  ],
};

export const aboutStandards: StandardsData = {
  title: "มาตรฐานและรางวัล",
  lead: "เครื่องชาร์จทุกรุ่นผ่านการรับรองจากหน่วยงานที่เชื่อถือได้",
  items: [
    // TODO: real certificate names + logos from the client
    { name: "[มาตรฐาน 1]", note: "ใบรับรอง" },
    { name: "[มาตรฐาน 2]", note: "ใบรับรอง" },
    { name: "[มาตรฐาน 3]", note: "ใบรับรอง" },
    { name: "MUSE Design Awards", note: "รางวัลการออกแบบ LPC" },
  ],
};

export const aboutPartners: PartnersData = {
  title: "ได้รับความไว้วางใจจากแบรนด์ชั้นนำ",
  // Same logos as the home OEM section. In WordPress, keep partner logos in
  // ONE place (options page or a "partner" post type) and read them on both pages.
  logos: oem.logos,
};

export const aboutCta: CtaData = {
  title: "อยากร่วมงาน\nกับ EV Star",
  lead: "ติดตั้งเครื่องชาร์จที่บ้านหรือธุรกิจ หรือพัฒนาเครื่องชาร์จแบรนด์ของคุณเองกับเรา",
  primary: { label: "ติดต่อเรา", href: "/contact" },
  secondary: { label: "ร่วมเป็นพาร์ทเนอร์ OEM", href: "/oem" },
};
