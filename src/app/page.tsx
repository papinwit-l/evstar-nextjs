import { HeroSection } from "@/components/home/HeroSection";
import { getHomePage, getLatestArticles } from "@/lib/api/home";

export default async function HomePage() {
  // Independent sources → fetch in parallel, not one after another
  const [home, articles] = await Promise.all([
    getHomePage(),
    getLatestArticles(3),
  ]);

  return (
    // Apple-style stacked tiles with a 12px gap between them
    <div className="grid gap-3 pt-3">
      <HeroSection data={home.hero} />
      {/* next: dark Core 240 tile, 2×2 product grid … <ArticlesSection items={articles} /> */}
    </div>
  );
}
