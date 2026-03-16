import type { Metadata } from "next";
import { Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Resume</h1>
        <a
          href="/resume.pdf"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm transition-colors hover:bg-accent"
        >
          <Download className="h-4 w-4" />
          Download PDF
        </a>
      </div>

      {/* Summary */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Summary</h2>
        <p className="mt-4 text-muted-foreground">
          Data Scientist with experience in machine learning, statistical
          modeling, and data engineering. Passionate about building data-driven
          products and transforming complex datasets into actionable business
          insights.
        </p>
      </section>

      {/* Experience */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Experience</h2>
        <div className="mt-6 space-y-8">
          <div className="border-l-2 border-border pl-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-medium">Senior Data Scientist</h3>
              <span className="text-sm text-muted-foreground">
                2023 &mdash; Present
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Company Name</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                &bull; Led ML model development for customer churn prediction,
                improving retention by 15%
              </li>
              <li>
                &bull; Built end-to-end data pipelines processing 10M+ records
                daily
              </li>
              <li>
                &bull; Mentored junior data scientists and established team best
                practices
              </li>
            </ul>
          </div>

          <div className="border-l-2 border-border pl-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-medium">Data Scientist</h3>
              <span className="text-sm text-muted-foreground">
                2021 &mdash; 2023
              </span>
            </div>
            <p className="text-sm text-muted-foreground">Previous Company</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                &bull; Developed NLP models for sentiment analysis across
                product reviews
              </li>
              <li>
                &bull; Created interactive dashboards and automated reporting
                systems
              </li>
              <li>
                &bull; Collaborated with engineering to deploy models to
                production
              </li>
            </ul>
          </div>

          <div className="border-l-2 border-border pl-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-medium">Data Analyst</h3>
              <span className="text-sm text-muted-foreground">
                2019 &mdash; 2021
              </span>
            </div>
            <p className="text-sm text-muted-foreground">First Company</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                &bull; Performed exploratory data analysis and statistical
                testing
              </li>
              <li>
                &bull; Built SQL queries and data models for business reporting
              </li>
              <li>
                &bull; Automated weekly reports saving 10+ hours per week
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Education</h2>
        <div className="mt-6 space-y-6">
          <div className="border-l-2 border-border pl-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-medium">M.S. in Data Science</h3>
              <span className="text-sm text-muted-foreground">2019</span>
            </div>
            <p className="text-sm text-muted-foreground">University Name</p>
          </div>
          <div className="border-l-2 border-border pl-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-medium">B.S. in Computer Science</h3>
              <span className="text-sm text-muted-foreground">2017</span>
            </div>
            <p className="text-sm text-muted-foreground">University Name</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Skills</h2>
        <div className="mt-6 space-y-4">
          <div>
            <h3 className="text-sm font-medium">Languages & Tools</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "Python",
                "SQL",
                "R",
                "TypeScript",
                "Git",
                "Docker",
                "AWS",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium">ML & Data</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {[
                "Scikit-learn",
                "PyTorch",
                "TensorFlow",
                "Pandas",
                "Spark",
                "Airflow",
                "dbt",
              ].map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium">Visualization</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Plotly", "Matplotlib", "Tableau", "Streamlit"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                  >
                    {skill}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Certifications</h2>
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          <li>&bull; AWS Certified Machine Learning &mdash; Specialty</li>
          <li>&bull; Google Professional Data Engineer</li>
          <li>&bull; TensorFlow Developer Certificate</li>
        </ul>
      </section>
    </div>
  );
}
