"use client"
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ReactReader } from 'react-reader'

export default function Ereader() {
    const router = useRouter()
    const [location, setLocation] = useState(0)

    function handleClick() {
        router.back()
    }

    return (
        <div className="fixed inset-0 h-screen">
            <div className="absolute top-2 right-12 p-2 z-10">
                <span onClick={handleClick} className="inline-block p-2 rounded-sm bg-gray-100 hover:bg-gray-150 cursor-pointer">
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        strokeWidth={1.5} 
                        stroke="currentColor" 
                        className="w-6 h-6 text-gray-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>

                </span>
            </div>
            <ReactReader
                url="https://react-reader.metabits.no/files/alice.epub"
                location={location}
                locationChanged={(epubcfi) => setLocation(epubcfi)}
            />
        </div>
    )
}