import { usePathname, useRouter } from "next/navigation"
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import Link from "next/link"

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
                        <MenuButton className="text-md">
                            {item.title}
                        </MenuButton>
                        <MenuList>
                            {item.menu.map((menuItem, index) => (
                                <MenuItem 
                                    key={index}
                                    as={Link} 
                                    href={menuItem.href}>{menuItem.title}</MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                )
            }

            return (
                <div
                    className={`px-2 text-md cursor-pointer active:text-gray-700 ${isActive(item.href) && "underline"}`}
                    key={index}
                    onClick={() => go(item.href)}>
                    {item.title}
                </div>
            )

        })}
    </nav>
}