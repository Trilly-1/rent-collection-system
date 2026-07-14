import { useState } from 'react';
import toast from 'react-hot-toast';
import { Building2, Bell, CreditCard, ShieldCheck } from 'lucide-react';
import Card from '../../components/cards/Card.jsx';
import Input from '../../components/forms/Input.jsx';
import Select from '../../components/forms/Select.jsx';
import Button from '../../components/buttons/Button.jsx';
import { classNames } from '../../utils/helpers.js';

const tabs = [
  { id: 'company', label: 'Company', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'security', label: 'Security', icon: ShieldCheck },
];

export default function Settings() {
  const [activeTab, setActiveTab] = useState('company');
  const [notifPrefs, setNotifPrefs] = useState({
    rentDue: true,
    overdueAlerts: true,
    newTenant: true,
    weeklyDigest: false,
  });

  const handleSave = (e) => {
    e.preventDefault();
    toast.success('Settings saved');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <p className="stamp text-xs uppercase tracking-wider text-primary-600 mb-1">Preferences</p>
        <h1 className="font-display text-3xl font-semibold text-ink-950">Settings</h1>
      </div>

      <div className="flex gap-1 overflow-x-auto scroll-thin border-b border-line-200">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={classNames(
              'flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 -mb-px whitespace-nowrap transition-colors',
              activeTab === id ? 'border-primary-500 text-primary-600' : 'border-transparent text-ink-700 hover:text-ink-950'
            )}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      {activeTab === 'company' && (
        <Card title="Company details" eyebrow="Organization">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Company name" defaultValue="Kolagenda Property Management" />
              <Input label="Registration number" defaultValue="UG2024-88213" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Support email" type="email" defaultValue="support@kolagenda.ug" />
              <Input label="Support phone" defaultValue="+256 772 445 810" />
            </div>
            <Select label="Default currency" options={['UGX — Ugandan Shilling', 'USD — US Dollar', 'KES — Kenyan Shilling']} defaultValue="UGX — Ugandan Shilling" />
            <div className="tear-divider" />
            <div className="flex justify-end">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </Card>
      )}

      {activeTab === 'notifications' && (
        <Card title="Notification preferences" eyebrow="Stay informed">
          <div className="space-y-4">
            {[
              { key: 'rentDue', label: 'Rent due reminders', desc: 'Get notified 3 days before rent is due' },
              { key: 'overdueAlerts', label: 'Overdue alerts', desc: 'Immediate alert when a tenant misses a payment' },
              { key: 'newTenant', label: 'New tenant sign-ups', desc: 'Notify when a new tenant is added to a unit' },
              { key: 'weeklyDigest', label: 'Weekly digest', desc: 'A summary of collections every Monday morning' },
            ].map((item) => (
              <label key={item.key} className="flex items-center justify-between gap-4 py-2 cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-ink-950">{item.label}</p>
                  <p className="text-xs text-ink-700">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifPrefs((p) => ({ ...p, [item.key]: !p[item.key] }))}
                  className={classNames(
                    'relative h-6 w-11 rounded-full transition-colors shrink-0',
                    notifPrefs[item.key] ? 'bg-primary-500' : 'bg-line-300'
                  )}
                >
                  <span
                    className={classNames(
                      'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
                      notifPrefs[item.key] ? 'translate-x-5' : 'translate-x-0.5'
                    )}
                  />
                </button>
              </label>
            ))}
            <div className="tear-divider" />
            <div className="flex justify-end">
              <Button onClick={() => toast.success('Notification preferences saved')}>Save preferences</Button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'billing' && (
        <Card title="Billing & invoicing" eyebrow="Payments">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Invoice prefix" defaultValue="INV-" />
              <Input label="Grace period (days)" type="number" defaultValue={5} />
            </div>
            <Select label="Preferred mobile money provider" options={['MTN Mobile Money', 'Airtel Money', 'Both']} defaultValue="Both" />
            <div className="tear-divider" />
            <div className="flex justify-end">
              <Button type="submit">Save changes</Button>
            </div>
          </form>
        </Card>
      )}

      {activeTab === 'security' && (
        <Card title="Security" eyebrow="Account protection">
          <form onSubmit={handleSave} className="space-y-5">
            <Input label="Current password" type="password" placeholder="••••••••" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="New password" type="password" placeholder="••••••••" />
              <Input label="Confirm new password" type="password" placeholder="••••••••" />
            </div>
            <label className="flex items-center gap-2.5 text-sm text-ink-800">
              <input type="checkbox" defaultChecked className="rounded border-line-300 text-primary-500 focus:ring-primary-200" />
              Require two-factor authentication for admin sign-in
            </label>
            <div className="tear-divider" />
            <div className="flex justify-end">
              <Button type="submit">Update security settings</Button>
            </div>
          </form>
        </Card>
      )}
    </div>
  );
}