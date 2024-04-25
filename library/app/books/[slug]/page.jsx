import {
    Button,
    Select,
    Link,
    Badge,
} from '@chakra-ui/react'
import NextLink from "next/link"
import Image from "next/image"
import { Show } from '@/app/lib/baseApi'

export default async function BookDetail({ params: { slug } }) {
    const resource = "books"
    const { data } = await Show(resource, slug)
    const book = data

    return <main className="p-4 mx-auto max-w-screen-lg md:p-8 lg:py-8 lg:px-0">

        <div className="group w-40 h-48 border mx-auto my-8 md:w-48 md:h-56">
            <img
                alt='cover book'
                className="w-full object-cover group-hover:scale-105 transition-transform duration-200"
                src={book.cover}
            ></img>
        </div>

        <h1 className="text-xl text-center py-2 lg:text-2xl lg:py-4">{book.name}</h1>

        <div className="p-2 mx-auto lg:p-4 lg:max-w-96">
            <form id="ereader" method="GET" action="/ereader">
                <Select defaultChecked name="file">
                    {book.files.map(file => (
                        <option 
                            key={file.id} 
                            value={file.url}>{file.name}</option>
                    ))}
                </Select>
                <input name="book" defaultValue={book.id} className="hidden"></input>
            </form>

        </div>


        <div className="py-4 text-center lg:py-8">
            <Button width="200px" colorScheme="teal" size="lg" form="ereader" type="submit">Đọc online</Button>
        </div>

        <ol className="py-4 columns-1 md:py-6 md:columns-2 lg:py-8 lg:columns-3">
            <li>
                <label className="font-bold">Isbn: </label>
                <span>{book.isbn}</span>
            </li>
            <li>
                <label className="font-bold">Tên: </label>
                <span>{book.name}</span>
            </li>
            <li>
                <label className="font-bold">Tên tiếng anh: </label>
                <span>{book.en_name}</span>
            </li>
            <li>
                <label className="font-bold">Số chương: </label>
                <span>{book.chapter}</span>
            </li>
            <li>
                <label className="font-bold">Số trang: </label>
                <span>{book.page}</span>
            </li>
            <li>
                <label className="font-bold">Location: </label>
                <span>{book.location}</span>
            </li>
            <li>
                <label className="font-bold">Ngôn ngữ: </label>
                <span>{book.lang}</span>
            </li>
            <li>
                <label className="font-bold">Nguyên bản: </label>
                <span>{book.origin_lang}</span>
            </li>
            <li>
                <label className="font-bold">Tác giả: </label>
                {book.authors.map(author => (
                    <Link
                        className="mr-2 mr-4" 
                        key={author.id} 
                        color="teal.500" 
                        href={`/authors/${author.id}`}>{author.name}</Link>
                ))}
            </li>
            <li>
                <label className="font-bold">Danh mục: </label>
                {book.categories.map(category => (
                    <Link
                        key={category.id} 
                        color="teal.500" 
                        href={`/books?category=${category.id}`}>{category.name}</Link>
                ))}
            </li>
        </ol>

        <section className="py-4 my-4 min-h-28 border rounded-md shadow-md bg-teal-50 md:p-6 md:my-6 md:min-h-36 lg:p-8 lg:my-8 lg:min-h-44">
            <div className="text-lg md:text-xl">Giới thiệu</div>
            <p className="text-sm text-gray-600">
                {book.preface}
            </p>
        </section>
    </main>
}