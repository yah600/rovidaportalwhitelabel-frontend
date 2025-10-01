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
    { label: t('work_orders'), href: '/maintenance/work-orders' },
  ];

  const hasWorkOrders = mockWorkOrders.length > 0;

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('maintenance')} {t('work_orders')}</h1>
        <Button className="btn-primary">
          <PlusCircle className="mr-2 h-4 w-4" /> {t('create_new_work_order')}
        </Button>
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage_all_work_orders')}</p>

      {hasWorkOrders ? (
        <WorkOrdersTable workOrders={mockWorkOrders} />
      ) : (
        <Card className="flex-1 card-rovida">
          <CardHeader>
            <CardTitle className="text-rovida-navy">{t('work_order_list')}</CardTitle>
            <CardDescription className="text-rovida-slate-green-gray">{t('overview_active_completed_work_orders')}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
              <Wrench className="h-12 w-12 text-rovida-gold" />
              <p>{t('work_orders_managed_here')}</p>
              <Button variant="outline" className="mt-4 btn-secondary">
                <PlusCircle className="mr-2 h-4 w-4" /> {t('create_first_work_order')}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MaintenanceWorkOrders;