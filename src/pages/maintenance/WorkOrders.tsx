import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wrench, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { mockWorkOrders } from '@/data/mock-work-orders'; // Import mockWorkOrders
import WorkOrdersTable from '@/components/maintenance/WorkOrdersTable'; // Import WorkOrdersTable

const MaintenanceWorkOrders = () => {
  const { t } = useTranslation();

  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: 'Work Orders', href: '/maintenance/work-orders' },
  ];

  const hasWorkOrders = mockWorkOrders.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('maintenance')} Work Orders</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> Create New Work Order
        </Button>
      </header>
      <p className="text-rovida-slate-green-gray">Manage all work orders for repairs and services.</p>

      {hasWorkOrders ? (
        <WorkOrdersTable workOrders={mockWorkOrders} />
      ) : (
        <Card className="flex-1 card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">Work Order List</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">Overview of all active and completed work orders.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <Wrench className="h-12 w-12 text-rovida-gold" />
              <p>Work orders will be managed here.</p>
              <Button variant="outline" className="mt-4 btn-secondary">
                <PlusCircle className="mr-2 h-4 w-4" /> Create First Work Order
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MaintenanceWorkOrders;