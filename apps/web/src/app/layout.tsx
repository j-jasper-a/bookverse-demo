import type { Metadata } from "next";
import {
  Bebas_Neue as FontHeading,
  Sofia_Sans as FontMain,
} from "next/font/google";
import "./globals.css";
import { Header } from "@/components/common/header/header";
import { Providers } from "@/components/providers/providers";

const fontMain = FontMain({
  variable: "--font-main",
  subsets: ["latin"],
  weight: "variable",
});

const fontHeading = FontHeading({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Bookverse Demo",
    template: "%s | Bookverse Demo",
  },
  description: "A demo application for Bookverse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontMain.variable} ${fontHeading.variable} antialiased`}
      >
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
