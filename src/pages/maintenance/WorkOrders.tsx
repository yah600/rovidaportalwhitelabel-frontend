import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mockWorkOrders } from '@/data/mock-work-orders';
import WorkOrdersTable from '@/components/maintenance/WorkOrdersTable';

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
        <h1 className="text-2xl font-semibold md:text-3xl">{t('maintenance')} Work Orders</h1>
        <Link to="/maintenance/work-orders/new"> {/* Assuming a new work order page/modal */}
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" /> Create Work Order
          </Button>
        </Link>
      </header>

      {hasWorkOrders ? (
        <WorkOrdersTable workOrders={mockWorkOrders} />
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              No work orders found.
            </h3>
            <p className="text-sm text-muted-foreground">
              You can start by creating a new work order.
            </p>
            <Link to="/maintenance/work-orders/new">
              <Button className="mt-4">
                <PlusCircle className="mr-2 h-4 w-4" /> Create Work Order
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenanceWorkOrders;