"use client"

import Image from "next/image"
import { useState } from "react"
import minusIcon from "@/public/methods/minus.svg"

export default function InseartingField(props) {
    const {
        id,
        name,
        type,
        value = [],
        label,
        onchange,
        isDisplay,
        inseartStruct,
        errorMessage,
    } = props

    const [input, setInput] = useState({})
    const [data, setData] = useState(value)

    function handleSubmit() {
        const _data = [...data, input]
        onchange(_data)
        setData(_data)
        setInput({})
    }

    function handleChange(e, field) {
        const v = e.target.value
        input[field.name] = v
        setInput({ ...input })
    }

    function handleRemove(item) {
        setData(data.filter(v => v != item))
    }

    if (isDisplay) return <section className="px-4 py-2 grid grid-cols-4">
        <div className="font-mono col-span-1">{label}</div>
        <ul className="border-2 p-4 col-span-3">
            {data.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                    {inseartStruct.map(field => (
                     <span key={field.id}>- {item[field.name]} </span>
                    ))}
                </div>
            ))}
        </ul>
    </section>

    return <section className="px-4 py-2 grid grid-cols-4">
        <div className="font-mono col-span-1">{label}</div>
        <div className="border-2 p-4 col-span-3">

            {data.map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                    <Image
                        alt="remove"
                        width={100}
                        height={100}
                        src={minusIcon.src}
                        className="w-8 pr-2 cursor-pointer"
                        onClick={() => handleRemove(item)}
                    ></Image>
                    {inseartStruct.map(field => (
                        <span key={field.id}>{item[field.name]} </span>
                    ))}
                </div>
            ))}
            <div className="border-1">
                {inseartStruct.map(field => (
                    <input
                        key={field.id}
                        id={field.id}
                        className="border-2 p-2 col-span-1 mr-2"
                        type="text"
                        placeholder={field.label}
                        value={input[field.name] || ""}
                        onChange={e => handleChange(e, field)}
                        name={field.name}></input>
                ))}
                <button type="button" onClick={handleSubmit} className="block p-2 my-2 bg-blue-600 text-white">Inseart</button>
            </div>
        </div>
        <div className="text-sm font-mono">{errorMessage}</div>
    </section>
}