import Link from "next/link";

export default function PlaceholderPage({ title, description }: { title: string; description: string }) {
  return <section className="max-w-2xl space-y-5"><p className="text-xs uppercase tracking-[0.2em] text-rose-400">Coming soon</p><h1 className="text-3xl font-bold">{title}</h1><p className="leading-7 text-neutral-400">{description}</p><Link href="/" className="inline-block text-sm text-cyan-400 hover:underline">← Back to home</Link></section>;
}
