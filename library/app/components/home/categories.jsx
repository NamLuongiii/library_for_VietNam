import Link from "next/link"

export default function Categories({ categories }) {

    return <section className="pt-16">
        <h2 className="text-2xl font-bold text-gray-600 mb-8">Danh mục sách</h2>
        <div className="columns-1 pt-2 lg:columns-3 lg:pt-4">
            {categories.map((category, index) => (
                <Link 
                    key={index} 
                    href={`/books?category=${category.id}`}
                    className="flex items-center gap-4">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-orange-400">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    <p className="text-base font-normal text-gray-600">{category.name}</p>
                </Link>
            ))}
        </div>
    </section>
}