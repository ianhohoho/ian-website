import type { Metadata } from "next";
import { Download } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-primary">&gt;</span> Resume
        </h1>
        <a
          href="/resume.pdf"
          className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-sm transition-all hover:border-primary/60 hover:shadow-[0_0_16px_hsl(var(--glow)/0.15)]"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      </div>

      {/* Summary */}
      <AnimateIn>
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-primary">Summary</h2>
          <p className="mt-4 text-muted-foreground">
            Lead Data Scientist & ML Engineer with experience building
            production-grade ML systems, LLM-powered platforms, and data
            infrastructure at scale. Oxford & Columbia educated, passionate about
            turning complex data problems into high-impact products.
          </p>
        </section>
      </AnimateIn>

      {/* Experience */}
      <AnimateIn delay={0.1}>
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-primary">Experience</h2>
          <div className="mt-6 space-y-8">
            <div className="border-l-2 border-primary/30 pl-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-medium">
                  Lead Data Scientist / Head of DS & AI
                </h3>
                <span className="text-sm text-muted-foreground">
                  Jan 2023 &mdash; Present
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                GovTech &mdash; Singpass
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  &bull; Founded & scaled two cross-functional DS/ML/AI teams
                  across Trust & Safety and Data Platform
                </li>
                <li>
                  &bull; Architectured production-grade ML fraud detection
                  engine achieving 95% precision at 300 QPS
                </li>
                <li>
                  &bull; Led data, metrics & experiment strategy for 8
                  nationwide digital products with A/B testing frameworks
                </li>
                <li>
                  &bull; Built enterprise Agentic RAG solution automating
                  hundreds of queries at precision@k of 96%
                </li>
                <li>
                  &bull; Built LLM-powered analytics platform for
                  natural-language querying across hundreds of datasets
                </li>
                <li>
                  &bull; Built & scaled Data Platform from 0 &rarr; 1: streaming
                  architecture, ML feature store, experimentation & analytics
                </li>
                <li>
                  &bull; Pioneered multi-step NLP clustering algorithm for
                  unsupervised detection of issue clusters in unstructured text
                </li>
                <li>
                  &bull; Developed low-latency multi-objective route optimisation
                  by custom-rewriting Google&apos;s OR-tools
                </li>
              </ul>
            </div>

            <div className="border-l-2 border-primary/30 pl-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-medium">Data Scientist</h3>
                <span className="text-sm text-muted-foreground">
                  Jan 2022 &mdash; Jan 2023
                </span>
              </div>
              <p className="text-sm text-muted-foreground">Grab</p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  &bull; Built LTV Prediction Model using neural networks &
                  custom loss functions, deployed across Grab ecosystem for ROI
                  forecasting
                </li>
                <li>
                  &bull; Architectured Grab&apos;s first automated Impact
                  Estimation platform using pseudo-experimentation for causal
                  analysis without A/B tests
                </li>
                <li>
                  &bull; Awarded Grab Way award for outstanding performance
                </li>
              </ul>
            </div>

            <div className="border-l-2 border-primary/30 pl-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-medium">
                  Data Scientist Graduate Researcher
                </h3>
                <span className="text-sm text-muted-foreground">
                  Aug 2019 &mdash; Apr 2020
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Point72 &mdash; Commodities
              </p>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                <li>
                  &bull; Built Vector Auto-Regressive models for oil price
                  prediction with Bayesian optimisation, achieving 18% error
                  reduction from academic benchmark
                </li>
                <li>
                  &bull; Developed proprietary Energy Demand Index based on
                  hundreds of underlying indicators
                </li>
              </ul>
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* Education */}
      <AnimateIn delay={0.2}>
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-primary">Education</h2>
          <div className="mt-6 space-y-6">
            <div className="border-l-2 border-primary/30 pl-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-medium">
                  M.S. Business Analytics / Data Science
                </h3>
                <span className="text-sm text-muted-foreground">
                  2019 &mdash; 2020
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Columbia Engineering, Columbia University
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                GPA 4.0/4.0 &mdash; Awarded Graduate Fellowship for top
                performance
              </p>
            </div>
            <div className="border-l-2 border-primary/30 pl-6">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-medium">
                  B.A. Politics, Philosophy & Economics
                </h3>
                <span className="text-sm text-muted-foreground">
                  2016 &mdash; 2019
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                University of Oxford
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                1st Class Honours &mdash; Top in College
              </p>
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* Skills */}
      <AnimateIn delay={0.3}>
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-primary">Skills</h2>
          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium">Languages & Infrastructure</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  "Python",
                  "SQL",
                  "Spark",
                  "AWS",
                  "Azure",
                  "Docker",
                  "CI/CD & IaC",
                  "REST",
                  "gRPC",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">ML & AI</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  "TensorFlow",
                  "MLOps",
                  "LLMs",
                  "Langchain",
                  "RAG",
                  "Airflow",
                  "Vector Databases",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium">Data & Observability</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {[
                  "Snowflake",
                  "Kafka",
                  "Datadog (OTEL)",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimateIn>
    </div>
  );
}
