import type { CustomInputProps } from "./CustomInput.types";
import styles from "./CustomInput.module.scss";

const CustomInput = ({ ...props }: CustomInputProps) => {
  return (
    <div className={styles.inputWrap}>
      <input {...props} />
    </div>
  );
};

export default CustomInput;