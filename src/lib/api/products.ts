import { cache } from "react";
import { productsPage } from "@/lib/mock/products";
import type { ProductsPageData } from "@/types/products";

/** Later: WPGraphQL query for the "product" post type, grouped by category. */
export const getProductsPage = cache(async (): Promise<ProductsPageData> => {
  return productsPage;
});
