'use client'

import { TextField } from '@mui/material'
import MuiAutocomplete from '@mui/material/Autocomplete'

export default function Autocomplete(props) {
  const {
    id,
    name,
    value = [],
    label,
    options = [],
    onchange,
    valueKey,
    textKey = 'name',
    isDisplay,
    errorMessage,
    required,
  } = props

  function handleChagne(e, v) {
    onchange(v)
  }

  return (
    <div className="px-8 py-4">
      <MuiAutocomplete
        id={id}
        name={name}
        options={options}
        size="small"
        multiple
        getOptionLabel={(option) => option[textKey]}
        defaultValue={value}
        onChange={handleChagne}
        renderInput={(params) => (
          <TextField variant="outlined" label={label} {...params}></TextField>
        )}
        disabled={isDisplay}
        required={isDisplay}
        isOptionEqualToValue={(option, value) =>
          option === value || option[valueKey] == value[valueKey]
        }
      ></MuiAutocomplete>
    </div>
  )
}
