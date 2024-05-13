'use client'

import { Home } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Sidebar({ lang }) {
  const pathName = usePathname()

  const MENU = [
    {
      href: '/home',
      title: 'Dashboard',
      icon: <Home></Home>,
    },
    {
      href: '/home/notification',
      title: 'Notification',
    },
    {
      href: '/home/books',
      title: 'Books',
    },
    {
      href: '/home/authors',
      title: 'Authors',
    },
    {
      href: '/home/categories',
      title: 'Categories',
    },
    {
      href: '/home/profile',
      title: 'Profile',
    },
    {
      href: '/home/setting',
      title: 'Setting',
    },
    {
      href: '/logout',
      title: 'Logout',
    },
  ]

  function isActive(href) {
    if (href == '/home') return pathName == `/${href}`
    return pathName.includes(`${href}`)
  }
  return (
    <div className=" hidden lg:block w-52 bg-gray-50 border-r h-screen sticky top-0">
      <div className="flex items-center justify-center h-14 border-b">
        <span className="text-lg font-bold text-teal-500">Sách việt </span>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        <ul>
          {MENU.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`h-11 flex justify-start items-center focus:outline-none hover:bg-gray-50
                                text-teal-600 border-l-4 
                                ${isActive(item.href) ? 'border-teal-600 bg-teal-50' : 'border-transparent'}`}
              >
                {item.icon}

                <span className="ml-2 text-sm tracking-wide truncate">
                  {item.title}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
