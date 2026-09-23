import { AccessoryCards } from "@/components/home/AccessoryCards";
import { HeroSection } from "@/components/home/HeroSection";
import { HighlightsSection } from "@/components/home/HighlightsSection";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { ProductGrid } from "@/components/home/ProductGrid";
import { ProductTile } from "@/components/home/ProductTile";
import { ChevronLink } from "@/components/shared/ChevronLink";
import { CtaSection } from "@/components/shared/CtaSection";
import { StepsSection } from "@/components/shared/StepsSection";
import { getHomePage } from "@/lib/api/home";
import { getPortfolioPreview } from "@/lib/api/portfolio";

export default async function HomePage() {
  // Independent sources → fetch in parallel.
  // Home fields are required (a failure shows error.tsx);
  // the portfolio is optional (a failure just hides that section).
  const [home, portfolio] = await Promise.all([
    getHomePage(),
    getPortfolioPreview(3).catch(() => null),
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

      <p className="py-9 text-center text-[1.05rem]">
        <ChevronLink href={home.productsLink.href}>
          {home.productsLink.label}
        </ChevronLink>
      </p>

      <HighlightsSection data={home.highlights} />
      <StepsSection data={home.process} />
      {portfolio && <PortfolioPreview data={portfolio} />}
      <CtaSection data={home.finalCta} />
    </>
  );
}
