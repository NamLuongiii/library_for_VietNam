import Input from "./input";
import Select from "./select";
import Textarea from "./textarea";

export default function Generator(props) {

    let ele
    switch (props.type) {
        case "text":
            ele = <Input
                id={props.id}
                type={props.type}
                value={props.value}
                name={props.name}
                label={props.label}
                onchange={props.onchange}
            />
            break;

        case "textare":
            ele = <Textarea
                id={props.id}
                type={props.type}
                value={props.value}
                name={props.name}
                label={props.label}
                row={props.row}
                column={props.column}
                onchange={props.onchange}
            />
            break;

        case "select":
            ele = <Select
                id={props.id}
                type={props.type}
                value={props.value}
                name={props.name}
                label={props.label}
                onchange={props.onchange}
            ></Select>

            break;
        default:
            break;
    }


    return ele
}