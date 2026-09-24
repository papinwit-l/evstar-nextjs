import type {
  CaseCardData,
  PortfolioPageData,
  ReviewData,
} from "@/types/portfolio";

/**
 * TODO: every case and review below is a placeholder.
 * When the client has no real cases yet, ship with an empty array:
 * the home page section hides itself and /portfolio shows its empty state.
 */
export const portfolioCases: CaseCardData[] = [
  {
    title: "[ชื่อโครงการ]",
    type: "บ้านเดี่ยว · AC006",
    location: "[เขต, จังหวัด]",
    filter: "house",
  },
  {
    title: "[ชื่อโครงการ]",
    type: "คอนโด · AC002",
    location: "[เขต, จังหวัด]",
    filter: "condo",
  },
  {
    title: "[ชื่อโครงการ]",
    type: "สถานีชาร์จ · ADC Series",
    location: "[เขต, จังหวัด]",
    filter: "station",
  },
  {
    title: "[ชื่อโครงการ]",
    type: "อาคารสำนักงาน · AC002",
    location: "[เขต, จังหวัด]",
    filter: "office",
  },
  {
    title: "[ชื่อโครงการ]",
    type: "บ้านเดี่ยว · AC006",
    location: "[เขต, จังหวัด]",
    filter: "house",
  },
  {
    title: "[ชื่อโครงการ]",
    type: "โรงงาน · ADC Series",
    location: "[เขต, จังหวัด]",
    filter: "factory",
  },
];

export const featuredReview: ReviewData = {
  quote: "[รีวิวจริงจากลูกค้า 1–2 ประโยค]",
  author: "[ชื่อลูกค้า]",
  context: "[ประเภทสถานที่]",
};

export const portfolioPage: PortfolioPageData = {
  title: "ผลงานการติดตั้ง",
  lead: "ตั้งแต่โรงรถที่บ้าน\nไปจนถึงสถานีชาร์จเชิงพาณิชย์",
  filters: [
    { value: "house", label: "บ้าน" },
    { value: "condo", label: "คอนโด" },
    { value: "office", label: "อาคารสำนักงาน" },
    { value: "factory", label: "โรงงาน" },
    { value: "station", label: "สถานีชาร์จ" },
  ],
  cases: portfolioCases,
  cta: {
    title: "อยากให้หน้างานของคุณ\nเป็นผลงานชิ้นต่อไป",
    lead: "ส่งข้อมูลเบื้องต้น\nทีมงานติดต่อกลับเพื่อนัดวันสำรวจ",
    primary: { label: "ขอใบเสนอราคา", href: "/quote" },
    secondary: { label: "ดูบริการติดตั้ง", href: "/services" },
    showLine: true,
  },
};
