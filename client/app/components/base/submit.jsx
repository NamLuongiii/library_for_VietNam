"use client"
import {useFormStatus} from "react-dom"

export default function Submit() {
    const status = useFormStatus()
    return <button className="border px-2 py-1" type="submit" disabled={status.pending}>
        {status.pending ? "Submiting..." : "Submit"}
    </button>
}