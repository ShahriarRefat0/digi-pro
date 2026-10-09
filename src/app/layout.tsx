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
  title: "Careoffbd.com — Premium Baby, Maternity & Personal Care Store",
  description: "Bangladesh's trusted e-commerce storefront for safe, gentle baby care, maternity essentials, and women's personal care products.",
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
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-[#7C9473] selection:text-white">
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

