import React from 'react';
import { useTranslation } from 'react-i18next';

const MaintenanceWorkOrders = () => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-1 flex-col gap-4">
      <h1 className="text-2xl font-semibold md:text-3xl">{t('maintenance')} Work Orders</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">Work orders will be managed here.</p>
      </div>
    </div>
  );
};

export default MaintenanceWorkOrders;