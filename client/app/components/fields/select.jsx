
export default function Select(props) {

    return <div>
        <label htmlFor={props.id}>{props.label}</label>
        <select {...props}>
            {props.options.map(option => (
                <option key={option.value} value={option.value}>
                    {option.text}
                </option>
            ))}
        </select>
    </div>
}