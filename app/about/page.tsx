import ContactSection from "@/components/ContactSection";
import TechInterests from "@/components/TechInterests";

export default function AboutPage() {
  return (
    <section className="max-w-2xl space-y-8">
      <div className="space-y-3 border border-red-500/20 border-l-2 border-l-red-400 bg-gradient-to-br from-red-500/5 to-neutral-900/50 p-5 sm:p-7">
        <h1 className="text-3xl font-bold text-red-400">About</h1>
        <p className="text-neutral-300">I’m Ro -- creator of pyrotex.dev</p>
        <p className="text-neutral-300">
          Gamer | Anime Nerd | Obsessed with dev work and building
        </p>
        <p className="text-neutral-300">
          Experience: Software and Autmation Engineer focused on building
          practical tools, solving real-world problems, and working across
          full-stack development, RPA, and AI/ML.
        </p>
      </div>
      <TechInterests />
      <ContactSection />
    </section>
  );
}
