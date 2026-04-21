"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import Reveal from "../utils/Reveal";
import { motion } from "framer-motion";

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
    <div className="w-full max-w-4xl mx-auto px-6 font-sans py-20">
      <Reveal delay={0.1}>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-3">
            Let&apos;s <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">Connect</span>
          </h2>
          <p className="text-sm text-neutral-400 font-mono">
            POST /contact
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <form
          onSubmit={handleSubmit}
          className="glass-panel w-full max-w-xl mx-auto p-6 md:p-10 relative overflow-hidden"
        >
          {/* Subtle glow behind form */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-900/10 rounded-full blur-[80px] pointer-events-none" />

          <div className="space-y-6 mb-8 relative z-10">
            <div className="relative group">
              <input
                name="name"
                required
                placeholder=" "
                value={formData.name}
                onChange={handleChange}
                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-base text-white focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all"
              />
              <label className="absolute text-sm text-neutral-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-400">
                Name
              </label>
            </div>

            <div className="relative group">
              <input
                name="email"
                type="email"
                required
                placeholder=" "
                value={formData.email}
                onChange={handleChange}
                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-base text-white focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all"
              />
              <label className="absolute text-sm text-neutral-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-400">
                Email
              </label>
            </div>

            <div className="relative group">
              <textarea
                name="message"
                required
                placeholder=" "
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="peer w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-6 pb-2 text-base text-white resize-none focus:outline-none focus:border-red-500/50 focus:bg-white/10 transition-all"
              />
              <label className="absolute text-sm text-neutral-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3 peer-focus:text-red-400">
                Message
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10">
            <div className="text-sm font-mono h-5 flex items-center">
              <span className="text-neutral-500 mr-2">status:</span>
              {status === "idle" && <span className="text-neutral-400">awaiting_input</span>}
              {status === "sending" && (
                <span className="text-yellow-500 flex items-center gap-2">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="inline-block w-3 h-3 border-2 border-yellow-500 border-t-transparent rounded-full"
                  />
                  transmitting...
                </span>
              )}
              {status === "success" && <span className="text-green-500">200 OK</span>}
              {status === "error" && <span className="text-red-500">500 Internal Error</span>}
            </div>

            <button
              disabled={status === "sending"}
              className="w-full sm:w-auto bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 px-8 py-3 rounded-full text-white font-medium transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(220,38,38,0.3)]"
            >
              Send Message
            </button>
          </div>
        </form>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="mt-12 flex justify-center gap-8 text-sm font-mono text-neutral-400">
          <a
            href="https://github.com/ishaan-jindal"
            target="_blank"
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            github ↗
          </a>
          <a
            href="mailto:ishaanjindal2006@gmail.com"
            className="hover:text-white transition-colors flex items-center gap-2"
          >
            email ↗
          </a>
        </div>
      </Reveal>
    </div>
  );
};

export default ContactSection;

