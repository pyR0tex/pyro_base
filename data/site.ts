export const site = {
  name: "pyR0tex.dev",
  // TODO: Add the Resume URL when available.
  links: [
    { label: "Email", href: "mailto:rohit6cheruku@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/rkcheruk" },
    { label: "GitHub", href: "https://github.com/pyR0tex/" },
    { label: "Resume", href: null },
  ] as { label: string; href: string | null }[],
};

export const navigation = [
  { href: "/about", title: "About", description: "Background, experience, interests, and more about me." },
  { href: "/lab", title: "Lab", description: "Experiments, prototypes, small builds, and ideas I am exploring." },
  { href: "/notes", title: "Notes", description: "Technical notes, things I have learned, and useful references." },
  { href: "/projects", title: "Projects", description: "A curated archive of finished builds, larger projects, and case studies." },
];
