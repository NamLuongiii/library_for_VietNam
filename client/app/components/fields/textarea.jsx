"use client"
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

    if (isDisplay) return <textarea onChange={onChange} name={name} rows={rows} columns={columns} disabled value={value}></textarea>

    return <div className={`grid grid-cols-4 px-4 py-2`}>
        <label htmlFor={id} className={`col-span-1 font-mono ${errorMessage ? "text-red-600" : ""}`}>{label}</label>
        <textarea 
            className={`col-span-3 border-2 p-4 ${errorMessage ? "border-red-600" : ""}`}
            onChange={onChange} 
            name={name} 
            rows={rows} 
            columns={columns}>{value}</textarea>
        <p className="col-span-4 pt-2 text-sm text-red-600 font-mono" >{errorMessage}</p>
    </div>
}