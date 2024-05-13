import BaseShow from "@/app/components/base/baseShow"
import { show } from "@/app/help/base"

export default async function CategoryShow({ params: {id}}) {
    const resource = "categories"
    const { data } = await show(resource, id)

    const fields = [
        {
            id: "id",
            name: "id",
            label: "ID",
            type: "text",
            isDisplay:  true,
        },
        {
            id: "name",
            name: "name",
            label: "Name",
            type: "text",
            isDisplay: true,
        },
        {
            id: "des",
            name: "des",
            label: "Description",
            type: "textarea",
            isDisplay: true,
        }
    ]

    console.log(data);
    
    return <section>
        <BaseShow 
            entity={data} 
            fields={fields} 
            resource={resource}></BaseShow>
    </section>
}