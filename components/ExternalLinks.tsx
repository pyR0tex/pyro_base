import { site } from "@/data/site";

export default function ExternalLinks() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
      {site.links.map(({ label, href }) => <li key={label}>
        {href ? <a href={href} target={label === "GitHub" ? "_blank" : undefined} rel={label === "GitHub" ? "noopener noreferrer" : undefined} className="text-rose-500/80 hover:underline">{label} ↗{label === "GitHub" && <span className="sr-only"> (opens in a new tab)</span>}</a> : <span className="text-neutral-400">{label} <span className="text-xs text-neutral-500">(coming soon)</span></span>}
      </li>)}
    </ul>
  );
}
