import Cover from "../commons/cover"


const books = [
    {
        id: 1,
        name: "Test book",
        cover: "https://sachvuii.com/wp-content/uploads/2022/09/sachvui-ky-thuat-nau-an-toan-tap.jpg",
    }
]
export default function YourBooks() {
    return <section className="py-4 lg:py-8">
        <h2 className="text-2xl text-slate-700">Cá nhân</h2>
        <div className="pt-2 grid grid-cols-2 gap-2 md:flex md:gap-4 md:pt-4">
            {books.map((book, index) => <Cover key={index} book={book} ></Cover>)}
        </div>
    </section>
}