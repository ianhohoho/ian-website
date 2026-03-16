import type { Metadata } from "next";
import { Download } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import { getResumeData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume",
};

export default async function ResumePage() {
  const { summary, experience, education, skillCategories } =
    await getResumeData();

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
          <p className="mt-4 text-muted-foreground">{summary}</p>
        </section>
      </AnimateIn>

      {/* Experience */}
      <AnimateIn delay={0.1}>
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-primary">Experience</h2>
          <div className="mt-6 space-y-8">
            {experience.map((role) => (
              <div
                key={`${role.company}-${role.title}`}
                className="border-l-2 border-primary/30 pl-6"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-medium">{role.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    {role.startDate} &mdash; {role.endDate}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {role.company}
                  {role.team && <> &mdash; {role.team}</>}
                </p>
                <div
                  className="resume-bullets mt-3 text-sm text-muted-foreground"
                  dangerouslySetInnerHTML={{ __html: role.bulletsHtml }}
                />
              </div>
            ))}
          </div>
        </section>
      </AnimateIn>

      {/* Education */}
      <AnimateIn delay={0.2}>
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-primary">Education</h2>
          <div className="mt-6 space-y-6">
            {education.map((edu) => (
              <div
                key={`${edu.school}-${edu.title}`}
                className="border-l-2 border-primary/30 pl-6"
              >
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-medium">{edu.title}</h3>
                  <span className="text-sm text-muted-foreground">
                    {edu.startDate} &mdash; {edu.endDate}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{edu.school}</p>
                {edu.note && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {edu.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      </AnimateIn>

      {/* Skills */}
      <AnimateIn delay={0.3}>
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-primary">Skills</h2>
          <div className="mt-6 space-y-4">
            {skillCategories.map((category) => (
              <div key={category.name}>
                <h3 className="text-sm font-medium">{category.name}</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimateIn>
    </div>
  );
}
