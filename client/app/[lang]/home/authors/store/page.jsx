import BaseStore from "@/app/components/base/baseStore"

export default async function AuthorStore() {
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
        },
        {
            id: "potrait",
            name: "potrait",
            label: "Avatar",
            type: "avatar",
        },
        {
            id: "bio",
            name: "bio",
            label: "Biograhy",
            type: "textarea",
        },
    ]



    return <section>
        <BaseStore resource={resource} fields={fields}></BaseStore>
    </section>
}