import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers.js';

const Input = forwardRef(function Input(
  { label, type = 'text', icon: Icon, error, required = false, className = '', id, ...props },
  ref
) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  return (
    <div className="w-full">
      {label ? (
        <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-ink-900">
          {label}
          {required ? <span className="ml-1 text-clay-500" aria-hidden="true">*</span> : null}
        </label>
      ) : null}

      <div className="relative">
        {Icon ? (
          <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-700/60">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        ) : null}

        <motion.input
          ref={ref}
          id={inputId}
          type={type}
          required={required}
          className={classNames(
            'w-full rounded-xl border bg-paper-50 px-4 py-3.5 text-base text-ink-950 outline-none transition-all duration-200',
            'placeholder:text-ink-500',
            Icon ? 'pl-12' : 'pl-4',
            error
              ? 'border-clay-400 focus:border-clay-500 focus:ring-2 focus:ring-clay-200'
              : 'border-line-300 focus:border-ink-500 focus:ring-2 focus:ring-ink-100',
            className
          )}
          {...props}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {error ? (
        <motion.p
          className="mt-2 text-sm text-clay-600"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      ) : null}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;