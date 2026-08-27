import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  error?: string;
  hint?: string;
  required?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
  labelClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      hint,
      required,
      leftIcon,
      rightIcon,
      className,
      containerClassName,
      labelClassName,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    return (
      <div
        data-slot="input-container"
        className={cn('flex flex-col gap-1.5', containerClassName)}
      >
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-sm font-normal text-foreground',
              labelClassName,
            )}
          >
            {label}
            {required && <span className="ml-0.5 text-red">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-subtext [&_svg]:size-4">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            aria-invalid={!!error}
            className={cn(
              'h-11 w-full rounded-lg border border-transparent bg-text-field px-4 text-sm text-subtext outline-none transition-colors placeholder:text-subtext focus-visible:border-green-primary disabled:cursor-not-allowed disabled:bg-disable-text-field disabled:text-disable aria-invalid:border-red',
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className,
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute top-1/2 right-3 -translate-y-1/2 text-subtext [&_svg]:size-4">
              {rightIcon}
            </span>
          )}
        </div>

        {error ? (
          <p className="text-xs text-red">{error}</p>
        ) : (
          hint && <p className="text-xs text-subtext">{hint}</p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export { Input };