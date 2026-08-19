import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AnalyticsPageTracker } from "@/components/analytics-tracker";
import "./globals.css";

const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: {
    default: "Ian Ho — AI Deployment Engineer",
    template: "%s | Ian Ho",
  },
  description:
    "Personal website of Ian Ho — AI Deployment Engineer at OpenAI",
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
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
