
export default function complexSelect(props) {
    const{
        id,
        type,
        name,
        label,
        value,
        onchange,
        options = [],
        valueKey,
        textkey,
        isDisplay
    }  = props

    function handleChange(e) {
        const value = e.target.value
        onchange(options.find(o =>  o[valueKey] == value))
    }

    return <div>
        <label htmlFor={id}>{label}</label>
        <select name={name} id={id} onChange={handleChange}>
            {options.map((option, index) => (
                <option key={index} value={option[valueKey]} selected={value[valueKey] == option[valueKey] ? 'selected' : false}>{option[textkey]}</option>
            ))}
        </select>
    </div>
}