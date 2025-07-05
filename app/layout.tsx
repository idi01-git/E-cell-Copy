import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});

export const metadata: Metadata = {
  title: "E-Cell | IET LKO",
  description:
    "Entrepreneurship Cell of IET Lucknow - Fostering innovation, entrepreneurial thinking, and startup culture on campus",
  keywords: [
    "entrepreneurship",
    "startup",
    "innovation",
    "IET Lucknow",
    "E-Cell",
    "business",
    "entrepreneur",
  ],
  authors: [{ name: "E-Cell IET Lucknow" }],
  creator: "E-Cell IET Lucknow",
  publisher: "E-Cell IET Lucknow",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://ecell-iet-lko.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "E-Cell | IET LKO",
    description:
      "Entrepreneurship Cell of IET Lucknow - Fostering innovation and startup culture",
    url: "https://ecell-iet-lko.vercel.app",
    siteName: "E-Cell IET Lucknow",
    images: [
      {
        url: "/ecell-logo.png",
        width: 1200,
        height: 630,
        alt: "E-Cell IET Lucknow",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "E-Cell | IET LKO",
    description:
      "Entrepreneurship Cell of IET Lucknow - Fostering innovation and startup culture",
    images: ["/ecell-logo.png"],
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/ecell-logo.png" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Italianno&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
      </head>
      <body className={`${inter.className} ${anton.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
