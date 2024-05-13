import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import MuiSelect from '@mui/material/Select'

export default function Select(props) {
  const {
    id,
    name,
    type,
    label,
    value,
    options = [],
    onchange,
    isDisplay,
    required,
    errorMessage,
  } = props

  function handleChange(e) {
    onchange(e.target.value)
  }

  return (
    <FormControl
      className="mx-8 my-4 min-w-28"
      disabled={isDisplay}
      error={!!errorMessage}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        id={id}
        name={name}
        defaultValue={value}
        label={label}
        onChange={handleChange}
        required={required}
      >
        {options.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}
