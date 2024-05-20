import { FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { TextInputProps } from "./types/types";

export default function TextInput<T extends FieldValues>({
  name,
  type = "text",
  inputType,
  control,
  label,
  rules,
  ...remain
}: TextInputProps<T>) {
  return (
    <FormField
      rules={rules}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input {...field} type={type} {...remain} />
          </FormControl>
          <FormMessage />
          <div className="hidden">{inputType}</div>
        </FormItem>
      )}
    />
  );
}
