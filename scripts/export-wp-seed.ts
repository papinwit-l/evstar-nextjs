/**
 * Exports the mock content in src/lib/mock as WordPress seed data for the
 * `evstar-seed` plugin (wordpress/evstar-seed/data.json + images/).
 *
 *   npx tsx scripts/export-wp-seed.ts
 *
 * Field names in the JSON match the SCF field names in evstar-core; the
 * importer writes each top-level field by key (field_evstar_<group>_<name>).
 * Run again whenever the mocks change, then rebuild the seed plugin zip.
 */

import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { basename, join } from "node:path";
import { legalToBlocks } from "../src/lib/legal-html";
import { aboutCta, aboutHero, aboutStory, aboutWhy } from "../src/lib/mock/about";
import {
  accessoryCards,
  featuredTile,
  finalCta,
  gridTiles,
  heroTile,
  highlights,
  installSteps,
  productsLink,
} from "../src/lib/mock/home";
import { privacyPolicy } from "../src/lib/mock/legal";
import { portfolioPage } from "../src/lib/mock/portfolio";
import { productsPage } from "../src/lib/mock/products";
import { servicesPage } from "../src/lib/mock/services";
import { company, contact } from "../src/lib/site";
import { meterSizes } from "../src/lib/quote";
import type { CtaData, HighlightsData, LinkField, Media, StepsData } from "../src/types/common";
import type { ProductDetail } from "../src/types/products";

const OUT = join(process.cwd(), "wordpress/evstar-seed");
const images = new Set<string>();

/** Images are referenced by file name; the importer uploads them once. */
const image = (media?: Media) => {
  if (!media) return null;
  const file = basename(media.src);
  images.add(media.src);
  return { file, alt: media.alt };
};

const link = (l?: LinkField) => (l ? { label: l.label, href: l.href } : null);
const lines = (items?: string[]) => (items ?? []).map((text) => ({ text }));

const cta = (c: CtaData) => ({
  title: c.title,
  lead: c.lead ?? "",
  primary: link(c.primary),
  secondary: link(c.secondary),
  showLine: c.showLine ? 1 : 0,
});

const highlightsGroup = (h: HighlightsData) => ({
  title: h.title,
  lead: h.lead ?? "",
  items: h.items,
  link: link(h.link),
});

const steps = (s: StepsData) => ({
  title: s.title,
  lead: s.lead ?? "",
  steps: s.steps,
  link: link(s.link),
});

/* --- Products ---------------------------------------------------------- */

const ctaType = (label?: string) =>
  label === "ปรึกษาโครงการ" ? "consult" : label?.startsWith("สอบถาม") ? "ask" : "quote";

/** Slug = quote form model value (from the CTA's ?model=), else a slug of the name. */
const productSlug = (p: ProductDetail) => {
  const model = p.cta?.href.match(/[?&]model=([^&]+)/)?.[1];
  if (model && model !== "recommend") return model;
  return p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
};

const productBySlug = new Map<string, ProductDetail>();

const products = productsPage.categories.flatMap((category, ci) =>
  category.products.map((p, i) => {
    const slug = productSlug(p);
    productBySlug.set(slug, p);
    return {
      title: p.name,
      slug,
      category: category.id,
      menuOrder: ci * 100 + i + 1,
      image: image(p.image),
      fields: {
        brand: p.brand ?? "",
        kicker: p.kicker ?? "",
        tagline: p.tagline,
        features: lines(p.features),
        specs: p.specs ?? [],
        audience: p.audience ?? "",
        ctaType: ctaType(p.cta?.label),
      },
    };
  }),
);

const categories = productsPage.categories.map((c, i) => ({
  slug: c.id,
  name: c.label,
  fields: { navLabel: c.label, title: c.title, lead: c.lead ?? "", order: i + 1 },
}));

/* --- Home: tiles point at products ------------------------------------- */

