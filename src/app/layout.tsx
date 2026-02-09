import type { Metadata } from "next";
import { Mulish, Plus_Jakarta_Sans, Chakra_Petch } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

// Mulish Font
const mulish = Mulish({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mulish",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

// Jakarta Font
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-jakarta",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

// Chakra Petch (replacing your manual <link> Google Fonts)
const chakraPetch = Chakra_Petch({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-chakra",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "Auto Gemz",
  description:
    "Welcome! Our values are rooted in trust, integrity, and a relentless pursuit of excellence. We are not just a service provider; we are your automotive partners, committed to ensuring your vehicle's performance and longevity.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${mulish.variable} ${plusJakartaSans.variable} ${chakraPetch.variable}`}
      suppressHydrationWarning
    >
      <body className={mulish.className} suppressHydrationWarning>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
