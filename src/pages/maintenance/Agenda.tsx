import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const MaintenanceAgenda = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: 'Agenda (XLSX)', href: '/maintenance/agenda' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('maintenance')} Agenda (XLSX)</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">XLSX import and agenda generation will be here.</p>
      </div>
    </div>
  );
};

export default MaintenanceAgenda;