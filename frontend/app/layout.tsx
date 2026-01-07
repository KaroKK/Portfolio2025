import "./styles/globals.css";
import { Manrope, Syne } from "next/font/google";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Karolina Kuster - Full-stack & AI Engineering",
  description: "Web, AI und Produktentwicklung mit Fokus auf klare Architektur und Delivery.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={`${manrope.variable} ${syne.variable}`}>{children}</body>
    </html>
  );
}
