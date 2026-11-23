import { cache } from "react";
import { getCatalog } from "@/lib/api/products";
import { meterSizes as mockMeterSizes } from "@/lib/quote";
import {
  company as mockCompany,
  contact as mockContact,
  type FooterColumn,
} from "@/lib/site";
import { isWordPressEnabled, wpQuery } from "@/lib/wp/client";
import { str } from "@/lib/wp/map";

export type Option = { value: string; label: string };

export type SiteSettings = {
  company: { nameTh: string; nameEn: string };
  contact: {
    phone: string;
    /** tel: link built from the phone number */
    phoneHref: string;
    email: string;
    lineUrl: string;
    address?: string;
    openingHours?: string;
    mapUrl?: string;
  };
  meterSizes: Option[];
  responseTime?: string;
};

const SETTINGS_QUERY = `
  query SiteSettings {
    siteSettings {
      siteSettingsFields {
        nameTh nameEn phone email lineUrl address openingHours mapUrl responseTime
        meterSizes { value label }
      }
    }
  }
`;

type WpSettings = {
  nameTh: string | null;
  nameEn: string | null;
  phone: string | null;
  email: string | null;
  lineUrl: string | null;
  address: string | null;
  openingHours: string | null;
  mapUrl: string | null;
  responseTime: string | null;
  meterSizes: { value: string | null; label: string | null }[] | null;
};

/** "02 000 0000" → "tel:+6620000000" (Thai numbers drop the leading 0). */
export function telHref(phone: string): string {
  const digits = phone.replace(/[^\d+]/g, "");
  if (digits.startsWith("+")) return `tel:${digits}`;
  if (digits.startsWith("0")) return `tel:+66${digits.slice(1)}`;
  return `tel:${digits}`;
}

/** Site Settings options page (ตั้งค่าเว็บไซต์). Falls back to src/lib/site.ts per field. */
export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const fallback: SiteSettings = {
    company: mockCompany,
    contact: mockContact,
    meterSizes: [...mockMeterSizes],
  };
  if (!isWordPressEnabled) return fallback;

  const data = await wpQuery<{ siteSettings: { siteSettingsFields: WpSettings | null } | null }>(
    SETTINGS_QUERY,
    ["settings"],
  );
  const s = data.siteSettings?.siteSettingsFields;
  if (!s) return fallback;

  const phone = s.phone || fallback.contact.phone;
  const meterSizes = (s.meterSizes ?? [])
    .filter((m): m is Option => Boolean(m.value && m.label));

  return {
    company: {
      nameTh: s.nameTh || fallback.company.nameTh,
      nameEn: s.nameEn || fallback.company.nameEn,
    },
    contact: {
      phone,
      phoneHref: telHref(phone),
      email: s.email || fallback.contact.email,
      lineUrl: s.lineUrl || fallback.contact.lineUrl,
      address: str(s.address),
      openingHours: str(s.openingHours),
      mapUrl: str(s.mapUrl),
    },
    meterSizes: meterSizes.length ? meterSizes : fallback.meterSizes,
    responseTime: str(s.responseTime),
  };
});

/** Footer: product categories from the catalog, contact details from settings. */
export const getFooterColumns = cache(async (): Promise<FooterColumn[]> => {
  const [catalog, { contact }] = await Promise.all([getCatalog(), getSiteSettings()]);

  return [
    {
      title: "สินค้า",
      links: catalog.categories.map((c) => ({ label: c.label, href: `/products#${c.id}` })),
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
});
