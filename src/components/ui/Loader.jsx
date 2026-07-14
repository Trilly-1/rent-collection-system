import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { classNames } from '../../utils/helpers.js';

export default function Loader({ label = 'Loading...', size = 'md', fullscreen = false, className = '' }) {
  const sizes = {
    sm: 'h-5 w-5',
    md: 'h-7 w-7',
    lg: 'h-10 w-10',
  };

  const content = (
    <div className={classNames('flex flex-col items-center justify-center gap-4 text-ink-700', className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Loader2 className={classNames('animate-spin text-ink-500', sizes[size])} />
      </motion.div>
      {label && (
        <motion.p
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="text-base font-medium"
        >
          {label}
        </motion.p>
      )}
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-paper-0/90 backdrop-blur-sm">
        {content}
      </div>
    );
  }
  return <div className="py-12">{content}</div>;
}

export function TableSkeleton({ rows = 6, cols = 5 }) {
  return (
    <div className="animate-pulse space-y-0">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4 px-6 py-4 border-b border-line-200 last:border-none">
          {Array.from({ length: cols }).map((_, c) => (
            <div
              key={c}
              className={classNames(
                'h-4 rounded-lg bg-paper-200',
                c === 0 ? 'flex-[2]' : 'flex-1'
              )}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
