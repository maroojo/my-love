"use client";

import { motion } from "framer-motion";

const hearts = [
  { left: "8%", delay: 0, duration: 9, size: 14 },
  { left: "18%", delay: 2.5, duration: 11, size: 10 },
  { left: "31%", delay: 1.2, duration: 10, size: 13 },
  { left: "68%", delay: 3.1, duration: 12, size: 11 },
  { left: "79%", delay: 0.8, duration: 10, size: 15 },
  { left: "91%", delay: 4, duration: 13, size: 9 },
];

export function FloatingHearts() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
      {hearts.map((heart, index) => (
        <motion.div
          key={`${heart.left}-${index}`}
          className="absolute bottom-[-24px] select-none text-pink-300/20"
          style={{ left: heart.left, fontSize: heart.size }}
          animate={{ y: [0, -900], x: [0, index % 2 ? 25 : -20], opacity: [0, 0.8, 0] }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          ♥
        </motion.div>
      ))}
    </div>
  );
}