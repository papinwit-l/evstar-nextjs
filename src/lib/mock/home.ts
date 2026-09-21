import type { ArticleCard, LinkField, ProductTileData } from "@/types/home";

// Temporary local copies in /public/images/products.
// Later these come from the WordPress media library (URL + real width/height).
const IMG = "/images/products";

export const heroTile: ProductTileData = {
  title: "ชาร์จที่บ้าน\nได้ตั้งแต่คืนนี้",
  subtitle: "AC006 เครื่องชาร์จติดผนัง 7–22 kW ควบคุมผ่านแอป",
  image: {
    src: `${IMG}/ac006.png`,
    alt: "AC006 Smart AC EV Home Charger",
    width: 800,
    height: 1000,
  },
  primary: { label: "ดูเพิ่มเติม", href: "/products/ac006" },
  secondary: { label: "นัดสำรวจหน้างาน", href: "/contact?topic=install" },
};

export const featuredTile: ProductTileData = {
  kicker: "Ultra-Fast DC",
  title: "Core Series 240",
  subtitle: "กำลังสูงสุด 240 kW สำหรับสถานีชาร์จและรถเชิงพาณิชย์",
  image: {
    src: `${IMG}/core-240.png`,
    alt: "Core Series 240kW High-Power DC Charging Pile",
    width: 800,
    height: 1000,
  },
  primary: { label: "ดูเพิ่มเติม", href: "/products/core-240" },
  secondary: { label: "ปรึกษาโครงการ", href: "/contact?topic=project" },
};

// Kern-40 is the 7th model; it appears on /products only
export const gridTiles: ProductTileData[] = [
  {
    kicker: "AC 7–22 kW",
    title: "LPC",
    subtitle: "เครื่องชาร์จติดผนัง รางวัล MUSE Design Awards",
    image: {
      src: `${IMG}/lpc.png`,
      alt: "LPC Single Output Wall-Mounted Charger",
      width: 800,
      height: 1000,
    },
    primary: { label: "ดูเพิ่มเติม", href: "/products/lpc" },
    secondary: { label: "สอบถาม", href: "/contact?topic=install" },
  },
  {
    kicker: "AC 7–22 kW",
    title: "AC002",
    subtitle: "แบบตั้งพื้น สำหรับลานจอดคอนโดและอาคารสำนักงาน",
    image: {
      src: `${IMG}/ac002.png`,
      alt: "AC002 Floor Stand EV Charging Station",
      width: 800,
      height: 1000,
    },
    primary: { label: "ดูเพิ่มเติม", href: "/products/ac002" },
    secondary: { label: "สอบถาม", href: "/contact?topic=project" },
  },
  {
    kicker: "Fast DC 60 kW",
    title: "Coremini 60",
    subtitle: "ชาร์จเร็วเต็มกำลัง ในพื้นที่จอดรถที่จำกัด",
    image: {
      src: `${IMG}/coremini-60.png`,
      alt: "Coremini 60kW Fast DC Charging Station",
      width: 800,
      height: 1000,
    },
    primary: { label: "ดูเพิ่มเติม", href: "/products/coremini-60" },
    secondary: { label: "สอบถาม", href: "/contact?topic=project" },
  },
  {
    kicker: "Fast DC 120–180 kW",
    title: "Core 120–180",
    subtitle: "สำหรับสถานีชาร์จสาธารณะและปั๊มน้ำมัน",
    image: {
      src: `${IMG}/core-120-180.jpg`,
      alt: "Core 120kW-180kW Fast DC Charging Station",
      width: 800,
      height: 1000,
    },
    primary: { label: "ดูเพิ่มเติม", href: "/products/core-120-180" },
    secondary: { label: "สอบถาม", href: "/contact?topic=project" },
  },
];

export const productsLink: LinkField = {
  label: "ดูสินค้าทั้งหมด 7 รุ่น",
  href: "/products",
};

export const latestArticles: ArticleCard[] = [
  {
    title: "เลือกเครื่องชาร์จ EV สำหรับบ้าน ต้องดูอะไรบ้าง",
    href: "/articles/choose-home-ev-charger",
    category: "คู่มือ",
  },
  {
    title: "ชาร์จ AC กับ DC ต่างกันอย่างไร",
    href: "/articles/ac-vs-dc-charging",
    category: "ความรู้",
  },
  {
    title: "เตรียมระบบไฟที่บ้าน ก่อนติดตั้งเครื่องชาร์จ",
    href: "/articles/prepare-home-electrical",
    category: "การติดตั้ง",
  },
];
