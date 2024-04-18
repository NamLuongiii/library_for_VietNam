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
            id: "authors",
            name: "authors",
            label: "Author",
            type: "complexSelect",
            options: authors.data,
            valueKey: "id",
            textKey: "name",
            multiple: true,
        },
        {
            id: "categories",
            name: "categories",
            label: "Category",
            type: "complexSelect",
            options: categories.data,
            valueKey: "id",
            textKey: "name",
            multiple: true,
        }
    ]



    return <section>
        <BaseStore resource={resource} fields={fields}></BaseStore>
    </section>
}