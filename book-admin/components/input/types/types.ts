import { InputHTMLAttributes } from 'react'
import { FieldValues, UseControllerProps } from 'react-hook-form'

export type InputType = 'text' | 'radioGroup' | 'checkboxGroup' | 'datetime' | 'files' | 'richText'

// container
type IgnoreFields = 'name' | 'defaultValue'

export interface InputContainerProps<T extends FieldValues>
  extends UseControllerProps<T>,
    Omit<InputHTMLAttributes<HTMLInputElement>, IgnoreFields>,
    Partial<{
      label: string
    }> {
  inputType: InputType
}

// text
export interface TextInputProps<T extends FieldValues> extends InputContainerProps<T> {
  inputType: 'text'
}

// radioGroup
export interface RadioOption {
  value: number
  label: string
}
export interface RadioGroupProps<T extends FieldValues> extends InputContainerProps<T> {
  options: RadioOption[]
  inputType: 'radioGroup'
}

// checkboxGroup
export interface CheckboxOption {
  value: number
  label: string
}
export interface CheckboxGroupProps<T extends FieldValues> extends InputContainerProps<T> {
  options: CheckboxOption[]
  inputType: 'checkboxGroup'
}

// datetime
export interface DatetimeProps<T extends FieldValues> extends InputContainerProps<T> {
  inputType: 'datetime'
}

// files
export interface FilesProps<T extends FieldValues> extends InputContainerProps<T> {
  inputType: 'files'
  fileTypes?: string[]
}

// richText
export interface RichTextProps<T extends FieldValues> extends InputContainerProps<T> {
  inputType: 'richText'
}

// utils
export type CombinedInputProps<T extends FieldValues> =
  | TextInputProps<T>
  | RadioGroupProps<T>
  | CheckboxGroupProps<T>
  | DatetimeProps<T>
  | FilesProps<T>
  | RichTextProps<T>

export function isInputType<T extends FieldValues, K extends InputType>(
  props: CombinedInputProps<T>,
  type: K
): props is CombinedInputProps<T> & { inputType: K } {
  return props.inputType === type
}
