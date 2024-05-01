import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header/header";
import Footer from "./components/commons/footer";
import { Providers } from './providers'
import ScrollToTop from "./components/home/scrollToTop";

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
          <ScrollToTop></ScrollToTop>
          <Footer></Footer>
        </Providers>
      </body>
    </html>
  );
}
