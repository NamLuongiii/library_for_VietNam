import { index } from "@/app/help/base"
import Link from "next/link"
import addSvg from "@/public/methods/add.svg"
import Image from "next/image"

async function getBooks(resource) {
    return index(resource)
}

export default async function BookIndex() {
    const resource = "books"
    const { data, page, page_size } = await getBooks(resource)

    return <section>
        <header>
            <Link
                href="books/store" 
                className="p-2 cursor-pointer hover:bg-gray-50 active:bg-gray-100 inline-block rounded-sm w-10 h-10">
            <Image
                alt="new book button"
                width={24}
                height={24}
                src={addSvg.src}
                className="w-full"
            ></Image>
            </Link>
        </header>
        {data.map(book => (
            <div key={book.id}>
                <Link href={`${resource}/${book.id}`} className="text-blue-600 underline">{book.name}</Link>
            </div>
        ))}
    </section>
}