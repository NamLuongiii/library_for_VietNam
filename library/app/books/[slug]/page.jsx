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

    return <main className="p-4 lg:px-0 lg:py-4">

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
            <Button width="200px" colorScheme="teal" size="lg">Read</Button>
        </div>


    </main>
}