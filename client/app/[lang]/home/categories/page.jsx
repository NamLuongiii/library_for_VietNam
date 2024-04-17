import { index } from "@/app/help/base"
import Link from "next/link"
import addSvg from "@/public/methods/add.svg"
import Image from "next/image"


export default async function BookIndex() {
    const resource = "categories"
    const { data, page, page_size } = await index(resource)

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
        {data.map(item => (
            <div key={item.id}>
                <Link href={`${resource}/${item.id}`} className="text-blue-600 underline">{item.name}</Link>
            </div>
        ))}
    </section>
}