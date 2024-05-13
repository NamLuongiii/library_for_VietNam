import Header from "@/app/components/commons/header";
import Menu from "@/app/components/commons/menu";

export default function HomeLayout({ children, params: {lang} }) {
  return (
    <main className="flex">
      <Menu lang={lang}></Menu>
      <div className="flex-1">
        <Header></Header>
        {children}
      </div>
    </main>
  );
}