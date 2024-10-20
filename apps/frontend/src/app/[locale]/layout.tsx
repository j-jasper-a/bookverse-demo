import type { Metadata } from "next";
import { Roboto_Serif as FontMain } from "next/font/google";
import "./globals.css";
import Providers from "@/providers";

const fontMain = FontMain({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-main",
});

export const metadata: Metadata = {
  title: "Bookverse",
  description: "Bookverse is an online book store.",
};

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body className={`${fontMain.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
