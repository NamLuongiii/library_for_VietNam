
export default function Input(props) {

    function onChange(e) {
        return props.onchange(e.target.value)
    }

    return <div>
        <label htmlFor={props.id} >{props.label}</label>
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