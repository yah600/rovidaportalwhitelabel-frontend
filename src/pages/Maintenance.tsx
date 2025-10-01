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
      <h1 className="text-2xl font-semibold md:text-3xl text-rovida-navy">{t('maintenance')} Overview</h1>
      <p className="text-rovida-slate-green-gray">Manage all aspects of property maintenance.</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">Maintenance Calendar</CardTitle>
            <CalendarDays className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              View scheduled preventive maintenance and upcoming tasks.
            </CardDescription>
            <Link to="/maintenance/calendar" className="link-rovida flex items-center gap-1">
              Go to Calendar <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">Assets Management</CardTitle>
            <Building className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              Keep track of all property assets and their maintenance history.
            </CardDescription>
            <Link to="/maintenance/assets" className="link-rovida flex items-center gap-1">
              Manage Assets <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">Work Orders</CardTitle>
            <Wrench className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              Create, assign, and track work orders for repairs and services.
            </CardDescription>
            <Link to="/maintenance/work-orders" className="link-rovida flex items-center gap-1">
              View Work Orders <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">Maintenance Tasks</CardTitle>
            <ClipboardList className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              Manage individual maintenance tasks and their progress.
            </CardDescription>
            <Link to="/maintenance/tasks" className="link-rovida flex items-center gap-1">
              View Tasks <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-xl border-rovida-soft-gray shadow-subtle">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg text-rovida-navy">Agenda (XLSX Import)</CardTitle>
            <ClipboardList className="h-6 w-6 text-rovida-gold" />
          </CardHeader>
          <CardContent>
            <CardDescription className="text-rovida-slate-green-gray mb-4">
              Import maintenance schedules from XLSX files and generate tasks.
            </CardDescription>
            <Link to="/maintenance/agenda" className="link-rovida flex items-center gap-1">
              Import Agenda <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Maintenance;