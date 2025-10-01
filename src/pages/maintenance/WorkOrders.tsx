import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const MaintenanceWorkOrders = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: 'Work Orders', href: '/maintenance/work-orders' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('maintenance')} Work Orders</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">Work orders will be managed here.</p>
      </div>
    </div>
  );
};

export default MaintenanceWorkOrders;