"use client"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function QueryLink({query, children, className}) {
    const searchParams = useSearchParams()
    
    const split = query.split("=")
    const name = split[0]
    const value = split[1]

    const urlSearchParams = new URLSearchParams(searchParams)
    urlSearchParams.set(name, value)
    const queries = urlSearchParams.toString()
    
    return <Link className={className} href={`?${queries}`}>{children}</Link>
}