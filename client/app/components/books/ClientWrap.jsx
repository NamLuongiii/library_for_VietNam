"use client"

import { bookDocumentsUpoad, uploadSingleImage } from "@/app/help/firebase"
import BaseStore from "../base/baseStore"
import { extractBookExtension } from "@/app/help/uitilies"

export default function ClientWrap(props) {
    async function handleBeforeSubmit(input) {
        const url = await uploadSingleImage(input.cover)
        input.cover = url

        const files = input.files

        if (files && files[0]) {
            console.log(files.map(file => file.content));
            const urls = await bookDocumentsUpoad(files.map(file => file.content))
            input.files = files.map((file, index) => {
                return {
                    name: file.name,
                    url: urls[index],
                    extension: extractBookExtension(file.content.type)
                }
            })
        }

        return input
    }

    return <section>
        <BaseStore
            beforeSubmit={handleBeforeSubmit}
            {...props}></BaseStore>
    </section>
}