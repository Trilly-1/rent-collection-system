import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers.js';

/*
 * UX Pro Max Card Guidelines Applied:
 * - Hover states: color/shadow changes (no layout shift)
 * - Cursor pointer on clickable cards
 * - Transitions: 200ms
 * - Focus visible for keyboard navigation
 * - Consistent padding and spacing
 */

const accentStyles = {
  primary: 'bg-primary-50 text-primary-700 border-primary-200',
  gold: 'bg-gold-50 text-gold-700 border-gold-200',
  ink: 'bg-ink-100 text-ink-700 border-line-200',
  clay: 'bg-clay-50 text-clay-700 border-clay-200',
};

export function StatCard({ label, value, icon: Icon, trend, trendLabel, accent = 'primary', delay = 0 }) {
  const accentClass = accentStyles[accent] || accentStyles.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay, ease: [0.16, 1, 0.3, 1] }}
      className={classNames(
        'rounded-2xl border bg-white p-6',
        'transition-all duration-200 ease-out',
        'hover:shadow-lg hover:-translate-y-0.5',
        accentClass
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink-600">{label}</p>
          <p className="mt-2 text-3xl font-bold text-ink-900 tracking-tight">{value}</p>
        </div>
        {Icon && (
          <div className="flex-shrink-0 rounded-xl bg-white/80 p-3 shadow-sm">
            <Icon className="h-6 w-6 text-ink-600" aria-hidden="true" />
          </div>
        )}
      </div>
      {typeof trend === 'number' && (
        <p className="mt-4 flex items-center gap-2 text-sm text-ink-600">
          <span className={classNames(
            'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
            trend >= 0 ? 'bg-success-100 text-success-700' : 'bg-clay-100 text-clay-700'
          )}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span>{trendLabel}</span>
        </p>
      )}
    </motion.div>
  );
}

export default function Card({ title, eyebrow, action, children, className = '', noPadding = false, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay, ease: [0.16, 1, 0.3, 1] }}
      className={classNames(
        'rounded-2xl border border-line-200 bg-white',
        className
      )}
    >
      {(title || eyebrow || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-line-200 px-6 py-5">
          <div>
            {eyebrow && (
              <p className="text-xs font-semibold uppercase tracking-wider text-primary-600">{eyebrow}</p>
            )}
            {title && (
              <h2 className="mt-1 text-xl font-bold text-ink-900">{title}</h2>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>{children}</div>
    </motion.section>
  );
}
