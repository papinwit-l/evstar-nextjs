import { cache } from "react";
import { servicesPage as mockServicesPage } from "@/lib/mock/services";
import { isWordPressEnabled, wpQuery } from "@/lib/wp/client";
import {
  CTA,
  cta,
  first,
  lines,
  SEO,
  STEPS,
  steps,
  str,
  text,
  type WpCta,
  type WpSeo,
  type WpSteps,
} from "@/lib/wp/map";
import type { ServiceItem, ServicesPageData } from "@/types/services";

type WpServices = {
  title: string | null;
  lead: string | null;
  services:
    | {
        icon: string[] | null;
        anchor: string | null;
        title: string | null;
        body: string | null;
        bullets: { text: string | null }[] | null;
      }[]
    | null;
  process: WpSteps;
  cta: WpCta;
};

const SERVICES_QUERY = `
  query ServicesPage {
    evstarPage(key: SERVICES) {
      servicesPage {
        title lead
        services { icon anchor title body bullets { text } }
        process { ${STEPS} }
        cta { ${CTA} }
      }
      ${SEO}
    }
  }
`;

const ICONS: ServiceItem["icon"][] = ["install", "platform", "maintenance"];

export const getServicesPage = cache(async (): Promise<ServicesPageData> => {
  if (!isWordPressEnabled) return mockServicesPage;

  const data = await wpQuery<{
    evstarPage: { servicesPage: WpServices | null; pageSeo: WpSeo } | null;
  }>(SERVICES_QUERY, ["services"]);

  const page = data.evstarPage?.servicesPage;
  return {
    title: text(page?.title),
    lead: text(page?.lead),
    services: (page?.services ?? []).map((service, i, all) => {
      const raw = first(service.icon);
      const icon = ICONS.includes(raw as ServiceItem["icon"])
        ? (raw as ServiceItem["icon"])
        : "install";
      // Anchor defaults to the icon key; repeated icons get a number
      const repeated = all.filter((s) => first(s.icon) === raw).length > 1;
      return {
        id: service.anchor || (repeated ? `${icon}-${i + 1}` : icon),
        icon,
        title: text(service.title),
        body: text(service.body),
        bullets: lines(service.bullets),
      };
    }),
    process: steps(page?.process ?? null),
    cta: cta(page?.cta ?? null),
    seo: {
      title: str(data.evstarPage?.pageSeo?.seoTitle),
      description: str(data.evstarPage?.pageSeo?.seoDescription),
    },
  };
});
