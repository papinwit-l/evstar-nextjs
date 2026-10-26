import type { CtaData } from "@/types/common";
import type { ProductsPageData } from "@/types/products";

const IMG = "/images/products";

/**
 * Full ChargeCore catalogue (chargecoreglobal.com), named by model code.
 * The client removes whatever EVSTAR does not actually sell.
 *
 * Naming: ChargeCore's marketing titles differ from the model codes in their
 * URLs — /nkr-adc002-... is titled "Core120kW-180kW". We use the code as the
 * name and keep the marketing title in the tagline.
 *
 * TODO: specs marked below need the ChargeCore datasheets.
 * TODO: four products still need photos — see download-product-images.ps1.
 */
const productsCta: CtaData = {
  title: "ไม่แน่ใจว่ารุ่นไหนเหมาะกับคุณ",
  lead: "บอกประเภทสถานที่และการใช้งาน\nทีมงานช่วยเลือกรุ่นและประเมินหน้างานให้",
  primary: { label: "ขอใบเสนอราคา", href: "/quote" },
  secondary: { label: "ดูบริการติดตั้ง", href: "/services" },
  showLine: true,
};

export const productsPage: ProductsPageData = {
  title: "เครื่องชาร์จรถยนต์ไฟฟ้า\nครบทุกการใช้งาน",
  lead: "สินค้าหลักจาก ChargeCore\nตั้งแต่สถานีชาร์จเร็ว 240 kW\nไปจนถึงเครื่องติดผนังที่บ้าน",
  categories: [
    {
      id: "dc-fast",
      label: "DC Fast Charger",
      title: "สถานีชาร์จความเร็วสูง (DC)",
      lead: "ชาร์จพลังงานสูง รวดเร็ว สำหรับสถานีชาร์จและธุรกิจเชิงพาณิชย์",
      products: [
        {
          name: "ADC002",
          brand: "ChargeCore",
          kicker: "DC Fast Charger · 120–180 kW",
          tagline:
            "Core 120–180 kW รางวัล MUSE Design Awards ดีไซน์แบบโมดูลาร์ ดูแลรักษาง่าย",
          features: [
            "รองรับ ISO 15118 / DIN 70121 และ OCPP 1.6J (อัปเกรดเป็น 2.0 ได้)",
            "Dynamic Load Balancing จ่ายไฟให้รถหลายคันพร้อมกัน",
            "จอสัมผัส LCD 10.1 นิ้ว พร้อมจอแสดงผลขนาด 21.5 นิ้ว รองรับ RFID และเครื่องรูดบัตร (ออปชัน)",
            "รองรับการทำ Link & Loop feature",
            "สั่งงานผ่านแอป พร้อมระบบจัดเก็บสายชาร์จ",
          ],
          specs: [
            { label: "กำลังไฟ", value: "120 – 180 kW (DC)" },
            { label: "การติดตั้ง", value: "ตั้งพื้น" },
            { label: "การป้องกัน", value: "IP55" },
            { label: "มาตรฐาน", value: "CE, UL, TÜV (SECC)" },
          ],
          audience: "สถานีชาร์จ · ลานจอดเชิงพาณิชย์ · อาคารสำนักงาน",
          image: {
            src: `${IMG}/core-120-180.jpg`,
            alt: "ChargeCore ADC002 Core 120–180 kW Fast DC Charging Station",
            width: 800,
            height: 800,
          },
          cta: { label: "ขอใบเสนอราคา", href: "/quote?model=adc002" },
        },
        {
          name: "Core Series 240",
          brand: "ChargeCore",
          kicker: "DC High-Power · 160–240 kW",
          tagline: "ตู้ชาร์จกำลังสูงสุดในกลุ่ม สำหรับสถานีชาร์จสาธารณะ",
          // TODO: full specs from the ChargeCore datasheet
          features: [
            "กำลังชาร์จ 160 – 240 kW",
            "รองรับการใช้งานต่อเนื่องในสถานีชาร์จ",
            "รองรับการทำ Link & Loop feature",
          ],
          specs: [
            { label: "กำลังไฟ", value: "160 – 240 kW (DC)" },
            { label: "การติดตั้ง", value: "ตั้งพื้น" },
          ],
          audience: "สถานีบริการน้ำมัน · จุดพักรถมอเตอร์เวย์ · ลานจอดขนาดใหญ่",
          image: {
            src: `${IMG}/core-240.png`,
            alt: "ChargeCore Core Series 160–240 kW DC High-Power Charging Pile",
            width: 800,
            height: 1000,
          },
          cta: { label: "ปรึกษาโครงการ", href: "/quote?model=core240" },
        },
        {
          name: "ADC",
          brand: "ChargeCore",
          kicker: "DC Fast Charger · 60–240 kW",
          tagline: "ตู้ชาร์จ DC แบบโมดูลาร์ เลือกกำลังไฟได้ตามขนาดโครงการ",
          features: [
            "รองรับ ISO 15118 / DIN 70121 และ OCPP 1.6J",
            "Load balancing ภายในสถานีชาร์จ",
            "จอสัมผัส 7 นิ้ว รองรับ RFID และบัตรเครดิต",
            "สั่งงานผ่านแอป",
          ],
          specs: [
            { label: "กำลังไฟ", value: "60 – 240 kW (DC)" },
            { label: "การติดตั้ง", value: "ตั้งพื้น" },
            { label: "การป้องกัน", value: "IP54" },
            { label: "มาตรฐาน", value: "CE, TÜV (SECC)" },
          ],
          audience: "สถานีชาร์จ · ลานจอดเชิงพาณิชย์ · อาคารสำนักงาน",
          // TODO: confirm this render is the ADC and not another DC model
          image: {
            src: `${IMG}/adc.png`,
            alt: "ChargeCore ADC Fast DC Electric Vehicle Station",
            width: 1000,
            height: 1000,
          },
          cta: { label: "ปรึกษาโครงการ", href: "/quote?model=adc" },
        },
        {
          name: "Haipawa-240/360",
          brand: "ChargeCore",
          kicker: "DC Ultra-Fast · 240/360 kW",
          tagline: "ตู้ชาร์จกำลังสูงพิเศษ สำหรับสถานีชาร์จขนาดใหญ่",
          // TODO: features, specs and photo
          features: ["กำลังชาร์จ 240 kW และ 360 kW"],
          audience: "สถานีชาร์จขนาดใหญ่ · รถเชิงพาณิชย์",
          cta: { label: "ปรึกษาโครงการ", href: "/quote?model=haipawa" },
        },
        {
          name: "Nuclue-Verde-250A",
          brand: "ChargeCore",
          kicker: "DC Split Type · 250A",
          tagline: "ระบบแยกตู้จ่ายไฟกับตู้ควบคุม ระบายความร้อนด้วยอากาศ",
          // TODO: features, specs and photo
          features: [
            "แบบ Split Type แยกตู้จ่ายไฟออกจากตู้ควบคุม",
            "ระบายความร้อนด้วยอากาศ (Air cooling)",
          ],
          audience: "สถานีชาร์จที่มีข้อจำกัดด้านพื้นที่",
          cta: { label: "ปรึกษาโครงการ", href: "/quote?model=nuclue250a" },
        },
        {
          name: "Coremini 60/80",
          brand: "ChargeCore",
          kicker: "Fast DC · 60/80 kW",
          tagline: "ตู้ชาร์จเร็วขนาดกะทัดรัด สำหรับพื้นที่เชิงพาณิชย์",
          // TODO: full specs from the ChargeCore datasheet
          features: [
            "กำลังชาร์จ 60 kW และ 80 kW",
            "ขนาดกะทัดรัด ติดตั้งในพื้นที่จำกัดได้",
            "รองรับการทำ Link & Loop feature",
          ],
          audience: "ห้างสรรพสินค้า · โรงแรม · ลานจอดรถ",
          image: {
            src: `${IMG}/coremini-60.png`,
            alt: "ChargeCore Coremini 60/80 kW Fast DC Charging Station",
            width: 800,
            height: 1000,
          },
          cta: { label: "ขอใบเสนอราคา", href: "/quote?model=coremini60" },
        },
        {
          name: "Kern-30/40",
          brand: "ChargeCore",
          kicker: "Fast DC · 30/40 kW",
          tagline: "ตู้ชาร์จ DC ขนาดเล็ก เริ่มต้นสถานีชาร์จได้ในงบที่จำกัด",
          // TODO: full specs from the ChargeCore datasheet
          features: [
            "กำลังชาร์จ 30 kW และ 40 kW",
            "รองรับการทำ Link & Loop feature",
          ],
          audience: "ศูนย์บริการรถยนต์ · สำนักงาน · ร้านค้า",
          image: {
            src: `${IMG}/kern-40.jpg`,
            alt: "ChargeCore Kern-30/40 Electric Vehicle Charging Station",
            width: 800,
            height: 800,
          },
          cta: { label: "ขอใบเสนอราคา", href: "/quote?model=kern40" },
        },
        {
          name: "BDC",
          brand: "ChargeCore",
          kicker: "Fast DC",
          tagline: "ตู้ชาร์จ DC สำหรับงานเชิงพาณิชย์",
          // TODO: power rating, features, specs and photo
          features: [],
          cta: { label: "สอบถามเพิ่มเติม", href: "/quote?model=bdc" },
        },
      ],
    },
    {
      id: "ac",
      label: "AC Charger",
      title: "เครื่องชาร์จ AC",
      lead: "สำหรับบ้าน คอนโด และอาคารสำนักงาน ชาร์จข้ามคืนหรือระหว่างวัน",
      products: [
        {
          name: "AC006",
          brand: "ChargeCore",
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
            alt: "ChargeCore AC006 Smart AC EV Home Charger",
            width: 800,
            height: 1000,
          },
          cta: { label: "ขอใบเสนอราคา", href: "/quote?model=ac006" },
        },
        {
          name: "AC002",
          brand: "ChargeCore",
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
            alt: "ChargeCore AC002 Floor Stand EV Charging Station",
            width: 800,
            height: 1000,
          },
          cta: { label: "ขอใบเสนอราคา", href: "/quote?model=ac002" },
        },
        {
          name: "AC003 (LPC)",
          brand: "ChargeCore",
          kicker: "Wall-Mounted AC",
          tagline: "LPC รางวัล MUSE Design Awards แบบติดผนัง หัวชาร์จเดี่ยว",
          // TODO: power rating and full specs from the ChargeCore datasheet
          features: ["ติดผนัง หัวชาร์จเดี่ยว (Single Output)"],
          audience: "บ้าน · คอนโด · อาคารสำนักงาน",
          image: {
            src: `${IMG}/lpc.png`,
            alt: "ChargeCore AC003 LPC Single Output Wall-Mounted Charger",
            width: 800,
            height: 1000,
          },
          cta: { label: "ขอใบเสนอราคา", href: "/quote?model=ac003" },
        },
      ],
    },
    {
      id: "accessories",
      label: "อุปกรณ์เสริม",
      title: "ระบบจัดการพลังงานและอุปกรณ์เสริม",
      products: [
        {
          // TODO: confirm the brand of both accessories
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
  cta: productsCta,
};
