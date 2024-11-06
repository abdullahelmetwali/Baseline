import "./globals.css";
import Footer from "@/components/AppComponents/Footer";
import { CartProvider } from "@/hooks/CartContext";
import NavWrapper from "@/components/AppComponents/NavWrapper";

export const metadata = {
  title: "Baseline",
  description: "At Baseline, we're dedicated to bringing you a curated selection of high-quality products that cater to your style, needs, and lifestyle. Whether you're looking for the latest fashion trends, innovative gadgets, or home essentials, our shop has something special for everyone. Our team handpicks each item to ensure it meets our standards of quality and affordability, so you can shop confidently and effortlessly.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/logo.ico" type="image/x-icon" />
      </head>
      <body
        className={`antialiased`}
      >
        <CartProvider>
          <NavWrapper />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
