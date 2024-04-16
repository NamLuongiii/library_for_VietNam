import Display from "./display";
import Input from "./input";
import Select from "./select";
import Textarea from "./textarea";

export default function Generator(props) {

    function renderValue() {
        const { valueKey, renderValue, entity, value } = props
        if (!entity) return value
        if (!renderValue) return entity[valueKey]
        return renderValue(entity[valueKey])
    }

    let ele
    switch (props.type) {
        case "text":
            ele = <Input
                id={props.id}
                type={props.type}
                value={renderValue()}
                name={props.name}
                label={props.label || props.name}
                onchange={props.onchange}
            />
            break;

        case "textare":
            ele = <Textarea
                id={props.id}
                type={props.type}
                value={renderValue()}
                name={props.name}
                label={props.label || props.name}
                row={props.row}
                column={props.column}
                onchange={props.onchange}
            />
            break;

        case "select":
            ele = <Select
                id={props.id}
                type={props.type}
                value={renderValue()}
                name={props.name}
                label={props.label || props.name}
                onchange={props.onchange}
            ></Select>

            break;

        case "display":
            ele = <Display
                id={props.id}
                type={props.type}
                value={renderValue()}
                name={props.name}
                label={props.label || props.name}
                onchange={props.onchange}
            ></Display>
        default:
            break;
    }


    return ele
}