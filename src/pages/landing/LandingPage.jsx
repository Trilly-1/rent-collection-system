import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  ArrowRight, BarChart3, Building2, Camera, Check, CheckCircle, 
  CreditCard, Eye, FileText, Globe, Home, Lock, Receipt, 
  ShieldCheck, Sparkles, Star, Users, Zap, Quote
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../../components/buttons/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const highlights = [
  {
    title: 'Professional Property Oversight',
    description: 'Keep listings, occupancy, and resident activity beautifully organized in one premium workspace.',
    icon: Building2,
    gradient: 'from-ink-600 to-ink-800',
  },
  {
    title: 'Crystal-Clear Rent Tracking',
    description: 'Monitor collections, outstanding balances, and trends with a dashboard that feels effortless.',
    icon: BarChart3,
    gradient: 'from-gold-500 to-gold-700',
  },
  {
    title: 'Photo-Ready Listings',
    description: 'Upload house photos and room images so every property feels complete, inviting, and trustworthy.',
    icon: Camera,
    gradient: 'from-ink-500 to-ink-700',
  },
  {
    title: 'Tenant Portal Access',
    description: 'Tenants can view their lease details, payment history, and terms in one secure, private portal.',
    icon: Lock,
    gradient: 'from-gold-600 to-gold-800',
  },
];

const steps = [
  {
    number: '01',
    title: 'Create Your Portfolio',
    description: 'Add houses, apartments, and rental details with a refined onboarding experience.',
  },
  {
    number: '02',
    title: 'Upload Visual Listings',
    description: 'Attach photographs of homes and individual rooms so every listing feels complete.',
  },
  {
    number: '03',
    title: 'Track & Collect',
    description: 'Monitor collections, send reminders, and keep your portfolio in perfect order.',
  },
];

const features = [
  { icon: CreditCard, title: 'Mobile Money Integration', description: 'Accept MTN MoMo, Airtel Money, and bank transfers with instant confirmations.' },
  { icon: Globe, title: 'Multi-Property Management', description: 'Manage unlimited properties, units, and tenants from one centralized dashboard.' },
  { icon: FileText, title: 'Terms & Conditions', description: 'Set clear lease terms that tenants can access anytime from their portal.' },
  { icon: Users, title: 'Tenant Self-Service', description: 'Tenants view payment history, download receipts, and track their balance 24/7.' },
  { icon: ShieldCheck, title: 'Bank-Level Security', description: 'Your data is encrypted and protected with industry-standard security protocols.' },
  { icon: Zap, title: 'Instant Notifications', description: 'Get real-time alerts for payments, overdue balances, and tenant activity.' },
];

const testimonials = [
  {
    name: 'Sarah Nakamya',
    role: 'Landlord, Kampala',
    content: 'RentFlow transformed how I manage my 12 properties. The photo listings alone have reduced vacant days by 40%.',
    rating: 5,
  },
  {
    name: 'James Okello',
    role: 'Tenant, Entebbe',
    content: 'Finally a tenant portal that actually works! I can see all my payment history and download receipts instantly.',
    rating: 5,
  },
  {
    name: 'Grace Achieng',
    role: 'Property Manager',
    content: 'The dashboard gives me complete visibility across all units. Reporting has never been easier.',
    rating: 5,
  },
];

function AnimatedCounter({ value, suffix = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <span ref={ref} className="font-display text-4xl font-bold text-ink-950">
      {isInView ? value : '0'}{suffix}
    </span>
  );
}

