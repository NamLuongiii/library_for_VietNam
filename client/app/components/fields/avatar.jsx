
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
        onchange(e.target.files)
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