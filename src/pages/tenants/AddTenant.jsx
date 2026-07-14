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
import { createTenant } from '../../services/tenantService.js';
import { getAllUnits } from '../../services/propertyService.js';
import { formatUGX } from '../../utils/format.js';

const schema = z.object({
  name: z.string().min(3, 'Full name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(9, 'Enter a valid phone number'),
  unitId: z.string().min(1, 'Select a unit'),
  moveInDate: z.string().min(1, 'Move-in date is required'),
  leaseEndDate: z.string().min(1, 'Lease end date is required'),
  emergencyContact: z.string().min(3, 'Emergency contact name is required'),
  emergencyPhone: z.string().min(9, 'Enter a valid phone number'),
});

export default function AddTenant() {
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);
  const [loadingUnits, setLoadingUnits] = useState(true);

  useEffect(() => {
    (async () => {
      const all = await getAllUnits();
      setUnits(all.filter((u) => u.status === 'Vacant'));
      setLoadingUnits(false);
    })();
  }, []);

  const unitOptions = useMemo(
    () => units.map((u) => ({ value: u.id, label: `${u.propertyName} — Unit ${u.unitNumber} (${formatUGX(u.rent)}/mo)` })),
    [units]
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const selectedUnitId = watch('unitId');
  const selectedUnit = units.find((u) => u.id === selectedUnitId);

  const onSubmit = async (data) => {
    const unit = units.find((u) => u.id === data.unitId);
    await createTenant({
      name: data.name,
      email: data.email,
      phone: data.phone,
      propertyId: unit?.propertyId,
      propertyName: unit?.propertyName,
      unitId: unit?.id,
      unitNumber: unit?.unitNumber,
      rentAmount: unit?.rent || 0,
      moveInDate: data.moveInDate,
      leaseEndDate: data.leaseEndDate,
      emergencyContact: data.emergencyContact,
      emergencyPhone: data.emergencyPhone,
      nationalIdType: 'National ID',
    });
    toast.success('Tenant added successfully');
    navigate('/tenants');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <button onClick={() => navigate('/tenants')} className="flex items-center gap-1.5 text-sm text-ink-700 hover:text-ink-950">
        <ArrowLeft className="h-4 w-4" /> Back to tenants
      </button>

      <div>
        <p className="stamp text-xs uppercase tracking-wider text-primary-600 mb-1">New tenant</p>
        <h1 className="font-display text-3xl font-semibold text-ink-950">Add a tenant</h1>
      </div>

      <Card>
        {loadingUnits ? (
          <Loader label="Loading available units…" />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full name" placeholder="e.g. David Ssebunya" required error={errors.name?.message} {...register('name')} />
              <Input label="Email address" type="email" placeholder="tenant@mail.com" required error={errors.email?.message} {...register('email')} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Phone number" placeholder="+256 700 123 456" required error={errors.phone?.message} {...register('phone')} />
              <Select
                label="Assign unit"
                options={unitOptions}
                placeholder={unitOptions.length ? 'Choose a vacant unit' : 'No vacant units available'}
                required
                error={errors.unitId?.message}
                {...register('unitId')}
              />
            </div>

            {selectedUnit && (
              <div className="rounded-lg bg-primary-50 border border-primary-100 px-4 py-3 text-sm text-ink-800">
                Monthly rent for this unit: <span className="font-mono font-semibold">{formatUGX(selectedUnit.rent)}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Move-in date" type="date" required error={errors.moveInDate?.message} {...register('moveInDate')} />
              <Input label="Lease end date" type="date" required error={errors.leaseEndDate?.message} {...register('leaseEndDate')} />
            </div>

            <div className="tear-divider" />
            <p className="text-sm font-semibold text-ink-900">Emergency contact</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Contact name" placeholder="Full name" required error={errors.emergencyContact?.message} {...register('emergencyContact')} />
              <Input label="Contact phone" placeholder="+256 700 123 456" required error={errors.emergencyPhone?.message} {...register('emergencyPhone')} />
            </div>

            <div className="tear-divider" />

            <div className="flex items-center justify-end gap-3">
              <Button type="button" variant="secondary" onClick={() => navigate('/tenants')}>
                Cancel
              </Button>
              <Button type="submit" icon={Save} loading={isSubmitting} disabled={!unitOptions.length}>
                Save tenant
              </Button>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}