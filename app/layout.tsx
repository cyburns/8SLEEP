import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const dm_sans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EIGHT SLEEP",
  description: "Cooler nights. Stronger days.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={dm_sans.className}>
        <div className="bg-[#af62ff] absolute top-[6rem] -z-10 left-[13rem] h-[31.25rem] w-[8rem] rounded-full blur-[10rem] sm:w-[38.75rem] md:left-[1rem] lg:left-[2rem] xl:left-[5rem] 2xl:left-[8rem] opacity-30" />

        <div className="bg-[#6c6aff] absolute top-[6rem] -z-10 right-[11rem] h-[31.25rem] w-[8.25rem] rounded-full blur-[10rem] sm:w-[38.75rem] opacity-30" />

        {children}
        <Footer />
      </body>
    </html>
  );
}
