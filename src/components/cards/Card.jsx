import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers.js';

const accentStyles = {
  primary: 'bg-ink-50 text-ink-700 border-ink-200',
  gold: 'bg-gold-50 text-gold-700 border-gold-200',
  ink: 'bg-ink-100 text-ink-700 border-line-200',
  clay: 'bg-clay-50 text-clay-700 border-clay-200',
};

export function StatCard({ label, value, icon: Icon, trend, trendLabel, accent = 'primary', delay = 0 }) {
  const accentClass = accentStyles[accent] || accentStyles.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={classNames('rounded-2xl border bg-white p-6 shadow-sm hover:shadow-lg transition-shadow duration-300', accentClass)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-ink-700">{label}</p>
          <p className="mt-3 font-display text-3xl font-semibold text-ink-950 tracking-tight">{value}</p>
        </div>
        {Icon && (
          <div className="flex-shrink-0 rounded-xl border border-white/70 bg-white/70 p-3 shadow-sm">
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>
      {typeof trend === 'number' && (
        <p className="mt-4 flex items-center gap-2 text-sm font-medium text-ink-700">
          <span className={classNames(
            'inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold',
            trend >= 0 ? 'bg-green-100 text-green-700' : 'bg-clay-100 text-clay-700'
          )}>
            {trend >= 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </span>
          <span className="text-ink-500">{trendLabel}</span>
        </p>
      )}
    </motion.div>
  );
}

export default function Card({ title, eyebrow, action, children, className = '', noPadding = false, delay = 0 }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={classNames('rounded-2xl border border-line-200 bg-white shadow-sm', className)}
    >
      {(title || eyebrow || action) && (
        <div className="flex items-start justify-between gap-4 border-b border-line-200 px-6 py-5">
          <div>
            {eyebrow && (
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-600">{eyebrow}</p>
            )}
            {title && (
              <h2 className="mt-1.5 font-display text-xl font-semibold text-ink-950">{title}</h2>
            )}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>{children}</div>
    </motion.section>
  );
}
