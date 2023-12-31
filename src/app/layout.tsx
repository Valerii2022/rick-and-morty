import type { Metadata } from "next";
import { Irish_Grover } from "next/font/google";
import "./globals.css";

import { Providers } from "../redux/provider";

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";

const irish = Irish_Grover({
  subsets: ["latin"],
  weight: "400",
  variable: "--irish-glover",
});

export const metadata: Metadata = {
  title: "Rick and Morty",
  description: "Rick and morty movies website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <html lang="en">
        <body className={irish.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </Providers>
  );
}
