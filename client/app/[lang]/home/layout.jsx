import Header from "@/app/components/commons/header";
import Menu from "@/app/components/commons/menu";

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function HomeLayout({ children, params: {lang} }) {
  return (
    <main className="h-screen flex bg-gray-50 overflow-hidden">
      <Menu lang={lang}></Menu>
      <div className="relative grow h-full overflow-scroll">
        <Header></Header>
        <div className="pt-14">
        {children}
        </div>
      </div>
    </main>
  );
}