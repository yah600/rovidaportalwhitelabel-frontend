import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

const MaintenanceCalendar = () => {
  const { t } = useTranslation(['maintenance', 'common']); // Specify namespaces

  const breadcrumbItems = [
    { label: t('maintenance', { ns: 'maintenance' }), href: '/maintenance' },
    { label: t('calendar', { ns: 'maintenance' }), href: '/maintenance/calendar' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('maintenance', { ns: 'maintenance' })} {t('calendar', { ns: 'maintenance' })}</h1>
      <p className="text-rovida-slate-green-gray">{t('visualize manage schedule', { ns: 'maintenance' })}</p>

      <Card className="flex-1 card-rovida">
        <CardHeader>
          <CardTitle className="text-rovida-navy">{t('monthly view', { ns: 'maintenance' })}</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">{t('upcoming completed tasks', { ns: 'maintenance' })}</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <CalendarDays className="h-12 w-12 text-rovida-gold" />
            <p>{t('calendar view coming soon', { ns: 'maintenance' })}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceCalendar;