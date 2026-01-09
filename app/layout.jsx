import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/themes.css";
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import MobileNav from "@/components/layout/MobileNav";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata = {
    title: "Game Tracker - Track Your Gaming Journey",
    description: "Track your games, add notes, and manage your gaming collection",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
        <body className={`${inter.variable} antialiased`}>
        <div className="flex min-h-screen bg-[#000]">
            <Sidebar />

            <div className="flex-1 md:ml-[260px]">
                <TopBar />
                <main className="min-h-[calc(100vh-4rem)] pb-20 md:pb-0">
                    {children}
                </main>
            </div>

            <MobileNav />
        </div>
        </body>
        </html>
    );
}