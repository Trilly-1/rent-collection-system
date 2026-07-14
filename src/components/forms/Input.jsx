import { forwardRef, useId } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers.js';

/*
 * UX Pro Max Input Guidelines Applied:
 * - Labels always associated with inputs (htmlFor)
 * - Placeholder text visible (not too light)
 * - Focus states clearly visible
 * - Error states accessible (not just color)
 * - Cursor: text for inputs
 * - Transitions: 150ms
 */

const Input = forwardRef(function Input(
  { label, type = 'text', icon: Icon, error, required = false, className = '', id, placeholder, ...props },
  ref
) {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={inputId} 
          className="mb-2 block text-sm font-semibold text-ink-900"
        >
          {label}
          {required && <span className="ml-1 text-clay-500" aria-hidden="true">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-500">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        )}

        <motion.input
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          placeholder={placeholder}
          className={classNames(
            'w-full rounded-xl border bg-white px-4 py-3 text-base text-ink-900',
            'placeholder:text-ink-500',
            'transition-all duration-150 ease-out',
            'cursor-text',
            Icon ? 'pl-12' : 'pl-4',
            error
              ? 'border-clay-400 focus:border-clay-500 focus:ring-2 focus:ring-clay-200'
              : 'border-line-300 hover:border-line-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-100',
            className
          )}
          initial={{ opacity: 0, y: 2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />
      </div>

      {error && (
        <motion.p
          id={`${inputId}-error`}
          className="mt-2 text-sm text-clay-600"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
          role="alert"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
