"use client"
import {useFormStatus} from "react-dom"

export default function Destroy() {
    const status = useFormStatus()
    return <button className="border px-4 py-1" type="submit" disabled={status.pending}>
        {status.pending ? "Destroing..." : "Destroy"}
    </button>
}