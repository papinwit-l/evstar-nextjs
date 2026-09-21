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

// TODO: replace placeholders with the client's real contact details
export const contact = {
  phone: "02 000 0000",
  phoneHref: "tel:+6620000000",
  email: "info@example.com", // TODO: real address once the domain is confirmed
  lineUrl: "#line-oa",
};

export const footerColumns: FooterColumn[] = [
  {
    title: "สินค้า",
    links: [
      { label: "Home AC Charger", href: "/products#home" },
      { label: "Commercial AC Charger", href: "/products#commercial" },
      { label: "DC Fast Charger", href: "/products#dc-fast" },
      { label: "อุปกรณ์เสริม", href: "/products#accessories" },
    ],
  },
  {
    title: "บริษัท",
    links: [
      { label: "บริการ", href: "/services" },
      { label: "ผลงาน", href: "/portfolio" },
      { label: "เกี่ยวกับเรา", href: "/about" },
      { label: "ขอใบเสนอราคา", href: "/quote" },
    ],
  },
  {
    title: "ติดต่อ",
    links: [
      { label: contact.phone, href: contact.phoneHref },
      { label: contact.email, href: `mailto:${contact.email}` },
      { label: "LINE", href: contact.lineUrl },
      { label: "ที่อยู่และเวลาทำการ", href: "/quote#contact" },
    ],
  },
];

export const legalLinks: NavItem[] = [
  { label: "นโยบายความเป็นส่วนตัว", href: "/privacy-policy" },
];
