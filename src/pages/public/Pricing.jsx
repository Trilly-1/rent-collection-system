import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';
import Button from '../../components/buttons/Button.jsx';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'For early landlords and small portfolios.',
    features: ['Up to 3 properties', 'Core tracking', 'Basic tenant oversight'],
    highlighted: false,
  },
  {
    name: 'Premium',
    price: '$29',
    description: 'For active property operations that need more clarity.',
    features: ['Unlimited properties', 'Advanced reports', 'Automated reminders'],
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For larger teams and multi-location portfolios.',
    features: ['Team access', 'Priority support', 'Custom workflows'],
    highlighted: false,
  },
];

export default function Pricing() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-16 sm:px-6 lg:px-8">
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-line-200 bg-white/80 p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-700">Pricing</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">Flexible plans for landlords at every stage.</h1>
      </motion.section>

      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <GlassCard key={plan.name} className={`p-6 ${plan.highlighted ? 'border-gold-300 bg-[linear-gradient(135deg,_#fff8e7_0%,_#fffdf8_100%)]' : ''}`}>
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-ink-950">{plan.name}</h3>
              {plan.highlighted ? <span className="rounded-full bg-gold-100 px-2.5 py-1 text-xs font-semibold text-gold-700">Most popular</span> : null}
            </div>
            <p className="mt-3 text-sm leading-7 text-ink-700">{plan.description}</p>
            <p className="mt-5 text-4xl font-semibold text-ink-950">{plan.price}</p>
            <p className="mt-2 text-sm text-ink-700">/month</p>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-700" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="mt-6" variant={plan.highlighted ? 'gold' : 'secondary'} fullWidth>
              Choose plan
            </Button>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
