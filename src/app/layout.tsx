import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnalyticsPageTracker } from "@/components/analytics-tracker";
import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "Ian Ho — Staff Data Scientist",
    template: "%s | Ian Ho",
  },
  description:
    "Personal website of Ian Ho — Staff Data Scientist @ Singpass, GovTech",
  metadataBase: new URL("https://ianho.xyz"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${mono.variable} font-sans antialiased`}>
        <AnalyticsPageTracker />
        <div className="flex min-h-screen flex-col bg-grid-pattern">
          <Navbar />
          <aside
            aria-label="Current work status"
            className="border-b border-primary/30 bg-primary px-6 py-2 text-center text-xs font-medium tracking-wide text-background sm:text-sm"
          >
            ✨ currently funemployed... stay tuned~ ✨
          </aside>
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
