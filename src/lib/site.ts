/**
 * Site-wide config. Navigation stays in code (structural links).
 * Company and contact details come from WordPress (ตั้งค่าเว็บไซต์) via
 * getSiteSettings(); the values here are only the fallback when WordPress
 * is not configured. Footer columns are built in getFooterColumns().
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
  { label: "สินค้า", href: "/products" },
  { label: "บริการ", href: "/services" },
  { label: "ผลงาน", href: "/portfolio" },
  { label: "เกี่ยวกับเรา", href: "/about" },
];

/** The site's main conversion. Every "ขอใบเสนอราคา" button points here. */
export const headerCta: NavItem = { label: "ขอใบเสนอราคา", href: "/quote" };

export const company = {
  nameTh: "บริษัท อีวีสตาร์ โซลูชั่น จำกัด",
  nameEn: "EVSTAR SOLUTIONS CO., LTD.",
};

// Fallback placeholders — real details are entered in WordPress
export const contact = {
  phone: "02 000 0000",
  phoneHref: "tel:+6620000000",
  email: "info@example.com", // TODO: real address once the domain is confirmed
  lineUrl: "#line-oa",
};

export const legalLinks: NavItem[] = [
  { label: "นโยบายความเป็นส่วนตัว", href: "/privacy-policy" },
];
