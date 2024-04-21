"use client"
import Image from "next/image"
import { useEffect, useState } from "react"
import Navigation from "./navigation"
import MobileNavigation from "./mobileNavigation"
import bars3 from "@/public/commons/bars3.svg"
import { Index } from "@/app/lib/baseApi"
import Link from "next/link"

export default function Header() {
    const [open, setOpen] = useState(false)
    const [navigation, setNavigation] = useState([])

    function handleClick() {
        setOpen(!open)
    }

    useEffect(() => {
        loadNav()
    }, [])

    async function loadNav() {
        const { data } = await Index("navigation")
        setNavigation(data)
    }

    return <header className="border-b sticky top-0 bg-white max-w-screen-lg mx-auto flex justify-between items-center px-4 py-1 md:py-2">
        <section>
            <Link
                href="/"
                className="before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-teal-500 relative inline-block">
                <span className="relative text-white text-lg font-bold">Sách Việt</span>
            </Link>
        </section>

        <Navigation navigation={navigation}></Navigation>

        {open && <MobileNavigation onClose={handleClick}></MobileNavigation>}

        <span className="md:invisible p-2 aspect-square rounded-sm bg-gray-50 hover:bg-gray-100 active:bg-gray-200 border transition-all duration-50" onClick={handleClick}>
            <Image
                alt="menu"
                width={100}
                height={100}
                src={bars3.src}
                className="w-6 aspect-auto"
            ></Image>
        </span>


        <label className="hidden md:block relative">
            <form action="/books">
                <span className="sr-only">Search</span>
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg className="h-5 w-5 fill-slate-300" viewBox="0 0 20 20"></svg>
                </span>
                <input className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md 
            py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
                    placeholder="Search for anything..."
                    type="text"
                    name="key_word"/>
            </form>
        </label>
    </header>
}