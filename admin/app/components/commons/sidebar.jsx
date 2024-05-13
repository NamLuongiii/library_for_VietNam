'use client'

import clsx from 'clsx'
import { Book, BookA, Columns3, Home } from 'lucide-react'
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
      href: '/home/books',
      title: 'Books',
      icon: <Book></Book>,
    },
    {
      href: '/home/authors',
      title: 'Authors',
      icon: <BookA></BookA>,
    },
    {
      href: '/home/categories',
      title: 'Categories',
      icon: <Columns3></Columns3>,
    },
  ]

  function isActive(href) {
    if (href == '/home') return pathName == href
    return pathName.includes(`${href}`)
  }
  return (
    <div className=" hidden lg:block w-52 bg-gray-50 border-r h-screen sticky top-0">
      <div className="flex items-center justify-center h-14 border-b">
        <span className="text-lg font-bold">Sách việt </span>
      </div>
      <ul className="overflow-y-auto overflow-x-hidden flex-grow">
        {MENU.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={clsx(
                'h-11 flex justify-start px-2 mb-2 items-center focus:outline-none',
                isActive(item.href) && 'bg-primary text-primary-foreground',
              )}
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
  )
}
