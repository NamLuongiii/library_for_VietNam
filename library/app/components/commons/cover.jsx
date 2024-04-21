import Image from "next/image"
import Link from "next/link"

export default function({book, className}) {
    const { cover, name, id } = book

    return <Link className={className + " group"} href={`/books/${id}`}>
        <div className="overflow-hidden w-full aspect-square border-2">
            <img 
                alt="book cover"
                src={cover}
                className="group-hover:scale-105 transition-transform duration-150 object-cover"            
            ></img>
        </div>
        <div className="text-sm text-slate-600">{name}</div>
    </Link> 
}