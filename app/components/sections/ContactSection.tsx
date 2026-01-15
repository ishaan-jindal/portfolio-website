"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import ScrollSection from "../utils/ScrollSection";

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
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <ScrollSection>
      <div className="flex flex-col items-center font-mono">
        <h2 className="text-3xl font-semibold mb-2">
          Initiate Contact
        </h2>
        <p className="text-xs text-neutral-500 mb-8">
          POST /contact
        </p>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-neutral-900 rounded-xl shadow-lg 
            p-5 sm:p-6 md:p-8"
        >
          <div className="space-y-4 mb-6">
            <input
              name="name"
              required
              placeholder="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2 text-sm text-base focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <input
              name="email"
              type="email"
              required
              placeholder="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2 text-sm text-base focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <textarea
              name="message"
              required
              placeholder="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-neutral-800 border border-neutral-700 rounded px-4 py-2 text-sm resize-none text-base focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <span className="text-neutral-500">
              status:{" "}
              <span
                className={
                  status === "success"
                    ? "text-green-500"
                    : status === "sending"
                    ? "text-yellow-500"
                    : status === "error"
                    ? "text-red-500"
                    : "text-neutral-400"
                }
              >
                {status}
              </span>
            </span>

            <button
              disabled={status === "sending"}
              className="bg-red-600 hover:bg-red-700 px-4 py-3.5 sm:py-3 rounded text-white"
            >
              Send Request
            </button>
          </div>
        </form>
      </div>
    </ScrollSection>
  );
};

export default ContactSection;

