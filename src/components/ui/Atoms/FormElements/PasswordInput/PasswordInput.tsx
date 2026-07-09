import { JSX, forwardRef, InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import { SvgIcon, IconTypes, SvgIconSize } from "@/components/ui/Atoms/SvgIcon";
import styles from "./PasswordInput.module.scss";

export interface PasswordInputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  className?: string;
  leftIcon?: IconTypes; // Simple optional icon, parent controls visibility
  leftIconValid?: boolean; // Indicates if left icon should be styled as valid (green) or invalid (red)
  showPasswordToggle?: boolean; // Default: true
  iconSize?: SvgIconSize;
  error?: boolean;
  onPasswordVisibilityChange?: (isVisible: boolean) => void;
  errorId?: string; // ID for aria-describedby
}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      className,
      leftIcon,
      leftIconValid,
      showPasswordToggle = true,
      iconSize = "sm",
      error,
      disabled,
      onPasswordVisibilityChange,
      errorId,
      ...rest
    }: PasswordInputProps,
    ref,
  ): JSX.Element => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      const newVisibility = !showPassword;
      setShowPassword(newVisibility);
      onPasswordVisibilityChange?.(newVisibility);
    };

    return (
      <div className={styles.passwordContainer}>
        {leftIcon && (
          <div
            className={clsx(styles.leftIcon, {
              [styles.leftIconValid]: leftIconValid === true,
              [styles.leftIconInvalid]: leftIconValid === false,
            })}
          >
            <SvgIcon
              size="s"
              viewBox="0 0 20 20"
              icon={leftIcon}
              fill="currentColor"
            />
          </div>
        )}
        <input
          {...rest}
          ref={ref}
          type={showPassword ? "text" : "password"}
          disabled={disabled}
          className={clsx(
            styles.inputField,
            {
              [styles.inputWithLeftIcon]: !!leftIcon,
              [styles.inputWithRightIcon]: showPasswordToggle,
            },
            className,
          )}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error && errorId ? errorId : undefined}
        />
        {showPasswordToggle && (
          <button
            type="button"
            className={styles.showHidePassword}
            onClick={handleTogglePassword}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <SvgIcon
              className={styles.showHideIconSvg}
              icon={showPassword ? "hide" : "show"}
              size={iconSize}
              fill="none"
            />
          </button>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
