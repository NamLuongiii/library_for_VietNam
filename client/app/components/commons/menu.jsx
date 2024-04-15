import Image from "next/image"
import dashboard from "@/public/menu/dashboard.svg"
import notification from "@/public/menu/notification.svg"
import book from "@/public/menu/book.svg"
import category from "@/public/menu/category.svg"
import author from "@/public/menu/author.svg"
import profile from "@/public/menu/profile.svg"
import logout from "@/public/menu/logout.svg"
import setting from "@/public/menu/setting.svg"


export default function Menu() {
    const title = "vlibrary"
    const MENU = [
        {
            group: "Menu",
            items: [
                {
                    href: "#",
                    icon: dashboard.src,
                    title: "Dashboard",
                },
                {
                    href: "/notification",
                    icon: notification.src,
                    title: "Notification",
                }
            ]
        },
        {
            group: "Book",
            items: [
                {
                    href: "/books",
                    icon: book.src,
                    title: "Books",
                },
                {
                    href: "/authors",
                    icon: author.src,
                    title: "Authors"
                },
                {
                    href: "/categories",
                    icon: category.src,
                    title: "Categories",
                }
            ]
        },
        {
            group: "Setting",
            items: [
                {
                    href: "/profile",
                    icon: profile.src,
                    title: "Profile",
                },
                {
                    href: "/setting",
                    icon: setting.src,
                    title: "Setting",
                },
                {
                    href: "",
                    icon: logout.src,
                    title: "Logout"
                }
            ]
        }
    ]

    return (
        <div className="flex flex-col w-64 bg-white h-full border-r">
            <div className="flex items-center justify-center h-14 border-b">
                <div>{title}</div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
                {MENU.map(group => (
                    <ul key={group.group} className="flex flex-col py-4 space-y-1">
                        <li className="px-5">
                            <div className="flex flex-row items-center h-8">
                                <div className="text-sm font-light tracking-wide text-gray-500">{group.group}</div>
                            </div>
                        </li>
                        {group.items.map(item => (
                            <li key={item.title}>
                                <a href={item.href} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-gray-600 hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6">
                                    <Image
                                        alt="icon"
                                        width={100}
                                        height={100}
                                        className="aspect-auto w-6"
                                        src={item.icon}
                                    ></Image>
                                    <span className="ml-2 text-sm tracking-wide truncate">{item.title}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                ))}
            </div>
        </div>
    )
}