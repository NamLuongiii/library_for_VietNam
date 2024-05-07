import { index } from "@/app/help/base"
import Link from "next/link"
import addSvg from "@/public/methods/add.svg"
import Image from "next/image"
import BaseIndex from "@/app/components/base/baseIndex"
import { parseQueryString } from "@/app/help/uitilies"


export default async function BookIndex({ searchParams }) {
    const resource = "categories"
    const queryString = parseQueryString(searchParams)
    const { data, page, page_size } = await index(resource, queryString)

    const columns = [
        {
            id: "id",
            name: "id",
            label: "Id",
            type: "text",
        },
        {
            id: "name",
            name: "name",
            label: "Name",
            type: "text",
        },
        {
            id: "des",
            name: "des",
            label: "Description",
            type: "text",
        },
    ]

    return <section>
        <BaseIndex
            resource={resource}
            title="Categories"
            columns={columns}
            entities={data}
            page={page}
            page_size={page_size}></BaseIndex>
    </section>
}