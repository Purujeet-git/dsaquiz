import { Geist, Geist_Mono } from "next/font/google";
import { Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "./provider";

const pixelBody = VT323({
  weight:'400',
  subsets:['latin'],
  variable:'--font-pixel-body'
})
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DSA QUIZ",
  description: "This website is learning DSA with python.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={` ${pixelBody.variable}`}>
      
      <body
        className={` bg-[#e0f8d0] text-[#081820] antialiased`}
      >
        <Providers>
        <Navbar/>
        {children}
        </Providers>
      </body>
    </html>
  );
}
