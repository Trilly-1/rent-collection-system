import { motion } from 'framer-motion';
import { ChevronDown, Loader2 } from 'lucide-react';
import { forwardRef, useId } from 'react';
import { classNames } from '../../utils/helpers.js';

const Select = forwardRef(function Select(
  { label, options = [], placeholder = 'Select an option', error, required = false, className = '', id, disabled = false, ...props },
  ref
) {
  const selectId = useId();
  const inputId = id || selectId;

  return (
    <div className={classNames('w-full', className)}>
      {label ? (
        <label htmlFor={inputId} className="mb-2 block text-sm font-semibold text-ink-900">
          {label}
          {required && <span className="ml-1 text-clay-500" aria-hidden="true">*</span>}
        </label>
      ) : null}

      <div className="relative">
        <motion.select
          ref={ref}
          id={inputId}
          required={required}
          disabled={disabled}
          className={classNames(
            'w-full appearance-none rounded-xl border bg-paper-50 px-4 py-3.5 pr-12 text-base text-ink-950 outline-none transition-all duration-200',
            'placeholder:text-ink-500',
            error
              ? 'border-clay-400 focus:border-clay-500 focus:ring-2 focus:ring-clay-200'
              : 'border-line-300 focus:border-ink-500 focus:ring-2 focus:ring-ink-100',
            disabled && 'opacity-50 cursor-not-allowed',
            className
          )}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt.value || opt} value={opt.value || opt}>
              {opt.label || opt}
            </option>
          ))}
        </motion.select>

        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-700/60">
          {props.loading ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <ChevronDown className="h-5 w-5" aria-hidden="true" />
          )}
        </div>
      </div>

      {error && (
        <motion.p
          className="mt-2 text-sm text-clay-600"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {error}
        </motion.p>
      )}
    </div>
  );
});

Select.displayName = 'Select';

export default Select;