import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers'

export const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sách việt",
  description: "Free online books",
};

export default async function RootLayout({ children, params }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
