import { Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { useState } from "react"

export default function ThemeSetting({ onchange, theme = 1 }) {
    const [value, setValue] = useState(theme)

    const handleChange = (e) => {
        const _e = Number(e)
        onchange(_e)
        setValue(_e)
    }

    return (
        <RadioGroup onChange={handleChange} value={value} colorScheme="teal">
            <Stack direction='row'>
                <Radio value={1}>Sáng</Radio>
                <Radio value={2}>Tối</Radio>
                <Radio value={3}>Đất sét</Radio>
            </Stack>
        </RadioGroup>
    )
}