import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wrench, ClipboardList, Building, CalendarDays, FileStack, ArrowRight } from 'lucide-react';
import { mockWorkOrders } from '@/data/mock-work-orders';
import { mockTasks } from '@/data/mock-tasks';
import { mockAssets } from '@/data/mock-assets';

const Maintenance = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
  ];

  // Calculate summary data
  const openWorkOrders = mockWorkOrders.filter(wo => wo.status === 'Open' || wo.status === 'In Progress' || wo.status === 'Pending Parts').length;
  const totalWorkOrders = mockWorkOrders.length;
  const dueTasks = mockTasks.filter(task => task.status !== 'Completed' && task.dueDate <= new Date()).length;
  const totalTasks = mockTasks.length;
  const assetsUnderMaintenance = mockAssets.filter(asset => asset.status === 'Under Maintenance').length;
  const totalAssets = mockAssets.length;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('maintenance')} Overview</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {/* Work Orders Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Work Orders</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openWorkOrders} Open</div>
            <p className="text-xs text-muted-foreground">Total: {totalWorkOrders}</p>
            <Link to="/maintenance/work-orders" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Tasks Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks</CardTitle>
            <ClipboardList className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dueTasks} Due</div>
            <p className="text-xs text-muted-foreground">Total: {totalTasks}</p>
            <Link to="/maintenance/tasks" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Assets Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assets</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assetsUnderMaintenance} Under Maintenance</div>
            <p className="text-xs text-muted-foreground">Total: {totalAssets}</p>
            <Link to="/maintenance/assets" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Calendar Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maintenance Calendar</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">View Schedule</div>
            <p className="text-xs text-muted-foreground">Upcoming maintenance events.</p>
            <Link to="/maintenance/calendar" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              Open Calendar <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Agenda Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Agenda Upload</CardTitle>
            <FileStack className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Manage Agendas</div>
            <p className="text-xs text-muted-foreground">Upload and view XLSX agendas.</p>
            <Link to="/maintenance/agenda" className="mt-2 inline-flex items-center text-sm text-primary hover:underline">
              Go to Agenda <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm mt-4 p-8">
        <p className="text-muted-foreground">More detailed maintenance analytics and reports coming soon!</p>
      </div>
    </div>
  );
};

export default Maintenance;