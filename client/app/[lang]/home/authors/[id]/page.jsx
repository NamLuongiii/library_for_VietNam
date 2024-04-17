import BaseShow from "@/app/components/base/baseShow"
import { show } from "@/app/help/base"

async function showAuthor(resource, id) {
    return show(resource, id)
}

export default async function BookShow({ params: {id}}) {
    const resource = "authors"
    const { data } = await showAuthor(resource, id)

    const fields = [
        {
            id: "name",
            name: "name",
            label: "Name",
            type: "text",
            isDisplay: true,
        },
        {
            id: "know_as",
            name: "know_as",
            label: "Know as",
            type: "text",
            isDisplay: true,
        },
        {
            id: "nation",
            name: "nation",
            label: "Nation",
            type: "text",
            isDisplay: true,
        }
    ]
    
    return <section>
        <BaseShow entity={data} fields={fields} resource={resource}></BaseShow>
    </section>
}