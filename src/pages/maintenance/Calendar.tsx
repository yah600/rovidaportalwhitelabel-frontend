import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

const MaintenanceCalendar = () => {
  const { t } = useTranslation(['maintenance', 'common']); // Specify namespaces
  const { canCreate } = useAuth();

  const breadcrumbItems = [
    { label: t('maintenance', { ns: 'maintenance' }), href: '/maintenance' },
    { label: t('calendar', { ns: 'maintenance' }), href: '/maintenance/calendar' },
  ];

  const handleAddEvent = () => {
    toast.info(t('add new event action', { ns: 'maintenance' })); // Placeholder action
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('maintenance', { ns: 'maintenance' })} {t('calendar', { ns: 'maintenance' })}</h1>
        {canCreate('Maintenance') && (
          <Button className="btn-primary" onClick={handleAddEvent}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('add new event', { ns: 'maintenance' })}
          </Button>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('visualize manage schedule', { ns: 'maintenance' })}</p>

      <Card className="flex-1 card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('monthly view', { ns: 'maintenance' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('upcoming completed tasks', { ns: 'maintenance' })}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <CalendarDays className="h-12 w-12 text-rovida-gold" />
            <p className="text-lg font-medium text-rovida-near-black">{t('calendar view coming soon', { ns: 'maintenance' })}</p>
            <p className="text-sm text-center">{t('full interactive calendar description', { ns: 'maintenance' })}</p>
            {canCreate('Maintenance') && (
              <Button variant="outline" className="mt-4 btn-secondary" onClick={handleAddEvent}>
                <PlusCircle className="mr-2 h-4 w-4" /> {t('add first event', { ns: 'maintenance' })}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceCalendar;