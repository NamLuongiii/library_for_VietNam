import BaseStore from "@/app/components/base/baseStore"
import { options } from "@/app/help/base"

export default async function BookStore() {
    const resource = "books"
    const authors = await options("books/authors")
    const categories = await options("books/categories")
    
    const fields = [
        {
            id: "name",
            name: "name",
            label: "Name",
            type: "text",
        },
        {
            id: "cover",
            name: "cover",
            label: "Cover",
            type: "text",
        },
        {
            id: "preface",
            name: "preface",
            label: "Preface",
            type: "textarea",
        },
        {
            id: "lang",
            name: "lang",
            label: "Lang",
            type: "text",
        },
        {
            id: "authors",
            name: "authors",
            label: "Author",
            type: "complexSelect",
            options: authors.data,
            valueKey: "id",
            textKey: "name",
        },
        {
            id: "categories",
            name: "categories",
            label: "Category",
            type: "complexSelect",
            options: categories.data,
            valueKey: "id",
            textKey: "name",
        },
        {
            id: "files",
            name: "files",
            label: "Files",
            type: "inseartingField",
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
        <BaseStore resource={resource} fields={fields}></BaseStore>
    </section>
}