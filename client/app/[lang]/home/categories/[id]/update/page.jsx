import BaseUpdate from "@/app/components/base/baseUpdate"
import { show } from "@/app/help/base"

export default async function CategoryUpdate({ params: {id}}) {
    const resource = "categories"
    const {data} = await show(resource, id)
    const fields = [
        {
            id: "id",
            name: "id",
            label: "ID",
            type: "text",
            isDisplay: true,
        },
        {
            id: "name",
            name: "name",
            label: "Name",
            type: "text",
        },
        {
            id: "des",
            name: "Des",
            label: "Description",
            type: "text",
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