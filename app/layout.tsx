import type { Metadata } from "next";
import "./globals.css";
import { ThemeWrapper } from "@/components/theme-wrapper";

export const metadata: Metadata = {
  metadataBase: new URL("https://abayhire.com"),
  title: {
    default: "AbayHire | Modern hiring platform for Ethiopia and Africa",
    template: "%s | AbayHire",
  },
  description:
    "AbayHire is evolving into a modern hiring platform with stronger job discovery, recruiter workflows, employer trust, and candidate experience.",
  keywords: [
    "Ethiopia jobs",
    "Africa recruitment platform",
    "ATS",
    "candidate portal",
    "employer hiring software",
  ],
  openGraph: {
    title: "AbayHire",
    description:
      "A modern hiring platform for Ethiopia and the wider African talent market.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
