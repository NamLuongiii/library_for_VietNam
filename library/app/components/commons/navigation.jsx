import { usePathname, useRouter } from "next/navigation"
import { Menu } from '@headlessui/react'

export default function Navigation({ navigation }) {
    const router = useRouter()
    const pathname = usePathname()

    function go(href) {
        if (href == null) return
        router.push(href)
    }

    function isActive(href) {
        return href == pathname
    }

    return <nav className="hidden md:flex items-center gap-2">
        {navigation.map((item, index) => {
            if (item.menu) {
                return (
                    <Menu key={index}>
                        <Menu.Button>{item.href}</Menu.Button>
                        <Menu.Items>
                            {item.menu.map((item, index) => (
                                <Menu.Item key={index}>
                                    {({ active }) => (
                                        <a
                                            className={`${active && 'bg-blue-500'}`}
                                            href={item.href}
                                        >
                                            {item.title}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}

                        </Menu.Items>
                    </Menu>
                )
            }

            return (
                <div
                    className={`px-2 font-light text-sm text-gray-600 hover:text-gray-500 cursor-pointer active:text-gray-700 ${isActive(item.href) && "underline"}`}
                    key={index}
                    onClick={() => go(item.href)}>
                    {item.title}
                </div>
            )

        })}
    </nav>
}