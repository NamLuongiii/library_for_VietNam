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
                <Radio value={1}>Theme Sáng</Radio>
                {/* <Radio value={2}>Theme tối</Radio> */}
                <Radio value={3}>Theme Đất sét</Radio>
                <Radio value={4}>Theme paper</Radio>
            </Stack>
        </RadioGroup>
    )
}