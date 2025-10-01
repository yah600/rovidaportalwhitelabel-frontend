import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

const MaintenanceCalendar = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: 'Calendar', href: '/maintenance/calendar' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-rovida-navy">{t('maintenance')} Calendar</h1>
      <p className="text-rovida-slate-green-gray">Visualize and manage your maintenance schedule.</p>

      <Card className="flex-1 bg-white/80 backdrop-blur-md border-rovida-soft-gray shadow-subtle">
        <CardHeader>
          <CardTitle className="text-rovida-navy">Monthly View</CardTitle>
          <CardDescription className="text-rovida-slate-green-gray">Upcoming and completed tasks.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <CalendarDays className="h-12 w-12" />
            <p>Calendar view coming soon!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaintenanceCalendar;