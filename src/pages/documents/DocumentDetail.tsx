import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const DocumentDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('documents'), href: '/documents' },
    { label: `Document ${id}`, href: `/documents/${id}` },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('documents')} Detail: {id}</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">Details for document {id} coming soon!</p>
      </div>
    </div>
  );
};

export default DocumentDetail;