import type { InputHTMLAttributes } from "react";
import type { Control, FieldValues, Path} from "react-hook-form";

export interface FormFieldProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
}