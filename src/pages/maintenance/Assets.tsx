import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const MaintenanceAssets = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: 'Assets', href: '/maintenance/assets' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('maintenance')} Assets</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">Asset management will be available here.</p>
      </div>
    </div>
  );
};

export default MaintenanceAssets;