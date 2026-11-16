import { BIM_ORIGIN, BIM_SEO, MAIN_ORIGIN } from "@/config/bim-seo";

/** WebSite (márka) + Organization (jogi szolgáltató) + Service — review/rating nélkül. */
export function bimHomeJsonLd() {
  const sameAs = BIM_SEO.sameAs.length > 0 ? { sameAs: [...BIM_SEO.sameAs] } : {};

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": BIM_SEO.websiteId,
        name: BIM_SEO.siteName,
        url: BIM_ORIGIN,
        inLanguage: "hu-HU",
        publisher: { "@id": BIM_SEO.legalOrganizationId },
        about: { "@id": BIM_SEO.serviceId },
      },
      {
        "@type": "Organization",
        "@id": BIM_SEO.legalOrganizationId,
        name: BIM_SEO.legalOrganizationName,
        url: MAIN_ORIGIN,
        ...sameAs,
      },
      {
        "@type": "Organization",
        "@id": BIM_SEO.brandOrganizationId,
        name: BIM_SEO.siteName,
        url: BIM_ORIGIN,
        parentOrganization: { "@id": BIM_SEO.legalOrganizationId },
      },
      {
        "@type": "Service",
        "@id": BIM_SEO.serviceId,
        name: "Ipari és épületfelmérés, pontfelhő",
        serviceType: "3D térfelmérés és pontfelhő",
        provider: { "@id": BIM_SEO.legalOrganizationId },
        brand: { "@id": BIM_SEO.brandOrganizationId },
        areaServed: "HU",
        url: BIM_ORIGIN,
        description: BIM_SEO.defaultDescription,
      },
    ],
  };
}

export function bimBreadcrumbJsonLd(items: readonly { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path
        ? { item: item.path === "/" ? `${BIM_ORIGIN}/` : `${BIM_ORIGIN}${item.path}` }
        : {}),
    })),
  };
}
