"use client"
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons"
import { useRouter } from "next/navigation"
import ReactPaginate from "react-paginate"


export default function Pagination({page, pageSize, pageCount}) {
    const router = useRouter()

    const handlePageClick = (event) => {
        const selected = event.selected
        router.push(`?page=${selected}`)
    }

    return (
        <ReactPaginate
            className="flex gap-2 items-center flex-wrap mt-8"
            pageLinkClassName="w-10 h-10 flex justify-center items-center bg-gray-100 hover:bg-gray-200 rounded-md cursor-pointer font-bold"
            activeLinkClassName="bg-teal-500 hover:bg-teal-600 text-white"
            breakLabel="..."
            nextLabel={<ArrowRightIcon color="teal"></ArrowRightIcon>}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<ArrowLeftIcon color="teal"></ArrowLeftIcon>}
            renderOnZeroPageCount={null}
        />
    )
}