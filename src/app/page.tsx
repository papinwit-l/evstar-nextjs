import { AccessoryCards } from "@/components/home/AccessoryCards";
import { ArticlesSection } from "@/components/home/ArticlesSection";
import { CompareSection } from "@/components/home/CompareSection";
import { HeroSection } from "@/components/home/HeroSection";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { OemSection } from "@/components/home/OemSection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { ProductTile } from "@/components/home/ProductTile";
import { ChevronLink } from "@/components/shared/ChevronLink";
import { CtaSection } from "@/components/shared/CtaSection";
import { getHomePage, getLatestArticles } from "@/lib/api/home";

export default async function HomePage() {
  // Independent sources → fetch in parallel.
  // Home fields are required (a failure shows error.tsx);
  // articles are optional (a failure just hides that section).
  const [home, articles] = await Promise.all([
    getHomePage(),
    getLatestArticles(3).catch(() => []),
  ]);

  return (
    <>
      {/* Apple-style stacked tiles with a 12px gap between them */}
      <div className="grid gap-3 pt-3">
        <HeroSection data={home.hero} />
        <ProductGrid items={home.grid} />
        <ProductTile data={home.featured} variant="dark" />
        <AccessoryCards items={home.accessories} />
      </div>

      <p className="pt-9 text-center text-[1.05rem]">
        <ChevronLink href={home.productsLink.href}>
          {home.productsLink.label}
        </ChevronLink>
      </p>

      <CompareSection data={home.compare} />
      <HighlightsSection data={home.highlights} />
      <OemSection data={home.oem} />
      <ArticlesSection items={articles} />
      <CtaSection data={home.finalCta} />
    </>
  );
}
