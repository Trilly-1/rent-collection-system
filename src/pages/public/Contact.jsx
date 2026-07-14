import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard.jsx';
import Input from '../../components/forms/Input.jsx';
import Button from '../../components/buttons/Button.jsx';

export default function Contact() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 pb-16 sm:px-6 lg:px-8">
      <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] border border-line-200 bg-white/80 p-8 shadow-sm sm:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gold-700">Contact</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-ink-950 sm:text-5xl">Let’s talk about a more elegant rental workflow.</h1>
      </motion.section>

      <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-ink-950">Email</p>
                <p className="text-sm text-ink-700">hello@rentflow.app</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-ink-950">Phone</p>
                <p className="text-sm text-ink-700">+256 772 000 000</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gold-100 text-gold-700">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-ink-950">Location</p>
                <p className="text-sm text-ink-700">Kampala, Uganda</p>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <Input label="Name" placeholder="Your name" />
            <Input label="Email" type="email" placeholder="you@company.com" />
          </div>
          <div className="mt-4">
            <Input label="Message" placeholder="Tell us about your property portfolio" />
          </div>
          <Button className="mt-6" variant="gold">Send message</Button>
        </GlassCard>
      </div>
    </div>
  );
}
