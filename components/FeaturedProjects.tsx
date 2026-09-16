import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects() {
  return (
    <section aria-labelledby="featured-heading" className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2
          id="featured-heading"
          className="text-xs tracking-[0.2em] text-neutral-400"
        >
          FEATURED
        </h2>
        <Link
          href="/projects"
          className="text-sm text-cyan-400 hover:underline"
        >
          View all projects →
        </Link>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {projects
          .filter((project) => project.featured)
          .map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
      </div>
    </section>
  );
}
