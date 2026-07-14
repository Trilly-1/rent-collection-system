import { motion } from 'framer-motion';
import { ArrowRight, Building2, Users, Receipt } from 'lucide-react';
import { Link } from 'react-router-dom';

const options = [
  {
    title: 'Landlord Portal',
    description: 'Manage properties, units, tenants, and rent collection in one premium workspace.',
    to: '/landlord-login',
    icon: Building2,
    gradient: 'from-ink-600 to-ink-800',
  },
  {
    title: 'Tenant Portal',
    description: 'View rent status, payments, and lease details in a simple private dashboard.',
    to: '/tenant-login',
    icon: Users,
    gradient: 'from-gold-500 to-gold-700',
  },
];

export default function Login() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl"
    >
      <div className="rounded-3xl border border-line-200 bg-white p-8 shadow-2xl sm:p-10 lg:p-12">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-900 text-gold-400 shadow-lg">
            <Receipt className="h-7 w-7" />
          </div>
          <h1 className="font-display text-4xl font-bold text-ink-950">Choose Your Access</h1>
          <p className="mt-3 text-lg text-ink-700">
            Select your role to access the appropriate dashboard.
          </p>
        </div>

        <div className="space-y-4">
          {options.map(({ title, description, to, icon: Icon, gradient }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
            >
              <Link to={to} className="block group">
                <div className="flex items-center justify-between rounded-2xl border border-line-200 bg-paper-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold-300 hover:bg-white hover:shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="font-display text-xl font-semibold text-ink-950">{title}</p>
                      <p className="mt-1 text-base text-ink-700">{description}</p>
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-paper-100 text-ink-700 group-hover:bg-gold-100 group-hover:text-gold-700 transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
