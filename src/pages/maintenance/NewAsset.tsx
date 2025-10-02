import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PlusCircle, CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';

// Define the Zod schema for the new asset form
const newAssetSchema = z.object({
  name: z.string().min(3, { message: "Asset name must be at least 3 characters." }).max(100, { message: "Asset name must not exceed 100 characters." }),
  type: z.string().min(1, { message: "Please select an asset type." }),
  location: z.string().min(3, { message: "Location must be at least 3 characters." }).max(100, { message: "Location must not exceed 100 characters." }),
  status: z.string().min(1, { message: "Please select a status." }),
  lastMaintenance: z.date({ required_error: "Last maintenance date is required." }),
  nextMaintenance: z.date({ required_error: "Next maintenance date is required." }),
});

type NewAssetFormValues = z.infer<typeof newAssetSchema>;

const NewAsset = () => {
  const { t } = useTranslation(['maintenance', 'common']);
  const { canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('maintenance', { ns: 'maintenance' }), href: '/maintenance' },
    { label: t('assets', { ns: 'maintenance' }), href: '/maintenance/assets' },
    { label: t('add new asset', { ns: 'maintenance' }), href: '/maintenance/assets/new' },
  ];

  const form = useForm<NewAssetFormValues>({
    resolver: zodResolver(newAssetSchema),
    defaultValues: {
      name: '',
      type: '',
      location: '',
      status: 'Operational',
      lastMaintenance: new Date(),
      nextMaintenance: new Date(),
    },
  });

  const onSubmit = (data: NewAssetFormValues) => {
    console.log("New asset data submitted:", data);
    // Simulate API call
    toast.success(t('asset created successfully', { ns: 'maintenance' }), {
      description: `${t('name', { ns: 'common' })}: ${data.name}, ${t('type', { ns: 'common' })}: ${data.type}`,
    });
    form.reset(); // Reset form after successful submission
  };

  if (!canCreate('Maintenance')) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <PlusCircle className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission create assets', { ns: 'common' })}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('add new asset', { ns: 'maintenance' })}</h1>
      <p className="text-rovida-slate-green-gray">{t('fill details new asset', { ns: 'maintenance' })}</p>

      <Card className="max-w-3xl mx-auto w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('asset information', { ns: 'maintenance' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('provide details new asset', { ns: 'maintenance' })}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="md:text-right text-rovida-near-black">{t('name', { ns: 'common' })}</Label>
              <div className="md:col-span-3">
                <Input id="name" type="text" placeholder={t('asset name placeholder', { ns: 'maintenance' })} {...form.register("name")} className="border-rovida-soft-gray text-rovida-near-black" />
                {form.formState.errors.name && (
                  <p className="text-rovida-error text-sm mt-1">{form.formState.errors.name.message}</p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="md:text-right text-rovida-near-black">{t('type', { ns: 'common' })}</Label>
              <div className="md:col-span-3">
                <Select onValueChange={(value) => form.setValue("type", value)} value={form.watch("type")}>
                  <SelectTrigger id="type" className="border-rovida-soft-gray text-rovida-near-black">
                    <SelectValue placeholder={t('select asset type', { ns: 'maintenance' })} />
                  </SelectTrigger>
                  <SelectContent className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
                    <SelectItem value="HVAC System">{t('hvac system', { ns: 'maintenance' })}</SelectItem>
                    <SelectItem value="Elevator">{t('elevator', { ns: 'maintenance' })}</SelectItem>
                    <SelectItem value="Heating System">{t('heating system', { ns: 'maintenance' })}</SelectItem>
                    <SelectItem value="Safety System">{t('safety system', { ns: 'maintenance' })}</SelectItem>
                    <SelectItem value="Other">{t('other', { ns: 'common' })}</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.type && (
                  <p className="text-rovida-error text-sm mt-1">{form.formState.errors.type.message}</p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="md:text-right text-rovida-near-black">{t('location', { ns: 'common' })}</Label>
              <div className="md:col-span-3">
                <Input id="location" type="text" placeholder={t('asset location placeholder', { ns: 'maintenance' })} {...form.register("location")} className="border-rovida-soft-gray text-rovida-near-black" />
                {form.formState.errors.location && (
                  <p className="text-rovida-error text-sm mt-1">{form.formState.errors.location.message}</p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="status" className="md:text-right text-rovida-near-black">{t('status', { ns: 'common' })}</Label>
              <div className="md:col-span-3">
                <Select onValueChange={(value) => form.setValue("status", value)} value={form.watch("status")}>
                  <SelectTrigger id="status" className="border-rovida-soft-gray text-rovida-near-black">
                    <SelectValue placeholder={t('select status', { ns: 'common' })} />
                  </SelectTrigger>
                  <SelectContent className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
                    <SelectItem value="Operational">{t('operational', { ns: 'maintenance' })}</SelectItem>
                    <SelectItem value="Under Maintenance">{t('under maintenance', { ns: 'maintenance' })}</SelectItem>
                    <SelectItem value="Retired">{t('retired', { ns: 'maintenance' })}</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.status && (
                  <p className="text-rovida-error text-sm mt-1">{form.formState.errors.status.message}</p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="lastMaintenance" className="md:text-right text-rovida-near-black">{t('last maintenance', { ns: 'maintenance' })}</Label>
              <div className="md:col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal border-rovida-soft-gray text-rovida-near-black",
                        !form.watch("lastMaintenance") && "text-rovida-slate-green-gray"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.watch("lastMaintenance") ? format(form.watch("lastMaintenance"), "PPP") : <span>{t('pick a date', { ns: 'common' })}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white/80 backdrop-blur-xl border-rovida-soft-gray">
                    <Calendar
                      mode="single"
                      selected={form.watch("lastMaintenance")}
                      onSelect={(date) => form.setValue("lastMaintenance", date!)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {form.formState.errors.lastMaintenance && (
                  <p className="text-rovida-error text-sm mt-1">{form.formState.errors.lastMaintenance.message}</p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="nextMaintenance" className="md:text-right text-rovida-near-black">{t('next maintenance', { ns: 'maintenance' })}</Label>
              <div className="md:col-span-3">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal border-rovida-soft-gray text-rovida-near-black",
                        !form.watch("nextMaintenance") && "text-rovida-slate-green-gray"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {form.watch("nextMaintenance") ? format(form.watch("nextMaintenance"), "PPP") : <span>{t('pick a date', { ns: 'common' })}</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white/80 backdrop-blur-xl border-rovida-soft-gray">
                    <Calendar
                      mode="single"
                      selected={form.watch("nextMaintenance")}
                      onSelect={(date) => form.setValue("nextMaintenance", date!)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                {form.formState.errors.nextMaintenance && (
                  <p className="text-rovida-error text-sm mt-1">{form.formState.errors.nextMaintenance.message}</p>
                )}
              </div>
            </div>
            <Button type="submit" className="w-full btn-primary">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('add asset', { ns: 'maintenance' })}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewAsset;