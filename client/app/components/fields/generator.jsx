import Input from "./input";
import ComplexSelect from "./complexSelect";
import Textarea from "./textarea";

export default function Generator(props) {
    const {
        errorMessages = {}
    } =  props
    function renderValue() {
        const { render, entity, value, name } = props
        if (!value && !entity && !render) return undefined

        if (value) return value
        if (entity) return entity[name]
        if (render) return render(entity)
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
                isDisplay={props.isDisplay}
                errorMessage={errorMessages[props.name]}
            />
            break;

        case "textarea":
            ele = <Textarea
                id={props.id}
                type={props.type}
                value={renderValue()}
                name={props.name}
                label={props.label || props.name}
                rows={props.rows}
                columns={props.columns}
                onchange={props.onchange}
                isDisplay={props.isDisplay}
                errorMessage={errorMessages[props.name]}
            />
            break;

        case "complexSelect":
            ele = <ComplexSelect
                id={props.id}
                type={props.type}
                value={renderValue()}
                name={props.name}
                label={props.label || props.name}
                onchange={props.onchange}
                isDisplay={props.isDisplay}
                options={props.options}
                valueKey={props.valueKey}
                textKey={props.textKey}
                errorMessage={errorMessages[props.name]}
            ></ComplexSelect>
            break;

        case "date":
            ele = <Input
                id={props.id}
                type={props.type}
                value={renderValue()}
                name={props.name}
                label={props.label || props.name}
                onchange={props.onchange}
                isDisplay={props.isDisplay}
                errorMessage={errorMessages[props.name]}
            />
            break;
        default:
            break;
    }


    return ele
}