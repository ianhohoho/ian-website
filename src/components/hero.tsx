"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import { TypingEffect } from "@/components/typing-effect";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export function Hero() {
  return (
    <motion.section
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center gap-8 py-20 text-center md:py-28"
    >
      {/* Logo mark */}
      <motion.div variants={fadeUp}>
        <div className="flex h-32 w-32 items-center justify-center rounded-full border-2 border-primary/30 bg-primary/5 animate-glow-pulse">
          <span className="text-4xl font-bold">
            <span className="text-muted-foreground">&lt;</span>
            <span className="text-gradient">i</span>
            <span className="text-muted-foreground">/&gt;</span>
          </span>
        </div>
      </motion.div>

      <div className="space-y-4">
        <motion.h1
          variants={fadeUp}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl"
        >
          <span className="text-gradient">Ian Ho</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-xl text-muted-foreground sm:text-2xl"
        >
          <TypingEffect
            texts={[
              "Data Scientist",
              "ML Engineer",
              "AI Engineer",
              "Data Engineer",
              "Problem Solver",
            ]}
          />
        </motion.p>

        <motion.p
          variants={fadeUp}
          className="mx-auto max-w-xl text-muted-foreground"
        >
          I build data-driven solutions and turn complex datasets into
          actionable insights. Passionate about machine learning, statistical
          modeling, and making data accessible.
        </motion.p>
      </div>

      <motion.div
        variants={fadeUp}
        className="flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/resume"
          className="group inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-[0_0_16px_hsl(var(--glow)/0.15)]"
        >
          View Resume
          <ArrowRight className="h-4 w-4 transition-all group-hover:translate-x-1" />
        </Link>
        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium text-muted-foreground transition-all hover:border-primary/50 hover:text-primary hover:shadow-[0_0_16px_hsl(var(--glow)/0.15)]"
        >
          See Portfolio
          <ArrowRight className="h-4 w-4 transition-all group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </motion.section>
  );
}
