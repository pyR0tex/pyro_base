import Link from "next/link";

export default function Hero() {
  return (
    <section className="space-y-5 py-8 sm:py-16">
      <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Index</p>
      <h1 className="text-4xl font-bold md:text-5xl">Ro — Software Engineer</h1>
      <p className="max-w-2xl text-neutral-300">
        I code for fun. This is my dungeon of experiments & projects.
      </p>
      <div className="flex flex-wrap gap-3 pt-1">
        <Link href="/projects" className="border border-cyan-500/60 px-4 py-2 text-sm text-neutral-100 transition hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.12)]">Explore Projects</Link>
        <Link href="/about" className="border border-rose-500/60 px-4 py-2 text-sm text-neutral-100 transition hover:bg-rose-500/10 hover:shadow-[0_0_20px_rgba(244,63,94,0.12)]">About Me</Link>
      </div>
    </section>
  );
}
