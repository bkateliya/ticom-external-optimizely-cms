import { JSX, ChangeEvent, ReactNode, useMemo, useState, forwardRef } from 'react';
import clsx from 'clsx';
import { FormField } from '@/components/ui/Atoms/FormElements/FormField';
import { PasswordInput } from '@/components/ui/Atoms/FormElements/PasswordInput';
import styles from './PasswordInputField.module.scss';

export interface PasswordInputFieldProps {
  // FormField props
  label?: ReactNode;
  labelFor?: string;
  required?: boolean;
  className?: string;

  // PasswordInput props
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  showPasswordToggle?: boolean; // Default: true

  // Error handling
  error?: string | ReactNode; // Error message (shows error outline)
  showInlineError?: boolean; // Show inline error message (default: true for confirm mode, false for normal)

  // Confirm password mode
  valueToMatch?: string; // The value to match against (enables confirm mode)
  mismatchErrorMessage?: string; // Custom error message for mismatch (default: 'Passwords do not match')

  // Validation timing
  validateOnBlur?: boolean; // Validate when field loses focus (default: false)
  validateOnChange?: boolean; // Validate as user types (default: true)
}

const PasswordInputField = forwardRef<HTMLInputElement, PasswordInputFieldProps>(
  (
    {
      label,
      labelFor,
      required = false,
      className,
      id,
      value,
      onChange,
      placeholder,
      disabled,
      showPasswordToggle = true,
      error: externalError,
      showInlineError,
      valueToMatch,
      mismatchErrorMessage = 'Passwords do not match',
      validateOnBlur = false,
      validateOnChange = true,
    },
    ref
  ) => {
    const [hasBlurred, setHasBlurred] = useState(false);

    // Calculate mismatch error for confirm mode
    const calculatedMismatchError = useMemo(() => {
      if (!valueToMatch) return null;
      if (value.length === 0 || valueToMatch.length === 0) {
        return null; // Don't show error if either field is empty
      }
      if (value !== valueToMatch) {
        return mismatchErrorMessage;
      }
      return null;
    }, [value, valueToMatch, mismatchErrorMessage]);

    // Determine if we should show the mismatch error based on validation timing
    const shouldShowMismatchError = useMemo(() => {
      if (!calculatedMismatchError) return false;
      // Show error if:
      // 1. validateOnChange is true (validate as user types), OR
      // 2. validateOnBlur is true and field has been blurred
      return validateOnChange || (validateOnBlur && hasBlurred);
    }, [calculatedMismatchError, validateOnChange, validateOnBlur, hasBlurred]);

    // Determine which error to show
    const mismatchError = shouldShowMismatchError ? calculatedMismatchError : null;
    const error = externalError ?? mismatchError ?? undefined;
    const hasError = !!error;

    // Handle blur event
    const handleBlur = () => {
      setHasBlurred(true);
    };

    // Handle change event - need to wrap onChange to track blur state
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e);
    };

    // Determine if inline error should be shown
    const shouldShowInlineError = useMemo(() => {
      if (showInlineError !== undefined) return showInlineError;
      // Default: show inline error for confirm mode, hide for normal mode
      return !!valueToMatch && hasError;
    }, [showInlineError, valueToMatch, hasError]);

    // Get default label
    const defaultLabel = valueToMatch ? 'Confirm password' : 'Password';
    const displayLabel = label ?? defaultLabel;

    // Generate unique error ID for aria-describedby
    const errorId = `${id}-error`;
    const describedBy = shouldShowInlineError && hasError ? errorId : undefined;

    return (
      <div className={clsx(styles.passwordInputField, className)}>
        <FormField
          label={displayLabel}
          labelFor={labelFor ?? id}
          required={required}
          error={error}
          showInlineError={shouldShowInlineError}
          errorId={errorId}
        >
          <PasswordInput
            ref={ref}
            id={id}
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            disabled={disabled}
            showPasswordToggle={showPasswordToggle}
            error={hasError}
            errorId={errorId}
            aria-invalid={hasError || undefined}
            aria-describedby={describedBy}
            aria-required={required || undefined}
          />
        </FormField>
      </div>
    );
  }
);

PasswordInputField.displayName = 'PasswordInputField';

export default PasswordInputField;
