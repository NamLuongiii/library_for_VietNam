import Header from "@/app/components/commons/header";
import Sidebar from "@/app/components/commons/sidebar";

export default function HomeLayout({ children, params: {lang} }) {
  return (
    <main className="flex">
      <Sidebar lang={lang}></Sidebar>
      <div className="flex-1">
        <Header></Header>
        {children}
      </div>
    </main>
  );
}