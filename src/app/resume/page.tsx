import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { AnimateIn } from "@/components/animate-in";
import { SideNav } from "@/components/side-nav";
import { getResumeData } from "@/lib/content";

export const metadata: Metadata = {
  title: "Resume",
};

export default async function ResumePage() {
  const { summary, experience, education, skillCategories, certCategories } =
    await getResumeData();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">
          <span className="text-primary">&gt;</span> Resume
        </h1>
        <a
          href="https://linkedin.com/in/ianhojy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-lg border border-primary/30 px-4 py-2 text-sm transition-all hover:border-primary/60 hover:shadow-[0_0_16px_hsl(var(--glow)/0.15)]"
        >
          <ExternalLink className="h-4 w-4" />
          LinkedIn
        </a>
      </div>

      <div className="mt-12 flex gap-12">
        <SideNav sections={[
          { id: "summary", label: "Summary" },
          { id: "experience", label: "Experience" },
          { id: "education", label: "Education" },
          { id: "skills", label: "Skills" },
          { id: "certifications", label: "Certifications" },
        ]} />

        <div className="min-w-0 flex-1 space-y-12">

      {/* Summary */}
      <AnimateIn>
        <section id="summary" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-primary">Summary</h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            {summary.split("\n")[0]}
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              { icon: "🏛️", text: "Functional Head of Data & AI @ Singpass, GovTech" },
              { icon: "🎩", text: "Wears many hats — ML/AI Engineer, Product Manager" },
              { icon: "🚀", text: "Turning complex data problems into high-impact products" },
              { icon: "📚", text: "Always looking to learn new things" },
            ].map((item) => (
              <div
                key={item.text}
                className="flex items-start gap-3 rounded-lg border border-border/50 px-4 py-3 text-left text-sm text-foreground"
              >
                <span className="mt-0.5 text-base">{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </section>
      </AnimateIn>

      {/* Experience */}
      <AnimateIn delay={0.1}>
        <section id="experience" className="scroll-mt-24">
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
                  className="resume-bullets mt-3 text-sm text-foreground"
                  dangerouslySetInnerHTML={{ __html: role.bulletsHtml }}
                />
              </div>
            ))}
          </div>
        </section>
      </AnimateIn>

      {/* Education */}
      <AnimateIn delay={0.2}>
        <section id="education" className="scroll-mt-24">
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
                  <p className="mt-2 text-sm font-medium text-foreground">
                    {edu.note}
                  </p>
                )}
                {edu.subjects && edu.subjects.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {edu.subjects.map((subject) => (
                      <span
                        key={subject}
                        className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs text-primary"
                      >
                        {subject}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </AnimateIn>

      {/* Skills */}
      <AnimateIn delay={0.3}>
        <section id="skills" className="scroll-mt-24">
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

      {/* Certifications */}
      <AnimateIn delay={0.4}>
        <section id="certifications" className="scroll-mt-24">
          <h2 className="text-xl font-semibold text-primary">Certifications</h2>
          <div className="mt-6 space-y-6">
            {certCategories.map((category) => (
              <div key={category.name}>
                <h3 className="text-sm font-medium">{category.name}</h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {category.certs.map((cert) => (
                    <div
                      key={cert.title}
                      className="rounded-lg border border-border p-4 card-glow hover:border-primary/30"
                    >
                      <p className="text-sm font-medium text-muted-foreground">{cert.title}</p>
                      <span className="mt-1.5 block text-xs text-primary">{cert.issuer}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </AnimateIn>

        </div>
      </div>
    </div>
  );
}
