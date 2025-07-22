import React, { useState } from "react";

/**
 * ContactForm.jsx
 * A custom contact form component that submits to Formspree via fetch()
 * and shows a success or error message without redirecting the page.
 */

export default function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const response = await fetch("https://formspree.io/f/movwrzvd", {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      form.reset();
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >
        <input
          name="name"
          type="text"
          placeholder="Name"
          required
          className="px-4 py-2 bg-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          required
          className="px-4 py-2 bg-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <textarea
          name="message"
          rows="6"
          placeholder="Your Message"
          required
          className="px-4 py-2 bg-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />

        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md font-semibold text-white transition-all duration-300 ease-in-out hover:from-pink-500 hover:to-purple-500"
        >
          Send Message
        </button>
      </form>

      {status === "success" && (
        <p className="mt-4 text-green-400 font-medium">✅ Message sent! Thank you.</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-400 font-medium">❌ Something went wrong. Try again.</p>
      )}
    </>
  );
}
