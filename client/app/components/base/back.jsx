"use client"
import { useRouter } from 'next/navigation'

export default function Back({text = "Back"}) {
    const router = useRouter()
    function handleClick() {
        router.back()
    }
    return <button 
        type="button"
        className="border px-4 py-1"
    onClick={handleClick}>{text}</button>
}