import {
    Button,
    Select,
    Link,
    Badge,
} from '@chakra-ui/react'
import NextLink from "next/link"
import Image from "next/image"

const book = {
    id: 1,
    name: "Test book",
    cover: "https://sachvuii.com/wp-content/uploads/2022/09/sachvui-ky-thuat-nau-an-toan-tap.jpg",
}

export default function BookDetail({ params: { slug } }) {

    return <main className="p-4 mx-auto max-w-screen-lg md:p-8 lg:py-8 lg:px-0">

        <div className="group w-40 h-48 border mx-auto my-8 md:w-48 md:h-56">
            <img
                alt='cover book'
                className="w-full object-cover group-hover:scale-105 transition-transform duration-200"
                src={book.cover}
            ></img>
        </div>

        <h1 className="text-xl text-center py-2 lg:text-2xl lg:py-4">{book.name}</h1>

        <div className="overflow-hidden mx-auto py-2 px-2 max-w-96 lg:py-4">
            <Select placeholder="Empty">
                <option>epub</option>
                <option>pdf</option>
                <option>mobi</option>
            </Select>
        </div>


        <div className="py-4 text-center lg:py-8">
            <Link href="/ereader">
                <Button width="200px" colorScheme="teal" size="lg">Read</Button>
            </Link>
        </div>

        <ol className="py-4 columns-1 md:py-6 md:columns-2 lg:py-8 lg:columns-3">
            <li>English name: "Test book"</li>
            <li>Chapter 3</li>
            <li>Page 200</li>
            <li>Location 1000</li>
            <li>Language vietnamese</li>
            <li>Origin language english</li>
            <li>
                Author 
                <Link>Test author 1</Link>
                <Link>Test author 2</Link>    
                <Link>Test author 3</Link>
            </li>
            <li>Translator <Link>Translator a</Link></li>
            <li>
                Categories 
                <Link>Category a</Link>    
                <Link>Category b</Link>
                <Link>Category c</Link>
            </li>           
        </ol>

        <section className="py-4 my-4 min-h-28 border rounded-md shadow-md bg-teal-50 md:p-6 md:my-6 md:min-h-36 lg:p-8 lg:my-8 lg:min-h-44">
            <div className="text-lg md:text-xl">Preface</div>
            <p className="text-sm text-gray-600">Content</p>
        </section>
    </main>
}