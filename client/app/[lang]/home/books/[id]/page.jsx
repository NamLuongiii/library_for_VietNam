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
            type: "display",
            name: "ID",
            valueKey: "id",
        },
        {
            type: "display",
            name: "Name",
            valueKey: "name",
        },
        {
            type: "display",
            name: "En name",
            valueKey: "en_name",
        },
        {
            type: "display",
            name: "Origin Name",
            valueKey: "origin_name",
        },
        {
            type: "display",
            name: "Cover",
            valueKey: "cover",
        },
        {
            type: "display",
            name: "Preface",
            valueKey: "preface",
        },
        {
            type: "display",
            name: "Compose at",
            valueKey: "compose_at",
        },
        {
            type: "display",
            name: "Release at",
            valueKey: "release",
        },
        {
            type: "display",
            name: "Publisher",
            valueKey: "publisher",
        },
        {
            type: "display",
            name: "Page",
            valueKey: "page",
        },
        {
            type: "display",
            name: "Location",
            valueKey: "location",
        },
        {
            type: "display",
            name: "Chapter",
            valueKey: "chapter",
        },
        {
            type: "display",
            name: "Language",
            valueKey: "lang",
        },
        {
            type: "display",
            name: "Origin Language",
            valueKey: "origin_lang",
        },
        {
            type: "display",
            name: "Project Url",
            valueKey: "project_url",
        },
        {
            type: "display",
            name: "Resource Url",
            valueKey: "resource_url",
        },
        {
            type: "display",
            name: "File Url",
            valueKey: "file_url",
        },
        {
            type: "display",
            name: "File Name",
            valueKey: "file_name",
        },
        {
            type: "display",
            name: "Nation",
            valueKey: "nation",
        },
        {
            type: "display",
            name: "Status",
            valueKey: "status",
        },
        {
            type: "display",
            name: "Is Show",
            valueKey: "is_show",
        },
        {
            type: "display",
            name: "Level",
            valueKey: "Level",
        },
    ]
    
    return <section>
        <BaseShow entity={data} fields={fields} resource={resource}></BaseShow>
    </section>
}