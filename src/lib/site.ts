/**
 * Site-wide config: navigation, footer links, contact details.
 * Static for now — later these can come from WordPress
 * (WPGraphQL menus + an ACF options page) using the same shapes.
 */

export type NavItem = {
  label: string;
  href: string;
};

export type FooterColumn = {
  title: string;
  links: NavItem[];
};

export const mainNav: NavItem[] = [
  { label: "หน้าแรก", href: "/" },
  { label: "เกี่ยวกับเรา", href: "/about" },
  { label: "สินค้า", href: "/products" },
  { label: "บริการ", href: "/services" },
  { label: "บทความ", href: "/articles" },
  { label: "ติดต่อเรา", href: "/contact" },
];

export const headerCta: NavItem = { label: "ติดต่อเรา", href: "/contact" };

// TODO: replace placeholders with the client's real contact details
export const contact = {
  phone: "02 000 0000",
  phoneHref: "tel:+6620000000",
  email: "info@starup.co.th",
  lineUrl: "#line-oa",
  facebookUrl: "#facebook",
};

export const footerColumns: FooterColumn[] = [
  {
    title: "สินค้า",
    links: [
      { label: "Home Used", href: "/products/home" },
      { label: "Commercial", href: "/products/commercial" },
      { label: "โปรโมชั่น", href: "/promotions" },
      { label: "ดูสินค้าทั้งหมด", href: "/products" },
    ],
  },
  {
    title: "บริการ",
    links: [
      { label: "สำรวจหน้างาน", href: "/services#survey" },
      { label: "ติดตั้ง", href: "/services#install" },
      { label: "การรับประกัน", href: "/services#warranty" },
      { label: "ดูแลหลังการขาย", href: "/services#support" },
    ],
  },
  {
    title: "บริษัท",
    links: [
      { label: "เกี่ยวกับเรา", href: "/about" },
      { label: "OEM และพาร์ทเนอร์", href: "/oem" },
      { label: "บทความ", href: "/articles" },
      { label: "ติดต่อเรา", href: "/contact" },
    ],
  },
  {
    title: "ติดต่อ",
    links: [
      { label: contact.phone, href: contact.phoneHref },
      { label: contact.email, href: `mailto:${contact.email}` },
      { label: "LINE", href: contact.lineUrl },
      { label: "Facebook", href: contact.facebookUrl },
    ],
  },
];

export const legalLinks: NavItem[] = [
  { label: "นโยบายความเป็นส่วนตัว", href: "/privacy-policy" },
  { label: "ข้อกำหนดการใช้งาน", href: "/terms" },
];
