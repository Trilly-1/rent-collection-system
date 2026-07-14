import { motion } from 'framer-motion';
import { Building2, ShieldCheck, Sparkles } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';

export default function About() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-16 sm:px-6 lg:px-8">
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-line-200 bg-white/80 p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-700">About RentFlow</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">Built for landlords who value elegance, control, and calm growth.</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-ink-700">
          RentFlow blends premium design with practical property operations so landlords can manage collections, occupancy, and communication without sacrificing clarity.
        </p>
      </motion.section>

      <div className="grid gap-4 lg:grid-cols-3">
        {[
          { title: 'Mission', body: 'To make rental operations feel professional, transparent, and effortless.', icon: Building2 },
          { title: 'Vision', body: 'To become the trusted operating layer for modern property portfolios.', icon: Sparkles },
          { title: 'Security', body: 'Every interaction is designed to feel protected, organized, and dependable.', icon: ShieldCheck },
        ].map(({ title, body, icon: Icon }) => (
          <GlassCard key={title} className="p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
              <Icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-ink-950">{title}</h3>
            <p className="mt-2 text-sm leading-7 text-ink-700">{body}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
