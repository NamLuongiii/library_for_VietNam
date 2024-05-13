"use client"

import { TextField, useScrollTrigger } from "@mui/material"
import { useState } from "react"

export default function Textarea(props) {
    const {
        id,
        type,
        name,
        label,
        value,
        onchange,
        isDisplay,
        rows = 12,
        columns = 30,
        errorMessage,
        required,
        minLength,
        maxLength = 500,
    } = props

    const [v, setV] = useState(value)

    function onChange(e) {
        setV(e.target.value)
        return onchange(e.target.value)
    }

    function feedback() {
        const c = v ? v.length : 0
        return maxLength - c
    }

    return (
        <div className="px-8 py-4">
            <TextField
                size="small"
                fullWidth
                variant="outlined"
                multiline
                rows={rows}
                columns={columns}
                id={id}
                name={name}
                type={type}
                label={label}
                error={!!errorMessage}
                helperText={errorMessage || feedback()}
                defaultValue={value}
                onChange={onChange}
                disabled={isDisplay}
                required={required}
                minLength={minLength}
                maxLength={maxLength}
            ></TextField>
        </div>
    )
}