import { motion } from 'framer-motion';
import { ArrowRight, BarChart3, Building2, Camera, MessageCircleMore, Receipt, ShieldCheck, Sparkles, Wallet, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/buttons/Button.jsx';
import GlassCard from '../../components/ui/GlassCard.jsx';

const features = [
  { title: 'Easy Rent Collection', description: 'Collect payments with a calm, secure experience that feels premium from day one.', icon: Wallet },
  { title: 'Tenant Management', description: 'Track residents, balances, and move-ins with elegant visibility for every unit.', icon: Building2 },
  { title: 'Payment Tracking', description: 'See every payment flow, outstanding balance, and recurring trend at a glance.', icon: BarChart3 },
  { title: 'Photo Listings', description: 'Upload property and room photos to create compelling listings.', icon: Camera },
];

const steps = ['Register your portfolio', 'Add properties and units', 'Invite tenants and collect rent'];

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Hero Section with Background Image */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/images/img1.jpg)',
            backgroundColor: '#0f172a' 
          }}
        >
          {/* Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/90 via-ink-950/70 to-ink-950/50" />
        </div>

        {/* Content above image */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 font-display text-5xl font-bold leading-[1.02] text-white sm:text-6xl"
              >
                Smart Rent Collection.
                <span className="block bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">Simplified Management.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-5 max-w-2xl text-xl leading-relaxed text-ink-200"
              >
                Manage properties, collect rent, track payments, and connect with tenants from one elegant platform designed for modern landlords.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link to="/login">
                  <Button variant="gold" size="lg" icon={ArrowRight} iconPosition="right">
                    Get Started
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="secondary" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20">Explore Pricing</Button>
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-400">Live Portfolio</p>
                    <p className="mt-2 font-display text-2xl font-bold text-white">UGX 16.8M collected</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-3 text-gold-400 shadow-lg backdrop-blur-sm">
                    <Receipt className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between text-base">
                    <span className="font-semibold text-white">Occupancy</span>
                    <span className="text-ink-200">84%</span>
                  </div>
                  <div className="mt-3 h-3 rounded-full bg-white/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '84%' }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-3 rounded-full bg-gradient-to-r from-gold-400 to-gold-600"
                    />
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <p className="text-sm text-ink-300">Pending Rent</p>
                    <p className="mt-1 font-display text-xl font-bold text-white">UGX 2.4M</p>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                    <p className="text-sm text-ink-300">Active Tenants</p>
                    <p className="mt-1 font-display text-xl font-bold text-white">132</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content Container */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Features Grid */}
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map(({ title, description, icon: Icon }, idx) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.1 }}
            >
              <GlassCard hover className="p-6 h-full">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink-950">{title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-700">{description}</p>
              </GlassCard>
            </motion.div>
          ))}
        </section>

        {/* How It Works */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-line-200 bg-white p-8 shadow-sm sm:p-10 lg:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">How It Works</p>
              <h2 className="mt-3 font-display text-4xl font-bold text-ink-950 sm:text-5xl">
                Premium Workflow for Every Portfolio
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink-700">
                From onboarding to payment collection, RentFlow creates a calm operational experience for landlords and a transparent one for residents.
              </p>
            </div>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 rounded-2xl border border-line-200 bg-paper-50 p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-ink-900 text-sm font-bold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-display text-lg font-semibold text-ink-950">{step}</p>
                    <p className="mt-1 text-base text-ink-700">Designed to be intuitive, polished, and ready for growth.</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Why RentFlow */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-3xl border border-line-200 bg-gradient-to-br from-ink-900 to-ink-800 p-8 text-paper-0 shadow-2xl sm:p-10 lg:p-12"
        >
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">Why RentFlow</p>
              <h2 className="mt-3 font-display text-4xl font-bold sm:text-5xl">
                Trustworthy, Secure, and Beautifully Organized
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-paper-50/80">
                Every view is designed to feel like a professional SaaS experience: confident, refined, and built around financial clarity.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Secure Access', desc: 'Protected workflows with clear account separation', icon: ShieldCheck },
                { title: 'Visual Listings', desc: 'Photos, units, and occupancy all in one place', icon: Camera },
                { title: 'Premium Communication', desc: 'Keep tenants informed without friction', icon: MessageCircleMore },
                { title: 'Clear Reporting', desc: 'Track income, balances, and trends confidently', icon: CheckCircle },
              ].map(({ title, desc, icon: Icon }) => (
                <div key={title} className="rounded-xl border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/15 text-gold-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mt-3 font-display text-lg font-semibold">{title}</p>
                  <p className="mt-1 text-base leading-relaxed text-paper-50/70">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer className="border-t border-line-200 bg-white py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-ink-600">
            © {new Date().getFullYear()} RentFlow. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
