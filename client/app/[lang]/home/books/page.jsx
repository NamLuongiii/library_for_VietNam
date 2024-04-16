import { index } from "@/app/help/base"
import Link from "next/link"

async function getBooks(resource) {
    return index(resource)
}

export default async function BookIndex() {
    const resource = "books"
    const { data, page, page_size } = await getBooks(resource)

    return <section>
        {data.map(book => (
            <div key={book.id}>
                <Link href={`${resource}/${book.id}`} className="text-blue-600 underline">{book.name}</Link>
            </div>
        ))}
    </section>
}