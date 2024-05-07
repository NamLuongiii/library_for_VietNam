"use client"

import Image from "next/image"
import dashboard from "@/public/menu/dashboard.svg"
import notification from "@/public/menu/notification.svg"
import book from "@/public/menu/book.svg"
import category from "@/public/menu/category.svg"
import author from "@/public/menu/author.svg"
import profile from "@/public/menu/profile.svg"
import logout from "@/public/menu/logout.svg"
import setting from "@/public/menu/setting.svg"
import Link from "next/link"
import { usePathname } from "next/navigation"


export default function Menu({ lang }) {
    const pathName = usePathname()

    const MENU = [
        {
            href: "/home",
            icon: dashboard.src,
            title: "Dashboard",
        },
        {
            href: "/home/notification",
            icon: notification.src,
            title: "Notification",
        },
        {
            href: "/home/books",
            icon: book.src,
            title: "Books",
        },
        {
            href: "/home/authors",
            icon: author.src,
            title: "Authors"
        },
        {
            href: "/home/categories",
            icon: category.src,
            title: "Categories",
            onclick: logout,
        },
        {
            href: "/home/profile",
            icon: profile.src,
            title: "Profile",
        },
        {
            href: "/home/setting",
            icon: setting.src,
            title: "Setting",
        },
        {
            href: "/logout",
            icon: logout.src,
            title: "Logout"
        }
    ]

    function isActive(href) {
        if (href == "/home") 
            return pathName == `/${href}`
        return pathName.includes(`${href}`)
    }
    return (
        <div className=" hidden lg:block w-52 bg-gray-50 border-r h-screen sticky top-0">
            <div className="flex items-center justify-center h-14 border-b">
               <span className="text-lg font-bold text-teal-500">Sách việt</span>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
                <ul>
                    {MENU.map((item, index) => (
                        <li key={index}>
                            <Link
                                href={item.href}
                                className={`h-11 flex justify-start items-center focus:outline-none hover:bg-gray-50
                                text-teal-600 border-l-4 
                                ${isActive(item.href) ? "border-teal-600 bg-teal-50" : "border-transparent"}`}
                            >
                                    <Image
                                        alt="icon"
                                        width={100}
                                        height={100}
                                        className="aspect-auto w-6 mx-4"
                                        src={item.icon}
                                    ></Image>
                                    <span className="ml-2 text-sm tracking-wide truncate">{item.title}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}