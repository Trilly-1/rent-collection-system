import { classNames } from '../../utils/helpers.js';

/*
 * UX Pro Max Badge Guidelines Applied:
 * - Color is not the only indicator (uses dot + text)
 * - Sufficient contrast for text
 * - Consistent sizing
 * - Accessible to screen readers
 */

const toneStyles = {
  success: 'border-success-200 text-success-700 bg-success-50',
  warning: 'border-gold-200 text-gold-700 bg-gold-50',
  danger: 'border-clay-200 text-clay-700 bg-clay-50',
  neutral: 'border-line-300 text-ink-700 bg-paper-100',
  info: 'border-primary-200 text-primary-700 bg-primary-50',
};

const dotColors = {
  success: 'bg-success-500',
  warning: 'bg-gold-500',
  danger: 'bg-clay-500',
  neutral: 'bg-ink-500',
  info: 'bg-primary-500',
};

const statusToneMap = {
  Active: 'success',
  Successful: 'success',
  Paid: 'success',
  Occupied: 'success',
  Overdue: 'danger',
  Failed: 'danger',
  Vacant: 'neutral',
  Pending: 'warning',
  'Notice Period': 'warning',
  Draft: 'neutral',
};

export default function Badge({ children, tone, status, className = '' }) {
  const resolvedTone = tone || statusToneMap[status] || 'neutral';

  return (
    <span
      className={classNames(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold',
        toneStyles[resolvedTone],
        className
      )}
      role="status"
    >
      <span 
        className={classNames('h-1.5 w-1.5 rounded-full', dotColors[resolvedTone])} 
        aria-hidden="true"
      />
      {children ?? status}
    </span>
  );
}
