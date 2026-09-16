import Link from "next/link";

export default function NavigationCard({ href, title, description }: { href: string; title: string; description: string }) {
  return (
    <Link href={href} className="group border border-neutral-800 p-5 transition hover:border-cyan-500/50 hover:bg-cyan-500/5 hover:shadow-[0_0_20px_rgba(34,211,238,0.06)]">
      <h3 className="flex items-center justify-between gap-4 text-lg font-semibold text-cyan-400">{title}<span aria-hidden="true" className="text-neutral-600 group-hover:text-rose-400">↗</span></h3>
      <p className="mt-3 text-sm leading-6 text-neutral-400">{description}</p>
    </Link>
  );
}
