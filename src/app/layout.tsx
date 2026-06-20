import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/src/lib/utils";

const playfairDisplayHeading = Playfair_Display({subsets:['latin'],variable:'--font-heading'});

const notoSans = Noto_Sans({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TodoMaster // Production Environment",
  description: "Next-generation spatial workspace control suite engineered for professional task optimization.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={cn(
          "h-full", 
          "antialiased", 
          "scroll-smooth",
          geistSans.variable, 
          geistMono.variable, 
          "font-sans", 
          notoSans.variable, 
          playfairDisplayHeading.variable
        )}
        style={{ colorScheme: "dark" }}
      >
        <body className="min-h-full flex flex-col bg-[#030712] text-gray-100 selection:bg-purple-500/30 selection:text-white">
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}