import Navigation from "./navigation"
import MobileNavigation from "./mobileNavigation"
import { Index } from "@/app/lib/baseApi"
import Link from "next/link"
import Search from "./search"

export default async function Header() {
    const {data} = await Index("navigation")

    return <header 
            className="sticky top-0 bg-white max-w-screen-lg mx-auto flex justify-between 
                items-center px-4 py-2 md:py-2 z-30 shadow-sm">
        <section>
            <Link
                href="/"
                className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-teal-500 relative inline-block">
                <span className="relative text-white text-lg font-bold">Sách Việt</span>
            </Link>
        </section>

        <Navigation navigation={data}></Navigation>

        <Search></Search>
        <MobileNavigation ></MobileNavigation>
    </header>
}