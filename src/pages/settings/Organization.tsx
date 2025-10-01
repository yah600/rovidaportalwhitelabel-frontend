import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

const SettingsOrganization = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('settings'), href: '/settings' },
    { label: 'Organization', href: '/settings/org' },
  ];

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for saving organization settings
    alert('Organization settings saved! (Simulated)');
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('settings')} Organization</h1>

      <Card className="max-w-3xl mx-auto w-full">
        <CardHeader>
          <CardTitle>Organization Details</CardTitle>
          <CardDescription>Manage your organization's general information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="org-name">Organization Name</Label>
              <Input id="org-name" type="text" defaultValue="Gestion Rovida Inc." />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-address">Address</Label>
              <Input id="org-address" type="text" defaultValue="123 Main St, Montreal, QC H1A 1A1" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-phone">Phone Number</Label>
              <Input id="org-phone" type="tel" defaultValue="+1 (514) 123-4567" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-email">Email</Label>
              <Input id="org-email" type="email" defaultValue="contact@gestionrovida.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-description">Description</Label>
              <Textarea id="org-description" defaultValue="Property management company specializing in residential buildings." rows={4} />
            </div>
            <Button type="submit" className="w-full">
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsOrganization;