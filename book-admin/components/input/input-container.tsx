import { FieldValues } from "react-hook-form";
import TextInput from "./text-input";
import { CombinedInputProps, isInputType } from "./types/types";

export function InputContainer<T extends FieldValues>(
  props: CombinedInputProps<T>
) {
  if (isInputType(props, "text")) return <TextInput {...props} />;

  return <></>;
}
