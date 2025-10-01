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
import BreadcrumbNav from '@/components/BreadcrumbNav'; // Import BreadcrumbNav
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Import Card components

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
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('issues'), href: '/issues' },
    { label: 'New Incident', href: '/issues/new' },
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
    toast.success("Incident created successfully!", {
      description: `Title: ${data.title}, Unit: ${data.unit}`,
    });
    form.reset(); // Reset form after successful submission
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} /> {/* Add BreadcrumbNav */}
      <h1 className="text-2xl font-semibold md:text-3xl text-rovida-navy">Create New Incident</h1>
      <Card className="max-w-2xl mx-auto w-full">
        <CardHeader>
          <CardTitle>Incident Information</CardTitle>
          <CardDescription>Fill in the details for the new incident.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right text-rovida-near-black">
                Title
              </Label>
              <div className="col-span-3">
                <Input id="title" placeholder="Short summary of the incident" {...form.register("title")} className="border-rovida-soft-gray text-rovida-near-black" />
                {form.formState.errors.title && (
                  <p className="text-rovida-error text-sm mt-1">{form.formState.errors.title.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right text-rovida-near-black">
                Description
              </Label>
              <div className="col-span-3">
                <Textarea id="description" placeholder="Detailed description of the incident" {...form.register("description")} className="border-rovida-soft-gray text-rovida-near-black" />
                {form.formState.errors.description && (
                  <p className="text-rovida-error text-sm mt-1">{form.formState.errors.description.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right text-rovida-near-black">
                Unit
              </Label>
              <div className="col-span-3">
                <Select onValueChange={(value) => form.setValue("unit", value)} value={form.watch("unit")}>
                  <SelectTrigger id="unit" className="border-rovida-soft-gray text-rovida-near-black">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
                    <SelectItem value="unit101">Unit 101</SelectItem>
                    <SelectItem value="unit203">Unit 203</SelectItem>
                    <SelectItem value="common_area">Common Area</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.unit && (
                  <p className="text-rovida-error text-sm mt-1">{form.formState.errors.unit.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right text-rovida-near-black">
                Type
              </Label>
              <div className="col-span-3">
                <Select onValueChange={(value) => form.setValue("type", value)} value={form.watch("type")}>
                  <SelectTrigger id="type" className="border-rovida-soft-gray text-rovida-near-black">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.type && (
                  <p className="text-rovida-error text-sm mt-1">{form.formState.errors.type.message}</p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="urgent" className="text-right text-rovida-near-black">
                Urgent?
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Checkbox id="urgent" checked={form.watch("urgent")} onCheckedChange={(checked) => form.setValue("urgent", !!checked)} className="border-rovida-slate-green-gray data-[state=checked]:bg-rovida-gold data-[state=checked]:text-white" />
                <label
                  htmlFor="urgent"
                  className="text-sm font-medium leading-none text-rovida-near-black peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mark as urgent
                </label>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="photos" className="text-right text-rovida-near-black">
                Photos
              </Label>
              <Input id="photos" type="file" multiple className="col-span-3 border-rovida-soft-gray text-rovida-near-black" {...form.register("photos")} />
            </div>
            <div className="col-span-4 flex justify-end mt-4">
              <Button type="submit">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Incident
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewIssue;