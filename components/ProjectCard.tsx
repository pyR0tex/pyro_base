import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article id={project.slug} className="flex flex-col border border-neutral-800 p-6 transition hover:border-rose-500/40 hover:shadow-[0_0_24px_rgba(244,63,94,0.05)]">
      <h3 className="text-xl font-semibold">{project.title}</h3>
      <p className="mt-3 text-sm leading-6 text-neutral-400">{project.description}</p>
      <ul aria-label="Technologies" className="mt-6 flex flex-wrap gap-2 text-xs text-neutral-300">
        {project.technologies.map((technology) => <li key={technology} className="border border-neutral-800 px-2 py-1">{technology}</li>)}
      </ul>
      {(project.githubUrl || project.liveUrl) && <div className="mt-6 flex flex-wrap gap-5 text-sm text-cyan-400">
        {project.githubUrl && <a href={project.githubUrl} className="hover:underline">GitHub ↗</a>}
        {project.liveUrl && <a href={project.liveUrl} className="hover:underline">Live site ↗</a>}
      </div>}
    </article>
  );
}
