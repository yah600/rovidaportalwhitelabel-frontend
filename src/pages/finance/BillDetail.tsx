import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const FinanceBillDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('finance'), href: '/finance' },
    { label: 'Bills', href: '/finance/bills' },
    { label: `Bill ${id}`, href: `/finance/bills/${id}` },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('finance')} Bill Detail: {id}</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">Details for bill {id} coming soon!</p>
      </div>
    </div>
  );
};

export default FinanceBillDetail;