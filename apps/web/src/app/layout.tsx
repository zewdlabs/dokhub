import type { Metadata } from "next";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import "./globals.css";
import Providers from "@/components/custom/providers";

const inter = Inter({ subsets: ["latin"] });

const calSans = LocalFont({
  src: "../../public/fonts/CalSans-SemiBold.ttf",
  variable: "--font-calsans",
});

export const metadata: Metadata = {
  title:
    "Dokhub | Collaborative and connective platform for Medical Professionals",
  description:
    "Dokhub is a collaborative and connective platform for Medical Professionals, Wether you are a Doctor, Nurse, Pharmacist, or any other medical professional, Dokhub is the right place for you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} ${calSans.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
