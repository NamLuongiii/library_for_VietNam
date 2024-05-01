import Footer from "./components/commons/footer";
import Header from "./components/header/header";
import Categories from "./components/home/categories";
import NewBooks from "./components/home/newbooks";
import ReadingHistory from "./components/home/readingHistory";
import ScrollToTop from "./components/home/scrollToTop";
import { Index } from "./lib/baseApi";

export default async function Home() {
  const categories = await Index("categories")
  const booksDiscovery = await Index("books", "discovery")

  return (
    <>
      <Header></Header>
      <main className="max-w-screen-lg mx-auto p-4 min-h-screen lg:px-0 lg:py-4">
        <ReadingHistory></ReadingHistory>
        <NewBooks booksDiscovery={booksDiscovery.data}></NewBooks>
        <Categories categories={categories.data}></Categories>
      </main>
      <Footer></Footer>
      <ScrollToTop></ScrollToTop>
    </>
  );
}
