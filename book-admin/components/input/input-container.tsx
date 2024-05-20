import { FieldValues } from "react-hook-form";
import NumberInput from "./number-input";
import RichText from "./rich-text";
import { SelectGroup } from "./select-group";
import { SingleImage } from "./single-image";
import TextInput from "./text-input";
import { CombinedInputProps, isInputType } from "./types/types";

export function InputContainer<T extends FieldValues>(
  props: CombinedInputProps<T>
) {
  if (isInputType(props, "text")) return <TextInput {...props} />;
  if (isInputType(props, "number")) return <NumberInput {...props} />;
  if (isInputType(props, "richText")) return <RichText {...props} />;
  if (isInputType(props, "singleImage")) return <SingleImage {...props} />;
  if (isInputType(props, "selectGroup")) return <SelectGroup {...props} />;

  return <></>;
}
