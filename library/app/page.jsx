import Categories from "./components/home/categories";
import NewBooks from "./components/home/newbooks";
import YourBooks from "./components/home/yourBooks";
import { Index } from "./lib/baseApi";

export default async function Home() {
  const categories = await Index("categories")
  const booksDiscovery = await Index("books", "discovery")

  return (
    <main className="max-w-screen-lg mx-auto p-4 min-h-screen lg:px-0 lg:py-4">
      <YourBooks></YourBooks>
      <NewBooks booksDiscovery={booksDiscovery.data}></NewBooks>
      <Categories categories={categories.data}></Categories>
    </main>
  );
}
