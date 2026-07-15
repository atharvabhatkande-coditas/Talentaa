import { Controller } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import CustomInput from "../CustomInput/CustomInput";
import type { FormFieldProps } from "./FormField.types";
import styles from "./FormField.module.scss";

const FormField = <T extends FieldValues>(props: FormFieldProps<T>) => {
  const name = props.name;
  const control = props.control;
  const label = props.label;
  const error = props.error;
  const inputProps = props.inputProps;

  return (
    <div className={styles.fieldWrapper}>
      <div className={styles.labelInput}>

        <label htmlFor={name} className={styles.label}>
          {label}
        </label>

        <div className={styles.inputRow}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <CustomInput
                {...field}
                {...inputProps}
                id={name}
                value={field.value ?? ""}
              />
            )}
          />
        </div>

      </div>



      {error && (
        <p className={styles.errorText}>{error}</p>
      )}

    </div>
  );
};

export default FormField;
