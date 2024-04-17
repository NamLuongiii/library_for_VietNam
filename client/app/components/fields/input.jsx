"use client"

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
    } = props

    function onChange(e) {
        return onchange(e.target.value)
    }



    if (isDisplay)
        return <div className="grid grid-cols-4 px-4 py-2">
            <label className="col-span-1 font-mono">{label}:</label>
            <div className="col-span-3">{value == undefined || value == null || value == "" ? "//" : value}</div>
        </div>

    return <div className="grid grid-cols-4 px-4 py-2">
        <label className={`col-span-1 font-mono ${errorMessage ? 'text-red-600' : ""}`} htmlFor={id}>{label}:</label>
        <input
            id={id}
            type={type}
            defaultValue={value}
            name={name}
            onChange={onChange}
            className={`"col-span-3 px-4 py-1 border-2 " ${errorMessage ? 'border-red-600' : ""}`}
        ></input>
        <p className={`col-span-3 text-xs pt-2 font-mono ${errorMessage ? 'text-red-600' : ""}`}>{errorMessage}</p>
    </div>
}