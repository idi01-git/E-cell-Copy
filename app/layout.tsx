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
  description: "Entrepreneurship Cell of IET Lucknow ",
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
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Italianno&family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
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
