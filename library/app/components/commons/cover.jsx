import Image from "next/image"
import Link from "next/link"

export default function ({ book }) {
    const { cover, name, id } = book

    return (
        <Link className="group inline-block" href={`/books/${id}`}>
            <div className="overflow-hidden w-44 h-52 border-2 mb-4 lg:w-52 lg:h-60">
                <img
                    alt="book cover"
                    src={cover}
                    className="group-hover:scale-105 transition-transform duration-150 object-cover"
                ></img>
            </div>
            <div className="text-base font-normal text-gray-600">{name}</div>
        </Link>
    )
}