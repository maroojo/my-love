"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Heart, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { Answer } from "@/lib/types";

export function QuestionCard() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState<Answer | null>(null);
  const [error, setError] = useState("");

  async function choose(answer: Answer) {
    if (submitting) return;

    setError("");
    setSubmitting(answer);

    try {
      const response = await fetch("/api/response", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answer }),
      });

      if (!response.ok) throw new Error("Request failed");

      router.push("/result");
      router.refresh();
    } catch {
      setSubmitting(null);
      setError("Something went wrong. กรุณาลองอีกครั้งนะ");
    }
  }

  return (
    <motion.main
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 px-4 w-full max-w-xl mx-auto flex justify-center items-center"
    >
      <section className="text-center w-full flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.7, type: "spring" }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] shadow-2xl shadow-pink-500/10 backdrop-blur-xl"
        >
          <Heart className="h-7 w-7 fill-pink-300/80 text-pink-200" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-pink-200/60"
        >
          One little question
        </motion.p>

        <div className="space-y-2 text-center w-full">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7 }}
            className="text-4xl sm:text-6xl font-semibold tracking-[-0.04em] text-white leading-tight"
          >
            Will you be
            <br />
            <span className="bg-gradient-to-r from-rose-200 via-pink-300 to-fuchsia-200 bg-clip-text text-transparent">
              my love?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="pt-3 text-xl sm:text-2xl font-light tracking-tight text-white/80"
          >
            เป็นแฟนกันไหม?
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75 }}
          className="mx-auto mt-6 max-w-md text-sm leading-6 text-white/50 px-2"
        >
          There is only one question that matters.
          <br />
          มีคำถามเดียวที่อยากถามคุณ
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          className="mx-auto mt-8 grid w-full max-w-md gap-3"
        >
          <AnswerButton
            answer="yes"
            title="Yes, I do"
            subtitle="ใช่ ❤️"
            icon={<Heart className="h-5 w-5 fill-current mr-2" />}
            loading={submitting === "yes"}
            disabled={submitting !== null}
            onClick={choose}
            primary
          />

          <AnswerButton
            answer="no"
            title="Maybe not..."
            subtitle=""
            icon={<ArrowRight className="h-3! w-5" />}
            loading={submitting === "no"}
            disabled={submitting !== null}
            onClick={choose}
          />
        </motion.div>

        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-5 text-sm text-rose-200"
              role="alert"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        <p className="mt-8 text-[11px] uppercase tracking-[0.25em] text-white/30">
          Take your time · No pressure
        </p>
      </section>
    </motion.main>
  );
}

function AnswerButton({
  answer,
  title,
  subtitle,
  icon,
  loading,
  disabled,
  onClick,
  primary = false,
}: {
  answer: Answer;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  loading: boolean;
  disabled: boolean;
  onClick: (answer: Answer) => void;
  primary?: boolean;
}) {
  return (
    <motion.button
      type="button"
      whileHover={disabled ? undefined : { scale: 1.02, y: -2 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      onClick={() => onClick(answer)}
      disabled={disabled}
      aria-label={`${title} — ${subtitle}`}
      className={[
        "group relative flex min-h-16 sm:min-h-20 w-full items-center justify-between overflow-hidden rounded-2xl border px-5 py-3.5 text-left transition-all duration-300",
        primary
          ? "border-pink-300/25 bg-gradient-to-r from-pink-500/20 via-rose-500/15 to-fuchsia-500/20 shadow-xl shadow-pink-500/10 hover:border-pink-200/40 hover:shadow-pink-500/20"
          : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.07]",
        disabled ? "cursor-wait opacity-70" : "cursor-pointer",
      ].join(" ")}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/[0.06] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="relative flex items-center gap-3.5">
        <span
          className={[
            "flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl border shrink-0",
            primary
              ? "border-pink-200/20 bg-pink-300/10 text-pink-100"
              : "border-white/10 bg-white/[0.04] text-white/60",
          ].join(" ")}
        >
          {loading ? <LoaderCircle className="h-5 w-5 animate-spin" /> : icon}
        </span>

        <div>
          <span className="block text-base font-medium text-white">
            {title}
          </span>
          <span className="mt-0.5 block text-xs sm:text-sm text-white/50">{subtitle}</span>
        </div>
      </div>

      <ArrowRight className="relative h-5 w-5 text-white/25 transition-all group-hover:translate-x-1 group-hover:text-white/60 shrink-0" />
    </motion.button>
  );
}