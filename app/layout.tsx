import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const montserrat = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "DOH-Automated Adjudication Payor Platform",
  description:
    "A platform for automating the adjudication process of claims through rules engine.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} antialiased`}>{children}</body>
    </html>
  );
}
