import {
    Slider,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb,
    SliderMark,
} from '@chakra-ui/react'
import { useState } from 'react'



export default function FontSizeSetting({ onchange ,min = 1, max=12, defaultValue }) {
    const [value, setValue] = useState(defaultValue)

    const fontSize = () => {
        return 16 + (value - 5) * 2
    }

    const handleChange = e => {
        setValue(e)
        onchange(e)
    }

    return (
        <div className="inline-flex items-center gap-2 min-w-44">
            <span 
                style={{ fontSize: `${fontSize()}px` }}
                className="font-sans text-base">Aa</span>

            <Slider aria-label='slider-ex-4' min={min} max={max} defaultValue={value} onChange={handleChange}>
                <SliderTrack bg='red.100'>
                    <SliderFilledTrack bg='tomato' />
                </SliderTrack>
                <SliderThumb boxSize={6}>{value}</SliderThumb>
            </Slider>
        </div>
    )
}