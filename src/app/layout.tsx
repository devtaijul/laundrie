import type { Metadata } from "next";
import { Rethink_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SessionProviders } from "@/providers/SessionProviders";

const RethinkSand = Rethink_Sans({
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Laundrie",
  description: "Laundrie - Laundry Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body className={`${RethinkSand.className} antialiased`}>
        <SessionProviders>
          {children}
          <Toaster />
        </SessionProviders>
      </body>
    </html>
  );
}
