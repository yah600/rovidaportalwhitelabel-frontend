import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

const SettingsOrganization = () => {
  const { t } = useTranslation();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Placeholder for saving organization settings
    alert('Organization settings saved! (Simulated)');
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">Organization Details</h1>

      <Card className="w-full card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">Organization Details</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">Manage your organization's general information.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="org-name" className="text-rovida-near-black">Organization Name</Label>
              <Input id="org-name" type="text" defaultValue="Gestion Rovida Inc." className="border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-address" className="text-rovida-near-black">Address</Label>
              <Input id="org-address" type="text" defaultValue="123 Main St, Montreal, QC H1A 1A1" className="border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-phone" className="text-rovida-near-black">Phone Number</Label>
              <Input id="org-phone" type="tel" defaultValue="+1 (514) 123-4567" className="border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-email" className="text-rovida-near-black">Email</Label>
              <Input id="org-email" type="email" defaultValue="contact@gestionrovida.com" className="border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="org-description" className="text-rovida-near-black">Description</Label>
              <Textarea id="org-description" defaultValue="Property management company specializing in residential buildings." rows={4} className="border-rovida-soft-gray text-rovida-near-black" />
            </div>
            <Button type="submit" className="w-full btn-primary">
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsOrganization;