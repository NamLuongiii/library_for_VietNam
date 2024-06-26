import Radio from '@mui/material/Radio'
import MuiRadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import FormHelperText from '@mui/material/FormHelperText'

export default function RadioGroup(props) {
  const {
    id,
    name,
    type,
    label,
    value,
    options = [],
    onchange,
    valueKey,
    textKey,
    isDisplay,
    errorMessage,
    required,
    parseInt,
  } = props

  function handleChange(e, value) {
    if (parseInt) return onchange(Number(value))
    return onchange(e.target.value)
  }

  return (
    <FormControl
      variant="outlined"
      className="!px-8 py-4"
      disabled={isDisplay}
      required={required}
      error={!!errorMessage}
    >
      <FormLabel>{label}</FormLabel>
      <MuiRadioGroup
        id={id}
        row
        name={name}
        defaultValue={value}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <FormControlLabel
            key={index}
            value={option[valueKey]}
            control={<Radio required={required} />}
            label={option[textKey]}
          />
        ))}
      </MuiRadioGroup>
      <FormHelperText>{errorMessage}</FormHelperText>
    </FormControl>
  )
}
