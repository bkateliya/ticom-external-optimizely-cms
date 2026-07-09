import React, { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './FormField.module.scss';

export interface FormFieldProps {
  id?: string;
  label?: ReactNode;
  labelFor?: string;
  children: ReactNode;
  error?: string | ReactNode;
  className?: string;
  showInlineError?: boolean;
  required?: boolean;
  errorId?: string; // ID for the error message element (for aria-describedby)
}

export default function FormField({
  id,
  label,
  labelFor,
  children,
  error,
  className,
  showInlineError = false,
  required = false,
  errorId,
}: FormFieldProps) {
  return (
    <div className={clsx(styles.formField, className)}>
      {label && (
        <label id={id} htmlFor={labelFor} className={styles.fieldLabel}>
          {label}
          {required && <span> *</span>}
        </label>
      )}
      <div className={clsx(styles.fieldWrapper, { [styles.error]: !!error })}>{children}</div>
      {showInlineError && error && (
        <span id={errorId} className={styles.inlineError}>
          {error}
        </span>
      )}
    </div>
  );
}
