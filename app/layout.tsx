import type { Metadata } from "next";
import { Playfair_Display, Outfit, DM_Mono } from "next/font/google";
import "./globals.css";
import { ThemeWrapper } from "@/components/theme-wrapper";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700", "900"],
  style: ["normal", "italic"],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  display: "swap",
  weight: ["400", "500"],
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${outfit.variable} ${dmMono.variable}`}
    >
      <body className="flex min-h-full flex-col antialiased">
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
