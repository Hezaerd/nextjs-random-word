import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Toaster } from "@/components/ui/toaster";

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
        <main className="relative">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="absolute top-4 right-4 z-50">
              <ThemeToggle />
            </div>
            {children}
          </ThemeProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
