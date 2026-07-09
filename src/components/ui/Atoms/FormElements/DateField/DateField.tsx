import React, { JSX, forwardRef, InputHTMLAttributes, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import styles from './DateField.module.scss';
import { SvgIcon } from '@/components/ui/Atoms/SvgIcon';

export type DateFormat = 'MM/YYYY' | 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';

export interface DateFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'value' | 'onChange'
> {
  className?: string;
  error?: boolean;
  errorMessage?: string;
  errorId?: string;
  format?: DateFormat;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

// Format date string (YYYY-MM-DD) to specified format
const formatDate = (dateString: string, format: DateFormat): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear());

  switch (format) {
    case 'MM/YYYY':
      return `${month}/${year}`;
    case 'DD/MM/YYYY':
      return `${day}/${month}/${year}`;
    case 'MM/DD/YYYY':
      return `${month}/${day}/${year}`;
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    default:
      return `${month}/${year}`;
  }
};

// Convert formatted date string to YYYY-MM-DD for date input
const parseFormattedDate = (formattedDate: string, format: DateFormat): string => {
  if (!formattedDate) return '';

  let day = '01';
  let month = '';
  let year = '';

  switch (format) {
    case 'MM/YYYY': {
      const parts = formattedDate.split('/');
      if (parts.length === 2) {
        month = parts[0].padStart(2, '0');
        year = parts[1];
      }
      break;
    }
    case 'DD/MM/YYYY': {
      const parts = formattedDate.split('/');
      if (parts.length === 3) {
        day = parts[0].padStart(2, '0');
        month = parts[1].padStart(2, '0');
        year = parts[2];
      }
      break;
    }
    case 'MM/DD/YYYY': {
      const parts = formattedDate.split('/');
      if (parts.length === 3) {
        month = parts[0].padStart(2, '0');
        day = parts[1].padStart(2, '0');
        year = parts[2];
      }
      break;
    }
    case 'YYYY-MM-DD': {
      const parts = formattedDate.split('-');
      if (parts.length === 3) {
        year = parts[0];
        month = parts[1].padStart(2, '0');
        day = parts[2].padStart(2, '0');
      }
      break;
    }
  }

  if (month && year) {
    return `${year}-${month}-${day}`;
  }
  return '';
};

// Format input value as user types based on format
const formatInputValue = (value: string, format: DateFormat): string => {
  // Remove all non-numeric characters
  const numbers = value.replace(/\D/g, '');

  switch (format) {
    case 'MM/YYYY': {
      const limited = numbers.slice(0, 6);
      if (limited.length <= 2) {
        return limited;
      } else {
        return `${limited.slice(0, 2)}/${limited.slice(2)}`;
      }
    }
    case 'DD/MM/YYYY': {
      const limited = numbers.slice(0, 8);
      if (limited.length <= 2) {
        return limited;
      } else if (limited.length <= 4) {
        return `${limited.slice(0, 2)}/${limited.slice(2)}`;
      } else {
        return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
      }
    }
    case 'MM/DD/YYYY': {
      const limited = numbers.slice(0, 8);
      if (limited.length <= 2) {
        return limited;
      } else if (limited.length <= 4) {
        return `${limited.slice(0, 2)}/${limited.slice(2)}`;
      } else {
        return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
      }
    }
    case 'YYYY-MM-DD': {
      const limited = numbers.slice(0, 8);
      if (limited.length <= 4) {
        return limited;
      } else if (limited.length <= 6) {
        return `${limited.slice(0, 4)}-${limited.slice(4)}`;
      } else {
        return `${limited.slice(0, 4)}-${limited.slice(4, 6)}-${limited.slice(6)}`;
      }
    }
    default:
      return numbers;
  }
};

// Get max length for format
const getMaxLength = (format: DateFormat): number => {
  switch (format) {
    case 'MM/YYYY':
      return 7;
    case 'DD/MM/YYYY':
    case 'MM/DD/YYYY':
      return 10;
    case 'YYYY-MM-DD':
      return 10;
    default:
      return 7;
  }
};

const DateField = forwardRef<HTMLInputElement, DateFieldProps>(
  (
    {
      className,
      error,
      errorMessage,
      errorId,
      format = 'MM/YYYY',
      value = '',
      onChange,
      disabled,
      placeholder,
      ...rest
    }: DateFieldProps,
    ref
  ): JSX.Element => {
    const dateInputRef = useRef<HTMLInputElement>(null);
    const [displayValue, setDisplayValue] = useState(value);
    const [internalValue, setInternalValue] = useState(parseFormattedDate(value, format));

    // Sync external value changes
    useEffect(() => {
      setDisplayValue(value);
      setInternalValue(parseFormattedDate(value, format));
    }, [value, format]);

    const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const formatted = formatInputValue(e.target.value, format);
      setDisplayValue(formatted);

      // Convert to date string and update internal value
      const dateString = parseFormattedDate(formatted, format);
      setInternalValue(dateString);

      // Create synthetic event for onChange
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: formatted,
          },
        } as React.ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent);
      }
    };

    const handleDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const dateValue = e.target.value;
      if (dateValue) {
        const formatted = formatDate(dateValue, format);
        setDisplayValue(formatted);
        setInternalValue(dateValue);

        // Create synthetic event for onChange
        if (onChange) {
          const syntheticEvent = {
            ...e,
            target: {
              ...e.target,
              value: formatted,
            },
          } as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      }
    };

    const handleCalendarIconClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (dateInputRef.current) {
        if ('showPicker' in dateInputRef.current) {
          (dateInputRef.current as HTMLInputElement & { showPicker: () => void }).showPicker();
        } else {
          (dateInputRef.current as HTMLInputElement).click();
        }
      }
    };

    const maxLength = getMaxLength(format);
    const defaultPlaceholder = placeholder || format;

    return (
      <div className={styles.dateFieldWrapper}>
        <div className={styles.dateFieldContainer}>
          <input
            ref={dateInputRef}
            type="date"
            onChange={handleDateInputChange}
            value={internalValue}
            className={styles.hiddenInputField}
            aria-hidden="true"
            tabIndex={-1}
          />
          <input
            {...rest}
            ref={ref}
            type="text"
            value={displayValue}
            onChange={handleTextInputChange}
            placeholder={defaultPlaceholder}
            maxLength={maxLength}
            disabled={disabled}
            className={clsx(styles.inputField, styles.inputWithCalendarIcon, className)}
            style={{ ...rest.style }}
            aria-invalid={error ? 'true' : undefined}
            aria-describedby={error && errorId ? errorId : undefined}
          />
          <div
            onClick={handleCalendarIconClick}
            className={styles.calendarIcon}
            aria-label="Open calendar"
            role="button"
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (dateInputRef.current) {
                  if ('showPicker' in dateInputRef.current) {
                    (
                      dateInputRef.current as HTMLInputElement & { showPicker: () => void }
                    ).showPicker();
                  } else {
                    (dateInputRef.current as HTMLInputElement).click();
                  }
                }
              }
            }}
          >
            <SvgIcon className={styles.calendarIconSvg} icon="calendar" size="sm" fill="none" />
          </div>
        </div>
        {error && (
          <p id={errorId} className={styles.errorMessage} aria-live="polite" aria-atomic="true">
            {errorMessage}
          </p>
        )}
      </div>
    );
  }
);

DateField.displayName = 'DateField';

export default DateField;
