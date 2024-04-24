"use client"

import { bookDocumentsUpoad } from "@/app/help/firebase"
import BaseStore from "../base/baseStore"
import { extractBookExtension } from "@/app/help/uitilies"

export default function ClientWrap(props) {
    async function handleBeforeSubmit(input) {
        const files = input.files

        if (files[0] && files[0].type) {
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