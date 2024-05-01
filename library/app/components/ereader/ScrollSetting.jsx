import { useState } from "react";
import CheckIcon from "../icons/check";

export default function ScrollSetting({ onchange, mode = 1 }) {
    const [off, setOff] = useState(mode)

    const handleChange = () => {
        const _off = off == 1 ? 0 : 1
        setOff(_off)
        onchange(_off)
    }

    return (
        <div 
            onClick={handleChange}
            className="inline-flex flex-col justify-center items-center cursor-pointer 
            bg-gray-100 hover:bg-gray-200 rounded-md p-1 text-teal-600">
            {!off && <CheckIcon></CheckIcon>}
            {!!off && <span className="text-xs">off</span>}
            <span className="text-xs font-bold">Đọc dọc</span>
        </div>
    )
}