export default function Display(props) {
  const { id, type, value, name, label } = props

  return (
    <div className="px-4 pb-4 flex items-center">
      <label htmlFor={id} className="text-sm font-extralight pr-4">
        {label}:
      </label>
      <div>
        {value == null || value == '' || value == undefined ? '//' : value}
      </div>
    </div>
  )
}
