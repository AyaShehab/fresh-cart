import type { Metadata } from "next";
import { Exo } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/page";
import Footer from "./_components/Footer/Footer";
import { Toaster } from "@/components/ui/toast";
import { SessionProvider } from "next-auth/react";
import MyProvider from "./_components/MyProvider/MyProvider";
import Providers from "./_components/TanstackProvider/TanstackProvider";
import { WishlistProvider } from "./_components/WishlistContext/WishlistContext";

const exo = Exo({
  variable: "--font-exo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart - E-Commerce",
  description: "FreshCart E-Commerce Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${exo.variable} h-full antialiased`}
    >
      <body className={`min-h-full flex flex-col bg-white text-slate-900 ${exo.className}`} suppressHydrationWarning>
        <Providers>
          <MyProvider>
            {/* 2. تغليف التطبيق بـ WishlistProvider */}
            <WishlistProvider>
              <Navbar />
              {children}
              <Toaster/>
              <Footer/>
            </WishlistProvider>
          </MyProvider>
        </Providers>
      </body>
    </html>
  );
}