
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
        multiple = false
    } = props

    function handleChange(e) {

    }

    function _value() {
        if (multiple) {
            return value ? [value[valueKey]] : []
        } else {
            return value ? value[valueKey] : null 
        }
    }

    function isSelectDisabled() {
        return isDisplay
    }

    return <div className="px-4 py-2 grid grid-cols-4">
        <label htmlFor={id} className="grid-cols-1 font-mono">{label}</label>
        <select
            className="grid-cols-3 px-4 py-1 border-2"
            name={name}
            id={id}
            disabled={isSelectDisabled()}
            multiple={multiple}
            onChange={handleChange}
            >
            <option disabled selected value> -- select an option -- </option>
            {options.map((option, index) => (
                <option
                    className="p-2"
                    key={index}
                    value={option[valueKey]}>
                    {option[textKey]}
                </option>
            ))}
        </select>
        <p className="grid-cols-4 text-sm">{errorMessage}</p>
    </div>
}