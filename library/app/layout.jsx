import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/commons/header";
import Footer from "./components/commons/footer";
import { Providers } from './providers'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Sách việt",
  description: "Free online books",
};

export default async function RootLayout({ children, params }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Header></Header>
          {children}
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  );
}