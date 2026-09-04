import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { AppProvider } from "@/providers/app-provider";
import { getAssetPath } from "@/lib/utils";
import "./globals.css";

const azaharFont = localFont({
  src: "../../public/fonts/azahar-al-tn-trial-demi.ttf",
  variable: "--font-azahar-local",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://osos3lom.github.io/f-bweb";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1C120D",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Bitrina | بترينا — Coffee & Dining Showcase",
  description:
    "Bitrina Café & Lounge in Al Zahra, Jeddah. Coffee, artisanal vitrine pastries, tarwiqa breakfast, oriental grills & dining lounge.",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Bitrina",
  },
  openGraph: {
    title: "Bitrina | بترينا — Coffee & Dining Showcase",
    description: "Bitrina Café & Lounge in Al Zahra, Jeddah, Saudi Arabia.",
    url: siteUrl,
    siteName: "Bitrina Café & Lounge",
    images: [
      {
        url: "/menu-images/hummus.jpg",
        width: 800,
        height: 600,
        alt: "Bitrina Coffee & Lounge",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bitrina | بترينا — Coffee & Dining Showcase",
    description: "Bitrina Café & Lounge in Al Zahra, Jeddah, Saudi Arabia.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: getAssetPath("/favicon.ico"), sizes: "any" },
      { url: getAssetPath("/brand/logo.png"), type: "image/png" },
    ],
    shortcut: getAssetPath("/favicon.ico"),
    apple: [
      { url: getAssetPath("/brand/logo.png"), sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${azaharFont.variable} bg-[#1C120D]`}>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="theme-color" content="#1C120D" />
        <link rel="icon" href={getAssetPath("/favicon.ico")} sizes="any" />
        <link rel="icon" type="image/png" href={getAssetPath("/brand/logo_thumb.webp")} />
        <link rel="apple-touch-icon" href={getAssetPath("/brand/logo_thumb.webp")} />
        <link rel="shortcut icon" href={getAssetPath("/favicon.ico")} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Poppins:wght@300;400;500;600;700&family=Cairo:wght@400;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-full bg-background text-foreground antialiased font-poppins">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
