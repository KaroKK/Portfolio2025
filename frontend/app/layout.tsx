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

// Schriftarten einmal zentral setzen.
export const metadata = {
  title: "Karolina Kuster - Full-stack & AI",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${manrope.variable} ${syne.variable}`}>{children}</body>
    </html>
  );
}
