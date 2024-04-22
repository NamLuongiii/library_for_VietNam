"use client"

import { TextField } from "@mui/material"

export default function Textarea(props) {
    const {
        id,
        type,
        name,
        label,
        value,
        onchange,
        isDisplay,
        rows = 5,
        columns = 30,
        errorMessage,
    } = props

    function onChange(e) {
        return onchange(e.target.value)
    }

    return (
        <div className="px-8 py-4">
            <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={18}
                id={id}
                name={name}
                type={type}
                label={label}
                error={!!errorMessage}
                helperText={errorMessage}
            ></TextField>
        </div>
    )
}