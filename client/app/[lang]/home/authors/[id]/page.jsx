import BaseShow from "@/app/components/base/baseShow"
import { show } from "@/app/help/base"

export default async function AuthorShow({ params: {id}}) {
    const resource = "authors"
    const { data } = await show(resource, id)

    const fields = [
        {
            id: "name",
            name: "name",
            label: "Name",
            type: "text",
            isDisplay: true,
        },
        {
            id: "potrait",
            name: "potrait",
            label: "Potrait",
            type: "avatar",
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