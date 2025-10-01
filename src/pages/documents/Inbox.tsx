import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const DocumentsInbox = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('documents'), href: '/documents' },
    { label: 'Inbox', href: '/documents/inbox' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('documents')} Inbox</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">Email inbox for documents will be here.</p>
      </div>
    </div>
  );
};

export default DocumentsInbox;