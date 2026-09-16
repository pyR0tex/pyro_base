import { site } from "@/data/site";

export default function ExternalLinks() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
      {site.links.map(({ label, href }) => {
        const opensInNewTab = label === "GitHub" || label === "LinkedIn";

        return <li key={label}>
          {href ? <a href={href} target={opensInNewTab ? "_blank" : undefined} rel={opensInNewTab ? "noopener noreferrer" : undefined} className="text-rose-500/80 hover:underline">{label} ↗{opensInNewTab && <span className="sr-only"> (opens in a new tab)</span>}</a> : <span className="text-neutral-400">{label} <span className="text-xs text-neutral-500">(coming soon)</span></span>}
        </li>;
      })}
    </ul>
  );
}
