import type { PortfolioPreviewData } from "@/types/portfolio";

// TODO: every case and the review are placeholders.
// Until the client sends real projects, return null from the API layer
// so the section stays hidden.
export const portfolioPreview: PortfolioPreviewData = {
  title: "ผลงานการติดตั้ง",
  cases: [
    {
      title: "[ชื่อโครงการ]",
      type: "บ้านเดี่ยว · AC006",
      location: "[เขต, จังหวัด]",
    },
    {
      title: "[ชื่อโครงการ]",
      type: "คอนโด · AC002",
      location: "[เขต, จังหวัด]",
    },
    {
      title: "[ชื่อโครงการ]",
      type: "สถานีชาร์จ · ADC Series",
      location: "[เขต, จังหวัด]",
    },
  ],
  review: {
    quote: "[รีวิวจริงจากลูกค้า 1–2 ประโยค]",
    author: "[ชื่อลูกค้า]",
    context: "[ประเภทสถานที่]",
  },
};
