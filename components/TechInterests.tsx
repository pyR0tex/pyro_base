const interests = [
  "Software Development",
  "Full-Stack Development",
  "Automation",
  "AI / Machine Learning",
  "Developer Tools",
  "Experimentation",
];

export default function TechInterests() {
  return (
    <section
      aria-labelledby="interests-heading"
      className="space-y-5 border border-cyan-500/20 border-l-2 border-l-cyan-400 bg-gradient-to-br from-cyan-500/5 to-neutral-900/50 p-5 sm:p-7"
    >
      <h2
        id="interests-heading"
        className="text-2xl font-semibold text-cyan-400"
      >
        INTERESTS
      </h2>
      <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-neutral-300">
        {interests.map((interest) => (
          <li
            key={interest}
            className="border border-cyan-500/15 bg-neutral-950/50 px-3 py-2"
          >
            {interest}
          </li>
        ))}
      </ul>
      <p className="text-sm leading-7 text-neutral-500">
        TypeScript · React · Next.js · Python · SQL · C · C++ · UiPath ·
        Tricentis Tosca · SAP
      </p>
    </section>
  );
}
