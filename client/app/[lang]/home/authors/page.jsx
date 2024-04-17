import { index } from "@/app/help/base"
import Link from "next/link"
import addSvg from "@/public/methods/add.svg"
import Image from "next/image"

async function getAuthors(resource) {
    return index(resource)
}

export default async function BookIndex() {
    const resource = "authors"
    const { data, page, page_size } = await getAuthors(resource)

    return <section>
        <header>
            <Link
                href={`${resource}/store`}
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
        {data.map(author => (
            <div key={author.id}>
                <Link href={`${resource}/${author.id}`} className="text-blue-600 underline">{author.name}</Link>
            </div>
        ))}
    </section>
}