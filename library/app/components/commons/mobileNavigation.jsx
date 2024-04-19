import { useRouter, usePathname } from "next/navigation"

export default function MobileNavigation({ onClose, navigation }) {
    const router = useRouter()
    const pathname = usePathname()

    function go(href) {
        if (href == null) return
        router.push(href)
    }

    function isActive(href) {
        return href == pathname
    }

    return <section className="md:hidden fixed inset-0 z-auto bg-white p-4">
        <header className="flex justify-between items-center">
            <h1 className="text-2xl mb-4">Menu</h1>
            <span className="p-2 aspect-square rounded-full bg-slate-50 hover:bg-slate-100 active:bg-slate-200" onClick={onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>

            </span>
        </header>

        <nav className="hidden md:flex">
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
    </section>
}