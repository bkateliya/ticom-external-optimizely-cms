import { JSX, forwardRef, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { SvgIcon, IconTypes, SvgIconSize } from "@/components/ui/Atoms/SvgIcon";
import styles from "./TextInput.module.scss";

export interface TextInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  className?: string;
  leftIcon?: IconTypes;
  rightIcon?: IconTypes;
  iconSize?: SvgIconSize;
  error?: boolean;
  errorMessage?: string;
  type?: "text" | "email" | "tel" | "url" | "search" | "date";
  errorId?: string; // ID for aria-describedby
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      leftIcon,
      rightIcon,
      iconSize = "sm",
      error,
      errorMessage,
      disabled,
      type = "text",
      errorId,
      ...rest
    }: TextInputProps,
    ref,
  ): JSX.Element => {
    return (
      <div style={{ position: "relative", width: "100%" }}>
        {leftIcon && (
          <div className={styles.leftIcon}>
            <SvgIcon icon={leftIcon} size={iconSize} fill="none" />
          </div>
        )}
        <input
          {...rest}
          ref={ref}
          type={type}
          disabled={disabled}
          className={clsx(
            styles.inputField,
            {
              [styles.inputWithLeftIcon]: !!leftIcon,
              [styles.inputWithRightIcon]: !!rightIcon,
            },
            className,
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error && errorId ? errorId : undefined}
        />
        {rightIcon && (
          <div className={styles.rightIcon}>
            <SvgIcon icon={rightIcon} size={iconSize} fill="none" />
          </div>
        )}
        {error && !!errorMessage && (
          <p
            id={errorId}
            className={styles.errorMessage}
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
