async function getBooks() {
    return "Hello world"
}

export default async function BookIndex() {
    const books = await getBooks()


    return <section>
        {books}
    </section>
}