import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Stepper, { Step } from '@/components/Stepper'; // Import Stepper and Step
import { mockUnits } from '@/data/mock-units'; // Import mock units
import { useAuth } from '@/hooks/useAuth'; // Import useAuth

// Define the Zod schema for the new incident form
const newIssueSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters." }).max(100, { message: "Title must not exceed 100 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }).max(500, { message: "Description must not exceed 500 characters." }),
  unit: z.string().min(1, { message: "Please select a unit." }),
  type: z.string().min(1, { message: "Please select an incident type." }),
  urgent: z.boolean().default(false),
  photos: z.any().optional(), // File input handling can be more complex, keeping it simple for now
});

type NewIssueFormValues = z.infer<typeof newIssueSchema>;

const NewIssue = () => {
  const { t } = useTranslation(['issues', 'common']); // Specify namespaces
  const { canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('issues', { ns: 'issues' }), href: '/issues' },
    { label: t('new issue', { ns: 'issues' }), href: '/issues/new' },
  ];

  const form = useForm<NewIssueFormValues>({
    resolver: zodResolver(newIssueSchema),
    defaultValues: {
      title: '',
      description: '',
      unit: '',
      type: '',
      urgent: false,
    },
  });

  const onSubmit = (data: NewIssueFormValues) => {
    console.log("Form data submitted:", data);
    // Simulate API call
    toast.success(t('incident created successfully', { ns: 'issues' }), {
      description: `${t('title', { ns: 'common' })}: ${data.title}, ${t('unit', { ns: 'common' })}: ${data.unit}`,
    });
    form.reset(); // Reset form after successful submission
  };

  if (!canCreate('Issues')) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <PlusCircle className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission create issues', { ns: 'common' })}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('create new incident', { ns: 'issues' })}</h1>
      <Card className="max-w-2xl mx-auto w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('incident information', { ns: 'issues' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('fill details new incident', { ns: 'issues' })}</CardDescription>
        </CardHeader>
        <CardContent>
          <Stepper onFinalStepCompleted={form.handleSubmit(onSubmit)} nextButtonText={t('next', { ns: 'common' })} backButtonText={t('back', { ns: 'common' })}>
            <Step>
              <div className="grid gap-4">
                <div className="grid md:grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="md:text-right text-rovida-near-black">
                    {t('title', { ns: 'common' })}
                  </Label>
                  <div className="md:col-span-3">
                    <Input id="title" placeholder={t('short summary incident', { ns: 'issues' })} {...form.register("title")} className="border-rovida-soft-gray text-rovida-near-black" />
                    {form.formState.errors.title && (
                      <p className="text-rovida-error text-sm mt-1">{form.formState.errors.title.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="md:text-right text-rovida-near-black">
                    {t('description', { ns: 'common' })}
                  </Label>
                  <div className="md:col-span-3">
                    <Textarea id="description" placeholder={t('detailed description incident', { ns: 'issues' })} {...form.register("description")} className="border-rovida-soft-gray text-rovida-near-black" />
                    {form.formState.errors.description && (
                      <p className="text-rovida-error text-sm mt-1">{form.formState.errors.description.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </Step>
            <Step>
              <div className="grid gap-4">
                <div className="grid md:grid-cols-4 items-center gap-4">
                  <Label htmlFor="unit" className="md:text-right text-rovida-near-black">
                    {t('unit', { ns: 'common' })}
                  </Label>
                  <div className="md:col-span-3">
                    <Select onValueChange={(value) => form.setValue("unit", value)} value={form.watch("unit")}>
                      <SelectTrigger id="unit" className="border-rovida-soft-gray text-rovida-near-black">
                        <SelectValue placeholder={t('select unit', { ns: 'issues' })} />
                      </SelectTrigger>
                      <SelectContent className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
                        {mockUnits.map(unit => (
                          <SelectItem key={unit.id} value={unit.unitNumber}>Unit {unit.unitNumber}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {form.formState.errors.unit && (
                      <p className="text-rovida-error text-sm mt-1">{form.formState.errors.unit.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid md:grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="md:text-right text-rovida-near-black">
                    {t('type', { ns: 'common' })}
                  </Label>
                  <div className="md:col-span-3">
                    <Select onValueChange={(value) => form.setValue("type", value)} value={form.watch("type")}>
                      <SelectTrigger id="type" className="border-rovida-soft-gray text-rovida-near-black">
                        <SelectValue placeholder={t('select type', { ns: 'issues' })} />
                      </SelectTrigger>
                      <SelectContent className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
                        <SelectItem value="Plumbing">Plumbing</SelectItem>
                        <SelectItem value="Electrical">Electrical</SelectItem>
                        <SelectItem value="HVAC">HVAC</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.type && (
                      <p className="text-rovida-error text-sm mt-1">{form.formState.errors.type.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </Step>
            <Step>
              <div className="grid gap-4">
                <div className="grid md:grid-cols-4 items-center gap-4">
                  <Label htmlFor="urgent" className="md:text-right text-rovida-near-black">
                    {t('urgent question', { ns: 'issues' })}
                  </Label>
                  <div className="md:col-span-3 flex items-center space-x-2">
                    <Checkbox id="urgent" checked={form.watch("urgent")} onCheckedChange={(checked) => form.setValue("urgent", !!checked)} className="border-rovida-slate-green-gray data-[state=checked]:bg-rovida-gold data-[state=checked]:text-white" />
                    <label
                      htmlFor="urgent"
                      className="text-sm font-medium leading-none text-rovida-near-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {t('mark as urgent', { ns: 'issues' })}
                    </label>
                  </div>
                </div>
                <div className="grid md:grid-cols-4 items-center gap-4">
                  <Label htmlFor="photos" className="md:text-right text-rovida-near-black">
                    {t('photos', { ns: 'issues' })}
                  </Label>
                  <Input id="photos" type="file" multiple className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" {...form.register("photos")} />
                </div>
              </div>
            </Step>
          </Stepper>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewIssue;