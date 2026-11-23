import { cache } from "react";
import { productsPage as mockProductsPage } from "@/lib/mock/products";
import { isWordPressEnabled, wpQuery } from "@/lib/wp/client";
import {
  CTA,
  cta,
  IMAGE,
  lines,
  media,
  SEO,
  str,
  text,
  type WpCta,
  type WpImage,
  type WpSeo,
} from "@/lib/wp/map";
import type { LinkField } from "@/types/common";
import type {
  ProductCategory,
  ProductDetail,
  ProductsPageData,
} from "@/types/products";

/** Accessories are not charger models: they're not in the quote form's model list. */
export const ACCESSORIES_CATEGORY = "accessories";

/** A product with the bits other pages need (slug for ?model=, category for #anchors). */
export type CatalogProduct = ProductDetail & {
  slug: string;
  categoryId: string;
};

export type Catalog = {
  /** Categories in display order, each with its products in display order */
  categories: ProductCategory[];
  products: CatalogProduct[];
};

/* --- WordPress -------------------------------------------------------- */

type WpProduct = {
  title: string;
  slug: string;
  featuredImage: WpImage;
  productCategories: { nodes: { slug: string }[] } | null;
  productFields: {
    brand: string | null;
    kicker: string | null;
    tagline: string | null;
    features: { text: string | null }[] | null;
    specs: { label: string | null; value: string | null }[] | null;
    audience: string | null;
    ctaType: string[] | null;
  } | null;
};

type WpCategory = {
  slug: string;
  name: string;
  productCategoryFields: {
    navLabel: string | null;
    title: string | null;
    lead: string | null;
    order: number | null;
  } | null;
};

const CATALOG_QUERY = `
  query Catalog {
    products(first: 100, where: { orderby: { field: MENU_ORDER, order: ASC } }) {
      nodes {
        title
        slug
        featuredImage { ${IMAGE} }
        productCategories { nodes { slug } }
        productFields {
          brand kicker tagline audience ctaType
          features { text }
          specs { label value }
        }
      }
    }
    productCategories(first: 50) {
      nodes {
        slug
        name
        productCategoryFields { navLabel title lead order }
      }
    }
  }
`;

const CTA_LABELS: Record<string, string> = {
  quote: "ขอใบเสนอราคา",
  consult: "ปรึกษาโครงการ",
  ask: "สอบถามเพิ่มเติม",
};

function productCta(slug: string, categoryId: string, type?: string): LinkField {
  const model = categoryId === ACCESSORIES_CATEGORY ? "recommend" : slug;
  return {
    label: CTA_LABELS[type ?? "quote"] ?? CTA_LABELS.quote,
    href: `/quote?model=${encodeURIComponent(model)}`,
  };
}

function mapProduct(node: WpProduct): CatalogProduct {
  const f = node.productFields;
  const categoryId = node.productCategories?.nodes[0]?.slug ?? "";
  return {
    slug: node.slug,
    categoryId,
    name: node.title,
    brand: str(f?.brand),
    kicker: str(f?.kicker),
    tagline: text(f?.tagline),
    features: lines(f?.features),
    specs: (f?.specs ?? [])
      .filter((row) => row.label || row.value)
      .map((row) => ({ label: text(row.label), value: text(row.value) })),
    audience: str(f?.audience),
    image: media(node.featuredImage, node.title),
    cta: productCta(node.slug, categoryId, f?.ctaType?.[0]),
  };
}

/**
 * Published products grouped by category. Shared by /products, the home
 * tiles, the quote form's model list and the footer.
 */
export const getCatalog = cache(async (): Promise<Catalog> => {
  if (!isWordPressEnabled) return mockCatalog();

  const data = await wpQuery<{
    products: { nodes: WpProduct[] };
    productCategories: { nodes: WpCategory[] };
  }>(CATALOG_QUERY, ["products"]);

  const products = data.products.nodes.map(mapProduct);

  const categories = data.productCategories.nodes
    .slice()
    .sort(
      (a, b) =>
        (a.productCategoryFields?.order ?? 0) -
        (b.productCategoryFields?.order ?? 0),
    )
    .map((term) => ({
      id: term.slug,
      label: term.productCategoryFields?.navLabel || term.name,
      title: term.productCategoryFields?.title || term.name,
      lead: str(term.productCategoryFields?.lead),
      products: products.filter((p) => p.categoryId === term.slug),
    }))
    // Hide categories the client has emptied
    .filter((category) => category.products.length > 0);

  return { categories, products };
});

const PRODUCTS_PAGE_QUERY = `
  query ProductsPage {
    evstarPage(key: PRODUCTS) {
      productsPage { title lead cta { ${CTA} } }
      ${SEO}
    }
  }
`;

export const getProductsPage = cache(async (): Promise<ProductsPageData> => {
  if (!isWordPressEnabled) return mockProductsPage;

  const [catalog, data] = await Promise.all([
    getCatalog(),
    wpQuery<{
      evstarPage: {
        productsPage: { title: string | null; lead: string | null; cta: WpCta } | null;
        pageSeo: WpSeo;
      } | null;
    }>(PRODUCTS_PAGE_QUERY, ["products"]),
  ]);

  const page = data.evstarPage?.productsPage;
  return {
    title: text(page?.title),
    lead: text(page?.lead),
    categories: catalog.categories,
    cta: cta(page?.cta ?? null),
    seo: {
      title: str(data.evstarPage?.pageSeo?.seoTitle),
      description: str(data.evstarPage?.pageSeo?.seoDescription),
    },
  };
});

/* --- Mock fallback ---------------------------------------------------- */

function mockCatalog(): Catalog {
  const categories = mockProductsPage.categories;
  const products = categories.flatMap((category) =>
    category.products.map((product) => {
      const model = product.cta?.href.match(/[?&]model=([^&]+)/)?.[1];
      const slug =
        model && model !== "recommend"
          ? model
          : product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return { ...product, slug, categoryId: category.id };
    }),
  );
  return { categories, products };
}
