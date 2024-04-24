"use client"

import { extractBookExtension, formatBytes } from "@/app/help/uitilies"
import { Chip } from "@mui/material"
import { useState } from "react"

export default function BookDocumentsField(props) {
    const {
        id, 
        type,
        name,
        label,
        value,
        onchange,
        isDisplay,
    } = props 
    const fileAccept = ".pdf, .epub, .mobi"

    const [files, setFiles] = useState([])

    function handleChange(e) {
        const files = e.target.files
        const _files = Object.values(files)
        setFiles(_files)
        onchange(_files)
    }

    return (
        <div className="px-8 py-4">
            <div className="text-sm text-gray-600">{label}</div>
            <input 
                className="block" 
                id={id} 
                type="file"
                multiple 
                accept={fileAccept}
                onChange={handleChange}
                name={name}></input>
            <ol>
                {files.map(file => (
                    <li className="text-sm text-gray-400 py-2">
                        {file.name} 
                        <Chip label={formatBytes(file.size)} color="warning" className="ml-2"></Chip>
                        <Chip label={extractBookExtension(file.type)} color="info" className="ml-2"></Chip>  
                    </li>
                ))}
            </ol>
        </div>
    )
}   