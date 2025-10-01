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
      <p className="text-rovida-slate-green-gray">{t('manage_all_property_maintenance')}</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">{t('maintenance_calendar_link')}</CardTitle>
            <CalendarDays className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              {t('view_scheduled_maintenance_tasks')}
            </CardDescription>
            <Link to="/maintenance/calendar" className="link-rovida flex items-center gap-1">
              {t('go_to_calendar')} <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">{t('assets_management')}</CardTitle>
            <Building className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              {t('track_property_assets_history')}
            </CardDescription>
            <Link to="/maintenance/assets" className="link-rovida flex items-center gap-1">
              {t('manage_assets')} <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">{t('work_orders_link')}</CardTitle>
            <Wrench className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              {t('create_assign_track_work_orders')}
            </CardDescription>
            <Link to="/maintenance/work-orders" className="link-rovida flex items-center gap-1">
              {t('view_work_orders')} <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">{t('maintenance_tasks_link')}</CardTitle>
            <ClipboardList className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              {t('manage_individual_tasks_progress')}
            </CardDescription>
            <Link to="/maintenance/tasks" className="link-rovida flex items-center gap-1">
              {t('view_tasks')} <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="card-rovida">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">{t('agenda_xlsx_import')}</CardTitle>
            <ClipboardList className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              {t('import_schedules_xlsx_generate_tasks')}
            </CardDescription>
            <Link to="/maintenance/agenda" className="link-rovida flex items-center gap-1">
              {t('import_agenda')} <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Maintenance;