const findProduct = (title: string) => {
  const hit = products.find(
    (p) => p.title === title || p.title.startsWith(title) || title.startsWith(p.title),
  ) ?? products.find((p) => p.title.split(" ")[0] === title.split(" ")[0]); // "EVCC Controller"

  if (!hit) throw new Error(`Home tile "${title}" matches no product`);
  return hit;
};

const tile = (t: { title: string; subtitle?: string; body?: string; image?: Media }) => {
  const product = findProduct(t.title);
  const text = t.subtitle ?? t.body ?? "";
  const productImage = productBySlug.get(product.slug)?.image?.src;
  return {
    product: product.slug,
    subtitleOverride: text && text !== product.fields.tagline ? text : "",
    imageOverride: t.image && t.image.src !== productImage ? image(t.image) : null,
  };
};

const home = {
  hero: {
    kicker: heroTile.kicker ?? "",
    title: heroTile.title,
    subtitle: heroTile.subtitle,
    image: image(heroTile.image),
    primary: link(heroTile.primary),
    secondary: link(heroTile.secondary),
    chargeLine: heroTile.chargeLine ?? null,
  },
  featuredProduct: tile(featuredTile),
  gridProducts: gridTiles.map(tile),
  accessories: accessoryCards.map(tile),
  productsLink: link(productsLink),
  highlights: highlightsGroup(highlights),
  process: steps(installSteps),
  finalCta: cta(finalCta),
};

/* --- Pages ------------------------------------------------------------- */

const pages = {
  home,
  products: { title: productsPage.title, lead: productsPage.lead, cta: cta(productsPage.cta) },
  services: {
    title: servicesPage.title,
    lead: servicesPage.lead,
    services: servicesPage.services.map((s) => ({
      icon: s.icon,
      anchor: s.id === s.icon ? "" : s.id,
      title: s.title,
      body: s.body,
      bullets: lines(s.bullets),
    })),
    process: steps(servicesPage.process),
    cta: cta(servicesPage.cta),
  },
  about: {
    hero: { ...aboutHero, kicker: aboutHero.kicker ?? "", image: image(aboutHero.image) },
    story: {
      ...aboutStory,
      kicker: aboutStory.kicker ?? "",
      paragraphs: lines(aboutStory.paragraphs),
      image: image(aboutStory.image),
    },
    why: highlightsGroup(aboutWhy),
    cta: cta(aboutCta),
  },
  portfolio: { title: portfolioPage.title, lead: portfolioPage.lead ?? "", cta: cta(portfolioPage.cta) },
  quote: {
    title: "ขอใบเสนอราคา",
    surveyTitle: "จองคิวสำรวจหน้างาน",
    lead: "กรอกข้อมูลเบื้องต้น ทีมงานจะติดต่อกลับเพื่อประเมินหน้างานและเสนอราคา",
    thankYou: "",
  },
};

const data = {
  generatedAt: new Date().toISOString(),
  categories,
  products,
  // Portfolio cases in the mocks are placeholders, so none are imported.
  pages,
  privacyPolicy: { title: privacyPolicy.title, content: legalToBlocks(privacyPolicy) },
  settings: {
    nameTh: company.nameTh,
    nameEn: company.nameEn,
    phone: contact.phone,
    email: contact.email,
    lineUrl: contact.lineUrl.startsWith("http") ? contact.lineUrl : "",
    address: "",
    openingHours: "",
    mapUrl: "",
    meterSizes: meterSizes.map(({ value, label }) => ({ value, label })),
    responseTime: "",
  },
};

mkdirSync(join(OUT, "images"), { recursive: true });
writeFileSync(join(OUT, "data.json"), JSON.stringify(data, null, 2) + "\n");
for (const src of images) {
  copyFileSync(join(process.cwd(), "public", src), join(OUT, "images", basename(src)));
}

console.log(
  `wrote ${products.length} products, ${categories.length} categories, ${Object.keys(pages).length} pages, ${images.size} images → ${OUT}`,
);
