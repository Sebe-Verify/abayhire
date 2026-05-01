import type { Metadata } from "next";
import { DM_Serif_Display, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeWrapper } from "@/components/theme-wrapper";

const displayFont = DM_Serif_Display({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abay Hire - Find Your Dream Job",
  description: "Ethiopia's premier hiring platform connecting talent with opportunity",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${displayFont.variable} ${bodyFont.variable} min-h-full flex flex-col antialiased`}
      >
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}