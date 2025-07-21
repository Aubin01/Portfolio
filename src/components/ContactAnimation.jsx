/**
 * ContactAnimation.jsx
 * Renders a looping Lottie animation with fade-up motion on scroll.
 * Used in the Contact section of the website.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import chatAnimation from '../assets/svg/chat.json';

// Motion variant for fade-up effect
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/**
 * Displays a chat-themed Lottie animation with scroll-triggered fade-up.
 */
export default function ContactAnimation() {
  return (
    <motion.div
      className="flex justify-center items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <Player autoplay loop src={chatAnimation} className="w-full max-w-xs" />
    </motion.div>
  );
}
