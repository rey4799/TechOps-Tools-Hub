import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";  

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "L2 Wondr Dashboard",  // Updated title
  description: "A powerful platform for managing your business insights",  // Custom description
  keywords: "business, insights, dashboard, management, tools",  // Example keywords
  author: "Rey Setsuna",  // Add your name or company
  themeColor: "#fbbf24",  // A color that matches the yellow theme
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Navbar that will appear on every page */}
        <NavBar />

        {/* Main content */}
        <main>  {/* Added padding to push content below navbar */}
          {children}
        </main>
      </body>
    </html>
  );
}
