import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "./StoreProvider";
import { Toaster } from "@/components/ui/sonner";

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
          <main className="container flex justify-center my-8">
            {children}
          </main>

          <Toaster />
        </body>
      </html>
    </StoreProvider>
  );
}
