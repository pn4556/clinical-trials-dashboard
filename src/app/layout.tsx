import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Clinical Trials Analyzer | AI-Powered Investment Intelligence",
  description: "Advanced AI platform for analyzing clinical trials, generating investment signals, and evaluating pharmaceutical opportunities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
