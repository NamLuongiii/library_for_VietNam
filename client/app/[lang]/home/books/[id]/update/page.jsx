import BaseUpdate from "@/app/components/base/baseUpdate"
import { options, show } from "@/app/help/base"

export default async function BookUpdate({ params: {id}}) {
    const resource = "books"
    const authors = await options("books/authors")
    const categories = await options("books/categories")
    const languages = await options("books/lang")
    const status = await options("books/status")
    const level = await options("books/level")
    const {data} = await show(resource, id)

    const fields = [
        {
            id: "name",
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            id: "en_ name",
            name: "en_name",
            label: "English name",
            type: "text",
        },
        {
            id: "origin_name",
            name: "origin_name",
            label: "Origin name",
            type: "text",
        },
        {
            id: "release",
            name: "release",
            label: "Release",
            type: "text",
        },
        {
            id: "publisher",
            name: "publisher",
            label: "Publisher",
            type: "text",
        },
        {
            id: "global_publisher",
            name: "global_publisher",
            label: "global_publisher",
            type: "text",
        },
        {
            id: "cover",
            name: "cover",
            label: "Cover",
            type: "text",
            required: true,
        },
        {
            id: "page",
            name: "page",
            label: "Page number",
            type: "number",
        },
        {
            id: "chapter",
            name: "chapter",
            label: "Chapter number",
            type: "number",
        },
        {
            id: "location",
            name: "location",
            label: "Location",
            type: "number",
        },
        {
            id: "lang",
            name: "lang",
            label: "Lang",
            type: "radioGroup",
            options: languages.data,
            valueKey: "id",
            textKey: "name",
            required: true,
        },
        {
            id: "origin_lang",
            name: "origin_lang",
            label: "Origin language",
            type: "text",
        },
        {
            id: "nation",
            name: "nation",
            label: "Nation",
            type: "text",
        },
        {
            id: "level",
            name: "level",
            label: "Level",
            type: "radioGroup",
            options: level.data,
            valueKey: "id",
            textKey: "name",
        },
        {
            id: "status",
            name: "status",
            label: "Status",
            type: "radioGroup",
            options: status.data,
            valueKey: "id",
            textKey: "name",
        },
        {
            id: "authors",
            name: "authors",
            label: "Author",
            type: "autocomplete",
            options: authors.data,
            valueKey: "id",
            textKey: "name",
        },
        {
            id: "categories",
            name: "categories",
            label: "Category",
            type: "autocomplete",
            options: categories.data,
            valueKey: "id",
            textKey: "name",
            required: true,
        },
        {
            id: "preface",
            name: "preface",
            label: "Preface",
            type: "textarea",
            required: true,
        },
        {
            id: "is_show",
            name: "is_show",
            label: "Show",
            type: "radioGroup",
            options: [
                {
                    id: 0,
                    name: "Hide"
                },
                {
                    id: 1,
                    name: "Show"
                }
            ],
            valueKey: "id",
            textKey: "name",
            required: true,
        }
    ]



    return <section>
        <BaseUpdate 
            resource={resource} 
            fields={fields}
            id={id}
            entity={data}></BaseUpdate>
    </section>
}