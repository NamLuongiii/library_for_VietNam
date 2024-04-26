import Cover from "../commons/cover"


const books = []
export default function ReadingHistory() {
    
    return <section className="pt-16">
        <h2 className="text-2xl font-bold text-gray-600">Cá nhân</h2>
        <div className="pt-2 grid grid-cols-2 gap-2 md:flex md:gap-4 md:pt-4">
            {books.map((book, index) => <Cover className="max-w-56" key={index} book={book} ></Cover>)}
            {books.length == 0 && (
                <p>No data</p>
            )}
        </div>
    </section>
}