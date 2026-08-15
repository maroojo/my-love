"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

const particles = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  x: ((index * 37) % 100) - 50,
  y: -120 - ((index * 43) % 180),
  rotate: (index * 29) % 180,
  delay: (index % 6) * 0.08,
}));

export function Celebration() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute left-1/2 top-1/2 text-pink-200/80"
          initial={{ x: 0, y: 0, opacity: 0, scale: 0.3, rotate: 0 }}
          animate={{
            x: particle.x * 5,
            y: particle.y,
            opacity: [0, 1, 0],
            scale: [0.3, 1, 0.4],
            rotate: particle.rotate,
          }}
          transition={{ duration: 2.2, delay: particle.delay, ease: "easeOut" }}
        >
          {particle.id % 3 === 0 ? (
            <Sparkles className="h-4 w-4" />
          ) : (
            <Heart className="h-3 w-3 fill-current" />
          )}
        </motion.div>
      ))}
    </div>
  );
}