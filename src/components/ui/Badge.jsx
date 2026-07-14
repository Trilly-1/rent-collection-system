import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers.js';

const toneStyles = {
  success: 'border-green-300 text-green-700 bg-green-50',
  warning: 'border-gold-300 text-gold-700 bg-gold-50',
  danger: 'border-clay-300 text-clay-700 bg-clay-50',
  neutral: 'border-line-300 text-ink-700 bg-paper-100',
  info: 'border-ink-300 text-ink-800 bg-paper-100',
};

const dotColors = {
  success: 'bg-green-500',
  warning: 'bg-gold-500',
  danger: 'bg-clay-500',
  neutral: 'bg-ink-700',
  info: 'bg-ink-700',
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
        'stamp inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-wide',
        toneStyles[resolvedTone],
        className
      )}
    >
      <span className={classNames('h-1.5 w-1.5 rounded-full', dotColors[resolvedTone])} />
      {children ?? status}
    </span>
  );
}
