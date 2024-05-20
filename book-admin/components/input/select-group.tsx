import { ReactNode } from "react";
import { FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { SelectGroupProps } from "./types/types";

export function SelectGroup<T extends FieldValues>({
  control,
  name,
  label,
  options,
}: SelectGroupProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select>
              <SelectingOption />
              <CreatingOption />
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

const Select = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

const SelectingOption = () => {
  return <div>Selecting option</div>;
};

const CreatingOption = () => {
  return <div>Creating option</div>;
};
