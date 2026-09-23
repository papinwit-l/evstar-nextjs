import type { ProductsPageData } from "@/types/products";

const IMG = "/images/products";

/**
 * Content from the client's product document.
 * TODO: full spec tables from ChargeCore datasheets; photos for both accessories.
 */
export const productsPage: ProductsPageData = {
  title: "เครื่องชาร์จ ChargeCore\nครบทุกการใช้งาน",
  lead: "ตั้งแต่ติดผนังที่บ้าน\nไปจนถึงสถานีชาร์จเร็ว 240 kW",
  categories: [
    {
      id: "home",
      label: "Home AC",
      title: "สำหรับบ้านพักอาศัย",
      lead: "ชาร์จข้ามคืนที่บ้าน ด้วยเครื่องชาร์จ AC ที่ออกแบบมาเพื่อบ้านโดยเฉพาะ",
      products: [
        {
          name: "AC006",
          kicker: "Smart Home AC · 7–22 kW",
          tagline: "Smart Wallbox ดีไซน์มินิมอล น้ำหนักเบา ติดตั้งง่าย",
          features: [
            "รองรับหัวชาร์จ Type 2 (และ Type 1, GB/T)",
            "สั่งการผ่านแอปมือถือ ตั้งเวลาชาร์จล่วงหน้า",
            "อัปเดตซอฟต์แวร์แบบ OTA",
          ],
          specs: [
            { label: "กำลังไฟ", value: "7 – 22 kW (AC)" },
            { label: "หัวชาร์จ", value: "Type 2, Type 1, GB/T" },
            { label: "การติดตั้ง", value: "ติดผนัง" },
            { label: "มาตรฐาน", value: "CE, TÜV" },
          ],
          audience: "บ้านเดี่ยว · ทาวน์โฮม · ลานจอดรถส่วนตัว",
          image: {
            src: `${IMG}/ac006.png`,
            alt: "ChargeCore AC006 Smart Wallbox",
            width: 800,
            height: 1000,
          },
          cta: { label: "ขอใบเสนอราคา", href: "/quote?model=ac006" },
        },
      ],
    },
    {
      id: "commercial",
      label: "Commercial AC",
      title: "สำหรับธุรกิจและพื้นที่เชิงพาณิชย์",
      lead: "เครื่องชาร์จ AC อเนกประสงค์ ทนทาน รองรับการเก็บค่าบริการ",
      products: [
        {
          name: "AC002",
          kicker: "Commercial AC · 7–43 kW",
          tagline: "ติดผนังหรือตั้งพื้น โครงสร้างทนทานระดับ IP54",
          features: [
            "รองรับการชำระเงินผ่านมือถือ",
            "เช็กสถานะการใช้งานแบบ Real-time",
            "ใช้งานร่วมกับระบบจัดการหลังบ้าน (OCPP)",
          ],
          specs: [
            { label: "กำลังไฟ", value: "7 – 43 kW (AC)" },
            { label: "การติดตั้ง", value: "ติดผนัง หรือตั้งพื้น" },
            { label: "การป้องกัน", value: "IP54" },
            { label: "มาตรฐาน", value: "CE, TÜV" },
          ],
          audience: "อาคารสำนักงาน · คอนโดมิเนียม · โรงแรม · ห้างสรรพสินค้า",
          image: {
            src: `${IMG}/ac002.png`,
            alt: "ChargeCore AC002",
            width: 800,
            height: 1000,
          },
          cta: { label: "ขอใบเสนอราคา", href: "/quote?model=ac002" },
        },
      ],
    },
    {
      id: "dc-fast",
      label: "DC Fast",
      title: "สถานีชาร์จความเร็วสูง",
      lead: "ชาร์จพลังงานสูง รวดเร็ว สำหรับธุรกิจสถานีชาร์จโดยเฉพาะ",
      products: [
        {
          name: "ADC Series",
          kicker: "DC Fast Charger · 60–240 kW",
          tagline: "Floor Stand Fast DC พร้อมจอแสดงผลขนาดใหญ่",
          features: [
            "ระบบจัดการความร้อนขั้นสูง",
            "รองรับการชำระเงินหลายรูปแบบ",
            "ตรวจสอบจากระยะไกล ช่วยลดต้นทุนการบำรุงรักษา",
          ],
          specs: [
            { label: "กำลังไฟ", value: "60 – 240 kW (DC)" },
            { label: "การติดตั้ง", value: "ตั้งพื้น" },
            { label: "การป้องกัน", value: "IP54" },
            { label: "มาตรฐาน", value: "CE, TÜV" },
          ],
          audience:
            "สถานีบริการน้ำมัน · จุดพักรถมอเตอร์เวย์ · ศูนย์บริการรถยนต์ · ลานจอดขนาดใหญ่",
          image: {
            src: `${IMG}/adc.png`,
            alt: "ChargeCore ADC Series DC Fast Charger",
            width: 1000,
            height: 1000,
          },
          cta: { label: "ปรึกษาโครงการ", href: "/quote?model=adc" },
        },
      ],
    },
    {
      id: "accessories",
      label: "อุปกรณ์เสริม",
      title: "ระบบจัดการพลังงานและอุปกรณ์เสริม",
      products: [
        {
          name: "Home Load Balancer",
          tagline: "ระบบจัดการโหลดไฟฟ้าอัจฉริยะ",
          features: [
            "ป้องกันไฟตกหรือไฟกระชากในบ้านขณะชาร์จ",
            "แบ่งกำลังไฟให้อุปกรณ์อื่นอัตโนมัติ",
          ],
          cta: { label: "สอบถามเพิ่มเติม", href: "/quote?model=recommend" },
        },
        {
          name: "EVCC Communication Controller",
          tagline: "ระบบสื่อสารอัจฉริยะ",
          features: [
            "รองรับมาตรฐานการชาร์จของแต่ละพื้นที่",
            "เชื่อมต่อรถกับเครื่องชาร์จได้หลากหลายรุ่น",
          ],
          cta: { label: "สอบถามเพิ่มเติม", href: "/quote?model=recommend" },
        },
      ],
    },
  ],
};
