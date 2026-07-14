import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers.js';

const variants = {
  primary: 'bg-ink-600 text-white hover:bg-ink-700 focus-visible:outline-ink-700 shadow-sm shadow-ink-700/20',
  secondary: 'bg-white text-ink-900 border border-line-300 hover:bg-paper-100 focus-visible:outline-ink-700',
  gold: 'bg-gold-400 text-ink-950 hover:bg-gold-500 focus-visible:outline-gold-600 shadow-sm shadow-gold-600/30',
  danger: 'bg-clay-500 text-white hover:bg-clay-600 focus-visible:outline-clay-600',
  ghost: 'bg-transparent text-ink-800 hover:bg-paper-100 focus-visible:outline-ink-700',
  outline: 'bg-transparent border border-ink-500 text-ink-600 hover:bg-ink-50 focus-visible:outline-ink-600',
};

const sizes = {
  sm: 'text-sm px-4 py-2 gap-2',
  md: 'text-base px-6 py-3 gap-2.5',
  lg: 'text-lg px-8 py-4 gap-3',
  xl: 'text-xl px-10 py-5 gap-3',
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
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={classNames(
        'inline-flex items-center justify-center rounded-xl font-semibold transition-colors duration-150',
        'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
      ) : (
        Icon && iconPosition === 'left' && <Icon className="h-5 w-5" aria-hidden="true" />
      )}
      {children}
      {!loading && Icon && iconPosition === 'right' && <Icon className="h-5 w-5" aria-hidden="true" />}
    </motion.button>
  );
}