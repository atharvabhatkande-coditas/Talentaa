import { Controller } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import type { FormSelectProps } from "./FormSelect.types";
import styles from "./FormSelect.module.scss";


const FormSelect = <T extends FieldValues>(props: FormSelectProps<T>) => {
  const { name, control, label, error, options, placeholder = "Select an option" } = props;

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
              <select {...field} id={name} value={field.value ?? ""}>
                <option value="" disabled>
                  {placeholder}
                </option>
                {options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
          />
        </div>
      </div>

      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default FormSelect;