
export default function Input(props) {

    function onChange(e) {
        return props.onchange(e.target.value)
    }

    return <div className="pb-4">
        <label htmlFor={props.id} className="text-md text-gray-600 font-extralight">{props.label}</label>
        <input  
            id={props.id}
            type={props.type}
            value={props.value}
            name={props.name}
            onChange={onChange}
            className="border block"
        ></input>
    </div>
}