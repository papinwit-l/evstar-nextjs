import type {
  ArticleCard,
  CompareData,
  FinalCtaData,
  HeroData,
  HighlightsData,
  LinkField,
  OemData,
  ProductTileData,
} from "@/types/home";

// Temporary local copies in /public/images/products.
// Later these come from the WordPress media library (URL + real width/height).
const IMG = "/images/products";

export const heroTile: HeroData = {
  kicker: "EVSTAR SOLUTIONS × ChargeCore",
  title: "ตัวแทนจำหน่ายและติดตั้ง\nสถานีชาร์จ ChargeCore\nอย่างเป็นทางการ",
  subtitle:
    "บริการครบวงจร\nตั้งแต่บ้านพักอาศัย\nถึงสถานีชาร์จเชิงพาณิชย์\nได้มาตรฐาน CE และ TÜV",
  // TODO: a line-up or installation photo from ChargeCore's assets would suit better
  // than repeating AC006, which also has its own tile below
  image: {
    src: `${IMG}/ac006.png`,
    alt: "เครื่องชาร์จ ChargeCore AC006",
    width: 800,
    height: 1000,
  },
  primary: { label: "ขอใบเสนอราคาติดตั้ง", href: "/quote" },
  secondary: { label: "ดูรุ่นสินค้า ChargeCore", href: "/products" },
  chargeLine: { label: "AC และ DC", value: "7 – 240 kW" },
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

export const compare: CompareData = {
  title: "เครื่องชาร์จแบบไหน\nเหมาะกับคุณ",
  lead: "รองรับมาตรฐานยุโรป อเมริกา และญี่ปุ่น ตั้งแต่โรงรถที่บ้านไปจนถึงสถานีชาร์จสาธารณะ",
  columns: [
    {
      title: "Home Used",
      subtitle: "ชาร์จข้ามคืนที่บ้านหรือคอนโด",
      image: {
        src: `${IMG}/lpc.png`,
        alt: "เครื่องชาร์จ Home Used",
        width: 800,
        height: 1000,
      },
      primary: { label: "ดูสินค้า", href: "/products/home" },
      secondary: { label: "สอบถามการติดตั้ง", href: "/contact?topic=install" },
      specs: [
        { label: "กำลังไฟ", value: "AC 7–22 kW" },
        { label: "การติดตั้ง", value: "ติดผนัง หรือตั้งพื้น" },
        { label: "เหมาะกับ", value: "บ้าน คอนโด ออฟฟิศ" },
        { label: "รุ่น", value: "AC006, LPC, AC002" },
      ],
    },
    {
      title: "Commercial",
      subtitle: "ชาร์จเร็วสำหรับธุรกิจและสถานีสาธารณะ",
      image: {
        src: `${IMG}/core-240.png`,
        alt: "เครื่องชาร์จ Commercial",
        width: 800,
        height: 1000,
      },
      primary: { label: "ดูสินค้า", href: "/products/commercial" },
      secondary: { label: "ปรึกษาโครงการ", href: "/contact?topic=project" },
      specs: [
        { label: "กำลังไฟ", value: "DC 30–240 kW" },
        { label: "การติดตั้ง", value: "ตั้งพื้น พร้อมระบบ Smart Load" },
        {
          label: "เหมาะกับ",
          value: "อาคาร ห้างสรรพสินค้า ปั๊มน้ำมัน สถานีชาร์จ",
        },
        {
          label: "รุ่น",
          value: "Kern-40, Coremini 60, Core 120–180, Core 240",
        },
      ],
    },
  ],
};

export const highlights: HighlightsData = {
  title: "ดูแลครบ ตั้งแต่วันติดตั้ง\nจนตลอดอายุการใช้งาน",
  items: [
    {
      value: "3 ปี",
      title: "รับประกันสินค้า",
      // TODO: confirm with client — 3-year warranty and 10-day return are different policies
      body: "หากสินค้าขัดข้องหรือเสียหาย ส่งคืนได้ภายใน 10 วันนับจากวันรับสินค้า",
    },
    {
      value: "ทั่วไทย",
      title: "ทีมช่างติดตั้ง",
      body: "ช่างผ่านการอบรมตามมาตรฐาน ติดตั้งเต็มระบบอย่างปลอดภัย",
    },
    {
      value: "Smart Load",
      title: "จ่ายไฟอย่างมีประสิทธิภาพ",
      body: "คำนวณและแบ่งกำลังไฟให้รถแต่ละคันโดยอัตโนมัติ",
    },
    {
      value: "ตลอดอายุ",
      title: "ดูแลหลังการขาย",
      body: "ให้คำปรึกษาตั้งแต่ออกแบบ ติดตั้ง จนถึงซ่อมบำรุง",
    },
  ],
  link: { label: "ดูบริการทั้งหมด", href: "/services" },
};

export const oem: OemData = {
  title: "ผลิตให้แบรนด์ชั้นนำ\nแบบ OEM",
  lead: "ตั้งแต่ออกแบบวงจร งานแม่พิมพ์ ไปจนถึงทดสอบตามมาตรฐานสากล ทั้งในไทยและต่างประเทศ",
  // Temporary: the combined banner from the current site.
  // Better: ask the client for each partner logo as a separate SVG/PNG.
  logos: [
    {
      src: "/images/oem/partner-logos.png",
      alt: "โลโก้แบรนด์ที่ EV Star ผลิตให้แบบ OEM",
      width: 1600,
      height: 400,
    },
  ],
  primary: { label: "ติดต่อทีม OEM", href: "/contact?topic=oem" },
  secondary: { label: "ดูเพิ่มเติม", href: "/oem" },
};

export const finalCta: FinalCtaData = {
  title: "พร้อมติดตั้งเครื่องชาร์จ\nแล้วหรือยัง",
  lead: "ทีมงานช่วยประเมินหน้างาน และแนะนำรุ่นที่เหมาะกับการใช้งานของคุณ",
  primary: { label: "ติดต่อเรา", href: "/contact" },
  showLine: true,
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
