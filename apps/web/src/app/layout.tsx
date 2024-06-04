import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/lib/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const calSans = LocalFont({
  src: "../../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  title: "Welcome to Dokhub | Collaboration platform for doctors",
  description:
    "Dokhub is a platform for doctors to collaborate and share knowledge. you can also access state-of-the-art AI models to assist you in your daily practice.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.className} ${calSans.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
