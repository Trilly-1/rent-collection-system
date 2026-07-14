import { motion } from 'framer-motion';
import { BarChart3, Building2, Camera, MessageCircleMore, ShieldCheck, Wallet2 } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';

const items = [
  { title: 'Property visibility', description: 'Create a polished property profile with units, occupancy, and visuals.', icon: Building2 },
  { title: 'Payment clarity', description: 'Follow paid, pending, and overdue balances with confidence.', icon: Wallet2 },
  { title: 'Analytics', description: 'Turn rent collection into clear business insights and trends.', icon: BarChart3 },
  { title: 'Communication', description: 'Send updates and reminders that feel timely and professional.', icon: MessageCircleMore },
  { title: 'Security', description: 'Separate landlord and tenant experiences with thoughtful access design.', icon: ShieldCheck },
  { title: 'Visual storytelling', description: 'Showcase homes and rooms with image-first property presentations.', icon: Camera },
];

export default function Features() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-16 sm:px-6 lg:px-8">
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-line-200 bg-white/80 p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-700">Features</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">Every surface is crafted for property teams that expect more.</h1>
      </motion.section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map(({ title, description, icon: Icon }) => (
          <GlassCard key={title} className="p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-ink-950">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-ink-700">{description}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
