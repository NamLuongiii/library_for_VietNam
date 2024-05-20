import { useRef } from "react";
import { FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { NumberInputProps } from "./types/types";

export default function NumberInput<T extends FieldValues>({
  name,
  type = "number",
  inputType,
  control,
  label,
  rules,
  ...remain
}: NumberInputProps<T>) {
  const input = useRef<HTMLInputElement>(null);

  return (
    <FormField
      rules={rules}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              {...field}
              type={type}
              {...remain}
              onChange={(e) => field.onChange(Number(e.target.value))}
              ref={input}
              onFocus={() => {
                if (input && input.current) {
                  input.current.select();
                }
              }}
            />
          </FormControl>
          <FormMessage />
          <div className="hidden">{inputType}</div>
        </FormItem>
      )}
    />
  );
}
