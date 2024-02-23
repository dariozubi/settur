import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { locales } from "@/i18n";
import NavigationBar from "@/components/NavigationBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SETTUR",
  description: "Ground transportation services",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NavigationBar />
        {children}
      </body>
    </html>
  );
}
