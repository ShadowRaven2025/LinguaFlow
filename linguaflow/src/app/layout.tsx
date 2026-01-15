import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "LinguaFlow - Изучение языков",
  description: "Интерактивная платформа для изучения английского и немецкого языков",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            html {
              visibility: visible;
              opacity: 1;
            }
            body {
              min-height: 100vh;
              background: linear-gradient(to bottom right, rgb(238 242 255), rgb(255 255 255), rgb(207 250 254));
            }
            @media (prefers-color-scheme: dark) {
              body {
                background: linear-gradient(to bottom right, rgb(17 24 39), rgb(31 41 55), rgb(17 24 39));
                color: rgb(255 255 255);
              }
            }
          `
        }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
