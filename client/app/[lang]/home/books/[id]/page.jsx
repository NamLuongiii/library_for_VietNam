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
            id: "authors",
            name: "authors",
            label: "Author",
            type: "complexSelect",
            options: [],
            valueKey: "id",
            textKey: "name",
            isDisplay: true,
        },
        {
            id: "categories",
            name: "categories",
            label: "Category",
            type: "complexSelect",
            options: [],
            valueKey: "id",
            textKey: "name",
            isDisplay: true,
        },
        {
            id: "files",
            name: "files",
            label: "Files",
            type: "inseartingField",
            isDisplay: true,
            inseartStruct: [
                {
                    id: "file_name",
                    name: "name",
                    type: "text",
                    label: "Name",
                }, 
                {
                    id: "file_url",
                    name: "url",
                    type: "text",
                    label: "Url",
                },
                {
                    id: "file_extension",
                    name: "extension",
                    type: "text",
                    label: "File extension",
                }
            ]
        }
    ]
    
    return <section>
        <BaseShow entity={data} fields={fields} resource={resource}></BaseShow>
    </section>
}