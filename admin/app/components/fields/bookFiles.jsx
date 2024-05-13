export default function BookFileField(props) {
  const { id, name, type, label, value, onchange, required } = props

  function handleChange(e) {
    onchange(e.target.files)
  }

  return (
    <div className="px-8 py-4">
      <label>{label}</label>
      <input
        id={id}
        name={name}
        type="file"
        accept=".epub, .pdf"
        multiple
        required={required}
        onChange={handleChange}
      ></input>
    </div>
  )
}
