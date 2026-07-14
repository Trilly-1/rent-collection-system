import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers.js';

/*
 * UX Pro Max Button Guidelines Applied:
 * - cursor-pointer on all clickable elements
 * - Hover states: color/opacity changes (no layout shift)
 * - Transitions: 150-200ms
 * - Focus visible for keyboard navigation
 * - Disabled state: opacity + cursor-not-allowed
 */

const variants = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:outline-primary-600 shadow-sm shadow-primary-700/20',
  secondary: 'bg-white text-ink-900 border border-line-300 hover:bg-paper-50 hover:border-line-400 focus-visible:outline-ink-700',
  gold: 'bg-gold-500 text-ink-950 hover:bg-gold-600 focus-visible:outline-gold-500 shadow-sm shadow-gold-600/20',
  danger: 'bg-clay-500 text-white hover:bg-clay-600 focus-visible:outline-clay-500',
  ghost: 'bg-transparent text-ink-700 hover:bg-paper-100 hover:text-ink-900 focus-visible:outline-ink-700',
  outline: 'bg-transparent border-2 border-primary-600 text-primary-700 hover:bg-primary-50 focus-visible:outline-primary-600',
};

const sizes = {
  sm: 'text-sm px-4 py-2 gap-2 rounded-lg',
  md: 'text-base px-5 py-2.5 gap-2 rounded-xl',
  lg: 'text-base px-6 py-3 gap-2.5 rounded-xl',
  xl: 'text-lg px-8 py-4 gap-3 rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  type = 'button',
  ...rest
}) {
  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      whileHover={{ scale: disabled || loading ? 1 : 1.01 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={classNames(
        'inline-flex items-center justify-center font-semibold',
        'transition-all duration-150 ease-out',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'cursor-pointer',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="h-4 w-4" aria-hidden="true" />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="h-4 w-4" aria-hidden="true" />}
    </motion.button>
  );
}
