// app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import ExternalLinks from "@/components/ExternalLinks";
import { navigation, site } from "@/data/site";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ro — Software Engineer",
  description: "Projects, writing, and experiments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Browser extensions can inject attributes such as data-tricentis-frame-token.
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${jetbrains.className} min-h-screen bg-neutral-950 text-neutral-100 antialiased`}
      >
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:bg-neutral-950 focus:p-4">Skip to content</a>
        <header className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-5 border-b border-neutral-800 px-6 py-5">
          <Link href="/" className="font-semibold tracking-tight">
            {site.name}
          </Link>
          <nav aria-label="Main navigation" className="flex flex-wrap gap-5 text-sm text-neutral-400">
            {navigation.map((item) => <Link key={item.href} href={item.href} className="hover:text-cyan-400">{item.title}</Link>)}
          </nav>
        </header>
        <main id="main-content" className="mx-auto max-w-5xl px-6 py-10">{children}</main>
        <footer className="mx-auto mt-10 max-w-5xl space-y-6 border-t border-neutral-800 px-6 py-10 text-sm text-neutral-500">
            <ExternalLinks />
            <p>© {new Date().getFullYear()} {site.name} · Built by Ro</p>
        </footer>
      </body>
    </html>
  );
}
