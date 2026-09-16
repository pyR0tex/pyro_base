import ContactForm from "./ContactForm";
import ExternalLinks from "./ExternalLinks";

export default function ContactSection() {
  return (
    <section aria-labelledby="contact-heading" className="space-y-6 border border-red-500/20 border-l-2 border-l-red-600 bg-gradient-to-br from-neutral-900/70 to-red-950/20 p-5 sm:p-7">
      <h2
        id="contact-heading"
        className="text-2xl font-semibold text-rose-500/80"
      >
        CONTACT
      </h2>
      <p className="max-w-xl text-xl leading-8">
        Have a project, role, or idea you want to talk about?
      </p>
      <ExternalLinks />
      <div className="max-w-2xl">
        <ContactForm />
      </div>
    </section>
  );
}
