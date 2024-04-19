import Categories from "./components/home/categories";
import NewBooks from "./components/home/newbooks";
import YourBooks from "./components/home/yourBooks";

export default function Home() {
  return (
    <main className="max-w-screen-lg mx-auto p-4 min-h-screen lg:px-0 lg:py-4">
      <YourBooks></YourBooks>
      <NewBooks></NewBooks>
      <Categories></Categories>
    </main>
  );
}
