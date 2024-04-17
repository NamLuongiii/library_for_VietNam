import BaseStore from "@/app/components/base/baseStore"

export default async function CategoryStore() {
    const resource = "categories"
    const fields = [
        {
            id: "name",
            name: "name",
            label: "Name",
            type: "text",
        },
        {
            id: "des",
            name: "des",
            label: "Description",
            type: "textarea",
        },
    ]



    return <section>
        <BaseStore resource={resource} fields={fields}></BaseStore>
    </section>
}