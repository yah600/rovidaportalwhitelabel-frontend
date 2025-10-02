import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { toast } from 'sonner';

const SettingsOrganization = () => {
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for saving organization settings
    toast.success(t('organization settings saved title'), {
      description: t('organization settings saved description'),
    });
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('organization details')}</h1>

      <Card className="w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('organization details')}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('manage org general info')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="org-name" className="md:text-right text-rovida-near-black">{t('organization name')}</Label>
              <Input id="org-name" type="text" defaultValue="Gestion Rovida Inc." className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="org-address" className="md:text-right text-rovida-near-black">{t('address')}</Label>
              <Input id="org-address" type="text" defaultValue="123 Main St, Montreal, QC H1A 1A1" className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="org-phone" className="md:text-right text-rovida-near-black">{t('phone number')}</Label>
              <Input id="org-phone" type="tel" defaultValue="+1 (514) 123-4567" className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid md:grid-cols-4 items-center gap-4">
              <Label htmlFor="org-email" className="md:text-right text-rovida-near-black">{t('email')}</Label>
              <Input id="org-email" type="email" defaultValue="contact@gestionrovida.com" className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid md:grid-cols-4 items-start gap-4"> {/* Changed to items-start for textarea */}
              <Label htmlFor="org-description" className="md:text-right text-rovida-near-black">{t('description')}</Label>
              <Textarea id="org-description" defaultValue="Property management company specializing in residential buildings." rows={4} className="md:col-span-3 border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <Button type="submit" className="w-full btn-primary">
              <Save className="mr-2 h-4 w-4" /> {t('save changes')}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsOrganization;