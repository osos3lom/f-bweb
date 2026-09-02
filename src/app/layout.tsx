import type { Metadata } from "next";
import { AppProvider } from "@/providers/app-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bitrina | بترينا — Specialty Coffee & Dining Showcase",
  description:
    "Bitrina Café & Lounge in Al Zahra, Jeddah. Specialty coffee, artisanal vitrine pastries, tarwiqa breakfast, oriental grills & dining lounge.",
  openGraph: {
    title: "Bitrina | بترينا — Specialty Coffee & Dining Showcase",
    description: "Bitrina Café & Lounge in Al Zahra, Jeddah, Saudi Arabia.",
    url: "https://bitrina.sa",
    siteName: "Bitrina Café & Lounge",
    images: [
      {
        url: "/menu-images/hummus.jpg",
        width: 800,
        height: 600,
        alt: "Bitrina Specialty Coffee & Lounge",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitrina | بترينا — Specialty Coffee & Dining Showcase",
    description: "Bitrina Café & Lounge in Al Zahra, Jeddah, Saudi Arabia.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full bg-background text-foreground antialiased font-poppins">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
