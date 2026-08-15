"use client";

import { motion } from "framer-motion";

export function BackgroundGlow() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-32 top-1/4 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl"
        animate={{ x: [0, 45, 0], y: [0, -25, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-32 bottom-1/4 h-80 w-80 rounded-full bg-rose-500/10 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 25, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-400/5 blur-3xl"
        animate={{ opacity: [0.35, 0.75, 0.35], scale: [0.9, 1.15, 0.9] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}