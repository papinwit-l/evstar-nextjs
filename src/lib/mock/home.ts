import type { ArticleCard, ProductTileData } from "@/types/home";

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
