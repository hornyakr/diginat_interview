import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import Nav from "@/components/layout/Nav";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  readonly children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Digital Natives",
  description: "Interview project",
};

export default function RootLayout({ children }: Props) {

  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <header className="bg-slate-200 py-4">
            <Nav />
          </header>

          <main className="container flex justify-center">
            {children}
          </main>
        </body>
      </html>
    </StoreProvider>
  );
}
