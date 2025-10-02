import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, FileText, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner'; // Import toast for actions

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
  const { t } = useTranslation(['communications', 'common']); // Ensure 'communications' and 'common' namespaces are loaded
  const breadcrumbItems = [
    { label: t('communications', { ns: 'communications' }), href: '/comms' },
    { label: t('templates', { ns: 'communications' }), href: '/comms/templates' },
  ];

  const handleCreateNewTemplate = () => {
    toast.info(t('create new template action', { ns: 'communications' })); // Placeholder action with toast
  };

  const handleEditTemplate = (templateId: string) => {
    toast.info(t('edit template action', { ns: 'communications', id: templateId })); // Placeholder action with toast
  };

  const handleDeleteTemplate = (templateId: string) => {
    toast.error(t('delete template action', { ns: 'communications', id: templateId })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('communications', { ns: 'communications' })} {t('templates', { ns: 'communications' })}</h1>
        <Button className="btn-primary" onClick={handleCreateNewTemplate}>
          <PlusCircle className="mr-2 h-4 w-4" /> {t('create new template', { ns: 'communications' })}
        </Button>
      </header>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockTemplates.length > 0 ? (
          mockTemplates.map((template) => (
            <Card key={template.id} className="card-rovida"> {/* Apply card-rovida for consistency */}
              <CardHeader>
                <CardTitle className="text-lg text-rovida-navy">{template.name}</CardTitle>
                <CardDescription className="text-rovida-slate-green-gray">{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-end gap-2">
                <Button variant="outline" size="sm" className="btn-secondary" onClick={() => handleEditTemplate(template.id)}>
                  <Edit className="h-4 w-4 mr-2" /> {t('edit', { ns: 'common' })}
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteTemplate(template.id)}>
                  <Trash2 className="h-4 w-4 mr-2" /> {t('delete', { ns: 'common' })}
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8 card-rovida">
            <div className="flex flex-col items-center gap-1 text-center">
              <h3 className="text-2xl font-bold tracking-tight text-rovida-near-black">
                {t('no templates found', { ns: 'communications' })}
              </h3>
              <p className="text-sm text-rovida-slate-green-gray">
                {t('start by creating new template', { ns: 'communications' })}
              </p>
              <Button className="mt-4 btn-primary" onClick={handleCreateNewTemplate}>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('create new template', { ns: 'communications' })}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommsTemplates;