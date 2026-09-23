import { cache } from "react";
import { servicesPage } from "@/lib/mock/services";
import type { ServicesPageData } from "@/types/services";

/** Later: one WPGraphQL query with next: { tags: ["services"] }. */
export const getServicesPage = cache(async (): Promise<ServicesPageData> => {
  return servicesPage;
});
