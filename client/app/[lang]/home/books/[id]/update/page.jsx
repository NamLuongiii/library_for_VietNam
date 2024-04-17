import BaseUpdate from "@/app/components/base/baseUpdate"
import { show } from "@/app/help/base"

export default async function BookUpdate({ params: {id}}) {
    const resource = "books"
    const {data} = await show(resource, id)
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
            id: "file_url",
            name: "file_url",
            label: "File url",
            type: "text",
        }, 
        {
            id: "file_name",
            name: "file_name",
            label: "File Name",
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