import BaseStore from "@/app/components/base/baseStore"
import ClientWrap from "@/app/components/books/ClientWrap"
import { options } from "@/app/help/base"

export default async function BookStore() {
    const resource = "books"
    const authors = await options("books/authors")
    const categories = await options("books/categories")
    const languages = await options("books/lang")
    const level = await options("books/level")
    const status = await options("books/status")

    const fields = [
        {
            id: "name",
            name: "name",
            label: "Name",
            type: "text",
            required: true,
        },
        {
            id: "cover",
            name: "cover",
            label: "Cover",
            type: "bookCover",
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
            id: "page",
            name: "page",
            label: "Page number",
            type: "number",
            min:0,
        },
        {
            id: "chapter",
            name: "chapter",
            label: "Chapter number",
            type: "number",
            min:0,
        },
        {
            id: "location",
            name: "location",
            label: "Location",
            type: "number",
            min:0,
        },
        {
            id: "lang",
            name: "lang",
            label: "Lang",
            type: "radioGroup",
            options: languages.data,
            valueKey: "id",
            textKey: "name",
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
        },
        {
            id: "preface",
            name: "preface",
            label: "Preface",
            type: "textarea",
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
        },
        {
            id: "files",
            name: "files",
            type: "bookDocuments",
            label: "Documents",
        }
    ]

    return (
        <ClientWrap
            resource={resource}
            fields={fields}></ClientWrap>
    )

}
