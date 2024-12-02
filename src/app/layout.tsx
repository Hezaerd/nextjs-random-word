import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";

import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'


export const metadata: Metadata = {
  title: "Random Word Gen",
  description: "Generate random english words",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ThemeToggle />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
