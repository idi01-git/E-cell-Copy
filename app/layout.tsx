import type { Metadata } from "next";
import { Inter, Anton, Bebas_Neue } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
});
const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

export const metadata: Metadata = {
  title: "E-Cell | IET LKO",
  description: "Entrepreneurship Cell of IET Lucknow ",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
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
        <link rel="preload" href="/ecell-logo.png" as="image" />
        <link rel="preload" href="/homepage.png" as="image" />
        <link rel="preload" href="/services.png" as="image" />
        <link rel="preload" href="/goal.png" as="image" />
      </head>
      <body
        className={`${inter.className} ${anton.variable} ${bebasNeue.variable}`}
      >
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
