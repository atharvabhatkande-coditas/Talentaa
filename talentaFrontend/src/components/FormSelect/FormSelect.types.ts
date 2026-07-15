import type { Control, FieldValues, Path } from "react-hook-form";

export interface SelectOption {
  label: string;
  value: string;
}

export interface FormSelectProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}