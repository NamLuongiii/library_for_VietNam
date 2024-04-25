"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'
import { ReactReader } from 'react-reader'
import { CloseButton } from '@chakra-ui/react'
import Link from "next/link"

export default function Ereader() {
    const router = useRouter()
    const [location, setLocation] = useState(0)
    const searchParams = useSearchParams()
    const file = searchParams.get("file")
    const book = searchParams.get("book")

    console.log(file);

    return (
        <div className="fixed inset-0 h-screen">
            <div className="absolute top-2 right-12 p-2 z-10">
                <Link href={`/books/${book}`}>
                    <CloseButton size="lg"></CloseButton>
                </Link>
            </div>
            <ReactReader
                url={file}
                location={location}
                locationChanged={(epubcfi) => setLocation(epubcfi)}
            />
        </div>
    )
}