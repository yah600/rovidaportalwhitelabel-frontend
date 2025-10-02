import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wrench, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { mockWorkOrders } from '@/data/mock-work-orders'; // Import mockWorkOrders
import WorkOrdersTable from '@/components/maintenance/WorkOrdersTable'; // Import WorkOrdersTable
import { toast } from 'sonner'; // Import toast for actions
import { useAuth } from '@/shared/rbac/useAuth'; // Import useAuth

const MaintenanceWorkOrders = () => {
  const { t } = useTranslation(['maintenance', 'common']); // Specify namespaces

  const breadcrumbItems = [
    { label: t('maintenance', { ns: 'maintenance' }), href: '/maintenance' },
    { label: t('work orders', { ns: 'maintenance' }), href: '/maintenance/work-orders' },
  ];

  const hasWorkOrders = mockWorkOrders.length > 0;
  const { canRead, canCreate } = useAuth();

  const handleCreateNewWorkOrder = () => {
    toast.info(t('create new work order action', { ns: 'maintenance' })); // Placeholder action with toast
  };

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl text-page-title">{t('maintenance', { ns: 'maintenance' })} {t('work orders', { ns: 'maintenance' })}</h1>
        {canCreate('Maintenance') && (
          <Button className="btn-primary" onClick={handleCreateNewWorkOrder}>
            <PlusCircle className="mr-2 h-4 w-4" /> {t('create new work order', { ns: 'maintenance' })}
          </Button>
        )}
      </header>
      <p className="text-rovida-slate-green-gray">{t('manage all work orders', { ns: 'maintenance' })}</p>

      {canRead('Maintenance') ? (
        hasWorkOrders ? (
          <div className="card-rovida p-4"> {/* Wrapped content in card-rovida */}
            <WorkOrdersTable workOrders={mockWorkOrders} />
          </div>
        ) : (
          <Card className="flex-1 card-rovida">
            <CardHeader>
              <CardTitle className="text-rovida-navy">{t('work order list', { ns: 'maintenance' })}</CardTitle>
              <CardDescription className="text-rovida-slate-green-gray">{t('overview active completed work orders', { ns: 'maintenance' })}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 items-center justify-center">
              <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
                <Wrench className="h-12 w-12 text-rovida-gold" />
                <p className="text-lg font-medium text-rovida-near-black">{t('work orders managed here', { ns: 'maintenance' })}</p>
                <p className="text-sm text-center">{t('create, assign, and track work orders for repairs and services across the property. Create your first work order to get started.', { ns: 'maintenance' })}</p>
                {canCreate('Maintenance') && (
                  <Button variant="outline" className="mt-4 btn-secondary" onClick={handleCreateNewWorkOrder}>
                    <PlusCircle className="mr-2 h-4 w-4" /> {t('create first work order', { ns: 'maintenance' })}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <Card className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm card-rovida mt-4 p-8">
          <div className="flex flex-col items-center gap-2 text-rovida-slate-green-gray">
            <Wrench className="h-12 w-12 text-rovida-gold" />
            <p>{t('no permission view work orders', { ns: 'common' })}</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MaintenanceWorkOrders;