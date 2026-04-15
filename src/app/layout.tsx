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
  metadataBase: new URL("https://laundrie.nl"),
  title: {
    default: "Laundrie — Professional Laundry & Dry Cleaning",
    template: "%s | Laundrie",
  },
  description:
    "Laundrie offers professional laundry and dry cleaning services with free pickup and delivery, 7 days a week. Fresh, clean clothes delivered to your door.",
  keywords: [
    "laundry service",
    "dry cleaning",
    "pickup delivery laundry",
    "laundrie",
    "professional laundry",
  ],
  authors: [{ name: "Laundrie" }],
  creator: "Laundrie",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    url: "https://laundrie.nl",
    siteName: "Laundrie",
    title: "Laundrie — Professional Laundry & Dry Cleaning",
    description:
      "Free pickup and delivery, 7 days a week. Fresh, clean clothes delivered to your door.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Laundrie — Professional Laundry Service",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Laundrie — Professional Laundry & Dry Cleaning",
    description:
      "Free pickup and delivery, 7 days a week. Fresh, clean clothes delivered to your door.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
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
