'use client'

export default function complexSelect(props) {
  const {
    id,
    type,
    name,
    label,
    value,
    onchange,
    options = [],
    valueKey,
    textKey,
    isDisplay,
    errorMessage,
  } = props

  function handleChange(e) {
    const value = e.target.value
    onchange(options.filter((o) => o[valueKey] == value))
  }

  function isSelectDisabled() {
    return isDisplay
  }

  return (
    <div className="px-4 py-2 grid grid-cols-4">
      <label htmlFor={id} className="grid-cols-1 font-mono">
        {label}
      </label>
      <select
        className="grid-cols-3 px-4 py-1 border-2"
        name={name}
        id={id}
        disabled={isSelectDisabled()}
        onChange={handleChange}
      >
        {options.map((option, index) => (
          <option className="p-2" key={index} value={option[valueKey]}>
            {option[textKey]}
          </option>
        ))}
      </select>
      <p className="grid-cols-4 text-sm">{errorMessage}</p>
    </div>
  )
}
