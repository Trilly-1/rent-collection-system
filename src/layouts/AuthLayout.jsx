import { Outlet } from 'react-router-dom';
import { Receipt, ShieldCheck, TrendingUp, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_rgba(230,173,46,0.1),_transparent_50%),linear-gradient(180deg,_#fdfcf8_0%,_#f7f5ef_100%)]">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col overflow-hidden rounded-3xl border border-line-200 bg-white/90 shadow-2xl lg:flex-row">
          {/* Left Panel */}
          <div className="flex flex-col justify-between bg-gradient-to-br from-ink-900 to-ink-800 p-8 sm:p-10 lg:w-[44%] lg:p-12">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400 shadow-lg">
                  <Receipt className="h-6 w-6 text-ink-900" />
                </div>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.3em] text-gold-400">RentFlow</p>
                  <p className="text-xs text-ink-300">Professional property management</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mt-12 max-w-md"
              >
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400">Welcome</p>
                <h1 className="mt-3 font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                  Manage your rental workspace.
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-ink-300">
                  Access properties, payments, and tenant records in a calm, professional environment.
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p className="font-semibold text-white">What you can manage</p>
              <ul className="mt-4 space-y-3">
                <li className="flex items-center gap-3 text-ink-200">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-400/20">
                    <Building2 className="h-3.5 w-3.5 text-gold-400" />
                  </div>
                  Houses, rooms, and unit records
                </li>
                <li className="flex items-center gap-3 text-ink-200">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-400/20">
                    <TrendingUp className="h-3.5 w-3.5 text-gold-400" />
                  </div>
                  Tenant activity and rent payments
                </li>
                <li className="flex items-center gap-3 text-ink-200">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-400/20">
                    <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
                  </div>
                  Clear reporting and portfolio visibility
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Right Panel - Form */}
          <div className="flex flex-1 items-center justify-center p-6 sm:p-8 lg:p-10">
            <div className="w-full max-w-sm">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
