import "./globals.css";
import Footer from "@/components/AppComponents/Footer";
import { CartProvider } from "@/hooks/CartContext";
import NavWrapper from "@/components/AppComponents/NavWrapper";

export const metadata = {
  title: "BaseLine",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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
