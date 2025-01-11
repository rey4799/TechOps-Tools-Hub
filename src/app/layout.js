import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";  
import Footer from "@/components/Footer";  // Import Footer

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "L2 Wondr Dashboard",
  description: "A powerful platform for managing your business insights",
  keywords: "business, insights, dashboard, management, tools",
  author: "Rey Setsuna",
  themeColor: "#fbbf24",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
         <head>
        {/* Add FontAwesome CDN link here */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}
      >
        <NavBar />
        
        {/* Main content area, fills remaining space */}
        <main className="flex-grow px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-6">
          {children}
        </main>

        <Footer />  {/* Footer that stays at the bottom */}
      </body>
    </html>
  );
}
