import { Index } from "@/app/lib/baseApi"
import NoData from "../commons/noData"
import Cover from "../commons/cover"
import Link from "next/link"
import QueryLink from "./QueryLink"
import { Radio, RadioGroup } from "@chakra-ui/react"
import Filter from "./filter"

export default async function BaseBookListing({searchParams}) {
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
    const total_pages = 10

    // 0 1 2 3 4 5 6 7 <= page = 0
    // 0 1 2 3 4 5 6 7 <= page = 1
    // 0 1 2 3 4 5 6 7 <= page = 2 value = index + page - 2
    // 1 2 3 4 5 6 7 8 <= page = 3 value = index + page - 2
    let pagesIndex = [0,1,2,3,4,5,6,7]
    if (page > 1) {
        pagesIndex = pagesIndex.map((value, index) => index + page - 2)
    }
    pagesIndex = pagesIndex.filter(_page => _page > -1 && _page < total_pages)
    if (pagesIndex[pagesIndex.length - 1] < total_pages - 1) 
        pagesIndex.push(-1)

    return <main className="mx-auto max-w-screen-lg grid grid-cols-1 py-4 lg:grid-cols-3 lg:py-8">
        <section className="col-span-1 bg-gray-50 p-2 lg:col-span-3 lg:p-4">
            <span className="p-1 inline-block rounded-sm bg-gray-100 hover:bg-gray-200 lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
            </span>
        </section>

        <section className="hidden lg:block lg:p-4 lg:col-span-1 border">
            <Filter categories={categories}></Filter>
        </section>

        {empty && (
            <section className="p-4 col-span-1 lg:p-8 lg:col-span-2 border">
                <NoData></NoData>
            </section>
        )}

        {!empty && (
            <section className="p-4 grid-cols-1 lg:p-8 lg:col-span-2 border">
                <div className="flex flex-wrap">
                    {books.map(book => (
                        <Cover 
                            key={book.id} 
                            className="basis-1/3 p-4 py-4 md:p-4"
                            book={book} ></Cover>
                    ))}
                </div>

                <div className="py-4 lg:py-12 flex items-center">
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <QueryLink query={`page=${page - 1 >= 0 ? page - 1 : 0}`} className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 
                        ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Previous</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                            </svg>
                        </QueryLink>
                        {pagesIndex.map((_page, index) => {
                            if (_page == -1) {
                                return <span key={_page} className="relative inline-flex items-center px-4 py-2 text-sm font-semibold 
                                text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">...</span> 
                            } 

                            return (
                                <QueryLink 
                                key={_page}
                                query={`page=${_page}`} 
                                aria-current="page" 
                                className={`relative z-10 inline-flex items-cente px-4 py-2
                                text-sm font-semibold focus:z-20 ring-1 ring-inset ring-gray-300 
                                ${_page == page ? "bg-indigo-600 text-white ring-indigo-300" : "text-gray-400 hover:bg-gray-50"}`}>{_page}</QueryLink>                                
                            )

                        })}
                    
                        <QueryLink query={`page=${page + 1 < total_pages ? page + 1 : total_pages - 1}`} className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                            <span className="sr-only">Next</span>
                            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                            </svg>
                        </QueryLink>
                    </nav>
                </div>
            </section>
        )}

    </main>
}