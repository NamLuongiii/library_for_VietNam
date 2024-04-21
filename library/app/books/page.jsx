import BaseBookListing from "@/app/components/books/baseBookListing";

export default function Category({ searchParams }) {
    return <main>
        <BaseBookListing searchParams={searchParams}></BaseBookListing>
    </main>
}