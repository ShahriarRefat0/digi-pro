import type { Metadata } from "next";
import { Inter, Hind_Siliguri } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const hindSiliguri = Hind_Siliguri({
  variable: "--font-bengali",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali"],
});

export const metadata: Metadata = {
  title: "Careproff - Premium Baby & Maternal Care Essentials",
  description: "Safe, gentle, dermatologist-tested maternal and pediatric care products for mothers and caregivers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${hindSiliguri.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-teal-700 selection:text-white">
        <CartProvider>
          <TooltipProvider delay={150}>
            {children}
          </TooltipProvider>
        </CartProvider>
        <Toaster richColors position="top-right" theme="light" closeButton />
      </body>
    </html>
  );
}

