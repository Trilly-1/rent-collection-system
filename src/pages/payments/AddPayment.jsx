import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../../components/cards/Card.jsx';
import Input from '../../components/forms/Input.jsx';
import Select from '../../components/forms/Select.jsx';
import Button from '../../components/buttons/Button.jsx';
import Loader from '../../components/ui/Loader.jsx';
import { createPayment } from '../../services/paymentService.js';
import { getTenants } from '../../services/tenantService.js';
import { formatUGX } from '../../utils/format.js';

const methods = ['Mobile Money (MTN)', 'Mobile Money (Airtel)', 'Bank Transfer', 'Cash', 'Cheque'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
  (m) => `${m} 2026`
);

const schema = z.object({
  tenantId: z.string().min(1, 'Select a tenant'),
  amount: z.coerce.number().min(1000, 'Enter a valid amount'),
  method: z.string().min(1, 'Select a payment method'),
  monthFor: z.string().min(1, 'Select the month this payment covers'),
  date: z.string().min(1, 'Payment date is required'),
});

export default function AddPayment() {
  const navigate = useNavigate();
  const [tenants, setTenants] = useState([]);
  const [loadingTenants, setLoadingTenants] = useState(true);

  useEffect(() => {
    (async () => {
      const data = await getTenants();
      setTenants(data);
      setLoadingTenants(false);
    })();
  }, []);

  const tenantOptions = useMemo(
    () => tenants.map((t) => ({ value: t.id, label: `${t.name} — ${t.propertyName} (${t.unitNumber})` })),
    [tenants]
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema), defaultValues: { date: '2026-07-08' } });

  const selectedTenantId = watch('tenantId');
  const selectedTenant = tenants.find((t) => t.id === selectedTenantId);

  const onSubmit = async (data) => {
    const tenant = tenants.find((t) => t.id === data.tenantId);
    await createPayment({
      tenantId: tenant?.id,
      tenantName: tenant?.name,
      propertyName: tenant?.propertyName,
      unitNumber: tenant?.unitNumber,
      amount: Number(data.amount),
      method: data.method,
      monthFor: data.monthFor,
      date: data.date,
    });
    toast.success('Payment recorded successfully');
    navigate('/payments');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <button onClick={() => navigate('/payments')} className="flex items-center gap-1.5 text-sm text-ink-700 hover:text-ink-950">
        <ArrowLeft className="h-4 w-4" /> Back to payments
      </button>

      <div>
        <p className="stamp text-xs uppercase tracking-wider text-primary-600 mb-1">RentFlow</p>
        <h1 className="font-display text-3xl font-semibold text-ink-950">Record a payment</h1>
      </div>

      <Card>
        {loadingTenants ? (
          <Loader label="Loading tenants…" />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <Select
              label="Tenant"
              options={tenantOptions}
              placeholder="Choose a tenant"
              required
              error={errors.tenantId?.message}
              {...register('tenantId', {
                onChange: (e) => {
                  const t = tenants.find((tt) => tt.id === e.target.value);
                  if (t) setValue('amount', t.rentAmount);
                },
              })}
            />

            {selectedTenant && (
              <div className="rounded-lg bg-primary-50 border border-primary-100 px-4 py-3 text-sm text-ink-800">
                Standard rent for this tenant: <span className="font-mono font-semibold">{formatUGX(selectedTenant.rentAmount)}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Amount (UGX)" type="number" placeholder="850000" required error={errors.amount?.message} {...register('amount')} />
              <Select label="Payment method" options={methods} required error={errors.method?.message} {...register('method')} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select label="Rent period" options={months} placeholder="Month this payment covers" required error={errors.monthFor?.message} {...register('monthFor')} />
              <Input label="Payment date" type="date" required error={errors.date?.message} {...register('date')} />
            </div>

            <div className="tear-divider" />

            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => navigate('/payments')}>
                Cancel
              </Button>
              <Button type="submit" icon={Save} loading={isSubmitting}>
                Save payment
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}