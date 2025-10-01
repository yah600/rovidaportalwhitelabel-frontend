import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Phone, Mail, Info, Users } from 'lucide-react';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const Emergency = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('emergency'), href: '/emergency' },
  ];

  // Mock data for emergency contacts and protocols
  const emergencyContacts = [
    { name: 'Building Management', phone: '514-123-4567', email: 'emergency@example.com' },
    { name: 'Local Police', phone: '911', email: '' },
    { name: 'Fire Department', phone: '911', email: '' },
  ];

  const emergencyProtocols = [
    'In case of fire, use stairs, do not use elevators.',
    'For water leaks, locate the main shut-off valve if safe to do so.',
    'Report suspicious activity to building management and local authorities.',
    'Evacuation points are located at the front and rear of the building.',
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('emergency')}</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Phone className="h-5 w-5" /> Emergency Contacts</CardTitle>
            <CardDescription>Important contacts for emergency situations.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {emergencyContacts.map((contact, index) => (
                <li key={index} className="flex items-center gap-3">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {contact.phone && <a href={`tel:${contact.phone}`} className="hover:underline">{contact.phone}</a>}
                      {contact.phone && contact.email && ' | '}
                      {contact.email && <a href={`mailto:${contact.email}`} className="hover:underline">{contact.email}</a>}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Info className="h-5 w-5" /> Emergency Protocols</CardTitle>
            <CardDescription>Key procedures to follow during an emergency.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {emergencyProtocols.map((protocol, index) => (
                <li key={index}>{protocol}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4 p-8">
        <p className="text-muted-foreground">Additional emergency resources and incident logs will be displayed here.</p>
      </div>
    </div>
  );
};

export default Emergency;