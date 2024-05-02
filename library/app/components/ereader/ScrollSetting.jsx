import { useState } from "react";
import CheckIcon from "../icons/check";
import { IconButton } from "@chakra-ui/react";

export default function ScrollSetting({ onchange, mode = 1 }) {
    const [off, setOff] = useState(mode)

    const handleChange = () => {
        const _off = off == 1 ? 0 : 1
        setOff(_off)
        onchange(_off)
    }

    return (
        <IconButton
            onClick={handleChange}
            icon={(
                <div className="flex flex-col justify-center items-center px-2">
                    <span className="text-xs">{!!off ? "off" : "on"}</span>
                    <span className="text-xs font-bold">Đọc dọc</span>
                </div>
            )}
        >

        </IconButton>
    )
}