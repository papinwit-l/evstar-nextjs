import type { AboutHeroData, Stat } from "@/types/about";

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
