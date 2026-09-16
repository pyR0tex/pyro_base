import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  return (
    <section className="space-y-8">
      <div className="space-y-3"><h1 className="text-3xl font-bold">Projects</h1><p className="text-neutral-400">A curated archive of finished builds, larger projects, and case studies.</p></div>
      <h2 className="sr-only">Project archive</h2>
      <div className="grid gap-4 md:grid-cols-2">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</div>
    </section>
  );
}
