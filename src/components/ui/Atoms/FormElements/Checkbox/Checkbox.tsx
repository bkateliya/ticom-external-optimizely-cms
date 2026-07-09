import React, { forwardRef, InputHTMLAttributes, JSX, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Checkbox.module.scss';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: ReactNode;
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    { label, className, containerClassName, labelClassName, id, disabled, ...rest }: CheckboxProps,
    ref
  ): JSX.Element => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2, 11)}`;

    return (
      <label htmlFor={checkboxId} className={clsx(styles.checkboxContainer, containerClassName)}>
        <input
          {...rest}
          ref={ref}
          type="checkbox"
          id={checkboxId}
          disabled={disabled}
          className={clsx(styles.checkbox, className)}
        />
        {label && <span className={clsx(styles.checkboxLabel, labelClassName)}>{label}</span>}
      </label>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;
