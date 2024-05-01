import Header from "../components/header/header";
import Footer from "../components/commons/footer";
import ScrollToTop from "../components/home/scrollToTop";

export default async function RootLayout({ children }) {
  return (
    <>
      <Header></Header>
      {children}
      <ScrollToTop></ScrollToTop>
      <Footer></Footer>
    </>
  );
}
