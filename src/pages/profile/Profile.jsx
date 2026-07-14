import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Camera } from 'lucide-react';
import Card from '../../components/cards/Card.jsx';
import Input from '../../components/forms/Input.jsx';
import Button from '../../components/buttons/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { initials } from '../../utils/format.js';

const schema = z.object({
  name: z.string().min(3, 'Name is required'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(9, 'Enter a valid phone number'),
  role: z.string().min(2, 'Role is required'),
});

export default function Profile() {
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      role: user?.role || '',
    },
  });

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 500));
    toast.success('Profile updated');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <p className="stamp text-xs uppercase tracking-wider text-primary-600 mb-1">Account</p>
        <h1 className="font-display text-3xl font-semibold text-ink-950">Profile</h1>
      </div>

      <Card>
        <div className="flex items-center gap-5 pb-5 border-b border-line-200">
          <div className="relative">
            <span className="h-20 w-20 rounded-full bg-primary-500 text-white flex items-center justify-center text-2xl font-bold">
              {initials(user?.name)}
            </span>
            <button className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-gold-400 text-ink-950 flex items-center justify-center border-2 border-white">
              <Camera className="h-3.5 w-3.5" />
            </button>
          </div>
          <div>
            <p className="font-display text-xl font-semibold text-ink-950">{user?.name}</p>
            <p className="text-sm text-ink-700">{user?.role}</p>
            <Badge tone="success" className="mt-2">
              Verified account
            </Badge>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-5" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Full name" required error={errors.name?.message} {...register('name')} />
            <Input label="Role" required error={errors.role?.message} {...register('role')} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Email address" type="email" required error={errors.email?.message} {...register('email')} />
            <Input label="Phone number" required error={errors.phone?.message} {...register('phone')} />
          </div>

          <div className="tear-divider" />

          <div className="flex justify-end">
            <Button type="submit" loading={isSubmitting}>
              Save profile
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}