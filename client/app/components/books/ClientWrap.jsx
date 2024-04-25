"use client"

import { bookDocumentsUpoad, uploadSingleImage } from "@/app/help/firebase"
import BaseStore from "../base/baseStore"
import { extractBookExtension } from "@/app/help/uitilies"

export default function ClientWrap(props) {
    async function handleBeforeSubmit(input) {
        const url = await uploadSingleImage(input.cover)
        input.cover = url

        const files = input.files

        if (files && files[0] && files[0].type) {
            const urls = await bookDocumentsUpoad(files)
            input.files = files.map((file, index) => {
                return {
                    name: file.name,
                    url: urls[index],
                    extension: extractBookExtension(file.type)
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