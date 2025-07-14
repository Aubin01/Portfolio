import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import chatAnimation from '../assets/svg/chat.json';
import SectionHeader from '../components/SectionHeader.jsx';

// Motion variants for fade-up animations
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await fetch('https://formspree.io/f/movwrzvd', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (response.ok) {
        setStatus('Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again later.');
      }
    } catch {
      setStatus('Network error. Please try again.');
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-black text-white px-6 py-40 font-sans"
    >
      {/* Section Header */}
   <SectionHeader title="Contact"/>

      {/* Form & Animation Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Lottie Animation on Left */}
        <motion.div
          className="flex justify-center items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <Player autoplay loop src={chatAnimation} className="w-full max-w-xs" />
        </motion.div>

        {/* Form card */}
        <motion.div
          className="backdrop-blur-md bg-white/5 rounded-xl p-8 shadow-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <p className="text-lg text-gray-300 mb-2">
            Have a project idea or just want to say hello? Fill out the form below.
          </p>
          {/* Solid dark purple divider */}
          <div className="h-px w-24 bg-purple-900 mb-6 rounded" />

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="px-4 py-2 bg-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="px-4 py-2 bg-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <textarea
              name="message"
              rows={6}
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              className="px-4 py-2 bg-white/10 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-md font-semibold text-white transition-all duration-300 ease-in-out hover:from-pink-500 hover:to-purple-500"
            >
              Send Message
            </button>
            {status && <p className="mt-4 text-green-400 text-center">{status}</p>}
          </form>
        </motion.div>
      </div>
    </section>
  );
}
