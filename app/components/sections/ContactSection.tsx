"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Reveal from "../utils/Reveal";

type Status = "idle" | "sending" | "success" | "error";

const ContactSection = () => {
  const [status, setStatus] = useState<Status>("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== "idle") return;

    setStatus("sending");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 font-sans py-12 sm:py-20">
      <Reveal delay={0.1}>
        <div className="max-w-2xl mx-auto text-center mb-12">
          <p className="font-mono text-sm text-[var(--accent)] mb-3">
            Contact
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-[var(--foreground)] mb-3 sm:mb-4">
            Open for Interesting Work
          </h2>
          <p className="text-base leading-7 text-[var(--muted)]">
            I&apos;m open to internships, collaborations, and projects where thoughtful engineering matters.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <form onSubmit={handleSubmit} className="ascii-panel w-full max-w-2xl mx-auto">
          <div className="space-y-5 mb-8">
            <label className="block">
              <span className="form-label">Name</span>
              <input
                name="name"
                required
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="text-input"
              />
            </label>

            <label className="block">
              <span className="form-label">Email</span>
              <input
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className="text-input"
              />
            </label>

            <label className="block">
              <span className="form-label">Message</span>
              <textarea
                name="message"
                required
                placeholder="What would you like to build or discuss?"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="text-input resize-none"
              />
            </label>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="min-h-6 text-sm font-mono">
              {status === "idle" && <span className="text-[var(--muted)]">Ready when you are.</span>}
              {status === "sending" && <span className="text-[var(--accent-2)]">Sending your message...</span>}
              {status === "success" && <span className="text-[var(--accent-2)]">Message sent. Thank you.</span>}
              {status === "error" && <span className="text-[var(--accent)]">Something went wrong. Please try email instead.</span>}
            </div>

            <button
              disabled={status === "sending"}
              className="text-button text-button--primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Send Message
            </button>
          </div>
        </form>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm font-mono text-[var(--muted)]">
          <a
            href="https://github.com/ishaan-jindal"
            target="_blank"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="mailto:ishaanjindal2006@gmail.com"
            className="hover:text-[var(--foreground)] transition-colors"
          >
            Email
          </a>
        </div>
      </Reveal>
    </div>
  );
};

export default ContactSection;
