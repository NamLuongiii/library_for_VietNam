import { Index } from "@/app/lib/baseApi"
import NoData from "../commons/noData"
import Cover from "../commons/cover"
import Link from "next/link"
import QueryLink from "./QueryLink"
import { Radio, RadioGroup } from "@chakra-ui/react"
import Filter from "./filter"
import Pagination from "./pagination"

export default async function BaseBookListing({ searchParams }) {
    const resources = {
        books: "books",
        categories: "categories",
    }
    const urlSearchParams = new URLSearchParams(searchParams)
    const query = "?" + urlSearchParams.toString()

    const { data, page, page_size } = await Index(resources.books, query)
    const _categories = await Index(resources.categories)
    const categories = _categories.data
    const books = data
    const empty = !books.length

    return <main className="mx-auto max-w-screen-lg grid grid-cols-1 py-4 lg:grid-cols-4 lg:py-8">
        <section className="col-span-1 bg-gray-50 p-2 lg:col-span-4 lg:p-4">
            <span className="p-1 inline-block rounded-sm bg-gray-100 hover:bg-gray-200 lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
            </span>
        </section>

        <section className="hidden lg:block lg:p-4 lg:col-span-1">
            <Filter categories={categories}></Filter>
        </section>


        <section className="p-4 grid-cols-1 lg:p-8 lg:col-span-3">
            <div className="flex flex-wrap gap-x-4 gap-y-6">
                {books.map(book => (
                    <Cover
                        key={book.id}
                        className="basis-1/3 p-4 py-4 md:p-4"
                        book={book} ></Cover>
                ))}
            </div>

            {empty && <NoData></NoData>}

            <Pagination page={page} pageSize={page_size} pageCount={10}></Pagination>
        </section>


    </main>
}