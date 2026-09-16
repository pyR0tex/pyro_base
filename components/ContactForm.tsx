"use client";

import { useId, useRef, useState } from "react";

export default function ContactForm() {
  const id = useId();
  const pending = useRef(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending.current) return;
    pending.current = true;
    setStatus("submitting");
    setFeedback("");
    const form = event.currentTarget;
    const values = new FormData(form);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(values)),
      });
      if (response.status === 503) {
        setStatus("error");
        setFeedback("Contact form is not available yet. Please try again later.");
        return;
      }
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        throw new Error("Contact submission failed");
      }
      setStatus("success");
      setFeedback("Message sent. I'll get back to you soon.");
      form.reset();
    } catch {
      setStatus("error");
      setFeedback("Something went wrong. Please try again.");
    } finally {
      pending.current = false;
    }
  }

  const fieldClass = "w-full border border-neutral-700 bg-neutral-900/50 p-3 text-sm disabled:opacity-60";
  return (
    <form onSubmit={onSubmit} aria-busy={status === "submitting"} className="space-y-4">
      <fieldset disabled={status === "submitting"} className="space-y-4">
        <div hidden aria-hidden="true">
          <label htmlFor={`${id}-website`}>Leave this field empty</label>
          <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" maxLength={200} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2"><label htmlFor={`${id}-name`} className="block text-sm text-neutral-300">Name</label><input id={`${id}-name`} name="name" autoComplete="name" required maxLength={100} className={fieldClass} /></div>
          <div className="space-y-2"><label htmlFor={`${id}-email`} className="block text-sm text-neutral-300">Email</label><input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} className={fieldClass} /></div>
        </div>
        <div className="space-y-2"><label htmlFor={`${id}-message`} className="block text-sm text-neutral-300">Message</label><textarea id={`${id}-message`} name="message" rows={5} required maxLength={5000} className={`${fieldClass} resize-y`} /></div>
        <button type="submit" className="border border-red-500/60 px-5 py-3 text-sm transition hover:bg-red-500/10 disabled:cursor-wait disabled:opacity-60">{status === "submitting" ? "Sending…" : "Send message"}</button>
      </fieldset>
      <p role="status" aria-live="polite" className={`text-sm leading-6 ${status === "error" ? "text-red-400" : "text-cyan-400"}`}>{feedback}</p>
    </form>
  );
}
