import type { ServicesPageData } from "@/types/services";

/**
 * Content from the client's services document.
 * TODO: installation packages for home and business (the client's section list
 * mentions them, but no details were provided) and PM service intervals.
 */
export const servicesPage: ServicesPageData = {
  title: "ติดตั้งและดูแล\nโดยทีมวิศวกรคนไทย",
  lead: "ตั้งแต่ออกแบบระบบ ขออนุญาตการไฟฟ้า\nจนถึงบำรุงรักษาหลังติดตั้ง",
  services: [
    {
      id: "install",
      icon: "install",
      title: "Installation & Engineering",
      body: "ออกแบบและติดตั้งสถานีชาร์จ ChargeCore ตามมาตรฐานวิศวกรรม MEA และ PEA",
      bullets: [
        "สำรวจหน้างานและประเมินระบบไฟฟ้าเดิม",
        "ขออนุญาตการไฟฟ้าและขยายเขตมิเตอร์",
        "เดินสายเมนและติดตั้งอุปกรณ์ป้องกันครบชุด",
      ],
    },
    {
      id: "platform",
      icon: "platform",
      title: "Platform Integration",
      body: "เซ็ตอัประบบจัดการหลังบ้าน OCPP สำหรับธุรกิจที่ต้องการเก็บค่าบริการ",
      bullets: [
        "ตั้งค่าอัตราค่าบริการและวิธีชำระเงิน",
        "ดูสถานะและรายงานการใช้งานแบบ Real-time",
        "รองรับการอัปเดตซอฟต์แวร์แบบ OTA",
      ],
    },
    {
      id: "maintenance",
      icon: "maintenance",
      title: "Maintenance & Care",
      body: "ตรวจเช็กสภาพเครื่องชาร์จ (PM) และแก้ไขปัญหาด้วยอะไหล่แท้จาก ChargeCore",
      bullets: [
        "ตรวจเช็กตามรอบและทดสอบระบบป้องกัน",
        "อะไหล่แท้จาก ChargeCore",
        "ทีมงานดูแลตลอดอายุการใช้งาน",
      ],
    },
  ],
  // Same four steps as the home page, with fuller descriptions
  process: {
    title: "ขั้นตอนการทำงาน",
    lead: "ตั้งแต่โทรหาเรา\nจนถึงวันที่เครื่องชาร์จพร้อมใช้งาน",
    steps: [
      {
        title: "ปรึกษา",
        body: "แจ้งประเภทสถานที่ รุ่นที่สนใจ และลักษณะการใช้งาน ทีมงานช่วยประเมินความเหมาะสมและงบประมาณเบื้องต้นให้ก่อนออกหน้างาน",
      },
      {
        title: "สำรวจหน้างาน",
        body: "ตรวจตู้ไฟ ขนาดมิเตอร์ ระยะเดินสาย และจุดติดตั้งจริง จากนั้นสรุปแบบและเสนอราคาพร้อมรายละเอียดอุปกรณ์",
      },
      {
        title: "ติดตั้ง",
        body: "เดินสายเมน ติดตั้งอุปกรณ์ป้องกัน และยึดเครื่องชาร์จตามมาตรฐานวิศวกรรม MEA และ PEA โดยช่างผู้เชี่ยวชาญ",
      },
      {
        title: "ส่งมอบ",
        body: "ทดสอบการชาร์จจริง สอนใช้งานแอปและระบบหลังบ้าน พร้อมเริ่มระยะเวลารับประกันและบริการหลังการขาย",
      },
    ],
  },
  cta: {
    title: "เริ่มจากการสำรวจหน้างาน",
    lead: "ส่งข้อมูลเบื้องต้น\nทีมงานติดต่อกลับเพื่อนัดวันสำรวจ",
    primary: { label: "จองคิวสำรวจหน้างาน", href: "/quote?intent=survey" },
    secondary: { label: "ดูสินค้าทั้งหมด", href: "/products" },
    showLine: true,
  },
};
