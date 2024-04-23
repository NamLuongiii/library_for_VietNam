import Input from "./input";
import ComplexSelect from "./complexSelect";
import Textarea from "./textarea";
import InseartingField from "./insertingField";
import AvatarField from "./avatar";
import BookFileField from "./bookFiles";
import Autocomplete from "./autocomplete";
import RadioGroup from "./radioGroup";

export default function Generator(props) {
    const {
        errorMessages = {}
    } = props
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
                {...props}
                value={renderValue()}
                errorMessage={errorMessages[props.name]}
            />
            break;

        case "textarea":
            ele = <Textarea
                {...props}
                value={renderValue()}
                errorMessage={errorMessages[props.name]}
            />
            break;

        case "complexSelect":
            ele = <ComplexSelect
                {...props}
                value={renderValue()}
                errorMessage={errorMessages[props.name]}
            ></ComplexSelect>
            break;

        case "date":
            ele = <Input
                {...props}
                value={renderValue()}
                errorMessage={errorMessages[props.name]}
            />
            break;

        case "inseartingField":
            ele = <InseartingField
                {...props}
                value={renderValue()}
                errorMessage={errorMessages[props.name]}
            ></InseartingField>
            break;
        case "avatar":
            ele = <AvatarField
                {...props}
                errorMessage={errorMessages[props.name]}
            ></AvatarField>
            break;
        case "bookFiles":
            ele = <BookFileField
                {...props}
                value={renderValue()}
                errorMessage={errorMessages[props.name]}
            ></BookFileField>
            break;
        case "autocomplete":
            ele = <Autocomplete
                {...props}
                value={renderValue()}
                errorMessage={errorMessages[props.name]}
            ></Autocomplete>
            break;
        case "radioGroup":
            ele = <RadioGroup
                {...props}
                value={renderValue()}
                errorMessage={errorMessages[props.name]}
            ></RadioGroup>
            break;

        case "number":
            ele = <Input
                {...props}
                value={renderValue()}
                errorMessage={errorMessages[props.name]}
            />
            break;
        default:
            break;
    }


    return ele
}