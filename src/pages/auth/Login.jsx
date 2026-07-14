import { motion } from 'framer-motion';
import { ArrowRight, Building2, Users, Receipt, ShieldCheck, Lock, Zap, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const portals = [
  {
    title: 'Landlord Portal',
    description: 'Manage properties, units, tenants, and rent collection in one premium workspace.',
    loginTo: '/landlord-login',
    registerTo: '/landlord-register',
    icon: Building2,
    gradient: 'from-ink-700 to-ink-900',
    bgGradient: 'from-ink-50 to-white',
    features: ['Property management', 'Tenant tracking', 'Payment collection', 'Photo listings'],
  },
  {
    title: 'Tenant Portal',
    description: 'View rent status, payments, and lease details in a simple private dashboard.',
    loginTo: '/tenant-login',
    registerTo: '/tenant-register',
    icon: Users,
    gradient: 'from-primary-600 to-primary-700',
    bgGradient: 'from-primary-50 to-white',
    features: ['Payment history', 'Lease documents', 'Balance tracking', 'Secure access'],
  },
];

export default function Login() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        
        <h1 className="font-display text-4xl font-bold text-ink-950 sm:text-5xl">
          Choose Your Portal
        </h1>
        <p className="mt-4 text-lg text-ink-700 max-w-2xl mx-auto">
          Select your role to access the appropriate dashboard
        </p>
      </motion.div>

      {/* Portal Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {portals.map(({ title, description, loginTo, registerTo, icon: Icon, gradient, bgGradient, features }, idx) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + idx * 0.1 }}
            className={`relative overflow-hidden rounded-3xl border-2 border-line-200 bg-gradient-to-br ${bgGradient} p-8 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:border-gold-400 hover:shadow-2xl cursor-pointer`}
          >
            {/* Top accent */}
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${gradient}`} />

            {/* Icon */}
            <div className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-white shadow-xl mb-6`}>
              <Icon className="h-8 w-8" />
            </div>

            {/* Content */}
            <h2 className="font-display text-2xl font-bold text-ink-950">{title}</h2>
            <p className="mt-2 text-ink-700 leading-relaxed">{description}</p>

            {/* Features */}
            <div className="mt-6 grid grid-cols-2 gap-2">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2 text-sm text-ink-600">
                  <CheckCircle className="h-4 w-4 text-primary-500 shrink-0" />
                  {feature}
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <Link to={loginTo} className="block">
                <div className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r ${gradient} px-6 py-3.5 text-white font-semibold shadow-lg transition-all duration-200 hover:shadow-xl`}>
                  Sign In
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
              <Link to={registerTo} className="block">
                <div className="flex items-center justify-center gap-2 rounded-xl border-2 border-line-300 bg-white px-6 py-3.5 text-ink-700 font-semibold transition-all duration-200 hover:border-gold-400 hover:text-ink-950">
                  Create Account
                </div>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-10 flex items-center justify-center gap-8 text-sm text-ink-500"
      >
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4" />
          <span>256-bit Encryption</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" />
          <span>Bank-Level Security</span>
        </div>
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          <span>Instant Access</span>
        </div>
      </motion.div>
    </div>
  );
}
