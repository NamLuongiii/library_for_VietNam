
export default function AvatarField(props) {
    const {
        id,
        name,
        type,
        label,
        value,
        onchange,
    } = props

    function handleChange(e) {
        const f = e.target.files[0]
        if (f) onchange(f)
    }

    return (
        <div className="px-8 py-4">
            <label>{label}</label>
            <input
                type="file"
                accept="image/*"
                id={id}
                name={name}
                onChange={handleChange}
            ></input>
        </div>
    )
}