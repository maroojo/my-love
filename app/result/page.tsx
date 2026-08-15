"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import { BackgroundGlow } from "@/components/romantic/BackgroundGlow";
import { FloatingHearts } from "@/components/romantic/FloatingHearts";
import { Celebration } from "@/components/romantic/Celebration";
import type { ResponseRecord } from "@/lib/types";

export default function ResultPage() {
  const [result, setResult] = useState<ResponseRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/response", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Failed");
        return response.json() as Promise<{
          latest: ResponseRecord | null;
        }>;
      })
      .then((data) => {
        if (active) setResult(data.latest);
      })
      .catch(() => {
        if (active) setResult(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const yes = result?.answer === "yes";

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <FloatingHearts />
      {yes && <Celebration />}

      <main className="relative z-10 mx-auto flex min-h-screen max-w-3xl items-center justify-center px-5 py-12">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-sm text-white/40"
          >
            Reading your answer...
          </motion.div>
        ) : !result ? (
          <EmptyResult />
        ) : (
          <ResultCard result={result} yes={yes} />
        )}
      </main>
    </div>
  );
}

function ResultCard({ result, yes }: { result: ResponseRecord; yes: boolean }) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.94, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.045] p-8 text-center shadow-2xl shadow-black/30 backdrop-blur-2xl sm:p-14"
    >
      <motion.div
        className="absolute left-1/2 top-0 h-40 w-64 -translate-x-1/2 rounded-full bg-pink-400/10 blur-3xl"
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <div className="relative">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 180 }}
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-pink-200/20 bg-pink-300/10"
        >
          {yes ? (
            <Heart className="h-9 w-9 fill-pink-200 text-pink-100" />
          ) : (
            <Heart className="h-9 w-9 text-white/70" />
          )}
        </motion.div>

        <p className="text-xs uppercase tracking-[0.35em] text-pink-200/50">
          Your answer
        </p>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl"
        >
          {yes ? (
            <>
              It&apos;s a{" "}
              <span className="bg-gradient-to-r from-rose-200 via-pink-300 to-fuchsia-200 bg-clip-text text-transparent">
                YES!
              </span>{" "}
              ❤️
            </>
          ) : (
            <>
              Maybe another
              <br />
              <span className="text-white/75">time 🤍</span>
            </>
          )}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-5 text-2xl font-light text-white/75"
        >
          {yes ? "เราเป็นแฟนกันแล้วนะ ❤️" : "ไม่เป็นไรนะ 🤍"}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mx-auto mt-7 max-w-md text-sm leading-7 text-white/40"
        >
          {yes
            ? "You just made my heart very happy. Here’s to all the little moments ahead."
            : "Thank you for being honest. No pressure, no hard feelings."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm text-white/70 transition hover:border-white/20 hover:bg-white/[0.09] hover:text-white"
          >
            <RotateCcw className="h-4 w-4" />
            Ask again
          </Link>
        </motion.div>

        {yes && (
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-white/25">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Something beautiful just began.</span>
          </div>
        )}
      </div>
    </motion.section>
  );
}

function EmptyResult() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative w-full max-w-lg rounded-[2rem] border border-white/10 bg-white/[0.045] p-10 text-center backdrop-blur-2xl"
    >
      <Heart className="mx-auto h-10 w-10 text-pink-200/60" />
      <h1 className="mt-6 text-3xl font-semibold text-white">
        No answer yet
      </h1>
      <p className="mt-3 text-sm leading-6 text-white/40">
        ยังไม่มีคำตอบนะ ลองกลับไปถามคำถามสำคัญกันก่อน
      </p>
      <Link
        href="/"
        className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:scale-[1.02]"
      >
        <Heart className="h-4 w-4 fill-current" />
        Ask the question
      </Link>
    </motion.section>
  );
}