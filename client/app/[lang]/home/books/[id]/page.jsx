import { show } from "@/app/help/base"

async function showBook(id) {
    return show("books", id)
}

export default async function BookShow({ params: {id}}) {
    const { data } = await showBook(id)
    
    return <section>
        {id}
    </section>
}