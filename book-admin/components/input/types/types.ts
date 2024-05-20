import { InputHTMLAttributes } from "react";
import { FieldValues, UseControllerProps } from "react-hook-form";

export type InputType =
  | "text"
  | "radioGroup"
  | "checkboxGroup"
  | "datetime"
  | "files"
  | "richText"
  | "number"
  | "singleImage"
  | "selectGroup";

// container
type IgnoreFields = "name" | "defaultValue";

export interface InputContainerProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<InputHTMLAttributes<HTMLInputElement>, IgnoreFields>,
    Partial<{
      label: string;
    }> {
  inputType: InputType;
}

// text
export interface TextInputProps<T extends FieldValues>
  extends InputContainerProps<T> {
  inputType: "text";
}

// number
export interface NumberInputProps<T extends FieldValues>
  extends InputContainerProps<T> {
  inputType: "number";
}

// radioGroup
export interface RadioOption {
  value: number;
  label: string;
}
export interface RadioGroupProps<T extends FieldValues>
  extends InputContainerProps<T> {
  options: RadioOption[];
  inputType: "radioGroup";
}

// checkboxGroup
export interface CheckboxOption {
  value: number;
  label: string;
}
export interface CheckboxGroupProps<T extends FieldValues>
  extends InputContainerProps<T> {
  options: CheckboxOption[];
  inputType: "checkboxGroup";
}

// select
export interface SelectOption {
  value: number;
  label: string;
}
export interface SelectGroupProps<T extends FieldValues>
  extends InputContainerProps<T> {
  options: SelectOption[];
  inputType: "selectGroup";
}

// datetime
export interface DatetimeProps<T extends FieldValues>
  extends InputContainerProps<T> {
  inputType: "datetime";
}

// files
export interface FilesProps<T extends FieldValues>
  extends InputContainerProps<T> {
  inputType: "files";
  fileTypes?: string[];
}

// richText
export interface RichTextProps<T extends FieldValues>
  extends InputContainerProps<T> {
  inputType: "richText";
}

// single image
export interface SingleImageProps<T extends FieldValues>
  extends InputContainerProps<T> {
  inputType: "singleImage";
}

// utils
export type CombinedInputProps<T extends FieldValues> =
  | TextInputProps<T>
  | RadioGroupProps<T>
  | CheckboxGroupProps<T>
  | DatetimeProps<T>
  | FilesProps<T>
  | RichTextProps<T>
  | NumberInputProps<T>
  | SingleImageProps<T>
  | SelectGroupProps<T>;

export function isInputType<T extends FieldValues, K extends InputType>(
  props: CombinedInputProps<T>,
  type: K
): props is CombinedInputProps<T> & { inputType: K } {
  return props.inputType === type;
}
