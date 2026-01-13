import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/Utilities/SmoothScroll";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata = {
    title: "LazarusNime",
    description: "Stream Anime Gratis dan Cepat",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased text-white bg-gray-900`}
                id="main-scroll"
            >
                <Navbar />
                <Analytics />
                <SpeedInsights />
                <SmoothScroll>{children}</SmoothScroll>
            </body>
        </html>
    );
}
