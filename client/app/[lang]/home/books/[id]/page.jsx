import BaseShow from "@/app/components/base/baseShow"
import { show } from "@/app/help/base"

async function showBook(id) {
    return show("books", id)
}

export default async function BookShow({ params: {id}}) {
    const { data } = await showBook(id)
    const resource = "books"

    const fields = [
        {
            id: "name",
            name: "name",
            label: "Name",
            type: "text",
            isDisplay: true,
        },
        {
            id: "cover",
            name: "cover",
            label: "Cover",
            type: "text",
            isDisplay: true,
        },
        {
            id: "preface",
            name: "preface",
            label: "Preface",
            type: "textarea",
            isDisplay: true,
        }, 
        {
            id: "lang",
            name: "lang",
            label: "Lang",
            type: "text",
            isDisplay: true,
        },
        {
            id: "file_url",
            name: "file_url",
            label: "File url",
            type: "text",
            isDisplay: true,
        }, 
        {
            id: "file_name",
            name: "file_name",
            label: "File Name",
            type: "text",
            isDisplay: true,
        }
    ]
    
    return <section>
        <BaseShow entity={data} fields={fields} resource={resource}></BaseShow>
    </section>
}