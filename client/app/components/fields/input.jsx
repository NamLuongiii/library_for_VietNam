"use client"

import { TextField } from "@mui/material"

export default function Input(props) {

    const {
        id,
        type,
        name,
        label,
        value,
        onchange,
        isDisplay,
        errorMessage,
        required,
        maxLength,
        minLength,
        min, 
        max,
    } = props

    function onChange(e) {
        return onchange(e.target.value)
    }

    return <div className="px-8 py-4">
        <TextField
            size="small"
            fullWidth
            variant="outlined"
            id={id}
            name={name}
            type={type}
            label={label}
            error={!!errorMessage}
            helperText={errorMessage}
            defaultValue={value}
            onChange={onChange}
            disabled={isDisplay}
            required={required}
            maxLength={maxLength}
            minLength={minLength}
            min={min}
            max={max}
        ></TextField>
    </div>
}