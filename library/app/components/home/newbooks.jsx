import Cover from "../commons/cover"

const books = [
    {
        id: 1,
        name: "Test book",
        cover: "https://sachvuii.com/wp-content/uploads/2022/09/sachvui-ky-thuat-nau-an-toan-tap.jpg",
    }
]

export default function NewBooks() {
    return <section className="py-4 lg:px-0 lg:py-8">
        <h2 className="text-2xl text-slate-600">Discover new books</h2>
        <div className="grid grid-cols-2 gap-2 md:flex md:gap-4">
            {books.map((book, index) => <Cover key={index} book={book}></Cover>)}
        </div>
    </section>
}