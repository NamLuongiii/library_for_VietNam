import Cover from "../commons/cover"

export default function NewBooks({ booksDiscovery }) {
    return <section className="py-4 lg:px-0 lg:py-8">
        <h2 className="text-2xl text-slate-600">Khám phá sách mới</h2>
        <div className="grid grid-cols-2 gap-2 py-2 md:py-4 md:flex md:gap-4">
            {booksDiscovery.map((book, index) => (
                <div className="w-48">
                    <Cover key={index} book={book}></Cover>                    
                </div>
            ))}
        </div>
    </section>
}