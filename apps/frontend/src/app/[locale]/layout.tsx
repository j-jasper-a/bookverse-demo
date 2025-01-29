import Topbar from "@/components/navigation/Topbar";
import Providers from "@/providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import {
  Bebas_Neue as FontHeading,
  Sofia_Sans as FontBody,
} from "next/font/google";

const fontHeading = FontHeading({
  subsets: ["latin"],
  style: ["normal"],
  weight: ["400"],
  display: "swap",
  variable: "--font-heading",
});

const fontBody = FontBody({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Bookverse | Online Book Store",
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
      <body className={`${fontHeading.variable} ${fontBody.variable}`}>
        <Providers>
          <Topbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
