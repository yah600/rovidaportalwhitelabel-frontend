import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { PlusCircle, UploadCloud } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockUnits } from '@/mocks'; // Import mock units

const NewArchitecturalRequest = () => {
  const { t } = useTranslation(['architectural_requests', 'common']);
  const { canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('board', { ns: 'common' }), href: '/board' },
    { label: t('architectural requests', { ns: 'architectural_requests' }), href: '/board/architectural-requests' },
    { label: t('submit new request', { ns: 'architectural_requests' }), href: '/board/architectural-requests/new' },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for submission logic
    toast.success(t('request submitted title', { ns: 'architectural_requests' }), {
      description: t('request submitted description', { ns: 'architectural_requests' }),
    });
    (event.target as HTMLFormElement).reset(); // Reset form
  };

  if (!canCreate('Architectural Requests')) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <PlusCircle className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission create architectural requests', { ns: 'common' })}</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('submit new request', { ns: 'architectural_requests' })}</h1>
      <p className="text-rovida-slate-green-gray">{t('fill details architectural request', { ns: 'architectural_requests' })}</p>

      <Card className="max-w-3xl mx-auto w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('request information', { ns: 'architectural_requests' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('provide details supporting documents', { ns: 'architectural_requests' })}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="request-title" className="md:text-right text-rovida-near-black">{t('title', { ns: 'common' })}</Label>
              <Input id="request-title" type="text" placeholder={t('short summary request', { ns: 'architectural_requests' })} required className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="md:text-right text-rovida-near-black">
                {t('unit', { ns: 'common' })}
              </Label>
              <div className="md:col-span-3">
                <Select required>
                  <SelectTrigger id="unit" className="border-rovida-soft-gray text-rovida-near-black">
                    <SelectValue placeholder={t('select unit', { ns: 'architectural_requests' })} />
                  </SelectTrigger>
                  <SelectContent className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray text-rovida-near-black">
                    {mockUnits.map(unit => (
                      <SelectItem key={unit.id} value={unit.unitNumber}>Unit {unit.unitNumber}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid md:grid-cols-4 items-start gap-4">
              <Label htmlFor="request-description" className="md:text-right text-rovida-near-black">{t('description', { ns: 'common' })}</Label>
              <Textarea id="request-description" placeholder={t('detailed description request', { ns: 'architectural_requests' })} rows={6} required className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="request-documents" className="md:text-right text-rovida-near-black">{t('supporting documents', { ns: 'architectural_requests' })}</Label>
              <div className="md:col-span-3">
                <Input id="request-documents" type="file" multiple className="border-rovida-soft-gray text-rovida-near-black" />
                <p className="text-xs text-rovida-slate-green-gray mt-1">{t('upload plans photos permits', { ns: 'architectural_requests' })}</p>
              </div>
            </div>
            <Button type="submit" className="w-full btn-primary">
              <PlusCircle className="mr-2 h-4 w-4" /> {t('submit request', { ns: 'architectural_requests' })}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewArchitecturalRequest;