import { index } from "@/app/help/base"
import Link from "next/link"
import addSvg from "@/public/methods/add.svg"
import Image from "next/image"
import { parseQueryString } from "@/app/help/uitilies"
import BaseIndex from "@/app/components/base/baseIndex"


export default async function BookIndex({ searchParams }) {
    const resource = "books"
    const queryString = parseQueryString(searchParams)
    const { data, page, page_size } = await index(resource, queryString)

    const columns = [
        {
            id: "id",
            name: "id",
            label: "ID",
        }, 
        {
            id: "isbn",
            name: "isbn",
            label: "Isbn",
        },
        {
            id: "name",
            name: "name",
            label: "Name",
        },
        {
            id: "en_name",
            name: "en_name",
            label: "English name",
        }, 
    ]

    return <section>
        <BaseIndex
            title="Books"
            resource={resource}
            columns={columns}
            entities={data}
            page={page}
            page_size={page_size}
        ></BaseIndex>
    </section>
}