import styles from "./Form.module.scss";
import type {FormProps} from "./Form.types"

const Form = ({ children, ...props }: FormProps) => {
  return (
    <form className={styles.form} {...props}>
      {children}
    </form>
  );
};

export default Form;