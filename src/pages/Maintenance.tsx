import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { ArrowRight, Wrench, CalendarDays, Building, ClipboardList } from 'lucide-react';

const Maintenance = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('maintenance')} {t('overview')}</h1>
      <p className="text-rovida-slate-green-gray">{t('manage all property maintenance')}</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">{t('maintenance calendar link')}</CardTitle>
            <CalendarDays className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              {t('view scheduled maintenance tasks')}
            </CardDescription>
            <Link to="/maintenance/calendar" className="link-rovida flex items-center gap-1">
              {t('go to calendar')} <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">{t('assets management')}</CardTitle>
            <Building className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              {t('track property assets history')}
            </CardDescription>
            <Link to="/maintenance/assets" className="link-rovida flex items-center gap-1">
              {t('manage assets')} <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">{t('work orders link')}</CardTitle>
            <Wrench className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              {t('create assign track work orders')}
            </CardDescription>
            <Link to="/maintenance/work-orders" className="link-rovida flex items-center gap-1">
              {t('view work orders')} <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">{t('maintenance tasks link')}</CardTitle>
            <ClipboardList className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              {t('manage individual tasks progress')}
            </CardDescription>
            <Link to="/maintenance/tasks" className="link-rovida flex items-center gap-1">
              {t('view tasks')} <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">{t('agenda xlsx import')}</CardTitle>
            <ClipboardList className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              {t('import schedules xlsx generate tasks')}
            </CardDescription>
            <Link to="/maintenance/agenda" className="link-rovida flex items-center gap-1">
              {t('import agenda')} <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Maintenance;