import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const MaintenanceTaskDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('maintenance'), href: '/maintenance' },
    { label: 'Tasks', href: '/maintenance/tasks' },
    { label: `Task ${id}`, href: `/maintenance/tasks/${id}` },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('maintenance')} Task Detail: {id}</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">Details for task {id} coming soon!</p>
      </div>
    </div>
  );
};

export default MaintenanceTaskDetail;