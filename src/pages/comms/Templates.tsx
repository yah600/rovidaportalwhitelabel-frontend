import React from 'react';
import { useTranslation } from 'react-i18next';
import BreadcrumbNav from '@/components/BreadcrumbNav';

const CommsTemplates = () => {
  const { t } = useTranslation();
  const breadcrumbItems = [
    { label: t('communications'), href: '/comms' },
    { label: 'Templates', href: '/comms/templates' },
  ];

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BreadcrumbNav items={breadcrumbItems} />
      <h1 className="text-2xl font-semibold md:text-3xl">{t('communications')} Templates</h1>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <p className="text-muted-foreground">Communication templates will be managed here.</p>
      </div>
    </div>
  );
};

export default CommsTemplates;