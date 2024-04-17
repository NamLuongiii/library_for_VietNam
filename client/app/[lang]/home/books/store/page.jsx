import BaseStore from "@/app/components/base/baseStore"

export default async function BookStore() {
    const resource = "books"
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
        <BaseStore resource={resource} fields={fields}></BaseStore>
    </section>
}