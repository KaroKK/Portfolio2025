import "./styles/globals.css";
import { Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata = {
  title: "Karolina Kuster - Anwendungsentwicklung & KI - Full-Stack Developer",
  description: "Frontend- und Backend-Entwicklung, KI-Integration und mehr.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body className={spaceGrotesk.variable}>{children}</body>
    </html>
  );
}
