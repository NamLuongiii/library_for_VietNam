
export default function Textarea(props) {
    
    return <div>
        <label htmlFor={props.id}>{props.label}</label>
        <textarea {...props}></textarea>
    </div>
}