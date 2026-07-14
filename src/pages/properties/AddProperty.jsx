import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Save, Building2, Home, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import Card from '../../components/cards/Card.jsx';
import Input from '../../components/forms/Input.jsx';
import Select from '../../components/forms/Select.jsx';
import ImageUpload from '../../components/forms/ImageUpload.jsx';
import Button from '../../components/buttons/Button.jsx';
import { createProperty } from '../../services/propertyService.js';

const districts = [
  'Kampala', 'Wakiso', 'Mukono', 'Entebbe', 'Jinja', 'Mbarara', 'Gulu',
  'Mbale', 'Masaka', 'Arua', 'Fort Portal', 'Lira', 'Hoima', 'Kabale', 'Soroti',
];

const propertyTypes = [
  'Apartment Block', 'Residential Estate', 'Commercial Plaza',
  'Bungalow Complex', 'Mixed-Use Building', 'Townhouses'
];

const schema = z.object({
  name: z.string().min(3, 'Property name must be at least 3 characters'),
  type: z.string().min(1, 'Select a property type'),
  district: z.string().min(1, 'Select a district'),
  area: z.string().min(2, 'Area / neighborhood is required'),
  address: z.string().min(6, 'Enter a full address'),
  totalUnits: z.coerce.number().int().min(1, 'Must have at least 1 unit').max(500, 'That seems too high'),
  manager: z.string().min(3, 'Manager name is required'),
  managerPhone: z.string().min(9, 'Enter a valid phone number'),
  minRent: z.coerce.number().min(0, 'Minimum rent is required'),
  maxRent: z.coerce.number().min(0, 'Maximum rent is required'),
  description: z.string().optional(),
});

export default function AddProperty() {
  const navigate = useNavigate();
  const [propertyPhotos, setPropertyPhotos] = useState([]);
  const [roomPhotos, setRoomPhotos] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    await createProperty({
      name: data.name,
      type: data.type,
      district: data.district,
      area: data.area,
      address: data.address,
      totalUnits: data.totalUnits,
      manager: data.manager,
      managerPhone: data.managerPhone,
      monthlyRentRange: [Number(data.minRent), Number(data.maxRent)],
      description: data.description,
      yearBuilt: new Date().getFullYear(),
      photos: propertyPhotos.map((file) => file.name),
      roomPhotos: roomPhotos.map((file) => file.name),
    });
    toast.success('Property added to your portfolio');
    navigate('/properties');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/properties')}
        className="flex items-center gap-2 text-ink-700 hover:text-ink-950 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span className="font-medium">Back to Properties</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <p className="stamp text-xs uppercase tracking-wider text-gold-600 mb-1">New Listing</p>
        <h1 className="font-display text-4xl font-bold text-ink-950">Add a Property</h1>
        <p className="mt-2 text-lg text-ink-700">
          Fill in the details below to add a new property to your portfolio.
        </p>
      </motion.div>

      <Card delay={0.2}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8" noValidate>
          {/* Basic Information */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
                <Building2 className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-semibold text-ink-950">Property Details</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Property Name"
                placeholder="e.g. Greenview Apartment Block"
                required
                error={errors.name?.message}
                {...register('name')}
              />
              <Select
                label="Property Type"
                options={propertyTypes}
                required
                error={errors.type?.message}
                {...register('type')}
              />
            </div>

            <div className="mt-5">
              <Input
                label="Property Description (Optional)"
                placeholder="Describe your property, its features, and what makes it special..."
                error={errors.description?.message}
                {...register('description')}
                className="min-h-[100px]"
              />
            </div>
          </div>

          <div className="tear-divider" />

          {/* Location */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                <MapPin className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-semibold text-ink-950">Location</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Select
                label="District"
                options={districts}
                required
                error={errors.district?.message}
                {...register('district')}
              />
              <Input
                label="Area / Neighborhood"
                placeholder="e.g. Ntinda"
                required
                error={errors.area?.message}
                {...register('area')}
              />
            </div>

            <div className="mt-5">
              <Input
                label="Full Address"
                placeholder="Plot 12, Kira Road, Ntinda, Kampala"
                required
                error={errors.address?.message}
                {...register('address')}
              />
            </div>
          </div>

          <div className="tear-divider" />

          {/* Units & Pricing */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ink-100 text-ink-700">
                <Home className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-semibold text-ink-950">Units & Pricing</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <Input
                label="Total Units"
                type="number"
                placeholder="20"
                required
                error={errors.totalUnits?.message}
                {...register('totalUnits')}
              />
              <Input
                label="Min Rent (UGX)"
                type="number"
                placeholder="400,000"
                required
                error={errors.minRent?.message}
                {...register('minRent')}
              />
              <Input
                label="Max Rent (UGX)"
                type="number"
                placeholder="1,200,000"
                required
                error={errors.maxRent?.message}
                {...register('maxRent')}
              />
            </div>
          </div>

          <div className="tear-divider" />

          {/* Manager Info */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="font-display text-xl font-semibold text-ink-950">Property Manager</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input
                label="Manager Name"
                placeholder="Full name"
                required
                error={errors.manager?.message}
                {...register('manager')}
              />
              <Input
                label="Manager Phone"
                placeholder="+256 700 123 456"
                required
                error={errors.managerPhone?.message}
                {...register('managerPhone')}
              />
            </div>
          </div>

          <div className="tear-divider" />

          {/* Photo Upload */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-700">
                <Camera className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-ink-950">Property Photos</h2>
                <p className="text-sm text-ink-600">Upload high-quality photos to showcase your property</p>
              </div>
            </div>

            <div className="space-y-6">
              <ImageUpload
                label="House / Property Photos"
                description="Exterior, entrance, common areas, and full property views"
                type="property"
                multiple
                maxFiles={8}
                value={propertyPhotos}
                onChange={setPropertyPhotos}
              />

              <ImageUpload
                label="Room / Unit Photos"
                description="Bedrooms, kitchen, bathroom, and studio visuals"
                type="room"
                multiple
                maxFiles={12}
                value={roomPhotos}
                onChange={setRoomPhotos}
              />
            </div>
          </div>

          <div className="tear-divider" />

          {/* Actions */}
          <div className="flex items-center justify-end gap-4 pt-2">
            <Button type="button" variant="ghost" size="lg" onClick={() => navigate('/properties')}>
              Cancel
            </Button>
            <Button type="submit" size="lg" loading={isSubmitting}>
              <Save className="h-5 w-5 mr-2" />
              Save Property
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
