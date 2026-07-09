import { JSX, ChangeEvent, ReactNode, useMemo } from 'react';
import clsx from 'clsx';
import { FormField } from '@/components/ui/Atoms/FormElements/FormField';
import { PasswordInput } from '@/components/ui/Atoms/FormElements/PasswordInput';
import styles from './PasswordField.module.scss';

export interface PasswordFieldProps {
  // FormField props
  label?: ReactNode;
  labelFor?: string;
  error?: string | ReactNode;
  required?: boolean;
  className?: string;

  // PasswordInput props
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  showPasswordToggle?: boolean; // Default: true
  showLeftIcon?: boolean; // Show dynamic left icon (green checkmark/red X)
  isValid?: boolean; // Overall validation state (controls left icon)
}

export default function PasswordField({
  label,
  labelFor,
  error,
  required = false,
  className,
  id,
  value,
  onChange,
  placeholder,
  disabled,
  showPasswordToggle = true,
  showLeftIcon = false,
  isValid,
}: PasswordFieldProps): JSX.Element {
  // Determine which icon to show
  const leftIcon = useMemo(() => {
    if (!showLeftIcon) return undefined;
    if (value.length === 0) return undefined; // No icon when empty
    if (isValid === undefined) return undefined; // No icon if validity not provided
    return isValid ? 'checkmark' : 'close';
  }, [showLeftIcon, value.length, isValid]);

  return (
    <div className={clsx(styles.passwordField, className)}>
      <FormField
        label={label}
        labelFor={labelFor ?? id}
        required={required}
        error={error ?? undefined}
        showInlineError={!!error}
      >
        <PasswordInput
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          showPasswordToggle={showPasswordToggle}
          leftIcon={leftIcon}
          error={!!error}
        />
      </FormField>
    </div>
  );
}
