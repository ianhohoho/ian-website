"use client";

import Image from "next/image";
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
      {/* Profile photo */}
      <motion.div variants={fadeUp}>
        <div className="h-44 w-44 overflow-hidden rounded-full border-2 border-primary/30 animate-glow-pulse">
          <Image
            src="/images/dp.jpg"
            alt="Ian Ho"
            width={256}
            height={256}
            className="h-full w-full object-cover scale-125"
            priority
          />
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
          className="text-xl text-foreground sm:text-2xl"
        >
          <TypingEffect
            texts={[
              "Data Scientist",
              "ML Engineer",
              "AI Engineer",
            ]}
          />
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mx-auto max-w-xl space-y-6 text-muted-foreground"
        >
          <p>Lead Data Scientist &amp; ML Engineer with experience building production-grade ML systems, AI-powered solutions, and data infrastructure at scale.</p>
          <p>Passionate about turning complex data problems into high-impact products.</p>
          <p>Always looking to learn new things.</p>
        </motion.div>
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