export default function LandingPage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen">
      {/* Hero Section - With Background Image Support */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Layer */}
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

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-primary-400/10 blur-3xl" />

        {/* Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Content */}
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/10 px-4 py-2 text-sm font-semibold text-gold-400 backdrop-blur-sm"
              >
                <Sparkles className="h-4 w-4" />
                Premium Rental Management
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 font-display text-5xl font-bold leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-7xl"
              >
                Manage Rent
                <span className="block bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                  With Clarity
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-200"
              >
                The professional platform for landlords who want clarity, order, and trust. 
                Manage properties, collect payments, and track your portfolio with ease.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-8 flex flex-wrap gap-4"
              >
                <Link to="/landlord-register">
                  <Button variant="gold" size="lg">
                    Start Free Trial
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/tenant-login">
                  <Button variant="secondary" size="lg" className="border-white/20 bg-white/10 text-white hover:bg-white/20">
                    Tenant Portal
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-12 flex flex-wrap items-center gap-8 border-t border-white/10 pt-8"
              >
                <div className="text-center">
                  <AnimatedCounter value="84" suffix="%" />
                  <p className="mt-1 text-sm text-ink-300">Occupancy Rate</p>
                </div>
                <div className="text-center">
                  <AnimatedCounter value="72" suffix="M+" />
                  <p className="mt-1 text-sm text-ink-300">UGX Collected</p>
                </div>
                <div className="text-center">
                  <AnimatedCounter value="500" suffix="+" />
                  <p className="mt-1 text-sm text-ink-300">Active Properties</p>
                </div>
              </motion.div>
            </div>

            {/* Right - Portfolio Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">What You Manage</p>
              <div className="mt-5 space-y-4">
                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                    <Home className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Properties & Units</p>
                    <p className="mt-0.5 text-sm text-ink-300">Houses, apartments, rooms, and commercial spaces</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-400/20 text-gold-400">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Tenants & Payments</p>
                    <p className="mt-0.5 text-sm text-ink-300">Track rent, balances, and payment history</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-white">
                    <Camera className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Photo Galleries</p>
                    <p className="mt-0.5 text-sm text-ink-300">Upload house and room photos for every listing</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600"
            >
              Features
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 font-display text-4xl font-bold text-ink-950 sm:text-5xl"
            >
              Everything for Calm Operations
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg text-ink-700"
            >
              Designed for landlords who value clarity, order, and professional presentation.
            </motion.p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-2xl border border-line-200 bg-white p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white shadow-lg`}>
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-ink-950">{item.title}</h3>
                <p className="mt-2 text-base text-ink-700 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-20">
          <div className="rounded-3xl border border-line-200 bg-white p-8 shadow-sm sm:p-10 lg:p-12">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600"
              >
                How It Works
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="mt-3 font-display text-4xl font-bold text-ink-950 sm:text-5xl"
              >
                From Listing to Payment
              </motion.h2>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  className="relative text-center"
                >
                  <span className="font-display text-6xl font-bold text-gold-100">{step.number}</span>
                  <h3 className="mt-3 font-display text-2xl font-semibold text-ink-950">{step.title}</h3>
                  <p className="mt-2 text-lg text-ink-700 leading-relaxed">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20">
          <div className="rounded-3xl border border-line-200 bg-gradient-to-br from-ink-900 to-ink-800 p-8 shadow-xl sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400"
                >
                  Visual Listings
                </motion.p>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="mt-3 font-display text-4xl font-bold text-white sm:text-5xl"
                >
                  Showcase Your Properties
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 text-lg text-ink-300 leading-relaxed"
                >
                  Upload high-quality photos of your properties and rooms. Give tenants a virtual tour before they visit.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="mt-8 space-y-3"
                >
                  {['House exterior and entrance', 'Individual rooms and units', 'Common areas and amenities', 'Neighborhood surroundings'].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold-400">
                        <Check className="h-4 w-4 text-ink-900" />
                      </div>
                      <span className="text-ink-200">{item}</span>
                    </div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="grid grid-cols-2 gap-4"
              >
                <div className="space-y-4">
                  <div className="rounded-xl bg-white/10 p-6 border border-white/10 backdrop-blur-sm">
                    <Camera className="h-8 w-8 text-gold-400" />
                    <p className="mt-3 text-sm font-medium text-white">Upload workflow</p>
                    <p className="mt-1 text-sm text-ink-300">Drag, drop, and organize</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-6 border border-white/10 backdrop-blur-sm">
                    <Eye className="h-8 w-8 text-gold-400" />
                    <p className="mt-3 text-sm font-medium text-white">Tenant preview</p>
                    <p className="mt-1 text-sm text-ink-300">Beautiful gallery view</p>
                  </div>
                </div>
                <div className="mt-6 space-y-4">
                  <div className="rounded-xl bg-white/10 p-6 border border-white/10 backdrop-blur-sm">
                    <Star className="h-8 w-8 text-gold-400" />
                    <p className="mt-3 text-sm font-medium text-white">Featured listings</p>
                    <p className="mt-1 text-sm text-ink-300">Highlight best properties</p>
                  </div>
                  <div className="rounded-xl bg-white/10 p-6 border border-white/10 backdrop-blur-sm">
                    <Globe className="h-8 w-8 text-gold-400" />
                    <p className="mt-3 text-sm font-medium text-white">Share anywhere</p>
                    <p className="mt-1 text-sm text-ink-300">Social media ready</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Full Features Grid */}
        <section className="py-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-display text-4xl font-bold text-ink-950 sm:text-5xl"
            >
              Built for Modern Landlords
            </motion.h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl border border-line-200 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-50 text-gold-600">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-display text-xl font-semibold text-ink-950">{item.title}</h3>
                <p className="mt-2 text-base text-ink-700 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600"
            >
              Testimonials
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 font-display text-4xl font-bold text-ink-950 sm:text-5xl"
            >
              Loved by Landlords & Tenants
            </motion.h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="rounded-2xl border border-line-200 bg-white p-6 shadow-sm"
              >
                <Quote className="h-8 w-8 text-gold-200" />
                <p className="mt-4 text-lg text-ink-700 leading-relaxed">{testimonial.content}</p>
                <div className="mt-6 flex items-center gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                <div className="mt-4 border-t border-line-200 pt-4">
                  <p className="font-semibold text-ink-950">{testimonial.name}</p>
                  <p className="text-sm text-ink-600">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-gold-200 bg-gradient-to-br from-gold-50 to-white p-8 text-center shadow-lg sm:p-12"
          >
            <h2 className="font-display text-4xl font-bold text-ink-950 sm:text-5xl">
              Ready to Transform Your Rentals?
            </h2>
            <p className="mt-4 text-lg text-ink-700 max-w-2xl mx-auto">
              Join hundreds of landlords who trust RentFlow to manage their properties professionally.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link to="/landlord-register">
                <Button variant="gold" size="lg">
                  Get Started Free
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link to="/features">
                <Button variant="secondary" size="lg">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-line-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg overflow-hidden">
                <img src="/images/img2.jpeg" alt="RentFlow Logo" className="h-full w-full object-cover" />
              </div>
              <div>
                <p className="font-display text-lg font-bold text-ink-950">RentFlow</p>
                <p className="text-xs text-ink-600">Smart Property Management</p>
              </div>
            </div>
            <p className="text-sm text-ink-600">
              © {new Date().getFullYear()} RentFlow. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
