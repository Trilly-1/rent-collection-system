import { motion } from 'framer-motion';
import { classNames } from '../../utils/helpers.js';

export default function GlassCard({ children, className = '', hover = false, delay = 0, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={classNames(
        'rounded-2xl border border-white/80 bg-white/80 shadow-xl backdrop-blur-xl',
        hover && 'transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-gold-200',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
