import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Edit, Trash2 } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
}

const mockTemplates: Template[] = [
  {
    id: 'TPL001',
    name: 'Welcome New Resident',
    description: 'Template for welcoming new residents to the building.',
  },
  {
    id: 'TPL002',
    name: 'Maintenance Update',
    description: 'Template for sending updates on ongoing maintenance work.',
  },
  {
    id: 'TPL003',
    name: 'Rent Reminder',
    description: 'Automated reminder for upcoming rent due dates.',
  },
];

const CommsTemplates = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('communications'), href: '/comms' },
    { label: 'Templates', href: '/comms/templates' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('communications')} Templates</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Template
        </Button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockTemplates.length > 0 ? (
          mockTemplates.map((template) => (
            <Card key={template.id}>
              <CardHeader>
                <CardTitle className="text-lg">{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-2" /> Edit
                </Button>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight">
                No templates found.
              </h3>
              <p className="text-sm text-muted-foreground">
                You can start by creating a new communication template.
              </p>
              <Button className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" /> Create New Template
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommsTemplates;