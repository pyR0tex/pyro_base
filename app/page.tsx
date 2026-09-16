import Hero from "@/components/Hero";
import NavigationCard from "@/components/NavigationCard";
import FeaturedProjects from "@/components/FeaturedProjects";
import { navigation } from "@/data/site";

export default function HomePage() {
  return (
    <div className="space-y-16 sm:space-y-10">
      <Hero />
      <section aria-labelledby="explore-heading" className="space-y-5">
        <h2
          id="explore-heading"
          className="text-xs tracking-[0.2em] text-neutral-400"
        >
          EXPLORE
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {navigation.map((item) => (
            <NavigationCard key={item.href} {...item} />
          ))}
        </div>
      </section>
      <FeaturedProjects />
    </div>
  );
}
