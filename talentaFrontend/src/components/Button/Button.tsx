import clsx from "clsx";
import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.scss";

const Button = ({ children, variant, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(
        styles.button,
        styles[variant as keyof typeof styles],
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button
