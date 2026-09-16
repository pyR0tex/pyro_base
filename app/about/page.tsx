import ContactSection from "@/components/ContactSection";
import TechInterests from "@/components/TechInterests";

export default function AboutPage() {
  return (
    <section className="max-w-2xl space-y-8">
      <div className="space-y-3 border border-cyan-500/20 border-l-2 border-l-cyan-400 bg-gradient-to-br from-cyan-500/5 to-neutral-900/50 p-5 sm:p-7">
        <h1 className="text-3xl font-bold text-cyan-300">About</h1>
        <p className="text-neutral-300">I’m Ro -- creator of pyrotex.dev</p>
        <p className="text-neutral-300">Gamer / Anime Nerd</p>
        <p className="text-neutral-300">Obsessed with dev work and building</p>
      </div>
      <TechInterests />
      <ContactSection />
    </section>
  );
}
