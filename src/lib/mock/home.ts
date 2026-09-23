import type {
  AccessoryCardData,
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

// Dark tile — DC fast charging
export const featuredTile: ProductTileData = {
  kicker: "DC Fast Charger · 60–240 kW",
  title: "ADC Series",
  subtitle: "ชาร์จเร็ว กำลังสูง\nสำหรับธุรกิจสถานีชาร์จโดยเฉพาะ",
  audience:
    "ปั๊มน้ำมัน · จุดพักรถมอเตอร์เวย์ · ศูนย์บริการรถยนต์ · ลานจอดขนาดใหญ่",
  // TODO: ADC Series photo from ChargeCore
  image: undefined,
  primary: { label: "ดูรายละเอียด", href: "/products#dc-fast" },
  secondary: { label: "ปรึกษาโครงการ", href: "/quote?model=adc" },
};

// 2-up grid — the two AC chargers
export const gridTiles: ProductTileData[] = [
  {
    kicker: "Smart Home AC · 7–22 kW",
    title: "AC006",
    subtitle: "ดีไซน์มินิมอล ติดตั้งง่าย\nสั่งงานและตั้งเวลาชาร์จผ่านแอป",
    audience: "บ้านเดี่ยว · ทาวน์โฮม · ลานจอดส่วนตัว",
    image: {
      src: `${IMG}/ac006.png`,
      alt: "ChargeCore AC006 Smart Wallbox",
      width: 800,
      height: 1000,
    },
    primary: { label: "ดูรายละเอียด", href: "/products#home" },
    secondary: { label: "ขอใบเสนอราคา", href: "/quote?model=ac006" },
  },
  {
    kicker: "Commercial AC · 7–43 kW",
    title: "AC002",
    subtitle:
      "ติดผนังหรือตั้งพื้น\nกันน้ำกันฝุ่น IP54\nรองรับชำระเงินผ่านมือถือ",
    audience: "อาคารสำนักงาน · คอนโด · โรงแรม · ห้างสรรพสินค้า",
    image: {
      src: `${IMG}/ac002.png`,
      alt: "ChargeCore AC002 Floor Stand & Wall Mount",
      width: 800,
      height: 1000,
    },
    primary: { label: "ดูรายละเอียด", href: "/products#commercial" },
    secondary: { label: "ขอใบเสนอราคา", href: "/quote?model=ac002" },
  },
];

// TODO: product photos for both accessories
export const accessoryCards: AccessoryCardData[] = [
  {
    kicker: "อุปกรณ์เสริม",
    title: "Home Load Balancer",
    body: "จัดการโหลดไฟอัตโนมัติ ป้องกันไฟตกหรือไฟกระชากขณะชาร์จ",
    link: { label: "ดูรายละเอียด", href: "/products#accessories" },
  },
  {
    kicker: "อุปกรณ์เสริม",
    title: "EVCC Controller",
    body: "ระบบสื่อสารให้รถเข้ากับมาตรฐานการชาร์จของแต่ละพื้นที่",
    link: { label: "ดูรายละเอียด", href: "/products#accessories" },
  },
];

export const productsLink: LinkField = {
  label: "ดูสินค้าทั้งหมด",
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
