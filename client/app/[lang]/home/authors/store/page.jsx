import BaseStore from "@/app/components/base/baseStore"

export default async function BookStore() {
    const resource = "authors"
    const fields = [
        {
            id: "name",
            name: "name",
            label: "Name",
            type: "text",
        },
        {
            id: "know_as",
            name: "know_as",
            label: "Know as",
            type: "text",
        },
        {
            id: "nation",
            name: "nation",
            label: "Nation",
            type: "text",
        }
    ]



    return <section>
        <BaseStore resource={resource} fields={fields}></BaseStore>
    </section>
}